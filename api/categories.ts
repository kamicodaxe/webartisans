import {
  collection, doc, setDoc, addDoc, query,
  getDocs, where, onSnapshot, getDoc, Timestamp,
  runTransaction, arrayUnion, orderBy, writeBatch
} from "firebase/firestore";

import { db } from "../firebase.app";
import ICategory from "../models/ICategory";


function getAll(storeId: string) {
  const ref = collection(db, `stores/${storeId}/categories`);
  const q = query(ref);
  return getDocs(q)
}

function getFromSlug(storeId: string, slug: string) {
  const ref = collection(db, `stores/${storeId}/categories`);
  const q = query(ref, where('slug', '==', slug));
  return getDocs(q)
}

export default {
  getAll,
  getFromSlug
}