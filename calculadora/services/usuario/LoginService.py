from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import mask_hash
from calculadora.models import Usuario

class LoginService:
    def __init__(self, email, password, request):
        self.email = email
        self.password = password
        self.request = request

    def execute(self):
        auth = authenticate(request=self.request, email=self.email, password=self.password)
        if auth is not None:
            login(self.request, auth)
            return
        
        raise ValueError("Usuário ou senha inválidos")