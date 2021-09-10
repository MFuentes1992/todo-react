import { URL_PUT } from "./constants";
import { TODO } from "./interface";

const updateTODO = async (todo: TODO) => {
    const response = await fetch(URL_PUT, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    return json;
}

export default updateTODO;