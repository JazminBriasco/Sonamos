import { ReduxUserOwnerAction } from "../../Const/_const";

const initialState = {
    userOwners: [],
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
            
        default:
            return state;
    }
}

export default userOwnerReducer;