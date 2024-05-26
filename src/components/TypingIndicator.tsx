import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const TypingIndicator = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots === '...') {
                    return '';
                } else {
                    return prevDots + '.';
                }
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#888', marginRight: 5 }}>Avi is typing</Text>
            <Text style={{ color: '#888', fontSize: 20 }}>{dots}</Text>
        </View>
    );
};

export default TypingIndicator;
