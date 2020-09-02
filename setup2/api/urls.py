from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register(r'rugs', views.RugViewSet, basename='rug')
urlpatterns = router.urls
urlpatterns += [
    path('auth/login/', views.LogInView.as_view()),
    path('auth/signup/', views.SignUpView.as_view()),
    path('auth/signup-verify/', views.SignUpVerifyView.as_view()),
    # path('auth/logout/', views.LogOutView.as_view(), name='logout')
]
