from rest_framework import serializers
from .models import CarrosCompra, Usuario, ProductosComprados, Ventas


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','nombre', 'apellido', 'email',
                  'clave', 'tipo', 'disponible']
            


class ProductosCompradosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductosComprados
        fields = ['id','nombre', 'descripcion', 'claveProductoOriginal',
                  'precioVenta', 'cantidad', 'usuario']


class VentasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ventas
        fields = ['fechaDeVenta','idProductoComprado','precioTotal']


class CarrosCompraSerializer(serializers.HyperlinkedModelSerializer):
    usuario = serializers.IntegerField(source = 'usuario.id')
    class Meta:
        model = CarrosCompra
        fields = ['usuario', 'producto', 
                  'cantidad_de_producto', 'precioTotal']