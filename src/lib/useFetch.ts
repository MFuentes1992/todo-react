import { useEffect, useState } from "react";
import {URL} from './constants';
import { TODO } from "./interface";

//-- Fetching data from server.
const fetchData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

const useFetch = () => {
    //-- State
    const [todos, setTodos] = useState<TODO[]>([]);
    //-- Loading
    const [loading, setLoading] = useState<boolean>(true);
    //-- Error
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetchData().then((data: any) => {  
            setLoading(false);          
            setTodos(data);            
        }).catch( (err: any) => {  
            setLoading(true); 
            setError(true);          
            console.log(`Connection refused.`)
        } );
    }, []);
    return [todos, setTodos, loading, error];
}

export default useFetch;
