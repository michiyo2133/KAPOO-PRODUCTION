// firebase.js (ใช้ CDN import สำหรับ Browser โดยตรง)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

// ✅ Config ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyBN4cFLnanSu1zeuqg51OYGuxqw8lnUi0w",
  authDomain: "kapoo-production.firebaseapp.com",
  projectId: "kapoo-production",
  storageBucket: "kapoo-production.appspot.com",
  messagingSenderId: "1084825941072",
  appId: "1:1084825941072:web:eda44ace40a799b4f70d55",
  measurementId: "G-R0ZMKE6S57"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// ✅ ฟังก์ชันเพิ่มลูกค้า
export async function addCustomer(name, email) {
  const docRef = await addDoc(collection(db, "customers"), {
    name: name,
    email: email
  });
  console.log("Customer added with ID: ", docRef.id);
  return docRef.id;
}

// ✅ ฟังก์ชันเพิ่มโปรเจกต์ (อ้างอิง customer)
export async function addProject(customerId, description) {
  await addDoc(collection(db, "projectRequests"), {
    project_description: description,
    customer_id: doc(db, "customers", customerId),
    timestamp: new Date()
  });
  console.log("Project added!");
}
