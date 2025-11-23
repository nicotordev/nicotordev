import Header from "@/components/common/header";
import { getMessages } from "next-intl/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const navigation = (messages.navigation as any) || {};
  const common = (messages.common as any) || {};

  return (
    <>
      <Header navigation={navigation} login={common.login} />
      {children}
    </>
  );
}
