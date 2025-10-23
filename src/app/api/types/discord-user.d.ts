export type PrimaryGuild = {
    /**
     * The tag label
     */
    tag?: string

    /**
     * the PrimaryGuild badge image url
     */
    badge?: string 
}


export type DiscordUser = {
    /**
     * 	the user's display name, if it is set. For bots, this is the application name
     */
    globalUsername?: string;

    /**
     * the user's username, not unique across the platform	
     */
    username: string; 

    /**
     * the user's avatar url if exists
     */
    avatar?: string ; 

    /**
     * the user's banner url if exists
     */
    banner?: string ; 

    /**
     * the user's banner color
     */
    bannerColor?: string ;

    /**
     * The user's primary guild badge 
     */
    primaryGuild?: PrimaryGuild 

    /**
     * the user's avatar decoration url
     */
    avatarDecoration?: string 
};