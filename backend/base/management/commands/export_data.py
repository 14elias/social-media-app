import json
from django.core.management.base import BaseCommand
from django.apps import apps
from django.core.serializers import serialize

class Command(BaseCommand):
    help = "Export all data to a JSON file"

    def handle(self, *args, **kwargs):
        data_dict = {}

        # Get all models
        all_models = apps.get_models()

        for model in all_models:
            model_name = model._meta.label  # Get app_name.ModelName
            data_dict[model_name] = json.loads(serialize("json", model.objects.all(), ensure_ascii=False))

        # Save data to JSON file
        with open("data.json", "w", encoding="utf-8") as f:
            json.dump(data_dict, f, indent=2, ensure_ascii=False)

        self.stdout.write(self.style.SUCCESS("Data successfully exported to data.json"))
