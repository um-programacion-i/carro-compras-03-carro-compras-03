# Generated by Django 3.2.9 on 2021-12-01 23:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0010_distribuidor_productosid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='distribuidor',
            name='productosId',
        ),
        migrations.AddField(
            model_name='producto',
            name='idDistribuidor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='producto.distribuidor'),
        ),
    ]
