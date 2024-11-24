// Importing the apiRequest function
import { apiRequest } from './api';
import { Kitchen } from '../types/kitchen';

type ApiResponse<T = any> = Promise<T>;


export const getNearestKitchens = async (address: string, count: number): ApiResponse<Kitchen[]> => {
  const url = `/api/kitchens/nearest?address=${encodeURIComponent(address)}&count=${count}`;
  return apiRequest(url);
};


export const getTopRatedKitchens = async (count: number): ApiResponse<Kitchen[]> => {
  const url = `/api/kitchens/top-rated?count=${count}`;
  return apiRequest(url);
};


export const getKitchenDetails = async (kitchenId: number): ApiResponse<Kitchen> => {
  const url = `/api/kitchens/details?kitchen_id=${kitchenId}`;
  return apiRequest(url);
};


export const getPredictedWaitTimes = async (kitchenId: number): ApiResponse<{ predictedWaitTime: number }> => {
  const url = `/api/kitchens/wait-times?kitchen_id=${kitchenId}`;
  return apiRequest(url);
};


export const submitRating = async (kitchenId: number, userId: number, rating: number): ApiResponse<any> => {
  const url = '/api/kitchens/rate';
  const body = JSON.stringify({ kitchen_id: kitchenId, user_id: userId, rating });

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  return apiRequest(url, options);
};


export const userLogin = async (username: string, password: string): ApiResponse<{ token: string; user: any }> => {
  const url = '/api/users/login';
  const body = JSON.stringify({ username, password });

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  return apiRequest(url, options);
};

// Function to update kitchen info
export const updateKitchenInfo = async (kitchenId: number, newDetails: Partial<Kitchen>): ApiResponse<any> => {
  const url = '/api/kitchens/update';
  const body = JSON.stringify({ kitchen_id: kitchenId, new_details: newDetails });

  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Add authorization header if needed (e.g., Bearer token)
    },
    body,
  };

  return apiRequest(url, options);
};

// Function to add a new kitchen
export const addKitchen = async (newKitchenDetails: Omit<Kitchen, 'kitchenId'>): ApiResponse<any> => {
  const url = '/api/kitchens/add';
  const body = JSON.stringify({ new_kitchen_details: newKitchenDetails });

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add authorization header if needed (e.g., Bearer token)
    },
    body,
  };

  return apiRequest(url, options);
};
