from django.db import models

class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=128)
    dtInclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome