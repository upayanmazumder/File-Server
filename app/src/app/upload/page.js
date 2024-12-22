"use client";

import React, { useState } from 'react';
import { storage, firestore, auth } from '../../../shared/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import styles from "../page.module.css";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);

    // Monitor authentication state
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
                setMessage('Please log in to upload files');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!userId) {
            setMessage('You must be logged in to upload files');
            return;
        }

        if (!file) {
            setMessage('No file selected');
            return;
        }

        // Check if file size exceeds 5MB
        if (file.size > 5 * 1024 * 1024) {
            setMessage('File size exceeds the 5MB limit');
            return;
        }

        const storageRef = ref(storage, `files/${userId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.error(error);
                setMessage('Upload failed');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(collection(firestore, 'files'), {
                        name: file.name,
                        url: downloadURL,
                        userId: userId, // Add user ID to metadata
                        uploadedAt: new Date().toISOString(), // Optional: Add timestamp
                    }).then(() => {
                        setMessage('File uploaded successfully');
                        setProgress(0);
                        setFile(null);
                    }).catch((error) => {
                        console.error(error);
                        setMessage('Failed to save file info to Firestore');
                    });
                });
            }
        );
    };

    return (
        <div className={styles.page}>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload} disabled={!userId}>Upload</button>
            <div>Progress: {progress}%</div>
            <div>{message}</div>
        </div>
    );
};

export default FileUpload;
