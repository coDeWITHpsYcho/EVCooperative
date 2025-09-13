from django.contrib import admin
from .models import Category, Product, ProductImage, Inquiry

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'is_active', 'created_at')
    list_filter = ('is_active', 'parent')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'seller', 'category', 'price', 'condition', 'is_active', 'created_at')
    list_filter = ('condition', 'is_active', 'is_sold', 'category')
    search_fields = ('title', 'seller__username', 'description')
    inlines = [ProductImageInline]

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('product', 'buyer', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('product__title', 'buyer__username')
