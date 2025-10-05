# Generated migration to remove order field from Frame model

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="frame",
            options={"ordering": ["id"]},
        ),
        migrations.RemoveField(
            model_name="frame",
            name="order",
        ),
    ]
