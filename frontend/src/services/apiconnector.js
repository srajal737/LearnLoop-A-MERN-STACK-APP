import axios from "axios"
//   const response = await axios.get(showcategoryurl);-->>normal
const apiconnector = (method ,url,databody,headers,params)=>{
    return axios({
        method:`${method}`,
        url:`${url}`,
        data:databody? databody:null,
        headers:headers?headers:null,
        params:params?params:null
    })
}

export default apiconnector;