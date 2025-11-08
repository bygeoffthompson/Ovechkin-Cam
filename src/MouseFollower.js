import React, { useState, useEffect } from 'react';

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Function to update the position state
        const handleMouseMove = (event) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        // Add the event listener to the window
        window.addEventListener('mousemove', handleMouseMove);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); // The empty dependency array ensures this effect runs only once

    return (

        <img alt="Alex Ovechkin" id="ovi" src="../icons/ovi-stick.png" style={{left: position.x, top: position.y, }} />
    );
};

export default MouseFollower;
