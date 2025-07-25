from calculadora.models import Operacao

class CriarOperacaoService:
    def __init__(self, parameters, result, user):
        self.parameters = parameters
        self.result = result
        self.user = user
    
    def execute(self):
        operacao = Operacao(parameters=self.parameters, result=self.result, idUser=self.user)
        operacao.save()