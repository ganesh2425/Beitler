import jwt_decode from "jwt-decode";
import StorageService from "../services/Storage.service";

interface extV {
    "exp": number,
    "iss": string,
    "aud": string
}

export function checkTokenExpiration(): boolean  {
    const token = StorageService.getCookies('token');
    const extractValue: extV = jwt_decode(token);
    if (extractValue.exp < Date.now() / 1000) {
        StorageService.clearCookies();
        return false
    }
    return true;
}