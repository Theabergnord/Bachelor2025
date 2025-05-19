import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';
import SwipeAnimation from '@/components/SwipeAnimation';
import GestureRecognizer from 'react-native-swipe-gestures';

export default function SwipeTips() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem('hasSeenSwipeTips', 'true');
      router.push('/iconTips');
    } catch (error) {
      console.error('Feil ved lagring av instruksjonsstatus:', error);
      router.push('/(tabs)/decisionTreePage');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <GestureRecognizer
        onSwipeRight={handleNext}
        onSwipeLeft={() => router.back()}
        config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
        style={{ flex: 1 }}
        accessibilityRole="image"
        accessibilityLabel={t('ALT_SWIPEHAND')}
      >
        <ThemedView style={styles.container}>
          <Header />
          <ThemedText style={styles.subtitle}>{t('TITLE_GUIDELINES')}</ThemedText>

          <TipsBox subtitle={t('TIP1')} />

          <SwipeAnimation />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.noButton} activeOpacity={1} accessibilityRole="button">
              <ThemedText style={styles.noButtonText}>{t('NO')}</ThemedText>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.yesButton}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.yesButtonText}>{t('YES')}</ThemedText>
            </TouchableOpacity>
          </View>

          <NextButton onPress={handleNext} text={t('NEXT')} style={styles.nextButton} />
        </ThemedView>
      </GestureRecognizer>
    </>
  );
}


const PRIMARY = '#345641';
const BG = '#fff';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 70
  },
  
  container: {
    flex: 1,
    paddingHorizontal: 22,
    alignItems: 'flex-start',
    backgroundColor: BG,
    paddingTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 0,
    marginBottom: 22,
    alignSelf: 'center',
  },
  
  noButton: {
    backgroundColor: '#fff',
    borderColor: '#345641',
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#345641',
    borderColor: '#345641',
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButtonText: {
    color: '#345641',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  yesButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  separator: {
    width: 2,
    height: 60,
    backgroundColor: '#345641',
    borderRadius: 1,
    alignSelf: 'center'
  },
});
