import React, { useState } from 'react';
import Step from '../../components/Questions';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Feedback from '../../components/Feedback';                  
import decisionTreeDataNO from '../data/decisionTreeDataNO';
import decisionTreeDataEN from '../data/decisionTreeDataEN';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const DecisionTreePage = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [currentId, setCurrentId] = useState('q1');
  const [feedbackOption, setFeedbackOption] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setCurrentId('q1')
      setFeedbackOption(null)
    }, [])
  );

  const decisionTreeData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN
  const currentNode = decisionTreeData.find((node) => node.id === currentId);

  const handleAnswer = (answer) => {
    const selectedOption = currentNode.options[answer ? 0 : 1];
    console.log('Valgt svar:', selectedOption);

    if (selectedOption.next) {
      setCurrentId(selectedOption.next)
    } else if (selectedOption.feedbackType) {
      setFeedbackOption({
        feedbackType: selectedOption.feedbackType,
        feedbackMessage: selectedOption.feedbackMessage,
        next: selectedOption.next ?? null,
        fromNode: currentId,
      })
    }
  };

  if (feedbackOption) {
    const currentData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN;
    const currentNodeData = currentData.find((node) => node.id === feedbackOption.fromNode);
    const matchedOption = currentNodeData?.options.find((o) => o.feedbackType === feedbackOption.feedbackType);
    const message = matchedOption?.feedbackMessage

    const handleNext = () => {
      if (feedbackOption.feedbackType === 'red') {
        setFeedbackOption(null)
        setCurrentId('q1')
        setTimeout(() => {
          router.replace('/')
        }, 0);
      } else {
        const fallbackNext = matchedOption?.next ?? null
        if (fallbackNext) {
          setCurrentId(fallbackNext)
        } else {
          const nodeIndex = decisionTreeData.findIndex(n => n.id === feedbackOption.fromNode)
          const nextNode = decisionTreeData[nodeIndex + 1]
          setCurrentId(nextNode?.id ?? 'q1')
        }
        setFeedbackOption(null)
      }
    };

    return (
      <Feedback
        feedbackType={feedbackOption.feedbackType}
        message={message}
        onNext={handleNext}
      />
    )
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
    )
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
