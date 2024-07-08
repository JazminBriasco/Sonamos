import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, connect } from 'react-redux';
import { store } from './Redux/store';
import { PagesConst } from './Const/_const';
import { COLORS } from './Const/_styles';
import React, { useState } from 'react';
import Home from './Components/Home';
import OwnerRegister from './Components/Login/OwnerRegister';
import UserRegister from './Components/Login/UserRegister';
import Login from './Components/Login/Login';
import Rooms from './Screens/Rooms';
import RoomDetail from './Screens/RoomDetail';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Screens/Profile';
import { UserActions } from './Redux/Actions/userAction';
import AddRoom from './Screens/AddRoom';

const App = () => {


  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  
//  console.log(store.getState());
  
  function OverviewScreen() {
    return (
      <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.red,
        tabBarStyle: {
          backgroundColor: COLORS.black,
        },
      }}
      >
   <BottomTabs.Screen name={PagesConst.ROOMS} component={Rooms}        
          options={{
            headerShown: false,
            headerTitleStyle: { color: 'white', fontSize: 15,},
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="greenhouse" color={color} size={size} />
              ),
          }}
        />
        <BottomTabs.Screen name={PagesConst.PROFILE} component={Profile} 
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: COLORS.red, height:24 },
          headerTitleStyle: { color: 'white', fontSize: 15,},
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="guitar-pick" color={color} size={size} />
            ),
        }}/>
      </BottomTabs.Navigator>
    )
  }

  return (
    <>
    <Provider store={store}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen name={PagesConst.SONAMOS} component={OverviewScreen} 
          options={{
                title: '♪ SONAMOS ♪',
                headerStyle: { backgroundColor: 'black' },
                headerTitleStyle: { color: 'white' },
                headerTitleAlign: 'center'
              }} />
          <Stack.Screen name={PagesConst.HOME} component={Home} options={{headerShown: false}} />
          <Stack.Screen name={PagesConst.OWNERREGISTER} component={OwnerRegister} />
          <Stack.Screen name={PagesConst.USERREGISTER} component={UserRegister}/>
          <Stack.Screen name={PagesConst.LOGIN} component={Login}/>
          <Stack.Screen name={PagesConst.ROOMS} component={Rooms}/>
          <Stack.Screen name={PagesConst.ADDROOM} component={AddRoom}/>
          
          <Stack.Screen name={PagesConst.ROOMDETAIL} component={RoomDetail}  options={{
                title: '♪ SONAMOS ♪',
                headerStyle: { backgroundColor: 'black' },
                headerTitleStyle: { color: 'white' },
                headerTitleAlign: 'center'
              }}/>
         </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
   );
}

    
  
  export default App;
    