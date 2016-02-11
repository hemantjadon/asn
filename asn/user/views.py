from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.conf import settings
from django.contrib.auth import login,logout,authenticate

from user.models import AuthUser,Email
# Create your views here.

def HomePage(request):
    if(request.is_ajax() == False):
        return render(request,'HomePage/HomePage.html',{})

    else:
        return render(request,'HomePage/HomePage_ajax.html',{})

def FourmPage(request):
    return HttpResponse("hello")


def EventPage(request):
    return HttpResponse("hello")

def SnippetPage(request):
    return HttpResponse("hello")

def SchedulePage(request):
    return HttpResponse("hello")
