# Generated by Django 3.2.9 on 2021-12-01 22:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0009_remove_distribuidor_productosid'),
    ]

    operations = [
        migrations.AddField(
            model_name='distribuidor',
            name='productosId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='producto.producto'),
        ),
    ]