# Generated by Django 4.0.4 on 2022-07-06 18:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('loan', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='loan',
            name='applied_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loan_applied_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='loan',
            name='approved_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='loan_approved_by', to=settings.AUTH_USER_MODEL),
        ),
    ]