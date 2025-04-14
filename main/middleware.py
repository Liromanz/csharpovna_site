from django.http import Http404
from django.shortcuts import render

class Custom404Middleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Проверяем, является ли ответ 404
        if response.status_code == 404:
            return render(request, 'base.html', status=404)
            # Или перенаправление:
            # from django.shortcuts import redirect
            # return redirect('home')
        return response

    def process_exception(self, request, exception):
        # Перехватываем исключение Http404
        if isinstance(exception, Http404):
            return render(request, 'base.html', status=404)
            # Или перенаправление:
            # return redirect('home')
        return None