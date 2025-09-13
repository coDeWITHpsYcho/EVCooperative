import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './VehicleManagement.module.css';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: '',
    plateNumber: '',
    color: '',
    vehicleType: 'sedan',
    seats: '',
    fuelType: 'electric'
  });

  useEffect(() => {
    // Fetch user's vehicles from API
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      // Replace with actual API call
      const mockVehicles = [
        {
          id: 1,
          make: 'Tesla',
          model: 'Model 3',
          year: 2023,
          plateNumber: 'MH01AB1234',
          color: 'White',
          vehicleType: 'sedan',
          seats: 5,
          fuelType: 'electric',
          status: 'active'
        }
      ];
      setVehicles(mockVehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API call
      const vehicleWithId = {
        ...newVehicle,
        id: Date.now(),
        status: 'pending'
      };
      setVehicles(prev => [...prev, vehicleWithId]);
      setNewVehicle({
        make: '',
        model: '',
        year: '',
        plateNumber: '',
        color: '',
        vehicleType: 'sedan',
        seats: '',
        fuelType: 'electric'
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      // Replace with actual API call
      setVehicles(prev => prev.filter(vehicle => vehicle.id !== vehicleId));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'inactive': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Vehicle Management</h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          + Add Vehicle
        </button>
      </div>

      {showAddForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Add New Vehicle</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddVehicle} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Make</label>
                  <input
                    type="text"
                    name="make"
                    value={newVehicle.make}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Model</label>
                  <input
                    type="text"
                    name="model"
                    value={newVehicle.model}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Year</label>
                  <input
                    type="number"
                    name="year"
                    value={newVehicle.year}
                    onChange={handleInputChange}
                    min="2000"
                    max="2025"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Plate Number</label>
                  <input
                    type="text"
                    name="plateNumber"
                    value={newVehicle.plateNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    value={newVehicle.color}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={newVehicle.vehicleType}
                    onChange={handleInputChange}
                  >
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="auto">Auto Rickshaw</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Seats</label>
                  <input
                    type="number"
                    name="seats"
                    value={newVehicle.seats}
                    onChange={handleInputChange}
                    min="1"
                    max="8"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Fuel Type</label>
                  <select
                    name="fuelType"
                    value={newVehicle.fuelType}
                    onChange={handleInputChange}
                  >
                    <option value="electric">Electric</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG</option>
                  </select>
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit">Add Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.vehicleGrid}>
        {vehicles.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No vehicles registered</h3>
            <p>Add your first vehicle to start earning</p>
          </div>
        ) : (
          vehicles.map(vehicle => (
            <div key={vehicle.id} className={styles.vehicleCard}>
              <div className={styles.vehicleImage}>
                <div className={styles.placeholder}>
                  🚗
                </div>
              </div>
              <div className={styles.vehicleInfo}>
                <h3>{vehicle.make} {vehicle.model}</h3>
                <p>{vehicle.year} • {vehicle.color}</p>
                <p>{vehicle.plateNumber}</p>
                <div className={styles.vehicleDetails}>
                  <span>{vehicle.seats} seats</span>
                  <span>{vehicle.fuelType}</span>
                  <span 
                    className={styles.status}
                    style={{ color: getStatusColor(vehicle.status) }}
                  >
                    {vehicle.status}
                  </span>
                </div>
              </div>
              <div className={styles.vehicleActions}>
                <button className={styles.editButton}>Edit</button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Vehicles</h3>
          <p>{vehicles.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Active Vehicles</h3>
          <p>{vehicles.filter(v => v.status === 'active').length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Approval</h3>
          <p>{vehicles.filter(v => v.status === 'pending').length}</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;