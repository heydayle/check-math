import { useAxios as vueUseAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';

export const useCall = () => {
  // Create an Axios instance
  const defaultOptions = {}
  console.log(import.meta.env)
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    ...defaultOptions,
  });

  function get(url: string, config = {}): Promise<object> {
    return vueUseAxios(url, { method: 'GET', ...config }, axiosInstance);
  }

  function post(url: string, data = {}, config = {}): Promise<object> {
    return vueUseAxios(url, { method: 'POST', data, ...config }, axiosInstance);
  }

  function put(url: string, data = {}, config = {}) {
    return vueUseAxios(url, { method: 'PUT', data, ...config }, axiosInstance);
  }

  function del(url: string, config = {}) {
    return vueUseAxios(url, { method: 'DELETE', ...config }, axiosInstance);
  }

  return {
    get,
    post,
    put,
    del,
    instance: axiosInstance, // Expose the Axios instance for flexibility
  };
}
