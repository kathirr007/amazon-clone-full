/* eslint-disable */
import Vue from 'vue'
import moment from 'moment'

Vue.filter('shortenText', function(text, maxLength = 300) {
    // debugger
    if(text && typeof(text) === 'string') {
        const finalChar = text.length > maxLength ? '...' : ''
        return text.substr(0, maxLength) + finalChar
    }

    return ''
})

Vue.filter('capitalize', function(string) {
    // debugger
    return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
})

Vue.filter('formatDate', function(date, dateFormat = 'LLL') {
    // debugger
    if(!date) return ''
    return moment(date).format(dateFormat)
})
