import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export async function pickImage() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Media library permissions rejected",
      "Allow access to your photos in settings to pick an image",
      [
        { text: "Cancel" },
        { text: "Open settings", onPress: () => Linking.openSettings() },
      ],
    );
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  });
  return result.canceled ? null : result.assets[0].uri;
}
