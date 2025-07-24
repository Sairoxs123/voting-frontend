import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const API_BASE_URL: string = "http://localhost:8080";

const sendRequest = async (method: string, url: string, data: FormData | undefined) => {
  const headers: { [key: string]: string } = {"Content-Type": "application/json"};
  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const config: AxiosRequestConfig<any> & { method: string; url: string; headers: { [key: string]: string }; data?: FormData } = {
    method,
    url: API_BASE_URL + url,
    headers,
  };

  if (method === "post") {
    config.data = data;
  }

  try {
    const response : AxiosResponse = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

};

export default sendRequest;
