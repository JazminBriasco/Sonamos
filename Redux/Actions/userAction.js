import { User } from "../../Class/User";
import { ReduxUserOwnerAction } from "../../Const/_const";
import { addUserHTTP, getUserHTTP } from "../../http/httpOwnerUser";

export const UserActions = {
    addUser,
    getAllUsers
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