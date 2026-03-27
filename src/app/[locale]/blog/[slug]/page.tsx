import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { fetchBlogBySlug } from "@/lib/directus";
import { getLocaleUrl } from "@/lib/seo/i18n";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const messages = (await getMessages({ locale: typedLocale })) as Messages;
  const post = await fetchBlogBySlug(slug);

  const baseCanonical = getLocaleUrl(messages.seo.site.url, typedLocale);
  const canonical = `${baseCanonical}/blog/${slug}`;

  if (!post) {
    return {
      title: { absolute: messages.seo.title.default },
      description: messages.seo.description,
      alternates: {
        canonical,
        languages: {
          "x-default": `${getLocaleUrl(messages.seo.site.url, routing.defaultLocale)}/blog/${slug}`,
        },
      },
    };
  }

  return {
    title: { absolute: post.title },
    description: post.excerpt ?? messages.seo.description,
    alternates: {
      canonical,
      languages: {
        "x-default": `${getLocaleUrl(messages.seo.site.url, routing.defaultLocale)}/blog/${slug}`,
      },
    },
    openGraph: {
      url: canonical,
      title: post.title,
      description: post.excerpt ?? messages.seo.openGraph.description,
    },
    twitter: {
      title: post.title,
      description: post.excerpt ?? messages.seo.twitter.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  const [messages, post] = await Promise.all([
    getMessages({ locale: typedLocale }) as Promise<Messages>,
    fetchBlogBySlug(slug),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header messages={messages} />
      <main className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-8 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-24"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className={cn(
              "relative left-1/2 -translate-x-1/2",
              "aspect-1155/678 w-96 rotate-30",
              "bg-linear-to-tr from-primary to-secondary opacity-20",
              "sm:w-160",
            )}
          />
        </div>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Badge variant="outline">Blog</Badge>
            {post.datePublished ? (
              <span className="text-sm text-muted-foreground">
                {new Date(post.datePublished).toLocaleDateString(typedLocale)}
              </span>
            ) : null}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}

          <Card className="mt-10 border-border/70 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-10">
              {post.content ? (
                <article
                  className="blog-content text-foreground [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <p className="text-muted-foreground">
                  Este articulo aun no tiene contenido publicado.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="mt-10">
            <Button asChild variant="outline">
              <Link href={`/${typedLocale}/blog`}>Volver al blog</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer messages={messages} />
    </>
  );
}
