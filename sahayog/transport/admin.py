from django.contrib import admin
from .models import Vehicle, DriverProfile, Ride, RideRating

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('license_plate', 'driver', 'vehicle_type', 'make', 'model', 'is_verified', 'is_active')
    list_filter = ('vehicle_type', 'fuel_type', 'is_verified', 'is_active')
    search_fields = ('license_plate', 'driver__username', 'make', 'model')
    
    actions = ['verify_vehicles']
    
    def verify_vehicles(self, request, queryset):
        queryset.update(is_verified=True)
    verify_vehicles.short_description = "Verify selected vehicles"

@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'license_number', 'average_rating', 'total_rides', 'is_online', 'is_verified')
    list_filter = ('is_online', 'is_verified')
    search_fields = ('user__username', 'license_number')
    
    actions = ['verify_drivers']
    
    def verify_drivers(self, request, queryset):
        queryset.update(is_verified=True)
    verify_drivers.short_description = "Verify selected drivers"

@admin.register(Ride)
class RideAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'driver', 'status', 'estimated_fare', 'requested_at')
    list_filter = ('status', 'requested_at')
    search_fields = ('customer__username', 'driver__username')
    readonly_fields = ('requested_at', 'accepted_at', 'picked_up_at', 'completed_at', 'cancelled_at')

@admin.register(RideRating)
class RideRatingAdmin(admin.ModelAdmin):
    list_display = ('ride', 'rated_by', 'rated_to', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('ride__id', 'rated_by__username', 'rated_to__username')