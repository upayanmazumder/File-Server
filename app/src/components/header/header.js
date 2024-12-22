import React from 'react';
import { FaGithub, FaDiscord, FaSignInAlt } from 'react-icons/fa';
import { IoCreateOutline } from "react-icons/io5";
import styles from './header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer}>
          <img src="/file.svg" alt="File Server Logo" className={styles.icon} />
          <h1 className={styles.title}>File Server</h1>
        </Link>
        <div className={styles.buttonContainer}>
          <a
            href="/upload"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <IoCreateOutline className={styles.iconStyle} />
            Upload
          </a>
          <a
            href="https://github.com/upayanmazumder/File-Server"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <FaGithub className={styles.iconStyle} />
            GitHub Repo
          </a>
          <a
            href="https://discord.gg/wQTZcXpcaY"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <FaDiscord className={styles.iconStyle} />
            Discord
          </a>
          <Link href="/auth" className={styles.button}>
            <FaSignInAlt className={styles.iconStyle} />
            Authenticate
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
