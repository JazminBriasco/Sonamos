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

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
    <Provider store={store}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator> 
        <Stack.Screen name={PagesConst.HOME} component={Home}
          options={{
            headerStyle: { backgroundColor: 'black'},
            headerTitleStyle: { color: 'white' }
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
         </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
   );
}

export default App;