from django.http import HttpResponse, JsonResponse
from .models import CarrosCompra
from .serializer import CarrosCompraSerializer
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


@api_view(('GET', 'POST'))
# Lista todos los items agregados al carrito
def carritoList(req):
    if req.method == 'GET':
        carrito = CarrosCompra.objects.all()
        serializer = CarrosCompraSerializer(carrito, many=True)
        return JsonResponse(serializer.data, safe=False)

    if req.method == 'POST':
        data = JSONParser().parse(req)
        serializer = CarrosCompraSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return HttpResponse(status=204)


@api_view(('GET', 'PUT', 'DELETE'))
@renderer_classes((JSONRenderer,))
def un_carrito(req, pk):
    try:
        carrito = CarrosCompra.objects.get(pk=pk)
    except CarrosCompra.DoesNotExist:
        return HttpResponse(status=404)

    if req.method == 'GET':
        serializer = CarrosCompraSerializer([carrito], many=True)
        return JsonResponse(serializer.data[0], status=200, safe=False)

    elif req.method == 'PUT':
        data = JSONParser().parse(req)
        print(carrito)
        serializer = CarrosCompraSerializer(carrito, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif req.method == 'DELETE':
        carrito.delete()
        return HttpResponse(status=204)

@api_view(('GET',))
def carritoByUser(req, id_user):
    carrito = CarrosCompra.objects.filter(usuario = id_user).values()
    serializer = CarrosCompraSerializer(carrito, many=True)
    return JsonResponse(serializer.data, status=200, safe=False)