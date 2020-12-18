from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='main'),
    path('calculator', views.calculator, name='calculator'),
    path('tests', views.tests, name='tests'),
    path('test', views.test, name='test'),
    path('expert_system', views.expert_system, name='expert_system'),
    path('universities', views.universities, name='universities'),
    path("test/finish", views.finish_test, name="test_finish")
]