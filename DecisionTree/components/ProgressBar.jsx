import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  const clamped = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${clamped}%` }]} />
        <Text style={styles.progressText}>{clamped}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  barBackground: {
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5ECE5',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3C5538',
  },
  barFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#A8C6AD',
    borderRadius: 15,
  },
  progressText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#3C5538',
  },
});

export default ProgressBar;
