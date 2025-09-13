from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from accounts.models import UserProfile, CooperativeMember
from transport.models import Vehicle, DriverProfile
from marketplace.models import Category, Product
from cooperative.models import CooperativeProduct

User = get_user_model()

class Command(BaseCommand):
    help = 'Create sample data for development'
    
    def handle(self, *args, **options):
        # Create sample users
        if not User.objects.filter(username='customer1').exists():
            customer = User.objects.create_user(
                username='customer1',
                email='customer1@example.com',
                phone_number='9876543210',
                user_type='customer',
                password='password123'
            )
            self.stdout.write(f'Created customer: {customer.username}')
        
        if not User.objects.filter(username='driver1').exists():
            driver = User.objects.create_user(
                username='driver1',
                email='driver1@example.com',
                phone_number='9876543211',
                user_type='driver',
                password='password123'
            )
            
            # Create driver profile
            DriverProfile.objects.create(
                user=driver,
                license_number='DL123456789',
                license_expiry='2025-12-31',
                experience_years=5,
                is_verified=True
            )
            self.stdout.write(f'Created driver: {driver.username}')
        
        if not User.objects.filter(username='artisan1').exists():
            artisan = User.objects.create_user(
                username='artisan1',
                email='artisan1@example.com',
                phone_number='9876543212',
                user_type='cooperative_member',
                password='password123'
            )
            self.stdout.write(f'Created artisan: {artisan.username}')
        
        # Create sample categories
        if not Category.objects.exists():
            electronics = Category.objects.create(
                name='Electronics',
                slug='electronics',
                description='Electronic items and gadgets'
            )
            
            vehicles_cat = Category.objects.create(
                name='Vehicles',
                slug='vehicles',
                description='Cars, bikes, and other vehicles'
            )
            
            Category.objects.create(
                name='Mobile Phones',
                slug='mobile-phones',
                parent=electronics
            )
            
            self.stdout.write('Created sample categories')
        
        # Create sample cooperative products
        artisan = User.objects.filter(user_type='cooperative_member').first()
        if artisan and not CooperativeProduct.objects.exists():
            CooperativeProduct.objects.create(
                artisan=artisan,
                name='Handwoven Silk Saree',
                description='Beautiful traditional silk saree handwoven by skilled artisans',
                product_type='textile',
                price=2500.00,
                craft_tradition='Banarasi Weaving',
                origin_village='Varanasi',
                materials_used='Pure silk thread, gold zari',
                time_to_make='7-10 days'
            )
            
            CooperativeProduct.objects.create(
                artisan=artisan,
                name='Clay Pottery Set',
                description='Traditional clay pottery set for daily use',
                product_type='pottery',
                price=800.00,
                craft_tradition='Traditional Pottery',
                origin_village='Khurja',
                materials_used='Natural clay, organic colors',
                time_to_make='3-4 days'
            )
            
            self.stdout.write('Created sample cooperative products')
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))