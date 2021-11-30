from django.urls import path
from carro import viewDetalleVenta, viewUsuario, viewCarrosCompra


urlpatterns = [
    path('users/', viewUsuario.usuario_list),
    path('singleuser/<int:pk>/', viewUsuario.listarusuarios),
    path('log/', viewUsuario.log_user),
    path('cambiarEstadoUsuario/<int:pk>/', viewUsuario.cambiarEstadoUsuario),
    path('ventas/', viewDetalleVenta.getAllVentas),
    path('ventasByUsuario/<int:id>/', viewDetalleVenta.getVentaByUsuario),
    path('ventasById/<int:pk>/', viewDetalleVenta.ventasById),
    path('carrito/', viewCarrosCompra.carritoList),
    path('singlecarrito/<int:pk>/', viewCarrosCompra.un_carrito),
]
