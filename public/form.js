import { addCustomer, addProject } from "./firebase.js";

// ✅ รอ DOM โหลดก่อน
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successPopup = document.getElementById("success-popup");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const project = document.getElementById("project").value;

      try {
        const customerId = await addCustomer(name, email);
        await addProject(customerId, project);

        // ✅ แสดง popup สำเร็จ
        successPopup.style.display = "block";
        setTimeout(() => {
          successPopup.style.display = "none";
          form.reset();
        }, 2000);

      } catch (error) {
        console.error("❌ Error adding document: ", error);
        alert("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
      }
    });
  }
});
// ใช้ compat SDK ที่โหลดมาจาก <script src="...firebase-app-compat.js">
// และ firestore-compat.js

// Init Firestore
const db = firebase.firestore();

// Handle form submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const project = document.getElementById("project").value;

    try {
      await db.collection("Customers").add({
        name,
        email,
        project,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      document.getElementById("success-popup").style.display = "block";
      form.reset();
    } catch (err) {
      console.error("❌ Firestore Error:", err);
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  });
});

