const moment = require('moment');

module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format);
    },
    truncate: function(str,len) {
        if (str.length > len && str.length > 0) {
            let shortStr = str.substring(0, len) + '...';
            return shortStr;
        }
        return str;
    },
    stripTags: function(input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    }
}