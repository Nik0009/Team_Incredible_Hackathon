
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Notification from './components/Notification';
// import Footer from './components/Footer';
// import Card from './components/Card'; // Assuming you have a Card component
// import CarInformation from './components/CarInformation'; // Import the CarInformation component
// import mapImage from './components/assets/map.jpg'; // Import your map image
// import './App.css';
// import './carInformation.css';

// const App = () => {
//   const [notification, setNotification] = useState({
//     visible: false,
//     message: ''
//   });
//   const [headerNotification, setHeaderNotification] = useState({
//     visible: false,
//     message: ''
//   });
//   const [numbers, setNumbers] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [allCars, setAllCars] = useState([]);
//   const [blinkingCars, setBlinkingCars] = useState([]);

//   useEffect(() => {
//     initializeCards();
//     fetchAllCars();
//   }, []);

//   const initializeCards = () => {
//     const initialCards = Array.from({ length: 12 }, (_, index) => ({
//       id: index + 1,
//       number: null,
//       label: `C${index + 1}`
//     }));
//     setCards(initialCards);
//   };

//   const fetchRandomNumber = async () => {
//     const randomNumber = Math.floor(Math.random() * 300) + 10;
//     return randomNumber;
//   };

//   const updateCards = (newNumbers) => {
//     const updatedCards = cards.map((card, index) => ({
//       ...card,
//       number: newNumbers[index]
//     }));
//     setCards(updatedCards);
//     // checkForBlinkingCards(updatedCards);
//   };
  
//   const handleGenerateNumbers = async () => {
//     let newNumbers = [];
//     for (let i = 0; i < 12; i++) {
//       const number = await fetchRandomNumber();
//       newNumbers.push(number);
//     }
//     setNumbers(newNumbers);
//     updateCards(newNumbers);
//   };

//   const fetchAllCars = async () => {
//     try {
//       console.log(numbers)
//       const response = await axios.post('http://localhost:8080/car/carNo',
//       numbers,{
//       headers: {
//         'Content-Type': 'application/json'
//       }}
//       );
//       setAllCars(response.data); // Assuming response.data is an array of car objects
//       console.log(response.data)
//       filterBlinkingCars(response.data);
//     } catch (error) {
//       console.error('Error fetching all cars:', error);
//     }
//   };

//   const filterBlinkingCars = (cars) => {
//     const blinkingCars = cars.filter(car => car.isBlinking); // Adjust the condition based on your API response structure
//     setBlinkingCars(blinkingCars);
//     if (blinkingCars.length > 0) {
//       setHeaderNotification({
//         visible: true,
//         message: 'Some cars are blinking red due to high values!'
//       });
//       sendBlinkingCarsToBackend(blinkingCars);
//     } else {
//       setHeaderNotification({ ...headerNotification, visible: false });
//     }
//   };

//   const sendBlinkingCarsToBackend = async (blinkingCars) => {
//     try {
//       // Example of sending blinking cars to backend if needed
//       await axios.post('http://localhost:8080/car/blinking', blinkingCars, {
//         headers:{
//           'Content-Type':'application/json'
//         }
//       });
//       console.log('Blinking cars sent to backend:', blinkingCars);
//     } catch (error) {
//       console.error('Error sending blinking cars to backend:', error);
//     }
//   };

//   const hideNotification = () => {
//     setNotification({ ...notification, visible: false });
//   };

//   const hideHeaderNotification = () => {
//     setHeaderNotification({ ...headerNotification, visible: false });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>UnitedAuto Sports</h1>
//         {headerNotification.visible && (
//           <Notification
//             message={headerNotification.message}
//             onClose={hideHeaderNotification}
//           />
//         )}
//       </header>
//       <main className="main-content">
//         <div className="panel-container">
//           <div className="notification-panel">
//             <h2>Notification Panel</h2>
//             <div className="cards-container">
//               {cards.map(card => (
//                 <Card key={card.id} number={card.number} label={card.label} />
//               ))}
//             </div>
//           </div>
//           <div className="car-information-section">
//             <h1>Car Details</h1>
//             <CarInformation CarNo="1" />
//           </div>
//           {blinkingCars.length > 0 && (
//             <div className="blinking-cars-data">
//               <h3>Blinking Cars</h3>
//               <ul>
//                 {blinkingCars.map((car, index) => (
//                   <li key={index}>{`${car.make} - ${car.model}`}</li> // Example: Display make and model
//                 ))}
//               </ul>
//             </div>
//           )}
//           <div className="map-container">
//             <img src={mapImage} alt="Map" className="map-image" />
//           </div>
//         </div>
//       </main>
//       {notification.visible && (
//         <Notification
//           message={notification.message}
//           onClose={hideNotification}
//         />
//       )}
//       <Footer onClick={handleGenerateNumbers} />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './components/Notification';
import Footer from './components/Footer';
import Card from './components/Card'; // Assuming you have a Card component
import mapImage from './components/assets/map.jpg'; // Import your map image
import './App.css';
import CarList from './components/CarList'
import CarList2 from './components/CarList2'


