import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function Header( {onBackPress} ) {
  const { t } = useTranslation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress ? onBackPress : () => router.back()} style={styles.backButton} accessibilityRole="button">
        <View style={styles.backButtonContent}>
          <Ionicons name="arrow-back" size={23} color="#345641" />
          <Text style={styles.backButtonText}>{t('PREVIOUS')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingVertical: 10,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#345641',
  },
});
