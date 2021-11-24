from rest_framework import serializers
from .models import CarrosCompra, Usuario, ProductosComprados, Ventas


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'apellido', 'email',
                  'clave', 'tipo']
            


class ProductosCompradosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductosComprados
        fields = ['nombre', 'descripcion', 'claveProductoOriginal',
                  'precioVenta', 'cantidad', 'usuario']


class VentasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ventas
        fields = ['usuario', 'listado_de_productos', 'fechaDeVenta',
                  'idProductoComprado','precioTotal']


class CarrosCompraSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CarrosCompra
        fields = ['usuario', 'producto', 
                  'cantidad_de_producto', 'precioTotal']