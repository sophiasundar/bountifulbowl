import axios from "axios";
import { API } from "../global.js";

export async function GetBanquetId(){
    try{
        const response = await axios.get(`${API}/crud/foodlist`);
        if(response.status === 200){
            return response.data._id;
        }else{
            throw new Error("Falied to fetch banquet detail's ID")
        }
    }catch (error){
        console.log("Error fetching banquet details ID", error)
    }
}