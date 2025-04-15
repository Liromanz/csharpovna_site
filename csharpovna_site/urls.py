from django.contrib import admin
from django.urls import path, include
from csharp.sitemap import CsharpSitemap, MainStaticSitemap
from django.contrib.sitemaps.views import sitemap

sitemaps = {
    'csharp': CsharpSitemap,
    'main': MainStaticSitemap,
}

urlpatterns = [
    path('', include('main.urls')),
    path('csharp/', include('csharp.urls')),
    path('mypanel/', admin.site.urls),

    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
