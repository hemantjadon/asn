from django.contrib import admin
from user.models import *

# Register your models here.

admin.site.register(AuthUser)
admin.site.register(UserProfile)
admin.site.register(Email)
