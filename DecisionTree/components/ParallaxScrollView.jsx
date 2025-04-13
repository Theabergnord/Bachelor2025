import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ParallaxScrollView({ children, noPadding = false, hideBack = false }) {
  //const navigation = useNavigation();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        {!hideBack && (
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <View style={styles.backButtonContent}>
          <Ionicons name="arrow-back" size={20} color="#345641" />
          <Text style={styles.backButtonText}>Forrige</Text>
          </View>
        </TouchableOpacity>
        </View>
      )}
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={{ ...(noPadding ? styles.noPadding : styles.content), flexGrow: 1, paddingBottom: 40, }} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  scroll: {
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
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  backButtonText: {
    fontSize: 16,
    color: '#345641',
  },
  content: {
    padding: 32,
    gap: 16,
    alignItems: 'stretch',
  },
  noPadding: {
    paddingHorizontal: 0,
  }
});

/* Kilder
* Statusbar - https://reactnative.dev/docs/statusbar
* Optional Props - https://www.dhiwise.com/post/how-react-optional-props-can-improve-the-maintainability
* ScrollView - https://reactnative.dev/docs/scrollview
* paddingTop: Platform.OS osv. - https://stackoverflow.com/questions/64926356/paddingtop-platform-os-android-statusbar-currentheight-0 
*/

