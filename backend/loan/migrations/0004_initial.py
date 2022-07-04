# Generated by Django 4.0.4 on 2022-07-04 18:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('loan', '0003_remove_userdata_aadhaar_card_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, max_length=100, null=True)),
                ('amount', models.BigIntegerField()),
                ('tenure', models.IntegerField()),
                ('interest', models.FloatField()),
                ('is_approved', models.BooleanField(default=False)),
                ('applied_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loan_applied_by', to=settings.AUTH_USER_MODEL)),
                ('approved_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='loan_approved_by', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
