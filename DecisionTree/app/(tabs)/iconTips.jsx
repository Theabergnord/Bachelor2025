import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header';
import ProgressBar from '../../components/ProgressBar';
import { useTranslation } from 'react-i18next';

export default function ProgressTips() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ThemedView style={styles.container}>
        {/* TOPP */}
        <View style={styles.topArea}>
          <Header />
          <ThemedText style={styles.subtitle}>{t('ICON_SUBTITLE')}</ThemedText>
        </View>

        {/* MIDT */}
        <View style={styles.middleArea}>
          <TipsBox
            title="Tips!"
            subtitle={
              <View style={{ width: '100%' }}>
                <ThemedText style={styles.text_tips}>
                  {t('ICON_T1')}
                </ThemedText>
                <ThemedText style={styles.text_tips}>
                  {t('ICON_T2')}
                </ThemedText>

                {/* Grønt */}
                <View style={styles.inlineRow}>
                  <Image
                    source={require('@/assets/images/warning_green.png')}
                    style={styles.inlineIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.textContainer}>
                    <ThemedText style={styles.text_inline}>
                    {t('GREEN_T')}
                    </ThemedText>
                  </View>
                </View>

                {/* Gult */}
                <View style={styles.inlineRow}>
                  <Image
                    source={require('@/assets/images/warning_yellow.png')}
                    style={styles.inlineIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.textContainer}>
                    <ThemedText style={styles.text_inline}>
                    {t('YELLOW_T')}
                    </ThemedText>
                  </View>
                </View>

                {/* Rødt */}
                <View style={styles.inlineRow}>
                  <Image
                    source={require('@/assets/images/warning_red.png')}
                    style={styles.inlineIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.textContainer}>
                    <ThemedText style={styles.text_inline}>
                    {t('RED_T')}
                    </ThemedText>
                  </View>
                </View>
              </View>
            }
          />

          {/* PROGRESSBAR */}
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={0} />
          </View>
        </View>

        {/* BUNN */}
        <View style={styles.bottomArea}>
          <NextButton 
            onPress={() => router.push({ pathname: '/decisionTreePage', params: { reset: 'true' } })} text={t('NEXT')}
          />
        </View>
      </ThemedView>
    </>
  );
}

const PRIMARY = '#345641';
const BG = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 90,
    paddingBottom: 20,
  },
  topArea: {
    width: '100%',
    marginBottom: 10,
  },
  middleArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
  text_tips: {
    fontSize: 16,
    color: '#2E443E',
    lineHeight: 24,
    marginBottom: 6,
    textAlign: 'left',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  inlineIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
  },
  text_inline: {
    fontSize: 16,
    color: '#2E443E',
    lineHeight: 24,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
});


