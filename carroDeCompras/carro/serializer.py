from rest_framework import serializers
from .models import CarrosCompra, DetalleVentas, Usuario


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'apellido', 'email',
                  'clave', 'tipo', 'disponible']

class DetalleVentasSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = DetalleVentas
        fields = ['id', 'usuario_id', 'productosId', 'cantidad', 'precioTotal',
                  'fechaDeVenta']


class CarrosCompraSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CarrosCompra
        fields = ['usuario_id', 'productos',
                  'cantidad_de_producto', 'precioTotal']
