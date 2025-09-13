# transport/urls.py
from django.urls import path
from .views import (
    VehicleListCreateView, VehicleDetailView, DriverProfileView,
    RideListCreateView, RideDetailView, accept_ride, update_ride_status,
    rate_ride, nearby_drivers
)

urlpatterns = [
    path('vehicles/', VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('vehicles/<int:pk>/', VehicleDetailView.as_view(), name='vehicle-detail'),
    path('driver-profile/', DriverProfileView.as_view(), name='driver-profile'),
    path('rides/', RideListCreateView.as_view(), name='ride-list-create'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride-detail'),
    path('rides/<int:ride_id>/accept/', accept_ride, name='accept-ride'),
    path('rides/<int:ride_id>/status/', update_ride_status, name='update-ride-status'),
    path('rides/<int:ride_id>/rate/', rate_ride, name='rate-ride'),
    path('nearby-drivers/', nearby_drivers, name='nearby-drivers'),
]
