/**
 * Users in Discord are generally considered the base entity. Users can spawn across the entire platform, be members of guilds, participate in text and voice chat, and much more. Users are separated by a distinction of "bot" vs "normal." Although they are similar, bot users are automated users that are "owned" by another user. Unlike normal users, bot users do not have a limitation on the number of Guilds they can be a part of.
 */
export type DiscordData = {
    /**
     * the user's id
     */
    id: string;

    /**
     * the user's username, not unique across the platform
     */
    username: string;

    /**
     * the user's Discord-tag
     */
    discriminator: string;

    /**
     * the user's display name, if it is set. For bots, this is the application name
     */
    global_name?: string;

    /**
     * the user's avatar hash
     */
    avatar?: string;

    /**
     * whether the user belongs to an OAuth2 application
     */
    bot?: boolean;

    /**
     * whether the user is an Official Discord System user (part of the urgent message system)
     */
    system?: boolean;

    /**
     * whether the user has two factor enabled on their account
     */
    mfa_enabled?: boolean;

    /**
     * the user's banner hash
     */
    banner?: string;

    /**
     * the user's banner color encoded as an integer representation of hexadecimal color code
     */
    accent_color?: number;

    /**
     * the user's chosen language option
     */
    locale?: string;

    /**
     * whether the email on this account has been verified
     */
    verified?: boolean;

    /**
     * the user's email
     */
    email?: string;

    /**
     * the flags on a user's account
     */
    flags?: number;

    /**
     * the type of Nitro subscription on a user's account
     */
    premium_type?: number;

    /**
     * the public flags on a user's account
     */
    public_flags?: number;

    /**
     * data for the user's avatar decoration
     */
    avatar_decoration_data?: {
        /**
         * the avatar decoration hash
         */
        asset: string;

        /**
         * id of the avatar decoration's SKU
         */
        sku_id: string;
    };

    /**
     * data for the user's collectibles
     */
    collectibles?: {
        /**
         * object mapping of nameplate data
         */
        nameplate?: {
            /**
             * id of the nameplate SKU
             */
            sku_id: string;

            /**
             * path to the nameplate asset
             */
            asset: string;

            /**
             * the label of this nameplate. Currently unused
             */
            label: string;

            /**
             * background color of the nameplate, one of:
             * crimson, berry, sky, teal, forest, bubble_gum, violet, cobalt, clover, lemon, white
             */
            palette: string;
        };
    };

    /**
     * the user's primary guild
     */
    primary_guild?: {
        /**
         * the id of the user's primary guild
         */
        identity_guild_id: string;

        /**
         * whether the user is displaying the primary guild's server tag.
         * This can be null if the system clears the identity, e.g. the server no longer supports tags.
         * This will be false if the user manually removes their tag.
         */
        identity_enabled: boolean;

        /**
         * the text of the user's server tag. Limited to 4 characters
         */
        tag: string;

        /**
         * the server tag badge hash
         */
        badge: string;
    };
};
