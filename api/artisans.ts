import {
  collection, doc, getDoc, getDocs, limit, query, where
} from "firebase/firestore";

import { db } from "../firebase.app";


async function getAll(max: number) {
  const ref = collection(db, `/users`);
  const q = query(ref, where('is_pro', '==', true), limit(max));
  return await getDocs(q)
}

function getArtisan(id: string) {
  const ref = doc(db, `/users/${id}`);
  return getDoc(ref)
}

export default {
  getAll,
  getArtisan
}