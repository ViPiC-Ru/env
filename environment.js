/*! 0.0.28 определяет дополнительные переменные среды */

//////////////////////////////////////////////////////////////////////////////////////

/*! 0.3.14 конструктор основного приложения с библиотекой и api */
function App(z){var k=this;k.val=z;App.prototype.lib={strFirstUpperCase:function(a){return a.substr(0,1).toUpperCase()+a.substr(1)},clone:function(a){switch(!0){case k.lib.validate(a,"date"):var b=new Date(a);break;case k.lib.validate(a,"array"):b=[];for(var c=0,g=a.length;c<g;c++)b[c]=k.lib.clone(a[c]);break;case k.lib.validate(a,"object"):b={};for(c in a)b[c]="prototype"!==c?k.lib.clone(a[c]):a[c];break;default:b=a}return b},compare:function(a,b,c){var g=0;switch(!0){case k.lib.validate(a,"string"):b=
k.lib.convert(b,"string");c&&(a=a.toLowerCase(),b=b.toLowerCase());break;case k.lib.validate(a,"array"):b=b?b.length||0:0;a=a.length;break;case k.lib.validate(a,"date"):b=b&&b.valueOf?b.valueOf()||0:0,a=a.valueOf()}a>b&&(g=1);a<b&&(g=-1);return g},strim:function(a,b,c,g){var d=b?b.length:0;var h=c?c.length:0;var k=b?a.indexOf(b):0;var f=c?a.indexOf(c,k+d):a.length;b&&-1==k||c&&-1==f?a="":(k=g?k:k+d,a=a.substr(k,(g?f+h:f)-k));return a},trim:function(a){return(a||"").replace(/^\s+|\s+$/g,"")},validate:function(a,
b){switch(b){case "email":b="^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";break;case "password":b="(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";break;case "md5":b="^[0-9a-f]{32}$"}switch(b){case "string":a="[object String]"===Object.prototype.toString.call(a);break;case "number":a="[object Number]"===Object.prototype.toString.call(a);break;case "boolean":a="[object Boolean]"===Object.prototype.toString.call(a);break;case "function":a="[object Function]"===
Object.prototype.toString.call(a);break;case "form":a=!(!a.tagName||"form"!=a.tagName.toLowerCase());break;case "files":a="[object FileList]"===Object.prototype.toString.call(a);break;case "date":a="[object Date]"===Object.prototype.toString.call(a);break;case "array":a=Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a);break;case "undefined":a=void 0===a;break;case "null":a=null===a;break;case "object":a=a===Object(a)&&"[object Null]"!==Object.prototype.toString.call(a)&&
"[object Date]"!==Object.prototype.toString.call(a)&&"[object Function]"!==Object.prototype.toString.call(a)&&"[object FileList]"!==Object.prototype.toString.call(a)&&"[object Array]"!==Object.prototype.toString.call(a);break;default:a=(new RegExp(b)).test(a)}return a},obj2str:function(a,b,c,g){var d=[];c||(c="&");g||(g="=");for(var h in a){var t=b?encodeURIComponent(h):h;k.lib.validate(a[h],"undefined")||(t+=g,t+=b?encodeURIComponent(a[h]):a[h]);d.push(t)}return d.join(c)},str2obj:function(a,b,c,
g){var d={};c||(c="&");g||(g="=");c=a.split(c);for(var h=0,k=c.length;h<k;h++)c[h]&&(c[h]=c[h].split(g,2),a=b?decodeURIComponent(c[h][0]):c[h][0],d[a]=b&&c[h][1]?decodeURIComponent(c[h][1]):c[h][1]);return d},url2obj:function(a){var b=a,c={},g=!1;a="fragment";var d="#";-1!=b.indexOf(d)&&(c[a]=k.lib.strim(b,d,null,!1),b=k.lib.strim(b,null,d,!1));a="query";d="?";-1!=b.indexOf(d)&&(c[a]=k.lib.strim(b,d,null,!1),b=k.lib.strim(b,null,d,!1));a="scheme";d="//";0==b.indexOf(d)&&(c[a]=k.lib.strim(b,null,d,
!1),b=k.lib.strim(b,d,null,!1),g=!0);a="path";d="/";b.indexOf("://")>b.indexOf(d)&&(c[a]=k.lib.strim(b,d,null,!0),b=k.lib.strim(b,null,d,!1));a="path";d="://";0==b.indexOf(d)&&(c[a]=k.lib.strim(b,d,null,!0),b=k.lib.strim(b,null,d,!1));a="scheme";d="://";!g&&0<b.indexOf(d)&&(c[a]=k.lib.strim(b,null,d,!1),b=k.lib.strim(b,d,null,!1),g=!0);a="path";d="/";g&&-1!=b.indexOf(d)&&(c[a]=k.lib.strim(b,d,null,!0),b=k.lib.strim(b,null,d,!1));a="path";d=b.length;!g&&0<d&&(c[a]=b,b="");d="@";if(-1!=b.indexOf(d)){var h=
k.lib.strim(b,d,null,!1);b=k.lib.strim(b,null,d,!1);a="password";d=":";-1!=b.indexOf(d)&&(c[a]=k.lib.strim(b,d,null,!1),b=k.lib.strim(b,null,d,!1));c.user=b;b=h}a="port";d=":";-1!=b.indexOf(d)&&(c[a]=k.lib.strim(b,d,null,!1),b=k.lib.strim(b,null,d,!1));g&&(c.domain=b);return c},obj2url:function(a){var b="";"user"in a&&(b="//");"password"in a&&(b="//");"domain"in a&&(b="//");"port"in a&&(b="//");var c="scheme";a[c]&&(b="://");var g=""+((a[c]?a[c]:"")+b);c="user";c in a&&(g+=""+a[c]);c="password";c in
a&&(g+=":"+a[c]);b="";"user"in a&&(b="@");"password"in a&&(b="@");c="domain";g+=b+(a[c]?a[c]:"");c="port";c in a&&(g+=":"+a[c]);c="path";c in a&&(g+=""+a[c]);c="query";c in a&&(g+="?"+a[c]);c="fragment";c in a&&(g+="#"+a[c]);return g},data2obj:function(a){var b={};a=a.split("\r\n");var c=a.shift().split("\t");for(var g=0;g<c.length;g++)c[g]=c[g].split(":"),c[g]={name:c[g][0],type:c[g][1]};g=0;for(var d=a.length;g<d;g++){var h=a[g].split("\t",c.length);var t={};for(var f=0;f<h.length;f++)t[c[f].name]=
k.lib.convert(h[f],c[f].type);c[0]&&(b[t[c[0].name]]=t)}return b},obj2data:function(a){var b=[],c=[];split="\t";delim="\r\n";param=":";none=" ";for(var g in a){if(!b.length){var d=[];for(e in a[g]){var h=a[g][e];h="id"==e?"integer":k.lib.validate(h,"number")?"float":k.lib.validate(h,"boolean")?"boolean":k.lib.validate(h,"date")?"date":"string";b["id"==e?0:b.length]={name:e,type:h};d[d.length]=e+param+h}c[c.length]=d.join(split)}d=[];for(var t=0,f=b.length;t<f;t++){var e=b[t].name;h=a[g][e];for(h=
k.lib.convert(h,"string");-1!=h.indexOf(split);)h=h.replace(split,none);for(;-1!=h.indexOf(delim);)h=h.replace(delim,none);h=h.replace(/[\t\r\n]/g,none);d[d.length]=h}c[c.length]=d.join(split)}return c.join(delim)},obj2arr:function(a,b){var c=[];b||(b=function(a){return a});for(var g in a){var d=a[g];d=b(d,g,a);k.lib.validate(d,"undefined")||c.push(d)}return c},convert:function(a,b){switch(b){case "bool":case "boolean":a="true"===a?!0:"false"===a?!1:!!a;break;case "int":case "integer":case "float":case "double":case "real":case "number":a=
Number(a);break;case "date":a=new Date(1E3*Number(a));break;case "string":k.lib.validate(a,"boolean")?a=a?"true":"false":(k.lib.validate(a,"date")&&(a=a.valueOf()/1E3),a=a.toString())}return a},xhr:function(a,b,c,g,d,h,t){var f=6E5,e=function(){},m={};b||(b="");a=(a||"get").toUpperCase();if(k.lib.validate(c,"object")){var p=!1;for(var n in c)if(k.lib.validate(c[n],"files")){p=!0;break}if(p){p=new FormData;for(n in c)if(k.lib.validate(c[n],"files"))for(var u=0,r=c[n].length;u<r;u++)p.append(n,c[n][u]);
else p.append(n,c[n]);c=p}else c=k.lib.obj2str(c,!0)}else c||(c="");d||(d=e);k.lib.validate(d,"function")?d={upload:e,download:e,success:e,error:e,complete:d}:(d.upload||(d.upload=e),d.download||(d.download=e),d.success||(d.success=e),d.error||(d.error=e),d.complete||(d.complete=e));if(!q)try{var q=new XMLHttpRequest}catch(v){q=!1}if(!q)try{q=new ActiveXObject("Microsoft.XMLHTTP")}catch(v){q=!1}if(!q)try{q=new ActiveXObject("Msxml2.XMLHTTP")}catch(v){q=!1}if(q){try{f=setTimeout(function(){q.abort();
d.error(q,q.responseText);d.complete(q,q.responseText)},f)}catch(v){}t?q.open(a,b,g,h,t):h?q.open(a,b,g,h):q.open(a,b,g);q.upload&&(q.upload.onprogress=function(a){a.total&&a.loaded!=a.total&&d.upload(q,a)},q.onprogress=function(a){a.total&&a.loaded!=a.total&&d.download(q,a)});q.onreadystatechange=function(a){if(4==q.readyState){try{clearTimeout(f)}catch(w){}200!=q.status&&q.status||!q.responseText?d.error(q,q.responseText):d.success(q,q.responseText);d.complete(q,q.responseText)}};try{q.setRequestHeader("X-Requested-With",
"XMLHttpRequest"),k.lib.validate(c,"string")?(q.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),q.send(c)):c?q.send(c):q.send()}catch(v){}}else d.error(m,""),d.complete(m,"");return q?q:!1},ajax:function(a,b,c,g){return k.lib.xhr(a,b,c,!0,g)},sjax:function(a,b,c){return k.lib.xhr(a,b,c,!1)},strPad:function(a,b,c,g){var d,h=d="",k=function(a,b){for(;h.length<b;)h+=a;return h=h.substr(0,b)};a=""+a;c=c?""+c:" ";"left"!=g&&"right"!=g&&"both"!=g&&(g="right");0<(d=b-a.length)&&("left"==
g?a=k(c,d)+a:"right"==g?a+=k(c,d):"both"==g&&(d=k(c,Math.ceil(d/2)),a=(d+a+a).substr(0,b)));return a},getCookie:function(a,b){var c=document.cookie.indexOf(a+"="),g=c+a.length+1;if(!c&&a!=document.cookie.substring(0,a.length)||-1==c)return null;a=document.cookie.indexOf(";",g);-1==a&&(a=document.cookie.length);return b?decodeURIComponent(document.cookie.substring(g,a)):unescape(document.cookie.substring(g,a))},setCookie:function(a,b,c,g,d,h,k){var f=new Date((new Date).valueOf()+c);document.cookie=
a+"="+(k?encodeURIComponent(b):escape(b))+(c?";expires="+f.toGMTString():"")+(g?";path="+g:"")+(d?";domain="+d:"")+(h?";secure":"");return!0},delCookie:function(a,b,c){k.lib.getCookie(a)&&(document.cookie=a+"="+(b?";path="+b:"")+(c?";domain="+c:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT");return!0},getStorage:function(a,b){var c,g=null,d=null;if(c=window&&window.localStorage?localStorage.getItem(a):k.lib.getCookie(a)){var h=c.indexOf("?");-1!=h&&(type=c.substr(0,h),c=c.substr(h+1));b?(c=c.split("&"),
!0!==b&&(c.length=Math.min(b,c.length))):c=[c];for(var t=0,f=c.length;t<f;t++){h=c[t].indexOf("=");if(-1!=h){if(a=c[t].substr(0,h),a=decodeURIComponent(a),g=c[t].substr(h+1),!d){var e=!0;d={}}}else a=t,g=c[t],d||(e=!1,d=[]);g=decodeURIComponent(g);type&&(g=k.lib.convert(g,type));e?d[a]=g:d.push(g)}}else d=null;return b?d:g},setStorage:function(a,b){var c,g=[];var d=function(a,b){c||(c=k.lib.validate(a,"number")?"number":k.lib.validate(a,"date")?"date":k.lib.validate(a,"boolean")?"boolean":"string");
a=k.lib.convert(a,"string");a=encodeURIComponent(a);k.lib.validate(b,"undefined")?g.push(a):(b=encodeURIComponent(b),g.push(b+"="+a))};if(k.lib.validate(b,"object"))for(var h in b)d(b[h],h);else if(k.lib.validate(b,"array")){h=0;for(var t=b.length;h<t;h++)d(b[h])}else k.lib.validate(b,"null")||d(b);if(g=g.join("&"))if(g=c+"?"+g,window&&window.localStorage)try{localStorage.setItem(a,g);var f=!0}catch(e){f=!1}else f=k.lib.setCookie(a,g,31536E7,location.pathname,document.domain);else window&&window.localStorage?
(localStorage.removeItem(a),f=!0):f=k.lib.delCookie(a,location.pathname,document.domain);return f},counter:function(){var a={};return function(b,c){var g=0;k.lib.validate(b,"array")&&b.join("_");b&&(a[b]=a[b]||0,g=a[b],!1===c?delete a[b]:!0===c?a[b]++:c&&(a[b]+=c));return g}}(),on:function(){var a={};return function(b,c,g){var d,h=[],k=0;b=b.toString().split(/\s+/);for(var f=0,e=b.length;f<e;f++)if(d=b[f])if(a[d]||(a[d]=[0]),g)if(c){a[d][c]||(a[d][c]=[]);var m=a[d][c].length;a[d][c][m]=g;a[d][0]>=
c&&h.push([d,c,m]);k++}else{m=1;for(var p=a[d].length;m<p;m++)if(a[d][m])for(var n=0,u=a[d][m].length;n<u;n++)a[d][m][n]===g&&(delete a[d][m][n],k++)}else if(a[d][0]++,c=c||a[d][0],a[d][c])for(m=0;m<a[d][c].length;m++)a[d][c][m]&&h.push([d,c,m]),k++;f=0;for(e=h.length;f<e;f++)d=h[f][0],c=h[f][1],m=h[f][2],a[d]&&a[d][c]&&a[d][c][m]&&a[d][c][m].call(a[d][c][m],c);return k}}(),href:function(a){var b=document.createElement("a");b.href=a;return b.cloneNode(!1).href},getExt:function(a){var b="";var c=(""+
a).lastIndexOf(".");-1!==c&&(b=a.substr(c+1),b=b.toLowerCase());return b},md5:function(a){var b=function(a,b){var c=a&2147483648;var d=b&2147483648;var f=a&1073741824;var g=b&1073741824;a=(a&1073741823)+(b&1073741823);return f&g?a^2147483648^c^d:f|g?a&1073741824?a^3221225472^c^d:a^1073741824^c^d:a^c^d},c=function(a,c,d,f,g,e,h){a=b(a,b(b(c&d|~c&f,g),h));return b(a<<e|a>>>32-e,c)},g=function(a,c,d,f,g,e,h){a=b(a,b(b(c&f|d&~f,g),h));return b(a<<e|a>>>32-e,c)},d=function(a,c,d,f,g,e,h){a=b(a,b(b(c^d^
f,g),h));return b(a<<e|a>>>32-e,c)},h=function(a,c,d,f,g,e,h){a=b(a,b(b(d^(c|~f),g),h));return b(a<<e|a>>>32-e,c)},k=function(a){var b="",c;for(c=0;3>=c;c++){var d=a>>>8*c&255;d="0"+d.toString(16);b+=d.substr(d.length-2,2)}return b},f=[];a=function(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):(127<d&&2048>d?b+=String.fromCharCode(d>>6|192):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128)),b+=String.fromCharCode(d&
63|128))}return b}(a.toString());f=function(a){var b=a.length;var c=b+8;for(var d=16*((c-c%64)/64+1),f=Array(d-1),g,e=0;e<b;)c=(e-e%4)/4,g=e%4*8,f[c]|=a.charCodeAt(e)<<g,e++;c=(e-e%4)/4;f[c]|=128<<e%4*8;f[d-2]=b<<3;f[d-1]=b>>>29;return f}(a);var e=1732584193;var m=4023233417;var p=2562383102;var n=271733878;for(a=0;a<f.length;a+=16){var u=e;var r=m;var q=p;var v=n;e=c(e,m,p,n,f[a+0],7,3614090360);n=c(n,e,m,p,f[a+1],12,3905402710);p=c(p,n,e,m,f[a+2],17,606105819);m=c(m,p,n,e,f[a+3],22,3250441966);
e=c(e,m,p,n,f[a+4],7,4118548399);n=c(n,e,m,p,f[a+5],12,1200080426);p=c(p,n,e,m,f[a+6],17,2821735955);m=c(m,p,n,e,f[a+7],22,4249261313);e=c(e,m,p,n,f[a+8],7,1770035416);n=c(n,e,m,p,f[a+9],12,2336552879);p=c(p,n,e,m,f[a+10],17,4294925233);m=c(m,p,n,e,f[a+11],22,2304563134);e=c(e,m,p,n,f[a+12],7,1804603682);n=c(n,e,m,p,f[a+13],12,4254626195);p=c(p,n,e,m,f[a+14],17,2792965006);m=c(m,p,n,e,f[a+15],22,1236535329);e=g(e,m,p,n,f[a+1],5,4129170786);n=g(n,e,m,p,f[a+6],9,3225465664);p=g(p,n,e,m,f[a+11],14,643717713);
m=g(m,p,n,e,f[a+0],20,3921069994);e=g(e,m,p,n,f[a+5],5,3593408605);n=g(n,e,m,p,f[a+10],9,38016083);p=g(p,n,e,m,f[a+15],14,3634488961);m=g(m,p,n,e,f[a+4],20,3889429448);e=g(e,m,p,n,f[a+9],5,568446438);n=g(n,e,m,p,f[a+14],9,3275163606);p=g(p,n,e,m,f[a+3],14,4107603335);m=g(m,p,n,e,f[a+8],20,1163531501);e=g(e,m,p,n,f[a+13],5,2850285829);n=g(n,e,m,p,f[a+2],9,4243563512);p=g(p,n,e,m,f[a+7],14,1735328473);m=g(m,p,n,e,f[a+12],20,2368359562);e=d(e,m,p,n,f[a+5],4,4294588738);n=d(n,e,m,p,f[a+8],11,2272392833);
p=d(p,n,e,m,f[a+11],16,1839030562);m=d(m,p,n,e,f[a+14],23,4259657740);e=d(e,m,p,n,f[a+1],4,2763975236);n=d(n,e,m,p,f[a+4],11,1272893353);p=d(p,n,e,m,f[a+7],16,4139469664);m=d(m,p,n,e,f[a+10],23,3200236656);e=d(e,m,p,n,f[a+13],4,681279174);n=d(n,e,m,p,f[a+0],11,3936430074);p=d(p,n,e,m,f[a+3],16,3572445317);m=d(m,p,n,e,f[a+6],23,76029189);e=d(e,m,p,n,f[a+9],4,3654602809);n=d(n,e,m,p,f[a+12],11,3873151461);p=d(p,n,e,m,f[a+15],16,530742520);m=d(m,p,n,e,f[a+2],23,3299628645);e=h(e,m,p,n,f[a+0],6,4096336452);
n=h(n,e,m,p,f[a+7],10,1126891415);p=h(p,n,e,m,f[a+14],15,2878612391);m=h(m,p,n,e,f[a+5],21,4237533241);e=h(e,m,p,n,f[a+12],6,1700485571);n=h(n,e,m,p,f[a+3],10,2399980690);p=h(p,n,e,m,f[a+10],15,4293915773);m=h(m,p,n,e,f[a+1],21,2240044497);e=h(e,m,p,n,f[a+8],6,1873313359);n=h(n,e,m,p,f[a+15],10,4264355552);p=h(p,n,e,m,f[a+6],15,2734768916);m=h(m,p,n,e,f[a+13],21,1309151649);e=h(e,m,p,n,f[a+4],6,4149444226);n=h(n,e,m,p,f[a+11],10,3174756917);p=h(p,n,e,m,f[a+2],15,718787259);m=h(m,p,n,e,f[a+9],21,3951481745);
e=b(e,u);m=b(m,r);p=b(p,q);n=b(n,v)}return(k(e)+k(m)+k(p)+k(n)).toLowerCase()},parseJSON:function(a){if(window&&window.JSON&&JSON.parse)try{var b=JSON.parse(a)}catch(c){b=eval("("+a+")")}else b=eval("("+a+")");return b},numDeclin:function(a,b,c,g){a=Number(a);a=Math.abs(a);a=Math.floor(a);var d=a%10;return 1!=(a%100-d)/10?0==d?b:1==d?c:5>d?g:b:b},num2str:function(a,b,c,g){var d,h;isNaN(b=Math.abs(b))&&(b=2);void 0==c&&(c=",");void 0==g&&(g=".");if(h=0>a)a=Math.abs(a);var k=parseInt(a=(+a||0).toFixed(b))+
"";var f=(d=3<(d=k.length)?d%3:0)?k.substr(0,d)+g:"";g=k.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+g);a=b?c+Math.abs(a-k).toFixed(b).replace(/-/,0).slice(2):"";return(h?"-":"")+f+g+a},num2word:function(a,b,c){function g(a,b){a=a.toString().substr(-2);return b[0]+(/^[0,2-9]?[1]$/.test(a)?b[2]:/^[0,2-9]?[2-4]$/.test(a)?b[3]:b[1])}var d=[],h=[["\u043d\u043e\u043b\u044c"],[,,,"\u0442\u0440\u0438","\u0447\u0435\u0442\u044b\u0440\u0435","\u043f\u044f\u0442\u044c","\u0448\u0435\u0441\u0442\u044c","\u0441\u0435\u043c\u044c",
"\u0432\u043e\u0441\u0435\u043c\u044c","\u0434\u0435\u0432\u044f\u0442\u044c"],"\u0434\u0435\u0441\u044f\u0442\u044c \u043e\u0434\u0438\u043d\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u0434\u0432\u0435\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u0442\u0440\u0438\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u0447\u0435\u0442\u044b\u0440\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u043f\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u0448\u0435\u0441\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u0432\u043e\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c \u0434\u0435\u0432\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c".split(" "),
[,,"\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c","\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c","\u0441\u043e\u0440\u043e\u043a","\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442","\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442","\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442","\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442","\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e"],[,"\u0441\u0442\u043e","\u0434\u0432\u0435\u0441\u0442\u0438",
"\u0442\u0440\u0438\u0441\u0442\u0430","\u0447\u0435\u0442\u044b\u0440\u0435\u0441\u0442\u0430","\u043f\u044f\u0442\u044c\u0441\u043e\u0442","\u0448\u0435\u0441\u0442\u044c\u0441\u043e\u0442","\u0441\u0435\u043c\u044c\u0441\u043e\u0442","\u0432\u043e\u0441\u0435\u043c\u044c\u0441\u043e\u0442","\u0434\u0435\u0432\u044f\u0442\u044c\u0441\u043e\u0442"],[[,"\u043e\u0434\u0438\u043d","\u0434\u0432\u0430"],[,"\u043e\u0434\u043d\u0430","\u0434\u0432\u0435"],[,"\u043e\u0434\u043d\u043e","\u0434\u0432\u0430"]]],
k=[["...\u043b\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u0442\u044b\u0441\u044f\u0447","","\u0430","\u0438"],["\u043c\u0438\u043b\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u043c\u0438\u043b\u043b\u0438\u0430\u0440\u0434","\u043e\u0432","","\u0430"],["\u0442\u0440\u0438\u043b\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u043a\u0432\u0430\u0434\u0440\u0438\u043b\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u043a\u0432\u0438\u043d\u0442\u0438\u043b\u043b\u0438\u043e\u043d",
"\u043e\u0432","","\u0430"],["\u0441\u0435\u043a\u0441\u0442\u0438\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u0441\u0435\u043f\u0442\u0438\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u043e\u043a\u0442\u0430\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u043d\u043e\u043d\u0430\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u0434\u0435\u043a\u0430\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"],["\u044d\u043d\u0434\u0435\u043a\u0430\u043b\u0438\u043e\u043d",
"\u043e\u0432","","\u0430"],["\u0434\u043e\u0434\u0435\u043a\u0430\u043b\u0438\u043e\u043d","\u043e\u0432","","\u0430"]],f=[[["\u0446\u0435\u043b","\u044b\u0445","\u044b\u0439","\u044b\u0445"],["\u0446\u0435\u043b","\u044b\u0445","\u0430\u044f","\u044b\u0445"],["\u0446\u0435\u043b","\u044b\u0445","\u043e\u0435","\u044b\u0445"]],["\u0434\u0435\u0441\u044f\u0442","\u044b\u0445","\u0430\u044f","\u044b\u0445"],["\u0441\u043e\u0442","\u044b\u0445","\u0430\u044f","\u044b\u0445"],["\u0442\u044f\u0441\u044f\u0447\u043d",
"\u044b\u0445","\u0430\u044f","\u044b\u0445"],["\u0434\u0435\u0441\u044f\u0442\u0438\u0442\u044b\u0441\u044f\u0447\u043d","\u044b\u0445","\u0430\u044f","\u044b\u0445"],["\u0441\u0442\u043e\u0442\u044b\u0441\u044f\u0447\u043d","\u044b\u0445","\u0430\u044f","\u044b\u0445"],["\u043c\u0438\u043b\u0438\u043e\u043d\u043d","\u044b\u0445","\u0430\u044f","\u044b\u0445"],["\u0434\u0435\u0441\u044f\u0442\u0438\u043c\u0438\u043b\u0438\u043e\u043d\u043d","\u044b\u0445","\u0430\u044f","\u044b\u0445"]];c=c||0;a=
a.toString().split(".");for(var e=0,m=a.length;e<m;e++){e&&(a[e]=a[e].substr(0,f.length-1));l=a[e].length;a[e]=["","00","0"][a[e].split(/\d{3}/).join("").length]+a[e];for(var p=a[e].length,n,u=0,r=-1,q=[];3*u<p;){n=a[e].substr(-3*(u+1),3);q[++r]=[];for(var v=0;2>=v;v++)if(0!=n[v])switch(v){case 0:q[r][q[r].length]=h[4][n[v]];break;case 1:1==n[v]?(q[r][q[r].length]=h[2][n[2]],v=3):q[r][q[r].length]=h[3][n[v]];break;case 2:q[r][q[r].length]=2>=n[v]?h[5][1==u||e?1:c][n[v]]:h[1][n[v]]}q[r].length||(q[r][q[r].length]=
h[0][0]);0<n&&0<u&&(q[r][q[r].length]=g(n,k[u]));!u&&1<m&&(q[r][q[r].length]=g(n,e?f[l]:f[0][c]));u||!b||e||e!=m-1?!u&&b&&e&&(q[r][q[r].length]=b[0]+b[3]):q[r][q[r].length]=g(n,b);q[r]=q[r].join(" ");u++}d[d.length]=q.reverse().join(" ")}return d.join(" ")},date2str:function(a,b){var c="\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435 \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u0412\u0442\u043e\u0440\u043d\u0438\u043a \u0421\u0440\u0435\u0434\u0430 \u0427\u0435\u0442\u0432\u0435\u0440\u0433 \u041f\u044f\u0442\u043d\u0438\u0446\u0430 \u0421\u0443\u0431\u0431\u043e\u0442\u0430".split(" "),
g=" \u042f\u043d\u0432\u0430\u0440\u044f \u0424\u0435\u0432\u0440\u0430\u043b\u044f \u041c\u0430\u0440\u0442\u0430 \u0410\u043f\u0440\u0435\u043b\u044f \u041c\u0430\u044f \u0418\u044e\u043d\u044f \u0418\u044e\u043b\u044f \u0410\u0432\u0433\u0443\u0441\u0442\u0430 \u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044f \u041e\u043a\u0442\u044f\u0431\u0440\u044f \u041d\u043e\u044f\u0431\u0440\u044f \u0414\u0435\u043a\u0430\u0431\u0440\u044f".split(" "),d={0:"\u044b\u0439",2:"\u043e\u0439",3:"\u0438\u0439",
6:"\u043e\u0439",7:"\u043e\u0439",8:"\u043e\u0439",22:"\u043e\u0439",26:"\u043e\u0439",27:"\u043e\u0439",28:"\u043e\u0439"},h={"-660":"ST","-600":"HAST","-540":"AKT","-480":"AWST","-420":"CXT","-360":"\u0421ST","-300":"EST","-240":"AST","-210":"NST","-180":"ART",0:"GMT",60:"CET",120:"CAT",180:"MSK",210:"IRST",300:"PKT",330:"IST",360:"BDT",390:"MST",420:"CXT",480:"AWST",540:"JST",570:"ACST",600:"AEST",660:"NFT"},t="";var f=function(b){var e="";switch(b){case "d":e+=k.lib.strPad(f("j"),2,"0","left");
break;case "D":e+=f("l").substr(0,3);break;case "j":e+=a.getDate();break;case "l":e+=c[f("w")];break;case "N":e+=f("w")||7;break;case "S":e+=d[f("j")]||d[0];break;case "w":e+=a.getDay();break;case "z":e+=(a-new Date(a.getFullYear(),0,1))/864E5>>0;break;case "W":b=new Date(a.valueOf());var m=(a.getDay()+6)%7;b.setDate(b.getDate()-m+3);m=b.valueOf();b.setMonth(0,1);4!==b.getDay()&&b.setMonth(0,1+(4-b.getDay()+7)%7);e+=1+Math.ceil((m-b)/6048E5);break;case "F":e+=g[f("n")];break;case "m":e+=k.lib.strPad(f("n"),
2,"0","left");break;case "M":e+=f("F").substr(0,3);break;case "n":e+=a.getMonth()+1;break;case "t":e+=(new Date(a.getFullYear(),a.getMonth()+1,0)).getDate();break;case "L":e+=a.getFullYear()&3||!(a.getFullYear()%100)&&a.getFullYear()%400?0:1;break;case "o":(function(){var b=new Date(a.valueOf());b.setDate(b.getDate()-(a.getDay()+6)%7+3);e+=b.getFullYear()})();break;case "Y":e+=a.getFullYear();break;case "y":e+=f("Y").substr(2,2);break;case "a":e+=11<a.getHours()?"pm":"am";break;case "A":e+=f("a").toUpperCase();
break;case "B":(function(){var b=60*(a.getTimezoneOffset()+60);b=3600*a.getHours()+60*a.getMinutes()+a.getSeconds()+b;b=Math.floor(b/86.4);1E3<b&&(b-=1E3);0>b&&(b+=1E3);e+=k.lib.strPad(b,3,"0","left")})();break;case "g":e+=a.getHours()%12||12;break;case "G":e+=a.getHours();break;case "h":e+=k.lib.strPad(f("g"),2,"0","left");break;case "H":e+=k.lib.strPad(f("G"),2,"0","left");break;case "i":e+=k.lib.strPad(a.getMinutes(),2,"0","left");break;case "s":e+=k.lib.strPad(a.getSeconds(),2,"0","left");break;
case "u":e+=k.lib.strPad(1E3*a.getMilliseconds(),6,"0","left");break;case "e":e+=(new Date).toString().split(" ")[5].split("-")[0].split("+")[0];break;case "I":e+=(new Date(a.getFullYear(),0,1)).getTimezoneOffset()!=a.getTimezoneOffset()?1:0;break;case "O":e+=(0<a.getTimezoneOffset()?"-":"+")+k.lib.strPad(Math.abs(a.getTimezoneOffset()/60*100),4,"0","left");break;case "P":e+=f("O").substr(0,3)+":"+f("O").substr(3,2);break;case "T":e+=h[-1*a.getTimezoneOffset()-60*Number(f("I"))]||h[0];break;case "Z":e+=
-60*a.getTimezoneOffset();break;case "c":e+=f("Y")+"-"+f("m")+"-"+f("d")+"T"+f("h")+":"+f("i")+":"+f("s")+f("P");break;case "r":e+=f("D")+", "+f("j")+" "+f("M")+" "+f("Y")+" "+f("h")+":"+f("i")+":"+f("s")+" "+f("O");break;case "U":e+=Math.round(a.getTime()/1E3)}return e};for(var e=0,m=b.length;e<m;e++){var p=b.charAt(e);t="\\"!==n?t+(f(p)||p):t+p;var n=p}return t},extend:function(){var a=arguments[0]||{},b=1,c=arguments.length,g=!1,d;k.lib.validate(a,"boolean")&&(g=a,a=arguments[1]||{},b=2);for(k.lib.validate(a,
"object")||k.lib.validate(a,"function")||(a={});b<c;++b)if(null!=(d=arguments[b]))for(var h in d){var t=a[h],f=d[h];a!==f&&(g&&f&&k.lib.validate(f,"object")&&!f.nodeType?a[h]=k.lib.extend(g,t||(null!=f.length?[]:{}),f):k.lib.validate(f,"undefined")||(a[h]=f))}return a},template:function(a,b){var c=[];if(a&&b){c=a.split("|");for(var g=c.length,d=g-1;-1<d;d--)if(c[d])if(a=c[d].split("%"),a.length%2){for(var h=1,k=a.length,f=!0;h<k;h+=2)a[h]in b?a[h]=b[a[h]]:f=!1;f?c[d]=a.join(""):c.splice(d,1)}else c.splice(d,
1);else d&&d<g-1&&(c[d]="|")}return c.join("")},getRandomString:function(a,b){var c="";b||(b=89);b=Math.min(Math.max(b,1),89);for(var g=0;g<a;g++)c+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_+=;:,./?|`~[]{}".charAt(Math.round(Math.random()*(b-1)));return c}};App.prototype.api=function(a,b,c,g){function d(a){if(c)switch(t){case "http":a?c(a):c("");break;default:if(a){try{a=k.lib.parseJSON(a)}catch(A){a={}}a.status?c(a):c(f)}else c(f)}}var h="",t="json",f={status:160,
msg:"Unable to send data to the server"},e=k.lib.getCookie(k.val.sidName),m=k.val.apiUrl,p=[];b||(b={});if(a){if(k.lib.validate(b,"form")){var n=!1;var u=!0;var r=b;b={};for(var q=0,v=r.elements.length;q<v;q++){var w=r.elements[q];"method"==w.name&&(w.value=a,u=!1);"sign"==w.name?re(w):"file"==w.type&&w.value?w.disabled||(w.files&&w.files.length?b[w.name]=w.files:n=!0):!w.name||w.disabled||w.disabled||(b[w.name]=w.value)}u&&r.appendChild(ce("input",{type:"hidden",name:"method",value:a}))}else n=!1;
t=b.format||t;b=k.lib.clone(b);b.method=a;if(e){for(var x in b)p.push(x);p.sort();q=0;for(v=p.length;q<v;q++)x=p[q],k.lib.validate(b[x],"files")||(h+=x+b[x]);h=k.lib.md5(h+e)}if(n)b=r.elements,r.setAttribute("action",m),r.setAttribute("method","post"),r.setAttribute("enctype","multipart/form-data"),r.setAttribute("target","download"),h&&r.appendChild(ce("input",{type:"hidden",name:"sign",value:h})),onLoadDownloadFrame=function(a){var b=null;if(!b)try{b=a.contentDocument}catch(y){b=!1}if(!b)try{b=
a.contentWindow.document}catch(y){b=!1}if(!b)try{b=a.document}catch(y){b=!1}onLoadDownloadFrame=function(){};b&&(b=b.body.innerHTML.match(/{[\s\S]*}/))&&(b=b[0]);d(b)},r.submit();else{h&&(b.sign=h);u=!0;for(x in b)if(k.lib.validate(b[x],"files")){u=!1;break}u&&(b=k.lib.obj2str(b,!0));(u=u&&2E3>(k.lib.href(m)+b).length)?(m+=-1==m.indexOf("?")?"?":"&",m+=b,b=null,u="get"):u="post";k.lib.ajax(u,m,b,{upload:function(a,b){g&&g(b.loaded/b.total)},complete:function(a,b){d(b)}})}}else d()}};

//////////////////////////////////////////////////////////////////////////////////////

var environment = new App({
	aptPref: 'apt',										// префикс в имени компьютера для определения номера аптечного пункта
	aptLen: 3,											// колличество цифр отведённых под номер аптечного пункта
	aptNone: 'XXX',										// значение для нулевого аптечного пункта
	wsPref: 'c',										// префикс в имени компьютера для определения номера компьютера
	wsLen: 1,											// колличество цифр отведённых под номер компьютера
	wsFirstDesc: 'Основной',							// описание первого компьютера в аптечном пункте
	wsNextDesc: 'Дополнительный',						// описание следующего компьютера в аптечном пункте
	wsNoneDesc: 'Временный',							// описание не опознанного компьютера в аптечном пункте
	supportLogin: 'apteka',								// логин для технической поддержки
	supportToken: 'beb120e2949d34cd65a82b16071e8836',	// токен пароль для технической поддержки
	runStyle: 1,										// стиль отображения запущенных программ по умолчанию
	defReturn: 99,										// значение возвращаемое по умолчанию
	driveMinSize: 26*1024*1024*1024,					// минимальный общий объём диска для резервных копий в байтах
	argQuote: '"',										// значение кавычки для аргумента
	argDelim: ' ',										// разделитель значений агрументов
	getDelim: '+',										// разделитель который нужно заменить
	setDelim: '#',										// разделитель на который нужно заменить
	csvDelim: ';',										// разделитель значений для файла выгрузки
	envType: 'Process'									// тип изменяемого переменного окружения
});

// подключаем зависимые свойства приложения
(function(wsh, app, undefined){
	app.lib.extend(app, {
		fun: {// зависимые функции частного назначения
			wql2date: function(wql){// преобразовывает дату из запроса
			//@param date {string} - дата из запроса
			//@return {date} - преобразованная дата
				return new Date(Date.UTC(
					1 * wql.substr(0, 4),
					1 * wql.substr(4, 2) - 1,
					1 * wql.substr(6, 2),
					1 * wql.substr(8, 2),
					1 * wql.substr(10, 2) - 1 * wql.substr(21, 4),
					1 * wql.substr(12, 2),
					1 * wql.substr(14, 3)
				));
			},
			bin2key: function(bin){// преобразовывает бинарные данные в ключ продукта
			//@param bin {binary} - бинарные данные ключа продукта
			//@return {string} - строковое значение ключа продукта
				var isWin8, list, cur, last, part, pref = 'N',
					chars = 'BCDFGHJKMPQRTVWXY2346789',
					key = '', offset = 52;
				
				list = bin.toArray();
				isWin8 = Math.floor(list[66] / 6) & 1;
				list[66] = list[66] & 247 | (isWin8 & 2) * 4;
				for(var i = 24; i > -1; i--){// пробигаемся по индексу
					cur = 0;// сбрасываем значение курсора
					for(var j = 14; j > -1; j--){// пробигаемся по индексу
						cur = cur * 256;
						cur = list[j + offset] + cur;
						list[j + offset] = Math.floor(cur / 24);
						cur = cur % 24;
					};
					key = chars.substr(cur, 1) + key;
					last = cur;
				};
				if(1 == isWin8){// если это Windows 8
					part = key.substr(1, last);
					key = key.substr(1).replace(part, part + pref);
				};
				// возвращаем результат
				return [// форматируем ключ
					key.substr( 0, 5),
					key.substr( 5, 5),
					key.substr(10, 5),
					key.substr(15, 5),
					key.substr(20, 5)
				].join('-');
			},
			info2str: function(info, decim, base){// преобрзовывает число информации в строку
			//@param info {number} - колличество информации в битах или байтах
			//@param decim {number} - количество знаков после запятой
			//@param base {number} - база для преобразования
			//@return {string} - строковое значение с первой буквой степени
				var factor, value, prefix = 'КМГТПЭЗЙ';
				
				if(!base || base < 2) base = 1024;
				if(!decim || decim < 0) decim = 0;
				factor = Math.pow(10, decim);
				for(var i = -1; info >= base; i++) info = info / base;
				value = Math.ceil(info * factor) / factor;
				value = app.lib.num2str(value, i > -1 ? decim : 0, ',', '');
				value += ' ' + prefix.charAt(i);
				return value;
			},
			clear: function(value){// очищает текст от лишних символов
			//@param value {string} - текс для очистки от лишних данных
			//@return {string} - очищенный текст
				value = value ? '' + value : '';
				// очищаем по полному содержимому
				if('INVALID' == value) value = '';
				if('To be filled by O.E.M.' == value) value = '';
				if('Default string' == value) value = '';
				if('empty' == value) value = '';
				if('None' == value) value = '';
				// очищаем по переданному содержимому
				for(var i = 1, iLen = arguments.length; i < iLen; i++){
					value = value.replace(arguments[i], '');
				};
				// очищаем по регулярному вырожению
				return value
					.replace(/^['"]|["']$/g, '') 				// кавычки в начале и в конце
					.replace(/^\s+|\s+$/g, '') 					// пробельные символы в начале и в конце
					.replace(/\.+$/, '') 						// точки в конце строки
					.replace(/\(R\)/gi, '') 					// символ патента
					.replace(/\(Registered Trademark\)/gi, '')	// тарговая марка
					.replace(/\(Microsoft Corporation\)/gi, '')	// тарговая марка
					.replace(/\(Корпорация Майкрософт\)/gi, '')	// тарговая марка
					.replace(/\(Майкрософт\)/gi, '') 			// тарговая марка
					.replace(/\(TM\)/gi, '')					// символ тарговой марки
					.replace(/\s(?=\s)/gi, '')					// лишнии пробельные символы
				;
			},
			repair: function(value){// испровляет текст для запроса
			//@param value {string} - текст для исправления
			//@return {string} - исправленный текст
				value = "'" + (value ? value : '') + "'";
				return value.replace(/\\/g, '\\\\');
			}
		},
		init: function(){// функция инициализации приложения
			var shell, key, value, list, locator, service, registry,
				method, param, item, items, command, id, time, drive,
				score, pattern, total, benchmark = 0, index = 0,
				host = '', domain = '', data = {};
			
			time = new Date();
			// получаем хост
			id = '.';// начальное значение идентификатора
			if(wsh.arguments.length > 0){// если указан хост
				value = wsh.arguments.item(0);
				if(!value.indexOf('\\\\') && -1 == value.indexOf('\\', 2)){
					id = value.substr(2);
					index++;
				};
			};
			// создаём служебные объекты
			shell = new ActiveXObject('WScript.Shell');
			locator = new ActiveXObject('wbemScripting.Swbemlocator');
			// настраиваем служебные объекты
			locator.security_.impersonationLevel = 3;
			try{// пробуем подключиться к компьютеру
				service = locator.connectServer(id, 'root\\CIMV2');
				registry = locator.connectServer(id, 'root\\default').get('stdRegProv');
			}catch(e){service = null;};
			if(service){// если удалось получить доступ к сервису
				// вычисляем ключ операционной системы
				method = registry.methods_.item('getBinaryValue');
				param = method.inParameters.spawnInstance_();
				param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
				param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion';
				param.sValueName = 'DigitalProductId';
				item = registry.execMethod_(method.name, param); 
				if(!item.returnValue){// если удалось прочитать значение
					value = app.fun.bin2key(item.uValue);// преобразовываем значение ключа
					if(value && 'BBBBB-BBBBB-BBBBB-BBBBB-BBBBB' != value){// если ключ не пуст
						data['SYS-KEY'] = value;
					};
				};
				// вычисляем характеристики операционной системы
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_OperatingSystem\
					 WHERE primary = TRUE"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					if(value = item.systemDrive) drive = value;
					if(value = item.localDateTime) time = app.fun.wql2date(value);
					// характеристики
					if(value = app.fun.clear(item.caption, 'Майкрософт', 'Microsoft', 'Edition', 'x64', ',')) data['SYS-NAME'] = value;
					if(value = app.fun.clear(item.version)) data['SYS-VERSION'] = value;
					if(value = item.localDateTime) data['SYS-TIME'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					if(value = item.localDateTime) data['SYS-TIME-YEAR'] = app.lib.date2str(app.fun.wql2date(value), 'Y');
					if(value = item.localDateTime) data['SYS-TIME-MONTH'] = app.lib.date2str(app.fun.wql2date(value), 'm');
					if(value = item.localDateTime) data['SYS-TIME-DAY'] = app.lib.date2str(app.fun.wql2date(value), 'd');
					if(value = item.localDateTime) data['SYS-TIME-HOUR'] = app.lib.date2str(app.fun.wql2date(value), 'H');
					if(value = item.localDateTime) data['SYS-TIME-MINUTE'] = app.lib.date2str(app.fun.wql2date(value), 'i');
					if(value = item.localDateTime) data['SYS-TIME-SECOND'] = app.lib.date2str(app.fun.wql2date(value), 's');
					if(value = app.fun.clear(item.systemDrive)) data['SYS-DRIVE'] = value;
					if(value = item.installDate) data['SYS-INSTALL'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					if(value = item.lastBootUpTime) data['SYS-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					if(value = app.fun.clear(item.serialNumber)) data['SYS-SERIAL'] = value;
					if(value = app.fun.clear(item.description)) data['SYS-DESCRIPTION'] = value;
					data['SYS-ARCHITECTURE'] = item.osArchitecture && !item.osArchitecture.indexOf('64') ? 'x64' : 'x86';
					// останавливаемся на первом элименте
					break;
				};
				// вычисляем характеристики материнской платы
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT manufacturer, product, serialNumber\
					 FROM Win32_BaseBoard\
					 WHERE hostingBoard = TRUE"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// характеристики
					if(value = app.fun.clear(item.product)) data['PCB-NAME'] = value;
					if(value) if(value = app.fun.clear(item.manufacturer)) data['PCB-NAME'] = value.split(' ')[0] + ' ' + app.fun.clear(item.product);
					if(value = app.fun.clear(item.serialNumber)) data['PCB-SERIAL'] = value;
					// останавливаемся на первом элименте
					break;
				};
				// вычисляем характеристики сетевого соединения
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_NetworkAdapterConfiguration\
					 WHERE ipEnabled = TRUE"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					if(value = item.interfaceIndex) id = value;
					// основной адрес 
					if(null != item.ipAddress){// если есть список ip адресов
						list = item.ipAddress.toArray();// получаем очередной список
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// получаем очередное значение
							if(value && -1 != value.indexOf('.') && !data['NET-IP-V4']) data['NET-IP-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-IP-V6']) data['NET-IP-V6'] = value;
						};
					};
					// основной шлюз
					if(null != item.defaultIPGateway){// если есть список ip адресов
						list = item.defaultIPGateway.toArray();// получаем очередной список
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// получаем очередное значение
							if(value && -1 != value.indexOf('.') && !data['NET-GATEWAY-V4']) data['NET-GATEWAY-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-GATEWAY-V6']) data['NET-GATEWAY-V6'] = value;
						};
					};
					// основной dns
					if(null != item.dnsServerSearchOrder){// если есть список ip адресов
						list = item.dnsServerSearchOrder.toArray();// получаем очередной список
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// получаем очередное значение
							if(value && -1 != value.indexOf('.') && !data['NET-DNS-V4']) data['NET-DNS-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-DNS-V6']) data['NET-DNS-V6'] = value;
						};
					};
					// основная маска
					if(null != item.ipSubnet){// если есть список ip адресов
						list = item.ipSubnet.toArray();// получаем очередной список
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// получаем очередное значение
							if(value && -1 != value.indexOf('.') && !data['NET-SUBNET-V4']) data['NET-SUBNET-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-SUBNET-V6']) data['NET-SUBNET-V6'] = value;
						};
					};
					// характеристики
					if(value = app.fun.clear(item.dhcpServer)) data['NET-DHCP-V4'] = value;
					if(value = app.fun.clear(item.description, 'Сетевой адаптер', 'Адаптер', 'для виртуальной сети', 'Сетевая карта', 'Контроллер', 'NIC (NDIS 6.20)', '- Минипорт планировщика пакетов')) data['NET-NAME'] = value;
					if(value = app.fun.clear(item.macAddress)) data['NET-MAC'] = value;
					// останавливаемся на первом элименте
					break;
				};
				// вычисляем характеристики сетевого адаптера
				score = 0;// обнуляем текущую оценку
				response = service.execQuery(
					"SELECT speed, timeOfLastReset\
					 FROM Win32_NetworkAdapter\
					 WHERE netEnabled = TRUE\
					 AND interfaceIndex = " + app.fun.repair(id)
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// характеристики
					if(value = item.speed) data['NET-SPEED'] = app.fun.info2str(value , 0, 1000) + 'бит/с';
					if(value = item.speed) data['NET-SPEED-VAL'] = value;
					if(value = item.timeOfLastReset) data['NET-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					// косвенно считаем производительность
					if(value = item.speed) score += 8.12567 * Math.sqrt(value / 100 / 1000 / 1000);
					// останавливаемся на первом элименте
					break;
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// вычисляем характеристики сетевой идентификации
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_ComputerSystem"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					if(value = item.dnsHostName) host = value;
					if(value = item.name) if(!host) host = value.toLowerCase();
					if(item.domain != item.workgroup) domain = item.domain;
					if(value = item.userName) id = value;
					// характеристики
					if(value = app.fun.clear(host)) data['NET-HOST'] = value;
					if(value = app.fun.clear(item.domain)) data['NET-DOMAIN'] = value;
					if(value = app.fun.clear(item.userName)) data['USR-LOGIN'] = value;
					if(value = app.fun.clear(item.userName)) data['USR-DOMAIN'] = value.split('\\')[0];
					if(value = app.fun.clear(item.userName)) data['USR-ACCOUNT'] = value.split('\\')[1];
					// останавливаемся на первом элименте
					break;
				};
				// поправка на старые операционные системы
				if(!id){// если идентификатор пользователя неопределён
					list = [];// сбрасываем список значений
					// вычисляем имя пользователя поумолчанию
					method = registry.methods_.item('getStringValue');
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
					param.sValueName = 'DefaultDomainName';
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) list.push(item.sValue);
					// вычисляем домен пользователя поумолчанию
					method = registry.methods_.item('getStringValue');
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
					param.sValueName = 'DefaultUserName';
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) list.push(item.sValue);
					// формируем идентификатор пользователя
					if(2 == list.length) id = list.join('\\');
					if(value = app.fun.clear(id)) data['USR-LOGIN'] = value;
					if(value = app.fun.clear(id)) data['USR-DOMAIN'] = value.split('\\')[0];
					if(value = app.fun.clear(id)) data['USR-ACCOUNT'] = value.split('\\')[1];
				};
				// вычисляем характеристики пользователя
				response = service.execQuery(
					"SELECT fullName, sid\
					 FROM Win32_UserAccount\
					 WHERE domain = " + app.fun.repair(id.split('\\')[0]) + "\
					 AND name = " + app.fun.repair(id.split('\\')[1])
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					if(value = item.sid) id = value;
					// характеристики
					if(value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
					if(value = app.fun.clear(item.sid)) data['USR-SID'] = value;
					// останавливаемся на первом элименте
					break;
				};
				// поправка для доменных пользователей
				try{// пробуем подключиться к домену
					(function(){// замыкаем для локальных переменных
						var service = locator.connectServer(domain, 'root\\CIMV2');
						// вычисляем характеристики доменного пользователя
						response = service.execQuery(
							"SELECT fullName, sid\
							 FROM Win32_UserAccount\
							 WHERE domain = " + app.fun.repair(id.split('\\')[0]) + "\
							 AND name = " + app.fun.repair(id.split('\\')[1])
						);
						items = new Enumerator(response);
						for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
							item = items.item();// получаем очередной элимент коллекции
							if(value = item.sid) id = value;
							// характеристики
							if(value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
							if(value = app.fun.clear(item.sid)) data['USR-SID'] = value;
							// останавливаемся на первом элименте
							break;
						};
					})();
				}catch(e){};
				// вычисляем характеристики профиля пользователя
				response = service.execQuery(
					"SELECT localPath\
					 FROM Win32_UserProfile\
					 WHERE sid = " + app.fun.repair(id)
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// характеристики
					if(value = app.fun.clear(item.localPath)) data['USR-PROFILE'] = value;
					// останавливаемся на первом элименте
					break;
				};
				// вычисляем характеристики центрального процессора
				score = 0;// обнуляем текущую оценку
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT architecture, maxClockSpeed, name, revision, numberOfCores, socketDesignation\
					 FROM Win32_Processor\
					 WHERE role = 'CPU'"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// характеристики
					if(0 == item.architecture) data['CPU-ARCHITECTURE'] = 'x86';
					else if(9 == item.architecture) data['CPU-ARCHITECTURE'] = 'x64';
					if(value = item.maxClockSpeed) data['CPU-SPEED'] = app.fun.info2str(value * 1000 * 1000, 2, 1000) + 'Гц';
					if(value = item.maxClockSpeed) data['CPU-SPEED-VAL'] = value * 1000 * 1000;
					if(value = app.fun.clear(item.name, 'CPU', 'APU', 'Процессор', 'Processor', 'with', 'Radeon HD Graphics')) data['CPU-NAME'] = value;
					if(value = app.fun.clear(item.revision)) data['CPU-VERSION'] = value;
					if(value = item.numberOfCores) data['CPU-CORE'] = value;
					if(value = app.fun.clear(item.socketDesignation, 'SOCKET 0')) data['CPU-SOCKET'] = value;
					// косвенно считаем производительность
					if(value = item.maxClockSpeed) score += 2.26143 * Math.sqrt(value / 1000);
					if(value = item.numberOfCores) score *= 1.02033 * Math.sqrt(value);
					// останавливаемся на первом элименте
					break;
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// вычисляем характеристики кеша процессора
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT level, maxCacheSize\
					 FROM Win32_CacheMemory"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// характеристики
					if(value = item.maxCacheSize) data['CPU-CACHE-L' + (item.level - 2)] = app.fun.info2str(value * 1024, 0) + 'Б';
				};
				// вычисляем характеристики оперативной памяти
				score = 0;// обнуляем текущую оценку
				total = 0;// обнуляем значение для суммирования
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT capacity, speed\
					 FROM Win32_PhysicalMemory"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// характеристики
					if(value = item.capacity) data['RAM-SIZE-VAL'] = total += 1 * value;
					if(value = item.capacity) data['RAM-SIZE'] = app.fun.info2str(total, 0) + 'Б';
					if(value = item.speed) data['RAM-SPEED'] = value + ' МГц';
					if(value = item.speed) data['RAM-SPEED-VAL'] = value * 1000 * 1000;
					// косвенно считаем производительность
					if(value = total) score = 2.51143 * Math.sqrt(value / 1024 / 1024 / 1024);
					if(value = item.speed) score *= 0.92245 * Math.sqrt(value / 1000);
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// вычисляем характеристики графического процессора
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT adapterRam, name, driverVersion, currentHorizontalResolution, currentRefreshRate, currentBitsPerPixel, currentVerticalResolution\
					 FROM Win32_VideoController"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// характеристики
					if(value = item.adapterRam) data['GPU-SIZE'] = app.fun.info2str(Math.abs(value), 0) + 'Б';
					if(value = item.adapterRam) data['GPU-SIZE-VAL'] = Math.abs(value);
					if(value = app.fun.clear(item.name, 'GPU', 'Видеоустройство', 'Family', 'Chipset', 'Series', 'Graphics')) data['GPU-NAME'] = value;
					if(value = app.fun.clear(item.driverVersion)) data['GPU-VERSION'] = value;
					if(item.currentHorizontalResolution && item.currentVerticalResolution) data['GPU-RESOLUTION'] = item.currentHorizontalResolution + ' x ' + item.currentVerticalResolution;
					if(value = item.currentHorizontalResolution) data['GPU-RESOLUTION-X'] = value;
					if(value = item.currentVerticalResolution) data['GPU-RESOLUTION-Y'] = value;
					if(value = item.currentRefreshRate) data['GPU-FREQUENCY'] = app.fun.info2str(value, 0, 1000) + 'Гц';
					if(value = item.currentRefreshRate) data['GPU-FREQUENCY-VAL'] = value;
					if(value = item.currentBitsPerPixel) data['GPU-COLOR'] = app.fun.info2str(value, 0) + 'бит' + app.lib.numDeclin(value, '', '', 'а');
					if(value = item.currentBitsPerPixel) data['GPU-COLOR-VAL'] = value;
					// останавливаемся на первом элименте
					break;
				};
				// вычисляем дисковую подсистему
				score = 0;// обнуляем текущую оценку
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_DiskDrive"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					// определяем тип насителя
					switch(item.mediaType){// поддерживаемые типы
						case 'Removable Media':
							key = 'USB';
							break;
						case 'Fixed	hard disk media':
						case 'Fixed hard disk media':
							if(item.caption && -1 != item.caption.indexOf('Solid')) key = 'SSD';
							else if(item.caption && -1 != item.caption.indexOf('SSD')) key = 'SSD';
							else if(item.caption && !item.caption.indexOf('ADATA')) key = 'SSD';
							else key = 'HDD';
							break;
						default:
							key = '';
					};
					// пропускаем непонятные и повторяющийся типы насителя
					if(item.caption && -1 != item.caption.indexOf('Raid')) continue;
					if(!key || data[key + '-NAME']) continue;
					// характеристики
					if(value = app.fun.clear(item.caption, 'ATA Device', 'SCSI Disk Device', 'USB Device', 'SSD')) data[key + '-NAME'] = value;
					if(value = app.fun.clear(item.firmwareRevision)) data[key + '-VERSION'] = value;
					if(value = app.fun.clear(item.interfaceType)) data[key + '-TYPE'] = value;
					if(value = app.fun.clear(item.serialNumber)) data[key + '-SERIAL'] = value;
					if(value = item.size) data[key + '-SIZE'] = app.fun.info2str(value, 0) + 'Б';
					if(value = item.size) data[key + '-SIZE-VAL'] = value;
					// косвенно считаем производительность
					if(value = key) score = Math.max(score, 'SDD' == value ? 15.51143 : 7.14577);
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// вычисляем оптический накопитель
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT mediaType, caption, drive\
					 FROM Win32_CDROMDrive"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					if(item.caption && -1 != item.caption.indexOf('Alcohol')) continue;
					if(item.caption && -1 != item.caption.indexOf('Virtual')) continue;
					// определяем тип насителя
					switch(item.mediaType){// поддерживаемые типы
						case 'CD-ROM': data['ROM-TYPE'] = 'CD'; break;
						case 'DVD-ROM': data['ROM-TYPE'] = 'DVD'; break;
						case 'CD Writer': data['ROM-TYPE'] = 'CD-RW'; break;
						case 'DVD Writer': data['ROM-TYPE'] = 'DVD-RW'; break;
					};
					// характеристики
					if(value = app.fun.clear(item.caption, 'ATA Device', 'SCSI CdRom Device')) data['ROM-NAME'] = value;
					if(value = app.fun.clear(item.drive)) data['ROM-DRIVE'] = value;
					// останавливаемся на первом элименте
					break;
				};
				// вычисляем букву диска для резервных копий
				id = '';// сбрасываем идентификатор элимента
				response = service.execQuery(
					"SELECT caption, size\
					 FROM Win32_LogicalDisk\
					 WHERE driveType = 2 OR driveType = 3 OR driveType = 4"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					if(item.caption && -1 != item.caption.indexOf(drive) || data['BAK-DRIVE']) continue;
					// характеристики
					if(value = app.fun.clear(item.caption)) if(item.size >= app.val.driveMinSize) data['BAK-DRIVE'] = value;
				};
				// ищем корневую папку программы eFarma
				id = '';// сбрасываем идентификатор элимента
				key = '\\Client\\ePlus.Client.exe';
				list = [// список путей для проверки
					'C:\\eFarma2',
					'D:\\eFarma2'
				];
				value = '';// сбрасываем значение для запроса
				for(var i = 0, iLen = list.length; i < iLen; i++){
					if(i) value += ' OR ';// добавляем разделитель
					value += 'name = ' + app.fun.repair(list[i] + key);
				};
				response = service.execQuery(
					"SELECT name\
					 FROM CIM_DataFile\
					 WHERE " + value
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					for(var i = 0, iLen = list.length; i < iLen; i++){
						value = (list[i] + key).toLowerCase();
						if(item.name && item.name.toLowerCase() == value){
							// характеристики
							data['APP-EFARMA'] = list[i] + key;
							data['APP-EFARMA-DIR'] = list[i];
							// останавливаемся на первом элименте
							break;
						};
					};
				};
				// ищем корневую папку программы УЛУС
				id = '';// сбрасываем идентификатор элимента
				value = app.lib.date2str(time, 'Y');
				key = '\\ULUS.exe';
				list = [// список путей для проверки
					'C:\\SoftLink\\Ulus\\' + value,
					'C:\\LO\\ULUS\\' + value,
					'C:\\so\\Ulus\\' + value,
					'C:\\ULUS\\' + value
				];
				value = '';// сбрасываем значение для запроса
				for(var i = 0, iLen = list.length; i < iLen; i++){
					if(i) value += ' OR ';// добавляем разделитель
					value += 'name = ' + app.fun.repair(list[i] + key);
				};
				response = service.execQuery(
					"SELECT name\
					 FROM CIM_DataFile\
					 WHERE " + value
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// пробигаемся по коллекции
					item = items.item();// получаем очередной элимент коллекции
					for(var i = 0, iLen = list.length; i < iLen; i++){
						value = (list[i] + key).toLowerCase();
						if(item.name && item.name.toLowerCase() == value){
							// характеристики
							data['APP-ULUS'] = list[i] + key;
							data['APP-ULUS-DIR'] = list[i];
							// останавливаемся на первом элименте
							break;
						};
					};
				};
				// ищем корневую папку программы Chrome
				id = '';// сбрасываем идентификатор элимента
				key = '';// ключ для проверки
				list = [// список путей для проверки
					'SOFTWARE\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command',
					'SOFTWARE\\WOW6432Node\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command'
				];
				value = '';// сбрасываем значение переменной
				method = registry.methods_.item('getStringValue');
				for(var i = 0, iLen = list.length; i < iLen && !value; i++){
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = list[i];
					param.sValueName = key;
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
				};
				if(value){// если удалось получить значение
					key = '\\';// разделитель
					list = value.split(key);
					list.pop();// удаляем последнай элимент
					// характеристики
					data['APP-CHROME'] = value;
					data['APP-CHROME-DIR'] = list.join(key);
				};
				// ищем корневую папку программы VLC
				id = '';// сбрасываем идентификатор элимента
				key = '';// ключ для проверки
				list = [// список путей для проверки
					'SOFTWARE\\VideoLAN\\VLC',
					'SOFTWARE\\WOW6432Node\\VideoLAN\\VLC'
				];
				value = '';// сбрасываем значение переменной
				method = registry.methods_.item('getStringValue');
				for(var i = 0, iLen = list.length; i < iLen && !value; i++){
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = list[i];
					param.sValueName = key;
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
				};
				if(value){// если удалось получить значение
					key = '\\';// разделитель
					list = value.split(key);
					list.pop();// удаляем последнай элимент
					// характеристики
					data['APP-VLC'] = value;
					data['APP-VLC-DIR'] = list.join(key);
				};
				// вычисляем идентификатор TeamViewer
				id = '';// сбрасываем идентификатор элимента
				key = 'ClientID';// ключ для проверки
				list = [// список путей для проверки
					'SOFTWARE\\TeamViewer',
					'SOFTWARE\\WOW6432Node\\TeamViewer'
				];
				value = '';// сбрасываем значение переменной
				method = registry.methods_.item('getDWORDValue');
				for(var i = 0, iLen = list.length; i < iLen && !value; i++){
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = list[i];
					param.sValueName = key;
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.uValue) value = app.fun.clear(item.uValue);
				};
				if(value){// если удалось получить значение
					// характеристики
					data['APP-TEAMVIEWER-ID'] = value;
				};
				// вычисляем номер аптечного пункта
				value = host.toLowerCase();
				if(0 == value.indexOf(app.val.aptPref)){// если это компьютер в аптеки
					value = value.substr(app.val.aptPref.length, app.val.aptLen);
					if(!isNaN(value)){// если удалось получить номер аптеки
						data['APT-NUMBER'] = value || app.val.aptNone;
						data['APT-NUMBER-VAL'] = Number(value);
					};
				};
				// вычисляем номер компьютера в аптечном пункте
				value = host.toLowerCase();
				if(0 == value.indexOf(app.val.aptPref)){// если это компьютер в аптеки
					value = value.substr(app.val.aptPref.length + app.val.aptLen);
					if(value){// если это не основной компьютер в аптечном пункте
						if(0 == value.indexOf(app.val.wsPref)){// если это дополнительный компьютер
							value = value.substr(app.val.wsPref.length, app.val.wsLen);
							if(!isNaN(value)){// если удалось получить номер компьютера
								value = Number(value);
							}else value = 0;
						}else value = 0;
					}else value = 1;
					data['APT-COMPUTER-VAL'] = value;
					if(0 == value) data['APT-COMPUTER'] = app.val.wsNoneDesc;
					else if(1 == value) data['APT-COMPUTER'] = app.val.wsFirstDesc;
					else data['APT-COMPUTER'] = app.val.wsNextDesc;
				};
				// вычисляем реквизиты технической поддержки
				value = host.toLowerCase();
				if(0 == value.indexOf(app.val.aptPref)){// если это компьютер в аптеки
					value = value.substr(app.val.aptPref.length, app.val.aptLen);
					if(!isNaN(value)){// если удалось получить номер аптеки
						list = [app.val.supportLogin, Number(value), app.val.supportToken];
						data['APT-SUPPORT-HASH'] = app.lib.md5(list.join(''));
						data['APT-SUPPORT-LOGIN'] = app.val.supportLogin;
					};
				};
				// вычисляем сумарное название компьютера
				list = [];// очищаем значение переменной
				if(data['CPU-NAME'] && data['CPU-CORE'] && data['CPU-SPEED']) list.push(app.fun.clear(data['CPU-NAME'].replace('Dual-Core', 'Intel'), 'Dual Core', 'Xeon', 'Pentium', 'Celeron', 'Core2 Duo', 'Core', 'Processor', 'Athlon 64', 'Athlon', /,.+/, /@.+/, /\d\.d+GHz/) + ' ' + data['CPU-CORE'] + 'x' + data['CPU-SPEED'].replace(',', '.').replace(' МГц', 'M').replace(' ГГц', 'G') + 'Hz');
				if(data['RAM-SIZE'] && data['RAM-SPEED']) list.push(data['RAM-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB') + ' ' + data['RAM-SPEED'].replace(' МГц', 'M').replace(' ГГц', 'G') + 'Hz');
				if(data['GPU-SIZE'] && data['GPU-NAME'] && (-1 != data['GPU-NAME'].indexOf('GeForce') || -1 != data['GPU-NAME'].indexOf('Radeon'))) list.push(data['GPU-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB') + ' ' + app.fun.clear(data['GPU-NAME'], 'AMD', 'NVIDIA', 'GeForce', 'Radeon', /\(.+/));
				if(data['HDD-SIZE']) list.push(data['HDD-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB').replace(' ТБ', 'TB') + ' HDD');
				if(data['SSD-SIZE']) list.push(data['SSD-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB').replace(' ТБ', 'TB') + ' SSD');
				if(data['USB-SIZE']) list.push(data['USB-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB').replace(' ТБ', 'TB') + ' USB');
				if(data['ROM-TYPE']) list.push(data['ROM-TYPE']);
				if(list.length) data['DEV-NAME'] = list.join('/');
				// вычисляем конечный индекс производительности
				if(benchmark) data['DEV-BENCHMARK'] = app.lib.num2str(benchmark, 5, ',', '');
			};
			// добавляем новые переменные во временное окружение
			items = shell.environment(app.val.envType);
			for(var key in data){// пробигаемся по списку с данными
				value = data[key];// получаем очередное значение
				items(key) = value;// мне тоже это не нравится но другого способа пока не найдено
			};
			// готовим командную строку для вызова
			items = [];// сбрасываем список аргументов
			for(var i = 0, iLen = wsh.arguments.length - index; i < iLen; i++){
				value = wsh.arguments.item(i + index);// получаем очередное значение аргуумента
				value = value.split(app.val.getDelim).join(app.val.setDelim);
				// поправка на служебные параметры
				if(!i && 'silent' == value) app.val.runStyle = 0;
				else if(!i && 'print' == value) wsh.echo(app.lib.obj2str(data, false, '\r\n', ' = '));
				else if(!i && 'csv' == value){// если необходимо выгрузить
					list = [// список выводимых данных
						'SYS-KEY', 'SYS-NAME', 'SYS-VERSION', 'SYS-TIME', 'SYS-ARCHITECTURE', 'SYS-DRIVE', 'SYS-INSTALL', 'SYS-RESET', 'SYS-SERIAL',
						'PCB-NAME', 'PCB-SERIAL',
						'NET-IP-V4', 'NET-GATEWAY-V4', 'NET-DNS-V4', 'NET-SUBNET-V4', 'NET-DHCP-V4', 'NET-NAME', 'NET-MAC', 'NET-SPEED', 'NET-RESET', 'NET-HOST', 'NET-DOMAIN',
						'USR-LOGIN', 'USR-DOMAIN', 'USR-ACCOUNT', 'USR-NAME', 'USR-SID', 'USR-PROFILE',
						'CPU-ARCHITECTURE', 'CPU-SPEED', 'CPU-NAME', 'CPU-CORE', 'CPU-SOCKET', 'CPU-CACHE-L1', 'CPU-CACHE-L2', 'CPU-CACHE-L3',
						'RAM-SIZE', 'RAM-SPEED', 'GPU-SIZE', 'GPU-NAME', 'GPU-VERSION', 'GPU-RESOLUTION', 'GPU-FREQUENCY', 'GPU-COLOR',
						'SSD-NAME', 'SSD-VERSION', 'SSD-TYPE', 'SSD-SERIAL', 'SSD-SIZE', 
						'HDD-NAME', 'HDD-VERSION', 'HDD-TYPE', 'HDD-SERIAL', 'HDD-SIZE',
						'USB-NAME', 'USB-VERSION', 'USB-TYPE', 'USB-SERIAL', 'USB-SIZE',
						'ROM-TYPE', 'ROM-NAME', 'ROM-DRIVE', 'ROM-VERSION',
						'DEV-NAME', 'DEV-BENCHMARK'
					];
					for(var j = 0, jLen = list.length; j < jLen; j++){
						key = list[j];// получаем очередной ключ
						list[j] = data[key] ? data[key] : '';
					};
					wsh.echo(list.join(app.val.csvDelim));
				}else{// если это не служебный параметр
					if(!i){// если это первый параметр
						for(var key in data){// пробигаемся по данными
							pattern = new RegExp('%' + key + '%', 'gi');
							value = value.replace(pattern, data[key]);
						};
					};
					if(-1 != value.indexOf(app.val.argDelim)){// если есть в значении разделитель
						value = app.val.argQuote + value + app.val.argQuote;
					};
					items.push(value);
				};
			};
			command = items.join(app.val.argDelim);
			// вызываем командную строку
			try{// пробуем выполнить команду
				if(command) value = shell.run(command, app.val.runStyle, true);
				else value = app.val.defReturn;
			}catch(e){// при возникновении ошибки
				value = app.val.defReturn;
			};
			// завершаем сценарий кодом
			wsh.quit(value);
		}
	});
})(WSH, environment);
// запускаем инициализацию
environment.init();