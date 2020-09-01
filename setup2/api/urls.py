from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register(r'rugs', views.RugViewSet, basename='rug')
urlpatterns = router.urls
urlpatterns += [
    path('auth/login/', views.LogInView.as_view(), name='login'),
    path('auth/signup/', views.SignUpView.as_view(), name='signup'),
    # path('auth/logout/', views.LogOutView.as_view(), name='logout')
]
