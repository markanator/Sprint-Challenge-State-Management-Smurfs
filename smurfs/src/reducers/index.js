import {FETCH_DATA_START}   from '../actions';
import {FETCH_DATA_SUCCESS} from '../actions';
import {FETCH_DATA_FAIL}    from '../actions';
import {ADD_SMURF}          from '../actions';
import {ADD_SMURF_SUCCESS}  from '../actions';
import {DELETE_SMURF}       from '../actions';

// Reducers
const initialState = {
    mySmurf: {},
    isFetching: false,
    error: "",
    data: [],
}


export const SmurfReducer = (state = initialState, action ) => {
    switch(action.type){
        case FETCH_DATA_START:
            return {...state,
            isFetching: true,
            error: ""
        };
        case FETCH_DATA_SUCCESS:
            return {...state,
                data: action.payload,
                isFetching: false,
            }
        case FETCH_DATA_FAIL:
            return {...state,
                isFetching: false,
                error: action.payload,
            }
        case ADD_SMURF:
            return state;
            case ADD_SMURF_SUCCESS:
                return state;
            case DELETE_SMURF:
                return state;
            default:
            return state;
    }
}

export default SmurfReducer;