from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Count
from .models import Alert, Server, ResourceUsage
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
def home(request):
    return Response("Hi there, this is the home page") 

@api_view(['GET'])
def server_list(request):
    servers = list(Server.objects.all())
    data = [] 
    for server in servers:
        data.append({
            "id": server.id,
            "name": server.name,
            "ip_address": server.ip_address,
            "location": server.location,
            "description": server.description,
            "tag": server.tag,
            "created_at": server.created_at
        })
    if len(data) > 0:
        return Response(data)
    else:
        return Response({"message": "There are no Servers Connected Yet"})

@api_view(['GET'])
def server_usage(request,server_id):
    if not server_id:
        return Response(
            "message: Server id is Required.."
    , status=400)

    server_required =  Server.objects.filter(id=server_id)

    if not server_required:
        return Response(
            {"message": f"No server found with ID {server_id}."},
            status=404
        )

    Usage_details = list(ResourceUsage.objects.filter(server_id = server_id).order_by('-timestamp'))
    data2 = []
    for i in Usage_details:
        data2.append({
            "timestamp": i.timestamp,
            "cpu_usage_percent": i.cpu_usage,
            "ram_usage_percent": i.ram_usage,
            "disk_usage_percent": i.disk_usage,
            "app_usage_percent": i.app_usage
        })
    if data2:
        
        return Response(data2)
    else:
        return Response("there is no usage is recorded yet")

@api_view(['GET'])
def server_usage_time(request,server_id):
    if not server_id:
        return Response(
            "message: Server id is Required.."
    , status=400)

    server_required =  Server.objects.filter(id=server_id)

    if not server_required:
        return Response(
            {"message": f"No server found with ID {server_id}."},
            status=404
        )

    Usage_details = list(ResourceUsage.objects.filter(server_id = server_id).order_by('-timestamp'))
    data3 = []
  
    for data in Usage_details:
        data3.append({
            "timestamp": data.timestamp,
            "cpu": data.cpu_usage,
            "ram": data.ram_usage,
            "disk": data.disk_usage,
            "app": data.app_usage
        })
    
    return Response({data3})
   

@api_view(['GET'])
def server_summary(request, server_id):
    if not server_id:
        return Response(
            {"message": "Server ID is required."},
            status=400
        )

    server = Server.objects.filter(id=server_id)
    if not server.exists():
        return Response(
            {"message": f"No server found with ID {server_id}."},
            status=404
        )

    alert_counts = Alert.objects.filter(server_id=server_id).values('severity').annotate(count=Count('severity'))
    
    summary = {"critical": 0, "medium": 0, "low": 0}
    for item in alert_counts:
        severity = item['severity']
        count = item['count']
        summary[severity] = count
    
    return Response(summary)
