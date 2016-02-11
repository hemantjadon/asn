from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.contrib.humanize.templatetags.humanize import naturalday,naturaltime
from blogs.models import *
# Create your views here.

def BlogPage(request):
    blogs = Blog.objects.all()
    if (request.is_ajax() == False):
        return render(request,'BlogPage/BlogPage.html',{"blogs":blogs})
    else:
        return render(request,'BlogPage/BlogPage_ajax.html',{"blogs":blogs})

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
