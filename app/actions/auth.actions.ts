'use server'

import { prisma } from '@/prisma/prisma';
import { User, Session } from '@/lib/generated/prisma';
import bcrypt from 'bcrypt';
import { headers } from 'next/headers';
import { getCookie, setCookie } from 'cookies-next/server';


interface SessionWithUser extends Session {
    user: User;
}

// Types for authentication data
export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

// Sign in user
export async function signIn(email: string, password: string): Promise<{
    success: boolean;
    user?: User;
    session?: SessionWithUser;
    error?: string
}> {
    try {
        const existingSessionId = await getCookie('sessionId');
        const headersStore = await headers();
        const ip = headersStore.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headersStore.get('user-agent') || 'Unknown';

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { success: false, error: 'Invalid password' };
        }

        if (existingSessionId) {
            const existingSession = await prisma.session.findUnique({
                where: { id: existingSessionId },
                include: {
                    user: true,
                },
            });

            if (existingSession) {
                return { success: true, user, session: existingSession as SessionWithUser };
            }
        }

        let session = await prisma.session.findFirst({
            where: {
                userId: user.id,
            },
        });

        if (!session) {
            session = await prisma.session.create({
                data: {
                    userId: user.id,
                    ip,
                    userAgent,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                },
            });
        }

        setCookie('sessionId', session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/',
        });

        return { success: true, user, session: session as SessionWithUser };
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, error: 'Failed to sign in' };
    }
}

// Sign out user
export async function signOut(): Promise<{ success: boolean; error?: string }> {
    try {
        const headersStore = await headers();
        const ip = headersStore.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headersStore.get('user-agent') || 'Unknown';
        const existingSessionId = await getCookie('sessionId');

        const session = await prisma.session.findFirst({
            where: {
                ip,
                userAgent,
            },
        });

        if (session) {
            await prisma.session.delete({
                where: { id: session.id },
            });
        }

        if (existingSessionId) {
            await prisma.session.delete({
                where: { id: existingSessionId },
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Error signing out:', error);
        return { success: false, error: 'Failed to sign out' };
    }
}

// Get current session
export async function getSession(): Promise<{ success: boolean; session?: SessionWithUser; error?: string }> {
    try {
        const headersStore = await headers();
        const ip = headersStore.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headersStore.get('user-agent') || 'Unknown';
        const existingSessionId = await getCookie('sessionId');

        const session = await prisma.session.findFirst({
            where: {
                ip,
                userAgent,
                expiresAt: {
                    gt: new Date(),
                },
            },
            include: {
                user: true,
            },
        });

        if (existingSessionId) {
            return { success: true, session: session as SessionWithUser || undefined };
        }

        return { success: true, session: session as SessionWithUser || undefined };
    } catch (error) {
        console.error('Error fetching session:', error);
        return { success: false, error: 'Failed to fetch session' };
    }
}

// Sign up new user
export async function signUp(name: string, email: string, password: string): Promise<{
    success: boolean;
    user?: User;
    error?: string
}> {
    try {
        const headersStore = await headers();
        const ip = headersStore.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headersStore.get('user-agent') || 'Unknown';
        const existingSessionId = await getCookie('sessionId');

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (existingUser) {
            return { success: false, error: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword
            },
        });

        if (existingSessionId) {
            await prisma.session.delete({
                where: { id: existingSessionId },
            });
        }

        const session = await prisma.session.create({
            data: {
                userId: user.id,
                ip,
                userAgent,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            },
        });


        setCookie('sessionId', session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/',
            sameSite: 'strict',
        });

        return { success: true, user };
    } catch (error) {
        console.error('Error signing up:', error);
        return { success: false, error: 'Failed to create user' };
    }
}

// Validate session
export async function validateSession(sessionId: string): Promise<{
    success: boolean;
    session?: SessionWithUser;
    user?: User;
    error?: string
}> {
    try {
        const session = await prisma.session.findUnique({
            where: {
                id: sessionId,
                expiresAt: {
                    gt: new Date(),
                },
            },
            include: {
                user: true,
            },
        });

        if (!session) {
            return { success: false, error: 'Invalid or expired session' };
        }

        return { success: true, session: session as SessionWithUser, user: session.user || undefined };
    } catch (error) {
        console.error('Error validating session:', error);
        return { success: false, error: 'Failed to validate session' };
    }
}