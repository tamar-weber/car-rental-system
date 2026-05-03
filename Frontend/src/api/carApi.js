const API_URL = 'http://localhost:5000/api/cars';

export const getCars = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const addCar = async (carData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    });
    return response.json();
};