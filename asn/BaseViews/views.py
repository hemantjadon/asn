from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

# Create your views here.

def HomePage(request):
    if(request.is_ajax() == False):
        return render(request,'HomePage/HomePage.html',{})

    else:
        return render(request,'HomePage/HomePage_ajax.html',{})
