const generators = require('yeoman-generator');
const acorn = require('acorn');
const R = require('ramda');

module.exports = generators.Base.extend({
	constructor               : function () {
		generators.Base.apply(this, arguments);
		this.answers = {};
	},
	askUser                   : function () {
		return this.prompt({
			type   : 'input',
			name   : 'name',
			message: 'Name',
			default: 'SimpleComponent'
		}).then(function (answers) {
			this.answers = answers;
		}.bind(this));
	},
	checkIfComponentIsImported: function () {
		const componentsIndexPath = this.destinationPath(`app/components/index.js`);
		const componentsIndexContent = this.fs.read(componentsIndexPath);
		console.log(componentsIndexContent);
		
		const ast = acorn.parse(componentsIndexContent, {
			sourceType: 'module'
		});
		
		const bodyLens = R.lensProp('body');
		const specifierNameLens = R.lensPath(['local', 'name']);
		const containsNewName = R.contains(this.answers.name);
		
		const body = R.view(bodyLens, ast);
		const types = R.filter(R.propEq('type', 'ImportDeclaration'), body);
		const typeNames = R.map(
			R.pipe(
				R.prop('specifiers'),
				R.head,
				R.view(specifierNameLens)
			),
			types
		);
		
		const isNewComponentAlreadyImported = containsNewName(typeNames);
		
		console.log(
			JSON.stringify(typeNames, null, 1),
			isNewComponentAlreadyImported
		);
	},
	create                    : function () {
		this.fs.copyTpl(
			this.templatePath('component.js'),
			this.destinationPath(`app/components/${this.answers.name}/index.js`), {
				name: this.answers.name
			}
		);
	}
});
