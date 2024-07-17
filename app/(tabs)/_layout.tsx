import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="search"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Busca",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="choose-airport"
        options={{
          href: null,
          headerTitle: "Escolha o aeroporto",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
