import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import secret from "./secrets";

const app = initializeApp(secret);

export const auth = getAuth(app);
export const db = getFirestore(app);
