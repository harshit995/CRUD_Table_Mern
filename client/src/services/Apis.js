import { commonrequest } from "../services/ApiCall"
import { BASE_URL } from "../services/helper"

export const registerfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/register`, data, header);
}
