import React, { useRef } from 'react';
import { Animated, Easing, StyleSheet, View, TouchableOpacity, } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Questions = ({ stepNumber, totalSteps, question, onAnswer }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const triggerSwipe = (isYes) => {
    const toValue = isYes ? 300 : -300;

    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(0); // reset position
      onAnswer(isYes);
    });
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => triggerSwipe(false)}
      onSwipeRight={() => triggerSwipe(true)}
      config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
      style={{ flex: 1 }}
    >
      <Animated.View style={[styles.container, {
        transform: [{ translateX: animatedValue }],
      }]}>
        <ThemedText style={styles.title}>Forberedende trinn</ThemedText>
        <ThemedText style={styles.subtitle}>{stepNumber} av {totalSteps}</ThemedText>

        <ThemedText style={styles.question}>{question}</ThemedText>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.noButton} onPress={() => triggerSwipe(false)}>
            <ThemedText style={styles.noButtonText}>Nei</ThemedText>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.yesButton} onPress={() => triggerSwipe(true)}>
            <ThemedText style={styles.yesButtonText}>Ja</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Animated.View>
    </GestureRecognizer>
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
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
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
