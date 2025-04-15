from django.db import models

# Create your models here.


class Tags(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class News(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateField(auto_now=True)
    tags = models.ManyToManyField(Tags)

    def __str__(self):
        return f'{self.title} {self.date}'

