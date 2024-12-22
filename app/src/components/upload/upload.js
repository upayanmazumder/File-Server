import React, { useState } from 'react';
import { storage, firestore, auth } from '../../../shared/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './upload.module.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [fileName, setFileName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);

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

        const storageRef = ref(storage, `files/${userId}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                setMessage(`Upload failed: ${error.message}`);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(collection(firestore, 'files'), {
                        userId,
                        fileName,
                        description,
                        isPublic,
                        downloadURL,
                        createdAt: new Date()
                    });
                    setMessage('File uploaded successfully');
                });
            }
        );
    };

    return (
        <div className={styles.container}>
            <input type="file" onChange={handleChange} className={styles.input} />
            <input
                type="text"
                placeholder="File Name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className={styles.input}
            />
            <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
            />
            <div>
                <label>
                    <input
                        type="radio"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                        className={styles.radio}
                    />
                    Public
                </label>
                <label>
                    <input
                        type="radio"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                        className={styles.radio}
                    />
                    Private
                </label>
            </div>
            <button onClick={handleUpload} className={styles.button}>Upload</button>
            <p className={styles.message}>{message}</p>
            <progress value={progress} max="100" className={styles.progress} />
        </div>
    );
};

export default FileUpload;