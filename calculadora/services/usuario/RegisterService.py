from calculadora.services.RegisterAbc import RegisterAbc
from calculadora.models import Usuario
from django.contrib.auth.hashers import make_password

class RegisterService(RegisterAbc):
    def __init__(self, **keyword_args):
        super().__init__(Usuario, **keyword_args)
        self.validate_fields_not_empty(keyword_args)
        self.user = None

    def validate_fields_not_empty(self, kwargs):
        for key, value in kwargs.items():
            if not value:
                raise ValueError(f"Todos os campos devem ser preenchidos.")

    def verify_user_exists(self):
        email_exists = Usuario.objects.filter(email=self.user.email).exists()
        if email_exists:
            raise ValueError("Usuário já cadastrado com este e-mail")
        
    def verify_passwords_match(self):
        if self.senha != self.senha2:
            raise ValueError("As senhas não coincidem")

    def register(self):
        self.user = Usuario(
            name=self.nome,
            email=self.email,
        )

        self.verify_user_exists()
        self.verify_passwords_match()
        self.user.set_password(self.senha)
        self.user.save()
        print(f"Registrando usuário: {self.user.name} com e-mail: {self.user.email}")