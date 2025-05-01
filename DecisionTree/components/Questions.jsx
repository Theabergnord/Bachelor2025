import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; 
import { ThemedView } from '@/components/ThemedView'; 
import { useTranslation } from 'react-i18next';
import ProgressBar from './ProgressBar';

const Questions = ({ stepTitle, stepNumber, totalSteps, question, onAnswer, progress }) => {
  const { t } = useTranslation()
  return (
    <>
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{stepTitle}</ThemedText>
      <ThemedText style={styles.subtitle}> {stepNumber} {t('OF')} {totalSteps}</ThemedText>

      <ThemedText style={styles.question}>{question}</ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.noButton} onPress={() => onAnswer(false)}>
          <ThemedText style={styles.noButtonText}>{t('NO')}</ThemedText>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.yesButton} onPress={() => onAnswer(true)}>
          <ThemedText style={styles.yesButtonText}>{t('YES')}</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
    <ProgressBar progress={progress} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0.2,
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
    marginTop: 40, 
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
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
