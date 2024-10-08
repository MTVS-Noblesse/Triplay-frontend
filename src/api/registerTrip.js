import { PostAxiosInstance } from "../axios/AxiosMethod";

export const registerTrip = async (data) => {
    const url = "https://localhost:8443/trip";
    const res = await PostAxiosInstance(url, data);
    return res;
}