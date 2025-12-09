export type AssetDTO = {
  id: string;
  name: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
  type: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";
};

export type ProjectDTO = {
  id: string;
  name: string;
  cost: number;
  description: string;
  tech: string; // Prisma: `@db.VarChar(255)` (comma or space separated)
  impact?: string;
  image: string;
  link?: string;
  linkText?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  assets: AssetDTO[];
};
