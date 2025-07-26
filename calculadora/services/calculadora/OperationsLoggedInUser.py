from calculadora.models import Operacao

class OperationsLoggedInUser:
    def __init__(self, user):
        self.user = user
    
    def execute(self):
        operations = Operacao.objects.filter(idUser=self.user.id).order_by('-dtOfInclusion')
        return operations