const CarInformation = ({ CarNo }) => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`/api/cars/${CarNo}`);
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
};

const App = () => {
  const [notification, setNotification] = useState({
    visible: false,
    message: ''
  });
  const [headerNotification, setHeaderNotification] = useState({
    visible: false,
    message: ''
  });
  const [numbers, setNumbers] = useState([]);
  const [cards, setCards] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [blinkingCars, setBlinkingCars] = useState([]);

  useEffect(() => {
    initializeCards();
    fetchAllCars();
  }, []);

  const initializeCards = () => {
    const initialCards = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      number: null,
      label: `C${index + 1}`
    }));
    setCards(initialCards);
  };

  const fetchRandomNumber = async () => {
    const randomNumber = Math.floor(Math.random() * 300) + 10;
    return randomNumber;
  };

  const updateCards = (newNumbers) => {
    const updatedCards = cards.map((card, index) => ({
      ...card,
      number: newNumbers[index]
    }));
    setCards(updatedCards);
    // checkForBlinkingCards(updatedCards);
  };

  const handleGenerateNumbers = async () => {
    let newNumbers = [];
    for (let i = 0; i < 12; i++) {
      const number = await fetchRandomNumber();
      newNumbers.push(number);
    }
    setNumbers(newNumbers);
    updateCards(newNumbers);
  };

  const fetchAllCars = async () => {
    try {
      const response = await axios.post('http://localhost:8080/car/carNo',
        numbers, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setAllCars(response.data); // Assuming response.data is an array of car objects
      filterBlinkingCars(response.data);
    } catch (error) {
      console.error('Error fetching all cars:', error);
    }
  };

  const filterBlinkingCars = (cars) => {
    const blinkingCars = cars.filter(car => car.isBlinking); // Adjust the condition based on your API response structure
    setBlinkingCars(blinkingCars);
    if (blinkingCars.length > 0) {
      setHeaderNotification({
        visible: true,
        message: 'Some cars are blinking red due to high values!'
      });
      sendBlinkingCarsToBackend(blinkingCars);
    } else {
      setHeaderNotification({ ...headerNotification, visible: false });
    }
  };

  const sendBlinkingCarsToBackend = async (blinkingCars) => {
    try {
      // Example of sending blinking cars to backend if needed
      await axios.post('http://localhost:8080/car/blinking', blinkingCars, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Blinking cars sent to backend:', blinkingCars);
    } catch (error) {
      console.error('Error sending blinking cars to backend:', error);
    }
  };

  const hideNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const hideHeaderNotification = () => {
    setHeaderNotification({ ...headerNotification, visible: false });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>United AutoSports</h1>
        {headerNotification.visible && (
          <Notification
            message={headerNotification.message}
            onClose={hideHeaderNotification}
          />
        )}
      </header>

      
      <main className="main-content">
        <div className="panel-container">
          <div className="notification-panel">
            <h2>Notification Panel</h2>
            <div className="cards-container">
              {cards.map(card => (
                <Card key={card.id} number={card.number} label={card.label} />
              ))}
            </div>
          </div>
          
          {blinkingCars.length > 0 && (
            <div className="blinking-cars-data">
              <h3>Blinking Cars</h3>
              <ul>
                {blinkingCars.map((car, index) => (
                  <li key={index}>{`${car.make} - ${car.model}`}</li> // Example: Display make and model
                ))}
              </ul>
            </div>
          )}
          <div className="car-information-section">
            <h1 className="text">There has been uncertain change in speed in highlighted cars on track. PLEASE BE ALERT!!!</h1>
          </div>
        <div className="map-container">
            <img src={mapImage} alt="Map" className="map-image" />
          </div>
        </div>
      </main>
      {notification.visible && (
        <Notification
          message={notification.message}
          onClose={hideNotification}
        />
      )}
      <div styles='{{"display:flex; jusify-content: center; ; "}}'>
        <CarList2/>
      </div>
      <Footer onClick={handleGenerateNumbers} />
    </div>
  );
};

export default App;