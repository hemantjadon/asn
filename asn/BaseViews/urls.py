from django.conf.urls import include, url
from BaseViews.views import *

urlpatterns = [
    url(r'^$',HomePage,name='home_page'),
]