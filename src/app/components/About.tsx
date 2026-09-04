import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Camera, Clapperboard, Film, Users } from "lucide-react";
import { lorem, site } from "../../config/site";

const portraitPlaceholder =
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop";

const bioParagraphs = [
  "Karine Bauzin est photographe de presse. Formée aux Beaux-Arts, elle vit et travaille à Genève.",
  "Elle collabore avec la presse suisse et internationale, réalise des reportages, des campagnes publicitaires, et travaille avec de grands groupes horlogers.",
  "Son travail, régulièrement exposé et publié, s'inscrit dans une photographie humaniste et documentaire, à l'approche intimiste. L'être humain, depuis toujours, guide son métier de photo-reporter.",
  "Elle a publié sept ouvrages : « Un jour, tout bascule… », « Portraits-ge.ch », « C'est la lutte finale », « Post tenebras lux », « What time is it? », « Cabines de plage » et « Genève au cœur du jeu ».",
  "Passionnée par les sphères sociales, elle s'oriente vite vers la photographie de presse. Ce sera le berceau de sa pratique artistique, et le point de départ d'un regard aiguisé sur la société contemporaine.",
  "Documenter, illustrer, témoigner : c'est son travail quotidien, sur le terrain, au contact direct de son sujet.",
  "Des nomades des steppes mongoles aux gilets jaunes. Du marché des célibataires à Shanghai à la commémoration du premier anniversaire de la mort de Johnny. De l'explosion de la chirurgie esthétique post-pandémie au métier de dameur. De la vie ordinaire aux situations extraordinaires. Karine explore le monde avec un regard frontal, engagé dans le réel.",
  "Elle coréalise le documentaire « Mémoires d'une pandémie » (Lunafilm - 2022).",
  "En mars 2023, elle présente en avant-première son exposition « What time is it? » au salon Watches & Wonders, puis au Pont de la Machine et à Shanghai la même année.",
  "Elle remporte deux Swiss Press Photo : en 2023, catégorie vie quotidienne, pour « Les cabines de plage » ; en 2024, pour son documentaire sur Exit.",
];

export default function About() {
  return (
    <div>
      <h1 className="sr-only">À propos</h1>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12 items-start">
          <div className="md:col-span-3">
            <ImageWithFallback
              src={portraitPlaceholder}
              alt={site.name}
              className="w-full h-auto aspect-[4/5] object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-5">
            {bioParagraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">
            <StatItem icon={Camera} value="17" label="Caméras utilisées" />
            <StatItem icon={BookOpen} value="7" label="Ouvrages" />
            <StatItem icon={Clapperboard} value="1" label="Documentaire" />
            <StatItem icon={Film} value="500k+" label="Nombre d'images" />
            <StatItem icon={Users} value="6000+" label="Personnes photographiées" />
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

function StatItem({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div>
      <Icon size={48} className="mx-auto mb-4" strokeWidth={1.25} />
      <div className="text-5xl mb-2">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}
