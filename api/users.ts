import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase.app";



export const getAvatar = async (userId: string) => {
    const folderRef = ref(storage, userId + '/profile/avatar.jpg');

    return getDownloadURL(folderRef)
}

export default {
    getAvatar
}