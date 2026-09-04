import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { site } from "../../config/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mailSubject = subject || `Message de ${name || "votre site"}`;
    const body = `${message}${email ? `\n\n${email}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="space-y-1">
            <h3 className="site-name text-xl">{site.name}</h3>
            <h3 className="text-sm leading-none font-light">
              <a
                href={site.phoneHref}
                className="hover:text-[var(--brand)] transition-colors"
              >
                {site.phone}
              </a>
            </h3>
            <h3 className="text-sm leading-none font-light">
              <a
                href={`mailto:${site.email}`}
                className="hover:text-[var(--brand)] transition-colors"
              >
                {site.email}
              </a>
            </h3>
          </div>
          <div className="mt-32 space-y-4">
            <p className="text-sm font-light whitespace-pre-line">{site.trustJ.text}</p>
            <a
              href={site.trustJ.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={site.trustJ.logoSrc}
                alt="Trust-J"
                width={117}
                height={55}
                className="w-[117px] h-auto"
              />
            </a>
          </div>
        </div>

        <div className="md:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="font-light">
                Nom, Prénom
              </Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="font-light">
                Adresse Email
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject" className="font-light">
                Sujet
              </Label>
              <Input
                id="contact-subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message" className="font-light">
                Message
              </Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                required
              />
            </div>
            <Button type="submit">Envoyer</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
