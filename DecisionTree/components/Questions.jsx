import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; 
import { ThemedView } from '@/components/ThemedView'; 
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import ProgressBar from './ProgressBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window')
const progressBarHeight = 30;
const progressBarBottom = height * 0.05;

const Questions = ({ stepTitle, stepNumber, totalSteps, question, onAnswer, progress }) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const buttonBottom = insets.bottom + progressBarBottom + progressBarHeight + height * 0.02;

  return (
    <>
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{stepTitle}</ThemedText>
      <ThemedText style={styles.subtitle}> {stepNumber} {t('OF')} {totalSteps}</ThemedText>

      <ThemedText style={styles.question}>{question}</ThemedText>

      <ThemedView style={[styles.buttonContainer, {bottom: buttonBottom }]}>
        <TouchableOpacity style={styles.noButton} onPress={() => onAnswer(false)}>
          <ThemedText style={styles.noButtonText}>{t('NO')}</ThemedText>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.yesButton} onPress={() => onAnswer(true)}>
          <ThemedText style={styles.yesButtonText}>{t('YES')}</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
    <ProgressBar progress={progress} bottomInset={insets.bottom} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '95%',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  question: {
    fontSize: 18,
    marginVertical: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    position: 'absolute',
  },
  noButton: {
    backgroundColor: '#fff',
    borderColor: '#345641',
    borderWidth: 2,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#345641',
    borderColor: '#345641',
    borderWidth: 2,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButtonText: {
    color: '#345641',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yesButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    width: 2,
    height: 60,
    backgroundColor: '#345641',
    borderRadius: 1,
  },
});

export default Questions;