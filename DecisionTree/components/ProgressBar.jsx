import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const progressBarHeight = 30;

const lightGreen = [167, 200, 176];
const darkGreen = [26, 49, 38];

const generateShades = (steps = 8) => {
  return Array.from({ length: steps }, (_, index) => {
    const r = Math.round(lightGreen[0] - (index * (lightGreen[0] - darkGreen[0]) / (steps - 1)));
    const g = Math.round(lightGreen[1] - (index * (lightGreen[1] - darkGreen[1]) / (steps - 1)));
    const b = Math.round(lightGreen[2] - (index * (lightGreen[2] - darkGreen[2]) / (steps - 1)));
    return `rgb(${r}, ${g}, ${b})`;
  });
};

const ProgressBar = ({ step = 1, totalSteps = 8, stepProgress = 0, progress = 0, bottomInset = 0 }) => {
  const shades = generateShades(totalSteps);
  const currentStepIndex = Math.max(0, Math.min(step - 1, totalSteps - 1));

  return (
    <View style={[styles.container, { bottom: bottomInset + height * 0.05 }]}>
      <View style={styles.barBackground}>
        <View style={styles.stepContainer}>
          {shades.map((color, index) => {
            const isCurrent = index === currentStepIndex;
            const isFilled = index < currentStepIndex;
            const fillRatio = isCurrent ? stepProgress : isFilled ? 1 : 0;

            const borderRadius = {
              borderTopLeftRadius: index === 0 ? 15 : 0,
              borderBottomLeftRadius: index === 0 ? 15 : 0,
              borderTopRightRadius: index === totalSteps - 1 ? 15 : 0,
              borderBottomRightRadius: index === totalSteps - 1 ? 15 : 0,
            };

            return (
              <View key={index} style={[styles.stepBlock, borderRadius]}>
                <View
                  style={{
                    width: `${fillRatio * 100}%`,
                    height: '100%',
                    backgroundColor: color,
                    ...borderRadius,
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.textOverlay}>
          <Text style={styles.progressText}>{`${progress}%`}</Text>
        </View>
      </View>
    </View>
  );
};

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
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  stepBlock: {
    flex: 1,
    backgroundColor: '#E5ECE5',
    overflow: 'hidden',
    marginHorizontal: 0.5,
  },
  textOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProgressBar;
