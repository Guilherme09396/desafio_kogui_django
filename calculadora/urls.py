from django.urls import path
from . import views

app_name = 'calculadora'

urlpatterns = [
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/register/', views.RegistroView.as_view(), name='registro'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('calculadora/', views.CalculadoraView.as_view(), name='index'),
    path('calculadora/resultado/', views.ResultadoCalculoView.as_view(), name='resultado'),
    path('calculadora/historico/apagar/', views.ApagarHistoricoView.as_view(), name='apagarHistorico'),
]