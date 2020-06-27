import React, { useEffect } from "react";
// UI
import "./App.css";
import {Button} from 'reactstrap';
// hooks
import {useSelector,useDispatch} from 'react-redux';
// reducer
import {SmurfReducer} from '../reducers';
// acions as: actions.getData()
import * as actions from '../actions';


function App () {
  const dispatch = useDispatch(SmurfReducer)
  const Data = useSelector(state => state.data);



  // get data
  const fetchData = () => dispatch(actions.getData());

  const renderSmurfs = () =>{
    return Data.map((smurf)=>{
      return (
        <div key={smurf.id}>
          <p>Name: {smurf.name}</p>
          <p>Age: {smurf.age}</p>
          <p>Height: {smurf.height}</p>
        </div>
      )
    })
  }

  useEffect(()=>{
    fetchData()
  },[])

    return (
      <div className="App">
        {/* <Button onClick={()=>{
          console.log("user asked for data!")
          fetchData();
        }}>GET DATA</Button> */}

        {
        Data.length === 0 ? <p>loading...</p> : renderSmurfs()
        }
      </div>
    );
}

export default App;
