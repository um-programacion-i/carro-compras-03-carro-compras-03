from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Usuario)
admin.site.register(ProductosComprados)
admin.site.register(Ventas)
admin.site.register(CarrosCompra)