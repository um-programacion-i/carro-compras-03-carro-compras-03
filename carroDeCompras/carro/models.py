from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.apps import apps
from django.db.models.fields import IntegerField

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

# Historial de productos comprados    
class ProductosComprados(models.Model):
    #modelo = apps.get_model(app_label='productos', model_name='Producto')
    nombre = models.CharField(max_length=30, unique=True)
    descripcion = models.CharField(max_length=100)
    claveProductoOriginal = models.IntegerField()
    precioVenta = models.FloatField(max_length=20)
    cantidad = models.IntegerField()
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    def __str__(self) -> str:
        return self.nombre
    
class Ventas(models.Model):
    fechaDeVenta = models.DateField()
    idProductoComprado = models.ForeignKey(ProductosComprados, on_delete=models.SET_NULL, null=True)
    precioTotal = models.FloatField()
    def __str__(self) -> str:
        return self.precioTotal

#Productos temporales que cada usuario agrega al carrito  (FALTA HACER VISTA)
class CarrosCompra(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    listaProductos = ArrayField(models.CharField(max_length=100))
    cantidad_de_producto = ArrayField(models.IntegerField())
    precioTotal = models.FloatField()
    def __str__(self) -> str:
        return self.id