export type Clan = {
    /**
     * The tag label
     */
    tag: string | null

    /**
     * the clan badge image url
     */
    badge: string | null
}


export type DiscordUser = {
    /**
     * 	the user's display name, if it is set. For bots, this is the application name
     */
    globalUsername: string;

    /**
     * the user's username, not unique across the platform	
     */
    username: string; 

    /**
     * the user's avatar url if exists
     */
    avatar: string | null; 

    /**
     * the user's banner url if exists
     */
    banner: string | null; 

    /**
     * the user's banner color
     */
    bannerColor: string | null;

    /**
     * The user's clan badge 
     */
    clan: Clan | null

    /**
     * the user's avatar decoration url
     */
    avatarDecoration: string | null
};