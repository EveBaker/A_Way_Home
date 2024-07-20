// src/components/ExampleComponent.jsx
import React from 'react';
import { Button } from './MaterialComponents';

const ExampleComponent = () => {
    return (
        <div className="p-4">
            <h1 className="text-primary font-sans">Hello, World!</h1>
            <p className="text-secondary">This is a paragraph with custom secondary color.</p>
            <Button className="bg-accent text-white px-4 py-2 rounded">Click Me</Button>
        </div>
    );
};

export default ExampleComponent;
