const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.answers = {};
	},
	askUser    : function () {
		return this.prompt({
			type   : 'input',
			name   : 'name',
			message: 'Name',
			default: 'SimpleComponent'
		}).then(function (answers) {
			this.answers = answers;
		}.bind(this));
	},
	create     : function () {
		this.fs.copyTpl(
			this.templatePath('component.js'),
			this.destinationPath(`app/components/${this.answers.name}/index.js`), {
				name: this.answers.name
			}
		);
	}
});
