var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // Next, add your custom code
        this.option('coffee'); // This method adds support for a `--coffee` flag
    },
    default: function() {
        console.log('run sub command like rekt:service');
    },
    prompting: function() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            }, {
                type: 'confirm',
                name: 'cool',
                message: 'Would you like to enable the Cool feature?'
            }
        ]).then(function(answers) {
            this.log('app name', answers.name);
            this.log('cool feature', answers.cool);
        }.bind(this));
    }
});
