import { ReduxUserOwnerAction } from "../../Const/_const";

const initialState = {
    userOwners: [],
    loggedUser: undefined,
    error: null
}

const userOwnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ReduxUserOwnerAction.ADD_USEROWNER:
            return {
                ...state,
                userOwners: [...state.userOwners, action.payload],
                error:null
            }
        
        case ReduxUserOwnerAction.ADD_USEROWNER_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case ReduxUserOwnerAction.GET_USEROWNERS:
            return { 
                ...state, 
                userOwners: action.payload,
                error: null
            }

        case ReduxUserOwnerAction.GET_USEROWNERS_FAILURE:
        return {
            ...state,
            error: action.payload
        }

        case ReduxUserOwnerAction.SET_USER_LOGGED:
           // console.log('payload SET: ', action.payload);
            return { 
                ...state, 
                loggedUser: action.payload,
                error: null
            }
        
            case ReduxUserOwnerAction.SET_USER_LOGGED_FAILURE:
                return { 
                    ...state, 
                    error: action.error
            }

        case ReduxUserOwnerAction.GET_USER_LOGGED:
            return { 
                ...state, 
                loggedUser: action.payload,
                error: null
            }

        case ReduxUserOwnerAction.GET_USER_LOGGED_FAILURE:
            console.log('payload GET FAIL: ', action.payload);
            return { 
            ...state, 
            error: action.error
        }
        
        default:
            return state;
    }
}

export default userOwnerReducer;