import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import useFetchNews from "./hooks/useFetchNews";

import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFetchServices from "./hooks/useFetchservices";
import ServiceCard from "./ServiceCard";

const Services = () => {
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

  const Item = ({ item }) => <ServiceCard item={item} />;
  const { posts, isErrorP, isPendingP } = useFetchServices(location);
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
            No Services in {location}
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
    // margin: 10,
    justifyContent: "center",
  },
});
export default Services;
