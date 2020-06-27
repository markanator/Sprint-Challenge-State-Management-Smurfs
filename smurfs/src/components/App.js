import React, {useEffect, useState} from "react";
// UI
import "./App.css";
import {Button, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
// hooks
import {useSelector, useDispatch} from 'react-redux';
// reducer
import {SmurfReducer} from '../reducers';
// acions as: actions.getData()
import * as actions from '../actions';

function App() {
    const dispatch = useDispatch(SmurfReducer)
    const Data = useSelector(state => state.data);

    const [dis,setDis] = useState(false);

    // get data
    const fetchData = () => dispatch(actions.getData());

    const [formData,setFormData] = useState({name: "", age: 0, height: "",id:Date.now()})

    const handleChange = e => {
        setFormData({...formData,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name, e.target.value)
    }

    const renderSmurfs = () => {
        return Data.map((smurf) => {
            return (
                <div key={smurf.id}>
                    <p>Name: {smurf.name}</p>
                    <p>Age: {smurf.age}</p>
                    <p>Height: {smurf.height}</p>
                </div>
            )
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App">
            <Form onSubmit={(e) => {
                e.preventDefault();
                console.log("submitted form!");
                dispatch(actions.addSmurf(formData));
                setDis(true);
                setTimeout(()=>{
                  fetchData();
                  setDis(false);
                },1000)
            }}>
              <FormText>INPUT NEW SMURF</FormText>
                <FormGroup>
                    <Label>Name:
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}/>
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>Age:
                        <Input
                            type='number'
                            name='age'
                            value={formData.age}
                            onChange={handleChange}/>
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>Height:
                        <Input
                            type='text'
                            name='height'
                            placeholder='3cm'
                            value={formData.height}
                            onChange={handleChange}/>
                    </Label>
                </FormGroup>

                <Button type='submit' color='primary' disabled={dis}>Submit</Button>

            </Form>

            {Data.length === 0
                ? <p>loading...</p>
                : renderSmurfs()
}
        </div>
    );
}

export default App;
