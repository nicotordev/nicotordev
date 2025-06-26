'use client'
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HeroSectionAbout() {
    const tHero = useTranslations('hero')
    return (
        <Button
            size="lg"
            className="text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
        >
            <Link href="#about-me">
                <Rocket className="w-5 h-5 mr-2" />
                {tHero('cta.about')}
            </Link>
        </Button>
    )
}