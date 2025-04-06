import React, { useState } from 'react';
import Step from '../../components/Questions';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const DecisionTreePage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  const handleAnswer = (answer) => {
    console.log(`Svar: ${answer}`);
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const questions = [
    "Er du klar til å begynne?",
    "Har du det du trenger?",
  ];

  return (
    <ParallaxScrollView>
        <Step
        stepNumber={step}
        totalSteps={totalSteps}
        question={questions[step - 1]}
        onAnswer={handleAnswer}
      />
    </ParallaxScrollView>
  );
};

export default DecisionTreePage;
