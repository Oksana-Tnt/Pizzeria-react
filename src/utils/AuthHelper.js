import apiConfig from "../config/apiConfig.js";
import axios from "axios";

let options = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccessToken()}`
        }        
    }

export async function pushToDb(route, body, hasToken = false) {
    if (!hasToken && !isUserLoggedIn()) {
        options = {};
    }
        return (await axios.post(`${apiConfig.baseUrl}/${route}`, body, options)).data;
 }

export async function fetchFromDb(route, hasToken = false) {
    if (!hasToken && !isUserLoggedIn()) {
        options = {};
    }
    return (await axios.get(`${apiConfig.baseUrl}/${route}`, options)).data;
}    
    

export async function deleteFromDb(route, id) {
        return (await axios.delete(`${apiConfig.baseUrl}/${route}/${id}`, options)).data
}

export function getAccessToken(){
    const accessDataString = localStorage.getItem('access_data');
    if(!accessDataString) return null;

    const accessData = JSON.parse(accessDataString);

    return accessData.access_token
}

export function getUser(){
    const accessDataString = localStorage.getItem('access_data');
    if(!accessDataString) return null;

    const accessData = JSON.parse(accessDataString);

    return accessData.user
}

export function isUserLoggedIn(){
    return getUser() ? true : false;
}
export function logout() {
   
    localStorage.removeItem('access_data');
}