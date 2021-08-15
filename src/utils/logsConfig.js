const log4js = require('log4js')

log4js.configure({
    appenders: {
        miLoggerConsole: {type: 'console'},
        miLoggerFileWarn: {type: 'file', filename: 'logs/warn.log'},
        miLoggerFileErr: {type: 'file', filename: 'logs/error.log'}
    },
    categories: {
        default: {appenders: ['miLoggerConsole'], level: 'trace'},
        info: {appenders: ['miLoggerConsole', 'miLoggerConsole'], level: 'info'},
        warn: {appenders: ['miLoggerFileWarn', 'miLoggerConsole'], level: 'warn'},
        error: {appenders: ['miLoggerFileErr', 'miLoggerConsole'], level: 'error'},
    }
})


/**
 * Logs config
 */
const logs = {
    'logInfo': log4js.getLogger('info'),
    'logWarn': log4js.getLogger('warn'),
    'logError': log4js.getLogger('error')
}

module.exports = logs