import { getSession } from "./actions/auth.actions";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    await getSession()
    return children;
}