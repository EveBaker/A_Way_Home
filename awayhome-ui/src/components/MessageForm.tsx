// src/components/MessageForm.tsx
'use client';

import React, { useState } from 'react';
import { Textarea, Button } from '../app/MTailwind';
// import api from '../utils/axiosConfig';

// Mock send message function
const mockSendMessage = async ({ senderId, receiverId, message }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (message) {
        console.log('Mock message sent:', { senderId, receiverId, message });
        resolve({ data: 'Message sent successfully' });
      } else {
        reject(new Error('Message cannot be empty'));
      }
    }, 1000);
  });
};

const MessageForm: React.FC<{ receiverId: number; onClose: () => void }> = ({
  receiverId,
  onClose,
}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      const senderId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
      if (!senderId) {
        throw new Error('User not logged in');
      }
      // Uncomment the lines below once your API is ready
      // const response = await api.post('/messages/send', {
      //   senderId,
      //   receiverId,
      //   message,
      // });
      const response = await mockSendMessage({ senderId, receiverId, message });
      alert(response.data);
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
      <Button
        variant="gradient"
        color="blue"
        onClick={handleSendMessage}
        className="mt-2"
      >
        Send Message
      </Button>
    </div>
  );
};

export default MessageForm;
