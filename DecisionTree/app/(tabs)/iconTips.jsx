import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header';
import ProgressBar from '../../components/ProgressBar';

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

        <ThemedView style={styles.container}>
        <Header />
          {/* Tittel */}
          <ThemedText style={styles.subtitle}>FØR GJENNOMFØRING</ThemedText>

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

          {/*ProgressBar*/}
          <ProgressBar progress={0} bottomInset={0} />

          {/* Neste-knapp */}
          <NextButton 
  onPress={() => router.push({ pathname: '/decisionTreePage', params: { reset: 'true' } })} />
        </ThemedView>
      
    </>
  );
}

const PRIMARY = '#345641';
const BG = '#fff';
const PROGRESS = '#BEE3C6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 90,
  },
  subtitle: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 18,
    marginTop: 8,
    textAlign: 'center',
    alignSelf: 'center'
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 16,
    gap: 28,
  },
  icon: {
    width: 80,
    height: 80,
  },
});
