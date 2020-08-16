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
    },
    editIcon: function (reviewUser, loggedUser, reviewId, floating=true) {
        if (reviewUser._id.toString() === loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/reviews/edit/${reviewId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/reviews/edit/${reviewId}"><i class="fas fa-edit"></i></a>`
            }
        } else return '';
    }
}