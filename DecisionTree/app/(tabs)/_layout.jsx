import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

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
          title: t('HOME'),
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
    title: t('GUIDELINES'),
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require('../../assets/images/retningslinjer_ikon1.png')
            : require('../../assets/images/retningslinjer_ikon2.png')
        }
        style={{ width: 28, height: 28 }}
        resizeMode="contain"
      />
    ),
  }}
/>
      <Tabs.Screen
        name="decisionTreePage"
        options={{
          title: "BCAT",
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
          title: t('MORE'),
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
