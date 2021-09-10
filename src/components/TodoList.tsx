import React from 'react';
import swal  from 'sweetalert';
import { TODO } from '../lib/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import updateTODO from '../lib/PUT';

type componentProps = {
    todos: TODO[],
    dispatch: any
}

export const TodoList = ({todos, dispatch}: componentProps) => {    
    
    //-- Handle TODO toggle
    const handleToggle = (todo: TODO) => { 
         //-- dispatch action
        dispatch({type: 'toggle', payload: todo.uuid});       
        let _todo = todos.find( (elem:TODO) => elem.uuid === todo.uuid);
        if(_todo !== undefined){
            _todo.done = !_todo.done;            
            console.log(_todo);
            updateTODO(_todo).then( (data: any) => {                               
                swal('Se ha actualizado la tarea.', data.status, "success");
            } );
            
        }

    }

    //-- Handle TODO delete
    const handleDelete = (todo: TODO) => {
        
        let _todo = todos.find( (elem:TODO) => elem.uuid === todo.uuid);
                   
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminada la tarea, no se podra recuperar.",
            icon: "warning",            
            dangerMode: true
        }).then( (willDelete: boolean) => {
            if(willDelete){
                if(_todo !== undefined){
                    _todo.display = false;
                    updateTODO(_todo).then( (data: any) => {
                        swal("Se elimino la tarea.", '', "success");
                        //-- Dispatch action
                        dispatch({type: 'delete', payload: todo.uuid});
                    } );

                }
            }else{
                swal("La tarea no se removio!");
            }
        } );        
    }

    return (
        <ul className="plain-list">            
            {
                todos.map( (todo: TODO) => <li key={todo.uuid} className="item-row">
                        <p onClick={() => handleToggle(todo)} className={todo.done ? 'complete': ''}>{todo.description}</p>
                        <button onClick={() => handleDelete(todo)} className="btn-delete"><FontAwesomeIcon icon={faTrashAlt} /></button>
                        </li> )
            }                        
        </ul>
    )
}
