from django.urls import path
from carro import viewCliente, viewProdComp, viewUsuario


urlpatterns = [
    path('users/', viewUsuario.usuario_list),
    path('singleuser/<int:pk>/', viewUsuario.listarusuarios),
    path('log/', viewUsuario.log_user),
    path('clients/', viewCliente.client_list),
    path('singleclient/<int:pk>/', viewCliente.client_list),
    path('products/', viewProdComp.getTodasCompras),
    path('singleproduct/<int:pk>/', viewProdComp.getUnaCompra),
]