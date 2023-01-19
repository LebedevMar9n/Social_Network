import axios from "axios";

import { baseURL } from "../constants";

console.log(baseURL);
const API = axios.create({ baseURL: baseURL });


export { API };