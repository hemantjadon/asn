from django.conf.urls import include, url
from blogs.views import *

urlpatterns = [
    url(r'^$',BlogPage,name='blog_page'),
    url(r'^get-all/$',GetAllBlogs,name='get_all_blogs'),
]
