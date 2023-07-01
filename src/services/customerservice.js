import axios from 'axios';
import { url } from '../config'

const baseUrl = url;


const customerService = {
  getcustomers: async () => {
    // console.log('getting customer')
    try {

      const response = await axios.get(`${baseUrl}/cust/get`);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.error);
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  },

  getcustomersById: async (custid) => {
    // console.log('getting customer by id')
    const response = await axios.get(`${baseUrl}/cust/get/${custid}`);
    return response.data;
  },

  createcustomer: async (data) => {
    // console.log('customer created')
    try {

      const response = await axios.post(`${baseUrl}/cust/create`, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong");
      }
    }
  },

  updatecustomer: async (data, custId,) => {
    // console.log('customer updated')
    try {

      const response = await axios.put(`${baseUrl}/cust/update/${custId}`, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong");
      }
    }
  },
  deletecustomer: async (custId) => {
    // console.log('customer deleted')
    try {
      const response = await axios.delete(`${baseUrl}/cust/delete/${custId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong");
      }
    }
  },
};
export default customerService;
