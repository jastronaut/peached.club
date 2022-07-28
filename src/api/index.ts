import api from './api';
export default api;

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then(res => res.json());
