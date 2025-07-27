from calculadora.models import Usuario

class RegisterService():
    def __init__(self, name, email, password, password2):
        self.validate_fields_not_empty(name=name, email=email, password=password, password2=password2)
        self.user = None

    def validate_fields_not_empty(self, **kwargs):
        for key, value in kwargs.items():
            if not value:
                raise ValueError(f"Todos os campos devem ser preenchidos.")
            setattr(self, key, value)

    def verify_user_exists(self):
        email_exists = Usuario.objects.filter(email=self.user.email).exists()
        if email_exists:
            raise ValueError("Usuário já cadastrado com este e-mail")
        
    def verify_passwords_match(self):
        if self.password != self.password2:
            raise ValueError("As senhas não coincidem")

    def register(self):
        self.user = Usuario(
            name=self.name,
            email=self.email,
        )

        self.verify_user_exists()
        self.verify_passwords_match()
        self.user.set_password(self.password)
        self.user.save()
        print(f"Registrando usuário: {self.user.name} com e-mail: {self.user.email}")