'use client'
import ContactButton from "../common/ContactButton";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { ThemeToggle } from "../common/ThemeToggle";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Mail, LogIn, UserPlus, User, LogOut } from "lucide-react";

import { useSession } from "@/context/SessionContext";
import { useTranslations } from "next-intl";

export default function Header() {
    const translations = useTranslations('common')
    const { session } = useSession()

    return (
        <Card className={cn(
            "fixed top-4 right-4 z-50",
            "backdrop-blur-md bg-background/80 border-border/40",
            "shadow-lg hover:shadow-xl transition-shadow duration-200",
            "p-2"
        )}>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <div className="w-px h-6 bg-border" />
                <ThemeToggle />
                <div className="w-px h-6 bg-border" />
                <ContactButton trigger={
                    <Button variant="outline" size="icon">
                        <Mail className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                } />
                <div className="w-px h-6 bg-border" />
                {session ? (
                    <>
                        <Button variant="outline" size="sm">
                            <User className="h-4 w-4 mr-2" />
                            {translations('profile')}
                        </Button>
                        <Button variant="ghost" size="sm">
                            <LogOut className="h-4 w-4 mr-2" />
                            {translations('logout')}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="outline" size="sm">
                            <LogIn className="h-4 w-4 mr-2" />
                            {translations('login')}
                        </Button>
                        <Button variant="default" size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            {translations('signUp')}
                        </Button>
                    </>
                )}
            </div>
        </Card>
    )
}