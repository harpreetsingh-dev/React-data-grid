import { ACTION_TYPES } from "../actions/emp";
const initialState = {
    list: [],
    DepList:[]
}


export const emp = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.FETCH_DEP:
            return {
                ...state,
                DepList: action.payload
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.Id !== action.payload)
                //list: [...action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.Id === action.payload.Id ? action.payload : x)
                //list: [...action.payload]
            }

        default:
            return state
    }
}