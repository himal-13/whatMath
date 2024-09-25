import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native' 
import Menu from '@/components/Menu'
import Levels from '@/components/Level'
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {

    const[firnum,setFirnum]=useState('?')
    const[secnum,setsecnum]=useState('?')
    const[thirdnum,setThirdnum]=useState('?')
    const[fornum,setFornum]=useState('?')
    const[currentQuestion,setCurrentQuestion] = useState(0)
    const[showLevelMode,setShowLevelMode] = useState(false)
    const[menuMode,setMenuMode] = useState(false)
    const[highestLevel,setHighestLevel] = useState(0)
    const[levelData,setLevelData] = useState(0)

    

    //questions array
    const levels =[
        {id:1, question:`${firnum} + ${secnum} + ${thirdnum}`, answer:"10", optionNum:["5","1","4"]},
        {id:2, question:`${firnum} + ${secnum} - ${thirdnum}`, answer:"0", optionNum:["6","2","4"]},
        {id:3, question:`${firnum} - ${secnum} + ${thirdnum}`, answer:"5", optionNum:["8","3","10"]},
        {id:4, question:`${firnum} x ${secnum} - ${thirdnum}`, answer:"15", optionNum:["7","3","6"]},
        {id:5, question:`${firnum} x ${secnum} ÷ ${thirdnum}`, answer:"12", optionNum:["9","4","3"]},
        {id:6, question:`(${firnum} - ${secnum}) x ${thirdnum}`, answer:"21", optionNum:["7","3","6"]},
        {id:7, question:`${firnum} - ${secnum} x ${thirdnum} + ${fornum}`, answer:"6", optionNum:["5","3","7","2"]},
        {id:8, question:`${firnum} + ${secnum} - ${thirdnum} + ${fornum}`, answer:"16", optionNum:["8","4","2","6"]},
        {id:9, question:`(${firnum} - ${secnum}) x (${thirdnum} + ${fornum})`, answer:"16", optionNum:["2","3","0","5"]},
        {id:10, question:`${firnum} ÷ ${secnum} x ${thirdnum} - ${fornum}`, answer:"0", optionNum:["6","2","1","3"]},
        {id:11, question:`${firnum} ÷ ${secnum} x (${thirdnum} - ${fornum})`, answer:"9", optionNum:["7","9","2","5"]},
        {id:12, question:`${firnum} - (${secnum} x ${thirdnum} - ${fornum})`, answer:"5", optionNum:["7","6","4","2"]},
        {id:13, question:`(${firnum} + ${secnum}) ÷ ${thirdnum} - ${fornum}`, answer:"0", optionNum:["8","3","5","7"]},
        {id:14, question:`${firnum} - ${secnum} x (${thirdnum} - ${fornum})`, answer:"1", optionNum:["4","3","2","1"]},
        {id:15, question:`${firnum} ÷ ${secnum} + (${thirdnum} - ${fornum})`, answer:"10", optionNum:["9","7","14","3"]},
        {id:16, question:`(${firnum} - ${secnum}) ÷ (${thirdnum} - ${fornum}) `, answer:"1", optionNum:["17","13","8","12"]},
        {id:17, question:`${firnum} ÷ (${secnum} - ${thirdnum}) x ${fornum}`, answer:"8", optionNum:["16","20","8","6"]},
        {id:18, question:`(${firnum} + ${secnum} x ${thirdnum}) - ${fornum}`, answer:"4", optionNum:["8","7","1","3"]},
        {id:19, question:`${firnum} - (${secnum} x ${thirdnum} + ${fornum})`, answer:"3", optionNum:["12","5","0","9"]},
        {id:20, question:`${firnum} ÷ (${secnum} - ${thirdnum}) + ${fornum}`, answer:"11", optionNum:["12","8","7","3"]},
        {id:21, question:`${firnum} ÷ (${secnum} x ${thirdnum} - ${fornum})`, answer:"2", optionNum:["18","6","5","3"]},
        {id:22, question:`${firnum} x ${secnum} + (${thirdnum} - ${fornum})`, answer:"14", optionNum:["9","7","4","3"]},
        {id:23, question:`${firnum} ÷ (${secnum} - ${thirdnum}) + ${fornum}`, answer:"6", optionNum:["15","7","12","3"]},
        {id:24, question:`${firnum} - ${secnum} x (${thirdnum} - ${fornum})`, answer:"5", optionNum:["13","8","6","4"]},
        {id: 25, question: `(${firnum} x ${secnum}) + (${thirdnum} - ${fornum})`, answer: "25", optionNum: ["8", "6", "4", "9"]},
        {id: 26, question: `(${firnum} - ${secnum}) ÷ (${thirdnum} + ${fornum})`, answer: "1", optionNum: ["3", "2", "0", "5"]},
        {id: 27, question: `(${firnum} + ${secnum}) - (${thirdnum} ÷ ${fornum})`, answer: "6", optionNum: ["8", "5", "4", "3"]},
        {id: 28, question: `(${firnum} + ${secnum}) x (${thirdnum} - ${fornum})`, answer: "3", optionNum: ["1", "5", "2", "6"]},
        {id: 29, question: `(${firnum} ÷ ${secnum}) x ${thirdnum} - ${fornum}`, answer: "10", optionNum: ["8", "6", "3", "9"]},
        {id: 30, question: `(${firnum} - ${secnum} x ${thirdnum}) - ${fornum}`, answer: "1", optionNum: ["3", "2", "0", "5"]},
        {id: 31, question: `(${firnum} x ${secnum} - ${thirdnum}) ÷ ${fornum}`, answer: "21", optionNum: ["3", "6", "4", "1"]},
        {id: 32, question: `${firnum} ÷ (${secnum} - ${thirdnum} x ${fornum})`, answer: "2", optionNum: ["1", "5", "2", "6"]},
        {id: 33, question: `(${firnum} + ${secnum} ÷ ${thirdnum}) x ${fornum}`, answer: "22", optionNum: ["9", "8", "3", "2"]},
        {id: 34, question: `(${firnum} x ${secnum}) - ${thirdnum} + ${fornum}`, answer: "13", optionNum: ["3", "6", "4", "5"]},
        {id: 35, question: `${firnum} - ${secnum} x (${thirdnum} + ${fornum})`, answer: "1", optionNum: ["1", "5", "2", "8"]},
        {id: 36, question: `${firnum} + (${secnum} ÷ ${thirdnum}) - ${fornum}`, answer: "1", optionNum: ["3", "2", "6", "5"]},
        {id: 37, question: `(${firnum} + ${secnum} x ${thirdnum}) ÷ ${fornum}`, answer: "2", optionNum: ["8", "6", "4", "16"]},
        {id: 38, question: `${firnum} ÷ ${secnum} + (${thirdnum} x ${fornum})`, answer: "17", optionNum: ["1", "5", "2", "6"]},
        {id: 39, question: `(${firnum} - ${secnum}) x (${thirdnum} ÷ ${fornum})`, answer: "12", optionNum: ["3", "2", "6", "1"]},
        {id: 40, question: `(${firnum} x ${secnum} - ${thirdnum}) + ${fornum}`, answer: "19", optionNum: ["4", "3", "7", "2"]},
        {id: 41, question: `(${firnum} ÷ ${secnum}) - (${thirdnum} - ${fornum})`, answer: "13", optionNum: ["1", "9", "2", "6"]},
        {id: 42, question: `${firnum} - (${secnum} ÷ (${thirdnum} x ${fornum}))`, answer: "5", optionNum: ["4", "2", "8", "6"]},
        {id: 43, question: `(${firnum} - ${secnum} x ${thirdnum}) + ${fornum}`, answer: "7", optionNum: ["3", "4", "9", "2"]},
        {id: 44, question: `(${firnum} - ${secnum}) x (${thirdnum} + ${fornum})`, answer: "3", optionNum: ["1", "5", "2", "6"]},
        {id: 45, question: `${firnum} x ${secnum} ÷ (${thirdnum} - ${fornum})`, answer: "2", optionNum: ["3", "2", "8", "5"]},
        {id: 46, question: `${firnum} + (${secnum} x ${thirdnum} ÷ ${fornum})`, answer: "12", optionNum: ["8", "6", "4", "9"]},
        {id: 47, question: `(${firnum} ÷ ${secnum}) + (${thirdnum} x ${fornum})`, answer: "17", optionNum: ["1", "5", "2", "6"]},
        {id: 48, question: `(${firnum} - ${secnum}) x ${thirdnum} ÷ ${fornum}`, answer: "3", optionNum: ["3", "8", "10", "6"]},
        {id: 49, question: `(${firnum} x ${secnum}) ÷ ${thirdnum} + ${fornum}`, answer: "12", optionNum: ["8", "6", "4", "9"]},
        {id: 50, question: `${firnum} ÷ ${secnum} - (${thirdnum} x ${fornum})`, answer: "0", optionNum: ["1", "4", "3", "12"]}


    ]

    
    //update question on 
    function updateQuestion() {
        return levels[currentQuestion].question;
      }

      let textValue = updateQuestion();

      function showAlert(){
        Alert.alert(
          'New Levels will be updating soon.',
          'Wow! You have completed all the levels for now.',
        
          [
            {text:"Okay", onPress:()=>setCurrentQuestion(levels.length - 1)},
            {text:"Restart", onPress:()=>setCurrentQuestion(0)}
          ],
          {cancelable:true}
        )

      }
        const storeData =async(value:number)=>{
            try{
                await AsyncStorage.setItem('my-level', value.toString());

            }catch(e){

            }

        }

        useEffect(()=>{
            async function getLevel() {
            const jsonValue = await AsyncStorage.getItem('my-level')
            if(jsonValue){
            const currentLevel = JSON.parse(jsonValue)
                setCurrentQuestion(currentLevel+1)
                setHighestLevel(currentLevel+1)
            }

                
            }
            getLevel()
            
        },[])

    //handle next btn
    function handlePress(){    
      if(currentQuestion+1 > highestLevel){
        setHighestLevel(currentQuestion+1)
        setLevelData(highestLevel)
      }
        if(textValue.includes("x")){
            textValue = textValue.replace("x","*")
         }if(textValue.includes("÷")){
             textValue =textValue.replace("÷","/")
         }
        if(levels[currentQuestion].optionNum.length==3){

        if(firnum !== "?" && secnum !== "?" && thirdnum !== "?" ){
            
            const userValue = eval(textValue)
            if(userValue == levels[currentQuestion].answer){
                setCurrentQuestion(currentQuestion+1)
                textValue = updateQuestion();
                storeData(currentQuestion)
            }
            setFirnum("?")
            setsecnum("?")
            setThirdnum("?")
            setFornum("?")        
        }}
        else if(levels[currentQuestion].optionNum.length==4){
            if(firnum !== "?" && secnum !== "?" && thirdnum !== "?" && fornum !=='?' ){
            
                const userValue = eval(textValue)

                if(userValue == levels[currentQuestion].answer){
                    setCurrentQuestion(currentQuestion+1)
                    textValue = updateQuestion()
                    if(currentQuestion+1 >= levels.length){
                      showAlert();
                      setCurrentQuestion(currentQuestion-1)
                    }
                }
                setFirnum("?")
                setsecnum("?")
                setThirdnum("?")
                setFornum("?")  
                
            }
            setFirnum("?")
            setsecnum("?")
            setThirdnum("?")
            setFornum("?")  
            
        }
        else{
                setFirnum("?")
                setsecnum("?")
                setThirdnum("?")
                setFornum("?")
    }}

    function handleReset(){
                setFirnum("?")
                setsecnum("?")
                setThirdnum("?")
                setFornum("?")
    }
    function handleLevel(){
      setShowLevelMode(!showLevelMode)
      setMenuMode(false)
    }

 
    // to select selected number in the field
    function btnFirst(){
        if(firnum =='?' && secnum =='?' && thirdnum =='?'){
            setFirnum(levels[currentQuestion].optionNum[0])
        }else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[0] && secnum =='?' && thirdnum =='?'){
            setsecnum(levels[currentQuestion].optionNum[0])
        }
        else if(firnum !=='?' && firnum !== levels[currentQuestion].optionNum[0] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[0]  && thirdnum =='?'){
            setThirdnum(levels[currentQuestion].optionNum[0])
        }else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[0] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[0] && thirdnum !=='?'&& thirdnum !== levels[currentQuestion].optionNum[0] && fornum == "?"){
          setFornum(levels[currentQuestion].optionNum[0])
      }
    }
    function btnSec(){
        if(firnum =='?'&& secnum =='?' && thirdnum =='?'){
            setFirnum(levels[currentQuestion].optionNum[1])
        }else if(firnum !=='?'  && firnum !== levels[currentQuestion].optionNum[1] && secnum =='?' && thirdnum =='?'){
            setsecnum(levels[currentQuestion].optionNum[1])
        }
        else if(firnum !=='?' && firnum !== levels[currentQuestion].optionNum[1] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[1] && thirdnum =='?'){
            setThirdnum(levels[currentQuestion].optionNum[1])
        }else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[1] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[1] && thirdnum !=='?'&& thirdnum !== levels[currentQuestion].optionNum[1] && fornum == "?"){
          setFornum(levels[currentQuestion].optionNum[1])
      }
    }
    function btnThird(){
        if(firnum =='?'&& secnum =='?' && thirdnum =='?'){
            setFirnum(levels[currentQuestion].optionNum[2])
        }else if(firnum !=='?' && firnum !== levels[currentQuestion].optionNum[2] && secnum =='?' && thirdnum =='?'){
            setsecnum(levels[currentQuestion].optionNum[2])
        }
        else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[2] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[2] && thirdnum =='?'){
            setThirdnum(levels[currentQuestion].optionNum[2])
        }else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[2] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[2] && thirdnum !=='?'&& thirdnum !== levels[currentQuestion].optionNum[2] && fornum == "?"){
          setFornum(levels[currentQuestion].optionNum[2])
      }
    }
    function btnFor(){
        if(firnum =='?'&& secnum =='?' && thirdnum =='?'){
            setFirnum(levels[currentQuestion].optionNum[3])
        }else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[3] && secnum =='?' && thirdnum =='?'){
            setsecnum(levels[currentQuestion].optionNum[3])
        }
        else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[3] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[3] && thirdnum =='?'){
            setThirdnum(levels[currentQuestion].optionNum[3])
        }else if(firnum !=='?'&& firnum !== levels[currentQuestion].optionNum[3] && secnum !=='?' && secnum !== levels[currentQuestion].optionNum[3] && thirdnum !=='?'&& thirdnum !== levels[currentQuestion].optionNum[3] && fornum == "?"){
            setFornum(levels[currentQuestion].optionNum[3])
        }
    }
    function handleNext(){
      
      if(currentQuestion < levels.length){

        if(currentQuestion<highestLevel){
          setCurrentQuestion(currentQuestion+1)
        }
        if(currentQuestion+1 == levels.length){
          setCurrentQuestion(0)
        }
        
      }

    }
    function handlePrevious(){
      if(currentQuestion> 0){
        setCurrentQuestion(currentQuestion-1)
      }
      if(currentQuestion == 0 && highestLevel !== 0){
        setCurrentQuestion(highestLevel)
      }else{
      }
    }


    return (
        <View style={styles.container}>
          <View style={styles.nav}>
            <View>
              <TouchableOpacity
              onPress={()=>{setMenuMode(!menuMode)
                setShowLevelMode(false)
              }}
              >
              <Text style={{fontSize:20,color:"#fff",padding:3,paddingLeft:10,paddingRight:5,borderWidth:3,borderColor:"#fff"}}>{menuMode?"close":"Menu"}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
              onPress={handleLevel}
              >
                <Text style={{fontSize:20,color:"#fff",padding:3,paddingLeft:10,paddingRight:5,borderWidth:3,borderColor:"#fff"}}>{showLevelMode?"close":`${levels[currentQuestion].id  } / ${levels.length}`}</Text>
              </TouchableOpacity>
            </View></View>
            <View style={{margin:"10%"}}>
            {
              showLevelMode?(
                <Levels highestLevel={highestLevel} handleNext={handleNext} handlePrevoius={handlePrevious}/>
              ):(
    <></>
              )
            }
            {
              menuMode?(
                <Menu />
              ):(
                <></>
              )
            }
             </View>
            <Text style={{fontSize:40,color:"#fff",fontWeight:"700",marginBottom:"20%"}}>Level - {levels[currentQuestion].id}</Text>
    
           
          
    
         
            <View style={styles.questionDiv}>
            <TouchableOpacity onPress={handleReset}>
                <Image source={require('../assets/reload.png')} resizeMode="contain"   style={{margin:10,width:40,height:40}} />
                </TouchableOpacity>
            <Text style={styles.question} >{textValue} = {levels[currentQuestion].answer}</Text>
            <TouchableOpacity onPress={handlePress}>
            <Image source={require('../assets/next.png')} resizeMode="contain"  style={{margin:10,width:40,height:40}}  />
            </TouchableOpacity>
            </View>
            
            {currentQuestion==0?(
      <Text style={{color:"#fff",fontSize:15,position:"absolute",top:"80%"}}> Use below numbers and solve the equation.</Text>
            ):(
              <></>
            )
          }
          
                {
               levels[currentQuestion].optionNum.length == 3?(
                    <View style={styles.optionsDiv}>
                            <TouchableOpacity
            onPress={btnFirst}
          >
            <Text style={styles.optionNum}>
              {levels[currentQuestion].optionNum[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={btnSec}
          >
            <Text style={styles.optionNum}>
              {levels[currentQuestion].optionNum[1]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={btnThird}
          >
            <Text style={styles.optionNum}>
              {levels[currentQuestion].optionNum[2]}
            </Text>
          </TouchableOpacity>
                        </View>
                ):(
                    <View style={styles.optionsDiv}>
                      <TouchableOpacity
            onPress={btnFirst}
          >
            <Text style={styles.optionNum}>
              {levels[currentQuestion].optionNum[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={btnSec}
          >
            <Text style={styles.optionNum}>
              {levels[currentQuestion].optionNum[1]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={btnThird}
          >
            <Text style={styles.optionNum}>
              {levels[currentQuestion].optionNum[2]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={btnFor}
          >
            <Text 
            style={styles.optionNum}
            >{levels[currentQuestion].optionNum[3]}</Text>
          </TouchableOpacity>
                    </View>
                )
            }
        </View>
      )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#222",
        maxWidth:"100%",
        maxHeight:"100%",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    nav:{
      position:"absolute",
      top:10,
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-between"
    },
    question:{
        fontSize:30,
        color:"#fff",
        padding:10,
        borderRadius:20,

        backgroundColor:"#555",

    },
    questionDiv:{
        flexDirection:"row",
        alignItems:"center"
    },
    optionsDiv:{
        flexDirection:"row",
        position:"absolute",
        top:"85%",
        

    },
    optionNum:{
        fontSize:40,
        margin:10,
        padding:10,
        color:"#fff"
    },
    
})




export default HomeScreen