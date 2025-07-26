from calculadora.models import Operacao

class ApagarHistorico:
    def __init__(self, user):
        self.user = user
    
    def execute(self):
        operacao = Operacao.objects.filter(idUser=self.user)
        operacao.delete()