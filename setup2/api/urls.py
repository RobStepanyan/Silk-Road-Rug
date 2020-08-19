from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'rugs', views.RugViewSet, basename='rug')
urlpatterns = router.urls
