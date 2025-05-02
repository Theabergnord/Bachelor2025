import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header';

export default function ProgressTips() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/(tabs)/decisionTreePage');
  };

  return (
    <>
      
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea}>
        <Header onBackPress={handleBack} />
        <ThemedView style={styles.container}>
          {/* Tittel */}
          <ThemedText style={styles.pageTitle}>FØR GJENNOMFØRING</ThemedText>

          {/* Tips boks */}
          <TipsBox
            title="Tips!"
            subtitle={
              "Over vises hvilket av de 8 trinnene du er på i vurderingen.\n\n" +
              "Nedenfor vises hvor mange prosent av trinnet som er gjennomført.\n\n" +
              "Du vil få opp:\n" +
              "• Grønt ikon dersom du kan fortsette på neste trinn\n" +
              "• Gult fareikon dersom det er usikkerheter i prosessen\n" +
              "• Rødt stoppskilt som vil markere avslutning av beslutningstreet"
            }
          />

          {/* Ikoner */}
          <View style={styles.iconRow}>
            <Image
              source={require('@/assets/images/warning_green.png')} // Grønt ikon
              style={styles.icon}
              resizeMode="contain"
            />
            <Image
              source={require('@/assets/images/warning_yellow.png')} // Gult ikon
              style={styles.icon}
              resizeMode="contain"
            />
            <Image
              source={require('@/assets/images/warning_red.png')} // Rødt ikon
              style={styles.icon}
              resizeMode="contain"
            />
          </View>

          {/* progress bar enn så lenge */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
              <ThemedText style={styles.progressBarText}>50%</ThemedText>
            </View>
          </View>

          {/* Neste-knapp */}
          <NextButton style={styles.startButton}
  onPress={() => router.push({ pathname: '/decisionTreePage', params: { reset: 'true' } })} />
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const PRIMARY = '#345641';
const BG = '#fff';
const PROGRESS = '#BEE3C6';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  pageTitle: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 16,
    gap: 28,
  },
  icon: {
    width: 80,
    height: 80,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBarBackground: {
    width: '80%',
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: PRIMARY,
    backgroundColor: BG,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    height: '100%',
    backgroundColor: PROGRESS,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
  },
  progressBarText: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: '500',
    zIndex: 1,
    width: '100%',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 12,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: PRIMARY,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 36,
    backgroundColor: BG,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
});
