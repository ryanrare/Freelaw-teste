# Generated by Django 5.0.4 on 2024-04-24 21:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='sent_by',
        ),
        migrations.AlterModelTable(
            name='notification',
            table='notification',
        ),
        migrations.AlterModelTable(
            name='usereventnotification',
            table='user_event_notification',
        ),
    ]