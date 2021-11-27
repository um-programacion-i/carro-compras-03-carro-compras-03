from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.serializers import Serializer
from .models import ProductosComprados, Ventas
from .serializer import VentasSerializer, ProductosCompradosSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
# Create your views here.

@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def getUnaCompra(req, pk):
    try:
        ventasProdId = Ventas.values_list("idProductoComprado", flat=True)
        if ventasProdId.__getitem__(int(pk)):
            ventas = Ventas.objects.get(pk=pk)
            return Response(ventas)
    except Ventas.DoesNotExist:
        return Response(status=404)

@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def getAllVentas(req):
    ventas = Ventas.objects.all()
    serializer = VentasSerializer(ventas, many=True)
    if serializer.is_valid():
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse(status=504)

@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def getUserCompra(req, usuario):
    ventas = Ventas.objects.filter(usuario=usuario)
    serializer = VentasSerializer(ventas, many=True)
    if serializer.is_valid():
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse(status=504)

@api_view(('GET',))
def getTodasCompras(req):
    try:
        compras = ProductosComprados.objects.all()
        serializer = ProductosCompradosSerializer(compras, many=True)
        return JsonResponse(serializer.data, safe=False)
    except:
        return Response(status=404)




