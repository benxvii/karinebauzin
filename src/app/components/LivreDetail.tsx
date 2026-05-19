import { Link, Navigate, useParams } from "react-router";
import { Mail, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { livres, site } from "../../config/site";

export default function LivreDetail() {
  const { slug } = useParams<{ slug: string }>();
  const book = livres.items.find((b) => b.slug === slug);

  if (!book) {
    return <Navigate to={livres.indexPath} replace />;
  }

  return <BookPage book={book} />;
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
            Retour aux livres
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="aspect-[3/4] overflow-hidden">
              <ImageWithFallback
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl mb-4">{book.title}</h1>
              <p className="text-2xl mb-6">{book.price} CHF</p>
              <p className="text-lg text-gray-700 mb-4">{book.description}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{book.body}</p>
              <a
                href={`mailto:${site.email}?subject=Commande%20—%20${encodeURIComponent(book.title)}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand)] text-white hover:opacity-90 transition-opacity"
              >
                <Mail size={18} />
                Commander par email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
