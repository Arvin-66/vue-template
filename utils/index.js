const spawn = require('child_process').spawn
const path = require('path')

module.exports = {

    message(data, { notice }) {
        notice.success(' Project initialization finished!')
        notice.log(' # ========================')

        const { autoInstall, dirName } = data;

        notice.info(` > To get started：cd ${dirName}`)

        if (autoInstall) {
            notice.info(' > npm run build')
        } else {
            notice.info(' > npm install \nnpm run build')
        }
    },

    install(data, { notice }) {

        notice.info(' Installing project dependencies...')
        notice.log(' # ========================')

        const { dirName, inPlace } = data;
        const cwd = path.join(inPlace, dirName)

        const spa = spawn(
            'npm',
            ['i'],
            {
                cwd,
                stdio: 'inherit',
                shell: true,
            }
        );

        spa.on('exit', () => {
            this.message(data, { notice })
        })
    }
}

