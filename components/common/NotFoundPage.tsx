import AnimatedBackgroundBlobs from "./AnimatedBackgroundBlobs";
import Motion from "./Motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
    const translations = useTranslations('NotFound')

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <AnimatedBackgroundBlobs />

            <div className="relative z-10 text-center space-y-8 px-4 sm:px-6 lg:px-8">
                {/* 404 Number with enhanced effects */}
                <Motion
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-3xl opacity-30 animate-pulse" />
                        <h1 className="relative text-8xl sm:text-9xl lg:text-[12rem] font-bold gradient-text animate-shimmer leading-none">
                            404
                        </h1>
                    </div>
                </Motion>

                {/* Content */}
                <div className="space-y-6 max-w-2xl mx-auto">
                    <Motion
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
                            {translations('title')}
                        </h2>
                    </Motion>

                    <Motion
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            {translations('description')}
                        </p>
                    </Motion>

                    {/* CTA Button */}
                    <Motion
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Motion
                            motionElement="div"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="pt-4"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl glass dark:glass-dark"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                {translations('button')}
                            </Link>
                        </Motion>
                    </Motion>
                </div>

                {/* Floating Elements */}
                <Motion
                    className="absolute top-20 left-10 opacity-20"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-sm" />
                </Motion>

                <Motion
                    className="absolute bottom-32 right-16 opacity-20"
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-sm" />
                </Motion>
            </div>
        </div>
    )
}