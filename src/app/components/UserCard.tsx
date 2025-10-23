/* eslint-disable @next/next/no-img-element */
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DiscordUser } from "../api/types/discord-user";

interface DiscordCardProps {
    userData: DiscordUser;
}

const ForeignDiv = (
    props: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement> & { xmlns: string },
        HTMLDivElement
    >
) => <div {...props}>{props.children}</div>;

export const UserCard: React.FC<DiscordCardProps> = ({
    userData,
}: DiscordCardProps) => {
    const cardStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: `'Century Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
        justifyContent: "space-between",
        gap: "8px",
        width: "300px",
        height: "220px",
        borderRadius: "1rem",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#2e2f34",
    };

    const headerStyle: React.CSSProperties = {
        height: "150px",
        width: "100%",
        position: "relative",
    };

    const bannerStyle: React.CSSProperties = {
        width: "100%",
        // objectFit: "cover",
        display: "block",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    const avatarContainerStyle: React.CSSProperties = {
        width: "96px",
        height: "96px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        transform: "translateY(-25%)",
        marginLeft: "4px",
    };

    const avatarDecorationStyle: React.CSSProperties = {
        position: "absolute",
        width: "92px",
        height: "92px",
    };

    const avatarStyle: React.CSSProperties = {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
    };

    const userInfosStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        width: "100%",
        padding: "0 8px 8px 16px",
    };

    const userInfosNameStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px 8px 8px 16px",
    };

    const globalUsernameStyle: React.CSSProperties = {
        color: "rgba(220, 220, 220, 1)",
        fontSize: "20px",
        height: "auto",
        fontWeight: 800,
        margin: 0,
    };

    const usernameStyle: React.CSSProperties = {
        margin: 0,
        color: "rgba(220, 220, 220, 0.8)",
    };

    const userInfosTagStyle: React.CSSProperties = {
        alignItems: "center",
        height: "fit-content",
        display: "flex",
        justifyContent: "space-between",
        padding: "1px",
        marginBottom: "8px",
        borderRadius: "6px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        color: "rgba(220, 220, 220, 0.8)",
    };

    const badgeImgStyle: React.CSSProperties = {
        height: "14px",
        margin: "0px 0px 0px 2px",
    };

    const tagPStyle: React.CSSProperties = {
        fontSize: "12px",
        margin: "0px 2px 0px 0px",
    };
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={300}
            height={220}
            viewBox={`0 0 ${300} ${220}`}
        >
            <foreignObject x="0" y="0" width="300" height="220">
                <ForeignDiv
                    style={cardStyle}
                    xmlns="http://www.w3.org/1999/xhtml"
                >
                    <header style={headerStyle}>
                        {userData.banner && (
                            <img
                                src={userData.banner}
                                alt={userData.username}
                                style={bannerStyle}
                            />
                        )}
                        <div style={avatarContainerStyle}>
                            {userData.avatarDecoration && (
                                <img
                                    src={userData.avatarDecoration}
                                    alt={`${userData.username} decoration`}
                                    style={avatarDecorationStyle}
                                />
                            )}
                            <img
                                src={userData.avatar}
                                alt={`${userData.username} avatar`}
                                style={avatarStyle}
                            />
                        </div>
                    </header>
                    <div style={userInfosStyle}>
                        <div style={userInfosNameStyle}>
                            {userData.globalUsername && (
                                <h2 style={globalUsernameStyle}>
                                    {userData.globalUsername}
                                </h2>
                            )}
                            <p style={usernameStyle}>{userData.username}</p>
                        </div>
                        {userData.primaryGuild?.tag && (
                            <div style={userInfosTagStyle}>
                                <img
                                    src={userData.primaryGuild?.badge}
                                    alt="user data guild badge"
                                    style={badgeImgStyle}
                                />
                                <p style={tagPStyle}>
                                    {userData.primaryGuild?.tag}
                                </p>
                            </div>
                        )}
                    </div>
                </ForeignDiv>
            </foreignObject>
        </svg>
    );
};

export default UserCard;
