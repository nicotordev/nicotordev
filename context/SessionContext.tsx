'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/lib/generated/prisma'
import { getSession, signOut } from '@/app/actions/auth.actions'

interface SessionWithUser {
    id: string
    ip: string
    userAgent: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    userId: string | null
    user?: User | null
}

interface SessionContextType {
    user: User | null
    session: SessionWithUser | null
    isLoading: boolean
    signOut: () => Promise<void>
    refreshSession: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext)
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider')
    }
    return context
}

interface SessionProviderProps {
    children: React.ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<SessionWithUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const refreshSession = async (): Promise<void> => {
        try {
            setIsLoading(true)
            const { success, session: sessionData } = await getSession()
            
            if (success && sessionData) {
                setSession(sessionData as SessionWithUser)
                setUser(sessionData.user || null)
            } else {
                setSession(null)
                setUser(null)
            }
        } catch (error) {
            console.error('Error refreshing session:', error)
            setSession(null)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignOut = async (): Promise<void> => {
        try {
            await signOut()
            setUser(null)
            setSession(null)
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    useEffect(() => {
        refreshSession()
    }, [])

    const value: SessionContextType = {
        user,
        session,
        isLoading,
        signOut: handleSignOut,
        refreshSession
    }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}
