'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

export default function HomePage() {
  const [discordId, setDiscordId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (discordId.trim()) router.push(`/${discordId.trim()}`);
  };

  return (
    <main className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Get your Discord User Card</h1>
        <p className={styles.subtitle}>Enter your Discord ID below to generate your card</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Enter your Discord ID"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Generate</button>
        </form>
      </div>
    </main>
  );
}

