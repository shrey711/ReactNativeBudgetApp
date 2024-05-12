import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import store from './redux/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import HomeScreen from './screens/HomeScreen';
import BudgetListingScreen from './screens/BudgetListingScreen'
import { PersistGate } from 'redux-persist/integration/react';
import {persistor,store} from './redux/store'

const Stack=createNativeStackNavigator();
  
export default function App() {
  
  return (
    <Provider store={store}>
   
     <PersistGate  persistor={persistor}>   
      <NavigationContainer>
    
        <StatusBar backgroundColor="white"/>
          
          <Stack.Navigator screenOptions={{
            headerStyle:{
              backgroundColor:"teal",
            },
            headerTintColor:"white",
            headerTitleAlign: "center",
          }}>
            <Stack.Screen name='Budget Entry' component={HomeScreen} />
            <Stack.Screen name='Budget List' component={BudgetListingScreen} />
          </Stack.Navigator>
        
        <Toast/>
    
      </NavigationContainer>
     </PersistGate>   
    </Provider> 
  
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
