import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; 
import { ThemedView } from '@/components/ThemedView'; 

const Questions = ({ stepNumber, totalSteps, question, onAnswer }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Forberedende trinn</ThemedText>
      <ThemedText style={styles.subtitle}>{stepNumber} av {totalSteps}</ThemedText>

      <ThemedText style={styles.question}>{question}</ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.noButton} onPress={() => onAnswer(false)}>
          <ThemedText style={styles.noButtonText}>Nei</ThemedText>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.yesButton} onPress={() => onAnswer(true)}>
          <ThemedText style={styles.yesButtonText}>Ja</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    bottom: 150,
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
