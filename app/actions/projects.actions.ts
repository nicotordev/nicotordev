'use server';

import { prisma } from '@/prisma/prisma';
import type { Project, Asset } from '@/lib/generated/prisma';
import { revalidatePath } from 'next/cache';

// Types for form data
export interface CreateAssetData {
    name: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    blurDataUrl?: string;
    type?: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT';
    priority?: number;
}

export interface CreateProjectData {
    name: string;
    description: string;
    tech: string;
    impact?: string;
    image: string;
    link?: string;
    linkText?: string;
    isActive?: boolean;
    sortOrder?: number;
    assets?: CreateAssetData[];
}

export type UpdateProjectData = Partial<CreateProjectData>

interface ProjectWithAssets extends Project {
    assets: Asset[];
}

// Create a new project with assets
export async function createProject(data: CreateProjectData): Promise<{ success: boolean; project?: Project; error?: string }> {
    try {
        const project = await prisma.project.create({
            data: {
                name: data.name.trim(),
                description: data.description.trim(),
                tech: data.tech.trim(),
                impact: data.impact?.trim() ?? null,
                image: data.image.trim(),
                link: data.link?.trim() ?? null,
                linkText: data.linkText?.trim() ?? null,
                isActive: data.isActive ?? true,
                sortOrder: data.sortOrder ?? 0,
                ...(data.assets
                    ? {
                        assets: {
                            create: data.assets.map((asset) => ({
                                name: asset.name.trim(),
                                url: asset.url.trim(),
                                alt: asset.alt?.trim() ?? null,
                                ...(asset.width !== undefined ? { width: asset.width } : {}),
                                ...(asset.height !== undefined ? { height: asset.height } : {}),
                                blurDataUrl: asset.blurDataUrl?.trim() ?? null,
                                type: asset.type || 'IMAGE',
                                priority: asset.priority ?? 0,
                            })),
                        },
                    }
                    : {}),
            },
            include: {
                assets: true,
            },
        });

        revalidatePath('/admin/projects');
        return { success: true, project };
    } catch (error) {
        console.error('Error creating project:', error);
        return { success: false, error: 'Failed to create project' };
    }
}

// Get all projects with optional filtering
export async function getProjects(filters?: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
}): Promise<{ success: boolean; projects?: ProjectWithAssets[]; error?: string }> {
    try {
        const args: Parameters<typeof prisma.project.findMany>[0] = {
            orderBy: { sortOrder: 'asc' },
            include: {
                assets: {
                    orderBy: { priority: 'asc' },
                },
            },
            ...(filters?.isActive !== undefined ? { where: { isActive: filters.isActive } } : {}),
            ...(typeof filters?.limit === 'number' ? { take: filters.limit } : {}),
            ...(typeof filters?.offset === 'number' ? { skip: filters.offset } : {}),
        };
        const projects = (await prisma.project.findMany(args)) as unknown as ProjectWithAssets[];

        return { success: true, projects };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { success: false, error: 'Failed to fetch projects' };
    }
}

// Get active projects only (for public display)
export async function getActiveProjects(): Promise<{ success: boolean; projects?: ProjectWithAssets[]; error?: string }> {
    try {
        const projects = (await prisma.project.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
                assets: {
                    orderBy: { priority: 'asc' },
                },
            },
        })) as unknown as ProjectWithAssets[];

        return { success: true, projects };
    } catch (error) {
        console.error('Error fetching active projects:', error);
        return { success: false, error: 'Failed to fetch active projects' };
    }
}

// Get a single project by ID
export async function getProjectById(id: string): Promise<{ success: boolean; project?: ProjectWithAssets; error?: string }> {
    try {
        const project = (await prisma.project.findUnique({
            where: { id },
            include: {
                assets: {
                    orderBy: { priority: 'asc' },
                },
            },
        })) as unknown as ProjectWithAssets | null;

        if (!project) {
            return { success: false, error: 'Project not found' };
        }

        return { success: true, project };
    } catch (error) {
        console.error('Error fetching project:', error);
        return { success: false, error: 'Failed to fetch project' };
    }
}

// Update a project
export async function updateProject(
    id: string,
    data: UpdateProjectData
): Promise<{ success: boolean; project?: ProjectWithAssets; error?: string }> {
    try {
        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return { success: false, error: 'Project not found' };
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                ...(data.name ? { name: data.name.trim() } : {}),
                ...(data.description ? { description: data.description.trim() } : {}),
                ...(data.tech ? { tech: data.tech.trim() } : {}),
                ...(data.impact !== undefined ? { impact: data.impact?.trim() ?? null } : {}),
                ...(data.image ? { image: data.image.trim() } : {}),
                ...(data.link !== undefined ? { link: data.link?.trim() ?? null } : {}),
                ...(data.linkText !== undefined ? { linkText: data.linkText?.trim() ?? null } : {}),
                updatedAt: new Date(),
                ...(data.assets
                    ? {
                        assets: {
                            deleteMany: {},
                            create: data.assets.map((asset) => ({
                                name: asset.name.trim(),
                                url: asset.url.trim(),
                                alt: asset.alt?.trim() ?? null,
                                ...(asset.width !== undefined ? { width: asset.width } : {}),
                                ...(asset.height !== undefined ? { height: asset.height } : {}),
                                blurDataUrl: asset.blurDataUrl?.trim() ?? null,
                                type: asset.type || 'IMAGE',
                                priority: asset.priority ?? 0,
                            })),
                        },
                    }
                    : {}),
            },
            include: {
                assets: {
                    orderBy: { priority: 'asc' },
                },
            },
        });

        revalidatePath('/admin/projects');
        revalidatePath(`/admin/projects/${id}`);
        return { success: true, project };
    } catch (error) {
        console.error('Error updating project:', error);
        return { success: false, error: 'Failed to update project' };
    }
}

