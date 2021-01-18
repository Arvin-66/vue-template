module.exports = {
    prompts: {
        name: {
            type: 'input',
            message: 'name',
            default: 'vue-project'
        },
        description: {
            type: 'input',
            message: 'description',
            default: 'A project'
        },
        author: {
            type: 'input',
            message: 'Author',
            default: ''
        },
        license: {
            type: 'list',
            message: 'License?',
            choices: [
                {
                    name: 'MIT-license',
                    value: 'MIT',
                    short: 'MIT',
                }, {
                    name: 'ISC-license',
                    value: 'ISC',
                    short: 'ISC',
                }
            ],
            default: 'ISC'
        },
        router: {
            type: 'confirm',
            message: 'Install vue-router?',
            default: false
        },
        vuex: {
            type: 'confirm',
            message: 'Install vuex?',
            default: false
        },
        autoInstall: {
            type: 'list',
            message:
                'Should we run `npm install` for you after the project has been created? (recommended)',
            choices: [
                {
                    name: 'Yes, use NPM',
                    value: true,
                    short: 'npm'
                },
                {
                    name: 'No, I will handle that myself',
                    value: false,
                    short: 'no'
                },
            ],
            default: true
        }
    },
    filters: {
        'store/*': 'vuex',
        'route/*': 'router'
    },
    complete: function() {
        console.log('complete!')
    }
}
