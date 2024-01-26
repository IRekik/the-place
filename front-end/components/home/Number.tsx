import React, { useState, useEffect } from 'react';
import { easeCubicInOut } from 'd3-ease';

interface NumberProps {
  n: number;
}

const Number: React.FC<NumberProps> = ({ n }) => {
    const [animatedNumber, setAnimatedNumber] = useState<number>(0);

    useEffect(() => {
        const interval = 50;
        const steps = 5000 / interval;

        let currentStep = 0;
        const startValue = 0;
        const endValue = n;
        const ease = easeCubicInOut;

        const animation = setInterval(() => {
        currentStep += 1;
        const progress = currentStep / steps;
        const easedProgress = ease(progress);

        const animatedValue = startValue + (endValue - startValue) * easedProgress;
        setAnimatedNumber(animatedValue);

        if (currentStep >= steps) {
            clearInterval(animation);
            setAnimatedNumber(endValue);
        }
        }, interval);

        return () => clearInterval(animation);
    }, [n]);

    return <div>{animatedNumber.toFixed(0)}</div>;
};

export default Number;