from django.urls import path
from django.views.generic import TemplateView
from . import views as v

urlpatterns = [
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    path('', v.index, name='mainpage'),
    path('devblog', v.DevBlogList.as_view(), name='devblog'),
]
