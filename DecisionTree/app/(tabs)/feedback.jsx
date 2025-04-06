import { StyleSheet, Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'
import NextButton from '../../components/NextButton'
import ParallaxScrollView from '../../components/ParallaxScrollView'
import { Platform, StatusBar } from 'react-native'


export default function Feedback() {
  const title = 'Ikke gå videre!'
  const message =
    'Det anbefales ikke å måle BC hos idrettsutøvere under 18 år, med mindre det er nødvendig for medisinske formål eller andre ekstraordinære omstendigheter.\n\nUnge idrettsutøvere vil ha langt større utbytte av å fokusere på de grunnleggende elementene i trening, ernæring og restitusjon for å forbedre sin idrettsspesifikke teknikk, fysiske kapasitet og mentale robusthet, og dermed øke sine prestasjonsevner.'
  const color = '#B7220B'
  const iconSource = require('../../assets/images/warning_red.png')

  const handleNeste = () => {}

  return (
    <ParallaxScrollView noPadding>
      <View style={styles.lineWrapper}>
        <View style={[styles.curvedLine, { backgroundColor: color }]} />
        <Image source={iconSource} style={styles.stopIcon} />
      </View>

      <View style={styles.scrollContent}>
        <ThemedText type="title" style={{ fontSize: 24, fontFamily: 'Poppins_600SemiBold' }}>
          {title}
        </ThemedText>

        <ThemedText type="default" style={styles.text}>
          {message}
        </ThemedText>

        <NextButton onPress={handleNeste} text="Neste" style={{marginBottom: 32 }} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  lineWrapper: {
    position: 'relative',
    marginTop: 120,
    marginBottom: 40,
  },
  backButton: {
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#345641',
  },
  curvedLine: {
    width: '100%',
    height: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -20 },
    shadowRadius: 4,
    elevation: 4,
  },
  stopIcon: {
    position: 'absolute',
    right: 24,
    top: -20,
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 40,
  },
});
