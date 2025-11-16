import type { AssetDTO } from "types/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

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
  return (
    <Card className="pb-3">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">
          {description.slice(0, 100)}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={image}
          alt={name}
          width={400}
          height={225}
          className="rounded-md object-cover"
        />
      </CardContent>
      <CardFooter>
        <div className="w-full border-t">
          <div className="flex items-center gap-4 pt-2">
            <Button variant="ghost" size="icon" className="group rounded-full">
              <ThumbsUp className="h-4 w-4 text-muted-foreground font-semibold group-hover:text-primary-foreground" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
