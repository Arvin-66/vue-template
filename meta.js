const {
    install,
    message
} = require('./utils')

module.exports = {
    prompts: {
        name: {
            type: 'input',
            message: 'Project name',
            default: 'vue-project'
        },
        description: {
            type: 'input',
            message: 'Project description',
            default: 'A project'
        },
        author: {
            type: 'input',
            message: 'Author',
            default: ''
        },
        // license: {
        //     type: 'list',
        //     message: 'License?',
        //     choices: [
        //         {
        //             name: 'MIT-license',
        //             value: 'MIT',
        //             short: 'MIT',
        //         }, {
        //             name: 'ISC-license',
        //             value: 'ISC',
        //             short: 'ISC',
        //         }
        //     ],
        //     default: 'MIT'
        // },
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
            message: 'Should we run `npm install` for you after the project has been created?',
            choices: [
                {
                    name: 'Yes, use NPM',
                    value: true,
                    short: 'NPM'
                },
                {
                    name: 'No, I will handle that myself',
                    value: false,
                    short: 'No'
                },
            ],
            default: true
        }
    },
    filters: {
        'store/*': 'vuex',
        'route/*': 'router'
    },
    complete: function (data, { notice }) {
        const { autoInstall } = data;
        if (autoInstall) {
            install(data, { notice });
        } else {
            message(data, { notice });
        }
    }
}
