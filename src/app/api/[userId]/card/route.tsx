// app/api/discord/[id]/route.ts
import type { DiscordUser } from "../../types/discord-user";
import { fetchDiscordUser } from "@/lib/fetchUserData";
import UserCard from "@/app/components/UserCard";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    const { userId } = await params;
    const ReactDOMServer = (await import("react-dom/server")).default;

    if (!userId) {
        return new Response(`<text>No user ID provided</text>`, {
            status: 400,
            headers: { "Content-Type": "image/svg+xml" },
        });
    }

    // Appel à ton API interne pour récupérer les données Discord
    const userData: DiscordUser | null = await fetchDiscordUser(userId);
    if (!userData) {
        return new Response(`<text>User not found</text>`, {
            status: 404,
            headers: { "Content-Type": "image/svg+xml" },
        });
    }

    const encodeImage = async (url: string | undefined) => {
        if (!url) return undefined;
        const res = await fetch(url);
        if (!res.ok) return undefined;
        const buffer = Buffer.from(await res.arrayBuffer());
        const mime = res.headers.get("content-type") || "image/png";
        return `data:${mime};base64,${buffer.toString("base64")}`;
    };
    const banner = await encodeImage(userData.banner);
    const avatar = await encodeImage(userData.avatar);
    const avatarDecoration = await encodeImage(userData.avatarDecoration);
    const guildBadge = await encodeImage(userData.primaryGuild?.badge);
    // Rendu du composant en SVG
    try {
        const svgString = ReactDOMServer.renderToStaticMarkup(
            <UserCard
                userData={{
                    ...userData,
                    banner,
                    avatar,
                    avatarDecoration,
                    primaryGuild: {
                        ...userData.primaryGuild,
                        badge: guildBadge,
                    },
                }}
            />
        );

        return new Response(svgString, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=60, s-maxage=60",
            },
        });
    } catch (err) {
        console.error("Error rendering SVG:", err);
        return new Response(`<text>Error generating SVG</text>`, {
            status: 500,
            headers: { "Content-Type": "image/svg+xml" },
        });
    }
}
