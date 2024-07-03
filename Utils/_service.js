import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const loadUser = async () => {
    try {
    const userData = await AsyncStorage.getItem('userLogged');
    if (userData !== null) {
        return userData;
    }
    } catch (error) {
    Alert.alert('Ups! Cierre sesión', '', [{ text: "Cancel", style: "cancel" }]);
    }
};

