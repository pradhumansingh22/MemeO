import { getServerSession } from "next-auth";
import { Memes } from "../components/Memes";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await getServerSession();
    if (!session) redirect('/signin');
    return (
        <Memes/>
    );
}