"use client";

import React, { useState } from 'react';
import styles from "../page.module.css";

import Upload from "../../components/upload/upload";

export default () => {
    return (
        <div className={styles.page}>
            <main class={styles.main}>
                <Upload />
            </main>
        </div>
    );
};

