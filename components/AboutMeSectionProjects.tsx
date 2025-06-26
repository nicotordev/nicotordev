import { getProjects } from "@/lib/dynamicBlurDataUrl";
import Motion from "@/components/Motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import Image from "next/image";

interface AboutMeSectionProjectsProps {
    t: (key: string) => string;
}

export default async function AboutMeSectionProjects({ t }: AboutMeSectionProjectsProps) {
    const projects = await getProjects(t);
    return projects.map((project, index) => (
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
                                priority={index < 2} // Solo para las primeras 2 imágenes
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