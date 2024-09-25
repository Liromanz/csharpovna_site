from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('main.urls')),
    path('csharp/', include('csharp.urls')),
    path('admin/', admin.site.urls),
]
