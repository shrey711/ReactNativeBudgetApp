import { View,Text,StyleSheet,TextInput ,Image,Button, Pressable} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import {format,subMonths,addMonths, parse} from 'date-fns'
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import { saveBudget } from "../redux/actions/budgetAction";
import store from "../redux/store";
const image=require('../assets/budget2.jpg')

const HomeScreen = () => { 
    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate);
    const [itemName,setItemName]=useState("");
    const [plannedAmount,setPlannedAmount]=useState("");
    const [actualAmount,setActualAmount]=useState("");
    const [errors,setErrors]=useState({});
    const dispatch=useDispatch();
    const navigation=useNavigation();
  
    const handleLeft = () => {
        const newMonth = subMonths(month, 1);
        setMonth(newMonth);
    }

    const handleRight = () => {
        const newMonth = addMonths(month, 1);
        setMonth(newMonth);
    }

    const validateForm=()=>{
        const errors={}
        if(!itemName) errors.itemName="Item name is required"
        if(!plannedAmount) errors.plannedAmount="Planned amount is required"
        else if(parseFloat(plannedAmount)<0) errors.plannedAmount="Amount can't be negative"
        if(!actualAmount) errors.actualAmount="Actual amount is required"
        else if(parseFloat(actualAmount)<0) errors.actualAmount="Amount can't be negative"
        setErrors(errors);
        return Object.keys(errors).length===0 
    }
    const handleSave=()=>{

        if(validateForm()){
            const budget={
                month:format(month,'MMMM'),
                itemName,
                actualAmount,
                plannedAmount
            }
            dispatch(saveBudget(budget))
            
            setItemName("");
            setActualAmount("");
            setPlannedAmount("");
            setErrors({})
    
            Toast.show({
                type: 'success',
                text1: 'Budget Created',
                text2: 'Budget Buddy',
                position:"top",
                visibilityTime:2500,
                topOffset:100
              });
        }

        
    }

    const handleNavigation=()=>{
        navigation.navigate('Budget List')
    }

    
  return (
    < >
    <View style={styles.monthContainer}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={handleLeft} />
        <Text style={styles.monthName}>{format(month, 'MMMM')}</Text>
        <AntDesign name="arrowright" size={24} color="black" onPress={handleRight} />
    </View>
    
    <View style={styles.container}>
    
        <View style={styles.form}>
        
            {/* <Image style={styles.image} source={image} />  */}
            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:40,color:"teal",marginBottom:50}}>Budget Buddy</Text>
            <Text style={styles.label} >Item Name</Text>
            <TextInput style={styles.input} placeholder="Shopping" value={itemName} onChangeText={setItemName}/>
            {
                errors.itemName?<Text style={{color:"red"}}>{errors.itemName}</Text> :null
            }
            <Text style={styles.label}>Planned Amount</Text>
            <TextInput style={styles.input} placeholder="1000 rs" keyboardType="numeric" value={plannedAmount} onChangeText={setPlannedAmount}/>
            {
                errors.plannedAmount?<Text style={{color:"red"}}>{errors.plannedAmount}</Text> :null
            }
            <Text style={styles.label} >Actual Amount</Text>
            <TextInput style={styles.input} placeholder="100 rs" keyboardType="numeric" value={actualAmount} onChangeText={setActualAmount}/>
            {
                errors.actualAmount?<Text style={{color:"red"}}>{errors.actualAmount}</Text> :null
            }
            <Button title='Save Budget' color="teal" onPress={handleSave} /> 
            <View style={{ height:10  }} ></View>
            <Button title='View Budget' color="#0066cc" onPress={handleNavigation}/> 
            
            
        </View>
       
            
        
    </View>
    </>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"white",
        
    },
    form:{
        backgroundColor:"white",
        padding:20,
        marginHorizontal:20,
        borderWidth:1,
        borderColor:"black",
        borderRadius:10,
        shadowOffset:{
        width:0,
        height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5 
    },
    label:{
        fontSize:16,
        marginBottom:5,
        fontWeight:'bold'
    },
    input:{
        borderColor:'black',
        borderWidth:1,
        borderRadius:10,
        height:35,
        padding:10,
        marginBottom:10
    },
    image:{
        width:'100%',
        height:100,
        marginBottom: 10
    },
    monthContainer:{
        backgroundColor:"white",
        margin:10,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10,
    },
    monthName:{
        fontSize:24,
        fontWeight:"bold",
        color:"teal"
    },
    

})

export default HomeScreen
