
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarInformation.css'; // Make sure to create this CSS file

function CarInformation({ CarNo }) {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`/cars/${CarNo}`);
        setCarData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [CarNo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="car-info-box">
      <h2>{carData.carName}</h2>
      <p><strong>Driver:</strong> {carData.driverName}</p>
      <p><strong>Design:</strong> {carData.design}</p>
    </div>
  );
}

export default CarInformation;