from django.db import models
from django.db.models.fields import EmailField

# Create your models here.
class Usuario(models.Model):
    nombre = models.CharField(max_length=30, unique=True)
    apellido = models.CharField(max_length=30)
    email = models.EmailField(max_length=60)
    clave = models.CharField(max_length=30)
    tipo = models.BooleanField()

    def __str__(self) -> str:
        return f'Usuario: {self.nombre}, {self.apellido}, {self.email}, {self.clave}, {self.tipo}'

    
class Clientes(models.Model):
    direccion = models.CharField(max_length=60)
    telefono = models.IntegerField()

    def __str__(self) -> str:
        return f'Clientes: {self.direccion}, {self.telefono}'

class ProductosComprados(models.Model):
    nombre = models.CharField(max_length=30, unique=True)
    descripcion = models.CharField(max_length=100, unique=True)
    precioVenta = models.FloatField(max_length=20)
    cantidad = models.IntegerField()

    def __str__(self) -> str:
        return f'Productos Comprados: {self.nombre},{self.descripcion},{self.precioVenta},{self.cantidad}'
    
class Ventas(models.Model):
    usuario = models.CharField(max_length=30, unique=True)
    listado_de_productos = models.CharField(max_length=40)
    fechaDeVenta = models.DateField()
    precioTotal = models.FloatField()

    def __str__(self) -> str:
        return (f'Ventas: {self.usuario}, {self.listado_de_productos}, '
                f'{self.fechaDeVenta}, {self.precioTotal}')

class CarrosCompra(models.Model):
    usuario = models.CharField(max_length=30, unique=True)
    listado_de_productos = models.CharField(max_length=40)
    cantidad_de_cada_producto = models.IntegerField()
    precioTotal = models.FloatField()
    
    def __str__(self) -> str:
        return (f'Carro de Compra: {self.usuario}, {self.listado_de_productos}, ' 
                f'{self.cantidad_de_cada_producto}, {self.precioTotal}')
