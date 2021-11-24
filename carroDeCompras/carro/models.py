from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.apps import apps

# Create your models here.
class Usuario(models.Model):
    nombre = models.CharField(max_length=30, unique=True)
    apellido = models.CharField(max_length=30)
    email = models.EmailField(max_length=60)
    clave = models.CharField(max_length=30)
    tipo = models.BooleanField()

    def __str__(self) -> str:
        return self.nombre

# Historial de productos comprados    
class ProductosComprados(models.Model):
    #modelo = apps.get_model(app_label='productos', model_name='Producto')
    nombre = models.CharField(max_length=30, unique=True)
    descripcion = models.CharField(max_length=100, unique=True)
    claveProductoOriginal = models.IntegerField()
    precioVenta = models.FloatField(max_length=20)
    cantidad = models.IntegerField(default="", editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return self.nombre
    
class Ventas(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    listado_de_productos = ArrayField(models.CharField(max_length=30))
    fechaDeVenta = models.DateField()
    idProductoComprado = models.ForeignKey(ProductosComprados, on_delete=models.SET_NULL, null=True)
    precioTotal = models.FloatField()

    def __str__(self) -> str:
        return self.precioTotal

#Productos temporales que cada usuario agrega al carrito  (FALTA HACER VISTA)
class CarrosCompra(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    producto = models.CharField(max_length=100, null=True)
    cantidad_de_producto = models.IntegerField(null=True)
    precioTotal = models.FloatField()
    
    def __str__(self) -> str:
        return self.id