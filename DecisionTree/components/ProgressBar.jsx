import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const progressBarHeight = 30

const ProgressBar = ({ progress, bottomInset }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, { bottom: bottomInset + height * 0.05 }]}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${clampedProgress}%` }]} />
        <Text style={styles.progressText}>{clampedProgress}%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: progressBarHeight,
    alignItems: 'center',
    marginBottom: 3,
  },
  barBackground: {
    flex: 1,
    width: '85%',
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