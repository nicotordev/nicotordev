import { prisma } from "@/prisma/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
        redirect('/auth/sign-in');
    }

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
            user: true,
        }
    })

    if (!session) {
        redirect('/auth/sign-in');
    }

    if (session.user?.role !== 'ADMIN') {
        redirect('/auth/sign-in');
    }

    return <div>{children}</div>;
}