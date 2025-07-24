from django.urls import path
from . import views

app_name = 'calculadora'

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.RegistroView.as_view(), name='registro'),
]