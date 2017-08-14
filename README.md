## Требования

Для работы необходимы

* [Node.js](http://nodejs.org) _(version >= 4)_
* [EditConfig](http://editorconfig.org/): установить плагин для своего IDE
* [ESLint](http://eslint.org/): установить плагин для своего IDE
* [Stylint](https://simenb.github.io/stylint/): установить плагин для своего IDE

## Быстрый старт

### Установка npm зависимостей

```bash
npm install
```

Если при установке `npm` ругается на права доступа, то стоит прочесть статью [fixing-npm-permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

### Cборка проекта

* для разработки

	`npm run build:dev # для UNIX систем`
	`npm run win:build:dev # для Windows`

* для продакшана

	`npm run build:prod # для UNIX систем`
	`npm run win:build:prod # для Windows`

### Начало разработки

1. собираем проект (если еще не собран)

	`npm run build:dev # для UNIX систем`
	`npm run win:build:dev # для Windows`

2. запускаем режим разработки

	`npm run dev`

При запуске появиться диалоговое с вопросом запускать ли локальный сервер. Он нужен исключительно при верстке статичных страниц. При выборе варианта 'Нет' запуститься только `watch` (слежение за изменениями файлов).

### Конец разработки

Для остановки локального серевера используем сочетание кнопок `Ctrl + C`.

## Таски

* `dev` : запуск локального сервера
* `build:dev` : сборка для разоработки
* `build:prod` : сборка для продакшана
* `win:build:dev` : сборка для разоработки (для платформы Windows)
* `win:build:prod` : сборка для продакшана (для платформы Windows)
* `images`
* `svg`
* `sprites`
	* `sprites:png`
	* `sprites:svg`
* `styles`
* `scripts`
* `watch`
* `serve`
* `lint:scripts`
* `lint:styles`
* `templates`
	* `templates:styleguide`
	* `templates:pages`
	* `templates:blocks`
* `copy`
	* `copy:fonts`
	* `copy:favicons`
	* `copy:githooks`
* `clean`
	* `clean:assets`
	* `clean:templates`
	* `clean:logs`
	* `clean:githooks`

## Структура проекта

Некоторые папки, а именно `images`, `styles`, `scripts`, `svg`, `sprites/png`, `sprites/svg`, по умолчанию содержат директорию `main`, рассчитанная на хранение файлов основного проекта. Если же появляется подпроект или используется многосайтовость, то достаточно рядом с `main` создать новую директорию с именем подпроекта и занести его в массив `arrEntry` в файле `gulp.config.js`, который лежит в корне.

К примеру, нужно сделать лэндинг. Ваши действия:

1. создаете папку `landing`;
2. заносите его как еще одну точку входа в `gulp.config.js`

	`config.arrEntry = ['main', 'landing']`

Когда в проекте появляется более одной точки входа, то при запуске `npm run dev` появляется диалоговое окно с вариантами точек входа. Если продолжать рассматривать пример выше, то будет примерно следующее:

```bash
? Запустить локальный сервер (Use arrow keys)
* Да
  Нет
```

Далее, независимо от ответа на предыдущий вопрос, предложатся точки входа:

```bash
? Выберите проект (Use arrow keys)
* main
  landing
  all
```

При выборе одного из вариантов сборщик будет собирать файлы определенного проекта.

### Исходники

Все исходники (скрипты, статичные шаблоны, стили, изображения и т.п.) для разработки хранятся в директории `frontend`:

* `fonts/`
* `favicons/`
* `images/`
	* `main/`
		* `pattern/` : для декоративных фоновых изображений
		* `test/` : фотографии для разработки (верстки)
* `sprites/`
	* `main`
		* `png/`
		* `svg/`
* `svg/`
	* `main/`
* `scripts/`
	* `main/`
		* `common/` : хелперы и другие общие скрипты
		* `modules/` : модули
		* `vendor/` : сторонние библиотеки (которых нет в npm)
		* `scripts.js` : подключение модулей и библиотек (точка входа)
* `styles/`
	* `main/`
		* `0-helpers/` : переменные, миксины, конфигурации утилит
		* `1-vendor/` : сторонние библиотеки
		* `2-base/` : базовые стили для всех проектов, настройка проекта
		* `3-layout/` : сетка, обертки/контейнеры (к примеру, grid, header, footer)
		* `4-modules/` : модули (к примеру, form, modal, card)
		* `5-components/` : компоненты (к примеру, link, btn, input)
		* `styles.*` : подкючение файлов проекта (точка входа)
		* `styleguide.*` : подключение файлов на страницу гайдлайна (точка входа)
* `templates/`
	* `blocks/`
		* `*/` : хранит отдельные папки каждого блока для формирование страниц гайдлайна, где можно увидеть блок в различных состояних
			* `block.*` : подключение модуля/компонента
			* `index.*` : iframe, который обращается к block.html
		* `layouts/`
			* `_iframe.*` : шаблон iframe'a под каждое состояние блока
			* `_layout.*` : шаблон страницы блока
	* `pages/`
		* `layout/` : базовый шаблон для всех страниц, шапка и подвал сайта
		* `components/` : компоненты
		* `*.*` :  страницы (к примеру: index, about, home)
	* `index.*` : страница гайдлайна

### Результат

Собранные исходники храняться в директории `public_html`:

* `assets/`
	* `favicons/*`
	* `fonts/*`
	* `img/`
		* `main/*`
	* `sprites/`
		* `sprite.main.png`
		* `sprite@2x.main.png`
		* `sprite.main.svg`
	* `js/`
		* `main/`
			* `scripts.js`
	* `css/`
		* `main/`
			* `styles.css`
			* `styleguide.css`
	* `svg/`
		* `main/*`
* `static/` : html-файлы проекта
# weather
