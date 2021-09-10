import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'reactstrap';
import swal from 'sweetalert';
import postTODO from '../lib/POST';

type componentProps = {
    dispatch: any
}

export const TodoAdd = ({dispatch}: componentProps) => {

    //-- component state
    const [state, setstate] = useState<string>('');
    //-- Loading
    const [loading, setLoading] = useState<boolean>(false);
    //-- Success
    const [success, setSuccess] = useState<boolean>(false);

    //-- Handle form submit (enter key is pressed)
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        if(state !== ''){
            setLoading(true);
            const todo = {
                uuid: `${new Date().getTime()}`,
                description: state,
                done: false,
                display: true,
                createdAt: '',
                updatedAt: ''
            }
    
            setstate('');
            //-- Post todo
            postTODO(todo).then( (data: any) => {
                todo.uuid = data.uuid;
                //-- Dispatch an action //-- Add to dispatch
                dispatch({
                    type: 'add', 
                    payload: todo
                });
                setLoading(false);
                setSuccess(true);
                //-- Clear notification
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
                //swal(data.status, data.uuid, "success");
            } )
            .catch( (error: any) => {
                console.log(error);
                setLoading(false);
                swal("Algo salio mal.", "Es posible que uno de nuestros servicios no este disponible.", "error");
            } ); 
        }       
    }
    return (
        <>
            <div className="alert-container">
                {success && 
                    <Alert color="success">
                        Se ha agregado una tarea.
                </Alert>} 
            </div>
            <h1>Add new Task</h1>
            <div className="add-form">            
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="description"
                        onChange={(evt) => setstate(evt.target.value)}
                        value={state}
                    />
                    <button type="submit" className="btn-add"><span>+</span></button>
                </form>
            </div>
            <div>
                {loading && <FontAwesomeIcon icon={faCircleNotch} className="loader" />}     
            </div>
        </>

    )
}
