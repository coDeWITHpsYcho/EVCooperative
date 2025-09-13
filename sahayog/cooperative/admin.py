from django.contrib import admin
from .models import CooperativeProduct, CooperativeProductImage, CooperativeOrder, ArtisanSupport

class CooperativeProductImageInline(admin.TabularInline):
    model = CooperativeProductImage
    extra = 1

@admin.register(CooperativeProduct)
class CooperativeProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'artisan', 'product_type', 'price', 'origin_village', 'is_active', 'created_at')
    list_filter = ('product_type', 'is_active', 'is_featured', 'is_certified_organic')
    search_fields = ('name', 'artisan__username', 'craft_tradition', 'origin_village')
    inlines = [CooperativeProductImageInline]

@admin.register(CooperativeOrder)
class CooperativeOrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'buyer', 'product', 'quantity', 'total_amount', 'status', 'ordered_at')
    list_filter = ('status', 'ordered_at')
    search_fields = ('buyer__username', 'product__name')

@admin.register(ArtisanSupport)
class ArtisanSupportAdmin(admin.ModelAdmin):
    list_display = ('artisan', 'support_type', 'amount_requested', 'is_approved', 'requested_at')
    list_filter = ('support_type', 'is_approved', 'is_completed')
    search_fields = ('artisan__username', 'description')
    
    actions = ['approve_requests']
    
    def approve_requests(self, request, queryset):
        from django.utils import timezone
        queryset.update(is_approved=True, approved_at=timezone.now())
    approve_requests.short_description = "Approve selected requests"