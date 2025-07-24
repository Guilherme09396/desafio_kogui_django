from django.shortcuts import render
from django.http import HttpResponse


def login_view(request):
    return HttpResponse("Hello, this is the login page!")