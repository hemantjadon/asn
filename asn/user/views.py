from django.shortcuts import render,redirect
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.conf import settings
from django.contrib.auth import login,logout,authenticate

from user.models import AuthUser,Email
# Create your views here.

def LoginPage(request):
    return render(request,"LoginPage/loginpage.html")

def LogOut(request):
    logout(request)
    return redirect(reverse('home_page'))

def FourmPage(request):
    return HttpResponse("hello")


def EventPage(request):
    return HttpResponse("hello")

def SnippetPage(request):
    return HttpResponse("hello")

def SchedulePage(request):
    return HttpResponse("hello")
