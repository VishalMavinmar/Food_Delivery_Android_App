import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";

import { API } from "../api/api";
import FoodRow from "../components/FoodRow";
import colors from "../constants/colors";


export default function HomeScreen({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ===== FIXED CATEGORY LIST ===== */
  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Desserts",
  ];

  /* ===== FETCH DATA ===== */
  const fetchFoods = async () => {
    try {
      const res = await API.get("/api/foods/");
      setFoods(res.data);
    } catch (error) {
      console.log("API ERROR:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  /* ===== FILTER ===== */
  const filteredFoods = useMemo(() => {
    return foods.filter((item) => {
      const categoryMatch =
        selectedCategory === "All" ||
        item.category?.name === selectedCategory;

      const searchMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [foods, selectedCategory, search]);

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.bg,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 12, color: colors.gray }}>
          Loading delicious food...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* ===== HEADER ===== */}
     {/* ===== HEADER ===== */}
<View
  style={{
    paddingHorizontal: 20,
    paddingTop: 20,
    position: "relative",
  }}
>
  {/* PROFILE ICON */}
  <TouchableOpacity
    onPress={() => navigation.navigate("Profile")}
    style={{
      position: "absolute",
      right: 20,
      top: 20,
      zIndex: 10,
    }}
  >
    <Ionicons
      name="person-circle-outline"
      size={40}
      color={colors.primary}
    />
  </TouchableOpacity>

  {/* TITLE */}
  <Text style={{ fontSize: 26, fontWeight: "800" }}>
    Jimmis Kitchen 
  </Text>

  {/* SUBTITLE */}
  <Text
    style={{
      color: colors.gray,
      marginTop: 4,
      fontSize: 14,
    }}
  >
    Fresh food • Fast delivery
  </Text>
</View>
 

      {/* ===== SEARCH ===== */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          marginHorizontal: 20,
          borderRadius: 14,
          paddingHorizontal: 14,
          height: 48,
          marginTop: 16,
        }}
      >
        <Ionicons name="search" size={20} color={colors.gray} />
        <TextInput
          placeholder="Search dishes, pizza, burger..."
          placeholderTextColor={colors.gray}
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 15,
          }}
        />
      </View>

      {/* ===== CATEGORY PILLS (FIXED) ===== */}
      <View style={{ marginTop: 18 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          renderItem={({ item }) => {
            const active = selectedCategory === item;

            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 18,
                  backgroundColor: active ? colors.primary : "#fff",
                  marginRight: 10,
                  borderWidth: active ? 0 : 1,
                  borderColor: "#e2e2e2",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: active ? "#fff" : colors.text,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ===== FOOD GRID ===== */}
      <FlatList
        data={filteredFoods}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{
          paddingTop: 18,
          paddingBottom: 120,
        }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchFoods();
        }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Ionicons
              name="restaurant-outline"
              size={64}
              color={colors.gray}
            />
            <Text
              style={{
                marginTop: 12,
                color: colors.gray,
                fontSize: 16,
              }}
            >
              No food found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <FoodRow
            item={item}
            onPress={() =>
              navigation.navigate("FoodDetail", { food: item })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
