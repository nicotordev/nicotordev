import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LinkEditor from "@/components/admin/links/link-editor";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminLinksNewPage({ params }: Props) {
  const { locale } = await params;
  const user = await currentUser();
  const role = (user?.privateMetadata?.role as string | undefined) ?? null;
  if (!user || role !== "admin") return redirect(`/${locale}`);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <LinkEditor mode="create" />
    </div>
  );
}

