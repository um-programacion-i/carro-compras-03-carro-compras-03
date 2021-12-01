from django.db.models import fields
from rest_framework import serializers
from .models import Producto, Distribuidor


class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'disponible',
                  'idDistribuidor_id', 'cantidadVendido']


class DistribuidorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Distribuidor
        fields = ['id', 'nombre', 'descripcion', 'disponible']
