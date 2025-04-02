import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Importer ThemedText

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
    backgroundColor: '#E8F5E9', // Lys grønn bakgrunn
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15, // Avrundede hjørner
    alignItems: 'center',
    borderWidth: 3, // Tykkere border
    borderColor: '#2E443E', // Mørk grønn farge
    marginBottom: 30,
  },
  title: {
    fontSize: 24, // Større fontstørrelse for "Tips!"
    fontWeight: 'bold', // Bold styling
    color: '#2E443E', // Mørk grønn farge
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16, // Vanlig fontstørrelse for underteksten
    color: '#2E443E', // Mørk grønn farge
    textAlign: 'center',
  },
});
