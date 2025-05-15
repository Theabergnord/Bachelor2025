import { StyleSheet, Image, View } from 'react-native';
import { ThemedText } from './ThemedText';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useTranslation } from 'react-i18next';

export default function TransitionMessage({ message, onNext, progress }) {
    const { t } = useTranslation()
  return (
    <ParallaxScrollView noPadding>
      <Image
        source={require('../assets/images/warning_green.png')}
        style={styles.icon}
        resizeMode="contain"
        accessibilityLabel='Green GO-icon that '
      />

      <ThemedText type="title" style={styles.text}>
        {message}
      </ThemedText>

      <ParallaxScrollView noPadding> style={{ height: 30, marginBottom: 50, marginTop: 40 }}<ProgressBar progress={progress} /></ParallaxScrollView>

      <NextButton onPress={onNext} text={t('NEXT')} style={{ marginTop: 32 }} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 24,
    marginBottom: 24,
    alignSelf: 'center',
  },
});
