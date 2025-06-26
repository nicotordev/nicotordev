import Motion from "@/components/Home/Motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, MapPin, Briefcase, Code2, Calendar, Target, DollarSign, Clock, Rocket, Heart, Users, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { assets } from "@/app/assets";
import { Locale } from "@/lib/locales";
// import AboutMeSectionProjects from "./AboutMeSectionProjects";
// import { Collapsible } from "@/components/ui/collapsible";
// import { CollapsibleTrigger } from "./ui/collapsible";
// import { CollapsibleContent } from "@radix-ui/react-collapsible";

import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
// import { useDialog } from "@/hooks/use-dialog";
// import AboutMeSectionProjectsWrapper from "./AboutMeSectionProjects";
import AboutMeSectionContactButton from "./AboutMeSectionContactButton";
import { formatCurrency } from "@/lib/currency";
import AboutMeSectionProjectsWrapper from "./AboutMeSectionProjects";

interface AboutMetric {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: React.ReactNode;
  progress?: number;
}



interface AboutMeSectionProps {
  translations: (key: string) => string;
  locale: Locale;
}

async function AboutMeSection({ translations, locale }: AboutMeSectionProps) {
  const t = (key: string) => translations(`about.${key}`);

  const metrics: AboutMetric[] = [
    {
      label: t('metrics.hours'),
      value: "6k+",
      highlight: true,
      icon: <Clock className="w-5 h-5" />,
      progress: 95
    },
    {
      label: t('metrics.total_earnings'),
      value: formatCurrency({ locale, amount: 36000 }),
      highlight: true,
      icon: <DollarSign className="w-5 h-5" />,
      progress: 88
    },
    {
      label: t('metrics.success'),
      value: "100%",
      highlight: true,
      icon: <Target className="w-5 h-5" />,
      progress: 100
    },
    {
      label: t('metrics.experience'),
      value: t('metrics.experienceValue'),
      icon: <Calendar className="w-5 h-5" />,
      progress: 75
    }
  ];

  const skills = [
    { name: "Next.js/React", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript", level: 90, color: "from-purple-500 to-pink-500" },
    { name: "Node.js", level: 88, color: "from-green-500 to-emerald-500" },
    { name: "Database Design", level: 85, color: "from-orange-500 to-red-500" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-20 relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <Motion
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <Motion
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <Image
                    src={assets.meColorScheme}
                    alt="Professional Developer"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-primary/20 shadow-2xl mx-auto"
                    width={500}
                    height={500}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent p-3 rounded-full shadow-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Motion>
            </div>

            <div className="space-y-6">
              <Motion
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-4xl sm:text-6xl font-bold">
                  <span className="text-white animate-gradient-x">
                    {t('title')}
                  </span>
                  <br />
                  <span className="text-foreground text-3xl sm:text-4xl">
                    {t('subtitle')}
                  </span>
                </h2>
              </Motion>

              <Motion
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                  {t('description')}
                </p>
              </Motion>
            </div>
          </div>
        </Motion>

        {/* Current Role - Enhanced */}
        <Motion
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-card via-card to-primary/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground font-medium">{t('role.current')}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                          {t('role.position')}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <span className="font-medium text-foreground">{t('role.mode')}</span>
                      <p className="text-muted-foreground">{t('role.modeDetails')}</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Image
                    src={assets.meTypescript}
                    alt="Professional coding setup"
                    className="rounded-lg shadow-lg w-full h-72 object-cover"
                    width={1280}
                    height={720}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Motion>

        {/* Enhanced Metrics Grid */}
        <Motion
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                🚀 <span className="text-accent">{t('metrics.title')}</span>
              </h3>
              <p className="text-muted-foreground text-lg">{t('metrics.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <Motion
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="pt-8 text-center relative z-10">
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                            {metric.icon}
                          </div>
                          {metric.highlight && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className={`text - 3xl sm: text - 4xl font - bold transition - all duration - 300 ${metric.highlight
                            ? 'text-accent'
                            : 'text-foreground group-hover:text-primary'
                            } `}>
                            {metric.value}
                          </div>

                          {metric.progress && (
                            <div className="space-y-2">
                              <Progress value={metric.progress} className="h-2" />
                              <span className="text-xs text-muted-foreground">{metric.progress}% {t('metrics.complete')}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                          {metric.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Motion>
              ))}
            </div>
          </div>
        </Motion>

        {/* Skills Visualization */}
        <Motion
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Zap className="w-7 h-7 text-primary" />
                {t('specialties.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <Motion
                      key={skill.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-foreground">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="relative">
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <Motion
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}% ` }}
                              transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                              className={`h - full bg - gradient - to - r ${skill.color} rounded - full relative`}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </Motion>
                          </div>
                        </div>
                      </div>
                    </Motion>
                  ))}
                </div>

                <div className="relative">
                  <Image
                    src={assets.meColorScheme}
                    alt="Team collaboration"
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                    width={1280}
                    height={720}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{t('specialties.title')}</p>
                    <p className="text-sm opacity-90">{t('specialties.description')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Motion>

        {/* Enhanced Tech Stack & Methodology */}
        <Motion
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <Rocket className="w-6 h-6 text-blue-500" />
                  </div>
                  {t('specialties.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('methodology.title_frontend')}</p>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js 15', 'React 18', 'TypeScript 5'].map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:scale-105 transition-transform">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('methodology.title_backend')}</p>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js 20', 'Prisma ORM', 'PostgreSQL', 'Azure'].map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:scale-105 transition-transform">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('methodology.title_styling')}</p>
                    <div className="flex flex-wrap gap-2">
                      {['Tailwind CSS v4', 'Framer Motion', 'shadcn/ui'].map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 hover:scale-105 transition-transform">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg">
                    <Heart className="w-6 h-6 text-orange-500" />
                  </div>
                  {t('methodology.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('methodology.description')}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg">
                      <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{t('methodology.client_first')}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-accent/5 to-primary/5 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-sm font-medium">{t('methodology.results_driven')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Motion>

        {/* Enhanced Projects Section */}
        <AboutMeSectionProjectsWrapper />

        {/* Enhanced CTA Section */}
        <Motion
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center space-y-12">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
              <CardContent className="pt-12 pb-12 relative z-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">
                      <span className="text-accent">
                        {t('cta.title')}8
                      </span>
                    </h3>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      {t('cta.description')}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Motion
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AboutMeSectionContactButton />
                    </Motion>

                    <p className="text-muted-foreground">
                      <a href="https://www.linkedin.com/in/nicotordev/"
                        className="text-primary hover:text-accent font-medium hover:underline transition-colors">
                        {t('cta.alternative')}
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Collapsible Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* <Collapsible>
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-6 h-6 text-primary" />
                          {t('testimonial.title')}
                        </div>
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <blockquote className="pl-6 border-l-4 border-gradient-to-b from-primary to-accent italic text-muted-foreground bg-gradient-to-r dark:from-primary/5 dark:to-accent/5 p-4 rounded-r-lg">
                        &quot;{t('testimonial.quote')}&quot;
                        <footer className="mt-2 text-sm font-medium text-foreground">
                          — {t('testimonial.author')}
                        </footer>
                      </blockquote>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible> */}

              {/* <Collapsible>
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-6 h-6 text-accent" />
                          {t('certifications.title')}
                        </div>
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                          <Award className="w-5 h-5 text-primary" />
                          <span className="text-foreground">{t('certifications.postgresql')}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-accent/5 to-transparent rounded-lg">
                          <Award className="w-5 h-5 text-accent" />
                          <span className="text-foreground">{t('certifications.java')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible> */}
            </div>
          </div>
        </Motion>
      </div>
    </section>
  );
}



function AboutMeSectionSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-20 relative z-10 max-w-7xl mx-auto">
        {/* Hero Section Skeleton */}
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto" />
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-12 sm:h-16 w-3/4 mx-auto" />
              <Skeleton className="h-8 sm:h-10 w-1/2 mx-auto" />
            </div>
            <Skeleton className="h-6 w-4/5 mx-auto" />
          </div>
        </div>

        {/* Current Role Skeleton */}
        <Card className="relative overflow-hidden border-2 border-primary/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </div>
              <Skeleton className="w-full h-72 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid Skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-8 text-center">
                  <div className="space-y-4">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto" />
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-20 mx-auto" />
                      <div className="space-y-2">
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-3 w-16 mx-auto" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Skeleton */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Skeleton className="w-7 h-7" />
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <Skeleton className="h-3 w-full rounded-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="w-full h-64 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack Skeleton */}
        <div className="grid lg:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, techIndex) => (
                    <div key={techIndex}>
                      <Skeleton className="h-4 w-20 mb-2" />
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 3 }).map((_, badgeIndex) => (
                          <Skeleton key={badgeIndex} className="h-6 w-16 rounded-full" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects Section Skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="w-8 h-8" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-20 w-full" />
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, badgeIndex) => (
                          <Skeleton key={badgeIndex} className="h-6 w-16 rounded-full" />
                        ))}
                      </div>
                    </div>
                    <Skeleton className="w-full h-48 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div className="text-center space-y-12">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/20">
            <CardContent className="pt-12 pb-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-64 mx-auto" />
                  <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Skeleton className="h-12 w-40 rounded-lg" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function AboutMeSectionWrapper({ translations, locale }: AboutMeSectionProps) {
  return (
    <Suspense fallback={<AboutMeSectionSkeleton />}>
      <AboutMeSection translations={translations} locale={locale} />
    </Suspense>
  )
}