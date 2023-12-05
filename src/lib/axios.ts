import axios from 'axios';
import addOAuthInterceptor, { OAuthInterceptorConfig } from 'axios-oauth-1.0a';

const axiosInstance = axios.create({
    baseURL: process.env.FLUIG_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const option: OAuthInterceptorConfig = {
    algorithm: 'HMAC-SHA1',
    key: String(process.env.CONSUMER_KEY),
    secret: process.env.CONSUMER_SECRET as string,
    token: process.env.ACCESS_TOKEN,
    tokenSecret: process.env.TOKEN_SECRET
}

addOAuthInterceptor(axiosInstance, option);

export default axiosInstance;