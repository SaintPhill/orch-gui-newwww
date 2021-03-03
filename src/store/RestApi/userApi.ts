import axios, { AxiosPromise } from 'axios';
import { Authorization, UserInformation } from '../types/userLoginTypes';
import { API } from './filtersOptionsAPI';

export const userApi = {
    authentication: (userName: string, password: string): AxiosPromise<Authorization> => axios({
        method: 'post',
        url: `${API.BASE_URL}/security/oauth/token?username=${userName}&password=${password}&grant_type=password&tenant_id=1`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
            'tenant': 1,
        },
    }),
    authenticationByToken: (token: string): AxiosPromise<UserInformation> => axios({
        method: 'post',
        url: `${API.BASE_URL}/security/oauth/check_token?token=${token}`,
        headers: {
            'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
        },
    }),
};


