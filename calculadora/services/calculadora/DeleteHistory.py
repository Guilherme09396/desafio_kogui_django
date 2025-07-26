from calculadora.models import Operacao

class DeleteHistory:
    def __init__(self, user):
        self.user = user
    
    def execute(self):
        operation = Operacao.objects.filter(idUser=self.user)
        operation.delete()