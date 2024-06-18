import axios from 'axios';

const API_URL = 'http://localhost:8080/car';

export const getAllCars = () => {
  return axios.get(`${API_URL}/getAllCars`);
};

export const getCarsByIds = (carNos) => {
  return axios.get(`${API_URL}/getCarsByIds`, {
    params: { carNos }
  });
};