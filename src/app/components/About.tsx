import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Camera, Award, Users } from "lucide-react";
import { lorem, site } from "../../config/site";

const portraitPlaceholder =
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop";

export default function About() {
  return (
    <div>
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">L'Artiste</h1>
          <p className="text-xl text-gray-700">{lorem.short}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageWithFallback
              src={portraitPlaceholder}
              alt={site.name}
              className="w-full h-auto aspect-[4/5] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl">{site.name}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{lorem.medium}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{lorem.long}</p>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <Camera size={48} className="mx-auto mb-4" />
              <Stat value="15+" label="Lorem ipsum" />
            </div>
            <div>
              <Award size={48} className="mx-auto mb-4" />
              <Stat value="25+" label="Dolor sit amet" />
            </div>
            <div>
              <Users size={48} className="mx-auto mb-4" />
              <Stat value="500+" label="Consectetur elit" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl mb-12 text-center">Expositions & Publications</h2>
        <div className="space-y-8">
          {[2025, 2024, 2023].map((year) => (
            <div key={year} className="border-l-2 border-[var(--brand)] pl-6">
              <div className="text-sm text-gray-500 mb-2">{year}</div>
              <h3 className="text-xl mb-2">Lorem ipsum dolor</h3>
              <p className="text-gray-700">{lorem.short}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-8">Ma Philosophie</h2>
          <p className="text-xl text-gray-700 leading-relaxed">{lorem.medium}</p>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <>
      <div className="text-5xl mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </>
  );
}
