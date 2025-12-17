"use client";

import { Link as LinkIcon, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShortenerCard from "@/components/admin/shortener-card";
import UploaderCard from "@/components/admin/uploader-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type AdminToolsProps = {
  locale: string;
};

export default function AdminTools({ locale }: AdminToolsProps) {
  return (
    <Tabs defaultValue="shortener" className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <p className="text-sm text-muted-foreground">
            URL shortener and Cloudflare R2 uploader.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TabsList className="w-fit">
            <TabsTrigger value="shortener" className="gap-2">
              <LinkIcon className="size-4" />
              Shortener
            </TabsTrigger>
            <TabsTrigger value="uploader" className="gap-2">
              <Upload className="size-4" />
              Uploader
            </TabsTrigger>
          </TabsList>
          <Button asChild variant="outline" size="sm">
            <Link href={`/${locale}/admin/links`}>Links dashboard</Link>
          </Button>
        </div>
      </div>

      <TabsContent value="shortener" className="mt-6">
        <ShortenerCard locale={locale} />
      </TabsContent>
      <TabsContent value="uploader" className="mt-6">
        <UploaderCard />
      </TabsContent>
    </Tabs>
  );
}
