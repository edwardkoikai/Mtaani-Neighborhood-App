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
import useFetchNews from "./hooks/useFetchNews";
import Posts from "./Posts";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  useEffect(() => {
    reload();
  }, [navigation]);
  const [user, setUser] = useState("");
  const route = useRoute();
  const reload = () => {
    AsyncStorage.getItem("userId")
      .then((userId) => {
        console.log(userId);
        setUser(userId);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const [location, setLocation] = useState("");
  const Item = ({ item }) => <Posts item={item} />;
  const { posts, isErrorP, isPendingP } = useFetchNews(location);
  console.log(posts);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.crimes}>
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
            No News in {location}
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
  crimes: {
    justifyContent: "center",
  },
});
export default Home;
