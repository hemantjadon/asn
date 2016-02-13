from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse,JsonResponse

from BaseViews import home_page_ajax_file as ajax_files
# Create your views here.

def HomePage(request):
    if(request.is_ajax() == False):
        return render(request,'HomePage/HomePage.html',{})

    else:
        response = {}
        response["stylesheets"] = ajax_files.stylesheets
        response["top_scripts"] = ajax_files.top_scripts
        response["bottom_scripts"] = ajax_files.bottom_scripts
        response["rendered_string"] = render_to_string("HomePage/HomePage_ajax.html",{"request":request})
        response["new_page_location"] = "home"
        response["new_page_title"] = "ASN | Home"
        response["new_page_url"] = request.build_absolute_uri()
        return JsonResponse(response)
