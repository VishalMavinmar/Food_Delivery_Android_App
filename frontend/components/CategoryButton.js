import { TouchableOpacity, Text } from "react-native";
import colors from "../constants/colors";

export default function CategoryButton({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: isActive ? colors.primary : "#fff",
        borderWidth: isActive ? 0 : 1,
        borderColor: "#ddd",
      }}
    >
      <Text
        style={{
          color: isActive ? "#fff" : colors.text,
          fontWeight: isActive ? "bold" : "500",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
