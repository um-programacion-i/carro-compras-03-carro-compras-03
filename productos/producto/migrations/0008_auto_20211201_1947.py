# Generated by Django 3.2.9 on 2021-12-01 22:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0007_distribuidor_disponible'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='idDistribuidor',
        ),
        migrations.AddField(
            model_name='distribuidor',
            name='productosId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='producto.producto'),
        ),
    ]