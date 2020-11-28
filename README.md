# Content-SuperUser
plugin for 21vek.by

Данный проект является самописным браузерным расширением для сайта 21vek.by, для его полной корректной работы необходим доступ к админке сайта.
Описание проекта:
- Админка сайта не давала всех необходимых возможностей для редакторов и контент-менеджеров, а разработчики сайта не ставили включение этого функционала в приоритет.
- Проект появился по инициативе контент-менеджера Кирилла Пешевича (это я) и разрабатывался мной же аналогично и в одиночку.
- Сложность проекта заключалась в отсутствии доступов к исходному коду, чтению или изменению базы данных, отсутствии технической документации по админке сайта, наличии большого количества костылей и багов в админке сайта.
Описание особенностей:
- Необходимый функционал должен был встраиваться в страницу админки в браузере и напрямую взаимодействовать с ее версткой и js логикой, поэтому был выбран формат chrome.extension (браузерное расширение).
- Отсутствие каких-либо доступов к бэкэнду сайта ограничивало возможности для применения каких-либо "адекватных" способов взаимодействия с данными, что вынудило писать 90% проекта на js, а работа функционала осуществлялась на клиент-части.
- Проект выполнял множество функций: массовые правки (всех типов для интернет-магазина), контроль и история действий, возможность сохранения последних действий при разрыве сессии, парс данных из Excel в базу и обратно.
- Для реализации всех возможностей на клиенте (с учетом отсутствия доступов) был разработан интерфейс расширения, простейшие параметры безопасности (по иерархии должностей и их задач), а так же своя логика взаимодействия алгоритмов расширения с js логикой клиента админки.
- В связи с отсутствием доступов выполнение функций с огромными массивами данных на клиенте занимало некоторое время (но это в разы быстрее и проще ручной работы), так же требовало прибегания к костылям таким как:
1) "Мусор" в параметрах адресных строк (туда помещались "триггеры" дающие скрипту понять что на этой странице нужно делать и с какими параметрами);
2) Снятие ограничений localStorage самого расширения (там в постоянной памяти хранились основные параметры, история последних действий и данные доступа);
3) Игнор CORS политики путем парсинга через background страницу расширения данных из Excel и обратно;
4) Временное, но управляемое нахламление вкладок (не больше 10): в некоторых задачах нужно было взаимодействовать с большим числом разных вкладок (имитация человеческой работы, мы же на клиенте). При запуске функции скрипт сам находил по филтрам нужные ссылки, открывал их с параметрами в адресе, производил работу во вкладке, сохранял изменения, отправляя форму на бекенд и закрывал вкладку после окончания отправки формы (костыль на века);
5) Повторное использование функций js логики самой страницы для правильной работы ajax некоторых элементов (оказалось весма действенным и грамотным решением);
6) Необходимость в синхронной работе скрипта во многих функциях (это дело, конечно, устарело, но ой как отлично спасало от багов админки);
- Был разработан свой собственный дизайн (чтоб глаза не резало, как сама админка), стили прогрессбаров, анимация кнопок, аккордеонов, а так же своя цветовая палитра (пример дизайна элемента тут: https://raw.githack.com/PikaFun/Content-SuperUser/v1/bar1.html?token=AHWS7W5K3VE63QU66WUJ7JK7AR2ZM )
Описание библиотек:
- alasql.js + xlsx_core.js : для взаимодействия с внешними Excel файлами и для их генерации, а так же парс.
- jQuery.js : клиент админки почти полностью написан на jQuery.

Заключение:
Проект разарабатывался 9 месяцев и прошел через 27 версий. Все разрабатывалось одним человеком (мной). На github лежит последняя его версия для ознакомления.

Спасибо за внимание!

Кирилл Пешевич,
+375295913511 (telegram),
peshevich99@gmail.com
