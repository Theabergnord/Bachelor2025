import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';

export default function ParallaxScrollView({ children }) {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'} Forrige</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingVertical: 10,
    position: 'absolute',
    top: 50,
    left: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#345641',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});

