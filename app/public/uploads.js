import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firestore } from "../../../shared/firebase";
import { FaFileDownload } from "react-icons/fa";
import uploadStyles from "./uploads.module.css";

export default function Home() {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchUploads = async () => {
            const q = query(collection(firestore, "files"), orderBy("createdAt", "desc"), limit(10));
            const querySnapshot = await getDocs(q);
            const uploadsData = querySnapshot.docs.map(doc => doc.data());
            setUploads(uploadsData);
        };

        fetchUploads();
    }, []);

    return (
        <div className={uploadStyles.page}>
            <h2>Latest Uploads</h2>
            <div className={uploadStyles.cardContainer}>
                {uploads.map((upload, index) => (
                    <div key={index} className={uploadStyles.card}>
                        <h3>{upload.fileName}</h3>
                        <p>Uploaded by {upload.userId}</p>
                        <p>{new Date(upload.createdAt.toDate()).toLocaleString()}</p>
                        <a href={upload.downloadURL} download className={uploadStyles.downloadButton}><FaFileDownload /></a>
                    </div>
                ))}
            </div>
        </div>
    );
}