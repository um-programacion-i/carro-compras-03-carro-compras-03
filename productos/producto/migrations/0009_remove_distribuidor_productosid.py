# Generated by Django 3.2.9 on 2021-12-01 22:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0008_auto_20211201_1947'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='distribuidor',
            name='productosId',
        ),
    ]