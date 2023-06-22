import { axiosInstance } from "../service/http/axios.service";

const fetcher = (url) => axiosInstance.get(url).then(resp => resp?.data)

export default fetcher