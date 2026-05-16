import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { fetchLinksOptional, type LinkFromCMS, getDirectusUrl } from "@/lib/directus";
import { getLocaleUrl } from "@/lib/seo/i18n";
import type { Messages } from "@/types/i18n";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  Twitter,
  Youtube,
} from "lucide-react";
import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

export interface LinksPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LinksPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const translation = await getTranslations({ locale: typedLocale });

  const canonical = getLocaleUrl(
    translation("seo.site.url") + "/links",
    typedLocale
  );

  return {
    title: { absolute: `Links | ${translation("seo.title.default")}` },
    description: translation("seo.description"),
    alternates: {
      canonical,
      languages: {
        "x-default": getLocaleUrl(
          translation("seo.site.url") + "/links",
          routing.defaultLocale
        ),
      },
    },
    openGraph: {
      url: canonical,
      title: `Links | ${translation("seo.openGraph.title")}`,
      description: translation("seo.openGraph.description"),
    },
    twitter: {
      title: `Links | ${translation("seo.twitter.title")}`,
      description: translation("seo.twitter.description"),
    },
  };
}

const IconMap: Record<string, typeof LinkIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  youtube: Youtube,
  instagram: Instagram,
  mail: Mail,
  email: Mail,
  whatsapp: MessageCircle,
  globe: Globe,
  website: Globe,
  link: LinkIcon,
};

function getIconComponent(iconName?: string | null) {
  if (!iconName) return LinkIcon;
  const normalized = iconName.toLowerCase().trim();
  return IconMap[normalized] || LinkIcon;
}

export default async function LinksPage({ params }: LinksPageProps) {
  const { locale } = await params;
  const [messages, cmsLinks] = await Promise.all([
    getMessages({ locale: locale as Locale }) as Promise<Messages>,
    fetchLinksOptional(),
  ]);

  const linksList: LinkFromCMS[] = cmsLinks ?? [];

  return (
    <>
      <Header messages={messages} />

      <main className="relative py-12">
        <BackgroundDecoration className="opacity-50" />

        <div className="relative z-10 w-full max-w-md mx-auto px-4 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">

          {/* Profile Section */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 ring-4 ring-background relative">
                <AvatarImage src="/images/nicolas/nico-pc.webp" alt="NicoTorDev" className="object-cover rounded-full" />
                <AvatarFallback>NT</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-1">
              <Typography as="h1" className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
                {messages.hero?.name || "Nicolás Torres"}
              </Typography>
              <Typography as="p" className="text-muted-foreground font-medium">
                {messages.hero?.title || "Full Stack Developer"}
              </Typography>
            </div>

            <p className="text-sm text-foreground/80 max-w-xs mx-auto">
              {messages.hero?.description || "Software developer, content creator, and tech enthusiast."}
            </p>
          </div>

          {/* Links List */}
          <div className="w-full flex flex-col gap-4">
            {linksList.map((link, index) => {
              const IconComponent = getIconComponent(link.icon);
              const customImageUrl = link.iconImage ? `${getDirectusUrl()}/assets/${link.iconImage}` : null;

              return (
                <div
                  key={link.id}
                  className="w-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-auto py-4 px-6 relative overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm justify-start border-border"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="flex items-center gap-4 w-full">
                        <div className="flex items-center justify-center h-10 w-10 shrink-0">
                          {customImageUrl ? (
                            <Image
                              src={customImageUrl}
                              alt={`${link.title} icon`}
                              width={40}
                              height={40}
                              className="object-contain h-full w-full rounded-sm"
                              unoptimized
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full rounded-full bg-secondary/10 group-hover:bg-primary/20 transition-colors duration-300 text-foreground">
                              <IconComponent className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <Typography as="span" className="font-semibold text-base sm:text-lg tracking-tight grow truncate">
                          {link.title}
                        </Typography>
                      </div>
                    </a>
                  </Button>
                </div>
              );
            })}

            {linksList.length === 0 && (
              <div className="text-center py-8 opacity-70">
                <Typography as="p" className="text-muted-foreground">
                  No links available yet.
                </Typography>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer messages={messages} />
    </>
  );
}
