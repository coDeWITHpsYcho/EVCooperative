from django.urls import path
from .views import (
    CooperativeProductListView, CooperativeProductCreateView,
    MyCooperativeProductsView, CooperativeOrderListCreateView,
    ArtisanSupportView
)

urlpatterns = [
    path('products/', CooperativeProductListView.as_view(), name='cooperative-product-list'),
    path('products/create/', CooperativeProductCreateView.as_view(), name='cooperative-product-create'),
    path('my-products/', MyCooperativeProductsView.as_view(), name='my-cooperative-products'),
    path('orders/', CooperativeOrderListCreateView.as_view(), name='cooperative-order-list-create'),
    path('support/', ArtisanSupportView.as_view(), name='artisan-support'),
]