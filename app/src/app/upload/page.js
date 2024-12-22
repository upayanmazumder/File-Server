"use client";

import React from 'react';
import styles from "../page.module.css";

import Upload from "../../components/upload/upload";

const UploadPage = () => {
    return (
        <div className={styles.page}>
            <main class={styles.main}>
                <Upload />
            </main>
        </div>
    );
};

export default UploadPage;

