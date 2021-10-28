from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from producto.serializer import ProductoSerializer
from .models import Producto
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
# Create your views here.

@api_view(('GET','POST',))
def productos_list(req):
    if req.method == 'GET':
        producto = Producto.objects.all()
        serializer = ProductoSerializer(producto, many=True)
        return JsonResponse(serializer.data, safe=False)

    if req.method == 'POST':
        data = JSONParser().parse(req)
        serializer = ProductoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return Response(status=404)

@api_view(('GET','PUT', 'DELETE'))
@renderer_classes((JSONRenderer,))
def listarProductos(req, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except Producto.DoesNotExist:
        return Response(status=404)
    if req.method == 'GET':
        producto = Producto.objects.all()
        serializer = ProductoSerializer(producto, many=True)
        return Response(producto, status=200)
    if req.method == 'PUT':
        data = JSONParser().parse(req)
        serializer = ProductoSerializer(producto, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        producto.delete()
        return Response(status=200)

