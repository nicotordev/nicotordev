"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Form Section */}
      <div className="flex w-full flex-col items-center justify-center lg:bg-background px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight lg:text-foreground text-background">
              Welcome back
            </h2>
            <p className="text-sm lg:text-muted-foreground text-background">
              Please enter your details to sign in.
            </p>
          </div>
          <div className="flex justify-center">
            <SignIn />
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="absolute lg:relative inset-0 lg:w-2/4 flex-1 overflow-hidden lg:block -z-1 lg:z-10">
        <motion.div
          className="absolute inset-0 h-full w-full"
          initial={{ scale: 1, rotate: 0 }}
          animate={{ scale: 1.2, rotate: 5 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/background/bg-waves.webp"
            alt="Sign in background"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/80 pointer-events-none" />
        <div className="hidden absolute inset-0 lg:flex flex-col items-center justify-center p-12 text-center pointer-events-none">
          <Image
            src="/images/nicolas/conce-ai.webp"
            alt="Conce AI Logo"
            width={120}
            height={120}
            className="mb-4 h-32 w-32 rounded-2xl object-cover shadow-2xl"
          />
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
            Conce AI
          </h1>
          <p className="mt-2 text-xl leading-8 text-gray-200 max-w-lg drop-shadow-md">
            Experience the future of development with our advanced AI solutions.
            Streamline your workflow and unlock new possibilities.
          </p>
        </div>
      </div>
    </div>
  );
}
