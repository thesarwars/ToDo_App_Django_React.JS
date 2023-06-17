from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.CreateNoteView.as_view()),
    path('modify/<int:pk>', views.ModifyNoteView.as_view()),
]
