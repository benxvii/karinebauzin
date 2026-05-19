import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Camera, Clapperboard, Film, Users } from "lucide-react";
import { lorem, site } from "../../config/site";

const portraitPlaceholder =
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop";

const bioParagraphs = [
  "Formée aux Beaux-Arts, Karine Bauzin est une photographe de presse suisse établie à Genève.",
  "Elle collabore avec la presse nationale et internationale, effectue des reportages, des campagnes publicitaires et collabore avec de grands groupes horlogers.",
  "Régulièrement exposée, son travail fait l'objet de nombreuses publications. Ses travaux s'inscrivent dans une photographie humaniste, documentaire avec une approche intimiste. L'intérêt pour l'être humain a toujours été à l'initiative de son métier de photo-reporter.",
  "Elle est l'auteure de sept ouvrages : « Un jour, tout bascule… », « Portraits-ge.ch », « C'est la lutte finale », « Post tenebras lux », « What time is it? », « Cabines de plage » et « Genève au coeur du jeu ».",
  "Passionnée par les sphères sociales, elle s'oriente vite vers la photographie de presse, berceau de sa pratique artistique; elle a un regard aiguisé sur la société contemporaine.",
  "Documenter, illustrer, témoigner font partie de son travail quotidien sur le terrain au contact direct avec son sujet.",
  "Des nomades des steppes mongoles aux diverses actions des gilets jaunes ; du marché des célibataires à Shanghai à la commémoration du 1er anniversaire de la mort de Johnny, de l'explosion des opérations de chirurgie esthétique suite de la pandémie à la profession de dameur, de la vie ordinaire à des situations extraordinaires : Karine ne se lasse jamais d'explorer le monde avec un regard frontal, engagé dans le réel.",
  "Co-réalisatrice du documentaire « Mémoires d'une pandémie », production Lunafilms – 2022.",
  "Elle a présenté en avant première au salon Watches & Wonders l'exposition « What time is it? » en mars 2023 puis au Pont de la Machine et à Shanghai la même année.",
  "Elle remporte deux Swiss Press Photo, en 2023 en catégorie vie quotidienne pour son projet « Les cabines de plage » et en 2024 pour son documentaire sur « Exit » .",
];

export default function About() {
  return (
    <div>
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl">À propos</h1>
        </div>
      </section>

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
            <h2 className="text-3xl">{site.name}</h2>
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
