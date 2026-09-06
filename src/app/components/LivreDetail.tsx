import { Link, Navigate, useParams } from "react-router";
import { Mail, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { bookOrderTwint, livres, site, type Book } from "../../config/site";

export default function LivreDetail() {
  const { slug } = useParams<{ slug: string }>();
  const book = livres.items.find((b) => b.slug === slug);

  if (!book) {
    return <Navigate to={livres.indexPath} replace />;
  }

  return <BookPage book={book} />;
}

function bookSpecsLines(book: Book): string[] {
  const parts: string[] = [];
  if (book.publisher) parts.push(book.publisher);
  if (book.isbn) parts.push(`ISBN : ${book.isbn}`);
  if (book.language) parts.push(book.language);
  if (book.pages != null) parts.push(`${book.pages} pages`);
  const lines: string[] = [];
  if (parts.length > 0) lines.push(parts.join(" — "));
  if (book.format) lines.push(book.format);
  return lines;
}

function BookMeta({ book }: { book: Book }) {
  const specsLines = bookSpecsLines(book);
  const photographer = book.photographer ?? "Karine Bauzin";

  return (
    <div className="mt-8 space-y-2">
      <p>Photographies : {photographer}</p>
      {book.availability && <p>{book.availability}</p>}
      {specsLines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {book.price != null && (
        <p>
          CHF {book.price}.-
          {book.shippingFee != null && (
            <>
              {" "}
              (+ CHF {book.shippingFee}.- frais de port, livraison en Suisse)
            </>
          )}
        </p>
      )}
      {book.price != null && <p>{bookOrderTwint}</p>}
    </div>
  );
}

function BookPage({ book }: { book: (typeof livres.items)[number] }) {
  return (
    <div>
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={livres.indexPath}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--brand)] mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Retour aux livres et films
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className={book.kind === "film" ? "bg-white" : "overflow-hidden bg-white aspect-[4/3]"}>
              <ImageWithFallback
                src={book.image}
                alt={book.title}
                className={
                  book.kind === "film" ? "w-full h-auto" : "w-full h-full object-contain"
                }
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl mb-4 uppercase">{book.title}</h1>
              <p className="mb-4">{book.description}</p>
              <p className="whitespace-pre-line">{book.body}</p>
              {book.kind !== "film" && <BookMeta book={book} />}
              {book.kind !== "film" && book.price != null && (
                <a
                  href={`mailto:${site.email}?subject=Commande%20—%20${encodeURIComponent(book.title)}`}
                  className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[var(--brand)] text-white hover:opacity-90 transition-opacity"
                >
                  <Mail size={18} />
                  Commander par email
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
