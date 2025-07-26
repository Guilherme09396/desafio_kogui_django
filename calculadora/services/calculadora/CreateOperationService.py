from calculadora.models import Operacao

class CreateOperationService:
    def __init__(self, parameters, result, user):
        self.parameters = parameters
        self.result = result
        self.user = user
    
    def execute(self):
        operation = Operacao(parameters=self.parameters, result=self.result, idUser=self.user)
        operation.save()