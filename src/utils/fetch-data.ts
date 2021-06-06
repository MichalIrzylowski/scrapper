import axios, { AxiosRequestConfig } from 'axios';

interface FetchData {
  url: string;
  config?: AxiosRequestConfig;
}

export const fetchData = async ({ url, config }: FetchData) => {
  try {
    return await axios(url, config);
  } catch (error) {
    return error;
  }
};
