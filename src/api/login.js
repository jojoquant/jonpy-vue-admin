import axios from '../network/axiosPromiseWrap'

async function login(param){
    return  await axios.post(`/login`, param)
}

export default login
