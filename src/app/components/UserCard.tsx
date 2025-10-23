/* eslint-disable @next/next/no-img-element */
import { DiscordUser } from "../api/types/discord-user";
import styles from "./user-card.module.css";

/**
 *  The discord userdata
 */
interface DiscordCardProps {
    userData: DiscordUser;
}
export default function UserCard({ userData }: DiscordCardProps) {
    return (
        <article className={styles.card}>
            <header>
                <img
                    src={userData.banner}
                    alt={userData.username}
                    className={styles.banner}
                />
                <div className={styles.avatarContainer}>
                    <img
                        src={userData.avatarDecoration}
                        alt={`${userData.username} decoration`}
                        className={styles.avatarDecoration}
                    />
                    <img
                        src={userData.avatar}
                        alt={`${userData.username} avatar`}
                        className={styles.avatar}
                    />
                </div>
            </header>
            <div className={styles.userInfos}>
                <div className={styles.userInfosName}>
                    <h2>{userData.globalUsername}</h2>
                    <p>{userData.username}</p>
                </div>
                <div className={styles.userInfosTag}>
                    <img src={userData.primaryGuild?.badge} alt="user data guild badge" />
                    <p>{userData.primaryGuild?.tag}</p>
                </div>
            </div>
        </article>
    );
}
