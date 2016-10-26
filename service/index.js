var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.answers = {};
    },
    paths: function() {
        console.log(this.destinationRoot());
        console.log(this.destinationPath('index.js'));
        console.log(this.sourceRoot());
        console.log(this.templatePath('index.js'));
    },
    promptings: function() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your service name',
                default: 'Foo',
                store: true
            }
        ]).then(function(answers) {
            this.answers = answers;
        }.bind(this));
    },
    writing: function() {
        console.log(this.answers);
        this.fs.copyTpl(
          this.templatePath('service.js'),
          this.destinationPath('app/services/' + this.answers.name + '/index.js'), {
            name: this.answers.name
          }
        );
    }
});
