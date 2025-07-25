from calculadora.models import Operacao

class CriarOperacaoService:
    def __init__(self, parametros, resultado):
        self.parametros = parametros
        self.resultado = resultado
    
    def execute(self):
        operacao = Operacao(parametros=self.parametros, resultado=self.resultado)
        operacao.save()