import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { fetchBlogsOptional, type BlogPostFromCMS } from "@/lib/directus";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import Image from "next/image";
import Link from "next/link";

const BLOG_PLACEHOLDER_IMAGES: { src: string; alt: string }[] = [
  {
    src: "/images/illustrations/undraw_freelancer_vibs.svg",
    alt: "Blog: ideas y código",
  },
  {
    src: "/images/illustrations/undraw_freelancer_vibs.svg",
    alt: "Blog: ingeniería",
  },
  {
    src: "/images/illustrations/undraw_freelancer_vibs.svg",
    alt: "Blog: producto",
  },
];

type BlogPost = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  href: string;
  tag: string;
  image: string;
  imageAlt: string;
};

interface BlogSectionProps {
  messages: Messages;
}

export default async function BlogSection({ messages }: BlogSectionProps) {
  const t =
    (messages as unknown as { blogSection?: Record<string, any> })
      .blogSection ?? {};

  const sectionTitle = t.title ?? "Blog: ideas, código y negocio";
  const sectionSubtitle =
    t.subtitle ??
    "Explora artículos donde mezclo ingeniería, producto y experiencias reales construyendo software.";
  const ctaLabel = t.ctaLabel ?? "Ver todos los artículos";
  const comingSoonMessage = t.comingSoon ?? "Pronto se agregarán artículos.";

  const cmsBlogs = await fetchBlogsOptional();
  const hasBlogs = cmsBlogs && cmsBlogs.length > 0;
  const posts: BlogPost[] = hasBlogs ? mapBlogsFromCMSToPosts(cmsBlogs) : [];

  return (
    <section
      id="blog-section"
      className="relative py-24 sm:py-32 mx-auto max-w-7xl"
    >
      {/* Background shape */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-24"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className={cn(
            "relative left-1/2 -translate-x-1/2",
            "aspect-1155/678 w-96 rotate-30",
            "bg-linear-to-tr from-primary to-secondary opacity-25",
            "sm:w-160",
          )}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="w-full">
          <Badge variant="outline" className="mb-4">
            <Typography as="span" role="label" className="text-xs uppercase">
              Blog
            </Typography>
          </Badge>
          <Typography
            as="h2"
            role="display"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            {sectionTitle}
          </Typography>
          <Typography
            role="body"
            mood="editorial"
            className="mt-4 text-base text-muted-foreground sm:text-lg"
          >
            {sectionSubtitle}
          </Typography>
        </div>

        {/* Posts grid or coming soon */}
        {hasBlogs ? (
          <>
            <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="flex h-full flex-col overflow-hidden border-border/70 bg-card/80 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  <div className="relative aspect-16/10 w-full shrink-0 bg-muted">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {post.tag}
                    </div>
                    <CardTitle>
                      <Typography
                        as="h3"
                        role="headline"
                        className="text-lg font-semibold leading-snug sm:text-xl"
                      >
                        {post.title}
                      </Typography>
                    </CardTitle>
                    <CardDescription>
                      <Typography
                        role="body"
                        className="mt-2 text-sm text-muted-foreground"
                      >
                        {post.description}
                      </Typography>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between pt-0 text-sm text-muted-foreground">
                    <span>{post.readTime}</span>
                    <Button asChild variant="ghost" size="sm" className="px-0">
                      <Link href={post.href}>
                        <Typography as="span" className="text-xs font-medium">
                          {t.readMoreLabel ?? "Leer artículo"}
                        </Typography>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href={t.ctaHref ?? "#"}>
                  <Typography as="span" mood="artistic" role="button">
                    {ctaLabel}
                  </Typography>
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <Card className="mt-10 border-dashed border-border bg-muted/30 py-16 text-center md:mt-14">
            <CardContent className="p-0">
              <Typography
                role="body"
                className="text-muted-foreground"
                mood="editorial"
              >
                {comingSoonMessage}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

const DEFAULT_BLOG_IMAGE = {
  src: "/images/illustrations/undraw_freelancer_vibs.svg",
  alt: "Blog",
};

function mapBlogsFromCMSToPosts(blogs: BlogPostFromCMS[]): BlogPost[] {
  return blogs.slice(0, 3).map((blog, index) => {
    const placeholder =
      BLOG_PLACEHOLDER_IMAGES[index % BLOG_PLACEHOLDER_IMAGES.length] ??
      DEFAULT_BLOG_IMAGE;
    return {
      id: String(blog.id ?? `blog-${index + 1}`),
      title: blog.title ?? "",
      description: blog.excerpt ?? "",
      readTime: "",
      href: blog.slug ? `/blog/${blog.slug}` : "#",
      tag: "Blog",
      image: placeholder.src,
      imageAlt: placeholder.alt,
    };
  });
}
