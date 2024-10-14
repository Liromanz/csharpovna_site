from django.urls import path
from . import views as v

urlpatterns = [
    path('variables', v.variables, name='variables'),
    path('converters', v.converters, name='converters'),
    path('datetime', v.datetimes, name='datetime'),
    path('var', v.var, name='var'),
    path('transformation', v.transformation, name='transformation'),
    path('if', v.ifs, name='if'),
    path('cycles', v.cycles, name='cycles'),
    path('collections', v.collections, name='collections'),
    path('trycatch', v.trycatch, name='trycatch'),


    path('linq', v.linq, name='linq'),
    path('ternar', v.ternar, name='ternar'),


    path('readkey', v.readkey, name='readkey'),

]
