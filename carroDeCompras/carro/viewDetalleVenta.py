from django.http import HttpResponse, JsonResponse
from .models import DetalleVentas
from .serializer import DetalleVentasSerializer
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


@api_view(('GET', 'POST'))
@renderer_classes((JSONRenderer,))
def getAllVentas(req):
    if req.method == 'GET':
        ventas = DetalleVentas.objects.all().values()
        print(ventas)
        serializer = DetalleVentasSerializer(ventas, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif req.method == 'POST':
        data = JSONParser().parse(req)
        serializer = DetalleVentasSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return HttpResponse(status=204)


@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def getVentaByUsuario(req, id):
    ventas = DetalleVentas.objects.filter(usuario__id=id).values()
    serializer = DetalleVentasSerializer(ventas, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(('GET', 'PUT', 'DELETE'))
@renderer_classes((JSONRenderer,))
def ventasById(req, pk):
    try:
        print('Entro en la funciom')
        venta = [DetalleVentas.objects.get(pk=pk)]
    except DetalleVentas.DoesNotExist:
        return HttpResponse(status=404)
    if req.method == 'GET':
        serializer = DetalleVentasSerializer(venta, many=True)
        return JsonResponse(serializer.data[0], status=200, safe=False)
    if req.method == 'PUT':
        data = JSONParser().parse(req)
        serializer = DetalleVentasSerializer(venta, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data[0], status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        venta[0].delete()
        return HttpResponse(status=204)
