from django.shortcuts import render

# Create your views here.

# ------------------------------------------------------------------------ Основы
def variables(request):
    context = {'show_previous_page': False, 'show_next_page': True}
    return render(request, '1_Variables.html', context)


def converters(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '2_Converters.html', context)


def datetimes(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '3_Datetime.html', context)


def var(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '4_var.html', context)


def transformation(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '5_transformation.html', context)


def ifs(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '6_If.html', context)


def cycles(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '7_cycles.html', context)


def collections(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '8_collections.html', context)


def trycatch(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '9_trycatch.html', context)

# ------------------------------------------------------------------------ Упрощение кода


def linq(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '10_linq.html', context)


def ternar(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '11_ternar.html', context)


def regex(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '12_regex.html', context)


# ------------------------------------------------------------------------ Работа с консолью


def readkey(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '13_readkey.html', context)


def consoleuse(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '14_consoleuse.html', context)


def arrowmenu(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '15_arrowmenu.html', context)


# ------------------------------------------------------------------------ Классы


def methods(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '16_methods.html', context)


def classasmodel(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '17_classasmodel.html', context)


def classascontainer(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '18_classascontainer.html', context)


def modifiers(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '19_modifiers.html', context)


def staticclass(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '20_staticclass.html', context)


# ------------------------------------------------------------------------ Классы


def files(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '21_files.html', context)


def jsonfile(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '22_json.html', context)


def xmlfile(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '23_xml.html', context)


def directory(request):
    context = {'show_previous_page': True, 'show_next_page': True}
    return render(request, '24_directory.html', context)


def process(request):
    context = {'show_previous_page': True, 'show_next_page': False}
    return render(request, '25_process.html', context)