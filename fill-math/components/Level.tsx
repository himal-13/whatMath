import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface LevelsPros{
    highestLevel:number,
    handleNext:()=>void,
    handlePrevoius:()=>void
}

const Levels = ({highestLevel,handleNext,handlePrevoius}:LevelsPros) => {

  
  
  return (
    <View  style={{justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:20,color:"#fff"}}>Highest solved Level: {highestLevel}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <TouchableOpacity 
        onPress={handlePrevoius}>
      <Image source={require("./images/previous.png")} style={{height:50,width:50}} resizeMode='contain' />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={handleNext}>
      <Image source={require("./images/next.png")} style={{height:50,width:50}} resizeMode='contain' />
      </TouchableOpacity>

    </View></View>
  )
}


export default Levels