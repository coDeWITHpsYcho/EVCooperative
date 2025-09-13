from django.urls import path
from .views import (
    CategoryListView, ProductListCreateView, ProductDetailView,
    MyProductsView, InquiryListCreateView
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('my-products/', MyProductsView.as_view(), name='my-products'),
    path('inquiries/', InquiryListCreateView.as_view(), name='inquiry-list-create'),
]