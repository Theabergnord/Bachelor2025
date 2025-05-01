import { StyleSheet, Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import NextButton from './NextButton'
import ParallaxScrollView from './ParallaxScrollView'

const feedbackMap = {
  red: {
    color: '#AF0012',
    icon: require('../assets/images/warning_red.png'),
  },
  yellow: {
    color: '#ECB01F',
    icon: require('../assets/images/warning_yellow.png'),
  },
  green: {
    color: null,
    icon: null,
  },
}

export default function Feedback({ feedbackType = 'green', message = '', onNext }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { color, icon } = feedbackMap[feedbackType]
  const showFeedback = feedbackType !== 'green'

  const title = t(`FEEDBACK_TITLE.${feedbackType}`)
  const finalMessage = message || t('DEFAULT_FEEDBACK_MESSAGE')
  const buttonLabel = feedbackType === 'red' ? t('EXIT') : t('NEXT')

  const handlePress = () => {
    if (feedbackType === 'red') {
      router.replace({ pathname: '/', params: { reset: 'true' } })
    } else {
      onNext()
    }
  };

  return (
    <ParallaxScrollView noPadding>
      {showFeedback && (
        <View style={styles.lineWrapper}>
          <View style={[styles.curvedLine, { backgroundColor: color }]} />
          <Image source={icon} style={styles.icon} />
        </View>
      )}

      <View style={styles.scrollContent}>
        {showFeedback && (
          <>
            <ThemedText type="title" style={styles.title}>
              {title}
            </ThemedText>

            <View style={styles.textWrapper}>
            <ThemedText type="default" style={styles.text}>
              {finalMessage}
            </ThemedText>
            </View>
          </>
        )}

        <NextButton onPress={handlePress} text={buttonLabel} style={{ marginBottom: 32 }} />
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    position: 'relative',
    marginTop: 60,
    marginBottom: 40,
  },
  curvedLine: {
    width: '100%',
    height: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -7 },
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    position: 'absolute',
    right: 24,
    top: -28,
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: 16,
  },
  textWrapper: {
    width: '100%',
    maxWidth: '95%',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'left',
    marginBottom: 40,
    fontSize: 16,
  },
})

