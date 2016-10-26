var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
    },
    prompting: function() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your service name',
                default: 'Foo' // Default to current folder name
            }
        ]).then(function(answers) {
            this.log('service name', answers.name);
        }.bind(this));
    }
});
