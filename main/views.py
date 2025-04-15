from django.shortcuts import render
from .models import News, Tags
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

    def get_queryset(self):
        # Получаем базовый queryset
        queryset = super().get_queryset()
        # Проверяем, есть ли GET-параметр tag
        tag_name = self.request.GET.get('tag')
        if tag_name:
            # Фильтруем новости по тегу
            queryset = queryset.filter(tags__name=tag_name)
        return queryset

    def get_context_data(self, **kwargs):
        # Добавляем в контекст текущий тег и список всех тегов
        context = super().get_context_data(**kwargs)
        context['current_tag'] = self.request.GET.get('tag')
        context['all_tags'] = Tags.objects.all()  # Для отображения всех тегов
        return context
