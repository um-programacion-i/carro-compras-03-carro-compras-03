from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=80)
    precio = models.IntegerField()
    distribuidor = models.CharField(max_length=50)
    cantidadVendido = models.IntegerField()

    def __str__(self) -> str:
        return (f'Producto: {self.nombre}, {self.descripcion}, {self.precio}, '
                f'{self.distribuidor}, {self.cantidadVendido}')

class Distribuidor(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=80)
    
    def __str__(self) -> str:
        return f'Distribuidor: {self.nombre}, {self.descripcion}'