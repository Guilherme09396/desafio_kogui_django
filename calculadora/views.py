from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View
from .services.usuario.RegisterService import RegisterService
from .services.usuario.LoginService import LoginService
from django.contrib import messages

class LoginView(View):
    template_name = 'login.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        service = LoginService(email=email, senha=senha, request=request)
        try:
            service.login()
            messages.success(request, "Login realizado com sucesso!")
            return redirect("calculadora:index")
        except ValueError as e:
            messages.error(request, str(e))
            return redirect('calculadora:login')
        

class RegistroView(View):
    template_name = 'registro.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        try:
            nome = request.POST.get('nome')
            email = request.POST.get('email')
            senha = request.POST.get('senha')
            senha2 = request.POST.get('senha2')
            service = RegisterService(nome=nome, email=email, senha=senha, senha2=senha2)
            service.register()
            messages.success(request, "Usuário registrado com sucesso!")
            return redirect("calculadora:login")
        except ValueError as e:
            messages.error(request, str(e))
            return redirect('calculadora:registro')

class CalculadoraView(View):
    def get(self, request):
        return render(request, 'calculadora.html')