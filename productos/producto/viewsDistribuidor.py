from django.shortcuts import render
from .models import Distribuidor
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


def crearDistribuidor(req):
    nombre = req.POST['nombre']
    descripcion = req.POST['descripcion']
    prod = Distribuidor.objects.create(
        nombre=nombre, descripcion=descripcion
    )

def eliminarDistribuidor(req, codigo):
    distribuidor = Distribuidor.objects.get(id=codigo)
    distribuidor.delete()

def modificarDistribuidor(req, codigo):
    nombre = req.POST['nombre']
    descripcion = req.POST['descripcion']
    distribuidor = Distribuidor.objects.get(id = codigo)
    distribuidor.nombre = nombre
    distribuidor.descripcion = descripcion
    distribuidor.save()

def listarDistribuidor(req, codigo):
    try:
        distribuidor = Distribuidor.objects.get(id=codigo)
    except Distribuidor.DoesNotExist:
        return Response(status=404)
    if req.method == 'GET':
        distribuidor = Distribuidor.objects.all()
        return Response(distribuidor)
    if req.method == 'POST':
        distribuidor = Distribuidor(req.POST)
        if distribuidor.is_valid():
            return Response(distribuidor, status=status.HTTP_201_CREATED)
        return Response(distribuidor, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        distribuidor.delete()

