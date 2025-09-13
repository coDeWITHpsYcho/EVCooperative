from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
from .models import CooperativeProduct, CooperativeOrder, ArtisanSupport
from .serializers import CooperativeProductSerializer, CooperativeOrderSerializer, ArtisanSupportSerializer

class CooperativeProductListView(generics.ListAPIView):
    serializer_class = CooperativeProductSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = CooperativeProduct.objects.filter(is_active=True)
        
        # Filter by product type
        product_type = self.request.query_params.get('type')
        if product_type:
            queryset = queryset.filter(product_type=product_type)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) |
                Q(craft_tradition__icontains=search)
            )
        
        # Filter by location
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(origin_village__icontains=location)
        
        return queryset.order_by('-created_at')

class CooperativeProductCreateView(generics.CreateAPIView):
    serializer_class = CooperativeProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(artisan=self.request.user)

class MyCooperativeProductsView(generics.ListAPIView):
    serializer_class = CooperativeProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return CooperativeProduct.objects.filter(artisan=self.request.user).order_by('-created_at')

class CooperativeOrderListCreateView(generics.ListCreateAPIView):
    serializer_class = CooperativeOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return CooperativeOrder.objects.filter(buyer=self.request.user).order_by('-ordered_at')
    
    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)

class ArtisanSupportView(generics.ListCreateAPIView):
    serializer_class = ArtisanSupportSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return ArtisanSupport.objects.filter(artisan=self.request.user).order_by('-requested_at')
    
    def perform_create(self, serializer):
        serializer.save(artisan=self.request.user)