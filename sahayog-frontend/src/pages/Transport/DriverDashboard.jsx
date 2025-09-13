import React, { useState, useEffect } from 'react';
import { Power, MapPin, Clock, DollarSign, Star, Car, Navigation } from 'lucide-react';
import { transportAPI } from '../../services/api';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { RIDE_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import styles from './DriverDashboard.module.css';

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [availableRides, setAvailableRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const [stats, setStats] = useState({
    todayEarnings: 0,
    todayRides: 0,
    rating: 0,
    totalRides: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDriverData();
    if (isOnline) {
      const interval = setInterval(loadAvailableRides, 10000); // Poll every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const loadDriverData = async () => {
    try {
      const ridesResponse = await transportAPI.getRides();
      const rides = ridesResponse.data.results || [];
      
      // Find current active ride
      const activeRide = rides.find(ride => 
        [RIDE_STATUS.ACCEPTED, RIDE_STATUS.PICKED_UP, RIDE_STATUS.IN_PROGRESS].includes(ride.status)
      );
      setCurrentRide(activeRide);

      // Calculate stats
      const completedRides = rides.filter(ride => ride.status === RIDE_STATUS.COMPLETED);
      const todayRides = completedRides.filter(ride => {
        const today = new Date().toDateString();
        return new Date(ride.completed_at).toDateString() === today;
      });

      setStats({
        todayEarnings: todayRides.reduce((sum, ride) => sum + parseFloat(ride.actual_fare || 0), 0),
        todayRides: todayRides.length,
        rating: 4.8, // This should come from driver profile
        totalRides: completedRides.length
      });

    } catch (error) {
      toast.error('Error loading driver data');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableRides = async () => {
    try {
      const response = await transportAPI.getRides();
      const available = response.data.results?.filter(ride => 
        ride.status === RIDE_STATUS.REQUESTED && !ride.driver
      ) || [];
      setAvailableRides(available);
    } catch (error) {
      console.error('Error loading available rides');
    }
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      loadAvailableRides();
      toast.success('You are now online and available for rides');
    } else {
      toast.info('You are now offline');
    }
  };

  const acceptRide = async (rideId) => {
    try {
      await transportAPI.acceptRide(rideId);
      toast.success('Ride accepted successfully');
      loadDriverData();
      loadAvailableRides();
    } catch (error) {
      toast.error('Error accepting ride');
    }
  };

  const updateRideStatus = async (rideId, status) => {
    try {
      await transportAPI.updateRideStatus(rideId, status);
      toast.success(`Ride status updated to ${status.replace('_', ' ')}`);
      loadDriverData();
    } catch (error) {
      toast.error('Error updating ride status');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading driver dashboard..." />;
  }

  return (
    <div className={styles.driverDashboard}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Driver Dashboard</h1>
          <button 
            onClick={toggleOnlineStatus}
            className={`${styles.onlineToggle} ${isOnline ? styles.online : styles.offline}`}
          >
            <Power size={20} />
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#4facfe20', color: '#4facfe' }}>
              <DollarSign size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{formatCurrency(stats.todayEarnings)}</h3>
              <p>Today's Earnings</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#43e97b20', color: '#43e97b' }}>
              <Car size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{stats.todayRides}</h3>
              <p>Rides Today</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#ffd93d20', color: '#ffd93d' }}>
              <Star size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{stats.rating.toFixed(1)}</h3>
              <p>Your Rating</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#fa709a20', color: '#fa709a' }}>
              <Navigation size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{stats.totalRides}</h3>
              <p>Total Rides</p>
            </div>
          </div>
        </div>

        {/* Current Ride */}
        {currentRide && (
          <div className={styles.currentRide}>
            <h2>Current Ride</h2>
            <div className={styles.rideCard}>
              <div className={styles.rideHeader}>
                <span className={styles.rideId}>Ride #{currentRide.id}</span>
                <span className={styles.statusBadge}>
                  {currentRide.status.replace('_', ' ')}
                </span>
              </div>

              <div className={styles.rideDetails}>
                <div className={styles.routeInfo}>
                  <div className={styles.routeItem}>
                    <MapPin size={16} />
                    <div>
                      <p>From: {currentRide.pickup_address}</p>
                      <p>To: {currentRide.dropoff_address}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.customerInfo}>
                  <h4>Customer: {currentRide.customer.first_name || currentRide.customer.username}</h4>
                  <p>Phone: {currentRide.customer.phone_number}</p>
                </div>

                <div className={styles.rideActions}>
                  {currentRide.status === RIDE_STATUS.ACCEPTED && (
                    <button 
                      onClick={() => updateRideStatus(currentRide.id, RIDE_STATUS.PICKED_UP)}
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      Mark as Picked Up
                    </button>
                  )}
                  
                  {currentRide.status === RIDE_STATUS.PICKED_UP && (
                    <button 
                      onClick={() => updateRideStatus(currentRide.id, RIDE_STATUS.IN_PROGRESS)}
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      Start Trip
                    </button>
                  )}
                  
                  {currentRide.status === RIDE_STATUS.IN_PROGRESS && (
                    <button 
                      onClick={() => updateRideStatus(currentRide.id, RIDE_STATUS.COMPLETED)}
                      className={`${styles.btn} ${styles.btnSuccess}`}
                    >
                      Complete Ride
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Rides */}
        {isOnline && !currentRide && (
          <div className={styles.availableRides}>
            <h2>Available Rides</h2>
            {availableRides.length > 0 ? (
              <div className={styles.ridesGrid}>
                {availableRides.map((ride) => (
                  <div key={ride.id} className={styles.rideCard}>
                    <div className={styles.rideHeader}>
                      <span className={styles.rideId}>Ride #{ride.id}</span>
                      <span className={styles.fareAmount}>
                        {formatCurrency(ride.estimated_fare)}
                      </span>
                    </div>

                    <div className={styles.rideDetails}>
                      <div className={styles.routeInfo}>
                        <div className={styles.routeItem}>
                          <MapPin size={14} />
                          <span>{ride.pickup_address}</span>
                        </div>
                        <div className={styles.routeItem}>
                          <Navigation size={14} />
                          <span>{ride.dropoff_address}</span>
                        </div>
                      </div>

                      <div className={styles.rideMetrics}>
                        <div className={styles.metric}>
                          <Clock size={14} />
                          <span>{ride.estimated_duration} min</span>
                        </div>
                        <div className={styles.metric}>
                          <MapPin size={14} />
                          <span>{ride.distance_km.toFixed(1)} km</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => acceptRide(ride.id)}
                        className={`${styles.btn} ${styles.btnPrimary}`}
                      >
                        Accept Ride
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Car size={48} />
                <h3>No rides available</h3>
                <p>New ride requests will appear here when customers book rides in your area.</p>
              </div>
            )}
          </div>
        )}

        {!isOnline && (
          <div className={styles.offlineState}>
            <Power size={64} />
            <h3>You're Offline</h3>
            <p>Go online to start receiving ride requests and earning money.</p>
            <button 
              onClick={toggleOnlineStatus}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Go Online
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;