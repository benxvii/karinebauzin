import { Mail, Instagram } from "lucide-react";
import { lorem, site } from "../../config/site";

export default function Contact() {
  return (
    <div>
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">Contact</h1>
          <p className="text-xl text-gray-700 mb-12">{lorem.medium}</p>

          <ContactLinks />
        </div>
      </section>
    </div>
  );
}

function ContactLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <a
        href={`mailto:${site.email}`}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--brand)] text-white hover:opacity-90 transition-opacity"
      >
        <Mail size={20} />
        {site.email}
      </a>
      <a
        href={site.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white transition-colors"
      >
        <Instagram size={20} />
        Instagram
      </a>
    </div>
  );
}
