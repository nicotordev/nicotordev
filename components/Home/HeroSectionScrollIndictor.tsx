'use client'
import { motion } from "framer-motion"
export default function HeroSectionScrollIndictor() {

    function pushToAboutMe() {
        document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.button
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onClick={pushToAboutMe}
        >
            <div className="relative p-4 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
                <motion.div
                    className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center relative overflow-hidden"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                    <motion.div
                        className="w-1 h-3 bg-gradient-to-b from-primary to-accent rounded-full mt-2"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                </motion.div>
            </div>
        </motion.button>
    )
}