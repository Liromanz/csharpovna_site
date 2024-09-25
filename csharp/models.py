from django.db import models

# Create your models here.


class Tags(models.Model):
    name = models.CharField(max_length=100, unique=True)


class News(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateField()
    tags = models.ManyToManyField(Tags)

