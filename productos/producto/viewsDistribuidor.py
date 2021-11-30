from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from producto.serializer import DistribuidorSerializer
from .models import Distribuidor
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
# Create your views here.

@api_view(('GET',))
def distribuidor_list(req):
    distribuidor = Distribuidor.objects.all()
    serializer = DistribuidorSerializer(distribuidor, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(('POST',))
def postDistribuidor(req):
    data = JSONParser().parse(req)
    serializer = DistribuidorSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return JsonResponse(serializer.data, status=200)
    return Response(status=404)


@api_view(('GET','PUT', 'DELETE'))
@renderer_classes((JSONRenderer,))
def listarDistribuidor(req, pk):
    try:
        distribuidor = Distribuidor.objects.get(pk=pk)
    except Distribuidor.DoesNotExist:
        return HttpResponse(status=404)
    if req.method == 'GET':
        serializer = DistribuidorSerializer(distribuidor, many=True)
        return Response(distribuidor)
    if req.method == 'PUT':
        data = JSONParser().parse(req)
        serializer = DistribuidorSerializer(distribuidor,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        distribuidor.delete()
        return HttpResponse(status = 204)

@api_view(('PUT',))
def cambiarEstadoDist(req, pk):
    distribuidor = Distribuidor.objects.filter(pk=pk)
    for dist in distribuidor:
        if dist.disponible == False:
            distribuidor.update(disponible = True)
        elif dist.disponible == True:
            distribuidor.update(disponible = False)
    return HttpResponse(status=status.HTTP_201_CREATED)

