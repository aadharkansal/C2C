# Generated by Django 4.0.4 on 2022-07-05 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_id_alter_userbankdata_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbankdata',
            name='wallet_balance',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]