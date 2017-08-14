'use strict';
/* global require */

/* Экспорт jquery в глобальную область видимости */
window.$ = window.jQuery = require('jquery');

/* Точка входа (инициализация) модулей */
$(document).ready(function () {
	(function ($elem) {
		if (!$elem.length) {
			return false;
		}
		require('./modules/getWeather.js')();

	})($('.js-weather'));

});

