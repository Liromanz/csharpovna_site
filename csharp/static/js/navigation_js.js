$(document).ready(function () {
  // Проверяем ширину экрана
  function checkScreenSize() {
    if ($(window).width() <= 768) {
      $('#sidebar').removeClass('active'); // Скрываем меню на мобильных
      $('#overlay').removeClass('active'); // Скрываем оверлей
    } else {
      $('#sidebar').removeClass('active'); // Показываем меню на десктопе (без .active)
      $('#overlay').removeClass('active'); // Оверлей не нужен
    }
  }

  // Выполняем при загрузке
  checkScreenSize();

  // Переключаем меню и оверлей при клике на кнопку
  $('#sidebarCollapse').on('click', function (e) {
    e.preventDefault(); // Предотвращаем стандартное поведение
    e.stopPropagation(); // Останавливаем всплытие события, чтобы избежать конфликтов с Bootstrap
    console.log('Кнопка нажата, ширина:', $(window).width()); // Отладка
    $('#sidebar').toggleClass('active');
    if ($(window).width() <= 768) {
      $('#overlay').toggleClass('active');
    }
  });

  // Закрытие меню при клике на оверлей
  $('#overlay').on('click', function () {
    console.log('Оверлей нажат'); // Отладка
    $('#sidebar').removeClass('active');
    $('#overlay').removeClass('active');
  });

  // Обновляем при изменении размера окна
  $(window).resize(function () {
    checkScreenSize();
  });
});