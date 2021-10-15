from django.shortcuts import render
from .models import Producto
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


def crear_productos(req):
    nombre = req.POST['nombre']
    descripcion = req.POST['descripcion']
    precio = req.POST['precio']
    distribuidor = req.POST['distribuidor']
    cantidadVendido = req.POST['cantidadVendida']
    prod = Producto.objects.create(
        nombre=nombre, descripcion=descripcion,
        precio=precio, distribuidor=distribuidor,
        cantidadVendido = cantidadVendido
    )

def eliminarProducto(req, codigo):
    producto = Producto.objects.get(id=codigo)
    producto.delete()

def modificarProducto(req, codigo):
    nombre = req.POST['nombre']
    descripcion = req.POST['descripcion']
    precio = req.POST['precio']
    distribuidor = req.POST['distribuidor']
    producto = Producto.objects.get(id = codigo)

def listarProducto(req, codigo):
    try:
        productos = Producto.objects.get(id=codigo)
    except Producto.DoesNotExist:
        return Response(status=404)
    if req.method == 'GET':
        productos = Producto.objects.all()
        return Response(productos, status=200)
    if req.method == 'POST':
        producto = Producto(req.POST)
        if producto.is_valid():
            return Response(producto, status=status.HTTP_201_CREATED)
        return Response(producto, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        productos.delete()

