import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, DollarSign, Car, Phone } from 'lucide-react';
import { transportAPI } from '../../services/api';
import { formatCurrency, formatDateTime, getStatusColor } from '../../utils/helpers';
import { RIDE_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import Modal from '../../components/Common/Modal';
import styles from './MyRides.module.css';

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadRides();
  }, []);

  const loadRides = async () => {
    try {
      const response = await transportAPI.getRides();
      setRides(response.data.results || []);
    } catch (error) {
      toast.error('Error loading rides');
    } finally {
      setLoading(false);
    }
  };

  const cancelRide = async (rideId) => {
    try {
      await transportAPI.updateRideStatus(rideId, RIDE_STATUS.CANCELLED);
      toast.success('Ride cancelled successfully');
      loadRides();
    } catch (error) {
      toast.error('Error cancelling ride');
    }
  };

  const submitRating = async () => {
    try {
      await transportAPI.rateRide(selectedRide.id, { rating, comment });
      toast.success('Rating submitted successfully');
      setRatingModalOpen(false);
      setSelectedRide(null);
      setRating(5);
      setComment('');
      loadRides();
    } catch (error) {
      toast.error('Error submitting rating');
    }
  };

  const filteredRides = rides.filter(ride => {
    if (filter === 'all') return true;
    return ride.status === filter;
  });

  if (loading) {
    return <LoadingSpinner text="Loading your rides..." />;
  }

  return (
    <div className={styles.myRides}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Rides</h1>
          <Link to="/transport/book" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Car size={20} />
            Book New Ride
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All Rides
          </button>
          <button 
            className={`${styles.filterTab} ${filter === RIDE_STATUS.REQUESTED ? styles.active : ''}`}
            onClick={() => setFilter(RIDE_STATUS.REQUESTED)}
          >
            Requested
          </button>
          <button 
            className={`${styles.filterTab} ${filter === RIDE_STATUS.IN_PROGRESS ? styles.active : ''}`}
            onClick={() => setFilter(RIDE_STATUS.IN_PROGRESS)}
          >
            In Progress
          </button>
          <button 
            className={`${styles.filterTab} ${filter === RIDE_STATUS.COMPLETED ? styles.active : ''}`}
            onClick={() => setFilter(RIDE_STATUS.COMPLETED)}
          >
            Completed
          </button>
        </div>

        {/* Rides List */}
        <div className={styles.ridesList}>
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <div key={ride.id} className={styles.rideCard}>
                <div className={styles.rideHeader}>
                  <div className={styles.rideId}>
                    <span>Ride #{ride.id}</span>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(ride.status) }}
                    >
                      {ride.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className={styles.rideDate}>
                    {formatDateTime(ride.requested_at)}
                  </div>
                </div>

                <div className={styles.rideContent}>
                  <div className={styles.routeInfo}>
                    <div className={styles.routeItem}>
                      <MapPin size={16} />
                      <div>
                        <p className={styles.routeLabel}>From</p>
                        <p className={styles.routeAddress}>{ride.pickup_address}</p>
                      </div>
                    </div>
                    <div className={styles.routeItem}>
                      <MapPin size={16} />
                      <div>
                        <p className={styles.routeLabel}>To</p>
                        <p className={styles.routeAddress}>{ride.dropoff_address}</p>
                      </div>
                    </div>
                  </div>

                  {ride.driver && (
                    <div className={styles.driverInfo}>
                      <h4>Driver Details</h4>
                      <div className={styles.driverDetails}>
                        <div className={styles.driverName}>
                          {ride.driver.first_name || ride.driver.username}
                        </div>
                        <div className={styles.driverRating}>
                          <Star size={14} fill="currentColor" />
                          4.8
                        </div>
                        <div className={styles.driverContact}>
                          <Phone size={14} />
                          {ride.driver.phone_number}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={styles.rideMetrics}>
                    <div className={styles.metric}>
                      <Clock size={16} />
                      <span>{ride.estimated_duration} min</span>
                    </div>
                    <div className={styles.metric}>
                      <DollarSign size={16} />
                      <span>{formatCurrency(ride.actual_fare || ride.estimated_fare)}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.rideActions}>
                  {ride.status === RIDE_STATUS.REQUESTED && (
                    <button 
                      onClick={() => cancelRide(ride.id)}
                      className={`${styles.btn} ${styles.btnDanger}`}
                    >
                      Cancel Ride
                    </button>
                  )}
                  
                  {ride.status === RIDE_STATUS.COMPLETED && !ride.rating && (
                    <button 
                      onClick={() => {
                        setSelectedRide(ride);
                        setRatingModalOpen(true);
                      }}
                      className={`${styles.btn} ${styles.btnSecondary}`}
                    >
                      <Star size={16} />
                      Rate Ride
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <Car size={64} />
              <h3>No rides found</h3>
              <p>
                {filter === 'all' 
                  ? "You haven't booked any rides yet." 
                  : `No ${filter.replace('_', ' ')} rides found.`
                }
              </p>
              <Link to="/transport/book" className={`${styles.btn} ${styles.btnPrimary}`}>
                Book Your First Ride
              </Link>
            </div>
          )}
        </div>

        {/* Rating Modal */}
        <Modal
          isOpen={ratingModalOpen}
          onClose={() => setRatingModalOpen(false)}
          title="Rate Your Ride"
        >
          <div className={styles.ratingModal}>
            <div className={styles.ratingSection}>
              <h4>How was your ride?</h4>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`${styles.star} ${star <= rating ? styles.active : ''}`}
                    onClick={() => setRating(star)}
                  >
                    <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.commentSection}>
              <label htmlFor="comment">Additional Comments (Optional)</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                rows="4"
              />
            </div>

            <div className={styles.modalActions}>
              <button 
                onClick={() => setRatingModalOpen(false)}
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Cancel
              </button>
              <button 
                onClick={submitRating}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyRides;
