import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '../../components/LanguageSelector';
import { ThemedView } from '../../components/ThemedView';
{/* Nesteknapp
  import NextButton from '../../components/NextButton'; */}

export default function IndexScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  {/* Nesteknapp
    const handleNeste = () => {} */}

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.languageButton}>
        <LanguageSelector />
      </ThemedView>

      <Image
        source={require('../../assets/images/Logo_bildeogtekst.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Nesteknappen
      <NextButton onPress={handleNeste} text="Neste" />*/}

<TouchableOpacity
  style={styles.startButton}
  onPress={() => router.push({ pathname: '/swipeTips', params: { reset: 'true' } })}
>
  <Text style={styles.startText}>{t('START')}</Text>
</TouchableOpacity>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  logo: {
    width: 290,
    height: 290,
    marginBottom: 100,
  },
  startButton: {
    backgroundColor: '#345641',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: -2,
  },
});

/* Kilder
* Image - https://reactnative.dev/docs/image 
* */




