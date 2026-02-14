import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../api/api";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/api/auth/profile/")
      .then((res) => setProfile(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  if (!profile) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f6f2fb",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
      {/* PROFILE CARD */}
      <View
        style={{
          backgroundColor: "#fff",
          width: "90%",
          borderRadius: 20,
          alignItems: "center",
          paddingVertical: 30,
          paddingHorizontal: 20,
          elevation: 4,
        }}
      >
        {/* PROFILE IMAGE */}
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: "#eee",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Ionicons
            name="person"
            size={60}
            color={colors.primary}
          />
        </View>

        {/* NAME */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#222",
          }}
        >
          {profile.name}
        </Text>

        {/* EMAIL */}
        <Text
          style={{
            fontSize: 14,
            color: "#777",
            marginTop: 6,
          }}
        >
          {profile.email}
        </Text>
      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 40,
          backgroundColor: colors.primary,
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
