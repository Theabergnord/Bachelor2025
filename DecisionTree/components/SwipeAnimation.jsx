import React from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

const swipeVideo = require('../assets/images/swipe-left.mp4');

function NativeSwipeVideo({ mediaSize }) {
  const player = useVideoPlayer(swipeVideo, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
    videoPlayer.play();
  });

  return (
    <VideoView
      player={player}
      nativeControls={false}
      contentFit="contain"
      style={[styles.media, { width: mediaSize, height: mediaSize }]}
    />
  );
}

export default function SwipeAnimation() {
  const { scale } = useResponsiveLayout();
  const mediaSize = scale(140, 96, 170);

  if (Platform.OS === 'web') {
    return (
      <Image
        source={require('../assets/images/swipe-left.gif')}
        style={[styles.media, { width: mediaSize, height: mediaSize }]}
        resizeMode="contain"
      />
    );
  }

  return <NativeSwipeVideo mediaSize={mediaSize} />;
}

const styles = StyleSheet.create({
  media: {
    marginVertical: 22,
    alignSelf: 'center'
  },
});
