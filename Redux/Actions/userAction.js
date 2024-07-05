import { User } from "../../Class/User";
import { ReduxUserOwnerAction } from "../../Const/_const";
import { addUserHTTP, getUserHTTP, modifyUserHTTP } from "../../http/httpOwnerUser";
import  AsyncStorage from '@react-native-async-storage/async-storage';

export const UserActions = {
    addUser,
    getAllUsers,
    addLoggedUser,
    getLoggedUser,
    modifyUser,
}

function addUser( user ) {
    const newUser = new User(user.id, user.name, user.contactNumber, user.password, user.mail, user.isAdmin, user.rooms );
    return(dispatch) => {
        return addUserHTTP(newUser).then(res => {
            dispatch({type: ReduxUserOwnerAction.ADD_USEROWNER, payload: res.config.data})
        })
        .catch(error => {
            dispatch({ type: ReduxUserOwnerAction.ADD_USEROWNER_FAILURE, payload: error });
        });
        
    }
}

function modifyUser (user) {
   // console.log('userAction', user);
    return(dispatch) => {
        return modifyUserHTTP(user).then(res => {
       //     console.log('res', res.config.data);
            dispatch({type: ReduxUserOwnerAction.MODIFY_USER, payload: res.config.data})
        })
        .catch(error => {
            dispatch({ type: ReduxUserOwnerAction.MODIFY_USER_FAILURE, payload: error });
        });
    }
}

function getAllUsers() {
    return (dispatch) => {
        return getUserHTTP().then(res => {
            dispatch({ type: ReduxUserOwnerAction.GET_USEROWNERS, payload: res})
        })
        .catch(error => {
            dispatch({type: ReduxUserOwnerAction.GET_USEROWNERS_FAILURE, payload: error})
        })
    }
}

const loadUser = async () => {
    return await AsyncStorage.getItem('userLogged');
};

function getLoggedUser() {
    return (dispatch) => {
        return loadUser().then(res => {
            dispatch({ type: ReduxUserOwnerAction.GET_USER_LOGGED, payload: res})
        })
        .catch(error => {
            dispatch({type: ReduxUserOwnerAction.GET_USER_LOGGED_FAILURE, payload: error})
        })
    }   
}

const setUser = async (userToSign) => {
    try{
        if(userToSign !== undefined) return await AsyncStorage.setItem('userLogged', JSON.stringify(userToSign));
    }catch(error){
        console.log('error', error);
    }
};

function addLoggedUser( user ) {
    console.log(user);
    return (dispatch) => {
        return setUser(user).then(res => {
            dispatch({ type: ReduxUserOwnerAction.SET_USER_LOGGED, payload: user})
        })
        .catch(error => {
            dispatch({type: ReduxUserOwnerAction.SET_USER_LOGGED_FAILURE, payload: error})
        })
    }
}