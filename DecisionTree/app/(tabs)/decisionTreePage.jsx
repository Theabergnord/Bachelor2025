import React, { useState, useEffect, useCallback } from 'react';
import Step from '../../components/Questions';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Feedback from '../../components/Feedback';                  
import decisionTreeDataNO from '../data/decisionTreeDataNO';
import decisionTreeDataEN from '../data/decisionTreeDataEN';
import { useTranslation } from 'react-i18next';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import TransitionMessage from '../../components/TransitionMessage';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';

// 🔧 Funksjon for trinn-fremdrift basert på spørsmåls-ID
const getStepProgressFromId = (stepNumber, currentId, decisionTreeData) => {
  const stepQuestions = decisionTreeData.filter(
    (node) => node.step === stepNumber && !node.isTransition
  );

  const questionNumbers = stepQuestions
    .map((q) => parseInt(q.id.replace('q', ''), 10))
    .filter((num) => !isNaN(num));

  if (questionNumbers.length === 0 || !currentId.startsWith('q')) return 0;

  const currentNum = parseInt(currentId.replace('q', ''), 10);
  const min = Math.min(...questionNumbers);
  const max = Math.max(...questionNumbers);

  const progress = (currentNum - min) / (max - min);
  return Math.max(0, Math.min(progress, 1));
};

const DecisionTreePage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { reset } = useLocalSearchParams();
  const [currentId, setCurrentId] = useState('q1');
  const [feedbackOption, setFeedbackOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);

  const decisionTreeData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN;
  const currentNode = decisionTreeData.find((node) => node.id === currentId);
  const stepNumber = currentNode?.step || 1;

  const stepTitles = {
    1: { no: 'Forberedende steg for vurdering av BC', en: 'Preparatory steps for consideration for BC assessment' },
    2: { no: 'Oppstart av vurdering av BC', en: 'Initiation for BC assessment' },
    3: { no: 'Valg av metode', en: 'Method Choice' },
    4: { no: 'Datainnsamling', en: 'Data collection' },
    5: { no: 'Tolkning av data', en: 'Data interpretation' },
    6: { no: 'Rapportering av data', en: 'Data Reporting' },
    7: { no: 'Formidling og kommunikasjon av data', en: 'Data dissemination and communication' },
    8: { no: 'Monitoring', en: 'Monitoring' },
  };

  useEffect(() => {
    if (reset === 'true') {
      setCurrentId('q1');
      setFeedbackOption(null);
      setAnswers({});
      setHistory([]);
      router.setParams({ reset: undefined });
    }
  }, [reset]);

  const getNextVisibleNode = (fromIndex = -1) => {
    for (let i = fromIndex + 1; i < decisionTreeData.length; i++) {
      const node = decisionTreeData[i];
      if (!node.visibleIf) return node.id;
      const condition = node.visibleIf;
      if (answers[condition.previousQuestion] === condition.expectedAnswer) {
        return node.id;
      }
    }
    return 'q1';
  };

  const handleAnswer = (answer) => {
    const selectedOption = currentNode.options[answer ? 0 : 1];
    const updatedAnswers = { ...answers, [currentNode.id]: selectedOption.label };
    setAnswers(updatedAnswers);

    if (selectedOption.feedbackType) {
      if (selectedOption.next) {
        const nextNode = decisionTreeData.find((n) => n.id === selectedOption.next);
        if (nextNode?.isTransition) {
          setCurrentId(nextNode.id);
          return;
        }
      }

      setHistory((prev) => [...prev, currentId]);
      setFeedbackOption({
        feedbackType: selectedOption.feedbackType,
        feedbackMessage: selectedOption.feedbackMessage,
        next: selectedOption.next ?? null,
        fromNode: currentNode.id,
      });
    } else if (selectedOption.next) {
      setHistory((prev) => [...prev, currentId]);
      setCurrentId(selectedOption.next);
    } else {
      const currentIndex = decisionTreeData.findIndex((n) => n.id === currentNode.id);
      const nextVisible = getNextVisibleNode(currentIndex);
      setHistory((prev) => [...prev, currentId]);
      setCurrentId(nextVisible);
    }
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousId = newHistory.pop();
      setHistory(newHistory);
      setCurrentId(previousId);
      setFeedbackOption(null);
    } else {
      router.back();
    }
  };

  if (!currentNode) return null;

  const extractNumber = (id) => {
    const match = typeof id === 'string' ? id.match(/\d+/) : null;
    return match ? parseInt(match[0], 10) : 0;
  };

  const referenceId = currentNode?.isTransition
    ? history[history.length - 1]
    : currentId;

  const currentIndex = extractNumber(referenceId || 'q1');
  const overallProgress = Math.round((currentIndex / 37) * 100);
  const stepProgress = getStepProgressFromId(stepNumber, currentId, decisionTreeData);

  const lang = i18n.language === 'no' ? 'no' : 'en';
  const stepTitle = stepTitles[stepNumber]?.[lang] ?? '';

  if (feedbackOption) {
    const currentData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN;
    const currentNodeData = currentData.find((node) => node.id === feedbackOption.fromNode);
    const matchedOption = currentNodeData?.options.find((o) => o.feedbackType === feedbackOption.feedbackType);
    const message = matchedOption?.feedbackMessage;

    const handleNext = () => {
      if (feedbackOption.feedbackType === 'red') {
        router.replace({ pathname: '/', params: { reset: 'true' } });
      } else {
        const fallbackNext = matchedOption?.next ?? null;
        if (fallbackNext) {
          setCurrentId(fallbackNext);
        } else {
          const nodeIndex = decisionTreeData.findIndex(n => n.id === feedbackOption.fromNode);
          const nextNode = decisionTreeData[nodeIndex + 1];
          setCurrentId(nextNode?.id ?? 'q1');
        }
        setFeedbackOption(null);
      }
    };

    return (
      <Feedback
        feedbackType={feedbackOption.feedbackType}
        message={message}
        onNext={handleNext}
      />
    );
  }

  if (currentNode?.isTransition) {
    return (
      <ParallaxScrollView>
        <TransitionMessage
          message={currentNode.message}
          onNext={() => setCurrentId(currentNode.next)}
        />
        <ProgressBar
          step={stepNumber}
          stepProgress={stepProgress}
          totalSteps={8}
          progress={overallProgress}
        />
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView>
      <Header onBackPress={handleGoBack} />
      <Step
        stepNumber={stepNumber}
        totalSteps={8}
        stepTitle={stepTitle}
        question={currentNode.question}
        onAnswer={handleAnswer}
        stepProgress={stepProgress}
        progress={overallProgress}
      />
    </ParallaxScrollView>
  );
};

export default DecisionTreePage;
