from django.urls import path
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
]