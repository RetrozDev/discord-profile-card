/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useParams } from "next/navigation";

interface User {
    avatar: string;
    avatarDecoration?: string;
    banner?: string;
    bannerColor?: string;
    globalUsername: string;
    username: string;
    clan?: { badge: string; tag: string };
}

async function fetchUser(userId: string): Promise<User> {
    const res = await fetch(`/api/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export default function UserCard() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]);

    useEffect(() => {
        if (!user || !cardRef.current) return;

        // On attend que toutes les images soient chargées
        const images = cardRef.current.querySelectorAll("img");
        const promises = Array.from(images).map(
            (img) =>
                new Promise<void>((resolve) => {
                    if (img.complete) resolve();
                    else img.onload = () => resolve();
                    img.onerror = () => resolve();
                })
        );

        Promise.all(promises).then(() => {
            html2canvas(cardRef.current!, { useCORS: true }).then((canvas) =>
                setImageUrl(canvas.toDataURL("image/png"))
            );
        });
    }, [user]);

    if (!user) return <div>Loading...</div>;

    const cardStyle = {
        position: "absolute" as const,
        left: -9999,
        top: -9999,
        width: 500,
        height: 200,
        background: user.bannerColor || "#2C2F33",
        borderRadius: 15,
        overflow: "hidden",
        color: "#fff",
        fontFamily: "sans-serif",
    };

    // On ne rend plus le div caché si l'image est générée
    return (
        <>
            {!imageUrl && (
                <div ref={cardRef} style={cardStyle}>
                    {user.banner && (
                        <img
                            src={user.banner}
                            alt="banner"
                            style={{ width: "100%", height: 80, objectFit: "cover" }}
                        />
                    )}
                    <img
                        src={user.avatar}
                        alt="avatar"
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            position: "absolute",
                            top: 50,
                            left: 20,
                        }}
                    />
                    {user.avatarDecoration && (
                        <img
                            src={user.avatarDecoration}
                            alt="decoration"
                            style={{
                                position: "absolute",
                                top: 45,
                                left: 15,
                                width: 110,
                                height: 110,
                            }}
                        />
                    )}
                    <div style={{ position: "absolute", top: 60, left: 140 }}>
                        <h2 style={{ margin: 0 }}>{user.globalUsername}</h2>
                        <p style={{ margin: 0, color: "#B9BBBE" }}>@{user.username}</p>
                        {user.clan && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
                                <img
                                    src={user.clan.badge}
                                    alt="clan badge"
                                    style={{ width: 24, height: 24, marginRight: 5 }}
                                />
                                <span>{user.clan.tag}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {imageUrl && <img src={imageUrl} alt="user card" />}
        </>
    );
}
