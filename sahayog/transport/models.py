from django.db import models
from accounts.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Vehicle(models.Model):
    VEHICLE_TYPES = (
        ('bike', 'Bike'),
        ('auto', 'Auto Rickshaw'),
        ('car', 'Car'),
        ('tempo', 'Tempo'),
        ('truck', 'Truck'),
    )
    
    FUEL_TYPES = (
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('cng', 'CNG'),
        ('electric', 'Electric'),
    )
    
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vehicles')
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPES)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    license_plate = models.CharField(max_length=20, unique=True)
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPES)
    seating_capacity = models.PositiveIntegerField()
    
    # Documents
    registration_doc = models.ImageField(upload_to='vehicle_docs/')
    insurance_doc = models.ImageField(upload_to='vehicle_docs/')
    permit_doc = models.ImageField(upload_to='vehicle_docs/', null=True, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.make} {self.model} - {self.license_plate}"

class DriverProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='driver_profile')
    license_number = models.CharField(max_length=50, unique=True)
    license_expiry = models.DateField()
    experience_years = models.PositiveIntegerField()
    
    # Documents
    license_doc = models.ImageField(upload_to='driver_docs/')
    photo = models.ImageField(upload_to='driver_docs/')
    
    # Ratings
    average_rating = models.FloatField(default=0.0)
    total_rides = models.PositiveIntegerField(default=0)
    
    # Status
    is_online = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    current_latitude = models.FloatField(null=True, blank=True)
    current_longitude = models.FloatField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - Driver"

class Ride(models.Model):
    STATUS_CHOICES = (
        ('requested', 'Requested'),
        ('accepted', 'Accepted'),
        ('picked_up', 'Picked Up'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customer_rides')
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='driver_rides', null=True, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True, blank=True)
    
    # Locations
    pickup_latitude = models.FloatField()
    pickup_longitude = models.FloatField()
    pickup_address = models.TextField()
    
    dropoff_latitude = models.FloatField()
    dropoff_longitude = models.FloatField()
    dropoff_address = models.TextField()
    
    # Ride Details
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')
    estimated_fare = models.DecimalField(max_digits=10, decimal_places=2)
    actual_fare = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    distance_km = models.FloatField()
    estimated_duration = models.PositiveIntegerField()  # in minutes
    
    # Timestamps
    requested_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    picked_up_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    
    # Special requests
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"Ride #{self.id} - {self.customer.username}"

class RideRating(models.Model):
    ride = models.OneToOneField(Ride, on_delete=models.CASCADE, related_name='rating')
    rated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_ratings')
    rated_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_ratings')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Rating {self.rating}/5 for Ride #{self.ride.id}"