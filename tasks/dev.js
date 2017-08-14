'use strict';

/* global require, gulp, config, onError, onSuccess */

var inquirer        = require('inquirer');
var MIN_ENTRY_COUNT = 2;

function startDev(arrTasks, done) {
	done();
	gulp.start.apply(gulp, arrTasks);
}

gulp.task('dev', function(done) {
	var arrTasks = ['watch'];

	inquirer.prompt([{
		type: 'list',
		name: 'server',
		message: 'Запустить локальный сервер',
		choices: [{
			name: 'Да',
			value: true,
		}, {
			name: 'Нет',
			value: false,
		}],
	}])
		.then(function(answers) {
			if (answers.server) {
				arrTasks.push('serve');
			}

			if (config.arrEntry.length >= MIN_ENTRY_COUNT) {
				inquirer.prompt([{
					type: 'list',
					name: 'entry',
					message: 'Выберите проект',
					choices: function() {
						var arr = config.arrEntry.slice();
						arr.push('all');
						return arr;
					},
				}])
					.then(function(answers) {
						if (answers.entry !== 'all') {
							config.arrEntry = [answers.entry];
						}

						startDev(arrTasks, done);
					});
				} else {
					startDev(arrTasks, done);
				}
		});
});
