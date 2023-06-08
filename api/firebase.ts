
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider, GoogleAuthProvider,
    PhoneAuthProvider,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signInWithPopup,
    signOut,
    Unsubscribe
} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {
    addDoc,
    collection, doc, DocumentData, getDoc,
    getDocs, limit, onSnapshot, orderBy,
    Query, query, QueryDocumentSnapshot,
    serverTimestamp, setDoc, startAfter,
    Timestamp, updateDoc, where, writeBatch
} from 'firebase/firestore';
import {
    deleteObject, getDownloadURL, getStorage, list, listAll, ref,
    StorageReference,
    uploadBytes
} from "firebase/storage";
import { auth, db } from '../firebase.app';
import IProduct from '../models/IProduct';

// Initialize Firebase
export const rtdb = getDatabase();
const storage = getStorage();

//FIRESTORE
export const addData = (docRef: string, data: any) => {
    addDoc(collection(db, docRef), data);
};

export const setData = (docRef: string, id: string, data: any) => {
    setDoc(doc(db, docRef, id), data, { merge: true });
};

export const updateData = (docRef: string, id: string, data: any) => {
    updateDoc(doc(db, docRef, id), data);
};

export const addMessage = (chatId: string | undefined, data: { _id: string | undefined; user: { _id: any; }; }, chatee: { _id: any; }) => {
    const batch = writeBatch(db)

    const chatsRef = collection(db, `chats`)
    const messagesRef = collection(db, `chats/${chatId}/messages`);

    batch.set(doc(messagesRef, data._id), {
        ...data,
        createdAt: Timestamp.now(),
        sentAt: serverTimestamp(),
    }, { merge: true })

    if (chatee) {
        batch.set(doc(chatsRef, chatId), {
            lastMessage: {
                ...data,
                createdAt: Timestamp.now(),
                sentAt: serverTimestamp(),
            },
            users: {
                [data.user._id]: {
                    ...data.user
                },
                [chatee._id]: {
                    ...chatee
                }
            }
        }, { merge: true })
    } else {
        batch.set(doc(chatsRef, chatId), {
            lastMessage: {
                ...data,
                createdAt: Timestamp.now(),
                sentAt: serverTimestamp(),
            },
            users: {
                [data.user._id]: {
                    ...data.user
                }
            }
        }, { merge: true })
    }


    batch.commit().catch(console.warn).then(() => {
        console.warn('message has been sent!')
    })


    // setDoc(doc(db, docRef, id), {
    //     lm: data,
    //     messages: arrayUnion(data)
    // }, { merge: true });
};

const setMessageAsSeen = (chatId: string, messageId: string) => {
    updateDoc(doc(db, 'chats', chatId, 'messages', messageId), {
        seen: true,
        received: true
    });
}

export const setisTyping = (chatId: string, userId: any, value = false) => {
    updateDoc(doc(db, 'chats', chatId), {
        [`isTyping.${userId}`]: value
    });
}

export const getMessages = (chatId: any, listener: (arg0: any[]) => void) => {
    const ref = collection(db, `chats/${chatId}/messages`)
    const q = query(ref, orderBy('createdAt', 'desc'));

    // let chatteeId = chatId.replace(auth.currentUser.uid, '').replace('_', '')

    const unsubscribe: Unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: { id: string; createdAt: any; sent: boolean; pending: boolean; received: any; }[] = [];
        if (querySnapshot.empty) {
            listener(messages)
            return unsubscribe
        }

        querySnapshot.forEach((_doc) => {
            const data = _doc.data()
            const sent = (() => {
                if (typeof data.sentAt == 'string') return false
                return true
            })()

            if (data.user._id != auth.currentUser?.uid && !data.received) {
                setMessageAsSeen(chatId, _doc.id)
                console.warn('Set as seen ' + _doc.id)
            }

            messages.push({
                ...data,
                id: _doc.id,
                createdAt: data.createdAt.toDate(),
                sent: sent,
                pending: !sent,
                received: data.received
            });
        });
        listener(messages)
        return unsubscribe

    }, (e) => {
        // TODO: Must log the above error to server build indexes when needed
        console.log(e)
        listener([])
    });

    return unsubscribe

};

export const getChats = (userId: any, listener: (arg0: any[]) => void) => {
    const ref = collection(db, `chats`)
    const q = query(ref, where(`users.${userId}`, '>=', 0));

    const unsubscribe: Unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: { id: string; createdAt: any; }[] = [];
        if (querySnapshot.empty) {
            listener(data)
            return unsubscribe
        }
        querySnapshot.forEach((_doc) => {
            data.push({ ..._doc.data(), id: _doc.id, createdAt: _doc.data().createdAt.toDate() });
        });
        listener(data)
    }, (e) => {
        // TODO: Must log the above error to server build indexes when needed
        console.log(e)
        listener([])
    });

    return unsubscribe

};

