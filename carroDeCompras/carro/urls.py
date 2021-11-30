from django.urls import path
from rest_framework import views
from carro import viewProdComp, viewUsuario, viewCarrosCompra


urlpatterns = [
    path('users/', viewUsuario.usuario_list),
    path('singleuser/<int:pk>/', viewUsuario.listarusuarios),
    path('log/', viewUsuario.log_user),
    path('cambiarEstadoUsuario/<int:pk>/', viewUsuario.cambiarEstadoUsuario),
    path('products/', viewProdComp.getTodasCompras),
    path('singleproduct/<int:pk>/', viewProdComp.getUnaCompra),
    path('carrito/', viewCarrosCompra.carritoList),
    path('singlecarrito/<int:pk>/', viewCarrosCompra.un_carrito),
    path('productoComprado/', viewProdComp.postProductoComprado),
    path('getVentas/', viewProdComp.getAllVentas),
    path('postVentas/', viewProdComp.postVentas),
    path('getdetalleventa/<int:pk>/', viewProdComp.getDetalleVenta)
]