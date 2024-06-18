
import React, { useState } from 'react';
import Notification from './Notification';

const CarList = ({ cars }) => {
  const [notifications, setNotifications] = useState({});

  const showNotification = (carNumber, message) => {
    setNotifications({ ...notifications, [carNumber]: message });
    setTimeout(() => {
      setNotifications((prev) => {
        const updatedNotifications = { ...prev };
        delete updatedNotifications[carNumber];
        return updatedNotifications;
      });
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <div>
      {cars.map((car) => (
        <div key={car.CarNumber} className="car-item mb-3">
          <h5>{car.CarName} - {car.DriverName}</h5>
          <button
            className="btn btn-primary"
            onClick={() => showNotification(car.CarNumber, `${car.CarName} is selected. Drive safely!`)}
          >
            Show Notification
          </button>
          {notifications[car.CarNumber] && (
            <Notification message={notifications[car.CarNumber]} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CarList;