import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LinkEditor from "@/components/admin/links/link-editor";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function AdminLinkDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const user = await currentUser();
  const role = (user?.privateMetadata?.role as string | undefined) ?? null;
  if (!user || role !== "admin") return redirect(`/${locale}`);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <LinkEditor mode="edit" id={id} />
    </div>
  );
}

