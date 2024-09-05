from django.contrib import admin
from api.users.models import CustomUser, UserEmailVerification
from .models import *

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(UserEmailVerification)
