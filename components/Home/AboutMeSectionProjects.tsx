import { getProjects } from "@/lib/dynamicBlurDataUrl";
import Motion from "@/components/Home/Motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectsSkeleton() {
    return (
        <Motion
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
        >
            <div className="space-y-8">
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <Skeleton className="w-8 h-8 rounded" />
                        <Skeleton className="h-9 w-48" />
                    </div>
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>

                <div className="grid gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="relative overflow-hidden border-2">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                            <CardContent className="pt-8">
                                <div className="grid md:grid-cols-3 gap-6 items-center">
                                    <div className="md:col-span-2 space-y-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-48" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-3/4" />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from({ length: 4 }).map((_, techIndex) => (
                                                    <Skeleton key={techIndex} className="h-6 w-16 rounded-full" />
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="w-4 h-4 rounded" />
                                                <Skeleton className="h-4 w-32" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <Skeleton className="rounded-lg w-full aspect-[8/5]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Motion>
    );
}

async function AboutMeSectionProjects() {
    const projects = await getProjects();
    const t = await getTranslations('about')

    return (
        <Motion
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
        >
            <div className="space-y-8">
                <div className="text-center space-y-4">
                    <h3 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                        <Award className="w-8 h-8 text-primary" />
                        <span className="text-accent">
                            {t('projects.title')}
                        </span>
                    </h3>
                    <p className="text-muted-foreground text-lg">{t('projects.subtitle')}</p>
                </div>

                <div className="grid gap-8">
                    {
                        projects.map((project, index) => (
                            <Motion
                                key={project.name}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                            >
                                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                                    <CardContent className="pt-8">
                                        <div className="grid md:grid-cols-3 gap-6 items-center">
                                            <div className="md:col-span-2 space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                            {project.name}
                                                        </h4>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tech.split(' + ').map((tech) => (
                                                            <Badge key={tech} variant="outline" className="hover:bg-primary/10 hover:border-primary/50 transition-colors">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    {project.impact && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                                            <span className="text-green-600 dark:text-green-400 font-medium">{project.impact}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.name} success`}
                                                    className="rounded-lg shadow-lg w-full aspect-[8/5] object-cover group-hover:scale-105 transition-transform duration-500"
                                                    width={400}
                                                    height={250}
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    priority={index < 2}
                                                    placeholder="blur"
                                                    blurDataURL={project.blurDataUrl}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Motion>
                        ))
                    }
                </div>
            </div>
        </Motion>
    );
}

export default function AboutMeSectionProjectsWrapper() {
    return (
        <Suspense fallback={<ProjectsSkeleton />}>
            <AboutMeSectionProjects />
        </Suspense>
    );
}