import axios from './axios';
import Cookies from 'js-cookie';


// Function to fetch XSRF Token 
const fetchXsrfToken = async () =>{
    try{
        const response = await axios.get('/sanctum/csrf-cookies',{
            withCredentials: true,
        });

        console.log("XSRF Token Response", response);
    }catch(error){
        console.log("Error Fetching XSRF Token", error);
    }
}



// Add Resquest Interceptors 

axios.interceptors.request.use(
    async(config) => {

        await fetchXsrfToken();
        const xsrfToken = Cookies.get('XSRF-TOKEN');
        if(xsrfToken){
            config.headers['X-XSRF-TOKEN'] = xsrfToken;
        }


        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

// Add Response interceptors 

axios.interceptors.response.use(
    (response) =>{

        return response
    },
    (error)=>{

        return Promise.reject(error);
    }
);