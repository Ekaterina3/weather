module.exports = (function () {
	var KEY = 'be1201b52467e1bb7a14fe4e8eff3007';
	var Handlebars = require('handlebars/dist/handlebars');
	var $resultsContainer = $('#results');
	var $deleteBtn = $('.js-delete-all');
	var $search = $('.js-search');
	var $citiesList;
	var html;
	var context;

	var isEmptyLocalStorage = function () {
		var $savedCities = localStorage.getItem('cities');

		if (!($savedCities === null && $.isEmptyObject($savedCities))) {
			$citiesList = JSON.parse(localStorage.cities);;
			return true
		} else {
			$citiesList = [];
			return false
		}
	};

	var checkLocalStorage = function () {
		if (isEmptyLocalStorage()) {
			updateWeather();
		}
	};

	var addToLocalStorage = function ($elem) {
		localStorage.setItem('cities', JSON.stringify($elem));
	};

	var clearLocalStorage = function () {
		localStorage.removeItem('cities');
	};

	var updateCitiesList = function (id) {
		if (id !== undefined) {

			$citiesList = $.grep($citiesList, function(value) {
				return value !== id;
			});

		} else {
			$citiesList.push(context.id);
		}

		addToLocalStorage($citiesList);
	};

	var addCity = function ($elem) {
		var $source   = $('#entry-template').html();
		var template = Handlebars.compile($source);
		var $error = $elem.find('.js-error-msg');
		var $field = $elem.find('.js-find-city');

		$elem.on('submit', function (e) {
			e.preventDefault();
			$error.text('');

			var $city = $field.val();

			$.ajax({
				url: 'https://api.openweathermap.org/data/2.5/weather?q=' + $city + '?id=524901&units=metric&lang=ru&APPID=' + KEY,
				method: 'post',
				type: 'post',
				success: function (response) {
					context = response;

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

	var updateWeather = function () {
		var $source   = $('#entry-template-2').html();
		var template = Handlebars.compile($source);
		var $cities = JSON.parse(localStorage.cities);
		var url = 'https://api.openweathermap.org/data/2.5/group?id=' + $cities + '&units=metric&lang=ru&APPID=' + KEY;

			$.ajax({
				url: url,
				method: 'post',
				type: 'post',
				success: function (response) {
					context = response;
					html    = template(context);
					$resultsContainer.append(html);
					$deleteBtn.show();
				}
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
			var $curCityId = $curCity.data('id');

			$curCity.remove();

			updateCitiesList($curCityId);

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
