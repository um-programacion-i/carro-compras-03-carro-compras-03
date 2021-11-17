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
        usuario = Usuario.objects.get(pk=pk)
    except Usuario.DoesNotExist:
        return HttpResponse(status=404)
    if req.method == 'GET':
        usuario = Usuario.objects.all()
        serializer = UsuarioSerializer(usuario, many=True)
        return Response(usuario)
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

def log_user(req):
    form = Usuario(req.POST or None)
    if form.method == 'POST':
        if form.is_valid():
            user = authenticate(username = form.cleaned_data['username'], password = form.cleaned_data['password'], tipo = form.cleaned_data['tipo'])
            if user is not None:
                return Response(status=200)
    return Response(status=404)
