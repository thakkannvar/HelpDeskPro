from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('employees.urls')),

    path('api/', include('tickets.urls')),

    path('api/', include('assets.urls')),
]