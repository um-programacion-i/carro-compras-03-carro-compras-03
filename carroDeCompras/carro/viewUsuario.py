from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Usuario
from .serializer import UsuarioSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
# Create your views here.

@api_view(('GET','POST',))
def usuario_list(req):
    if req.method == 'GET':
        usuario = Usuario.objects.all()
        serializer = UsuarioSerializer(usuario, many=True)
        return JsonResponse(serializer.data, safe=False)

    if req.method == 'POST':
        data = JSONParser().parse(req)
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return HttpResponse(status=204)

@api_view(('GET','PUT', 'DELETE'))
@renderer_classes((JSONRenderer,))
def listarusuarios(req, pk):
    try:
        usuario = [Usuario.objects.get(pk=pk)]
    except Usuario.DoesNotExist:
        return HttpResponse(status=404)
    if req.method == 'GET':
        #usuario = Usuario.objects.all()
        serializer = UsuarioSerializer(usuario, many=True)
        return JsonResponse(serializer.data[0], status=200, safe=False)
    if req.method == 'PUT':
        data = JSONParser().parse(req)
        serializer = UsuarioSerializer(usuario,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        usuario.delete()
        return HttpResponse(status = 204)

@api_view(('POST', ))
def log_user(req):
    if req.method == 'POST':
        data = JSONParser().parse(req)
        for values in data.values():
            nombre = values['nombre']
            clave = values['clave']
        if Usuario.objects.filter(nombre=nombre, clave=clave).exists():
            user = [Usuario.objects.get(nombre=nombre)]
            serializer = UsuarioSerializer(user, many=True)
            print(type(user))
            return JsonResponse(serializer.data[0], status=200, safe=False)
        return HttpResponse('No existe')