export const getData = async (docRef: string, id: string) => {
    const data = await getDoc(doc(db, docRef, id));

    if (data.exists()) {
        return data.data();
    } else {
        return null;
    }
};

export const getSearches = async (userId: unknown, maxResult = 10) => {
    const ref = collection(db, "posts");
    let q = query(ref, where('userId', '==', userId), orderBy("id"), limit(maxResult))

    const querySnapshot = await getDocs(q);
    return querySnapshot

};

export const getWordpressPosts = async (init: any, lastDoc: unknown, maxResult = 10) => {
    const wpRef = collection(db, "wordpress");

    let q = null

    if (init) {
        q = query(wpRef, orderBy("id"), limit(maxResult))
    } else {
        q = query(wpRef, orderBy("id"), startAfter(lastDoc), limit(maxResult))
    }

    const querySnapshot = await getDocs(q);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { data: querySnapshot, lastVisible: lastVisible }
};

export const getArtisans = async (filters: any[], maxResults = 10) => {

    const artisansRef = collection(db, "users");
    let q: Query<DocumentData> = query(artisansRef);

    if (filters.length > 0) {
        for (const key in filters) {
            q = query(artisansRef, where(filters[key].field, filters[key].operator, filters[key].value), limit(maxResults));
            console.log(filters[key].value);
        }
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot

}


// BOUTIQUE ATELIER

export const getProducts = (filters: any[], handler: (p: IProduct[]) => void) => {
    const artisansRef = collection(db, "products");
    let q: Query<DocumentData> = query(artisansRef);

    if (filters.length > 0) {
        for (const key in filters) {
            q = query(artisansRef, where(filters[key].field, filters[key].operator, filters[key].value));
        }
    }

    const subscription = onSnapshot(q, querySnapshot => {
        if (querySnapshot.empty) handler([])
        if (!querySnapshot.empty) handler(querySnapshot.docs.map(p => ({ ...p.data(), id: p.id })) as IProduct[])
    }, e => handler([]))

    return subscription

}

export const getBestProducts = (handler: (p: IProduct[]) => void) => {
    const artisansRef = collection(db, "products");
    let q = query(artisansRef, where('status', '==', 'approved'), limit(6));;


    const subscription = onSnapshot(q, querySnapshot => {
        if (querySnapshot.empty) handler([])
        if (!querySnapshot.empty) handler(querySnapshot.docs.map(p => ({ ...p.data(), id: p.id })) as IProduct[])
    }, e => handler([]))

    return subscription

}

export const getMyProducts = (filters: any[], handler: (arg0: QueryDocumentSnapshot<DocumentData>[]) => void) => {
    const artisansRef = collection(db, "products");
    let q: Query<DocumentData> = query(artisansRef);

    if (filters.length > 0) {
        for (const key in filters) {
            q = query(artisansRef, where(filters[key].field, filters[key].operator, filters[key].value));
        }
    }

    getDocs(q)
        .then(
            querySnapshot => {
                handler(querySnapshot.docs)
            }
        )
        .catch(
            e => handler([])
        )

}

//STORAGE

export const uploadAvatar = async (userId: string, file: { uri: any; }) => {
    const { uri } = file;
    const storageRef = ref(storage, userId + '/profile/avatar.jpg');

    const response = await fetch(uri);
    const blob = await response.blob();

    uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

}

export const uploadAudio = async (file: { uri: any; }, handler: (value?: string) => void) => {
    const { uri } = file;
    const fileName = uri.split('/').pop()
    const storageRef = ref(storage, `/audios/${fileName}`);

    const response = await fetch(uri);
    const blob = await response.blob();

    try {
        const results = await uploadBytes(storageRef, blob)
        const refInStorage = await getDownloadURL(results.ref)
        if (refInStorage) handler(refInStorage)
        return refInStorage
    } catch (e) {
        handler()
        return
    }

}

export const uploadPhoto = async (file: { uri: string }, handler: (value?: string) => void) => {
    const { uri } = file;
    const fileName = uri.split('/').pop()
    const storageRef = ref(storage, `/images/${fileName}`);

    const response = await fetch(uri);
    const blob = await response.blob();

    try {
        const results = await uploadBytes(storageRef, blob)
        const refInStorage = await getDownloadURL(results.ref)
        if (refInStorage) handler(refInStorage)
        return refInStorage
    } catch (e) {
        handler()
        return
    }

}

export const uploadGallery = async (userId: string, file: { uri: any; }) => {
    const { uri } = file;
    const storageRef = ref(storage, userId + '/gallery/' + Date.now() + '.jpg');

    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise(function (resolve, reject) {
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            resolve(true)
        }).catch((error) => {
            // Uh-oh, an error occurred!
            reject(error)
        });
    });
}

