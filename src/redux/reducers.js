import { Action } from './actions'


const initialState = {
    movies: [],
    wishlist: [],
    users: []
}


export default function(state = initialState, action){

    switch(action.type){

        case Action.GET_MOVIES: 
            return {
                ...state,
                movies: action.payload
            }
        case Action.ADD_TO_WISHLIST: 
            return {
                ...state,
                wishlist:[...state.wishlist, action.payload]
            }
        case Action.REMOVE_FROM_WISHLIST: 
            return {
                ...state,
                wishlist: state.wishlist.filter((movie) => movie._id !== action.payload._id)
            }
        default:
            return state
    }


}

