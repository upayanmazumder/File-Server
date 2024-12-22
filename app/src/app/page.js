"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firestore } from "../../shared/firebase";
import styles from "./page.module.css";

import Uploads from "../components/uploads/uploads";

export default function Home() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      const q = query(collection(firestore, "files"), orderBy("uploadedAt", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const uploadsData = querySnapshot.docs.map(doc => doc.data());
      setUploads(uploadsData);
    };

    fetchUploads();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/file.svg"
          alt="File Server"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Try <a href="/upload">uploading</a> a file
            <a href="/upload" download className={styles.downloadButton}>Download</a>
          </li>
          <li>Save and see your changes instantly.
            <a href="/changes" download className={styles.downloadButton}>Download</a>
          </li>
        </ol>

        <Uploads />
      </main>
    </div>
  );
}