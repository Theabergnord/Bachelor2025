import React from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function SwipeAnimation() {
  if (Platform.OS === 'web') {
    return (
      <Image
        source={require('../assets/images/swipe-left.gif')}
        style={styles.media}
        resizeMode="contain"
      />
    );
  }

  return (
    <Video
      source={require('../assets/images/swipe-left.mp4')}
      shouldPlay
      isLooping
      isMuted
      resizeMode="contain"
      style={styles.media}
    />
  );
}

const styles = StyleSheet.create({
  media: {
    width: 140,
    height: 140,
    marginVertical: 22,
    alignSelf: 'center'
  },
});
