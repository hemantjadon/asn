from django.shortcuts import render

# Create your views here.

def EventPage(request):
    return render(request,'EventPage/eventpage.html',{})
