import { commonrequest } from "../services/ApiCall"
import { BASE_URL } from "../services/helper"

export const registerfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/register`, data, header);
}

export const usergetfunc = async (search, gender) => {
    return await commonrequest("GET", `${BASE_URL}/user/details?search=${search}&gender=${gender}`, "");
}

export const singleuserget = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/user/${id}`, "");
}

export const editfunc = async (id, data, header) => {
    return await commonrequest("PUT", `${BASE_URL}/user/edit/${id}`, data, header);
}

export const deletefunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
}
