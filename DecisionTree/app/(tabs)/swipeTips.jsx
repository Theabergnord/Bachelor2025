import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header';

export default function SwipeTips() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem('hasSeenSwipeTips', 'true');
      router.push('/iconTips'); // Eller annen ønsket rute
    } catch (error) {
      console.error('Feil ved lagring av instruksjonsstatus:', error);
      router.push('/(tabs)/decisionTreePage');
    }
  };

  return (
    <>
      {/* Dette fjerner den native headeren */}
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea}>
        <Header/>

        <ThemedView style={styles.container}>
          <ThemedText style={styles.subtitle}>FØR GJENNOMFØRING</ThemedText>

          <TipsBox
            title="Tips!"
            subtitle="Swipe til venstre for nei og til høyre for ja for å besvare spørsmålene mer effektivt!"
          />

          <Image
            source={require('@/assets/images/swipe-left.gif')}
            style={styles.handImage}
            resizeMode="contain"
          />

          {/* Ja/Nei knapper med nøyaktig samme stil som i Questions-komponenten */}
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity style={styles.noButton} activeOpacity={1}>
              <ThemedText style={styles.noButtonText}>Nei</ThemedText>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.yesButton} activeOpacity={1}>
              <ThemedText style={styles.yesButtonText}>Ja</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <NextButton onPress={handleNext} text="Neste" style={styles.nextButton} />
        </ThemedView>
      </SafeAreaView>
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
  headerRow: {
    width: '100%',
    paddingTop: 8,
    paddingLeft: 12,
    marginBottom: 4,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: PRIMARY,
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    alignItems: 'center',
    backgroundColor: BG,
    paddingTop: 30,
  },
  pageTitle: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 20
  },
  handImage: {
    width: 140,
    height: 140,
    marginVertical: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
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
  nextButton: {
    marginTop: 50,
  },
});
