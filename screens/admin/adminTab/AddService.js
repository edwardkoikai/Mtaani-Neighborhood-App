import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
const storage = getStorage();

const AddService = () => {
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("no location");
  const [headline, setHeadline] = useState("");
  const [price, setPrice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filenames, setFileName] = useState("");
  const data = [
    { key: "1", value: "Tree planting" },
    { key: "2", value: "Salon" },
    { key: "3", value: "Machinery" },
    { key: "4", value: "Farming" },
    { key: "5", value: "Transport" },
    { key: "6", value: "School" },
    { key: "7", value: "Cleaning" },
    { key: "8", value: "Other" },
  ];

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };

    setImage(source);
  };
  const upload = async () => {
    setUploading(true);
    if (!location || !description || !image || !selected || !headline) {
      alert("All fields are required");
      return;
    }
    alert("posting please wait...");

    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);

    const storageRef = ref(storage, filename);
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("uploaded");
        getDownloadURL(snapshot.ref).then((url) => {
          const imageUrl = url;
          const post = {
            username: "Administrator",
            image: imageUrl,
            description: description,
            createdAt: serverTimestamp(),
            status: "verified",
            location: location,
            category: selected,
            serviceName: headline,
            price: price,
          };
          const postRef = collection(db, "services");
          addDoc(postRef, post)
            .then(() => {
              alert("Service added");
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setUploading(false);

    setFileName(filenames);
    setImage(null);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{ marginBottom: 10 }}>Service Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of business"
            onChangeText={setHeadline}
            multiline={true}
          />
          <Text style={{ marginBottom: 10 }}>Description </Text>
          <TextInput
            style={styles.input}
            placeholder="Write something..."
            onChangeText={setDescription}
            multiline={true}
          />
          <Text style={{ marginBottom: 10 }}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={setLocation}
          />
          <Text style={{ marginBottom: 10 }}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price in KES"
            onChangeText={setPrice}
          />
          <Text style={{ marginBottom: 10 }}>Service Type </Text>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            placeholder=""
          />
          <TouchableOpacity
            onPress={pick}
            style={{ alignItems: "center", marginTop: 15 }}
          >
            <AntDesign name="plussquare" size={20} color="#041337" />
            <Text>Upload photo</Text>
          </TouchableOpacity>

          {image && <Image source={{ uri: image.uri }} style={styles.image} />}

          <TouchableOpacity style={styles.login} onPress={upload}>
            <Text style={{ color: "white" }}> Add service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  wrapper: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  selectList: {
    display: "none",
  },
  input: {
    padding: 10,
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 14,
    borderRadius: 5,
  },
  login: {
    backgroundColor: "#041337",
    padding: 15,

    alignSelf: "center",
    marginTop: 20,
    color: "white",
    borderRadius: 5,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    minHeight: 200,
  },
});

export default AddService;
