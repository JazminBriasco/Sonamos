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
          //  console.log('payload GET FAIL: ', action.payload);
            return { 
            ...state, 
            error: action.error
        }
        
        case ReduxUserOwnerAction.MODIFY_USER:
            //  console.log('payload MODYFY USER: ', action.payload);
            let id = action.payload;
            id = JSON.parse(id).id;
          //  console.log(id);
          // console.log(state.userOwners.find(user => user.id === id));
          
          //let item = state.userOwners.find(user => user.id === id); 
          //console.log('item', item);
          //if (item){ item = action.payload}
          
            //console.log('userOwner: ', state.userOwners[0]);
            //console.log('action.payload', action.payload);
            const index = state.userOwners.findIndex(user => user.id === id);
         //   console.log(index);
            if (index !== -1) {
            //  console.log('1', state.userOwners[index].rooms);
          //   console.log('2', JSON.parse(action.payload).rooms);
              state.userOwners[index].rooms = JSON.parse(action.payload).rooms;
            }
          
       //     console.log('state.userOwners', state.userOwners[0].rooms);      

            return { 
                 ...state, 
                 userOwners: state.userOwners,
                 error: null
             }
         
         case ReduxUserOwnerAction.MODIFY_USER_FAILURE:
             return { 
                 ...state, 
                 error: action.error
         }
        default:
            return state;
    }
}

export default userOwnerReducer;