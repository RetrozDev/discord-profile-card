import { NextRequest, NextResponse } from "next/server";
import type { Clan, DiscordUser } from "../types/discord-user";

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } } | { params: Promise<{ userId: string }> }
) {
  // ✅ supporte les deux versions de Next.js
  const params = await Promise.resolve(context.params);
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: "Bot token not set" }, { status: 500 });
  }

  const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
    headers: { Authorization: `Bot ${BOT_TOKEN}` },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "User not found" },
      { status: response.status }
    );
  }

  const data = await response.json();

  const userClan: Clan = {
    tag: data?.clan?.tag || null,
    badge: data?.clan?.badge
      ? `https://cdn.discordapp.com/clan-badges/${data.clan.identity_guild_id}/${data.clan.badge}.png`
      : null,
  };

  const user: DiscordUser = {
    globalUsername: data?.global_name,
    username: data?.username,
    avatar: data?.avatar
      ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
      : null,
    banner: data?.banner
      ? `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.png`
      : null,
    bannerColor: data?.accent_color
      ? `#${data.accent_color.toString(16).padStart(6, "0")}`
      : null,
    clan: userClan,
    avatarDecoration: data?.avatar_decoration_data
      ? `https://cdn.discordapp.com/avatar-decoration-presets/${data.avatar_decoration_data.asset}.png?size=1280&passthrough=true`
      : null,
  };

  return NextResponse.json(user);
}
