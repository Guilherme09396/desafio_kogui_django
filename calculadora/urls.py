from django.urls import path
from . import views

app_name = 'calculator'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/register/', views.RegistroView.as_view(), name='register'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('calculator/', views.CalculatorView.as_view(), name='index'),
    path('calculator/result/', views.CalculationResultView.as_view(), name='result'),
    path('calculator/history/delete/', views.DeleteHistoryView.as_view(), name='deleteHistory'),
]