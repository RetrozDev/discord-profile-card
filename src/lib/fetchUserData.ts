import type { DiscordUser } from "@/app/api/types/discord-user"

export async function fetchDiscordUser(userId: string): Promise<DiscordUser | null> {
  if (!userId) return null

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${userId}`)
    if (!res.ok) return null
    const data: DiscordUser = await res.json()
    return data
  } catch (err) {
    console.error('Error fetching Discord user:', err)
    return null
  }
}
