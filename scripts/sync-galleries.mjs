#!/usr/bin/env node
/**
 * Synchronise les galeries depuis Cloudinary vers karinebauzin/_galleries.json.
 *
 * Usage local :
 *   node scripts/sync-galleries.mjs
 *
 * Lit `.env` (CLOUDINARY_URL ou CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET).
 * Dossier Media Library : CLOUDINARY_FOLDER, sinon VITE_CLOUDINARY_FOLDER
 * (même contrat que benoitdepagnier.ch).
 *
 * Titres des galeries : scripts/galleries-meta.json
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

loadDotenv(path.join(__dirname, "..", ".env"));
applyCloudinaryUrl(process.env.CLOUDINARY_URL);

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudFolder =
  process.env.CLOUDINARY_FOLDER?.trim() ||
  process.env.VITE_CLOUDINARY_FOLDER?.trim() ||
  "karinebauzin";

const EXCLUDED_PUBLIC_IDS = new Set(["Karine_Bauzin_cfgzty"]);

function loadDotenv(envPath) {
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function applyCloudinaryUrl(url) {
  if (!url?.trim()) return;
  const match = url.trim().match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!match) {
    console.error("CLOUDINARY_URL invalide (attendu cloudinary://KEY:SECRET@CLOUD)");
    process.exit(1);
  }
  const [, key, secret, name] = match;
  process.env.CLOUDINARY_API_KEY ??= key;
  process.env.CLOUDINARY_API_SECRET ??= secret;
  process.env.CLOUDINARY_CLOUD_NAME ??= name;
}

function requireEnv(name, value) {
  if (!value?.trim()) {
    console.error(`Variable d'environnement manquante : ${name}`);
    process.exit(1);
  }
  return value.trim();
}

requireEnv("CLOUDINARY_CLOUD_NAME", cloudName);
requireEnv("CLOUDINARY_API_KEY", apiKey);
requireEnv("CLOUDINARY_API_SECRET", apiSecret);

const authHeader =
  "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
const apiBase = `https://api.cloudinary.com/v1_1/${cloudName}`;

async function cloudinaryGet(endpoint) {
  const response = await fetch(`${apiBase}${endpoint}`, {
    headers: { Authorization: authHeader },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GET ${endpoint} (${response.status}) : ${text}`);
  }
  return response.json();
}

async function cloudinaryPost(endpoint, body) {
  const response = await fetch(`${apiBase}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`POST ${endpoint} (${response.status}) : ${text}`);
  }

  return response.json();
}

function signUploadParams(params, secret) {
  const serialized = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(serialized + secret).digest("hex");
}

function loadGalleriesMeta() {
  const metaPath = path.join(__dirname, "galleries-meta.json");
  if (!fs.existsSync(metaPath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(metaPath, "utf8"));
}

function humanizeTitle(slug) {
  const segment = slug.split("/").pop() ?? slug;
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function folderFromPublicId(publicId) {
  const lastSlash = publicId.lastIndexOf("/");
  return lastSlash === -1 ? "" : publicId.slice(0, lastSlash);
}

function resolveResourceFolder(resource) {
  return resource.asset_folder || resource.folder || folderFromPublicId(resource.public_id);
}

/**
 * Slug de galerie :
 * - karinebauzin/portraits(/…) → portraits (aplati)
 * - karinebauzin/reportages/<slug>(/…) → reportages/<slug>
 * - reportages/<slug>/… (public_id) → reportages/<slug>
 */
function slugFromResource(resource, rootFolder) {
  const publicId = resource.public_id ?? "";
  const folder = resolveResourceFolder(resource);
  const relative = folder.startsWith(`${rootFolder}/`)
    ? folder.slice(rootFolder.length + 1)
    : folder;

  if (relative === "portraits" || relative.startsWith("portraits/")) {
    return "portraits";
  }

  const reportagesFolder = relative.startsWith("reportages/")
    ? relative
    : publicId.startsWith("reportages/")
      ? folderFromPublicId(publicId)
      : "";

  if (reportagesFolder.startsWith("reportages/")) {
    const slug = reportagesFolder.split("/")[1];
    return slug ? `reportages/${slug}` : null;
  }

  return null;
}

function isGalleryImage(resource, rootFolder) {
  if (resource.resource_type && resource.resource_type !== "image") return false;

  const publicId = resource.public_id ?? "";
  if (
    publicId.endsWith("/_galleries") ||
    publicId.endsWith("_galleries") ||
    publicId.endsWith("_galleries.json")
  ) {
    return false;
  }
  if (EXCLUDED_PUBLIC_IDS.has(publicId)) return false;

  return slugFromResource(resource, rootFolder) !== null;
}

async function searchImages(expression) {
  const images = [];
  let nextCursor;

  do {
    const body = {
      expression,
      max_results: 500,
      sort_by: [{ public_id: "asc" }],
    };
    if (nextCursor) body.next_cursor = nextCursor;

    const result = await cloudinaryPost("/resources/search", body);
    images.push(...(result.resources ?? []));
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return images;
}

async function fetchByAssetFolder(assetFolder) {
  const images = [];
  let nextCursor;

  try {
    do {
      const params = new URLSearchParams({
        asset_folder: assetFolder,
        max_results: "500",
      });
      if (nextCursor) params.set("next_cursor", nextCursor);

      const result = await cloudinaryGet(`/resources/by_asset_folder?${params}`);
      images.push(...(result.resources ?? []));
      nextCursor = result.next_cursor;
    } while (nextCursor);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("(404)")) {
      console.warn(`  skip by_asset_folder ${assetFolder} : ${message}`);
    }
  }

  return images;
}

