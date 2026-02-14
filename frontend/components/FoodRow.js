import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useFavorites } from "../context/FavoritesContext";

export default function FoodRow({ item, onPress }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(f => f.id === item.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        width: "48%",
        borderRadius: 16,
        padding: 10,
        marginBottom: 16,
      }}
    >
      {/* IMAGE */}
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 120, borderRadius: 12 }}
      />

      {/* FAVORITE ICON */}
      <TouchableOpacity
        onPress={() => toggleFavorite(item)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 4,
        }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={20}
          color="red"
        />
      </TouchableOpacity>

      {/* INFO */}
      <Text style={{ fontWeight: "700", marginTop: 8 }}>
        {item.name}
      </Text>

      <Text style={{ color: colors.gray, fontSize: 12 }}>
        ⭐ {item.rating} • {item.cook_time} min
      </Text>

      <Text style={{ marginTop: 4, fontWeight: "700" }}>
        ₹{item.price}
      </Text>
    </TouchableOpacity>
  );
}
