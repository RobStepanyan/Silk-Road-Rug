from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register(r'rugs', views.RugViewSet, basename='rug')
urlpatterns = router.urls
urlpatterns += [
    path('auth/login/', views.LogInView.as_view()),
    path('auth/signup/', views.SignUpView.as_view()),
    path('auth/signup-verify/', views.SignUpVerifyView.as_view()),
    path('auth/forgot/input-email/', views.ForgotInputEmail.as_view()),
    path('auth/forgot/input-new-pwd/', views.ForgotInputNewPwd.as_view()),
    path('auth/forgot/verify-token/', views.SignUpVerifyView.as_view()),
    # path('auth/logout/', views.LogOutView.as_view(), name='logout')
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),
    path('user/details/', views.UserDetailsView.as_view()),
    path('user/update/personal-info/', views.UserUpdateView.as_view()),
]
