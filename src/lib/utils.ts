import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios,{AxiosInstance} from "axios"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const axiosClient:AxiosInstance = axios.create({
  baseURL:process.env.VITE_BACKEND,
  withCredentials:true,
})