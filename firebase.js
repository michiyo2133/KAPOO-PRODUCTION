// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// 🔑 config จาก Firebase Console ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg"
};

const app = initializeApp(firebaseConfig);
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
