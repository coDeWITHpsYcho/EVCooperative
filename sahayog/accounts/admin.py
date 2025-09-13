from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserProfile, CooperativeMember

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'phone_number', 'user_type', 'is_verified', 'date_joined')
    list_filter = ('user_type', 'is_verified', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'phone_number')
    
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {
            'fields': ('user_type', 'phone_number', 'profile_image', 'is_verified')
        }),
    )

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'gender', 'city', 'state')
    search_fields = ('user__username', 'city', 'state')
    list_filter = ('gender', 'state')

@admin.register(CooperativeMember)
class CooperativeMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'village', 'district', 'state', 'is_approved', 'application_date')
    list_filter = ('is_approved', 'state', 'district')
    search_fields = ('user__username', 'village', 'district')
    readonly_fields = ('application_date',)
    
    actions = ['approve_members']
    
    def approve_members(self, request, queryset):
        from django.utils import timezone
        queryset.update(is_approved=True, approval_date=timezone.now())
    approve_members.short_description = "Approve selected members"