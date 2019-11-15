import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-7e088.firebaseio.com/',
});

export default instance;