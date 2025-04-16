from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class CsharpSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # Все маршруты из csharp/urls.py
        return [
            'variables',
            'converters',
            'datetime',
            'var',
            'transformation',
            'if',
            'cycles',
            'collections',
            'trycatch',
            'linq',
            'ternar',
            'regex',
            'readkey',
            'consoleuse',
            'arrowmenu',
            'methods',
            'classasmodel',
            'classascontainer',
            'modifiers',
            'staticclass',
            'files',
            'json',
            'xml',
            'directory',
            'process',
            'threads',
            'nasled',
            'interface',
            'abstractions',
            'polymorphism',
            'enum',
            'tests',
            'generic',
            'this',
        ]

    def location(self, item):
        return reverse(item)  # Без namespace

class MainStaticSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # Статические страницы из main/urls.py
        return ['devblog', 'aboutMe']  # Главная и devblog

    def location(self, item):
        return reverse(item)