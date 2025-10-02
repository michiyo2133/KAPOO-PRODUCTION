// firebase.js
// Import SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // ปิดไว้ถ้ายังไม่ใช้จริง

// Config ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyBN4cFLnanSu1zeuqg51OYGuxqw8lnUi0w",
  authDomain: "kapoo-production.firebaseapp.com",
  projectId: "kapoo-production",
  storageBucket: "kapoo-production.appspot.com", // ✅ แก้ตรงนี้
  messagingSenderId: "1084825941072",
  appId: "1:1084825941072:web:eda44ace40a799b4f70d55",
  measurementId: "G-R0ZMKE6S57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // ปิดไว้ถ้ายังไม่ใช้

// ✅ Firestore DB
export const db = getFirestore(app);

// ✅ เพิ่มลูกค้า
export async function addCustomer(name, email) {
  const docRef = await addDoc(collection(db, "customers"), {
    name: name,
    email: email
  });
  return docRef.id;
}

// ✅ เพิ่มโปรเจกต์ (เชื่อมกับลูกค้า)
export async function addProject(customerId, description) {
  await addDoc(collection(db, "projectRequests"), {
    project_description: description,
    customer_id: doc(db, "customers", customerId), // reference ไปที่ลูกค้า
    timestamp: new Date()
  });
}
