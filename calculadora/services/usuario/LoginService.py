from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import mask_hash
from calculadora.models import Usuario

class LoginService:
    def __init__(self, email, senha, request):
        self.email = email
        self.senha = senha
        self.request = request

    def login(self):
        auth = authenticate(request=self.request, email=self.email, password=self.senha)
        if auth is not None:
            login(self.request, auth)
            return
        
        raise ValueError("Usuário ou senha inválidos")