import React, { useState, useEffect } from 'react';
import Step from '../../components/Questions';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Feedback from '../../components/Feedback';                  
import decisionTreeDataNO from '../data/decisionTreeDataNO';
import decisionTreeDataEN from '../data/decisionTreeDataEN';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import TransitionMessage from '../../components/TransitionMessage';

const DecisionTreePage = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { reset } = useLocalSearchParams()
  const [currentId, setCurrentId] = useState('q1')
  const [feedbackOption, setFeedbackOption] = useState(null)
  const [answers, setAnswers] = useState({})

  const decisionTreeData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN
  const currentNode = decisionTreeData.find((node) => node.id === currentId)

  useEffect(() => {
    if (reset === 'true') {
      setCurrentId('q1')
      setFeedbackOption(null)
      setAnswers({})
      router.setParams({ reset: undefined })
    }
  }, [reset]);

  const stepMap = [
    {
      ids: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'],
      title: i18n.language === 'no' ? 'Forberedende steg for vurdering av BC: Før BC-vurderingen utføres' : 'Preparatory Steps for consideration for BC assessment: Before any BC assessment is arranged',
      totalQuestions: 10,
    },
    //Legge til flere steg etterhvert
  ]

  const currentStep = stepMap.find(step => step.ids.includes(currentId)) || {};
  const currentQuestion = currentStep.ids?.indexOf(currentId) + 1 || 1;

  const getNextVisibleNode = (fromIndex = -1) => {
    for (let i = fromIndex + 1; i < decisionTreeData.length; i++) {
      const node = decisionTreeData[i]
      if (!node.visibleIf) return node.id
      const condition = node.visibleIf
      if (answers[condition.previousQuestion] === condition.expectedAnswer) {
        return node.id
      }
    }
    return 'q1';
  }

  const handleAnswer = (answer) => {
    const selectedOption = currentNode.options[answer ? 0 : 1]
    const updatedAnswers = { ...answers, [currentNode.id]: selectedOption.label }
    setAnswers(updatedAnswers)

    if (selectedOption.feedbackType) {
      if (selectedOption.next) {
        const nextNode = decisionTreeData.find(n => n.id === selectedOption.next)
        if (nextNode?.isTransition) {
          setCurrentId(nextNode.id)
          return;
        }
      }

      setFeedbackOption({
        feedbackType: selectedOption.feedbackType,
        feedbackMessage: selectedOption.feedbackMessage,
        next: selectedOption.next ?? null,
        fromNode: currentNode.id,
      });
    } else if (selectedOption.next) {
      setCurrentId(selectedOption.next);
    } else {
      const currentIndex = decisionTreeData.findIndex((n) => n.id === currentNode.id)
      const nextVisible = getNextVisibleNode(currentIndex)
      setCurrentId(nextVisible)
    }
  };

  if (feedbackOption) {
    const currentData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN
    const currentNodeData = currentData.find((node) => node.id === feedbackOption.fromNode)
    const matchedOption = currentNodeData?.options.find((o) => o.feedbackType === feedbackOption.feedbackType)
    const message = matchedOption?.feedbackMessage

    const handleNext = () => {
      if (feedbackOption.feedbackType === 'red') {
        router.replace({ pathname: '/', params: { reset: 'true' } })
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

  if (!currentNode) return null

  if (currentNode?.isTransition) {
    return (
      <ParallaxScrollView>
        <TransitionMessage
          message={currentNode.message}
          onNext={() => setCurrentId(currentNode.next)}
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

