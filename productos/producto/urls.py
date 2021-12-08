from django.urls import path
from producto.viewsDistribuidor import *
from producto.viewsProductos import *

urlpatterns = [
    path('distribuidores/', distribuidor_list),
    path('tomar_uno_dist/<int:pk>/', listarDistribuidor),
    path('productos/', productos_list),
    path('postDistribuidor/', postDistribuidor),
    path('postProducto/', postProducto),
    path('tomar_uno_prod/<int:pk>/', listarProductos),
    path('cambiarestadoProd/<int:pk>/', cambiarEstadoProd),
    path('cambiarestadoDist/<int:pk>/', cambiarEstadoDist),
    path('distribuidorById/<int:id>/', distribuidorById),
    path('getVariosProductos/<str:listaIds>/', getVariosProductos),
    path('getDisponibles/', getProductosDisponibles),
]
