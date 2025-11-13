from django.urls import path
from .views import register , login,error
urlpatterns = [
    path('register/',register,name='register'),
    path('login/',login,name='login'),
    path('error/',error,name='error')
    
]