import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingVertical: 10,
        },
        tabBarItemStyle: {
          padding: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: "search",
          tabBarLabel: "Busca",
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="search" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          href: "tickets",
          tabBarLabel: "Tickets",
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