// Delete a project
export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return { success: false, error: 'Project not found' };
        }

        await prisma.project.delete({
            where: { id },
        });

        revalidatePath('/admin/projects');
        return { success: true };
    } catch (error) {
        console.error('Error deleting project:', error);
        return { success: false, error: 'Failed to delete project' };
    }
}

// Update project sort order
export async function updateProjectSortOrder(
    projectIds: string[]
): Promise<{ success: boolean; error?: string }> {
    try {
        const updatePromises = projectIds.map((id, index) =>
            prisma.project.update({
                where: { id },
                data: { sortOrder: index },
            })
        );

        await Promise.all(updatePromises);

        revalidatePath('/admin/projects');
        return { success: true };
    } catch (error) {
        console.error('Error updating project sort order:', error);
        return { success: false, error: 'Failed to update project sort order' };
    }
}

// Toggle project active status
export async function toggleProjectActive(id: string): Promise<{ success: boolean; project?: ProjectWithAssets; error?: string }> {
    try {
        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return { success: false, error: 'Project not found' };
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                isActive: !existingProject.isActive,
                updatedAt: new Date(),
            },
            include: {
                assets: {
                    orderBy: { priority: 'asc' },
                },
            },
        });

        revalidatePath('/admin/projects');
        return { success: true, project };
    } catch (error) {
        console.error('Error toggling project active status:', error);
        return { success: false, error: 'Failed to toggle project active status' };
    }
}

// Search projects by name or description
export async function searchProjects(query: string): Promise<{
    success: boolean;
    projects?: ProjectWithAssets[];
    error?: string;
}> {
    try {
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { tech: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: { sortOrder: 'asc' },
            take: 50, // Limit search results
            include: {
                assets: {
                    orderBy: { priority: 'asc' },
                },
            },
        });

        return { success: true, projects };
    } catch (error) {
        console.error('Error searching projects:', error);
        return { success: false, error: 'Failed to search projects' };
    }
}

// Create asset for existing project
export async function createAsset(
    projectId: string,
    data: CreateAssetData
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
    try {
        const existingProject = await prisma.project.findUnique({
            where: { id: projectId },
        });

        if (!existingProject) {
            return { success: false, error: 'Project not found' };
        }

        const asset = await prisma.asset.create({
            data: {
                name: data.name.trim(),
                url: data.url.trim(),
                alt: data.alt?.trim() ?? null,
                ...(data.width !== undefined ? { width: data.width } : {}),
                ...(data.height !== undefined ? { height: data.height } : {}),
                blurDataUrl: data.blurDataUrl?.trim() ?? null,
                type: data.type || 'IMAGE',
                priority: data.priority ?? 0,
                projectId,
            },
        });

        revalidatePath('/admin/projects');
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, asset };
    } catch (error) {
        console.error('Error creating asset:', error);
        return { success: false, error: 'Failed to create asset' };
    }
}

// Update asset
export async function updateAsset(
    id: string,
    data: Partial<CreateAssetData>
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
    try {
        const existingAsset = await prisma.asset.findUnique({
            where: { id },
        });

        if (!existingAsset) {
            return { success: false, error: 'Asset not found' };
        }

        const asset = await prisma.asset.update({
            where: { id },
            data: {
                ...data,
                ...(data.name ? { name: data.name.trim() } : {}),
                ...(data.url ? { url: data.url.trim() } : {}),
                ...(data.alt !== undefined ? { alt: data.alt?.trim() ?? null } : {}),
                ...(data.blurDataUrl !== undefined ? { blurDataUrl: data.blurDataUrl?.trim() ?? null } : {}),
                updatedAt: new Date(),
            },
        });

        revalidatePath('/admin/projects');
        revalidatePath(`/admin/projects/${asset.projectId}`);
        return { success: true, asset };
    } catch (error) {
        console.error('Error updating asset:', error);
        return { success: false, error: 'Failed to update asset' };
    }
}

// Delete asset
export async function deleteAsset(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const existingAsset = await prisma.asset.findUnique({
            where: { id },
        });

        if (!existingAsset) {
            return { success: false, error: 'Asset not found' };
        }

        await prisma.asset.delete({
            where: { id },
        });

        revalidatePath('/admin/projects');
        revalidatePath(`/admin/projects/${existingAsset.projectId}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting asset:', error);
        return { success: false, error: 'Failed to delete asset' };
    }
}

// Update asset priority order
export async function updateAssetPriority(
    assetIds: string[]
): Promise<{ success: boolean; error?: string }> {
    try {
        const updatePromises = assetIds.map((id, index) =>
            prisma.asset.update({
                where: { id },
                data: { priority: index },
            })
        );

        await Promise.all(updatePromises);

        // Get project ID for revalidation
        const firstAssetId = assetIds[0];
        let firstAsset: { projectId: string } | null = null;
        if (firstAssetId) {
            firstAsset = await prisma.asset.findUnique({
                where: { id: firstAssetId },
                select: { projectId: true },
            });
        }

        revalidatePath('/admin/projects');
        if (firstAsset) {
            revalidatePath(`/admin/projects/${firstAsset.projectId}`);
        }
        return { success: true };
    } catch (error) {
        console.error('Error updating asset priority:', error);
        return { success: false, error: 'Failed to update asset priority' };
    }
}
