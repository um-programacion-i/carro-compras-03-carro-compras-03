from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Clientes
from .serializer import ClienteSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
# Create your views here.

@api_view(('GET','POST',))
def client_list(req):
    if req.method == 'GET':
        cliente = Clientes.objects.all()
        serializer = ClienteSerializer(cliente, many=True)
        return JsonResponse(serializer.data, safe=False)

    if req.method == 'POST':
        data = JSONParser().parse(req)
        serializer = ClienteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return HttpResponse(status=204)

@api_view(('GET','PUT', 'DELETE'))
@renderer_classes((JSONRenderer,))
def listarClientes(req, pk):
    try:
        cliente = Clientes.objects.get(pk=pk)
    except Clientes.DoesNotExist:
        return HttpResponse(status=404)
    if req.method == 'GET':
        serializer = ClienteSerializer(cliente, many=True)
        return Response(cliente)
    if req.method == 'PUT':
        data = JSONParser().parse(req)
        serializer = ClienteSerializer(cliente,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        cliente.delete()
        return HttpResponse(status = 204)

