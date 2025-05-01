import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const ProgressBar = ({ progress }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${clampedProgress}%` }]} />
        <Text style={styles.progressText}>{clampedProgress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * -0.02,    
    marginBottom: height * 0.12,    
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
