from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.index, name='mainpage'),
    path('devblog', v.DevBlogList.as_view(), name='devblog'),
]
