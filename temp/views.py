# Create your views here.

from django.http import HttpResponse
from django.shortcuts import render_to_response

import myowngallery.settings

def goodbye(request):
    
    return render_to_response("temp.html", 
                              {'var1': "Hello, fine world"})

def hello(request):
    return HttpResponse(myowngallery.settings.SITE_ROOT)
    return HttpResponse("Hello World")