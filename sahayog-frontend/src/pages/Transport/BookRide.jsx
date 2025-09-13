import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Car, Navigation, User } from 'lucide-react';
import { transportAPI } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import styles from './BookRide.module.css';

const BookRide = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  const [rideData, setRideData] = useState({
    pickup_address: '',
    pickup_latitude: null,
    pickup_longitude: null,
    dropoff_address: '',
    dropoff_latitude: null,
    dropoff_longitude: null,
    estimated_fare: 0,
    distance_km: 0,
    estimated_duration: 0,
    notes: ''
  });

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setRideData(prev => ({
            ...prev,
            pickup_latitude: position.coords.latitude,
            pickup_longitude: position.coords.longitude
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your location. Please enter manually.');
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    setRideData({
      ...rideData,
      [e.target.name]: e.target.value
    });
  };

  const calculateFare = () => {
    // Simple fare calculation - in real app, use proper distance calculation
    const basefare = 50;
    const perKmRate = 12;
    const distance = Math.random() * 10 + 2; // Mock distance
    const fare = basefare + (distance * perKmRate);
    
    setRideData(prev => ({
      ...prev,
      distance_km: distance,
      estimated_fare: fare,
      estimated_duration: Math.ceil(distance * 3) // 3 min per km
    }));
    
    return fare;
  };

  const findNearbyDrivers = async () => {
    if (!rideData.pickup_latitude || !rideData.pickup_longitude) {
      toast.error('Please allow location access or enter pickup address');
      return;
    }

    setLoading(true);
    try {
      const response = await transportAPI.getNearbyDrivers(
        rideData.pickup_latitude,
        rideData.pickup_longitude
      );
      setNearbyDrivers(response.data);
      
      if (response.data.length === 0) {
        toast.warning('No drivers available in your area right now');
      } else {
        setStep(2);
      }
    } catch (error) {
      toast.error('Error finding drivers');
    } finally {
      setLoading(false);
    }
  };

  const bookRide = async () => {
    if (!selectedDriver) {
      toast.error('Please select a driver');
      return;
    }

    setLoading(true);
    try {
      const response = await transportAPI.createRide(rideData);
      toast.success('Ride booked successfully!');
      navigate('/transport/rides');
    } catch (error) {
      toast.error('Error booking ride');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!rideData.pickup_address || !rideData.dropoff_address) {
        toast.error('Please fill in both pickup and drop-off addresses');
        return;
      }
      calculateFare();
      findNearbyDrivers();
    } else if (step === 2) {
      setStep(3);
    }
  };

  if (loading && step === 1) {
    return <LoadingSpinner text="Finding nearby drivers..." />;
  }

  return (
    <div className={styles.bookRide}>
      <div className={styles.container}>
        <div className={styles.bookingHeader}>
          <h1 className={styles.title}>Book Your Ride</h1>
          <div className={styles.stepIndicator}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
            <div className={`${styles.stepLine} ${step >= 2 ? styles.active : ''}`}></div>
            <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
            <div className={`${styles.stepLine} ${step >= 3 ? styles.active : ''}`}></div>
            <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3</div>
          </div>
        </div>

        {step === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.locationForm}>
              <h2>Where are you going?</h2>
              
              <div className={styles.inputGroup}>
                <label htmlFor="pickup">
                  <MapPin size={20} />
                  Pickup Location
                </label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup_address"
                  value={rideData.pickup_address}
                  onChange={handleInputChange}
                  placeholder="Enter pickup address"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="dropoff">
                  <Navigation size={20} />
                  Drop-off Location
                </label>
                <input
                  type="text"
                  id="dropoff"
                  name="dropoff_address"
                  value={rideData.dropoff_address}
                  onChange={handleInputChange}
                  placeholder="Enter destination address"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="notes">Additional Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={rideData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions for the driver"
                  rows="3"
                />
              </div>

              <button 
                onClick={handleNextStep}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Find Drivers
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.driverSelection}>
              <h2>Choose Your Driver</h2>
              
              <div className={styles.rideEstimate}>
                <div className={styles.estimateItem}>
                  <Clock size={20} />
                  <span>{rideData.estimated_duration} min</span>
                </div>
                <div className={styles.estimateItem}>
                  <Navigation size={20} />
                  <span>{rideData.distance_km.toFixed(1)} km</span>
                </div>
                <div className={styles.estimateItem}>
                  <DollarSign size={20} />
                  <span>{formatCurrency(rideData.estimated_fare)}</span>
                </div>
              </div>

              <div className={styles.driversList}>
                {nearbyDrivers.map((driver, index) => (
                  <div 
                    key={index}
                    className={`${styles.driverCard} ${selectedDriver === driver ? styles.selected : ''}`}
                    onClick={() => setSelectedDriver(driver)}
                  >
                    <div className={styles.driverInfo}>
                      <div className={styles.driverAvatar}>
                        <User size={24} />
                      </div>
                      <div className={styles.driverDetails}>
                        <h3>{driver.user.first_name || driver.user.username}</h3>
                        <p>⭐ {driver.average_rating.toFixed(1)} • {driver.total_rides} rides</p>
                        <p className={styles.driverDistance}>{driver.distance} km away</p>
                      </div>
                    </div>
                    <div className={styles.vehicleInfo}>
                      <Car size={20} />
                      <span>EV Vehicle</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.stepButtons}>
                <button 
                  onClick={() => setStep(1)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Back
                </button>
                <button 
                  onClick={handleNextStep}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={!selectedDriver}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <div className={styles.confirmation}>
              <h2>Confirm Your Booking</h2>
              
              <div className={styles.bookingSummary}>
                <div className={styles.summarySection}>
                  <h3>Trip Details</h3>
                  <div className={styles.summaryItem}>
                    <MapPin size={16} />
                    <div>
                      <p><strong>From:</strong> {rideData.pickup_address}</p>
                      <p><strong>To:</strong> {rideData.dropoff_address}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.summarySection}>
                  <h3>Driver Details</h3>
                  <div className={styles.summaryItem}>
                    <User size={16} />
                    <div>
                      <p><strong>Driver:</strong> {selectedDriver?.user.first_name || selectedDriver?.user.username}</p>
                      <p><strong>Rating:</strong> ⭐ {selectedDriver?.average_rating.toFixed(1)}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.summarySection}>
                  <h3>Fare Breakdown</h3>
                  <div className={styles.fareBreakdown}>
                    <div className={styles.fareItem}>
                      <span>Base Fare</span>
                      <span>₹50</span>
                    </div>
                    <div className={styles.fareItem}>
                      <span>Distance ({rideData.distance_km.toFixed(1)} km)</span>
                      <span>₹{(rideData.estimated_fare - 50).toFixed(2)}</span>
                    </div>
                    <div className={`${styles.fareItem} ${styles.totalFare}`}>
                      <span><strong>Total</strong></span>
                      <span><strong>{formatCurrency(rideData.estimated_fare)}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.stepButtons}>
                <button 
                  onClick={() => setStep(2)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Back
                </button>
                <button 
                  onClick={bookRide}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRide;