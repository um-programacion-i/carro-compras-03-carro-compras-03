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
    path('ventasRangoFecha/<str:fechaInicial>/<str:fechaFinal>/', viewDetalleVenta.ventasRangoFecha),
    path('ventasAño/', viewDetalleVenta.ventasAño),
    path('ventasMesCorriente/', viewDetalleVenta.ventasMesCorriente),
    path('ventasUltimosTreintaDias/', viewDetalleVenta.ventasUltimosTreintaDias),
    path('carrito/', viewCarrosCompra.carritoList),
    path('singlecarrito/<int:pk>/', viewCarrosCompra.un_carrito),
]
