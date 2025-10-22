import { NextRequest, NextResponse } from "next/server";
import type { Clan, DiscordUser } from "../types/discord-user";

const getAssetsUrl = (
    userId: string | null,
    hash: string | null,
    type: "avatars" | "banners" | "clan-badges" | "avatar-decoration-presets"
): string | null => {
    if (!hash) return null;
    const ext = hash.startsWith("a_") ? "gif" : "png";

    if (type === "avatar-decoration-presets") {
        return `https://cdn.discordapp.com/${type}/${hash}.gif?size=1280&passthrough=true`;
    }

    if (!userId) return null;
    return `https://cdn.discordapp.com/${type}/${userId}/${hash}.${ext}`;
};

function getDiscordAccentColor(accent_color: number | null): string | null {
    if (!accent_color) return null;
    return `#${accent_color.toString(16).padStart(6, "0")}`;
}

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    const { userId } = await params;

    if (!userId)
        return NextResponse.json(
            { error: "User ID required" },
            { status: 400 }
        );

    const BOT_TOKEN = process.env.BOT_TOKEN;
    if (!BOT_TOKEN)
        return NextResponse.json(
            { error: "Bot token not set" },
            { status: 500 }
        );

    const response = await fetch(
        `https://discord.com/api/v10/users/${userId}`,
        {
            headers: { Authorization: `Bot ${BOT_TOKEN}` },
        }
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: "User not found" },
            { status: response.status }
        );
    }

    const data = await response.json();

    const userClan: Clan = {
        tag: data?.clan?.tag || null,
        badge: getAssetsUrl(
            data?.clan?.identity_guild_id,
            data?.clan?.badge,
            "clan-badges"
        ),
    };
    const user: DiscordUser = {
        globalUsername: data?.global_name,
        username: data?.username,
        avatar: getAssetsUrl(data?.id, data?.avatar, "avatars") || null,
        banner: getAssetsUrl(data?.id, data?.banner, "banners") || null,
        bannerColor: getDiscordAccentColor(data.accent_color) || null,
        clan: userClan,
        avatarDecoration: getAssetsUrl(
            data?.avatar_decoration_data?.sku_id,
            data?.avatar_decoration_data?.asset,
            "avatar-decoration-presets"
        ),
    };

    return NextResponse.json(user);
}
