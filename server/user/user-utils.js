/**
 * Created by Jens on 11-Oct-16.
 */

var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function UserHelper(){

}

UserHelper.prototype.generateRegKey = function(length) {
    var res = '';
    for(var i = length; i>0; i--) {
        res += chars[Math.round(Math.random() * (chars.length -1))];
    }
    return res;
}

module.exports = UserHelper;