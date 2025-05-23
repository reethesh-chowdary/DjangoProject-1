from django.urls import path
from .views import home, server_list, server_usage, server_usage_time, server_summary

urlpatterns = [
    path("", home),
    path("servers/", server_list),
    path("server/<int:server_id>/usage/", server_usage),
    path("server/<int:server_id>/use/", server_usage_time),
    path("server/<int:server_id>/alerts/summary/", server_summary),
]