from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View
from .services.usuario.RegisterService import RegisterService
from .services.usuario.LoginService import LoginService
from django.contrib import messages
from .services.calculadora.CriarOperacaoService import CriarOperacaoService
from .services.calculadora.OperacoesUsuarioLogado import OperacoesUsuarioLogado
from django.contrib.auth.mixins import LoginRequiredMixin
import json

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

class CalculadoraView(LoginRequiredMixin, View):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.error(request, "Você precisa estar logado para acessar esta página.")
            return redirect(f"{self.get_login_url()}")
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request):
        service = OperacoesUsuarioLogado(request.user)
        operacoes = service.execute()
        return render(request, 'calculadora.html', context={'operacoes': operacoes})
    
    def post(self, request):
        user = request.user
        body = json.loads(request.body)
        service = CriarOperacaoService(parameters=body['parametros'], result=body['resultado'], user=user)
        service.execute()
        return HttpResponse(status=201)
    

class ResultadoCalculoView(LoginRequiredMixin, View):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.error(request, "Você precisa estar logado para acessar esta página.")
            return redirect(f"{self.get_login_url()}")
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request):
        service = OperacoesUsuarioLogado(request.user)
        operacoes = service.execute()
        resultadoUltimaOperacao = operacoes[0].result
        return render(request, 'calculadora.html', context={'operacoes': operacoes, 'result': resultadoUltimaOperacao})
    