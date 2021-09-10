import { URL_POST } from './constants';
import { TODO } from './interface';

const postTODO = async(todo: TODO) => {
    const response = await fetch(URL_POST, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        } 
    });
    const json = await response.json();
    return json;
}

export default postTODO;