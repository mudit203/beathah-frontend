import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  let adminInfo: any;
  if (Cookies.get("adminInfo")) {
    adminInfo = JSON.parse(Cookies.get("adminInfo") as string);
  }

  let company: any;
  if (Cookies.get("company")) {
    company = Cookies.get("company");
  }

  // Modify headers without overwriting the entire headers object
  if (adminInfo?.token) {
    config.headers.authorization = `Bearer ${adminInfo.token}`;
  }

  if (company) {
    config.headers.company = company;
  }

  return config; // Return the modified config
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, config?: AxiosRequestConfig): Promise<any> =>
    instance.get(url, config).then(responseBody),

  post: (url: string, body?: any, config?: AxiosRequestConfig): Promise<any> =>
    instance.post(url, body, config).then(responseBody),

  put: (url: string, body?: any, config?: AxiosRequestConfig): Promise<any> =>
    instance.put(url, body, config).then(responseBody),

  patch: (url: string, body?: any, config?: AxiosRequestConfig): Promise<any> =>
    instance.patch(url, body, config).then(responseBody),

  delete: (url: string, config?: AxiosRequestConfig): Promise<any> =>
    instance.delete(url, config).then(responseBody),
};

export default requests;