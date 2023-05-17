import { View, Text, ScrollView, StyleSheet,Image,TextInput ,TouchableOpacity,FlatList} from 'react-native'
import React, {useState } from 'react'
import useFechtUser from './hooks/useFetchUser'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import useFetchMyposts from './hooks/useFetchMyposts'
import MynewsCard from './MynewsCard'

import Entypo from "@expo/vector-icons/Entypo";

const Profile = () => {
    const { posts: userProfile } = useFechtUser('users')
    console.log(userProfile,'......profile')
   const navigation = useNavigation()
    const [username,setUsername] = useState(userProfile?.username)
    const [location,setLocation] = useState(userProfile?.location)
    console.log(userProfile?.userId)
    const { myposts} = useFetchMyposts("posts")
    console.log(myposts,'my posts ..........................')
    const handleUpdate = () => {
        
        if (!username || !location) {
            alert("All fields are required")
            return
        }
        const newProfile = {
            username: username,
            location:location,
        }
        const docRef = doc(db,'users', userProfile.id)
        updateDoc(docRef, newProfile).then(() => { 
            alert("Profile updated successifully")
        })
            .catch((e) => {
            alert(e.message)
        })
    }

    const Item = ({ item }) => (
      <View style={styles.crime}>
      <Image source={{ uri: item.image }} style={styles.image}
          resizeMode="cover"
          />
                <View style={{flex:1,backgroundColor:"white"}}>
                    <View style={{flexDirection:"row"}}>
                        <Text>{item.category} . </Text>
                <Text>{item.headline} . </Text>
                {item.status == "verified" ? (
                      <Text style={{borderColor:"green",borderWidth:1,marginLeft:5,borderRadius:5,padding:2}}>{ item.status}</Text>
                ) : (  <Text style={{borderColor:"red",borderWidth:1,marginLeft:5,borderRadius:5,padding:2}}>{ item.status}</Text>)}
                    </View>
                    <Text style={{ flex: 1,fontWeight: "bold",fontSize:17,marginTop:4,color:"#00000078" }}>
                    {item.description}
                    </Text>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row"}}>
                            <Entypo name='location-pin' size={15} color={"#00000078"} />
                            {/* <Text style={{color:"#00000078"}}> {item.location}</Text> */}
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Entypo name='phone' size={15} color={"#00000078"} />
                  {/* <Text style={{ color: "#00000078" }}> {item.phone}</Text> */}
                 
                        </View>
                    </View>
                </View>  
      
      </View>
    )
    return (
      <View style={styles.wrapper}>
      
          <View>
              <AntDesign name="user" color={"black"} size={40} style={{ alignSelf: "center" }} />
              <Text style={{alignSelf:"center",margin:20,fontSize:30}}>{userProfile?.username} . {userProfile?.location}</Text>
              
          </View> 
       
    <View>
        <Text style={{marginBottom:10}}>New username</Text>
      <TextInput
            style={styles.input}
            placeholder="Enter new username"
          onChangeText={(val)=>{setUsername(val)}}
      
            />
        <Text style={{marginBottom:10}}>New Location</Text>
      <TextInput
            style={styles.input}
       placeholder="Enter new location"
          onChangeText={setLocation}
      
            />
    
  
          <TouchableOpacity style={styles.login} onPress={handleUpdate}>
                 <Text style={{color:"white"}}> Update</Text>
              </TouchableOpacity>
           
            
                {/* <Text style={{marginTop:20,fontSize:20}}>My posts</Text>

       <ScrollView>
       <FlatList
          style={{backgroundColor:"green",width:200,height:200}}
            data={myposts}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
       </ScrollView> */}
     
       
         
    
   
   
           
        
      </View>     

  
      </View>
   
  )
}
const styles = StyleSheet.create({
    container: {
      margin: 20,
    
    },
    wrapper: {
      padding: 20,
      backgroundColor: "white",
      flex: 1
    
    },
   
    input: {
      padding:10,
      marginTop:5,
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "white",
      marginBottom: 14,
      borderRadius:5
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
      alignItems:"center"
    },
    crimes: {
      //   margin: 10,
        justifyContent:"center"
      },
      crime: {
        borderTopWidth: 1,
        borderColor:"#0000001b",
        marginTop:10,
       padding:10,
        flexDirection:"row",
         height:200,
        backgroundColor:"white"
      },
      image: {
          width: 120,
          height: 120,
          borderRadius: 5,
          marginRight:5,
      }
   
  });


export default Profile