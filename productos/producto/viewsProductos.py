from re import T
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from producto.serializer import ProductoSerializer
from .models import Distribuidor, Producto
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
# Create your views here.


@api_view(('GET',))
def productos_list(req):
    if req.method == 'GET':
        producto = Producto.objects.all()
        serializer = ProductoSerializer(producto, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(('POST',))
def postProducto(req):
    print(req)
    data = JSONParser().parse(req)
    print(data)
    serializer = ProductoSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return JsonResponse(serializer.data, status=200)
    return Response(status=404)


@api_view(('GET', 'PUT', 'DELETE'))
def listarProductos(req, pk):
    if req.method == 'GET':
        try:
            producto = [Producto.objects.get(pk=pk)]
        except Producto.DoesNotExist:
            return Response(status=404)
        #producto = Producto.objects.all()
        serializer = ProductoSerializer(producto, many=True)
        print(serializer.data[0])
        return Response(serializer.data[0], status=200)
    if req.method == 'PUT':
        print(pk)
        producto = Producto.objects.get(pk=pk)
        data = JSONParser().parse(req)
        print(data)
        serializer = ProductoSerializer(producto, data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response(status=404)
        print((producto))
        producto.delete()
        return Response(status=200)


@api_view(('PUT',))
def cambiarEstadoProd(req, pk):
    producto = Producto.objects.filter(pk=pk)
    print(pk)
    for prod in producto:
        if prod.disponible == False:
            print(prod.disponible)
            producto.update(disponible=True)
        elif prod.disponible == True:
            print(prod.disponible)
            producto.update(disponible=False)
    return HttpResponse(status=status.HTTP_201_CREATED)


@api_view(('GET',))
def distribuidorById(req, id):
    producto = Producto.objects.filter(idDistribuidor__id=id).values()
    serializer = ProductoSerializer(producto, many=True)
    return JsonResponse(serializer.data, status=200, safe=False)


@api_view(('GET',))
def getVariosProductos(red, listaIds):
    listaid = listaIds.split(sep=',')
    listaProductos = []
    print(listaIds)
    for pk in listaid:
        listaProductos.append(Producto.objects.get(pk=int(pk)))
    serializer = ProductoSerializer(listaProductos, many=True)
    print(serializer.data)
    return Response(serializer.data, status=200)
    
