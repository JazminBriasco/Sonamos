import { ReduxUserOwnerAction } from "../../Const/_const";

const initialState = {
    userOwners: [],
    loggedUser: {},
    error: null
}

const userOwnerReducer = (state = initialState, action) => {
    //console.log('Por despachar');
    //console.log('state ', state.loggedUser);
    //console.log('action ', action);
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
            console.log('state ', state);
            console.log('action ', action);
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
            return { 
            ...state, 
            error: action.error
        }
        
        default:
            return state;
    }
}

export default userOwnerReducer;