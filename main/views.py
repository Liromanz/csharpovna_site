from django.shortcuts import render
from .models import News
from django.views.generic import ListView

# Create your views here.


def index(request):
    context = {'show_previous_page': False, 'show_next_page': False}
    return render(request, 'index.html', context)


class DevBlogList(ListView):
    model = News
    template_name = "devBlog.html"
    queryset = News.objects.all().order_by('-date')
    paginate_by = 10
    allow_empty = True
    extra_context = {'show_previous_page': False, 'show_next_page': False}
