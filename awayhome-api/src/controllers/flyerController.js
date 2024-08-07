import { db } from '../config/firebaseAdmin.js';

// Add a new flyer
export const addFlyer = async (req, res) => {
    const flyerData = req.body;
    try {
        const docRef = await db.collection('Flyers').add({
            ...flyerData,
            createdAt: new Date().toISOString()
        });
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get all flyers
export const getFlyers = async (req, res) => {
    try {
        const snapshot = await db.collection('Flyers').get();
        const flyers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(flyers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get a single flyer by ID
export const getFlyer = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await db.collection('Flyers').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send({ error: 'Flyer not found' });
        }
        res.status(200).send({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update a flyer
export const updateFlyer = async (req, res) => {
    const { id } = req.params;
    const flyerData = req.body;
    try {
        await db.collection('Flyers').doc(id).update(flyerData);
        res.status(200).send({ message: 'Flyer updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete a flyer
export const deleteFlyer = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('Flyers').doc(id).delete();
        res.status(200).send({ message: 'Flyer deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
