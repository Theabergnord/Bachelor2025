import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TipsBox({ title = 'Tips!', subtitle }) {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      {subtitle && (
        <ThemedText type="default" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2E443E',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold', 
    color: '#2E443E',
    marginBottom: 2,
  },
  subtitle: {
    color: '#2E443E', 
    textAlign: 'center',
  },
});
