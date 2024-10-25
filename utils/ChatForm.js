const moment=require('moment')

function chatForm(username,text){
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}
module.exports=chatForm