import swal  from 'sweetalert';
import { TODO } from "./interface";
import updateTODO from "./PUT";

export const reducer = (state: any = [], action: any = {}) => {
    switch (action.type) {
        case 'add':            
            return [...state, action.payload]
            break;
        case 'delete':
            //-- Update TODO            
            return state.filter( (elem: TODO) => elem.uuid !== action.payload ) //-- Payload will bring only the todo id.
            break;
        case 'toggle':
            //-- Update TODO
            return state.map( (elem: TODO) => (elem.uuid === action.payload ? {...elem, done: !elem.done} : elem)); //-- Payload will bring the todo id.
            break;
        default:
            break;
    }
    return [];
}