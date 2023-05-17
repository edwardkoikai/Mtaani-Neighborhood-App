import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BusinessCard from "./BusinessCard";
import useFetchAdminBusiness from "./hooks/useFetchAdminBusiness";

const Businnesses = () => {
  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((userId) => {
        console.log(userId);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [navigation]);
  const route = useRoute();
  const [location, setLocation] = useState("");
  // console.log(route.params.userId)
  const Item = ({ item }) => <BusinessCard item={item} />;
  const { posts, isErrorP, isPendingP } = useFetchAdminBusiness(location);
  console.log(posts);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
            alignItems: "center",
          }}
        >
          <TextInput placeholder="Type a location" onChangeText={setLocation} />
        </View>
        {isPendingP && <ActivityIndicator size={"large"} color="black" />}
        {!isErrorP && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.pid}
          />
        )}
        {!isPendingP && posts.length == 0 && (
          <Text style={{ alignSelf: "center", marginTop: 50, fontSize: 35 }}>
            No pending business in {location}
          </Text>
        )}
        {isErrorP && (
          <Text
            style={{
              alignSelf: "center",
              marginTop: 50,
              fontSize: 35,
              color: "red",
            }}
          >
            {isErrorP}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
  },
});
export default Businnesses;
