import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { PagesConst } from './Const/_const';
import Home from './Components/Home';
import OwnerRegister from './Components/Login/OwnerRegister';
import UserRegister from './Components/Login/UserRegister';
import Login from './Components/Login/Login';
import Rooms from './Screens/Rooms';
import { useEffect } from 'react';

const App = () => {
  const Stack = createNativeStackNavigator();

  const userName = store.getState().userOwnerReducer?.loggedUser?.name

  return (
    <>
    <Provider store={store}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator> 
        <Stack.Screen name={PagesConst.HOME} component={Home}
          options={{
            headerStyle: { backgroundColor: 'black'},
            headerTitleStyle: { color: 'white' },
            title: userName ? 'Hola '+{userName} + '!' : 'SONAMOS'
          }} />
          <Stack.Screen name={PagesConst.OWNERREGISTER} component={OwnerRegister} 
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTitleStyle: { color: 'white' }
            }}/>
          <Stack.Screen name={PagesConst.USERREGISTER} component={UserRegister}
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTitleStyle: { color: 'white' }
            }}/>
          <Stack.Screen name={PagesConst.LOGIN} component={Login}
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTitleStyle: { color: 'white' }
            }}/>
            <Stack.Screen name={PagesConst.ROOMS} component={Rooms}
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTitleStyle: { color: 'white' }
            }}/>
         </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
   );
}

export default App;