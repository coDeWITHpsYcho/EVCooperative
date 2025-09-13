from django.db import models
from accounts.models import User

class CooperativeProduct(models.Model):
    PRODUCT_TYPES = (
        ('handicraft', 'Handicraft'),
        ('textile', 'Textile'),
        ('food', 'Food Product'),
        ('agriculture', 'Agriculture Product'),
        ('handloom', 'Handloom'),
        ('pottery', 'Pottery'),
        ('jewelry', 'Jewelry'),
        ('other', 'Other'),
    )
    
    artisan = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cooperative_products')
    name = models.CharField(max_length=200)
    description = models.TextField()
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_available = models.PositiveIntegerField(default=1)
    
    # Artisan details
    craft_tradition = models.CharField(max_length=100)  # Traditional craft name
    origin_village = models.CharField(max_length=100)
    materials_used = models.TextField()
    time_to_make = models.CharField(max_length=50)  # e.g., "2-3 days"
    
    # Certification
    is_certified_organic = models.BooleanField(default=False)
    is_fair_trade = models.BooleanField(default=False)
    geographical_indication = models.CharField(max_length=100, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class CooperativeProductImage(models.Model):
    product = models.ForeignKey(CooperativeProduct, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='cooperative_products/')
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class CooperativeOrder(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('in_progress', 'In Progress'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    )
    
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cooperative_orders')
    product = models.ForeignKey(CooperativeProduct, on_delete=models.CASCADE, related_name='orders')
    quantity = models.PositiveIntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Delivery details
    delivery_address = models.TextField()
    delivery_phone = models.CharField(max_length=15)
    delivery_instructions = models.TextField(blank=True)
    
    # Status and tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    tracking_number = models.CharField(max_length=50, blank=True)
    estimated_delivery = models.DateField(null=True, blank=True)
    
    # Timestamps
    ordered_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Order #{self.id} - {self.product.name}"

class ArtisanSupport(models.Model):
    SUPPORT_TYPES = (
        ('financial', 'Financial Support'),
        ('training', 'Training & Skill Development'),
        ('marketing', 'Marketing Assistance'),
        ('raw_materials', 'Raw Materials'),
        ('equipment', 'Equipment Support'),
        ('certification', 'Certification Help'),
    )
    
    artisan = models.ForeignKey(User, on_delete=models.CASCADE, related_name='support_requests')
    support_type = models.CharField(max_length=20, choices=SUPPORT_TYPES)
    description = models.TextField()
    amount_requested = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Status
    is_approved = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    
    # Timestamps
    requested_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.support_type} request by {self.artisan.username}"