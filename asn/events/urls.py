from django.conf.urls import url
from events.views import *

urlpatterns = [
    url(r'^$',EventPage,name='events_page'),
]
