"use client";

import type { AssetDTO } from "types/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar, Share, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useLocalizedPreferences } from "@/hooks/use-localized-preferences";

interface ProjectCardProps {
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
}

export default function ProjectCard({
  id,
  name,
  cost,
  description,
  tech,
  impact,
  image,
  link,
  linkText,
  isActive,
  sortOrder,
  createdAt,
  updatedAt,
  assets,
}: ProjectCardProps) {
  const { } = useLocalizedPreferences();
  return (
    <Card className="pb-3">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">
          {description.slice(0, 100)}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md h-48 overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={400}
            height={225}
            className="rounded-md object-contain w-full h-full"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full border-t flex items-center justify-between pt-3">
          <div className="flex items-center gap-2 pt-2">
            <Button variant="ghost" size="icon" className="group rounded-full">
              <ThumbsUp className="h-4 w-4 text-muted-foreground font-bold group-hover:text-primary-foreground stroke-muted-foreground stroke-2" />
            </Button>
            <Button variant="ghost" size="icon" className="group rounded-full">
              <Share className="h-4 w-4 text-muted-foreground font-bold group-hover:text-primary-foreground stroke-muted-foreground stroke-2" />
            </Button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground font-bold group-hover:text-primary-foreground stroke-muted-foreground stroke-2" />
              <span className="text-sm font-medium text-muted-foreground">{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
