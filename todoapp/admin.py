from django.contrib import admin
from .models import CreateNote
# Register your models here.

class CreateNoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')

admin.site.register(CreateNote, CreateNoteAdmin)