from django.db import models

# Create your models here.
class Server(models.Model):
    name = models.CharField(max_length=100,null=False) 
    ip_address = models.CharField(null=False) 
    location = models.CharField(max_length=100) 
    description = models.TextField()
    tag = models.CharField(max_length=50) 
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True) 

    def __str__(self):
        return f"{self.name} - {self.ip_address}"

class Alert(models.Model):
    server_id = models.ForeignKey(Server, on_delete=models.CASCADE)
    SEVERITY_LEVEL = [
     ("low", "Low"),
    ("medium", "Medium"),
    ("critical", "Critical"),
    ]
    severity = models.CharField(max_length=10, choices=SEVERITY_LEVEL,default='low')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.server_id} - {self.severity} - {self.created_at}"


class ResourceUsage(models.Model):
    server_id = models.ForeignKey(Server, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    cpu_usage = models.FloatField()
    ram_usage = models.FloatField()
    disk_usage = models.FloatField()
    app_usage = models.FloatField()

    def __str__(self):
        return f"{self.server_id} - {self.timestamp} - CPU: {self.cpu_usage}% - RAM: {self.ram_usage}% - Disk: {self.disk_usage}% - App: {self.app_usage}%"

class NetworkTraffic(models.Model):
    server_id = models.ForeignKey(Server, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    incoming_traffic_mb = models.FloatField()

    def __str__(self):
        return f"{self.server_id} - {self.timestamp} - Incoming Traffic: {self.incoming_traffic_mb} MB"
    