# Generated by Django 3.2.8 on 2021-11-25 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0004_rename_distribuidor_producto_iddistribuidor'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='disponible',
            field=models.BooleanField(default=False),
        ),
    ]