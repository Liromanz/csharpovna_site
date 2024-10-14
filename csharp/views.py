from django.shortcuts import render

# Create your views here.

# ------------------------------------------------------------------------ Основы
def variables(request):
    return render(request, '1_Variables.html')


def converters(request):
    return render(request, '2_Converters.html')


def datetimes(request):
    return render(request, '3_Datetime.html')


def var(request):
    return render(request, '4_var.html')


def transformation(request):
    return render(request, '5_transformation.html')


def ifs(request):
    return render(request, '6_If.html')


def cycles(request):
    return render(request, '7_cycles.html')


def collections(request):
    return render(request, '8_collections.html')


def trycatch(request):
    return render(request, '9_trycatch.html')

# ------------------------------------------------------------------------ Упрощение кода


def linq(request):
    return render(request, '10_linq.html')

def ternar(request):
    return render(request, '11_ternar.html')