import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "./axiosConfig";

export async function getData<T>(endpoint: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(`${endpoint}`);
    return response.data;
  } catch (error) {
   toast.error((error as any).message);
    throw error;
  }
}

export async function postData<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(`${endpoint}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(` ${error.response.data.message}`);
      } else if (error.request) {
        toast.error('Error: No response received from the server');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
    throw error;
  }
}

export async function deleteData<T>(endpoint: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error:', (error as any).message);
    throw error;
  }
}

export async function updateData<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.patch<T>(`${endpoint}`, data);
    return response?.data;
  } catch (error) {
    toast.error('Error:', (error as any).message);
    throw error;
  }
}
