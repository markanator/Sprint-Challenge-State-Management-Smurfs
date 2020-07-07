// import axios
import axios from 'axios';


// exports after imports
export const FETCH_DATA_START   = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAIL    = "FETCH_DATA_FAIL";
export const ADD_SMURF          = "ADD_SMURF";
export const ADD_SMURF_SUCCESS  = "ADD_SMURF_SUCCESS";

export const DELETE_SMURF       = "DELETE_SMURF";


export const getData = () => dispatch => {
    dispatch({type: FETCH_DATA_START});
    axios.get("http://localhost:3333/smurfs")
    .then((resp)=>{
        // console.table(resp.data);
        dispatch({type: FETCH_DATA_SUCCESS,payload: resp.data})
    })
    .catch((err)=>{
        // console.log(err)
        dispatch({type: FETCH_DATA_FAIL,payload: err});
    });

}

export const addSmurf = newSmurf =>dispatch=> {
    dispatch({type: ADD_SMURF, payload: newSmurf});
    axios.post("http://localhost:3333/smurfs",newSmurf)
    .then((resp)=>{
        // console.log(resp)
        dispatch({type: FETCH_DATA_START});
    })
    .catch((err)=>console.log(err));
}

export const deleteSmurf = smurfID =>  dispatch =>{
    dispatch({type: DELETE_SMURF, payload: smurfID});
    axios.delete(`http://localhost:3333/smurfs/${smurfID}`)
    .then((resp)=>{
        console.log(resp);
        dispatch({type: FETCH_DATA_SUCCESS,payload: resp.data})
    })
    .catch((err)=>console.log(err));
}