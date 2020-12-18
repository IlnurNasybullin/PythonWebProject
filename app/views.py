from django.shortcuts import render
from .models import get_tests
from app.service.map_generator import generate

def index(request):
    return render(request, 'main.html', {})


def calculator(request):
    return render(request, 'calculator.html', {})


def main(request):
    return index(request)


def tests(request):
    return render(request, 'test/test_main.html', {})


def expert_system(request):
    return render(request, 'expert_system.html', {})


def universities(request):
    generate()
    return render(request, 'review.html', {})


def test(request):
    tests = get_tests(15)
    return render(request, 'test/test.html', {"tests":tests})


def finish_test(request):
    return render(request, 'test/test_exit.html', {})