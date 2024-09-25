import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const Menu = () => {
    const[tutorialMode,setTutorialMode] = useState(false)
    const[aboutMode,setAboutmode] = useState(false)
  return (
    <View style={{width:"100%",justifyContent:"center",}}>
      <Text style={{marginBottom:"10%",padding:5,fontSize:17,color:"#fff"}}> ? + ? =5 is a Math Game.</Text>
      {
        tutorialMode?(
            <Text  style={{padding:5,fontSize:17,color:"#fff"}} onPress={()=>setTutorialMode(false)}>There must be 3 or 4 numbers at the bottom of your device. Solve mathematics of possibilities of arrangement of numbers in the question and arrange them from those bottom numbers.</Text>

        ):(
            <TouchableOpacity
            onPress={()=>{setTutorialMode(true)
                 setAboutmode(false)}}
      >
        <Text style={{fontSize:25,padding:10,fontWeight:"800",color:"#fff",borderColor:"#fff",borderWidth:1}}>How To Play?</Text>
      </TouchableOpacity>
        )
      }
      {
        aboutMode?(
            <Text style={{padding:5,fontSize:17,color:"#fff"}} onPress={()=>setAboutmode(false)}> My name is Himal, thanks for playing my game. Please review and suggest me things that i can improve.</Text>
        ):(
            <TouchableOpacity
            onPress={()=>{
                setAboutmode(true)
                setTutorialMode(false)
            }}
            >
            <Text style={{fontSize:25,padding:10,fontWeight:"800",color:"#fff",borderColor:"#fff",borderWidth:1}}>About</Text>
          </TouchableOpacity>
        )
      }
      
    
    </View>
  )
}

export default Menu