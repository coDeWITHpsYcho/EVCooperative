from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class User(AbstractUser):
    USER_TYPES = (
        ('customer', 'Customer'),
        ('driver', 'Driver'),
        ('vendor', 'Vendor'),
        ('cooperative_member', 'Cooperative Member'),
    )
    
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='customer')
    phone_number = models.CharField(max_length=15, unique=True)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} - {self.user_type}"

class UserProfile(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    pincode = models.CharField(max_length=10, null=True, blank=True)
    emergency_contact = models.CharField(max_length=15, null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

class CooperativeMember(models.Model):
    DOCUMENT_TYPES = (
        ('aadhar', 'Aadhar Card'),
        ('photo', 'Photo'),
        ('identification', 'Identification Document'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cooperative_profile')
    father_husband_name = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    full_address = models.TextField()
    village = models.CharField(max_length=100)
    block = models.CharField(max_length=100)
    tehsil = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    whatsapp_number = models.CharField(max_length=15)
    qualification = models.CharField(max_length=200)
    
    # Documents
    aadhar_card = models.ImageField(upload_to='cooperative_docs/', null=True, blank=True)
    photo = models.ImageField(upload_to='cooperative_docs/', null=True, blank=True)
    identification_doc = models.ImageField(upload_to='cooperative_docs/', null=True, blank=True)
    
    # Status
    is_approved = models.BooleanField(default=False)
    application_date = models.DateTimeField(auto_now_add=True)
    approval_date = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - Cooperative Member"