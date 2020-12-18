from django.db import models
from django.conf import settings
import random


class Test(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    theme = models.CharField(max_length=30)
    question = models.TextField()

    answer_1 = models.CharField(max_length=50)
    answer_2 = models.CharField(max_length=50)
    answer_3 = models.CharField(max_length=50)
    answer_4 = models.CharField(max_length=50)

    right_answer = models.IntegerField()

    def __str__(self):
        return self.theme


def get_tests(count):
    tests = Test.objects.all()
    tests = random.sample(list(tests), count)
    return tests


class MapUniversity(models.Model):
    university = models.CharField(max_length=50)
    institute = models.CharField(max_length=75)
    latitude = models.FloatField()
    longitude = models.FloatField()
    color = models.CharField(max_length=15)
    href = models.TextField()

    class Meta:
        verbose_name = 'Map University'
        verbose_name_plural = 'Map Universities'

    def __str__(self):
        return self.university.__str__() + " " + self.institute.__str__()


def get_universities():
    return MapUniversity.objects.all()
