# Create your views here.

from django.http import HttpResponse

def goodbye(request):
    return HttpResponse("Goodbye, Cruel World")

def hello(request):
    return HttpResponse("Hello World")