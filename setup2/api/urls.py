from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register(r'rugs', views.RugViewSet, basename='rug')
router.register(r'user/cart', views.CartItemViewSet, basename='cart')
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
    path('user/update/verify/', views.UserUpdateVerifyView.as_view()),
    path('user/change-pwd/', views.UserChangePwdView.as_view()),
    path('user/change-pwd/verify/', views.UserChangePwdVerifyView.as_view()),
    path('user/addresses/', views.UserAddressesView.as_view()),
    path('user/addresses/add/', views.UserAddressAddView.as_view()),
    path('user/addresses/delete/', views.UserAddressDeleteView.as_view()),
    path('user/addresses/edit/', views.UserAddressEditView.as_view()),
    path('user/address/', views.UserAddressGetView.as_view()),
    path('user/addresses/set-primary/',
         views.UserAddressSetPrimaryView.as_view()),
    path('validate/phone-number/', views.ValidatePhoneNumberView.as_view()),
]
