from django.contrib import admin
from django.contrib.auth.models import Group
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(UserBankData)
admin.site.register(UserDocuments)


# UnRegistering packages inbuilt models
admin.site.unregister(Group)
admin.site.unregister(BlacklistedToken)
admin.site.unregister(OutstandingToken)