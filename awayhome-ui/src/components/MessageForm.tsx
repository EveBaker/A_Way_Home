'use client';

import React, { useState, useEffect } from 'react';
import { Textarea, Button } from '../app/MTailwind';
import { addMessage } from '../api/messages';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseClient';

interface MessageFormProps {
  receiverId: string;
  onClose: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ receiverId, onClose }) => {
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSenderId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (!senderId) {
      alert('User not logged in');
      return;
    }

    try {
      const response = await addMessage({ senderId, receiverId, message });
      alert('Message sent successfully');
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Error sending message: ', error);
      alert(error.message || 'Failed to send message');
    }
  };

  return (
    <div className="p-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        className="w-full p-2 border rounded-md"
      />
      <div className="flex justify-between mt-2">
        <Button
          variant="gradient"
          color="primary-blue"
          onClick={handleSendMessage}
        >
          Send Message
        </Button>
        <Button variant="text" color="red" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default MessageForm;
