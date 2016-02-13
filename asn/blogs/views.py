from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse,JsonResponse
from django.contrib.humanize.templatetags.humanize import naturalday,naturaltime
from django.contrib.staticfiles.templatetags.staticfiles import static
from blogs.models import *

from blogs import ajax_files
# Create your views here.

def BlogPage(request):
    blogs = Blog.objects.all()
    if (request.is_ajax() == False):
        return render(request,"BlogPage/BlogPage.html",{})

    else:
        response = {}
        response["stylesheets"]=ajax_files.stylesheets
        response["top_scripts"]=ajax_files.top_scripts
        response["scripts"]=ajax_files.scripts
        response["rendered_string"]=render_to_string("BlogPage/BlogPage_ajax.html",{"request":request})
        return JsonResponse(response)

def GetAllBlogs(request):
    blogs = Blog.objects.all()
    blog_list = []

    for blog in blogs:
        b = {}
        b["id"] = blog.pk
        b["title"] = blog.title
        b["author"] = blog.author.name
        b["content"] = blog.content
        b["timestamp"] = naturaltime(blog.timestamp)
        blog_list.append(b)

    return JsonResponse(blog_list,safe=False)
