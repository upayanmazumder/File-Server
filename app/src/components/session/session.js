"use client"

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../shared/firebase';
import Link from 'next/link';
import styles from './session.module.css';

const Session = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className={styles.sessionContainer}>
            {user ? (
                <Link href="/dashboard" className={styles.loginLink}>
                    <img src={user.photoURL} alt="Profile Picture" className={styles.profilePic} />
                    <span className={styles.userName}>{user.displayName}</span>
                </Link>
            ) : (
                <Link href="/auth" className={styles.loginLink}>
                    Login
                </Link>
            )}
        </div>
    );
};

export default Session;