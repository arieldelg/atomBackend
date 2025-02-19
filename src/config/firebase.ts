import * as admin from "firebase-admin";
import "dotenv/config";
import { WriteResult } from "firebase-admin/firestore";

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.CLIENT_EMAIL!,
    privateKey: process.env.PRIVATE_KEY!,
    projectId: process.env.PROJECT_ID!,
  }),
  projectId: process.env.PROJECT_ID!,
});
const db = admin.firestore();
const auth = admin.auth();

export { db, admin, WriteResult, auth };
