// importing axios
import axios from "axios";

// Initializing axios
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export default instance;