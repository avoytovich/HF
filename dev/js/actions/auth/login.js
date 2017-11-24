import { Api } from '../../utils';
import { domen, api } from '../../config/apiRoutes';

export const login = data => Api.post(`${domen.users}${api.login}`, data);