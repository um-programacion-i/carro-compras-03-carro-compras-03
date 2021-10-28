from rest_framework import serializers
from .models import CarrosCompra, Clientes, Usuario, ProductosComprados, Ventas


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'apellido', 'email',
                  'clave', 'tipo']
            

class ClienteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Clientes
        fields = ['direccion', 'telefono']


class ProductosCompradosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductosComprados
        fields = ['nombre', 'descripcion', 'claveProductoOriginal',
                  'precioVenta', 'cantidad']


class VentasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ventas
        fields = ['usuario', 'listado_de_productos', 'fechaDeVenta',
                  'idProductoComprado','precioTotal']


class CarrosCompraSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CarrosCompra
        fields = ['usuario', 'listado_de_productos', 
                  'cantidad_de_cada_producto', 'precioTotal']