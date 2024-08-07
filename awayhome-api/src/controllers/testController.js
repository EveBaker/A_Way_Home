import { db } from "../config/firebaseAdmin.js";

export async function createTestDocument(req, res) {
  try {
    const docRef = db.collection("testCollection").doc("testDoc");
    await docRef.set({
      name: "Test Document",
      createdAt: new Date(),
    });
    res.status(201).json({ message: "Document created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create document" });
  }
}

export async function getTestDocument(req, res) {
  try {
    const docRef = db.collection("testCollection").doc("testDoc");
    const doc = await docRef.get();
    if (doc.exists) {
      res.status(200).json(doc.data());
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get document" });
  }
}
