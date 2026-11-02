from django.db import models

class Employee(models.Model):
    
    ROLE_CHOICES=[
        ('EMPLOYEE','Employee'),
        ('TECHNICIAN','Technician'),
        ('ADMIN','Admin'),
    ]
    
    name=models.CharField(max_length=100)
    email=models.CharField(unique=True)
    department=models.CharField(max_length=100)
    designation=models.CharField(max_length=100)
    
    role=models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='EMPLOYEE'
    )
    
    created_at=models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.name

