# Generated by Django 4.2.2 on 2023-06-17 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("todoapp", "0002_alter_createnote_created_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="createnote",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="createnote",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
