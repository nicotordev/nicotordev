import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import AdminTools from "@/components/admin/admin-tools";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  const user = await currentUser();

  const role = (user?.privateMetadata?.role as string | undefined) ?? null;
  if (!user || role !== "admin") {
    return redirect(`/${locale}`);
  }

  const typedLocale = locale as Locale;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <AdminTools locale={typedLocale} />
    </div>
  );
}
