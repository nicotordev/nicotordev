import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import BackgroundWavesAnimated from "../../../../components/backgrounds/background-waves-animated";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Form Section */}
      <div className="flex w-full flex-col items-center justify-center lg:bg-background px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight lg:text-foreground text-white">
              Welcome back
            </h2>
            <p className="text-sm lg:text-muted-foreground text-white ">
              Please enter your details to sign in.
            </p>
          </div>
          <div className="flex justify-center">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "w-full bg-transparent shadow-none p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  formFieldLabel: "text-white lg:text-foreground",
                  formFieldInput:
                    "bg-white/10 lg:bg-background border-white/20 lg:border-border text-white lg:text-foreground placeholder:text-gray-400 lg:placeholder:text-muted-foreground focus:border-primary focus:ring-primary rounded-xl",
                  formButtonPrimary:
                    "bg-primary text-primary-foreground hover:bg-primary/90 !shadow-none",
                  footerActionLink: "text-primary hover:text-primary/90",
                  socialButtonsBlockButton:
                    "bg-white/10 lg:bg-card border-white/10 lg:border-border text-white lg:text-foreground hover:bg-white/20 lg:hover:bg-muted",
                  socialButtonsBlockButtonText: "text-white lg:text-foreground",
                  dividerLine: "bg-white/20 lg:bg-border",
                  dividerText: "text-white/60 lg:text-muted-foreground",
                },
              }}
              withSignUp={true}
              oauthFlow="redirect"
              signInUrl="/sign-in"
              signUpUrl="/sign-in"
              __experimental={{
                newComponents: true,
              }}
            />
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="absolute lg:relative inset-0 lg:w-2/4 flex-1 overflow-hidden lg:block -z-1 lg:z-10">
        <BackgroundWavesAnimated />
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
