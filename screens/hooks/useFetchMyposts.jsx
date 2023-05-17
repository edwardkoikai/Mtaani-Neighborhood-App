
import { useEffect ,useState} from "react"

import { collection, getDocs, query, where,orderBy ,onSnapshot} from "firebase/firestore"
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useFetchMyposts = (tbl) => {
const col = tbl;
const [myposts,setPosts] = useState([])
const [isErrorP,setError] = useState(null)
const [isPendingP, setPendingP] = useState(true)
const [userProfile,setUser] = useState()
 
    useEffect((tbl) => {
  
        AsyncStorage.getItem('userId')
        .then((userId)=>{
          if(userId !== null) {
          
            if (!userId) {
         
              }
            
              const Posts = []
              
              const userRef = collection(db, "posts")
                      const q = query(userRef,where("userId","==",userId))
              getDocs(q).then(users => {
                  users.forEach(user => {
                    Posts.push({ ...user.data(), id: user.id })
                    setPosts(Posts[0])
                  setPendingP(false)
                 
             
                 
                  })
               
                 
              }).catch(err => {
              
                  console.log(err.message)
                      })
    
          } else {
            // navigation.navigate('Login')
           console.log('err reading from storage')
    }
        })
          .catch((e) => {
          alert(e.message)
        })      
    }, [tbl])
   
  return {myposts,isErrorP,isPendingP}
}

export default useFetchMyposts