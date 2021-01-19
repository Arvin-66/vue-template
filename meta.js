const {
    install,
    message
} = require('./utils')

module.exports = {
    prompts: {
        name: {
            type: 'input',
            message: 'Project name'
        },
        description: {
            type: 'input',
            message: 'Project description',
            default: 'A Vue.js project'
        },
        author: {
            type: 'input',
            message: 'Author',
            default: ''
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
        utils: {
            type: 'confirm',
            message: 'Load AWY_UTILS?',
            default: true
        },
        login: {
            type: 'confirm',
            message: 'Load AWY_LOGIN?',
            default: false
        },
        element: {
            type: 'confirm',
            message: 'Load element-ui?',
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
                }, {
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
