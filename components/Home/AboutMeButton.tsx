'use client'
import Motion from "../Home/Motion";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AboutMeButton() {
    const tHero = useTranslations('about')
    const pathname = usePathname() + '#about-me'
    return (
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
                <Link href={pathname}>
                    <Button
                        size="lg"
                        className="text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {tHero('cta.about')}
                    </Button>
                </Link>
            </Motion>
        </Motion>
    )
}