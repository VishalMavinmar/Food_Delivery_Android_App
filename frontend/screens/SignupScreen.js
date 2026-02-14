import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { signup } from "../utils/auth";
import colors from "../constants/colors";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await signup(name.trim(), email.trim(), password);
      alert("Account created. Please login.");
      navigation.replace("Login");
    } catch (err) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={require("../assets/login.png")}
        style={styles.image}
        resizeMode="contain"
      /> */}

      <View style={styles.card}>
        <Text style={styles.title}>Create Account ✨</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating account..." : "Signup"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "700" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: 20,
  },
  image: {
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: colors.primary,
  },
});
