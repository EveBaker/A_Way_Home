// src/controllers/messageController.js

import { db } from '../config/firebaseAdmin.js';

// Add a new message
export const addMessage = async (req, res) => {
    const messageData = req.body;
    try {
        const docRef = await db.collection('Messages').add({
            ...messageData,
            createdAt: new Date().toISOString()
        });
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get all messages
export const getMessages = async (req, res) => {
    try {
        const snapshot = await db.collection('Messages').get();
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get a single message by ID
export const getMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await db.collection('Messages').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send({ error: 'Message not found' });
        }
        res.status(200).send({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update a message
export const updateMessage = async (req, res) => {
    const { id } = req.params;
    const messageData = req.body;
    try {
        await db.collection('Messages').doc(id).update(messageData);
        res.status(200).send({ message: 'Message updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete a message
export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('Messages').doc(id).delete();
        res.status(200).send({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
