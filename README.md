# Domic Dark Theme v1.6
https://addons.mozilla.org/ru/firefox/addon/dark-domic-theme/

Расширение умеет:
- Менять название вкладки
- Ставить собственную иконку на вкладку сайта (только ссылка на иконку)
- Ставить тёмную тему одну из двух на выбор, или же собственный стиль (только ссылка на файл)

Расширение использует:
- Шрифт Fira Sans
- jQuery 3.5.1 (minimal version)

Как временно установить расширение (локально):
- Клонировать репозиторий
- Установить web-ext(https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#Packaging_your_extension)
- Использовать "web-ext build" для постройки проекта / Не устанавливать web-ext и загрузить расширение через файл manifest
- Открыть вкладку в браузере Firefox - about:debugging#/runtime/this-firefox
- Выбрать кнопку "Загрузить временное дополнение" и выбрать архив (web-ext) / файл manifest
