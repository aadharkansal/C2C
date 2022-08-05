# Generated by Django 4.0.4 on 2022-08-05 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loan', '0005_loanbid_remove_loan_loan_request_accepted_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='loan',
            old_name='loan_repaid_date',
            new_name='loan_repayment_date',
        ),
        migrations.AddField(
            model_name='loanbid',
            name='amount_to_pay',
            field=models.FloatField(blank=True, null=True),
        ),
    ]