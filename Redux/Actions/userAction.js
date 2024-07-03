import { User } from "../../Class/User";
import { ReduxUserOwnerAction } from "../../Const/_const";
import { addUserHTTP, getUserHTTP } from "../../http/httpOwnerUser";

export const UserActions = {
    addUser,
    getAllUsers,
    addLoggedUser,
    getLoggedUser
}

function addUser( user ) {
    const newUser = new User(user.id, user.name, user.contactNumber, user.password, user.mail, user.isAdmin, [] );
    return(dispatch) => {
        return addUserHTTP(newUser).then(res => {
            dispatch({type: ReduxUserOwnerAction.ADD_USEROWNER, payload: res.config.data})
        })
        .catch(error => {
            dispatch({ type: ReduxUserOwnerAction.ADD_USEROWNER_FAILURE, payload: error });
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
  //  console.log('Seteando en el action: ',userToSign);
    try{
        return await AsyncStorage.setItem('userLogged', JSON.stringify(userToSign));

    }catch(error){
        console.log('error', error);
    }
};

function addLoggedUser( user ) {
    //console.log('Por setear en el action: ',user);
    return (dispatch) => {
        return setUser(user).then(res => {
            dispatch({ type: ReduxUserOwnerAction.SET_USER_LOGGED, payload: user})
        })
        .catch(error => {
            dispatch({type: ReduxUserOwnerAction.SET_USER_LOGGED_FAILURE, payload: error})
        })
    }
}