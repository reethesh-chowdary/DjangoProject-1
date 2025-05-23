from django.contrib import admin

# Register your models here.
from .models import Server, Alert, ResourceUsage, NetworkTraffic

admin.site.register(Server)
admin.site.register(Alert)  
admin.site.register(ResourceUsage)
admin.site.register(NetworkTraffic)