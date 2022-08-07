# Generated by Django 4.0.4 on 2022-08-07 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loan', '0006_rename_loan_repaid_date_loan_loan_repayment_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='loan',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='loan',
            name='is_ready_to_pay',
            field=models.BooleanField(default=False),
        ),
    ]
