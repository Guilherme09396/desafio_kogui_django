from calculadora.models import Operacao
from datetime import datetime, timezone, timedelta

class OperacoesUsuarioLogado:
    def __init__(self, user):
        self.user = user
    
    def execute(self):
        operacoes = Operacao.objects.filter(idUser=self.user.id)
        return operacoes