export const uploadProductImage = async (file: { uri: any; }) => {
    const { uri } = file;
    const storageRef = ref(storage, '/product_images/' + Date.now() + '.jpg');

    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise(function (resolve, reject) {
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            resolve(snapshot.ref)
        }).catch((error) => {
            // Uh-oh, an error occurred!
            reject(error)
        });
    });
}

export const deleteFile = (file: string | undefined) => {
    return new Promise(function (resolve, reject) {
        const imageRef = ref(storage, file);

        deleteObject(imageRef).then((res) => {
            // File deleted successfully
            resolve(res)
        }).catch((error) => {
            // Uh-oh, an error occurred!
            reject(error)
        });
    });
}

export const getGallery = (userId: string) => {
    const folderRef = ref(storage, userId + '/gallery');

    return list(folderRef).then(result => {
        return Promise.all(result.items.map(imgRef => getDownloadURL(imgRef)));
    })
}

export const getAvatar = async (userId: string) => {
    const folderRef = ref(storage, userId + '/profile/avatar.jpg');

    return getDownloadURL(folderRef)
}

export const getUserLocalData = async () => {
    const jsonValue = await localStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export const getFile = (folder: string, userId: string) => {
    return new Promise(function (resolve, reject) {
        const folderRef = ref(storage, userId + '/' + folder + '/');
        let imageItems: any = [];
        listAll(folderRef)
            .then((res: { items: any[]; }) => {

                res.items.forEach((itemRef: StorageReference) => {
                    // All the items under listRef.
                    console.log('item');
                    getDownloadURL(itemRef)
                        .then((url) => {
                            imageItems.push(url);
                        }).catch((error) => {
                            reject(error);
                        });
                    console.log(imageItems)
                    resolve(imageItems)
                });
            }).catch((error: any) => {
                // Uh-oh, an error occurred!
                reject(error)
            });


    });
}

//AUTH

export const logout = () => {
    return new Promise(function (resolve, reject) {
        signOut(auth)
            .then(() => {
                localStorage.setItem('@user', "")
                resolve(true)
            })
            .catch(error => {
                reject(error)
            });
    });

};


export const signup = (email: string, password: string) => {
    return new Promise(function (resolve, reject) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                resolve(userCredential);
            })
            .catch(error => {
                reject(error)
            });
    });
};

export const signin = (email: string, password: string) => {
    return new Promise(function (resolve, reject) {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                resolve(userCredential);
            })
            .catch(error => {
                reject(error)
            });
    });
};

export const resetPassword = (email: any, password: any) => {
    return new Promise(function (resolve, reject) {
        sendPasswordResetEmail(auth, email)
            .then((userCredential: unknown) => {
                resolve(userCredential);
            })
            .catch((error: any) => {
                reject(error)
            });
    });
};

export const signinWithPhone = async (phone: string, token: any, code = null, confirmation: any = null) => {

    if (code) {
        //var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
        const credential = PhoneAuthProvider.credential(confirmation?.verificationId, code)
        // login with credential
        const firebaseUserCredential = await signInWithCredential(auth, credential);

        return firebaseUserCredential;
    } else {
        const captchaVerifier = {
            type: 'recaptcha',
            verify: () => Promise.resolve(token),
            _reset: () => { return null }
        }
        return new Promise(function (resolve, reject) {
            signInWithPhoneNumber(auth, phone, captchaVerifier)
                .then(userCredential => {
                    resolve(userCredential);
                })
                .catch(error => {
                    reject(error)
                });
        });
    }


};

export const signupWithGoogle = async () => {

    try {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    } catch (e) {

    }

    return null
};

export const signupWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });

    } catch (e) {

    }



};

export const signupWithApple = async () => {
    // performs login request
    // const appleAuthRequestResponse = await appleAuth.performRequest({
    //     requestedOperation: appleAuth.Operation.LOGIN,
    //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //   });

    //   // Ensure Apple returned a user identityToken
    //   if (!appleAuthRequestResponse.identityToken) {
    //     throw new Error('Apple Sign-In failed - no identify token returned');
    //   }

    //   // Create a Firebase credential from the response
    //   const { identityToken, nonce } = appleAuthRequestResponse;

    //   const provider = new OAuthProvider('apple.com');
    //   const authCredential = provider.credential({
    //       idToken: identityToken,
    //       rawNonce: nonce,
    //     });

    //   // Sign the user in with the credential
    //   return signInWithCredential(auth, authCredential);

    return null

};
