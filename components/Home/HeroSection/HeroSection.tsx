import Motion from "../../common/Motion";
import { assets } from "@/app/assets";
import AnimatedBackgroundBlobs from "../../common/AnimatedBackgroundBlobs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Rocket, Zap } from "lucide-react";
import HeroSectionScrollIndictor from "./HeroSectionScrollIndictor";
import { getHeroTranslations, getResumeTranslations } from "@/app/actions/language.actions";
import { Badge } from "../../ui/badge";
import HeroSectionAbout from "../../HeroSectionAbout";

export default async function HeroSection() {
  const [tHero, tResume] = await Promise.all([
    getHeroTranslations(),
    getResumeTranslations()
  ])
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatedBackgroundBlobs />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Main Content */}
          <div className="space-y-8 max-w-4xl">
            {/* Main Heading with gradient text */}
            <Motion
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">{tHero('greeting')}</span>{" "}
                <span className="text-accent">
                  {tHero('name')}
                </span>
              </h1>
            </Motion>

            {/* Subtitle with enhanced styling */}
            <Motion
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
                {tHero('description')}
              </p>
            </Motion>

            {/* Enhanced feature badges */}
            <Motion
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20" asChild>
                  <>
                    <Rocket className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{tHero('title_backend')}</span>
                  </>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20" asChild>
                  <>
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{tHero('title_frontend')}</span>
                  </>
                </Badge>
              </div>
            </Motion>

            {/* CTA Buttons with enhanced styling */}
            <Motion
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Motion
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HeroSectionAbout />
              </Motion>

              <Motion
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {tHero('cta.resume')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    <DropdownMenuItem asChild>
                      <a href={assets.resume.pdf} download className="flex items-center w-full cursor-pointer">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        {tResume('pdf')}
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={assets.resume.pptx} download className="flex items-center w-full cursor-pointer">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {tResume('pptx')}
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={assets.resume.csv} download className="flex items-center w-full cursor-pointer">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {tResume('csv')}
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={assets.resume.json} download className="flex items-center w-full cursor-pointer">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {tResume('json')}
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Motion>
            </Motion>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      {/* <Motion
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}

      >
        <div className="relative p-4 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
          <Motion
            className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center relative overflow-hidden"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Motion
              className="w-1 h-3 bg-gradient-to-b from-primary to-accent rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </Motion>
        </div>
      </Motion> */}
      <HeroSectionScrollIndictor />
    </section>
  );
}
