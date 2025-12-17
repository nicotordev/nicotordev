import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LinksDashboard from "@/components/admin/links/links-dashboard";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminLinksPage({ params }: Props) {
  const { locale } = await params;
  const user = await currentUser();
  const role = (user?.privateMetadata?.role as string | undefined) ?? null;
  if (!user || role !== "admin") return redirect(`/${locale}`);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <LinksDashboard />
    </div>
  );
}

