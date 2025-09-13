from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Avg
from django.utils import timezone
from .models import Vehicle, DriverProfile, Ride, RideRating
from .serializers import (
    VehicleSerializer, DriverProfileSerializer, RideSerializer, 
    RideCreateSerializer, RideRatingSerializer
)

class VehicleListCreateView(generics.ListCreateAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Vehicle.objects.filter(driver=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(driver=self.request.user)

class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Vehicle.objects.filter(driver=self.request.user)

class DriverProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = DriverProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        profile, created = DriverProfile.objects.get_or_create(user=self.request.user)
        return profile

class RideListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RideCreateSerializer
        return RideSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'driver':
            return Ride.objects.filter(Q(driver=user) | Q(driver__isnull=True)).order_by('-requested_at')
        return Ride.objects.filter(customer=user).order_by('-requested_at')
    
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class RideDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = RideSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Ride.objects.filter(Q(customer=self.request.user) | Q(driver=self.request.user))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_ride(request, ride_id):
    try:
        ride = Ride.objects.get(id=ride_id, status='requested')
        driver = request.user
        
        if driver.user_type != 'driver':
            return Response({'error': 'Only drivers can accept rides'}, status=400)
        
        # Check if driver has active vehicle
        vehicle = Vehicle.objects.filter(driver=driver, is_active=True, is_verified=True).first()
        if not vehicle:
            return Response({'error': 'No verified active vehicle found'}, status=400)
        
        ride.driver = driver
        ride.vehicle = vehicle
        ride.status = 'accepted'
        ride.accepted_at = timezone.now()
        ride.save()
        
        return Response(RideSerializer(ride).data)
    
    except Ride.DoesNotExist:
        return Response({'error': 'Ride not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_ride_status(request, ride_id):
    try:
        ride = Ride.objects.get(id=ride_id)
        new_status = request.data.get('status')
        
        # Verify user permission
        if ride.driver != request.user and ride.customer != request.user:
            return Response({'error': 'Permission denied'}, status=403)
        
        # Update status with timestamp
        ride.status = new_status
        if new_status == 'picked_up':
            ride.picked_up_at = timezone.now()
        elif new_status == 'completed':
            ride.completed_at = timezone.now()
            ride.actual_fare = request.data.get('actual_fare', ride.estimated_fare)
        elif new_status == 'cancelled':
            ride.cancelled_at = timezone.now()
        
        ride.save()
        return Response(RideSerializer(ride).data)
    
    except Ride.DoesNotExist:
        return Response({'error': 'Ride not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_ride(request, ride_id):
    try:
        ride = Ride.objects.get(id=ride_id, status='completed')
        
        # Verify user was part of the ride
        if ride.customer != request.user and ride.driver != request.user:
            return Response({'error': 'Permission denied'}, status=403)
        
        # Determine who to rate
        rated_to = ride.driver if ride.customer == request.user else ride.customer
        
        rating, created = RideRating.objects.get_or_create(
            ride=ride,
            defaults={
                'rated_by': request.user,
                'rated_to': rated_to,
                'rating': request.data.get('rating'),
                'comment': request.data.get('comment', '')
            }
        )
        
        if not created:
            return Response({'error': 'Ride already rated'}, status=400)
        
        # Update driver's average rating if driver was rated
        if rated_to.user_type == 'driver':
            driver_profile = rated_to.driver_profile
            avg_rating = RideRating.objects.filter(rated_to=rated_to).aggregate(Avg('rating'))['rating__avg']
            driver_profile.average_rating = avg_rating or 0.0
            driver_profile.save()
        
        return Response(RideRatingSerializer(rating).data)
    
    except Ride.DoesNotExist:
        return Response({'error': 'Ride not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def nearby_drivers(request):
    """Get nearby available drivers"""
    user_lat = float(request.GET.get('latitude', 0))
    user_lng = float(request.GET.get('longitude', 0))
    
    # Simple distance calculation (in real app, use PostGIS)
    drivers = DriverProfile.objects.filter(
        is_online=True,
        is_verified=True,
        current_latitude__isnull=False,
        current_longitude__isnull=False
    )
    
    nearby_drivers = []
    for driver in drivers:
        # Calculate rough distance (for demo purposes)
        lat_diff = abs(driver.current_latitude - user_lat)
        lng_diff = abs(driver.current_longitude - user_lng)
        distance = (lat_diff + lng_diff) * 111  # Rough km conversion
        
        if distance <= 10:  # Within 10km
            driver_data = DriverProfileSerializer(driver).data
            driver_data['distance'] = round(distance, 2)
            nearby_drivers.append(driver_data)
    
    return Response(nearby_drivers)
