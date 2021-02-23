
export default class ParamHelper {

    static getParameterByName(pname, url = window.location.href) {
        pname = pname.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + pname + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
   }



}
