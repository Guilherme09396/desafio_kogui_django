from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View
from django.views.generic import DeleteView
from .services.usuario.RegisterService import RegisterService
from .services.usuario.LoginService import LoginService
from django.contrib import messages
from .services.calculadora.CreateOperationService import CreateOperationService
from .services.calculadora.OperationsLoggedInUser import OperationsLoggedInUser
from .services.calculadora.DeleteHistory import DeleteHistory
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import logout
import json

class HomeView(View):
    def get(self, request):
        return redirect(settings.HOME_URL)

class LoginView(View):
    template_name = 'login.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('senha')
        service = LoginService(email, password, request=request)
        try:
            service.execute()
            messages.success(request, "Login realizado com sucesso!")
            return redirect("calculator:index")
        except ValueError as e:
            messages.error(request, str(e))
            return redirect('calculator:login')
        

class RegistroView(View):
    template_name = 'register.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        try:
            name = request.POST.get('nome')
            email = request.POST.get('email')
            password = request.POST.get('senha')
            password2 = request.POST.get('senha2')
            service = RegisterService(name, email, password, password2)
            service.register()
            messages.success(request, "Usuário registrado com sucesso!")
            return redirect("calculator:login")
        except ValueError as e:
            messages.error(request, str(e))
            return redirect('calculator:register')

class LogoutView(View):
    def get(self, request):
        logout(request)
        messages.success(request, 'Usuário deslogado com sucesso!')
        return redirect('calculator:login')


class CalculatorView(LoginRequiredMixin, View):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.error(request, "Você precisa estar logado para acessar esta página.")
            return redirect(f"{self.get_login_url()}")
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request):
        service = OperationsLoggedInUser(request.user)
        operations = service.execute()
        return render(request, 'calculator.html', context={'operacoes': operations})
    
    def post(self, request):
        user = request.user
        body = json.loads(request.body)
        service = CreateOperationService(parameters=body['parametros'], result=body['resultado'], user=user)
        service.execute()
        return HttpResponse(status=201)
    

class CalculationResultView(LoginRequiredMixin, View):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.error(request, "Você precisa estar logado para acessar esta página.")
            return redirect(f"{self.get_login_url()}")
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request):
        service = OperationsLoggedInUser(request.user)
        operations = service.execute()
        if(not operations.exists()):
            lastOperationResult = 0
        else:
            lastOperationResult = operations[0].result
        return render(request, 'calculator.html', context={'operacoes': operations, 'result': lastOperationResult})
    
class DeleteHistoryView(LoginRequiredMixin, DeleteView):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.error(request, "Você precisa estar logado para acessar esta página.")
            return redirect(f"{self.get_login_url()}")
        return super().dispatch(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        service = DeleteHistory(request.user)
        try:
            service.execute()
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=500)
    