import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header'

export default function SwipeTips() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleNext = async () => {
    try {
      // Marker at brukeren har sett instruksjonene
      await AsyncStorage.setItem('hasSeenSwipeTips', 'true');
      // Naviger til beslutningstreet
      router.push('/(tabs)/decisionTreePage');
    } catch (error) {
      console.error('Feil ved lagring av instruksjonsstatus:', error);
      // Naviger likevel videre selv om lagringen feiler
      router.push('/(tabs)/decisionTreePage');
    }
  };

  return (
    <ParallaxScrollView>
    <Header /> 
    <ThemedView style={styles.container}>
      
      
      {/* Tittel */}
      <ThemedText style={styles.subtitle}>FØR GJENNOMFØRING</ThemedText>
      
      {/* Tips boks */}
      <TipsBox 
        title="Tips!" 
        subtitle="Swipe til venstre for nei og til høyre for ja for å besvare spørsmålene mer effektivt!"
      />
      
      {/* Hånd-illustrasjon */}
      <Image
        source={require('@/assets/images/swipe-left.gif')} 
        style={styles.handImage}
        resizeMode="contain"
      />
      
      {/* Ja/Nei knapper */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.noButton} activeOpacity={1}>
          <ThemedText style={styles.noButtonText}>Nei</ThemedText>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.yesButton} activeOpacity={1}>
          <ThemedText style={styles.yesButtonText}>Ja</ThemedText>
        </TouchableOpacity>
      </View>
      
      {/* Neste-knapp */}
      <NextButton onPress={handleNext} text="Neste" style={styles.nextButton} />
    </ThemedView>
    </ParallaxScrollView>
  );
}

const PRIMARY = '#345641';
const BG = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 28,
    alignItems: 'center',
    backgroundColor: BG,
  },
  pageTitle: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 16,
    textAlign: 'center',
  },
  handImage: {
    width: 200,
    height: 200,
    marginVertical: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 12,
    width: '100%',
  },
  noButton: {
    backgroundColor: BG,
    borderColor: PRIMARY,
    borderWidth: 2,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
    borderWidth: 2,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButtonText: {
    color: PRIMARY,
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
    backgroundColor: PRIMARY,
    borderRadius: 1,
  },
  nextButton: {
    marginTop: 12,
  },
});
