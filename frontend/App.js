import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FoodDetail from "./screens/FoodDetail";
import CartScreen from "./screens/CartScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext"; // ✅ IMPORTANT

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="fast-food-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider> {/* 🔥 THIS FIXES EVERYTHING */}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="FoodDetail" component={FoodDetail} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </FavoritesProvider>
  );
}
