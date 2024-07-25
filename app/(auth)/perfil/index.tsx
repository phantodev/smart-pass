import { createStyles } from "@/assets/css/global";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  useColorScheme,
  Pressable,
  Button,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AvatarButton = styled.Pressable`
  width: 200px;
  height: 200px;
  border-radius: 150px;
  background-color: #c3c3c3;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
`;

const AvatarText = styled.Text`
  font-size: 20px;
  color: #27272a;
`;

const ModalCamera = styled.Modal`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ContainerIcon = styled.Pressable`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ContainerIconTakePhoto = styled.Pressable`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #ff0000;
  padding: 20px;
  border-radius: 100px;
`;

const OpenGalleryButton = styled.Button`
  background-color: #ff0000;
  padding: 10px;
  border-radius: 5px;
`;

export default function Perfil() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  const router = useRouter();
  const [displayName, setDisplayName] = React.useState("");
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  const cameraRef = React.useRef<CameraView>(null);
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [image2Uri, setImage2Uri] = React.useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  async function uploadImage() {
    // if(!image2Uri){
    //   console.tron.log("Imagem não selecionada");
    //   return
    // }
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + new Date().getTime());
    const response = await fetch(image2Uri!);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    console.tron.log(url);
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      console.tron.log(result);
      setImage2Uri(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    if (cameraRef && cameraRef.current !== null) {
      const data = await cameraRef.current.takePictureAsync();
      if (data) {
        setImageUri(data.uri);
        setIsCameraOpen(false);
      }
    }
  }

  const handleLogout = () => {
    // Lógica de logout aqui
    AsyncStorage.removeItem("user");
    router.replace("/");
    getData("user").then((user) => {
      if (user) {
        console.tron.log(user);
      }
    });
  };

  async function getData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Erro ao recuperar dados", e);
    }
  }

  React.useEffect(() => {
    // requestPermission();
    // Alert.alert(JSON.stringify(permission));
    getData("user").then((user) => {
      if (user) {
        setDisplayName(user.displayName);
      }
    });
  }, []);

  React.useEffect(() => {
    if (image2Uri) {
      uploadImage();
    }
  }, [image2Uri]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  // React.useEffect(() => {
  //   requestPermission();
  //   console.tron.log(permission);
  // }, []);

  return (
    <View style={styles.container}>
      <AvatarButton onPress={() => setIsCameraOpen(true)}>
        {imageUri === null ? (
          <AvatarText>Adicione Foto</AvatarText>
        ) : (
          <Image
            style={styles.avatar}
            contentFit="cover"
            source={imageUri}
            transition={1000}
          />
        )}
      </AvatarButton>
      <AvatarButton>
        {image2Uri !== null && (
          <Image
            style={styles.avatar}
            contentFit="cover"
            source={image2Uri}
            transition={1000}
          />
        )}
      </AvatarButton>
      <OpenGalleryButton
        title="Abrir Galeria"
        onPress={pickImage}></OpenGalleryButton>
      <Text style={styles.text}>{displayName}</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
      <ModalCamera visible={isCameraOpen}>
        <CameraView facing={facing} ref={cameraRef} style={styles.camera}>
          <ContainerIconTakePhoto onPress={() => takePhoto()}>
            <AntDesign name="camera" size={48} color="white" />
          </ContainerIconTakePhoto>
          <ContainerIcon onPress={() => setIsCameraOpen(false)}>
            <AntDesign name="closecircle" size={48} color="black" />
          </ContainerIcon>
        </CameraView>
      </ModalCamera>
    </View>
  );
}
