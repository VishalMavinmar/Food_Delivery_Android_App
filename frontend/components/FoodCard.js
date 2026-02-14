import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function FoodCard({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 150, borderRadius: 12 }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
        {item.name}
      </Text>

      <Text style={{ color: colors.gray }}>
        {item.cook_time} min · ⭐ {item.rating}
      </Text>

      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 6 }}>
        ₹{item.price}
      </Text>
    </TouchableOpacity>
  );
}
