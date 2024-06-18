import React, { useEffect, useState } from 'react';
import { getAllCars } from '../services/carService';
import './CarList.css'; // Import the CSS file

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCars().then(response => {
      setCars(response.data);
    }).catch(error => {
      setError("There was an error fetching the car details!");
      console.error(error);
    });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container ">
      <div className="car-table">
        <h2>Cars Table</h2>
        <table>
          <thead>
            <tr>
              <th>Car No</th>
              <th>Car Name</th>
              <th>Driver Name</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.carNo}>
                <td>{car.carNo}</td>
                <td>{car.carName}</td>
                <td>{car.driverName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarList;
