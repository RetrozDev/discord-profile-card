import { NextRequest, NextResponse } from "next/server";
import type { PrimaryGuild, DiscordUser } from "../types/discord-user";
import { DiscordData } from "../types/discord-data";

const getAssetsUrl = (
    userId: string | undefined,
    hash: string | undefined,
    type: "avatars" | "banners" | "clan-badges" | "avatar-decoration-presets"
): string | undefined => {
    if (!hash) return undefined;
    const ext = hash.startsWith("a_") ? "gif" : "png";

    if (type === "avatar-decoration-presets") {
        return `https://cdn.discordapp.com/${type}/${hash}.png?size=1280&passthrough=true`;
    }

    if (!userId) return undefined;
    return `https://cdn.discordapp.com/${type}/${userId}/${hash}.${ext}`;
};

function getDiscordAccentColor(accent_color?: number): string | undefined {
    if (!accent_color) return undefined;
    return `#${accent_color.toString(16).padStart(6, "0")}`;
}

export async function GET(
    req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
    const { userId: userId } = await params;

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

    const data: DiscordData = await response.json();

    const user: DiscordUser = {
        globalUsername: data?.global_name,
        username: data?.username,
        avatar: getAssetsUrl(data?.id, data?.avatar, "avatars"),
        banner: getAssetsUrl(data?.id, data?.banner, "banners"),
        bannerColor: getDiscordAccentColor(data?.accent_color),
        avatarDecoration: getAssetsUrl(
            data?.avatar_decoration_data?.sku_id,
            data?.avatar_decoration_data?.asset,
            "avatar-decoration-presets"
        ),
        ...(data?.primary_guild
            ? {
                  primaryGuild: {
                      tag: data.primary_guild.tag,
                      badge: getAssetsUrl(
                          data.primary_guild.identity_guild_id,
                          data.primary_guild.badge,
                          "clan-badges"
                      ),
                  } as PrimaryGuild,
              }
            : {}),
    };

    return NextResponse.json(user);
}
