from django.conf.urls import include, url
from user.views import *

urlpatterns = [
    url(r'^accounts/login/$',LoginPage,name='log_in'),
    url(r'^accounts/logout/$',LogOut,name='log_out'),
    url(r'^fourms/$',FourmPage,name='fourm_page'),
    url(r'^events/$',EventPage,name='event_page'),
    url(r'^snippets/$',SnippetPage,name='snippet_page'),
    url(r'^schedule/$',SchedulePage,name='schedule_page'),
]
