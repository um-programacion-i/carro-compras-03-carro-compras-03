from django.db import models


class Distribuidor(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    disponible = models.BooleanField(default=True)

    def __str__(self) -> str:
        return str(self.nombre)


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    precio = models.IntegerField()
    disponible = models.BooleanField(default=True)
    idDistribuidor = models.ForeignKey(
        Distribuidor, on_delete=models.SET_NULL, null=True)
    cantidadVendido = models.IntegerField()

    def __str__(self) -> str:
        return str(self.nombre)
