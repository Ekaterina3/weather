module.exports = (function () {

	var $resultsContainer = $('#results');
	var $deleteBtn = $('.js-delete-all');
	var $search = $('.js-search');
	var $citiesList;

	var checkLocalStorage = function () {
		var $savedCities = localStorage.getItem('cities');

		if (!($savedCities === null && $.isEmptyObject($savedCities))) {
			$resultsContainer.html($savedCities);
			$deleteBtn.show();
		}
	};

	var addToLocalStorage = function ($elem) {
		localStorage.setItem('cities', $elem);
	};

	var clearLocalStorage = function () {
		localStorage.removeItem('cities');
	};

	var updateCitiesList = function () {
		$citiesList = $resultsContainer.html();
		addToLocalStorage($citiesList);
	};

	var addCity = function ($elem) {
		var KEY = 'be1201b52467e1bb7a14fe4e8eff3007';
		var Handlebars = require('handlebars/dist/handlebars');
		var $source   = $('#entry-template').html();
		var template = Handlebars.compile($source);
		var html;
		var $error = $elem.find('.js-error-msg');
		var $field = $elem.find('.js-find-city');

		$elem.on('submit', function (e) {
			e.preventDefault();
			$error.text('');

			var $city = $field.val();

			$.ajax({
				url: '//api.openweathermap.org/data/2.5/weather?q=' + $city + '?id=524901&units=metric&lang=ru&APPID=' + KEY,
				method: 'post',
				type: 'post',
				success: function (response) {
					var context = response;

					context.nameRus = $city[0].toUpperCase() + $city.substring(1);
					html    = template(context);
					$resultsContainer.append(html);
					$field.val('').blur();
					$deleteBtn.show();

					updateCitiesList();
				},
				error: function (response) {
					var msg = window.JSON.parse(response.responseText).message;
					$error.text(msg);
				}
			});
		});
	};

	var onAllCitiesRemoved = function () {
		$deleteBtn.hide();
		clearLocalStorage();
	};

	var deleteCity = function () {
		$(document).on('click', '.js-delete-city', function () {
			var $this = $(this);
			var $curCity = $this.closest('.js-city');

			$curCity.remove();
			updateCitiesList();

			if (!$('.js-city').length > 0) {
				onAllCitiesRemoved();
			}
		});
	};

	var deleteAll = function ($elem) {
		$elem.on('click', function (e) {
			$resultsContainer.html('');
			onAllCitiesRemoved();
		});
	};

	checkLocalStorage();
	addCity ($search);
	deleteAll ($deleteBtn);
	deleteCity();

});
