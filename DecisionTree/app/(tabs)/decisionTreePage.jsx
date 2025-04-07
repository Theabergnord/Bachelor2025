import React, { useState } from 'react';
import Step from '../../components/Questions';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import decisionTreeData from '../data/decisionTreeData';


const DecisionTreePage = () => {
  const [currentId, setCurrentId] = useState('q1');
  const [feedback, setFeedback] = useState(null);

  const currentNode = decisionTreeData.find((node) => node.id === currentId);


  const handleAnswer = (answer) => {
    const selectedOption = currentNode.options[answer ? 0 : 1];

    if (selectedOption.next) {
      setCurrentId(selectedOption.next);
    } else if (selectedOption.feedback) {
      setFeedback(selectedOption.feedback);
    }
  };

  if (!currentNode && feedback) {
    return (
      <ParallaxScrollView>
        <Step
          stepNumber={1}
          totalSteps={1}
          question={`Du fikk tilbakemeldingen: ${feedback}`}
          onAnswer={() => setCurrentId('q1')} 
        />
      </ParallaxScrollView>
    );
  }

  if (!currentNode) {
    return (
      <ParallaxScrollView>
        <Step
          stepNumber={1}
          totalSteps={1}
          question="Beslutningstreet er ferdig."
          onAnswer={() => setCurrentId('q1')}
        />
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView>
      <Step
        stepNumber={1} // Midlertidig, regn steg ut fra posisjon i treet
        totalSteps={1}
        question={currentNode.question}
        onAnswer={handleAnswer}
      />
    </ParallaxScrollView>
  );
};

export default DecisionTreePage;
