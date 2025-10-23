/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import type { DiscordUser } from "./api/types/discord-user";
import styles from "./home.module.css";
import UserCard from "./components/UserCard";

export default function HomePage() {
    const [discordId, setDiscordId] = useState<string>("");
    const [userData, setUserData] = useState<DiscordUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setUserData(null);

        if (!discordId.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/${discordId.trim()}`);
            if (!res.ok) throw new Error("User not found");
            const data: DiscordUser = await res.json();
            setUserData(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                throw error;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.box}>
                <h1 className={styles.title}>Get your Discord User Card</h1>
                <p className={styles.subtitle}>
                    Enter your Discord ID below to generate your card
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Enter your Discord ID"
                        value={discordId}
                        onChange={(e) => setDiscordId(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        {loading ? "Loading..." : "Generate"}
                    </button>
                </form>

                {error && <p className={styles.error}>{error}</p>}

                {userData && (
                  <UserCard userData={userData}/>
                )}
            </div>
        </main>
    );
}
