from rest_framework import serializers
from .models import CooperativeProduct, CooperativeProductImage, CooperativeOrder, ArtisanSupport
from accounts.serializers import UserSerializer

class CooperativeProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CooperativeProductImage
        fields = '__all__'

class CooperativeProductSerializer(serializers.ModelSerializer):
    artisan = UserSerializer(read_only=True)
    images = CooperativeProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = CooperativeProduct
        fields = '__all__'

class CooperativeOrderSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(read_only=True)
    product = CooperativeProductSerializer(read_only=True)
    
    class Meta:
        model = CooperativeOrder
        fields = '__all__'

class ArtisanSupportSerializer(serializers.ModelSerializer):
    artisan = UserSerializer(read_only=True)
    
    class Meta:
        model = ArtisanSupport
        fields = '__all__'