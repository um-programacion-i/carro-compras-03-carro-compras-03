from django.db.models import fields
from rest_framework import serializers
from .models import Producto, Distribuidor


class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 
                  'idDistribuidor', 'cantidadVendido']

class DistribuidorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Distribuidor
        fields = ['nombre', 'descripcion']