async function listSubfolders(folderPath) {
  try {
    const result = await cloudinaryGet(`/folders/${folderPath}`);
    return (result.folders ?? []).map((folder) => folder.path).filter(Boolean);
  } catch {
    return [];
  }
}

async function fetchAllGalleryImages(rootFolder) {
  const byId = new Map();

  const expressions = [`folder:${rootFolder}/*`, "folder:reportages/*"];
  for (const expression of expressions) {
    console.log(`Scan search : ${expression}`);
    const resources = await searchImages(expression);
    for (const resource of resources) {
      if (resource.public_id) byId.set(resource.public_id, resource);
    }
  }

  const extraFolders = new Set([
    `${rootFolder}/portraits`,
    `${rootFolder}/reportages`,
    "reportages",
  ]);
  for (const parent of [`${rootFolder}/reportages`, "reportages", `${rootFolder}/portraits`]) {
    for (const sub of await listSubfolders(parent)) {
      extraFolders.add(sub);
    }
  }

  for (const folderPath of extraFolders) {
    console.log(`Scan asset_folder : ${folderPath}`);
    const resources = await fetchByAssetFolder(folderPath);
    for (const resource of resources) {
      if (resource.public_id) byId.set(resource.public_id, resource);
    }
  }

  return [...byId.values()].filter((resource) => isGalleryImage(resource, rootFolder));
}

function groupImagesBySlug(resources, rootFolder) {
  const groups = new Map();

  for (const resource of resources) {
    const slug = slugFromResource(resource, rootFolder);
    if (!slug) continue;

    if (!groups.has(slug)) {
      groups.set(slug, {
        folder: resolveResourceFolder(resource),
        images: [],
      });
    }

    groups.get(slug).images.push({
      publicId: resource.public_id,
      width: resource.width ?? 0,
      height: resource.height ?? 0,
      createdAt: resource.created_at ?? "",
    });
  }

  for (const [slug, group] of groups) {
    if (slug === "portraits") {
      group.images.sort((a, b) => {
        const byDate = (b.createdAt || "").localeCompare(a.createdAt || "");
        return byDate || a.publicId.localeCompare(b.publicId);
      });
    } else {
      group.images.sort((a, b) => a.publicId.localeCompare(b.publicId));
    }
    group.images = group.images.map(({ publicId, width, height }) => ({
      publicId,
      width,
      height,
    }));
  }

  return groups;
}

async function uploadManifest(manifest) {
  const publicId = `${cloudFolder}/_galleries.json`;
  const timestamp = Math.round(Date.now() / 1000);
  const uploadParams = {
    timestamp,
    public_id: publicId,
    overwrite: "true",
    invalidate: "true",
  };
  const signature = signUploadParams(uploadParams, apiSecret);
  const json = JSON.stringify(manifest, null, 2);

  const form = new FormData();
  form.append(
    "file",
    new Blob([json], { type: "application/json" }),
    "_galleries.json",
  );
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("invalidate", "true");
  form.append("signature", signature);

  const response = await fetch(`${apiBase}/raw/upload`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload raw (${response.status}) : ${text}`);
  }

  return response.json();
}

async function verifyManifestUrl(url) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url, { cache: "no-store" });
    if (response.ok) return;
    await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
  }

  throw new Error(`Manifest inaccessible après upload : ${url}`);
}

function writeLocalManifest(manifest) {
  const outputPath = path.join(__dirname, "..", "public", "_galleries.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`  local     : public/_galleries.json`);
}

function readLocalManifest() {
  const outputPath = path.join(__dirname, "..", "public", "_galleries.json");
  if (!fs.existsSync(outputPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(outputPath, "utf8"));
  } catch {
    return null;
  }
}

/**
 * Réutilise `generatedAt` du manifest existant si le contenu (hors horodatage)
 * n'a pas changé. Évite un commit Git à chaque run du cron quand les galeries
 * Cloudinary n'ont pas bougé.
 */
function resolveGeneratedAt(previous, folder, galleries) {
  const now = new Date().toISOString();
  if (!previous) return now;

  const unchanged =
    previous.cloudFolder === folder &&
    JSON.stringify(previous.galleries) === JSON.stringify(galleries);

  return unchanged ? previous.generatedAt : now;
}

async function main() {
  const meta = loadGalleriesMeta();

  console.log(`Scan Cloudinary : ${cloudFolder} (portraits + reportages)`);

  const resources = await fetchAllGalleryImages(cloudFolder);
  const grouped = groupImagesBySlug(resources, cloudFolder);

  const galleries = [...grouped.entries()]
    .map(([slug, group]) => {
      const title = meta[slug]?.title ?? humanizeTitle(slug);
      return { slug, title, folder: group.folder, images: group.images };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const previousManifest = readLocalManifest();
  const generatedAt = resolveGeneratedAt(previousManifest, cloudFolder, galleries);

  const manifest = {
    generatedAt,
    cloudFolder,
    galleries,
  };

  const imageCount = galleries.reduce(
    (total, gallery) => total + gallery.images.length,
    0,
  );

  console.log(`${galleries.length} galerie(s), ${imageCount} image(s).`);

  if (galleries.length === 0) {
    console.warn(
      "Aucune image trouvée. Vérifie la structure Cloudinary (ex. karinebauzin/portraits/, karinebauzin/reportages/<slug>/).",
    );
  }

  const uploadResult = await uploadManifest(manifest);
  writeLocalManifest(manifest);

  const deliveryUrl = uploadResult.secure_url;
  await verifyManifestUrl(deliveryUrl);

  console.log("Manifest uploadé :");
  console.log(`  public_id : ${uploadResult.public_id}`);
  console.log(`  url       : ${deliveryUrl}`);
  console.log(
    `  fetch     : https://res.cloudinary.com/${cloudName}/raw/upload/${cloudFolder}/_galleries.json`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
