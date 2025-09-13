from rest_framework import serializers
from .models import Vehicle, DriverProfile, Ride, RideRating
from accounts.serializers import UserSerializer

class VehicleSerializer(serializers.ModelSerializer):
    driver = UserSerializer(read_only=True)
    
    class Meta:
        model = Vehicle
        fields = '__all__'

class DriverProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = DriverProfile
        fields = '__all__'

class RideSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    driver = UserSerializer(read_only=True)
    vehicle = VehicleSerializer(read_only=True)
    
    class Meta:
        model = Ride
        fields = '__all__'

class RideCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = ['pickup_latitude', 'pickup_longitude', 'pickup_address', 
                 'dropoff_latitude', 'dropoff_longitude', 'dropoff_address', 
                 'estimated_fare', 'distance_km', 'estimated_duration', 'notes']

class RideRatingSerializer(serializers.ModelSerializer):
    rated_by = UserSerializer(read_only=True)
    rated_to = UserSerializer(read_only=True)
    
    class Meta:
        model = RideRating
        fields = '__all__'