import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { PagesConst } from './Const/_const';
import { COLORS } from './Const/_styles';
import React from 'react';
import Home from './Components/Home';
import OwnerRegister from './Components/Login/OwnerRegister';
import UserRegister from './Components/Login/UserRegister';
import Login from './Components/Login/Login';
import Rooms from './Screens/Rooms';
import RoomDetail from './Screens/RoomDetail';

const App = () => {
  const userName = store.getState().userOwnerReducer?.loggedUser?.name;
  
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  
  function OverviewScreen() {
    return (
      <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: COLORS.black,
      }}>
        <BottomTabs.Screen name={PagesConst.ROOMS} component={Rooms} />
        <Stack.Screen name={PagesConst.OWNERREGISTER} component={OwnerRegister} />
        <Stack.Screen name={PagesConst.USERREGISTER} component={UserRegister}/>
      </BottomTabs.Navigator>
    )
  }

  return (
    <>
    <Provider store={store}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen name={PagesConst.SONAMOS} component={OverviewScreen}/>
          <Stack.Screen name={PagesConst.OWNERREGISTER} component={OwnerRegister} />
          <Stack.Screen name={PagesConst.USERREGISTER} component={UserRegister}/>
          <Stack.Screen name={PagesConst.LOGIN} component={Login}/>
          <Stack.Screen name={PagesConst.ROOMS} component={Rooms}/>
          <Stack.Screen name={PagesConst.HOME} component={Home} />
          <Stack.Screen name={PagesConst.ROOMDETAIL} component={RoomDetail}/>

         </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
   );
}

export default App;