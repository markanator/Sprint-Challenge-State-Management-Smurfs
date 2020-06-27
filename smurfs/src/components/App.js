import React, {useEffect, useState} from "react";
// UI
import "./App.css";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    FormText,
    Card,
    CardText,
    CardGroup,
    CardHeader,
    CardBody
} from 'reactstrap';
// hooks
import {useSelector, useDispatch} from 'react-redux';
// reducer
import {SmurfReducer} from '../reducers';
// acions as: actions.getData()
import * as actions from '../actions';

function App() {
    const dispatch = useDispatch(SmurfReducer)
    const Data = useSelector(state => state.data);

    const [dis,
        setDis] = useState(false);

    // get data
    const fetchData = () => dispatch(actions.getData());

    const [formData,
        setFormData] = useState({
        name: "",
        age: 0,
        height: "",
        id: Date.now()
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name, e.target.value)
    }

    const renderSmurfs = () => {
        return Data.map((smurf) => {
            return (
                <Card key={smurf.id} className='smurf-item'>
                    <CardGroup>
                        <CardText>Name: {smurf.name}</CardText>
                    </CardGroup>

                    <CardGroup>
                        <CardText>Age: {smurf.age}</CardText>
                    </CardGroup>

                    <CardGroup>
                        <CardText>Height: {smurf.height}</CardText>
                    </CardGroup>
                </Card>
            )
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App">
            <Card className='form-container'>
                <CardHeader>Enter New Smurf:</CardHeader>
                <CardBody>

                    {/* <h2>Enter New Smurf:</h2> */}
                    <Form
                        onSubmit={(e) => {
                        e.preventDefault();
                        console.log("submitted form!");
                        dispatch(actions.addSmurf(formData));
                        setDis(true);
                        setTimeout(() => {
                            fetchData();
                            setDis(false);
                        }, 1000)
                    }}>
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
                                <Input type='number' name='age' value={formData.age} onChange={handleChange}/>
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
                </CardBody>
            </Card>
            <h3>Current Smurfs:</h3><br/>
            <div className='smurf-container'>

                {
                  Data.length === 0
                    ? <p>loading...</p>
                    : renderSmurfs()
                }
            </div>

        </div>
    );
}

export default App;
