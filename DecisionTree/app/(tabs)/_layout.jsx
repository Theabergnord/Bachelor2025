import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hjem',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="guidelines"
        options={{
          title: 'Retningslinjer',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="decisionTreePage"
        options={{
          title: 'Tree',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "git-branch" : "git-branch-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Mer',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "ellipsis-horizontal" : "ellipsis-horizontal-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen 
    name="swipeTips" 
    options={{ 
      href: null,  // Vises ikke i tab-baren
      headerShown: false // Fjerner header på toppen
    }}
  />
  <Tabs.Screen 
    name="iconTips" 
    options={{ 
      href: null,  // Vises ikke i tab-baren
      headerShown: false // Fjerner header på toppen
    }} 
  />
      
    </Tabs>
  );
}
