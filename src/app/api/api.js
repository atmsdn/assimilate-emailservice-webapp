import axios from 'axios';
import { AUTH_API_URL } from '../utils/environment';


const addOrganization = (requestBody) => {
    const url = `${AUTH_API_URL}createOrganization`;
    return axios.post(url, requestBody);
}
const getOrganizationDetails = () => {
    const url = `${AUTH_API_URL}getOrganizations`;
    return axios.get(url);
}
const deleteOrganization = (id) => {
    const url = `${AUTH_API_URL}Organization/${id}`;
    return axios.delete(url);
}
const getOrganizationDetailsById = (id) => {
    const url = `${AUTH_API_URL}getOrganizationById`;
    return axios.post(url, id);
}
const updateOrganizationDetails = (payload) => {
    const url = `${AUTH_API_URL}updateOrganization`;
    return axios.put(url, payload);
}
export default {
    addOrganization,getOrganizationDetails,deleteOrganization,getOrganizationDetailsById,updateOrganizationDetails
}



