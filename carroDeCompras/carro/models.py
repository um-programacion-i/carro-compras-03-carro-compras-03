from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import datetime

# Create your models here.


class Usuario(models.Model):
    nombre = models.CharField(max_length=30, unique=True)
    apellido = models.CharField(max_length=30)
    email = models.EmailField(max_length=60)
    clave = models.CharField(max_length=30)
    tipo = models.BooleanField()
    disponible = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.nombre


class DetalleVentas(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    productosId = ArrayField(models.IntegerField(default=0))
    cantidad = ArrayField(models.IntegerField(default=0))
    precioTotal = models.FloatField()
    fechaDeVenta = models.DateField(
        default=datetime.today().strftime('%Y-%m-%d'))

    def __str__(self):
        return str(self.fechaDeVenta)


# Productos temporales que cada usuario agrega al carrito  (FALTA HACER VISTA)
class CarrosCompra(models.Model):
    usuario = models.IntegerField(null=True)
    productos = models.CharField(max_length=100, null=True)
    cantidad_de_producto = models.IntegerField(null=True)
    precioTotal = models.FloatField()
    def __str__(self) -> str:
        return str(self.id)
