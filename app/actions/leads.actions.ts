'use server'

import { prisma } from '@/prisma/prisma';
import { Lead, LeadStatus, ProjectType, Budget, Timeline, Priority, ContactPreference } from '@/lib/generated/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from './auth.actions';

// Types for form data
export interface CreateLeadData {
    name: string;
    email: string;
    company: string;
    projectType: ProjectType;
    budget: Budget;
    timeline: Timeline;
    priority: Priority;
    message: string;
    contactPreference: ContactPreference;
    source?: string;
}

export interface UpdateLeadData extends Partial<CreateLeadData> {
    status?: LeadStatus;
    notes?: string;
    followUpDate?: Date;
    assignedTo?: string;
}

// Create a new lead
export async function createLead(data: CreateLeadData): Promise<{ success: boolean; lead?: Lead; error?: string }> {
    try {
        const session = await getSession()

        if (!session.success || !session.session?.id) {
            return { success: false, error: 'Failed to get session' };
        }

        const lead = await prisma.lead.create({
            data: {
                name: data.name.trim(),
                email: data.email.toLowerCase().trim(),
                company: data.company.trim(),
                projectType: data.projectType,
                budget: data.budget,
                timeline: data.timeline,
                priority: data.priority,
                message: data.message.trim(),
                contactPreference: data.contactPreference,
                source: data.source || 'contact_form',
                sessionId: session.session.id,
            },
        });

        revalidatePath('/admin/leads');
        return { success: true, lead };
    } catch (error) {
        console.error('Error creating lead:', error);
        return { success: false, error: 'Failed to create lead' };
    }
}

// Get all leads with optional filtering
export async function getLeads(filters?: {
    status?: LeadStatus;
    limit?: number;
    offset?: number;
}): Promise<{ success: boolean; leads?: Lead[]; error?: string }> {
    try {
        const leads = await prisma.lead.findMany({
            where: filters?.status ? { status: filters.status } : undefined,
            orderBy: { createdAt: 'desc' },
            take: filters?.limit,
            skip: filters?.offset,
        });

        return { success: true, leads };
    } catch (error) {
        console.error('Error fetching leads:', error);
        return { success: false, error: 'Failed to fetch leads' };
    }
}

// Get a single lead by ID
export async function getLeadById(id: string): Promise<{ success: boolean; lead?: Lead; error?: string }> {
    try {
        const lead = await prisma.lead.findUnique({
            where: { id },
        });

        if (!lead) {
            return { success: false, error: 'Lead not found' };
        }

        return { success: true, lead };
    } catch (error) {
        console.error('Error fetching lead:', error);
        return { success: false, error: 'Failed to fetch lead' };
    }
}

// Update a lead
export async function updateLead(
    id: string,
    data: UpdateLeadData,
    sessionId: string
): Promise<{ success: boolean; lead?: Lead; error?: string }> {
    try {
        const existingLead = await prisma.lead.findUnique({
            where: { id },
        });

        if (!existingLead) {
            return { success: false, error: 'Lead not found' };
        }

        const lead = await prisma.lead.update({
            where: { id },
            data: {
                ...data,
                email: data.email ? data.email.toLowerCase().trim() : undefined,
                name: data.name ? data.name.trim() : undefined,
                company: data.company ? data.company.trim() : undefined,
                message: data.message ? data.message.trim() : undefined,
                updatedAt: new Date(),
                sessionId: sessionId,
            },
        });

        revalidatePath('/admin/leads');
        revalidatePath(`/admin/leads/${id}`);
        return { success: true, lead };
    } catch (error) {
        console.error('Error updating lead:', error);
        return { success: false, error: 'Failed to update lead' };
    }
}

// Delete a lead
export async function deleteLead(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const existingLead = await prisma.lead.findUnique({
            where: { id },
        });

        if (!existingLead) {
            return { success: false, error: 'Lead not found' };
        }

        await prisma.lead.delete({
            where: { id },
        });

        revalidatePath('/admin/leads');
        return { success: true };
    } catch (error) {
        console.error('Error deleting lead:', error);
        return { success: false, error: 'Failed to delete lead' };
    }
}

// Get leads count by status
export async function getLeadsStats(): Promise<{
    success: boolean;
    stats?: Record<LeadStatus, number>;
    error?: string;
}> {
    try {
        const statuses = Object.values(LeadStatus);
        const stats: Record<LeadStatus, number> = {} as Record<LeadStatus, number>;

        for (const status of statuses) {
            const count = await prisma.lead.count({
                where: { status },
            });
            stats[status] = count;
        }

        return { success: true, stats };
    } catch (error) {
        console.error('Error fetching leads stats:', error);
        return { success: false, error: 'Failed to fetch leads statistics' };
    }
}

// Search leads by email or name
export async function searchLeads(query: string): Promise<{
    success: boolean;
    leads?: Lead[];
    error?: string;
}> {
    try {
        const leads = await prisma.lead.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                    { company: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: { createdAt: 'desc' },
            take: 50, // Limit search results
        });

        return { success: true, leads };
    } catch (error) {
        console.error('Error searching leads:', error);
        return { success: false, error: 'Failed to search leads' };
    }
}