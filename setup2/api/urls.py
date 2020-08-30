from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView)

router = DefaultRouter()
router.register(r'rugs', views.RugViewSet, basename='rug')
urlpatterns = router.urls
urlpatterns += [
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/signup/', views.UserSignUpView.as_view(), name='signup')
]
