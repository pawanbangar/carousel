import axios from 'axios';
const BASE_URL="https://api.unsplash.com/search/photos?client_id=7dNPvfyoxgVAi83eQurZK05vSrfwROXA3p1jWQtFqws&query="

const SERVER_URL="http://localhost:5001/api/category"

export const fetchCategories=async()=>{
    const{data}=await axios.get(SERVER_URL,{});
    return data;
}

export const FetchPhotosByCategory=async ({name,items})=>{
    const{data:{results}} =await axios.get(BASE_URL+name+"&page=1&per_page="+items, {
    });
    return results.map((single)=>{
        return {id:single.id,urls:single.urls,rand_id:Math.floor(100000 + Math.random() * 900000)};
    });
}