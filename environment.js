/*! 0.0.28 ���������� �������������� ���������� ����� */

// 0.3.15 ����������� ��������� ����������
function App(a){this.val=a};

// 0.1.4 ���������� ������� ������ ����������
(function(q,B){q.lib={strFirstUpperCase:function(a){return a.substr(0,1).toUpperCase()+a.substr(1)},clone:function(a){switch(!0){case q.lib.validate(a,"date"):var b=new Date(a);break;case q.lib.validate(a,"array"):b=[];for(var c=0,e=a.length;c<e;c++)b[c]=q.lib.clone(a[c]);break;case q.lib.validate(a,"object"):b={};for(c in a)b[c]="prototype"!==c?q.lib.clone(a[c]):a[c];break;default:b=a}return b},compare:function(a,b,c){var e=0;b||(b=null);switch(!0){case q.lib.validate(a,"string"):b=q.lib.convert(b,
"string");c&&(a=a.toLowerCase(),b=b.toLowerCase());break;case q.lib.validate(a,"array"):b=b&&b.length?b.length:0;a=a.length;break;case q.lib.validate(a,"date"):b=b&&b.valueOf()?b.valueOf():0,a=a.valueOf()}a>b&&(e=1);a<b&&(e=-1);return e},difference:function(a,b,c){var e;c||(c=q.lib.compare);if(q.lib.validate(a,"array")){b||(b=[]);for(var d=0,k=a.length;d<k;d++){var p=a[d];for(var g=0,h=b.length;g<h;g++){var m=b[g];if(value=c(p,m))e||(e=[]),e.push(p)}}}else if(q.lib.validate(a,"object"))for(d in b||
(b={}),a)p=a[d],m=b[d],value=q.lib.difference(p,m,c),q.lib.validate(value,"undefined")||(e||(e={}),e[d]=value);else(value=q.lib.compare(a,b))&&(e=a);return e},strim:function(a,b,c,e,d){var k="";a=a?a.toString():k;b=b?b.toString():k;c=c?c.toString():k;if(d){var p=c?a.lastIndexOf(c):a.length;d=b&&~p?a.lastIndexOf(b,p-1):0}else d=b?a.indexOf(b):0,p=c&&~d?a.indexOf(c,d+b.length):a.length;~d&&~p&&(d=e?d:d+b.length,p=e?p+c.length:p,k=a.substr(d,p-d));return k},trim:function(a){return(a||"").replace(/^\s+|\s+$/g,
"")},validate:function(a,b){var c;switch(b){case "email":b="^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";break;case "password":b="(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";break;case "guid":b="^{[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}}$";break;case "md5":b="^[0-9a-fA-F]{32}$"}switch(b){case "string":a="[object String]"===Object.prototype.toString.call(a);break;case "number":a="[object Number]"===Object.prototype.toString.call(a);break;case "boolean":a=
"[object Boolean]"===Object.prototype.toString.call(a);break;case "function":a="[object Function]"===Object.prototype.toString.call(a);break;case "form":a=!(!a||!a.tagName||"form"!==a.tagName.toLowerCase());break;case "files":a="[object FileList]"===Object.prototype.toString.call(a);break;case "date":a="[object Date]"===Object.prototype.toString.call(a);break;case "array":a=Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a);break;case "xml":a=!(!a||!(c=(a.ownerDocument||
a).documentElement)||"html"===c.nodeName.toLowerCase());break;case "undefined":a=void 0===a;break;case "null":a=null===a;break;case "object":a=a===Object(a)&&"[object Null]"!==Object.prototype.toString.call(a)&&"[object Date]"!==Object.prototype.toString.call(a)&&"[object Function]"!==Object.prototype.toString.call(a)&&"[object FileList]"!==Object.prototype.toString.call(a)&&"[object Array]"!==Object.prototype.toString.call(a)&&!(a&&(c=(a.ownerDocument||a).documentElement)&&"html"!==c.nodeName.toLowerCase())&&
!(a&&a.tagName&&"form"===a.tagName.toLowerCase());break;default:a=(new RegExp(b)).test(""+a)}return a},obj2str:function(a,b,c,e,d){var k=[];c||(c="&");e||(e="=");d||(d=",");for(var p in a){var g=a[p];var h=b?encodeURIComponent(p):p;switch(!0){case q.lib.validate(g,"array"):g=g.join(d);case !q.lib.validate(g,"undefined"):h+=e,h+=b?encodeURIComponent(g):g}k.push(h)}return k.join(c)},str2obj:function(a,b,c,e){var d,k={};c||(c="&");e||(e="=");c=a.split(c);for(var p=0,g=c.length;p<g;p++)if(d=c[p])d=d.split(e,
2),a=d[0],d=d[1],a=b?decodeURIComponent(a):a,d=b&&d?decodeURIComponent(d):d,k[a]=d;return k},url2obj:function(a){var b=a,c={},e=!1;a="fragment";var d="#";-1!=b.indexOf(d)&&(c[a]=q.lib.strim(b,d,null,!1),b=q.lib.strim(b,null,d,!1));a="query";d="?";-1!=b.indexOf(d)&&(c[a]=q.lib.strim(b,d,null,!1),b=q.lib.strim(b,null,d,!1));a="scheme";d="//";0==b.indexOf(d)&&(c[a]=q.lib.strim(b,null,d,!1),b=q.lib.strim(b,d,null,!1),e=!0);a="path";d="/";b.indexOf("://")>b.indexOf(d)&&(c[a]=q.lib.strim(b,d,null,!0),b=
q.lib.strim(b,null,d,!1));a="path";d="://";0==b.indexOf(d)&&(c[a]=q.lib.strim(b,d,null,!0),b=q.lib.strim(b,null,d,!1));a="scheme";d="://";!e&&0<b.indexOf(d)&&(c[a]=q.lib.strim(b,null,d,!1),b=q.lib.strim(b,d,null,!1),e=!0);a="path";d="/";e&&-1!=b.indexOf(d)&&(c[a]=q.lib.strim(b,d,null,!0),b=q.lib.strim(b,null,d,!1));a="path";d=b.length;!e&&0<d&&(c[a]=b,b="");d="@";if(-1!=b.indexOf(d)){var k=q.lib.strim(b,d,null,!1);b=q.lib.strim(b,null,d,!1);a="password";d=":";-1!=b.indexOf(d)&&(c[a]=q.lib.strim(b,
d,null,!1),b=q.lib.strim(b,null,d,!1));c.user=b;b=k}a="port";d=":";-1!=b.indexOf(d)&&(c[a]=q.lib.strim(b,d,null,!1),b=q.lib.strim(b,null,d,!1));e&&(c.domain=b);return c},obj2url:function(a){var b="";"user"in a&&(b="//");"password"in a&&(b="//");"domain"in a&&(b="//");"port"in a&&(b="//");var c="scheme";a[c]&&(b="://");var e=""+((a[c]?a[c]:"")+b);c="user";c in a&&(e+=""+a[c]);c="password";c in a&&(e+=":"+a[c]);b="";"user"in a&&(b="@");"password"in a&&(b="@");c="domain";e+=b+(a[c]?a[c]:"");c="port";
c in a&&(e+=":"+a[c]);c="path";c in a&&(e+=""+a[c]);c="query";c in a&&(e+="?"+a[c]);c="fragment";c in a&&(e+="#"+a[c]);return e},data2obj:function(a){var b={};a=a.split("\r\n");var c=a.shift().split("\t");for(var e=0;e<c.length;e++)c[e]=c[e].split(":"),c[e]={name:c[e][0],type:c[e][1]};e=0;for(var d=a.length;e<d;e++){var k=a[e].split("\t",c.length);var p={};for(var g=0;g<k.length;g++)p[c[g].name]=q.lib.convert(k[g],c[g].type);c[0]&&(b[p[c[0].name]]=p)}return b},obj2data:function(a){var b=[],c=[];split=
"\t";delim="\r\n";param=":";none=" ";for(var e in a){if(!b.length){var d=[];for(h in a[e]){var k=a[e][h];k="id"==h?"integer":q.lib.validate(k,"number")?"float":q.lib.validate(k,"boolean")?"boolean":q.lib.validate(k,"date")?"date":"string";b["id"==h?0:b.length]={name:h,type:k};d[d.length]=h+param+k}c[c.length]=d.join(split)}d=[];for(var p=0,g=b.length;p<g;p++){var h=b[p].name;k=a[e][h];for(k=q.lib.convert(k,"string");-1!=k.indexOf(split);)k=k.replace(split,none);for(;-1!=k.indexOf(delim);)k=k.replace(delim,
none);k=k.replace(/[\t\r\n]/g,none);d[d.length]=k}c[c.length]=d.join(split)}return c.join(delim)},obj2arr:function(a,b){var c=[];b||(b=function(a){return a});for(var e in a){var d=a[e];d=b(d,e,a);q.lib.validate(d,"undefined")||c.push(d)}return c},arr2obj:function(a,b,c){var e={};b||(b=function(a){return a});c||(c=function(a,b){return b});for(var d=0,k=a.length;d<k;d++){var p=a[d];var g=c(p,d,a);p=b(p,d,a);q.lib.validate(p,"undefined")||q.lib.validate(g,"undefined")||(e[g]=p)}return e},convert:function(a,
b){switch(b){case "bool":case "boolean":a="true"===a?!0:"false"===a?!1:!!a;break;case "int":case "integer":case "float":case "double":case "real":case "number":a=Number(a);break;case "date":a=new Date(1E3*Number(a));break;case "string":q.lib.validate(a,"boolean")?a=a?"true":"false":(q.lib.validate(a,"date")&&(a=a.valueOf()/1E3),a=a.toString())}return a},xhr:function(a,b,c,e,d,k,p,g){var h,m=6E5,n=0;var f=h={responseText:""};var x=null;if(!n){var t=a?""+a:"get";a=t.toUpperCase();switch(a.toLowerCase()){case "get":x=
!0;break;case "head":x=!0;break;case "delete":x=!0}}if(!n){var r=function(){};var u={upload:r,download:r,success:r,error:r,complete:r};if(q.lib.validate(k,"function"))u.complete=k;else if(k)for(v in u)r=k[v],q.lib.validate(r,"function")&&(u[v]=r);k=u}if(!n){u={"X-Requested-With":"XMLHttpRequest"};if(!1===c){var v="X-Requested-With";v in u&&delete u[v]}if(q.lib.validate(c,"object"))for(v in c)switch(r=c[v],v.toLowerCase()){case "cookie":break;case "host":break;default:u[v]=r}c=u}if(!n){e=e?e:"";if(q.lib.validate(e,
"form")){u={};for(var w=0,y=e.elements.length;w<y;w++)r=e.elements[w],r.name&&!r.disabled&&(v=(""+r.type).toLowerCase(),"checkbox"==v||"radio"==v?r.checked&&(u[r.name]=r.value?r.value:!0):u[r.name]=r.files&&r.files.length?r.files:r.value?r.value:B);e=u}q.lib.validate(e,"xml")&&(x=!1,c["Content-Type"]="application/xml",e.xml?e=e.xml:(u=new XMLSerializer,e=u.serializeToString(e)));if(q.lib.validate(e,"object")){u=!1;for(v in e)if(r=e[v],q.lib.validate(r,"files")){x=!1;u=!0;break}if(u)for(v in u=new FormData,
e)if(r=e[v],q.lib.validate(r,"files")){var z=e[v];w=0;for(y=z.length;w<y;w++)r=z[w],u.append(v,r)}else q.lib.validate(r,"undefined")&&(r=""),u.append(v,r);else e=q.lib.obj2str(e,!0),!x&&e&&(c["Content-Type"]="application/x-www-form-urlencoded")}}n||(t=b?""+b:"",x&&e&&(t=t?~t.indexOf("?")?t+"&":t+"?":t+"?",t+=e,e=""),b=t);if(!n){u=null;if(!u)try{u=new XMLHttpRequest}catch(A){}if(!u)for(x="$#!&%",z=["Ms$#!&%xm$#!&%l2$#!&%.XM$#!&%LHT$#!&%TP.6.0","Ms$#!&%xm$#!&%l2$#!&%.XM$#!&%LHT$#!&%TP.3.0","Ms$#!&%xm$#!&%l2$#!&%.XM$#!&%LHT$#!&%TP",
"Micr$#!&%osoft$#!&%.XM$#!&%LH$#!&%TTP"],w=0,y=z.length;!u&&w<y;w++){r=z[w];t=r.split(x).join("");try{u=new ActiveXObject(t)}catch(A){}}u?f=u:n=1}if(!n){try{m=setTimeout(function(){t=f.responseText?f.responseText:"";f.abort();k.error(t,f);k.complete(t,f)},m)}catch(A){}f.upload&&(f.upload.onprogress=function(a){a.total&&a.loaded!=a.total&&k.upload(a,f)},f.onprogress=function(a){a.total&&a.loaded!=a.total&&k.download(a,f)});f.onreadystatechange=function(a){if(4==f.readyState){try{clearTimeout(m)}catch(C){}v=
f.status?f.status:200;t=f.responseText?f.responseText:"";200<=v&&300>v&&t?k.success(t,f):k.error(t,f);k.complete(t,f)}}}if(!n)try{g?f.open(a,b,d,p,g):p?f.open(a,b,d,p):f.open(a,b,d)}catch(A){f=h,n=2}if(!n)for(v in c)t=c[v],x="; ",q.lib.validate(t,"array")&&(z=t,t=z.join(x)),f.setRequestHeader(v,t);if(!n)try{e?f.send(e):f.send()}catch(A){f=h,n=3}if(1<n)try{clearTimeout(m)}catch(A){}n&&(t="",k.error(t,f),k.complete(t,f));return f},ajax:function(a,b,c,e,d){return q.lib.xhr(a,b,c,e,!0,d)},sjax:function(a,
b,c,e){return q.lib.xhr(a,b,c,e,!1)},strPad:function(a,b,c,e){var d,k=d="",p=function(a,b){for(;k.length<b;)k+=a;return k=k.substr(0,b)};a=""+a;c=c?""+c:" ";"left"!=e&&"right"!=e&&"both"!=e&&(e="right");0<(d=b-a.length)&&("left"==e?a=p(c,d)+a:"right"==e?a+=p(c,d):"both"==e&&(d=p(c,Math.ceil(d/2)),a=(d+a+a).substr(0,b)));return a},getCookie:function(a,b){var c=document.cookie.indexOf(a+"="),e=c+a.length+1;if(!c&&a!=document.cookie.substring(0,a.length)||-1==c)return null;a=document.cookie.indexOf(";",
e);-1==a&&(a=document.cookie.length);return b?decodeURIComponent(document.cookie.substring(e,a)):unescape(document.cookie.substring(e,a))},setCookie:function(a,b,c,e,d,k,p){var g=new Date((new Date).valueOf()+c);document.cookie=a+"="+(p?encodeURIComponent(b):escape(b))+(c?";expires="+g.toGMTString():"")+(e?";path="+e:"")+(d?";domain="+d:"")+(k?";secure":"");return!0},delCookie:function(a,b,c){q.lib.getCookie(a)&&(document.cookie=a+"="+(b?";path="+b:"")+(c?";domain="+c:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT");
return!0},getStorage:function(a,b){var c,e=null,d=null;if(c=window&&window.localStorage?localStorage.getItem(a):q.lib.getCookie(a)){var k=c.indexOf("?");-1!=k&&(type=c.substr(0,k),c=c.substr(k+1));b?(c=c.split("&"),!0!==b&&(c.length=Math.min(b,c.length))):c=[c];for(var p=0,g=c.length;p<g;p++){k=c[p].indexOf("=");if(-1!=k){if(a=c[p].substr(0,k),a=decodeURIComponent(a),e=c[p].substr(k+1),!d){var h=!0;d={}}}else a=p,e=c[p],d||(h=!1,d=[]);e=decodeURIComponent(e);type&&(e=q.lib.convert(e,type));h?d[a]=
e:d.push(e)}}else d=null;return b?d:e},setStorage:function(a,b){var c,e=[];var d=function(a,b){c||(c=q.lib.validate(a,"number")?"number":q.lib.validate(a,"date")?"date":q.lib.validate(a,"boolean")?"boolean":"string");a=q.lib.convert(a,"string");a=encodeURIComponent(a);q.lib.validate(b,"undefined")?e.push(a):(b=encodeURIComponent(b),e.push(b+"="+a))};if(q.lib.validate(b,"object"))for(var k in b)d(b[k],k);else if(q.lib.validate(b,"array")){k=0;for(var p=b.length;k<p;k++)d(b[k])}else q.lib.validate(b,
"null")||d(b);if(e=e.join("&"))if(e=c+"?"+e,window&&window.localStorage)try{localStorage.setItem(a,e);var g=!0}catch(h){g=!1}else g=q.lib.setCookie(a,e,31536E7,location.pathname,document.domain);else window&&window.localStorage?(localStorage.removeItem(a),g=!0):g=q.lib.delCookie(a,location.pathname,document.domain);return g},counter:function(){var a={};return function(b,c){var e=0;q.lib.validate(b,"array")&&b.join("_");b&&(a[b]=a[b]||0,e=a[b],!1===c?delete a[b]:!0===c?a[b]++:c&&(a[b]+=c));return e}}(),
on:function(){var a={};return function(b,c,e){var d,k=[],p=0;b=b.toString().split(/\s+/);for(var g=0,h=b.length;g<h;g++)if(d=b[g])if(a[d]||(a[d]=[0]),e)if(c){a[d][c]||(a[d][c]=[]);var m=a[d][c].length;a[d][c][m]=e;a[d][0]>=c&&k.push([d,c,m]);p++}else{m=1;for(var n=a[d].length;m<n;m++)if(a[d][m])for(var f=0,q=a[d][m].length;f<q;f++)a[d][m][f]===e&&(delete a[d][m][f],p++)}else if(a[d][0]++,c=c||a[d][0],a[d][c])for(m=0;m<a[d][c].length;m++)a[d][c][m]&&k.push([d,c,m]),p++;g=0;for(h=k.length;g<h;g++)d=
k[g][0],c=k[g][1],m=k[g][2],a[d]&&a[d][c]&&a[d][c][m]&&a[d][c][m].call(a[d][c][m],c);return p}}(),href:function(a){var b=document.createElement("a");b.href=a;return b.cloneNode(!1).href},getExt:function(a){var b="";var c=(""+a).lastIndexOf(".");-1!==c&&(b=a.substr(c+1),b=b.toLowerCase());return b},md5:function(a){var b=function(a,b){var c=a&2147483648;var d=b&2147483648;var e=a&1073741824;var g=b&1073741824;a=(a&1073741823)+(b&1073741823);return e&g?a^2147483648^c^d:e|g?a&1073741824?a^3221225472^
c^d:a^1073741824^c^d:a^c^d},c=function(a,c,d,e,g,f,k){a=b(a,b(b(c&d|~c&e,g),k));return b(a<<f|a>>>32-f,c)},e=function(a,c,d,e,g,f,k){a=b(a,b(b(c&e|d&~e,g),k));return b(a<<f|a>>>32-f,c)},d=function(a,c,d,e,g,f,k){a=b(a,b(b(c^d^e,g),k));return b(a<<f|a>>>32-f,c)},k=function(a,c,d,e,g,f,k){a=b(a,b(b(d^(c|~e),g),k));return b(a<<f|a>>>32-f,c)},p=function(a){var b="",c;for(c=0;3>=c;c++){var d=a>>>8*c&255;d="0"+d.toString(16);b+=d.substr(d.length-2,2)}return b},g=[];a=function(a){a=a.replace(/\r\n/g,"\n");
for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):(127<d&&2048>d?b+=String.fromCharCode(d>>6|192):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128)),b+=String.fromCharCode(d&63|128))}return b}(a.toString());g=function(a){var b=a.length;var c=b+8;for(var d=16*((c-c%64)/64+1),e=Array(d-1),g,f=0;f<b;)c=(f-f%4)/4,g=f%4*8,e[c]|=a.charCodeAt(f)<<g,f++;c=(f-f%4)/4;e[c]|=128<<f%4*8;e[d-2]=b<<3;e[d-1]=b>>>29;return e}(a);var h=1732584193;var m=4023233417;
var n=2562383102;var f=271733878;for(a=0;a<g.length;a+=16){var q=h;var t=m;var r=n;var u=f;h=c(h,m,n,f,g[a+0],7,3614090360);f=c(f,h,m,n,g[a+1],12,3905402710);n=c(n,f,h,m,g[a+2],17,606105819);m=c(m,n,f,h,g[a+3],22,3250441966);h=c(h,m,n,f,g[a+4],7,4118548399);f=c(f,h,m,n,g[a+5],12,1200080426);n=c(n,f,h,m,g[a+6],17,2821735955);m=c(m,n,f,h,g[a+7],22,4249261313);h=c(h,m,n,f,g[a+8],7,1770035416);f=c(f,h,m,n,g[a+9],12,2336552879);n=c(n,f,h,m,g[a+10],17,4294925233);m=c(m,n,f,h,g[a+11],22,2304563134);h=c(h,
m,n,f,g[a+12],7,1804603682);f=c(f,h,m,n,g[a+13],12,4254626195);n=c(n,f,h,m,g[a+14],17,2792965006);m=c(m,n,f,h,g[a+15],22,1236535329);h=e(h,m,n,f,g[a+1],5,4129170786);f=e(f,h,m,n,g[a+6],9,3225465664);n=e(n,f,h,m,g[a+11],14,643717713);m=e(m,n,f,h,g[a+0],20,3921069994);h=e(h,m,n,f,g[a+5],5,3593408605);f=e(f,h,m,n,g[a+10],9,38016083);n=e(n,f,h,m,g[a+15],14,3634488961);m=e(m,n,f,h,g[a+4],20,3889429448);h=e(h,m,n,f,g[a+9],5,568446438);f=e(f,h,m,n,g[a+14],9,3275163606);n=e(n,f,h,m,g[a+3],14,4107603335);
m=e(m,n,f,h,g[a+8],20,1163531501);h=e(h,m,n,f,g[a+13],5,2850285829);f=e(f,h,m,n,g[a+2],9,4243563512);n=e(n,f,h,m,g[a+7],14,1735328473);m=e(m,n,f,h,g[a+12],20,2368359562);h=d(h,m,n,f,g[a+5],4,4294588738);f=d(f,h,m,n,g[a+8],11,2272392833);n=d(n,f,h,m,g[a+11],16,1839030562);m=d(m,n,f,h,g[a+14],23,4259657740);h=d(h,m,n,f,g[a+1],4,2763975236);f=d(f,h,m,n,g[a+4],11,1272893353);n=d(n,f,h,m,g[a+7],16,4139469664);m=d(m,n,f,h,g[a+10],23,3200236656);h=d(h,m,n,f,g[a+13],4,681279174);f=d(f,h,m,n,g[a+0],11,3936430074);
n=d(n,f,h,m,g[a+3],16,3572445317);m=d(m,n,f,h,g[a+6],23,76029189);h=d(h,m,n,f,g[a+9],4,3654602809);f=d(f,h,m,n,g[a+12],11,3873151461);n=d(n,f,h,m,g[a+15],16,530742520);m=d(m,n,f,h,g[a+2],23,3299628645);h=k(h,m,n,f,g[a+0],6,4096336452);f=k(f,h,m,n,g[a+7],10,1126891415);n=k(n,f,h,m,g[a+14],15,2878612391);m=k(m,n,f,h,g[a+5],21,4237533241);h=k(h,m,n,f,g[a+12],6,1700485571);f=k(f,h,m,n,g[a+3],10,2399980690);n=k(n,f,h,m,g[a+10],15,4293915773);m=k(m,n,f,h,g[a+1],21,2240044497);h=k(h,m,n,f,g[a+8],6,1873313359);
f=k(f,h,m,n,g[a+15],10,4264355552);n=k(n,f,h,m,g[a+6],15,2734768916);m=k(m,n,f,h,g[a+13],21,1309151649);h=k(h,m,n,f,g[a+4],6,4149444226);f=k(f,h,m,n,g[a+11],10,3174756917);n=k(n,f,h,m,g[a+2],15,718787259);m=k(m,n,f,h,g[a+9],21,3951481745);h=b(h,q);m=b(m,t);n=b(n,r);f=b(f,u)}return(p(h)+p(m)+p(n)+p(f)).toLowerCase()},sha256:function(a){var b=function(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535},c=function(a,b){return a>>>b|a<<32-b};a=function(a){a=a.replace(/\r\n/g,"\n");
for(var b="",c=0;c<a.length;c++){var e=a.charCodeAt(c);128>e?b+=String.fromCharCode(e):(127<e&&2048>e?b+=String.fromCharCode(e>>6|192):(b+=String.fromCharCode(e>>12|224),b+=String.fromCharCode(e>>6&63|128)),b+=String.fromCharCode(e&63|128))}return b}(a);return function(a){for(var b="",c=0;c<4*a.length;c++)b+="0123456789abcdef".charAt(a[c>>2]>>8*(3-c%4)+4&15)+"0123456789abcdef".charAt(a[c>>2]>>8*(3-c%4)&15);return b}(function(a,d){var e=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,
2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,
1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],p=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],g=Array(64),h,m;a[d>>5]|=128<<24-d%32;a[(d+64>>9<<4)+15]=d;for(h=0;h<a.length;h+=16){d=p[0];var n=p[1];var f=p[2];var q=p[3];var t=p[4];var r=p[5];var u=p[6];var v=p[7];for(m=0;64>m;m++){if(16>m)g[m]=a[m+h];else{var w=m;var y=g[m-2];y=c(y,17)^c(y,19)^y>>>10;y=b(y,g[m-7]);var z=g[m-15];z=
c(z,7)^c(z,18)^z>>>3;g[w]=b(b(y,z),g[m-16])}w=t;w=c(w,6)^c(w,11)^c(w,25);w=b(b(b(b(v,w),t&r^~t&u),e[m]),g[m]);v=d;v=c(v,2)^c(v,13)^c(v,22);y=b(v,d&n^d&f^n&f);v=u;u=r;r=t;t=b(q,w);q=f;f=n;n=d;d=b(w,y)}p[0]=b(d,p[0]);p[1]=b(n,p[1]);p[2]=b(f,p[2]);p[3]=b(q,p[3]);p[4]=b(t,p[4]);p[5]=b(r,p[5]);p[6]=b(u,p[6]);p[7]=b(v,p[7])}return p}(function(a){for(var b=[],c=0;c<8*a.length;c+=8)b[c>>5]|=(a.charCodeAt(c/8)&255)<<24-c%32;return b}(a),8*a.length))},parseJSON:function(a){if(window&&window.JSON&&JSON.parse)try{var b=
JSON.parse(a)}catch(c){b=eval("("+a+")")}else b=eval("("+a+")");return b},numDeclin:function(a,b,c,e){a=Number(a);a=Math.abs(a);a=Math.floor(a);var d=a%10;return 1!=(a%100-d)/10?0==d?b:1==d?c:5>d?e:b:b},num2str:function(a,b,c,e){var d,k;isNaN(b=Math.abs(b))&&(b=2);c==B&&(c=",");e==B&&(e=".");if(k=0>a)a=Math.abs(a);var p=parseInt(a=(+a||0).toFixed(b))+"";var g=(d=3<(d=p.length)?d%3:0)?p.substr(0,d)+e:"";e=p.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+e);a=b?c+Math.abs(a-p).toFixed(b).replace(/-/,0).slice(2):
"";return(k?"-":"")+g+e+a},num2word:function(a,b,c){function e(a,b){a=a.toString().substr(-2);return b[0]+(/^[0,2-9]?[1]$/.test(a)?b[2]:/^[0,2-9]?[2-4]$/.test(a)?b[3]:b[1])}var d=[],k=[["����"],[,,,"���","������","����","�����","����","������","������"],"������ ����������� ���������� ���������� ������������ ���������� ����������� ���������� ������������ ������������".split(" "),[,,"��������","��������","�����","���������","����������","���������","�����������","���������"],[,"���","������","������",
"���������","�������","��������","�������","���������","���������"],[[,"����","���"],[,"����","���"],[,"����","���"]]],p=[["...�����","��","","�"],["�����","","�","�"],["�������","��","","�"],["��������","��","","�"],["��������","��","","�"],["�����������","��","","�"],["�����������","��","","�"],["����������","��","","�"],["���������","��","","�"],["��������","��","","�"],["��������","��","","�"],["��������","��","","�"],["����������","��","","�"],["����������","��","","�"]],g=[[["���","��","��",
"��"],["���","��","��","��"],["���","��","��","��"]],["�����","��","��","��"],["���","��","��","��"],["������","��","��","��"],["������������","��","��","��"],["���������","��","��","��"],["�������","��","��","��"],["�������������","��","��","��"]];c=c||0;a=a.toString().split(".");for(var h=0,m=a.length;h<m;h++){h&&(a[h]=a[h].substr(0,g.length-1));l=a[h].length;a[h]=["","00","0"][a[h].split(/\d{3}/).join("").length]+a[h];for(var n=a[h].length,f,q=0,t=-1,r=[];3*q<n;){f=a[h].substr(-3*(q+1),3);r[++t]=
[];for(var u=0;2>=u;u++)if(0!=f[u])switch(u){case 0:r[t][r[t].length]=k[4][f[u]];break;case 1:1==f[u]?(r[t][r[t].length]=k[2][f[2]],u=3):r[t][r[t].length]=k[3][f[u]];break;case 2:r[t][r[t].length]=2>=f[u]?k[5][1==q||h?1:c][f[u]]:k[1][f[u]]}r[t].length||(r[t][r[t].length]=k[0][0]);0<f&&0<q&&(r[t][r[t].length]=e(f,p[q]));!q&&1<m&&(r[t][r[t].length]=e(f,h?g[l]:g[0][c]));q||!b||h||h!=m-1?!q&&b&&h&&(r[t][r[t].length]=b[0]+b[3]):r[t][r[t].length]=e(f,b);r[t]=r[t].join(" ");q++}d[d.length]=r.reverse().join(" ")}return d.join(" ")},
date2str:function(a,b){var c="����������� ����������� ������� ����� ������� ������� �������".split(" "),e=" ������ ������� ����� ������ ��� ���� ���� ������� �������� ������� ������ �������".split(" "),d={0:"��",2:"��",3:"��",6:"��",7:"��",8:"��",22:"��",26:"��",27:"��",28:"��"},k={"-660":"ST","-600":"HAST","-540":"AKT","-480":"AWST","-420":"CXT","-360":"�ST","-300":"EST","-240":"AST","-210":"NST","-180":"ART",0:"GMT",60:"CET",120:"CAT",180:"MSK",210:"IRST",300:"PKT",330:"IST",360:"BDT",390:"MST",
420:"CXT",480:"AWST",540:"JST",570:"ACST",600:"AEST",660:"NFT"},p="";var g=function(b){var f="";switch(b){case "d":f+=q.lib.strPad(g("j"),2,"0","left");break;case "D":f+=g("l").substr(0,3);break;case "j":f+=a.getDate();break;case "l":f+=c[g("w")];break;case "N":f+=g("w")||7;break;case "S":f+=d[g("j")]||d[0];break;case "w":f+=a.getDay();break;case "z":f+=(a-new Date(a.getFullYear(),0,1))/864E5>>0;break;case "W":b=new Date(a.valueOf());var h=(a.getDay()+6)%7;b.setDate(b.getDate()-h+3);h=b.valueOf();
b.setMonth(0,1);4!==b.getDay()&&b.setMonth(0,1+(4-b.getDay()+7)%7);f+=1+Math.ceil((h-b)/6048E5);break;case "F":f+=e[g("n")];break;case "m":f+=q.lib.strPad(g("n"),2,"0","left");break;case "M":f+=g("F").substr(0,3);break;case "n":f+=a.getMonth()+1;break;case "t":f+=(new Date(a.getFullYear(),a.getMonth()+1,0)).getDate();break;case "L":f+=a.getFullYear()&3||!(a.getFullYear()%100)&&a.getFullYear()%400?0:1;break;case "o":(function(){var b=new Date(a.valueOf());b.setDate(b.getDate()-(a.getDay()+6)%7+3);
f+=b.getFullYear()})();break;case "Y":f+=a.getFullYear();break;case "y":f+=g("Y").substr(2,2);break;case "a":f+=11<a.getHours()?"pm":"am";break;case "A":f+=g("a").toUpperCase();break;case "B":(function(){var b=60*(a.getTimezoneOffset()+60);b=3600*a.getHours()+60*a.getMinutes()+a.getSeconds()+b;b=Math.floor(b/86.4);1E3<b&&(b-=1E3);0>b&&(b+=1E3);f+=q.lib.strPad(b,3,"0","left")})();break;case "g":f+=a.getHours()%12||12;break;case "G":f+=a.getHours();break;case "h":f+=q.lib.strPad(g("g"),2,"0","left");
break;case "H":f+=q.lib.strPad(g("G"),2,"0","left");break;case "i":f+=q.lib.strPad(a.getMinutes(),2,"0","left");break;case "s":f+=q.lib.strPad(a.getSeconds(),2,"0","left");break;case "u":f+=q.lib.strPad(1E3*a.getMilliseconds(),6,"0","left");break;case "e":f+=(new Date).toString().split(" ")[5].split("-")[0].split("+")[0];break;case "I":f+=(new Date(a.getFullYear(),0,1)).getTimezoneOffset()!=a.getTimezoneOffset()?1:0;break;case "O":f+=(0<a.getTimezoneOffset()?"-":"+")+q.lib.strPad(Math.abs(a.getTimezoneOffset()/
60*100),4,"0","left");break;case "P":f+=g("O").substr(0,3)+":"+g("O").substr(3,2);break;case "T":f+=k[-1*a.getTimezoneOffset()-60*Number(g("I"))]||k[0];break;case "Z":f+=-60*a.getTimezoneOffset();break;case "c":f+=g("Y")+"-"+g("m")+"-"+g("d")+"T"+g("h")+":"+g("i")+":"+g("s")+g("P");break;case "r":f+=g("D")+", "+g("j")+" "+g("M")+" "+g("Y")+" "+g("h")+":"+g("i")+":"+g("s")+" "+g("O");break;case "U":f+=Math.round(a.getTime()/1E3)}return f};for(var h=0,m=b.length;h<m;h++){var n=b.charAt(h);p="\\"!==
f?p+(g(n)||n):p+n;var f=n}return p},extend:function(){var a=arguments[0]||{},b=1,c=arguments.length,e=!1,d;q.lib.validate(a,"boolean")&&(e=a,a=arguments[1]||{},b=2);for(q.lib.validate(a,"object")||q.lib.validate(a,"function")||(a={});b<c;++b)if(null!=(d=arguments[b]))for(var k in d){var p=a[k],g=d[k];a!==g&&(e&&g&&q.lib.validate(g,"object")&&!g.nodeType?a[k]=q.lib.extend(e,p||(null!=g.length?[]:{}),g):q.lib.validate(g,"undefined")||(a[k]=g))}return a},template:function(a,b,c){var e;if(a){b||(b={});
a=a.toString();a=a.split("|");for(var d=a.length,k=d-1;-1<k;k--)if(e=a[k]){var p=!0;var g=e.split("{");for(var h=1,m=g.length;h<m;h++){e=g[h];var n=e.indexOf("}");if(~n){var f=e.substr(0,n);var x=f.split(">");var t=x.shift().split(".");if(q.lib.validate(b,"function"))f=b(t),p=!q.lib.validate(f,"undefined");else{f=b;for(var r=0,u=t.length;p&&r<u;r++){var v=t[r];(p=v in f)&&(f=f[v])}}r=0;for(u=x.length;p&&r<u;r++)p=x[r],c?(f=c(p,f),p=!q.lib.validate(f,"undefined")):p=!1;p&&(n+=1,e=f+e.substr(n))}else e=
"{"+e;g[h]=e}e=g.join("");p?a[k]=e:a.splice(k,1)}else k&&k<d-1&&(a[k]="|");b=a.join("")}else b="";return b},getRandomString:function(a,b){var c="";b||(b=89);b=Math.min(Math.max(b,1),89);for(var e=0;e<a;e++)c+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_+=;:,./?|`~[]{}".charAt(Math.round(Math.random()*(b-1)));return c}}})(App.prototype);

// 0.1.2 ������ ��� ������ � ����� windows script host
(function(q,t,u){q.wsh={getLDAP:function(b,d,f,a,g){var m=[],n=[],c=0;if(!c){var e=new ActiveXObject("ADODB.Connection");var r=new ActiveXObject("NameTranslate");var h=new ActiveXObject("ADODB.Command")}c||(e.provider="ADsDSOObject",a&&(e.properties("User ID").value=a),g&&(e.properties("Password").value=g),e.open("Active Directory Provider"),h.activeConnection=e,h.properties("Searchscope").value=2,h.properties("Page Size").value=100);if(!c)if(f)var l=f;else f=GetObject("LDAP://RootDSE"),l=f.get("DefaultNamingContext");
c||(n=[b],d&&n.push(d));for(g=n.length-1;!c&&-1<g;g--){b=n[g];d=f=null;e="SELECT distinguishedName FROM 'LDAP://"+l+"'";if(!c&&b&&!d&&q.lib.validate(b,"guid")){a=(""+b).toUpperCase();try{r.init(3,""),r.set(7,a),d=r.get(1)}catch(p){c=1}}if(!c&&b&&!d)try{(d=b.get("distinguishedName"))&&(f=b)}catch(p){}if(!c&&b&&!d){a=e+" WHERE name = '"+b+"' OR sAMAccountName = '"+b+"' OR distinguishedName = '"+b+"'";try{h.commandText=a;var k=h.execute();k.recordCount&&(d=k.fields("distinguishedName").value)}catch(p){}}if(!c&&
!d){b?(a=""+b,a=q.lib.template(a,{protocol:"LDAP:",parent:l,select:e}),a.toUpperCase().indexOf("WHERE")?a.toUpperCase().indexOf("SELECT")&&(c=2):a=e+" "+a):a=g?e+" WHERE distinguishedName = '"+l+"'":e;try{h.commandText=a,k=h.execute(),k.recordCount||(c=4)}catch(p){c=3}}if(!c&&d&&!g)if(f)m.push(f);else{a=d;try{f=GetObject("LDAP://"+a),m.push(f)}catch(p){c=5}}if(!c&&!d)for(b=0,e=k.recordCount;b<e;k.moveNext(),b++)a=k.fields("distinguishedName").value,b||(d=a),!g&&b&&(f=GetObject("LDAP://"+a),m.push(f));
c||(l=d)}return m}}})(App.prototype,WSH);

//////////////////////////////////////////////////////////////////////////////////////

var environment = new App({
	aptPref: 'apt',										// ������� � ����� ���������� ��� ����������� ������ ��������� ������
	aptLen: 3,											// ����������� ���� ��������� ��� ����� ��������� ������
	aptNone: 'XXX',										// �������� ��� �������� ��������� ������
	wsPref: 'c',										// ������� � ����� ���������� ��� ����������� ������ ����������
	wsLen: 1,											// ����������� ���� ��������� ��� ����� ����������
	wsFirstDesc: '��������',							// �������� ������� ���������� � �������� ������
	wsNextDesc: '��������������',						// �������� ���������� ���������� � �������� ������
	wsNoneDesc: '���������',							// �������� �� ����������� ���������� � �������� ������
	supportLogin: 'apteka',								// ����� ��� ����������� ���������
	supportToken: 'beb120e2949d34cd65a82b16071e8836',	// ����� ������ ��� ����������� ���������
	runStyle: 1,										// ����� ����������� ���������� �������� �� ���������
	defReturn: 99,										// �������� ������������ �� ���������
	driveMinSize: 26*1024*1024*1024,					// ����������� ����� ����� ����� ��� ��������� ����� � ������
	argQuote: '"',										// �������� ������� ��� ���������
	argDelim: ' ',										// ����������� �������� ����������
	getDelim: '+',										// ����������� ������� ����� ��������
	setDelim: '#',										// ����������� �� ������� ����� ��������
	csvDelim: ';',										// ����������� �������� ��� ����� ��������
	envType: 'Process'									// ��� ����������� ����������� ���������
});

// ���������� ��������� �������� ����������
(function(wsh, app, undefined){
	app.lib.extend(app, {
		fun: {// ��������� ������� �������� ����������
			wql2date: function(wql){// ��������������� ���� �� �������
			//@param date {string} - ���� �� �������
			//@return {date} - ��������������� ����
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
			bin2key: function(bin){// ��������������� �������� ������ � ���� ��������
			//@param bin {binary} - �������� ������ ����� ��������
			//@return {string} - ��������� �������� ����� ��������
				var isWin8, list, cur, last, part, pref = 'N',
					chars = 'BCDFGHJKMPQRTVWXY2346789',
					key = '', offset = 52;
				
				list = bin.toArray();
				isWin8 = Math.floor(list[66] / 6) & 1;
				list[66] = list[66] & 247 | (isWin8 & 2) * 4;
				for(var i = 24; i > -1; i--){// ����������� �� �������
					cur = 0;// ���������� �������� �������
					for(var j = 14; j > -1; j--){// ����������� �� �������
						cur = cur * 256;
						cur = list[j + offset] + cur;
						list[j + offset] = Math.floor(cur / 24);
						cur = cur % 24;
					};
					key = chars.substr(cur, 1) + key;
					last = cur;
				};
				if(1 == isWin8){// ���� ��� Windows 8
					part = key.substr(1, last);
					key = key.substr(1).replace(part, part + pref);
				};
				// ���������� ���������
				return [// ����������� ����
					key.substr( 0, 5),
					key.substr( 5, 5),
					key.substr(10, 5),
					key.substr(15, 5),
					key.substr(20, 5)
				].join('-');
			},
			info2str: function(info, decim, base){// �������������� ����� ���������� � ������
			//@param info {number} - ����������� ���������� � ����� ��� ������
			//@param decim {number} - ���������� ������ ����� �������
			//@param base {number} - ���� ��� ��������������
			//@return {string} - ��������� �������� � ������ ������ �������
				var factor, value, prefix = '��������';
				
				if(!base || base < 2) base = 1024;
				if(!decim || decim < 0) decim = 0;
				factor = Math.pow(10, decim);
				for(var i = -1; info >= base; i++) info = info / base;
				value = Math.ceil(info * factor) / factor;
				value = app.lib.num2str(value, i > -1 ? decim : 0, ',', '');
				value += ' ' + prefix.charAt(i);
				return value;
			},
			clear: function(value){// ������� ����� �� ������ ��������
			//@param value {string} - ���� ��� ������� �� ������ ������
			//@return {string} - ��������� �����
				value = value ? '' + value : '';
				// ������� �� ������� �����������
				if('INVALID' == value) value = '';
				if('To be filled by O.E.M.' == value) value = '';
				if('Default string' == value) value = '';
				if('empty' == value) value = '';
				if('None' == value) value = '';
				// ������� �� ����������� �����������
				for(var i = 1, iLen = arguments.length; i < iLen; i++){
					value = value.replace(arguments[i], '');
				};
				// ������� �� ����������� ���������
				return value
					.replace(/^['"]|["']$/g, '') 				// ������� � ������ � � �����
					.replace(/^\s+|\s+$/g, '') 					// ���������� ������� � ������ � � �����
					.replace(/\.+$/, '') 						// ����� � ����� ������
					.replace(/\(R\)/gi, '') 					// ������ �������
					.replace(/\(Registered Trademark\)/gi, '')	// �������� �����
					.replace(/\(Microsoft Corporation\)/gi, '')	// �������� �����
					.replace(/\(���������� ����������\)/gi, '')	// �������� �����
					.replace(/\(����������\)/gi, '') 			// �������� �����
					.replace(/\(TM\)/gi, '')					// ������ �������� �����
					.replace(/\s(?=\s)/gi, '')					// ������ ���������� �������
				;
			},
			repair: function(value){// ���������� ����� ��� �������
			//@param value {string} - ����� ��� �����������
			//@return {string} - ������������ �����
				value = "'" + (value ? value : '') + "'";
				return value.replace(/\\/g, '\\\\');
			}
		},
		init: function(){// ������� ������������� ����������
			var shell, fso, xml, key, value, list, locator, service, registry, method,
				param, item, items, command, id, time, drive, score, pattern, total,
				context, path, delim = '\\', benchmark = 0, index = 0,
				host = '', domain = '', data = {};
			
			time = new Date();
			// �������� �������� ���������
			id = '.';// ��������� �������� ��������������
			if(wsh.arguments.length > 0){// ���� ������ ����
				value = wsh.arguments.item(0);
				if(!value.indexOf(delim + delim) && -1 == value.indexOf(delim, 2 * delim.length)){
					id = context = value.substr(2 * delim.length);
					index++;
				};
			};
			// ������ ��������� �������
			shell = new ActiveXObject('WScript.Shell');
			xml = new ActiveXObject('MSXML2.DOMDocument');
			fso = new ActiveXObject('Scripting.FileSystemObject');
			locator = new ActiveXObject('wbemScripting.Swbemlocator');
			// ����������� ��������� �������
			locator.security_.impersonationLevel = 3;
			try{// ������� ������������ � ����������
				service = locator.connectServer(id, 'root\\CIMV2');
				registry = locator.connectServer(id, 'root\\default').get('stdRegProv');
			}catch(e){service = null;};
			if(service){// ���� ������� �������� ������ � �������
				// ��������� ���� ������������ �������
				method = registry.methods_.item('getBinaryValue');
				param = method.inParameters.spawnInstance_();
				param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
				param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion';
				param.sValueName = 'DigitalProductId';
				item = registry.execMethod_(method.name, param); 
				if(!item.returnValue){// ���� ������� ��������� ��������
					value = app.fun.bin2key(item.uValue);// ��������������� �������� �����
					if(value && 'BBBBB-BBBBB-BBBBB-BBBBB-BBBBB' != value){// ���� ���� �� ����
						data['SYS-KEY'] = value;
					};
				};
				// ��������� �������������� ������������ �������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_OperatingSystem\
					 WHERE primary = TRUE"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					if(value = item.systemDrive) drive = value;
					if(value = item.localDateTime) time = app.fun.wql2date(value);
					// ��������������
					if(value = app.fun.clear(item.caption, '����������', 'Microsoft', 'Edition', 'x64', ',')) data['SYS-NAME'] = value;
					if(value = app.fun.clear(item.version)) data['SYS-VERSION'] = value;
					if(value = item.localDateTime) data['SYS-TIME'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					if(value = app.fun.clear(item.systemDrive)) data['SYS-DRIVE'] = value;
					if(value = item.installDate) data['SYS-INSTALL'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					if(value = item.lastBootUpTime) data['SYS-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					if(value = app.fun.clear(item.serialNumber)) data['SYS-SERIAL'] = value;
					if(value = app.fun.clear(item.description)) data['SYS-DESCRIPTION'] = value;
					data['SYS-ARCHITECTURE'] = item.osArchitecture && !item.osArchitecture.indexOf('64') ? 'x64' : 'x86';
					// ��������������� �� ������ ��������
					break;
				};
				// ��������� �������������� ����������� �����
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT manufacturer, product, serialNumber\
					 FROM Win32_BaseBoard\
					 WHERE hostingBoard = TRUE"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ��������������
					if(value = app.fun.clear(item.product)) data['PCB-NAME'] = value;
					if(value) if(value = app.fun.clear(item.manufacturer)) data['PCB-NAME'] = value.split(' ')[0] + ' ' + app.fun.clear(item.product);
					if(value = app.fun.clear(item.serialNumber)) data['PCB-SERIAL'] = value;
					// ��������������� �� ������ ��������
					break;
				};
				// ��������� �������������� �������� ����������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_NetworkAdapterConfiguration\
					 WHERE ipEnabled = TRUE"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					if(value = item.interfaceIndex) id = value;
					// �������� ����� 
					if(null != item.ipAddress){// ���� ���� ������ ip �������
						list = item.ipAddress.toArray();// �������� ��������� ������
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// �������� ��������� ��������
							if(value && -1 != value.indexOf('.') && !data['NET-IP-V4']) data['NET-IP-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-IP-V6']) data['NET-IP-V6'] = value;
						};
					};
					// �������� ����
					if(null != item.defaultIPGateway){// ���� ���� ������ ip �������
						list = item.defaultIPGateway.toArray();// �������� ��������� ������
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// �������� ��������� ��������
							if(value && -1 != value.indexOf('.') && !data['NET-GATEWAY-V4']) data['NET-GATEWAY-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-GATEWAY-V6']) data['NET-GATEWAY-V6'] = value;
						};
					};
					// �������� dns
					if(null != item.dnsServerSearchOrder){// ���� ���� ������ ip �������
						list = item.dnsServerSearchOrder.toArray();// �������� ��������� ������
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// �������� ��������� ��������
							if(value && -1 != value.indexOf('.') && !data['NET-DNS-V4']) data['NET-DNS-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-DNS-V6']) data['NET-DNS-V6'] = value;
						};
					};
					// �������� �����
					if(null != item.ipSubnet){// ���� ���� ������ ip �������
						list = item.ipSubnet.toArray();// �������� ��������� ������
						for(var i = 0, iLen = list.length; i < iLen; i++){
							value = app.fun.clear(list[i]);// �������� ��������� ��������
							if(value && -1 != value.indexOf('.') && !data['NET-SUBNET-V4']) data['NET-SUBNET-V4'] = value;
							if(value && -1 == value.indexOf('.') && !data['NET-SUBNET-V6']) data['NET-SUBNET-V6'] = value;
						};
					};
					// ��������������
					if(value = app.fun.clear(item.dhcpServer)) data['NET-DHCP-V4'] = value;
					if(value = app.fun.clear(item.description, '������� �������', '�������', '��� ����������� ����', '������� �����', '����������', 'NIC (NDIS 6.20)', '- �������� ������������ �������')) data['NET-NAME'] = value;
					if(value = app.fun.clear(item.macAddress)) data['NET-MAC'] = value;
					// ��������������� �� ������ ��������
					break;
				};
				// ��������� �������������� �������� ��������
				score = 0;// �������� ������� ������
				response = service.execQuery(
					"SELECT speed, timeOfLastReset\
					 FROM Win32_NetworkAdapter\
					 WHERE netEnabled = TRUE\
					 AND interfaceIndex = " + app.fun.repair(id)
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ��������������
					if(value = item.speed) data['NET-SPEED'] = app.fun.info2str(value , 0, 1000) + '���/�';
					if(value = item.speed) data['NET-SPEED-VAL'] = value;
					if(value = item.timeOfLastReset) data['NET-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
					// �������� ������� ������������������
					if(value = item.speed) score += 8.12567 * Math.sqrt(value / 100 / 1000 / 1000);
					// ��������������� �� ������ ��������
					break;
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// ��������� �������������� ������� �������������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_ComputerSystem"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					if(value = item.dnsHostName) host = value;
					if(value = item.name) if(!host) host = value.toLowerCase();
					if(item.domain != item.workgroup) domain = item.domain;
					if(value = item.userName) id = value;
					// ��������������
					if(value = app.fun.clear(host)) data['NET-HOST'] = value;
					if(value = app.fun.clear(item.domain)) data['NET-DOMAIN'] = value;
					if(value = app.fun.clear(item.userName)) data['USR-LOGIN'] = value;
					if(value = app.fun.clear(item.userName)) data['USR-DOMAIN'] = value.split(delim)[0];
					if(value = app.fun.clear(item.userName)) data['USR-ACCOUNT'] = value.split(delim)[1];
					// ��������������� �� ������ ��������
					break;
				};
				// �������� �� ������ ������������ �������
				if(!id){// ���� ������������� ������������ ����������
					list = [];// ���������� ������ ��������
					// ��������� ��� ������������ �����������
					method = registry.methods_.item('getStringValue');
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
					param.sValueName = 'DefaultDomainName';
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) list.push(item.sValue);
					// ��������� ����� ������������ �����������
					method = registry.methods_.item('getStringValue');
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
					param.sValueName = 'DefaultUserName';
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) list.push(item.sValue);
					// ��������� ������������� ������������
					if(2 == list.length) id = list.join(delim);
					if(value = app.fun.clear(id)) data['USR-LOGIN'] = value;
					if(value = app.fun.clear(id)) data['USR-DOMAIN'] = value.split(delim)[0];
					if(value = app.fun.clear(id)) data['USR-ACCOUNT'] = value.split(delim)[1];
				};
				// ��������� �������������� ������������
				response = service.execQuery(
					"SELECT fullName, sid\
					 FROM Win32_UserAccount\
					 WHERE domain = " + app.fun.repair(id.split(delim)[0]) + "\
					 AND name = " + app.fun.repair(id.split(delim)[1])
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					if(value = item.sid) id = value;
					// ��������������
					if(value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
					if(value = app.fun.clear(item.sid)) data['USR-SID'] = value;
					// ��������������� �� ������ ��������
					break;
				};
				// �������� ��� �������� �������������
				try{// ������� ������������ � ������
					(function(){// �������� ��� ��������� ����������
						var service = locator.connectServer(domain, 'root\\CIMV2');
						// ��������� �������������� ��������� ������������
						response = service.execQuery(
							"SELECT fullName, sid\
							 FROM Win32_UserAccount\
							 WHERE domain = " + app.fun.repair(id.split(delim)[0]) + "\
							 AND name = " + app.fun.repair(id.split(delim)[1])
						);
						items = new Enumerator(response);
						for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
							item = items.item();// �������� ��������� ������� ���������
							if(value = item.sid) id = value;
							// ��������������
							if(value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
							if(value = app.fun.clear(item.sid)) data['USR-SID'] = value;
							// ��������������� �� ������ ��������
							break;
						};
					})();
				}catch(e){};
				// ��������� �������������� ������� ������������
				response = service.execQuery(
					"SELECT localPath\
					 FROM Win32_UserProfile\
					 WHERE sid = " + app.fun.repair(id)
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ��������������
					if(value = app.fun.clear(item.localPath)) data['USR-PROFILE'] = value;
					// ��������������� �� ������ ��������
					break;
				};
				// ��������� �������������� ������������ ����������
				score = 0;// �������� ������� ������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT architecture, maxClockSpeed, name, revision, numberOfCores, socketDesignation\
					 FROM Win32_Processor\
					 WHERE role = 'CPU'"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ��������������
					if(0 == item.architecture) data['CPU-ARCHITECTURE'] = 'x86';
					else if(9 == item.architecture) data['CPU-ARCHITECTURE'] = 'x64';
					if(value = item.maxClockSpeed) data['CPU-SPEED'] = app.fun.info2str(value * 1000 * 1000, 2, 1000) + '��';
					if(value = item.maxClockSpeed) data['CPU-SPEED-VAL'] = value * 1000 * 1000;
					if(value = app.fun.clear(item.name, 'CPU', 'APU', '���������', 'Processor', 'with', 'Radeon HD Graphics')) data['CPU-NAME'] = value;
					if(value = app.fun.clear(item.revision)) data['CPU-VERSION'] = value;
					if(value = item.numberOfCores) data['CPU-CORE'] = value;
					if(value = app.fun.clear(item.socketDesignation, 'SOCKET 0')) data['CPU-SOCKET'] = value;
					// �������� ������� ������������������
					if(value = item.maxClockSpeed) score += 2.26143 * Math.sqrt(value / 1000);
					if(value = item.numberOfCores) score *= 1.02033 * Math.sqrt(value);
					// ��������������� �� ������ ��������
					break;
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// ��������� �������������� ���� ����������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT level, maxCacheSize\
					 FROM Win32_CacheMemory"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ��������������
					if(value = item.maxCacheSize) data['CPU-CACHE-L' + (item.level - 2)] = app.fun.info2str(value * 1024, 0) + '�';
				};
				// ��������� �������������� ����������� ������
				score = 0;// �������� ������� ������
				total = 0;// �������� �������� ��� ������������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT capacity, speed\
					 FROM Win32_PhysicalMemory"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ��������������
					if(value = item.capacity) data['RAM-SIZE-VAL'] = total += 1 * value;
					if(value = item.capacity) data['RAM-SIZE'] = app.fun.info2str(total, 0) + '�';
					if(value = item.speed) data['RAM-SPEED'] = value + ' ���';
					if(value = item.speed) data['RAM-SPEED-VAL'] = value * 1000 * 1000;
					// �������� ������� ������������������
					if(value = total) score = 2.51143 * Math.sqrt(value / 1024 / 1024 / 1024);
					if(value = item.speed) score *= 0.92245 * Math.sqrt(value / 1000);
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// ��������� �������������� ������������ ����������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT adapterRam, name, driverVersion, currentHorizontalResolution, currentRefreshRate, currentBitsPerPixel, currentVerticalResolution\
					 FROM Win32_VideoController"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ��������������
					if(value = item.adapterRam) data['GPU-SIZE'] = app.fun.info2str(Math.abs(value), 0) + '�';
					if(value = item.adapterRam) data['GPU-SIZE-VAL'] = Math.abs(value);
					if(value = app.fun.clear(item.name, 'GPU', '���������������', 'Family', 'Chipset', 'Series', 'Graphics')) data['GPU-NAME'] = value;
					if(value = app.fun.clear(item.driverVersion)) data['GPU-VERSION'] = value;
					if(item.currentHorizontalResolution && item.currentVerticalResolution) data['GPU-RESOLUTION'] = item.currentHorizontalResolution + ' x ' + item.currentVerticalResolution;
					if(value = item.currentHorizontalResolution) data['GPU-RESOLUTION-X'] = value;
					if(value = item.currentVerticalResolution) data['GPU-RESOLUTION-Y'] = value;
					if(value = item.currentRefreshRate) data['GPU-FREQUENCY'] = app.fun.info2str(value, 0, 1000) + '��';
					if(value = item.currentRefreshRate) data['GPU-FREQUENCY-VAL'] = value;
					if(value = item.currentBitsPerPixel) data['GPU-COLOR'] = app.fun.info2str(value, 0) + '���' + app.lib.numDeclin(value, '', '', '�');
					if(value = item.currentBitsPerPixel) data['GPU-COLOR-VAL'] = value;
					// ��������������� �� ������ ��������
					break;
				};
				// ��������� �������� ����������
				score = 0;// �������� ������� ������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT *\
					 FROM Win32_DiskDrive"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					// ���������� ��� ��������
					switch(item.mediaType){// �������������� ����
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
					// ���������� ���������� � ������������� ���� ��������
					if(item.caption && -1 != item.caption.indexOf('Raid')) continue;
					if(!key || data[key + '-NAME']) continue;
					// ��������������
					if(value = app.fun.clear(item.caption, 'ATA Device', 'SCSI Disk Device', 'USB Device', 'SSD')) data[key + '-NAME'] = value;
					if(value = app.fun.clear(item.firmwareRevision)) data[key + '-VERSION'] = value;
					if(value = app.fun.clear(item.interfaceType)) data[key + '-TYPE'] = value;
					if(value = app.fun.clear(item.serialNumber)) data[key + '-SERIAL'] = value;
					if(value = item.size) data[key + '-SIZE'] = app.fun.info2str(value, 0) + '�';
					if(value = item.size) data[key + '-SIZE-VAL'] = value;
					// �������� ������� ������������������
					if(value = key) score = Math.max(score, 'SDD' == value ? 15.51143 : 7.14577);
				};
				if(score) benchmark = benchmark ? Math.min(benchmark, score) : score;
				// ��������� ���������� ����������
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT mediaType, caption, drive\
					 FROM Win32_CDROMDrive"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					if(item.caption && -1 != item.caption.indexOf('Alcohol')) continue;
					if(item.caption && -1 != item.caption.indexOf('Virtual')) continue;
					// ���������� ��� ��������
					switch(item.mediaType){// �������������� ����
						case 'CD-ROM': data['ROM-TYPE'] = 'CD'; break;
						case 'DVD-ROM': data['ROM-TYPE'] = 'DVD'; break;
						case 'CD Writer': data['ROM-TYPE'] = 'CD-RW'; break;
						case 'DVD Writer': data['ROM-TYPE'] = 'DVD-RW'; break;
					};
					// ��������������
					if(value = app.fun.clear(item.caption, 'ATA Device', 'SCSI CdRom Device')) data['ROM-NAME'] = value;
					if(value = app.fun.clear(item.drive)) data['ROM-DRIVE'] = value;
					// ��������������� �� ������ ��������
					break;
				};
				// ��������� ����� ����� ��� ��������� �����
				id = '';// ���������� ������������� ��������
				response = service.execQuery(
					"SELECT caption, size\
					 FROM Win32_LogicalDisk\
					 WHERE driveType = 2 OR driveType = 3 OR driveType = 4"
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					if(item.caption && -1 != item.caption.indexOf(drive) || data['BAK-DRIVE']) continue;
					// ��������������
					if(value = app.fun.clear(item.caption)) if(item.size >= app.val.driveMinSize) data['BAK-DRIVE'] = value;
				};
				// ���� �������� ����� ��������� eFarma
				id = '';// ���������� ������������� ��������
				key = 'DisplayIcon';// ���� ��� ��������
				list = [// ������ ����� ��� ��������
					'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL',
					'SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL',
					'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\������',
					'SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\������'
				];
				value = '';// ���������� �������� ����������
				method = registry.methods_.item('getStringValue');
				for(var i = 0, iLen = list.length; i < iLen && !value; i++){
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = list[i];
					param.sValueName = key;
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
				};
				if(value){// ���� ������� �������� ��������
					list = value.split(delim);
					list.pop();// ������� ��������� �������
					list.pop();// ������� ��������� �������
					// ��������������
					id = list.join(delim);
					data['APP-EFARMA-DIR'] = id;
				};
				// ���� ���� �� ������� eFarma
				path = '';// ���������� ��������
				key = '\\Client\\ePlus.Client.exe';
				list = [// ������ ����� ��� ��������
					id
				];
				value = '';// ���������� �������� ��� �������
				for(var i = 0, iLen = list.length; i < iLen; i++){
					if(i) value += ' OR ';// ��������� �����������
					value += 'name = ' + app.fun.repair(list[i] + key);
				};
				response = service.execQuery(
					"SELECT name\
					 FROM CIM_DataFile\
					 WHERE " + value
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					for(var i = 0, iLen = list.length; i < iLen; i++){
						value = list[i] + key;// �������� ��������
						if(item.name && item.name.toLowerCase() == value.toLowerCase()){
							// ��������������
							data['APP-EFARMA-CLIENT'] = path = value;
							// ��������������� �� ������ ��������
							break;
						};
					};
				};
				// �������� ������ �� ����� �������� ������� eFarma
				if(path){// ���� ������ ����
					key = 'ConnectionString';// �������� ������� ���� � �������
					value = path + '.Config';// ������ ��������� ���� �� �����
					if(context) value = [delim, context, value.replace(':', '$')].join(delim);
					if(fso.fileExists(value) && xml.load(value)){// ���� ���� ������� ��������
						items = xml.getElementsByTagName('appSettings');// ������ ���������
						for(var i = 0, iLen = items.length; i < iLen; i++){// ����������� �� ���������
							for(var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++){
								item = items.item(i).childNodes.item(j);// �������� ��������� �������� �������
								if(key == item.getAttribute('key')){// ���� ������ �����������
									value = item.getAttribute('value');
									item = app.lib.str2obj(value, false, ';', '=');
									// ��������������
									if(value = item['Data Source']) data['APP-EFARMA-CLIENT-SERVER'] = value;
									if(value = item['Initial Catalog']) data['APP-EFARMA-CLIENT-BASE'] = value;
									if(value = item['User ID']) data['APP-EFARMA-CLIENT-LOGIN'] = value;
									if(value = item['Password']) data['APP-EFARMA-CLIENT-PASSWORD'] = value;
									// ��������������� �� ������ ��������
									break;
								};
							};
						};
					};
				};
				// ���� ���� �� ����� eFarma
				path = '';// ���������� ��������
				key = '\\ARM\\ePlus.ARMCasherNew.exe';
				list = [// ������ ����� ��� ��������
					id
				];
				value = '';// ���������� �������� ��� �������
				for(var i = 0, iLen = list.length; i < iLen; i++){
					if(i) value += ' OR ';// ��������� �����������
					value += 'name = ' + app.fun.repair(list[i] + key);
				};
				response = service.execQuery(
					"SELECT name\
					 FROM CIM_DataFile\
					 WHERE " + value
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					for(var i = 0, iLen = list.length; i < iLen; i++){
						value = list[i] + key;// �������� ��������
						if(item.name && item.name.toLowerCase() == value.toLowerCase()){
							// ��������������
							data['APP-EFARMA-CASHER'] = path = value;
							// ��������������� �� ������ ��������
							break;
						};
					};
				};
				// �������� ������ �� ����� �������� ����� eFarma
				if(path){// ���� ������ ����
					key = 'LocalConnectionString';// �������� ������� ���� � �������
					value = path + '.Config';// ������ ��������� ���� �� �����
					if(context) value = [delim, context, value.replace(':', '$')].join(delim);
					if(fso.fileExists(value) && xml.load(value)){// ���� ���� ������� ��������
						items = xml.getElementsByTagName('appSettings');// ������ ���������
						for(var i = 0, iLen = items.length; i < iLen; i++){// ����������� �� ���������
							for(var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++){
								item = items.item(i).childNodes.item(j);// �������� ��������� �������� �������
								if(key == item.getAttribute('key')){// ���� ������ �����������
									value = item.getAttribute('value');
									item = app.lib.str2obj(value, false, ';', '=');
									// ��������������
									if(value = item['Data Source']) data['APP-EFARMA-CASHER-SERVER'] = value;
									if(value = item['Initial Catalog']) data['APP-EFARMA-CASHER-BASE'] = value;
									if(value = item['User ID']) data['APP-EFARMA-CASHER-LOGIN'] = value;
									if(value = item['Password']) data['APP-EFARMA-CASHER-PASSWORD'] = value;
									// ��������������� �� ������ ��������
									break;
								};
							};
						};
					};
				};
				// ���� ���� �� ������� ���������� eFarma
				path = '';// ���������� ��������
				key = '\\UpdateServer\\ePlus.UpdateServer.exe';
				list = [// ������ ����� ��� ��������
					id
				];
				value = '';// ���������� �������� ��� �������
				for(var i = 0, iLen = list.length; i < iLen; i++){
					if(i) value += ' OR ';// ��������� �����������
					value += 'name = ' + app.fun.repair(list[i] + key);
				};
				response = service.execQuery(
					"SELECT name\
					 FROM CIM_DataFile\
					 WHERE " + value
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					for(var i = 0, iLen = list.length; i < iLen; i++){
						value = list[i] + key;// �������� ��������
						if(item.name && item.name.toLowerCase() == value.toLowerCase()){
							// ��������������
							data['APP-EFARMA-UPDATER'] = path = value;
							// ��������������� �� ������ ��������
							break;
						};
					};
				};
				// �������� ������ �� ����� �������� ������� ���������� eFarma
				if(path){// ���� ������ ����
					value = path + '.Config';// ������ ��������� ���� �� �����
					if(context) value = [delim, context, value.replace(':', '$')].join(delim);
					if(fso.fileExists(value) && xml.load(value)){// ���� ���� ������� ��������
						items = xml.getElementsByTagName('appSettings');// ������ ���������
						for(var i = 0, iLen = items.length; i < iLen; i++){// ����������� �� ���������
							for(var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++){
								item = items.item(i).childNodes.item(j);// �������� ��������� �������� �������
								value = item.getAttribute('value');// �������� ��������
								switch(item.getAttribute('key')){// �������������� �������� ��������
									case 'LocalUrl': if(value) data['APP-EFARMA-UPDATE-DIR'] = value; break;
									case 'BackupDbFolder': if(value) data['APP-EFARMA-BACKUP-DIR'] = value; break;
								};
							};
						};
					};
				};
				// ���� ���� �� ����� �������� eFarma
				key = 'lic';
				list = [// ������ ����� ��� ��������
					id + '\\UpdateServer\\',
					id + '\\Client\\',
					id + '\\ARM\\'
				];
				value = '';// ���������� �������� ��� �������
				for(var i = 0, iLen = list.length; i < iLen; i++){
					if(i) value += ' OR ';// ��������� �����������
					value += 'drive = ' + app.fun.repair(app.lib.strim(list[i], '', ':', true, false)) + ' ';
					value += 'AND path = ' + app.fun.repair(app.lib.strim(list[i], ':', '', false, false)) + ' ';
					value += 'AND extension = ' + app.fun.repair(key);
				};
				response = service.execQuery(
					"SELECT name, fileName\
					 FROM CIM_DataFile\
					 WHERE " + value
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					for(var i = 0, iLen = list.length; i < iLen; i++){
						value = list[i] + item.fileName + '.' + key;// �������� ��������
						if(item.name && item.name.toLowerCase() == value.toLowerCase()){
							// ��������������
							data['APP-EFARMA-LICENSE'] = value;
							// ��������������� �� ������ ��������
							break;
						};
					};
				};
				// ���� �������� ����� ��������� ����
				id = '';// ���������� ������������� ��������
				value = app.lib.date2str(time, 'Y');
				key = '\\ULUS.exe';
				list = [// ������ ����� ��� ��������
					'C:\\SoftLink\\Ulus\\' + value,
					'C:\\LO\\ULUS\\' + value,
					'C:\\so\\Ulus\\' + value,
					'C:\\ULUS\\' + value
				];
				value = '';// ���������� �������� ��� �������
				for(var i = 0, iLen = list.length; i < iLen; i++){
					if(i) value += ' OR ';// ��������� �����������
					value += 'name = ' + app.fun.repair(list[i] + key);
				};
				response = service.execQuery(
					"SELECT name\
					 FROM CIM_DataFile\
					 WHERE " + value
				);
				items = new Enumerator(response);
				for(; !items.atEnd(); items.moveNext()){// ����������� �� ���������
					item = items.item();// �������� ��������� ������� ���������
					for(var i = 0, iLen = list.length; i < iLen; i++){
						value = list[i] + key;// �������� ��������
						if(item.name && item.name.toLowerCase() == value.toLowerCase()){
							// ��������������
							data['APP-ULUS'] = value;
							data['APP-ULUS-DIR'] = list[i];
							// ��������������� �� ������ ��������
							break;
						};
					};
				};
				// ���� �������� ����� ��������� Chrome
				id = '';// ���������� ������������� ��������
				key = '';// ���� ��� ��������
				list = [// ������ ����� ��� ��������
					'SOFTWARE\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command',
					'SOFTWARE\\WOW6432Node\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command'
				];
				value = '';// ���������� �������� ����������
				method = registry.methods_.item('getStringValue');
				for(var i = 0, iLen = list.length; i < iLen && !value; i++){
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = list[i];
					param.sValueName = key;
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
				};
				if(value){// ���� ������� �������� ��������
					list = value.split(delim);
					list.pop();// ������� ��������� �������
					// ��������������
					data['APP-CHROME'] = value;
					data['APP-CHROME-DIR'] = list.join(delim);
				};
				// ���� �������� ����� ��������� VLC
				id = '';// ���������� ������������� ��������
				key = '';// ���� ��� ��������
				list = [// ������ ����� ��� ��������
					'SOFTWARE\\VideoLAN\\VLC',
					'SOFTWARE\\WOW6432Node\\VideoLAN\\VLC'
				];
				value = '';// ���������� �������� ����������
				method = registry.methods_.item('getStringValue');
				for(var i = 0, iLen = list.length; i < iLen && !value; i++){
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = list[i];
					param.sValueName = key;
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
				};
				if(value){// ���� ������� �������� ��������
					list = value.split(delim);
					list.pop();// ������� ��������� �������
					// ��������������
					data['APP-VLC'] = value;
					data['APP-VLC-DIR'] = list.join(delim);
				};
				// ��������� ������������� TeamViewer
				id = '';// ���������� ������������� ��������
				key = 'ClientID';// ���� ��� ��������
				list = [// ������ ����� ��� ��������
					'SOFTWARE\\TeamViewer',
					'SOFTWARE\\WOW6432Node\\TeamViewer'
				];
				value = '';// ���������� �������� ����������
				method = registry.methods_.item('getDWORDValue');
				for(var i = 0, iLen = list.length; i < iLen && !value; i++){
					param = method.inParameters.spawnInstance_();
					param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
					param.sSubKeyName = list[i];
					param.sValueName = key;
					item = registry.execMethod_(method.name, param); 
					if(!item.returnValue && item.uValue) value = app.fun.clear(item.uValue);
				};
				if(value){// ���� ������� �������� ��������
					// ��������������
					data['APP-TEAMVIEWER-ID'] = value;
				};
				// ��������� ����� ��������� ������
				value = host.toLowerCase();
				if(0 == value.indexOf(app.val.aptPref)){// ���� ��� ��������� � ������
					value = value.substr(app.val.aptPref.length, app.val.aptLen);
					if(!isNaN(value)){// ���� ������� �������� ����� ������
						data['APT-NUMBER'] = value || app.val.aptNone;
						data['APT-NUMBER-VAL'] = Number(value);
					};
				};
				// ��������� ����� ���������� � �������� ������
				value = host.toLowerCase();
				if(0 == value.indexOf(app.val.aptPref)){// ���� ��� ��������� � ������
					value = value.substr(app.val.aptPref.length + app.val.aptLen);
					if(value){// ���� ��� �� �������� ��������� � �������� ������
						if(0 == value.indexOf(app.val.wsPref)){// ���� ��� �������������� ���������
							value = value.substr(app.val.wsPref.length, app.val.wsLen);
							if(!isNaN(value)){// ���� ������� �������� ����� ����������
								value = Number(value);
							}else value = 0;
						}else value = 0;
					}else value = 1;
					data['APT-COMPUTER-VAL'] = value;
					if(0 == value) data['APT-COMPUTER'] = app.val.wsNoneDesc;
					else if(1 == value) data['APT-COMPUTER'] = app.val.wsFirstDesc;
					else data['APT-COMPUTER'] = app.val.wsNextDesc;
				};
				// ��������� ��������� ����������� ���������
				value = host.toLowerCase();
				if(0 == value.indexOf(app.val.aptPref)){// ���� ��� ��������� � ������
					value = value.substr(app.val.aptPref.length, app.val.aptLen);
					if(!isNaN(value)){// ���� ������� �������� ����� ������
						list = [app.val.supportLogin, Number(value), app.val.supportToken];
						data['APT-SUPPORT-HASH'] = app.lib.md5(list.join(''));
						data['APT-SUPPORT-LOGIN'] = app.val.supportLogin;
					};
				};
				// ��������� �������� �������� ����������
				list = [];// ������� �������� ����������
				if(data['CPU-NAME'] && data['CPU-CORE'] && data['CPU-SPEED']) list.push(app.fun.clear(data['CPU-NAME'].replace('Dual-Core', 'Intel'), 'Dual Core', 'Xeon', 'Pentium', 'Celeron', 'Core2 Duo', 'Core', 'Processor', 'Athlon 64', 'Athlon', /,.+/, /@.+/, /\d\.d+GHz/) + ' ' + data['CPU-CORE'] + 'x' + data['CPU-SPEED'].replace(',', '.').replace(' ���', 'M').replace(' ���', 'G') + 'Hz');
				if(data['RAM-SIZE'] && data['RAM-SPEED']) list.push(data['RAM-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB') + ' ' + data['RAM-SPEED'].replace(' ���', 'M').replace(' ���', 'G') + 'Hz');
				if(data['GPU-SIZE'] && data['GPU-NAME'] && (-1 != data['GPU-NAME'].indexOf('GeForce') || -1 != data['GPU-NAME'].indexOf('Radeon'))) list.push(data['GPU-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB') + ' ' + app.fun.clear(data['GPU-NAME'], 'AMD', 'NVIDIA', 'GeForce', 'Radeon', /\(.+/));
				if(data['HDD-SIZE']) list.push(data['HDD-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB').replace(' ��', 'TB') + ' HDD');
				if(data['SSD-SIZE']) list.push(data['SSD-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB').replace(' ��', 'TB') + ' SSD');
				if(data['USB-SIZE']) list.push(data['USB-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB').replace(' ��', 'TB') + ' USB');
				if(data['ROM-TYPE']) list.push(data['ROM-TYPE']);
				if(list.length) data['DEV-NAME'] = list.join('/');
				// ��������� �������� ������ ������������������
				if(benchmark) data['DEV-BENCHMARK'] = app.lib.num2str(benchmark, 5, ',', '');
			};
			// ��������� ����� ���������� �� ��������� ���������
			items = shell.environment(app.val.envType);
			for(var key in data){// ����������� �� ������ � �������
				value = data[key];// �������� ��������� ��������
				items(key) = value;// ��� ���� ��� �� �������� �� ������� ������� ���� �� �������
			};
			// ������� ��������� ������ ��� ������
			items = [];// ���������� ������ ����������
			for(var i = 0, iLen = wsh.arguments.length - index; i < iLen; i++){
				value = wsh.arguments.item(i + index);// �������� ��������� �������� ����������
				value = value.split(app.val.getDelim).join(app.val.setDelim);
				// �������� �� ��������� ���������
				if(!i && 'silent' == value) app.val.runStyle = 0;
				else if(!i && 'print' == value) wsh.echo(app.lib.obj2str(data, false, '\r\n', ' = '));
				else if(!i && 'csv' == value){// ���� ���������� ���������
					list = [// ������ ��������� ������
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
						key = list[j];// �������� ��������� ����
						list[j] = data[key] ? data[key] : '';
					};
					wsh.echo(list.join(app.val.csvDelim));
				}else{// ���� ��� �� ��������� ��������
					if(!i){// ���� ��� ������ ��������
						for(var key in data){// ����������� �� �������
							pattern = new RegExp('%' + key + '%', 'gi');
							value = value.replace(pattern, data[key]);
						};
					};
					if(-1 != value.indexOf(app.val.argDelim)){// ���� ���� � �������� �����������
						value = app.val.argQuote + value + app.val.argQuote;
					};
					items.push(value);
				};
			};
			command = items.join(app.val.argDelim);
			// �������� ��������� ������
			try{// ������� ��������� �������
				if(command) value = shell.run(command, app.val.runStyle, true);
				else value = app.val.defReturn;
			}catch(e){// ��� ������������� ������
				value = app.val.defReturn;
			};
			// ��������� �������� �����
			wsh.quit(value);
		}
	});
})(WSH, environment);
// ��������� �������������
environment.init();