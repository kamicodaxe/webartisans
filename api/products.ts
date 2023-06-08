import {
  collection, doc, getDoc, getDocs, limit, orderBy, query, where
} from "firebase/firestore";

import { db } from "../firebase.app";

function getBestProductsForCategory(stopAt = 10) {
  const ref = collection(db, `/products`);
  const q = query(ref, where('status', '==', 'approved'), orderBy('stats.orders'), limit(stopAt));
  return getDocs(q)
}

function getProducts() {
  return []
}

function getProduct(id: string) {
  const ref = doc(db, `/products/${id}`);
  return getDoc(ref)
}

export default {
  getBestProductsForCategory,
  getProducts,
  getProduct
}