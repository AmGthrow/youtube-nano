# Generated by Django 5.1 on 2024-08-25 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("videos", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="video",
            name="thumbnail_file",
            field=models.ImageField(blank=True, upload_to="thumbnails/"),
        ),
    ]
