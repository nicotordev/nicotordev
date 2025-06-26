import { getActiveProjects } from "@/app/actions/projects.actions";
import Motion from "@/components/common/Motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, Play, FileText, Volume2 } from "lucide-react";
import { Asset } from "@/lib/generated/prisma";
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
    const { projects = [] } = await getActiveProjects();
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
                        projects?.map((project, index) => (
                            <Motion
                                key={project.name}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                            >
                                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                                    <CardContent className="pt-8">
                                        <div className="grid lg:grid-cols-5 gap-6 items-start">
                                            <div className="lg:col-span-3 space-y-4">
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

                                                    {project.link && project.linkText && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            asChild
                                                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                                                        >
                                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                                {project.linkText}
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="lg:col-span-2">
                                                <ProjectAssetGallery 
                                                    assets={project.assets} 
                                                    projectName={project.name}
                                                    fallbackImage={project.image}
                                                />
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

// New component for handling project assets
function ProjectAssetGallery({ 
    assets, 
    projectName, 
    fallbackImage 
}: { 
    assets: Asset[], 
    projectName: string, 
    fallbackImage: string 
}) {
    // If no assets, show fallback image
    if (!assets || assets.length === 0) {
        return (
            <div className="relative">
                <Image
                    src={fallbackImage}
                    alt={`${projectName} preview`}
                    className="rounded-lg shadow-lg w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={300}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
        );
    }

    // Single asset - display directly
    if (assets.length === 1) {
        const asset = assets[0];
        return <AssetDisplay asset={asset} projectName={projectName} />;
    }

    // Multiple assets - show carousel
    return (
        <div className="relative">
            {/* Main asset display */}
            <AssetDisplay asset={assets[0]} projectName={projectName} />
            
            {/* Asset count indicator */}
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                +{assets.length - 1} more
            </div>
            
            {/* Asset thumbnails */}
            {assets.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                    {assets.slice(0, 4).map((asset, idx) => (
                        <div 
                            key={asset.id} 
                            className={`flex-shrink-0 relative ${idx === 0 ? 'ring-2 ring-primary' : ''}`}
                        >
                            <AssetThumbnail asset={asset} projectName={projectName} />
                        </div>
                    ))}
                    {assets.length > 4 && (
                        <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                            +{assets.length - 4}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Component for displaying individual assets
function AssetDisplay({ asset, projectName }: { asset: Asset, projectName: string }) {
    const getAssetIcon = (type: string) => {
        switch (type) {
            case 'VIDEO': return <Play className="w-4 h-4" />;
            case 'AUDIO': return <Volume2 className="w-4 h-4" />;
            case 'DOCUMENT': return <FileText className="w-4 h-4" />;
            default: return null;
        }
    };

    if (asset.type === 'IMAGE') {
        return (
            <div className="relative">
                <Image
                    src={asset.url}
                    alt={asset.alt || `${projectName} - ${asset.name}`}
                    className="rounded-lg shadow-lg w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    width={asset.width || 400}
                    height={asset.height || 300}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    placeholder={asset.blurDataUrl ? "blur" : undefined}
                    blurDataURL={asset.blurDataUrl || ''}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
        );
    }

    // For non-image assets, show a preview card
    return (
        <div className="relative bg-muted rounded-lg aspect-[4/3] flex flex-col items-center justify-center p-6 group-hover:bg-muted/80 transition-colors">
            <div className="text-primary mb-2">
                {getAssetIcon(asset.type)}
            </div>
            <h5 className="font-medium text-sm text-center mb-1">{asset.name}</h5>
            <p className="text-xs text-muted-foreground capitalize">{asset.type.toLowerCase()}</p>
            {asset.url && (
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3" 
                    asChild
                >
                    <a href={asset.url} target="_blank" rel="noopener noreferrer">
                        View {asset.type.toLowerCase()}
                    </a>
                </Button>
            )}
        </div>
    );
}

// Thumbnail component for asset previews
function AssetThumbnail({ asset, projectName }: { asset: Asset, projectName: string }) {
    const getAssetIcon = (type: string) => {
        switch (type) {
            case 'VIDEO': return <Play className="w-3 h-3" />;
            case 'AUDIO': return <Volume2 className="w-3 h-3" />;
            case 'DOCUMENT': return <FileText className="w-3 h-3" />;
            default: return null;
        }
    };

    if (asset.type === 'IMAGE') {
        return (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                    src={asset.url}
                    alt={asset.alt || `${projectName} - ${asset.name}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    width={64}
                    height={64}
                    placeholder={asset.blurDataUrl ? "blur" : undefined}
                    blurDataURL={asset.blurDataUrl || ''}
                />
            </div>
        );
    }

    return (
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-primary">
                {getAssetIcon(asset.type)}
            </div>
        </div>
    );
}

export default function AboutMeSectionProjectsWrapper() {
    return (
        <Suspense fallback={<ProjectsSkeleton />}>
            <AboutMeSectionProjects />
        </Suspense>
    );
}