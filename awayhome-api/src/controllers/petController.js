// src/controllers/petControllers

import { db } from "../config/firebaseAdmin.js";

// Add a new pet
export const addPet = async (req, res) => {
  const petData = req.body;
  try {
    const docRef = await db.collection("pets").add({
      ...petData,
      createdAt: new Date().toISOString(),
    });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all pets
export const getPets = async (req, res) => {
  try {
    const snapshot = await db.collection("pets").get();
    const pets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(pets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get a single pet by ID
export const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection("pets").doc(id).get();
    if (!doc.exists) {
      return res.status(404).send({ error: "Pet not found" });
    }
    res.status(200).send({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update a pet
export const updatePet = async (req, res) => {
  const { id } = req.params;
  const petData = req.body;
  try {
    await db.collection("pets").doc(id).update(petData);
    res.status(200).send({ message: "Pet updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Delete a pet
export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("pets").doc(id).delete();
    res.status(200).send({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
