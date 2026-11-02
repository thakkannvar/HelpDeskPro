from django.db import models
from employees.models import Employee


class Asset(models.Model):

    ASSET_TYPES = [
        ('LAPTOP', 'Laptop'),
        ('DESKTOP', 'Desktop'),
        ('PRINTER', 'Printer'),
        ('MONITOR', 'Monitor'),
    ]

    STATUS_CHOICES = [
        ('AVAILABLE', 'Available'),
        ('ASSIGNED', 'Assigned'),
        ('REPAIR', 'Under Repair'),
    ]

    asset_name = models.CharField(max_length=100)

    asset_type = models.CharField(
        max_length=20,
        choices=ASSET_TYPES
    )

    serial_number = models.CharField(max_length=100, unique=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='AVAILABLE'
    )

    assigned_to = models.ForeignKey(
        Employee,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.asset_name