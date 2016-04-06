(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

module.exports = CryptoJS;
},{}],2:[function(require,module,exports){
//AES Formatter
//var CryptoJS = require("./aes");
var CryptoJS = require("./md5");

var CryptoJS = CryptoJS || {};
CryptoJS.JsonFormatter = {
        stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };

            // optionally add iv and salt
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }

            // stringify json object
            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);

            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });

            // optionally extract iv and salt
            if (jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if (jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }

            return cipherParams;
        }
};

module.exports = CryptoJS;
},{"./md5":4}],3:[function(require,module,exports){
var CryptoJS = require("./cryptoJSFormatter");

var LazyCrypt = function(params){
	var params = params || {};
	var size;
	
	this.hashFn = params.hashFn || CryptoJS.MD5;
	this.encryptFn = params.encryptionFn || CryptoJS.AES.encrypt;
	this.decryptFn = params.decryptionFn || CryptoJS.AES.decrypt;
	this.opts = params.opts || { format: CryptoJS.JsonFormatter };
	this.enc = params.encoding || CryptoJS.enc.Utf8;
	this.storedKey = params.fieldName || "encryptedPassPart";
	this.storedHash = params.hashName || "hashPass";
	this.storedKeys = [this.storedKey];
	size = params.size || 30;
	
	//Init the hash
	var storedHash = localStorage[this.storedHash];
	if(typeof storedHash === 'undefined'){
		this.initHash(size);
	}
};

LazyCrypt.prototype.makeRandStr = function(size){
	var buf = [];
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]";
	var possibleLen = possible.length;
	var i, pos;
	
	for(i = 0; i < size; i++){
		pos = Math.floor(Math.random() * possibleLen);
		buf.push(possible.charAt(pos));
	}
	return buf.join('');
};

LazyCrypt.prototype.initHash = function(size){
	var size = size || 30;
	var hash = this.hashFn(this.makeRandStr(size));
	hashPass = hash.toString();
	localStorage[this.storedHash] = hashPass;
};

LazyCrypt.prototype.addKey = function(key){
	if(this.storedKeys.indexOf(key) != -1){
		this.storedKeys.push(key);
	}
};

LazyCrypt.prototype.encrypt = function(opts){
	var opts = opts || {};
	var encryptedPassPart;
	var respText;
	var suc = false;
	var hash = localStorage[this.storedHash];
	
	var pass = opts.pass || '';
	var callback = opts.callback;
	var key = opts.field || this.storedKey;
	this.addKey(key);
	if(pass.length > 0){
		encryptedPassPart = this.encryptFn(pass, hash, this.opts);
		localStorage[key] = encryptedPassPart;
		respText = 'Password Set';
		suc = true;
	}
	else{
		respText = 'You must enter a password that has a length greater than 0';
	}
	var response = { text: respText,  success: suc};
	if(typeof callback === 'function'){
		callback(response);
	}
};

LazyCrypt.prototype.decrypt = function(opts){
	var opts = opts || {};
	var key = opts.key || this.storedKey;
	
	var encryptedPassPart = localStorage[key];
	var secret = localStorage[this.storedHash];
	var ret;
	
	if(typeof encryptedPassPart !== 'undefined' && typeof secret !== 'undefined'){
		ret = this.decryptFn(encryptedPassPart, secret, this.opts).toString(this.enc);
	}
	return ret;
};

LazyCrypt.prototype.clearStorage = function(){
	var fieldsToClear = this.storedKeys.concat(this.storedHash);
	var i, len;
	for(i = 0, len = fieldsToClear.length; i < len; i++){
		localStorage.removeItem(fieldsToClear[i]);
	}
};

module.exports = LazyCrypt;
},{"./cryptoJSFormatter":2}],4:[function(require,module,exports){
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

var CryptoJS = require('./aes');

var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);

module.exports = CryptoJS;
},{"./aes":1}],5:[function(require,module,exports){
/**
 * Created by pnarielwala on 2/25/2016.
 */
var Constants = function(){
    this.buttons = {
        logout: "btn-logout",
        login: "signin",
        request: "btn-createRequest",
        cancelRequest: "btn-cancel",
        createRequest: "btn-create",
        screenshot: "btn-screenshot",
        gotoRequest: "btn-gotoRequest",
        quickLinks: "btn-quickLinks",
        softwareRequest: "btn-softwareRequest",
        softwareRequirement: "btn-softwareRequirement",
        softwareTestFile: "btn-softwareTestFile",
        softwareBack: "btn-softwareBack"
    };
    this.ebYes = 2;
    this.ebNo = 1;
    this.priority = {
        immediate: "1",
        at_the_earliest: "2",
        normal: "3",
        later: "4"
    };
    this.severity = {
        severe: "1",
        major: "2",
        minor: "3"
    };
    this.type = {
        bug: "BG",
        enhancement: "EV",
        product_opening: "OR",
        question: "QU"
    };
    this.impactLayer = {
        product: "2",
        as: "1"
    };

    this.validSites = [	"inno",
        "inno2",
        "innous",
        "innous2",
        "localhost",
        "demo",
        "demo2",
        "demous",
        "demous2",
        "devus",
        "devus1",
        "devus2",
        "devus3",
        "devus4",
        "rctus",
        "rctus1",
        "rctus2",
        "rctus3",
        "rctus4",
        "rctus5"];

    this.invalidMsgTitle = "Invalid";
    this.invalidSiteMsgTitle = "Not a valid site";
    this.invalidSiteMsg = "<p>You cannot create a request for this site. The site domain must be one of the following:</p><ul class='errorList'><li>" + this.validSites.join("<li>") + "</li></ul>";
    this.ebMsgHTML = 1;
};

Constants.prototype.getButtons = function(){
    return this.buttons;
};

Constants.prototype.getEbYes = function(){
    return this.ebYes
};

Constants.prototype.getEbNo = function(){
    return this.ebNo
};

Constants.prototype.getPriority = function(){
    return this.priority;
};

Constants.prototype.getSeverity = function(){
    return this.severity;
};

Constants.prototype.getImpactLayer = function(){
    return this.impactLayer;
};


module.exports = Constants;

},{}],6:[function(require,module,exports){
//var _dechromeify = require('../../../node_modules/chrome-tool/CustomContextMenuItem');
//var _dechromeify = require('../../../ChromeWare/vendor/chrome_extensions');
var _transition = require("./transitions");
var _constants = new (require("./constants"));

var ContextMenu = function(transition){
    this.transition = transition;
    this.requestURL = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=";
    this.requirementURL = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=";
    this.testfileURL = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=";

};

ContextMenu.prototype.initialize = function(){
    var title = "Find Software Request";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openRequest});

    var title = "Find Software Requirement";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openRequirement});

    var title = "Find Software Test File";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openTestFile});
};
ContextMenu.prototype.initInWindow = function(){
    if(this.validNumber(this.getClipboard().replace("FT", ""))){
        $("#inputSoftware").val(this.getClipboard());
        // $("#" + buttons.gotoRequest).attr("disabled","disabled");
    }
};
ContextMenu.prototype.validNumber = function(content){
    var number = content.replace(/"/g, "");
    return (parseInt(number, 10) > 0)
};
ContextMenu.prototype.openRequest = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(parseInt(number, 10) > 0)
        chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number, index: (tab.index + 1), openerTabId: tab.id});
};
ContextMenu.prototype.openRequirement = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(parseInt(number, 10) > 0)
        chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number, index: (tab.index + 1), openerTabId: tab.id });
};
ContextMenu.prototype.openTestFile = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(number.indexOf("FT") >=0) {
        number = number.replace("FT", "");
        if (parseInt(number, 10) > 0)
            chrome.tabs.create({
                url: "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number,
                index: (tab.index + 1),
                openerTabId: tab.id
            });
    };
};
ContextMenu.prototype.getClipboard = function(){
    var el = document.createElement('textarea');
    document.body.appendChild(el);
    el.focus();
    document.execCommand('paste');
    var value = el.value;
    document.body.removeChild(el)
    return value;
};
ContextMenu.prototype.clearClipboard = function(){
    var el = document.createElement('textarea');
    var text = document.createTextNode("\0");
    el.appendChild(text);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
ContextMenu.prototype.gotoRequest = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number)){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number;
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.gotoRequirement = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number)){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number;
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.gotoTestFile = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number.replace("FT", ""))){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number.replace("FT", "");
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.quickLinksEvents = function(){
    var self = this;
    //$("#" + buttons.gotoRequest).click(this.gotoRequest());
    $("#" + _constants.buttons.softwareRequest).click(this.gotoRequest());
    $("#" + _constants.buttons.softwareRequirement).click(this.gotoRequirement());
    $("#" + _constants.buttons.softwareTestFile).click(this.gotoTestFile());

    $("#software-clearField").click(function(){ self.clearClipboard(); $("#inputSoftware").val("")});
    $("#" + _constants.buttons.quickLinks).click(function(){ self.transition.showQuickLinks()});
    $("#" + _constants.buttons.softwareBack).click(function(){ self.transition.hideQuickLinks()});

    $(document).keypress(function(e) {
        if(e.which == 13 && localStorage.getItem("currentWindow") == "quickLinks") {
            $("#" + _constants.buttons.softwareRequest).click();
        }
    });
};

module.exports = ContextMenu;

},{"./constants":5,"./transitions":12}],7:[function(require,module,exports){
var _lazyCrypt = require("../crypto/lazyCrypt");
var _transition = require('./transitions');
var _constants = new (require('./constants'));
var _modal = require('./modal');

var Logger = function(params, transition){
    var self = this;
    var params = params || {};
    this.transition = transition || new _transition();
    this.pingUrl = "https://software.enablon.com/Software/?u=ver&pm=6&aformat=1";
    this.swUrl = 'https://software.enablon.com/enablon/?OStId=Software';
    this.Crypt = params.Crypt || new _lazyCrypt();

    $("#" + _constants.buttons.login).click(function(){self.login()});
    $("#" + _constants.buttons.logout).click(function(){self.logout()});
};

Logger.prototype.checkLogin = function() {
    var self = this;
    this.ping().then(
        function(response, statusText, xhrObj){
            var nError = response.indexOf("error");
            if(nError == -1){
                self.transition.loggedIn();
            }
            else{
                if(localStorage.getItem("currentWindow") == "request"){
                    new _modal("warning", "You have been logged out!", "Please login to continue").display();
                };

                self.transition.loggedOut();
            }
        }, function(xhrObj, textStatus, err) {
            new _modal("danger", "Software is Offline", "Please check your connection").display();
            console.warn(err);
            self.transition.loggedOut();
        }
    )

};

Logger.prototype.login = function(){
    var user = $("input[id='inputUsername']").val();
    var pwd = $("input[id='inputPassword']").val();

    if(!(user && pwd)){
        new _modal("danger", "Invalid Credentials", "Please enter valid Software credentials").display();
    }else{
        this.connect(user, pwd);
    };
};

Logger.prototype.logout = function(){
    $.post("https://software.enablon.com/Software/?u=logoff");
    this.transition.logOut();
};

Logger.prototype.connect = function(user, password){
    this.transition.checkLogin();
    var data= {uid:user, sid:'enablon', Var_BuilderKeyAutoLogin: '', pwd:password, LogIn:'OK', LogIn:'Log In'};

    var self = this;
    $.ajax({
        type: 'POST',
        url: self.swUrl,
        data: data,
        async: true,
        timeout: 6000,
        success:function(data) {
            var nConnected = data.indexOf('<TITLE>Dashboards</TITLE>');
            if(!(nConnected > 0))
            {
                if(localStorage.getItem('currentWindow') == ("main" || null))
                {
                    self.transition.loggedOut();
                }
                else {
                    self.transition.loggedOut();
                    new _modal("danger", "Invalid Credentials.", "Please enter valid Software credentials").display();
                }
            }else{
                self.transition.loginSuccess();
            }
        },
        error:function(){
            if(localStorage.getItem('currentWindow') == ("main" || null))
            {
                self.transition.loggedOut();
            }else{
                new _modal("danger", "Invalid Credentials.", "Please enter valid Software credentials").display();
            };
            self.transition.states.hideLoading();
        }
    });
};

Logger.prototype.ping = function(){
    return Promise.resolve($.ajax({
            url: this.pingUrl,
            type: 'GET',
            timeout: 5000,
            cache: false
        })
    );
};

module.exports = Logger;










},{"../crypto/lazyCrypt":3,"./constants":5,"./modal":9,"./transitions":12}],8:[function(require,module,exports){
//var jQuery = require("../../vendor/jquery");
//
//window.buttons = {
//			logout: "btn-logout",
//			login: "signin",
//			request: "btn-createRequest",
//			cancelRequest: "btn-cancel",
//			createRequest: "btn-create",
//			screenshot: "btn-screenshot",
//			gotoRequest: "btn-gotoRequest",
//			quickLinks: "btn-quickLinks",
//			softwareRequest: "btn-softwareRequest",
//			softwareRequirement: "btn-softwareRequirement",
//			softwareTestFile: "btn-softwareTestFile",
//			softwareBack: "btn-softwareBack"
//		};
//window.ebYes = 2;
//window.ebNo = 1;
//window.priority = {
//			immediate: "1",
//			at_the_earliest: "2",
//			normal: "3",
//			later: "4"
//		};
//window.severity = {
//			severe: "1",
//			major: "2",
//			minor: "3"
//		};
//window.type = {
//			bug: "BG",
//			enhancement: "EV",
//			product_opening: "OR",
//			question: "QU"
//		};
//window.impactLayer = {
//			product: "2",
//			as: "1"
//		};
//
//window.validSites = [	"inno",
//						"inno2",
//						"innous",
//						"innous2",
//						"localhost",
//						"demo",
//						"demo2",
//						"demous",
//						"demous2",
//						"devus",
//						"devus1",
//						"devus2",
//						"devus3",
//						"devus4",
//						"rctus",
//						"rctus1",
//						"rctus2",
//						"rctus3",
//						"rctus4",
//						"rctus5"];
//
//window.invalidMsgTitle = "Invalid";
//window.invalidSiteMsg = "You cannot create a request for this site. The site domain must be one of the following: " + window.validSites.join(", ");


var _transition = require("./transitions");
var _requestFields = require("./requestFields");
var _url = require("./urlManagement");
var _contextMenu = require("./contextMenu");
var _logger = require("./logger");
var _version = require("./version");

window.onload = function(){

	//This is used to grab Release and Product Component from Software. Needs Request #95456
	//var url = new _url();
	//url.storeSoftwareData();
	//url.storeTempSoftwareData();
	var transition = new _transition();
	transition.initialize();

	var version = new _version();

	var requestFields = new _requestFields(transition);
	requestFields.initialize();

	var logger = new _logger(null, transition);
	logger.checkLogin();// check and log if needed

	var contextMenu = new _contextMenu(transition);
	contextMenu.initInWindow();
	contextMenu.quickLinksEvents();
};
},{"./contextMenu":6,"./logger":7,"./requestFields":10,"./transitions":12,"./urlManagement":13,"./version":14}],9:[function(require,module,exports){
var _constants = new (require('./constants'));

var Modal = function(type, title, message, flag){
	this.type = type;
	this.title = title;
	this.message = message;
	this.flag = flag;
	this.modalData = $("#myModal");

	this.modalData.on('hidden.bs.modal', function (e) {
		$(this).find(".modal-body").empty();
	})
};

Modal.prototype.setType = function(){
	switch(this.type){
		case "warning":
			this.modalData.find(".modal-content").addClass("warning")
			break;
		case "danger":
			this.modalData.find(".modal-content").addClass("danger")
			break;
		case "success":
			this.modalData.find(".modal-content").addClass("success")
			break;
		default:
			break;
	}
};
Modal.prototype.setTitle = function(){
	this.modalData.find(".modal-title").text(this.title)
};
Modal.prototype.setMessage = function(){
	if(this.flag == _constants.ebMsgHTML){
		this.modalData.find(".modal-body").append(this.message)
	}else{
		this.modalData.find(".modal-body").text(this.message)
	}
};
Modal.prototype.display = function(){
	this.setType();
	this.setTitle();
	this.setMessage();

	this.modalData.modal('show');
};

module.exports = Modal;

},{"./constants":5}],10:[function(require,module,exports){
var _screenshotTool = new (require('./screenshot'));
var _url = new (require('./urlManagement'));
var _constants = new (require('./constants'));

var _transitions = require('./transitions');
var _modal = require('./modal');

var RequestFields = function(transition){
	this.transition = transition || new _transitions();
};

RequestFields.prototype.initialize = function(){
	var fieldsObj = this.getFields() == undefined ? {} : this.getFields();
	this.setFields(fieldsObj);

	this.storeBuildData();
	this.defaultFieldValues();
	this.fillFields();
	this.autoFillFields();
	this.rememberFields();
	this.initFieldPopover();
	this.initSectionTracking();
	this.fieldSetHandler();
	this.initFieldEvents();
	this.handleRequiredFields("required");
};
RequestFields.prototype.autoFillFields = function(){
	var self = this;
	_url.getReleaseData().then(function(response){
		var releaseObj = JSON.parse(response);
		var releaseKeys = Object.keys(releaseObj);
		$( "#Fld__xml_Release" ).autocomplete({
			source: releaseKeys
		}).focusout(function(){
			if(releaseKeys.indexOf($(this).val()) == -1){
				var element = $(':focus');
				$(this).val("");
				self.setFieldValue("Fld__xml_Release", "");
				self.handleRequiredFields("required");
				element.focus();
			}
		});
	}, function(error){
		console.log("failed!", error);
	});

	_url.getProductComponentData().then(function(response){
		var prodCompObj = JSON.parse(response);
		var prodCompObj2 = {};
		for(var key in prodCompObj){
			var obj = prodCompObj[key];
			prodCompObj2[obj.name] = obj.path
		}
		var prodCompKeys = Object.keys(prodCompObj2);
		$( "#Fld__xml_ProductComponent" ).autocomplete({
			source: prodCompKeys
		}).focusout(function(){
			if(prodCompKeys.indexOf($(this).val()) == -1){
				var element = $(':focus');
				$(this).val("");
				self.setFieldValue("Fld__xml_ProductComponent", "");
				self.handleRequiredFields("required");
				element.focus();
			}
		});
	}, function(error){
		console.log("failed!", error);
	});
};
RequestFields.prototype.rememberFields = function(){
	//All input text fields have this class
	var self = this;

	function rememberTextFields(){
		function storeFieldTextValue(element){
			var fieldId = $(element).attr('id');
			var fieldValue = $(element).val();
			self.setFieldValue(fieldId, fieldValue)
		};

		var formField = ".form-control";
		$("#request").find(formField).each(function() {
			storeFieldTextValue(this)
		}).focusout(function() {
			storeFieldTextValue(this);
			self.handleRequiredFields("required");
		});
	};

	function rememberRadioFields(){
		$("input:radio").click(function(){
			var fieldId = $(this).attr('name');
			var fieldValue = $(this).val();
			self.setFieldValue(fieldId, fieldValue);
		});
	};

	function rememberCheckboxFields(){
		$("input:checkbox").click(function(){
			var fieldId = $(this).attr('id');
			var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
			fieldsObj[fieldId] = ($(this).prop("checked") == true) ? _constants.ebYes:_constants.ebNo;
			localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
		});
	};

	rememberTextFields();
	rememberRadioFields();
	rememberCheckboxFields();
};
RequestFields.prototype.fillFields = function(){
	var formField = ".form-control";
	var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));

	$("#request").find(formField).each(function() {
		var fieldId = $(this).attr('id');
		var fieldValue = fieldsObj[fieldId];
		if(fieldValue != null && fieldId != "filename")
		{
			$(this).val(fieldValue);
		}
	});

	$("input:radio").each(function(){
		switch(fieldsObj["Fld__xml_ImpactedLayer"]){
			case _constants.impactLayer.product:
				$("#productLayer").prop("checked", true);
				break;
			case _constants.impactLayer.as:
				$("#asLayer").prop("checked", true);
				break;
			default:
				fieldsObj["Fld__xml_ImpactedLayer"] = _constants.impactLayer.product;
		}
	});

	$("input:checkbox").each(function(){
		var fieldId = $(this).attr('id');
		var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
		$(this).prop("checked", (fieldsObj[fieldId] == _constants.impactLayer.product));
	});
	this.fillImages();
};
RequestFields.prototype.clearFields = function(){
	var self = this;
	this.setFields({});

	var formField = ".form-control";
	$("#request").find(formField).each(function() {
		var fieldId = $(this).attr('id');

		if(["Fld__xml_Type", "Fld__xml_Severity", "Fld__xml_Priority"].indexOf(fieldId) > -1){
			switch(fieldId){
				case "Fld__xml_Type":
					$(this).val(_constants.type.bug);
					break;
				case "Fld__xml_Severity":
					$(this).val(_constants.severity.minor);
					break;
				case "Fld__xml_Priority":
					$(this).val(_constants.priority.normal);
					break;
			};
		}
		else{
			$(this).val("");
		}
	});
	$(".requiredErrorHeader").remove();
	$(".requiredError").removeClass("requiredError");
	$("#productLayer").prop("checked", true);
	$("#Fld__xml_Regression").prop("checked", false);
	var regressionFieldParent = $("#Fld__xml_RegressionFrom").parent();
	if(!regressionFieldParent.hasClass("hide")){
		regressionFieldParent.addClass("hide");
	}


	_screenshotTool.clearScreenshots();
};
RequestFields.prototype.defaultFieldValues = function(){
	this.setFieldValue("Fld__xml_ImpactedLayer", _constants.impactLayer.product);
	this.setFieldValue("Fld__xml_Type", _constants.type.bug);
	this.setFieldValue("Fld__xml_Severity", _constants.severity.minor);
	this.setFieldValue("Fld__xml_Priority", _constants.priority.normal);
};
RequestFields.prototype.handleRequiredFields = function(classAttr){
	var self = this;
	var err = false;
	$("#request").find("[data-required]").each(function(){
		var element = $(this);
		var fieldSets = element.data("required");
		var value = self.getFieldValue(element.attr("id"));
		if(value == "" || value == undefined){
			if(fieldSets == ""){
				err = true;
				if(!element.hasClass(classAttr)){
					element.addClass(classAttr);
				}
			}else{
				var tempErr = true;
				for(var fieldId in fieldSets){
					var triggerValue = fieldSets[fieldId];
					if(Array.isArray(triggerValue)){
						tempErr = tempErr && (triggerValue.indexOf(self.getFieldValue(fieldId)) > -1);
					}else{
						tempErr = tempErr && (self.getFieldValue(fieldId) == triggerValue)
					};
				};
				if(tempErr){
					err = true;
					if(!element.hasClass(classAttr)){
						element.addClass(classAttr);
					}
				}else{
					element.removeClass(classAttr);
				}
			}
		}else{
			element.removeClass(classAttr);
		}
	});
	return err;
};
RequestFields.prototype.validateFields = function(){
	var err = this.handleRequiredFields("requiredError");
	$(".panel").each(function(){
		var element = $(this);
		var errCount = element.find(".requiredError").length;
		var errHeaderCount = element.find(".requiredErrorHeader").length;
		if(errCount > 0){
			if(errHeaderCount == 0){
				$(element.find(".panel-title")[0]).append("<span class='glyphicon glyphicon-exclamation-sign requiredErrorHeader' aria-hidden='true'></span>");
			}
		}else{
			element.find(".requiredErrorHeader").remove();
		}
	});
	if(err){
		new _modal("danger", "Invalid Fields!", "There are some errors in the form, please fix them to submit the form again.").display();
	};
	return err
};
RequestFields.prototype.fillImages = function(){
	var objImages = JSON.parse(localStorage.getItem("Screenshots")) || {};
	//
	$.get("screenshotListItem.html", function(data){
		for(var fileName in objImages){
			if(objImages.hasOwnProperty(fileName)){
				var appendData = $($(data)[0]).attr("data-screenshot-name", fileName)[0];
				if(fileName.length > 30){
					appendData = $(appendData).append(fileName.slice(0, 30) + "...");
				}else{
					appendData = $(appendData).append(fileName);
				};
				$(".screenshot-group").append(appendData);
			}
		};

		_screenshotTool.initScreenshotEvents();
	});
};
RequestFields.prototype.initFieldEvents = function(){
	//Be aware of the order
	var self = this;
	//$("#" + buttons.request).attr("disabled","disabled");
	localStorage.setItem("RequestCreationAllowed", false);
	localStorage.setItem("LoggedOut", true);

	$("#" + _constants.buttons.cancelRequest).click(function(){
		self.resetSections();
		self.clearFields();
		self.defaultFieldValues();
		self.transition.cancelRequest()
	});

	$("#" + _constants.buttons.createRequest).click(function(){
		if(!self.validateFields()){
			self.createRequest();
		}
	});

	$("#" + _constants.buttons.screenshot).click(this.takeScreenshot);
	$("#" + _constants.buttons.request).click(function(){
		if(localStorage.getItem("RequestCreationAllowed") == "false"){
			new _modal("danger", _constants.invalidSiteMsgTitle, _constants.invalidSiteMsg, _constants.ebMsgHTML).display();
		}else if(localStorage.getItem("LoggedOut") == "true"){
			new _modal("danger", _constants.invalidMsgTitle, "You are signed out of this site. Please log back in and try again").display();
		}else{
			self.transition.createRequest();
			self.storeBuildData();
			self.fieldSetHandler();
			self.handleRequiredFields("required");
		}
	});
};
RequestFields.prototype.fieldSetHandler = function(){
	$('[data-fieldset]').each(function(){
		var selfData = $(this);
		var myFieldId = selfData.find(".form-control").attr("id");
		var myFieldParentData = $("#" + myFieldId).parent();
		var fieldSets = selfData.data("fieldset");
		for(var fieldId in fieldSets){
			var triggerValue = fieldSets[fieldId];
			var fieldData = $("#" + fieldId);
			if(fieldData.prop("type") == "checkbox"){
				if(fieldData.prop("checked") == true)
					myFieldParentData.removeClass("hide");
				$("#" + fieldId).change(function(){
					if($(this).prop("checked") == true)
						myFieldParentData.removeClass("hide");
					if($(this).prop("checked") == false)
						myFieldParentData.addClass("hide");
				});
			}
		}
	})
};
RequestFields.prototype.initFieldPopover = function(){
	var formField = ".form-control";
	$("#request").find(formField).hover(function() {
		//Retrieve the value of the field for comparison
		var popupValue = $(this).val();
		if(popupValue !== ""){
			//If the field is not empty, then it will apply
			//the popover
			var popupName = $(this).prev().text();
			$(this)
				.popover({content: popupName, placement:"top", container: 'body', trigger: 'focus'});
		}
		else{
			//Else, if the field is empty then the field
			//destroys the popover
			$(this).popover('destroy');
		};
	});
};
RequestFields.prototype.initSectionTracking = function(){
	var section = ".panel-collapse";
	this.loadLastSection();
	$(section).on('shown.bs.collapse', function () {
		var sectionId = $(this).attr("id");
		localStorage.setItem("lastSection", sectionId);
	});
};
RequestFields.prototype.loadLastSection = function(){
	var sectionId = localStorage.getItem("lastSection");
	if(sectionId != null)
	{
		$('#'+ sectionId).collapse({parent: "#accordion"})
	}
	else{
		this.resetSections();
	}
};
RequestFields.prototype.resetSections = function(){
	$('#collapseOne').addClass('in')
		.css({height: 'auto'});
	$('#collapseTwo').removeClass('in')
		.css({height: '0px'});
	$('#collapseThree').removeClass('in')
		.css({height: '0px'});
	$('#collapseFour').removeClass('in')
		.css({height: '0px'});
	localStorage.setItem("lastSection", 'collapseOne');
};
RequestFields.prototype.createRequest = function(){
	var self = this;
	function getSoftwareData(){
		return new Promise(function(resolve, reject){
			var returnObj = {};
			_url.getReleaseData().then(function(response){
				returnObj["releases"] = JSON.parse(response);
				_url.getProductComponentData().then(function(response){
					returnObj["product-components"] = JSON.parse(response);
					resolve(JSON.stringify(returnObj));
				}, function(error){
					console.log("failed!", error);
				});

			}, function(error){
				console.log("failed!", error);
			});
		});
	};

	getSoftwareData().then(function(response){
		var requestURL = _url.createRequestURL();
		var dataObj = JSON.parse(response);
		var releaseObj = dataObj["releases"];
		var prodCompObj = dataObj["product-components"];
		var prodCompObj2 = {};
		for(var key in prodCompObj){
			var obj = prodCompObj[key];
			prodCompObj2[obj.name] = obj.path + " > " + obj.code
		}

		var fieldsObj = self.getFields();
		for(var fieldXML in fieldsObj){
			var fieldVal = fieldsObj[fieldXML];
			if(fieldVal != "" && fieldVal != undefined){
				if(fieldXML == "Fld__xml_ProductComponent"){
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(prodCompObj2[fieldVal] || "")
				}else if(fieldXML == "Fld__xml_Release"){
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(releaseObj[fieldVal] || "")
				}else if(fieldXML == "Fld__xml_NeedDate"){
					var dateArray = fieldVal.split('-')[1] + "/"+ fieldVal.split('-')[2] + "/"+ fieldVal.split('-')[0];
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(dateArray && "")
				}
				else{
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(fieldVal);
				};
			}
		};
		self.downloadScreenshots();
		self.clearFields();
		self.resetSections();
		self.transition.cancelRequest();
		chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: requestURL, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
	}, function(error){
		console.log("failed!", error);
	});
};
RequestFields.prototype.storeBuildData = function(){
	function storeBuildDataHelper(siteData){
		var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
		if(fieldsObj["Fld__xml_EnvironmentBuilds"] == undefined){
			fieldsObj["Fld__xml_EnvironmentBuilds"] = siteData.buildData;
			fieldsObj["Fld__xml_URL"] = siteData.url;
			$("#Fld__xml_URL").val(siteData.url);
			localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
		}
	};
	this.transition.states.showLoading();
	_url.getCurrentSiteBuilds(storeBuildDataHelper);
	this.transition.states.hideLoading();
};
RequestFields.prototype.takeScreenshot = function(){
	_screenshotTool.takeScreenshot();
};
RequestFields.prototype.downloadScreenshots = function(){
	_screenshotTool.downloadScreenshots();
	_screenshotTool.clearScreenshots();
};

RequestFields.prototype.getFields = function(){
	return JSON.parse(localStorage.getItem("requestFields"))
};
RequestFields.prototype.setFields = function(fields){
	localStorage.setItem("requestFields", JSON.stringify(fields))
};
RequestFields.prototype.getFieldValue = function(field){
	return JSON.parse(localStorage.getItem("requestFields"))[field];
};
RequestFields.prototype.setFieldValue = function(field, value){
	var obj = JSON.parse(localStorage.getItem("requestFields"));
	obj[field] = value;
	localStorage.setItem("requestFields", JSON.stringify(obj))
};

module.exports = RequestFields;

},{"./constants":5,"./modal":9,"./screenshot":11,"./transitions":12,"./urlManagement":13}],11:[function(require,module,exports){
var _modal = require("./modal");
var _constants = new (require("./constants"));

var Screenshot = function(){};

Screenshot.prototype.takeScreenshot = function takeScreenshot(){
	self = this;
	chrome.tabs.captureVisibleTab(null, function(img) {
		filename = $("#filename").val();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));

		if(objImages == null)
			objImages = {};
		if(Object.keys(objImages).length < 3){
			if(filename == ""){
				new _modal("danger", "Sorry!", "Please enter in a filename before generating a screenshot").display();
			}else{
				var imgUrl = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
				var link = document.createElement("a");
				link.download = filename + ".jpg";
				//link.href = imgUrl;
				link.href = img;

				var imageVersion = 1;
				while(objImages[filename] != null){
					imageVersion++;
					filename = filename + imageVersion;
				};
				objImages[filename] = img;
				localStorage.setItem("Screenshots", JSON.stringify(objImages));
				$("#filename").val("");

				$.get("screenshotListItem.html", function(data){
					var appendData = $($(data)[0]).attr("data-screenshot-name", filename)[0];
					if(filename.length > 30){
						appendData = $(appendData).append(filename.slice(0, 30) + "...");
					}else{
						appendData = $(appendData).append(filename);
					}
					$(".screenshot-group").append(appendData);
					self.initScreenshotEvents();
				});
			}
		}else{
			new _modal("danger", "Sorry!", "Only 3 screenshots are allowed. Please remove one and try again.").display();
		}
	});
};
Screenshot.prototype.downloadScreenshots = function downloadScreenshots(){
	var objImages = JSON.parse(localStorage.getItem("Screenshots"));
	console.log(objImages);
	jQuery.ajaxSetup({async:false});
	for(var fileName in objImages){
		var img = objImages[fileName];
		var link = document.createElement("a");
		link.download = fileName + ".jpg";
		link.href = img;
		link.click();
	};
	jQuery.ajaxSetup({async:true});
};
Screenshot.prototype.clearScreenshots = function clearScreenshots(){
	localStorage.removeItem("Screenshots");
	$(".screenshot-group").children().remove();
};
Screenshot.prototype.validateTakeScreenshot = function validateTakeScreenshot(){
	$("#filename").each(function(){
		selfData = $(this);
		// if(selfData.val() == "" || selfData.val() == undefined){
		// $("#" + buttons.screenshot).attr("disabled", "disabled")
		// };

		selfData.keyup(function(){
			// if(selfData.val() == "" || selfData.val() == undefined){
			// $("#" + buttons.screenshot).attr("disabled", "disabled")
			// }else{
			//Download file cannot contain invalid characters: \/:*?<>|
			var sString = selfData.val().substring(selfData.val().length -1, selfData.val().length);
			if(["\\", "/", ":", "*", "?", "<", ">", "|"].indexOf(sString) != -1){
				selfData.val(selfData.val().substring(0, selfData.val().length -1));
				return
			};
			// }
		});
	});
};
Screenshot.prototype.initScreenshotEvents = function initScreenshotEvents(){
	this.validateTakeScreenshot();

	$(".screenshot-edit").click(function(event){
		event.preventDefault();
		localStorage.setItem("editImageIndex", $(this).parent().attr("data-screenshot-name"));
		chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: "../html/edit.html", index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
	});

	$(".screenshot-save").click(function(event){
		event.preventDefault();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));
		var filename = $(this).parent().attr("data-screenshot-name");
		var img = objImages[filename];
		var link = document.createElement("a");
		link.download = filename + ".jpg";
		link.href = img;
		link.click();
	});

	$(".screenshot-remove").click(function(event){
		event.preventDefault();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));
		var filename = $(this).parent().attr("data-screenshot-name");
		delete objImages[filename];
		if(!(Object.keys(objImages).length > 2)){
			$("#" + _constants.buttons.screenshot).attr("disabled", false);
		};
		localStorage.setItem("Screenshots", JSON.stringify(objImages));
		$(this).parent().remove();
	});
};

module.exports = Screenshot;

//var Screenshot = (function (){
//
//	return {
//		takeScreenshot: function(){
//			self = this;
//			chrome.tabs.captureVisibleTab(null, function(img) {
//				var date = new Date();
//				var screenshotUrl = img;
//				var viewTabUrl = chrome.extension.getURL('screenshot.html');
//				filename = $("#filename").val();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//
//				if(objImages == null)
//					objImages = {};
//				if(Object.keys(objImages).length < 3){
//					if(filename == ""){
//						new Modal("danger", "Sorry!", "Please enter in a filename before generating a screenshot").display();
//					}else{
//						var imgUrl = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
//						var link = document.createElement("a");
//						link.download = filename + ".jpg";
//						//link.href = imgUrl;
//						link.href = img;
//
//						var imageVersion = 1;
//						while(objImages[filename] != null){
//							imageVersion++;
//							filename = filename + imageVersion;
//						};
//						objImages[filename] = img;
//						localStorage.setItem("Screenshots", JSON.stringify(objImages));
//						$("#filename").val("");
//
//						$.get("screenshotListItem.html", function(data){
//							var appendData = $($(data)[0]).attr("data-screenshot-name", filename)[0];
//							appendData = $(appendData).append(filename);
//							$(".screenshot-group").append(appendData);
//							self.initScreenshotEvents();
//						});
//					}
//				}else{
//					new Modal("danger", "Sorry!", "Only 3 screenshots are allowed. Please remove one and try again.").display();
//				}
//			});
//		},
//		downloadScreenshots: function(){
//			var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//			console.log(objImages);
//			jQuery.ajaxSetup({async:false});
//			for(var fileName in objImages){
//				var img = objImages[fileName];
//				var link = document.createElement("a");
//				link.download = fileName + ".jpg";
//				link.href = img;
//				link.click();
//			};
//			jQuery.ajaxSetup({async:true});
//		},
//		clearScreenshots: function(){
//			localStorage.removeItem("Screenshots");
//			$(".screenshot-group").children().remove();
//		},
//		validateTakeScreenshot: function validateTakeScreenshot(){
//			$("#filename").each(function(){
//				selfData = $(this);
//				// if(selfData.val() == "" || selfData.val() == undefined){
//					// $("#" + buttons.screenshot).attr("disabled", "disabled")
//				// };
//
//				selfData.keyup(function(){
//					// if(selfData.val() == "" || selfData.val() == undefined){
//						// $("#" + buttons.screenshot).attr("disabled", "disabled")
//					// }else{
//						//Download file cannot contain invalid characters: \/:*?<>|
//						var sString = selfData.val().substring(selfData.val().length -1, selfData.val().length);
//						if(["\\", "/", ":", "*", "?", "<", ">", "|"].indexOf(sString) != -1){
//							selfData.val(selfData.val().substring(0, selfData.val().length -1));
//							return
//						};
//					// }
//				});
//			});
//		},
//		initScreenshotEvents: function(){
//			this.validateTakeScreenshot();
//
//			$(".screenshot-edit").click(function(event){
//				event.preventDefault();
//				localStorage.setItem("editImageIndex", $(this).parent().attr("data-screenshot-name"));
//				chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: "../html/edit.html", index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
//			});
//
//			$(".screenshot-save").click(function(event){
//				event.preventDefault();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//				var filename = $(this).parent().attr("data-screenshot-name");
//				var img = objImages[filename];
//				var link = document.createElement("a");
//				link.download = filename + ".jpg";
//				link.href = img;
//				link.click();
//			});
//
//			$(".screenshot-remove").click(function(event){
//				event.preventDefault();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//				var filename = $(this).parent().attr("data-screenshot-name");
//				delete objImages[filename];
//				if(!(Object.keys(objImages).length > 2)){
//					$("#" + buttons.screenshot).attr("disabled", false);
//				};
//				localStorage.setItem("Screenshots", JSON.stringify(objImages));
//				$(this).parent().remove();
//			});
//		}
//
//	}
//
//});
},{"./constants":5,"./modal":9}],12:[function(require,module,exports){
var _window = require('./windows');

var Transitions = function(){
    this.states = _window;
    this.states.initWindows();
};

Transitions.prototype.initialize = function(){
    var initialWindow = localStorage.getItem("currentWindow") == undefined ? this.states.defaultId : localStorage.getItem("currentWindow");
    switch (initialWindow) {
        case "loginWindow":
            this.states.hideLoading();
            this.states.showWindowNow(initialWindow, "slideInLeft");
            localStorage.setItem("currentWindow", initialWindow);
            break;
        case "main":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("request", "slideOutRight");
            this.states.hideWindowNow("quickLinks", "slideOutRight");
            localStorage.setItem("currentWindow", "main");
            break;
        case "request":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("quickLinks", "slideOutRight");
            localStorage.setItem("currentWindow", "request");
            break;
        case "quickLinks":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("request", "slideOutRight");
            localStorage.setItem("currentWindow", "quickLinks");
            break;
        default:
            console.warn("showWindow has not been implemented for window: " + initialWindow);
            break;
    };
};
Transitions.prototype.loginSuccess = function(){
    this.states.hideLoading();
    if(localStorage.getItem("currentWindow") == "loginWindow"){
        this.states.hideWindow("loginWindow", "slideOutLeft");
        this.states.hideWindowNow("request", "slideOutRight");
        this.states.hideWindowNow("quickLinks", "slideOutRight");
        localStorage.setItem("currentWindow", "main");
    };
};
Transitions.prototype.checkLogin = function(){
    this.states.showLoading();
};
Transitions.prototype.loginFail = function(){
    this.states.hideLoading();
};
Transitions.prototype.loggedOut = function(){
    //Ideally we want to show a modal for this login instead of going to the orig login
    var initialWindow = localStorage.getItem("currentWindow");
    this.states.showWindowNow("loginWindow", "slideInLeft");
    this.states.hideLoading();
    if(initialWindow == "request"){
        localStorage.setItem("currentWindow", "request")
    }
};
Transitions.prototype.loggedIn = function(){
    this.states.hideLoading();
    this.states.hideWindowNow("loginWindow", "slideOutLeft");
    if(localStorage.getItem("currentWindow") == "loginWindow"){
        this.states.hideWindowNow("request", "slideOutRight");
        this.states.hideWindowNow("quickLinks", "slideOutRight");
        localStorage.setItem("currentWindow", "main");
    }
};
Transitions.prototype.logOut = function(){
    this.states.hideLoading();
    this.states.showWindow("loginWindow", "slideInLeft");
    localStorage.setItem("currentWindow", "loginWindow");
};
Transitions.prototype.createRequest = function(){
    this.states.showWindow("request", "slideInRight");
    localStorage.setItem("currentWindow", "request");
};
Transitions.prototype.cancelRequest = function(){
    this.states.showWindow("request", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};
Transitions.prototype.showQuickLinks = function(){
    this.states.showWindow("quickLinks", "slideInRight");
    localStorage.setItem("currentWindow", "quickLinks");
};
Transitions.prototype.hideQuickLinks = function(){
    this.states.showWindow("quickLinks", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};

module.exports = Transitions;
},{"./windows":15}],13:[function(require,module,exports){
var _constants = new (require("./constants"));

var URLManagement = function(){
    this.softwareURL = "https://software.enablon.com/Software/?u=";
    this.requestPath = "/Referent/Rqtes";
    this.addMode = "&tm=1&ext=1";
};

URLManagement.prototype.createRequestURL = function(){
    return (this.softwareURL + this.requestPath + this.addMode);
};
URLManagement.prototype.getCurrentTabURL = function(callback){
    var thisURL = "";
    chrome.tabs.query({active: true, currentWindow: true},
        function(tabs){
            thisURL = decodeURI(tabs[0].url).toLowerCase();
            if(typeof(callback) == "function")
                callback(thisURL);
        });
    return thisURL;
};
URLManagement.prototype.getCurrentSiteBuilds = function(callback){
    var self = this;
    function returnSiteBuilds(currSite){
		var selfcallback = callback;
        var siteData = self.getSiteURLData(currSite);
		if(siteData.valid){
			var versionUrl = siteData["versionUrl"];

            $.get(versionUrl,
                function (data, status) {
                    if(status === 'success') {
						if(!($(data).filter("#LoginForm").length > 0)){
							localStorage.setItem("LoggedOut", false);
							if($('.VPACK b', data).length > 0){
								siteData.buildData = $(' .VPACK b', data).parent().text();
							}else{
								siteData.buildData = "N/A"
							};

							if(typeof(selfcallback) == "function" && siteData.buildData.length > 0){
								selfcallback(siteData);
							}
						}else{
							localStorage.setItem("LoggedOut", true);
						}
                    }else{
                        localStorage.setItem("LoggedOut", false);
                        console.warn("shit. something went wrong")
                    }
                });
        };
    };

    this.getCurrentTabURL(returnSiteBuilds)
};
URLManagement.prototype.getSiteURLData = function(url){
	var retObj = {valid: false};
	var urlSplit = url.split("/");

	if(url.indexOf("enablon.com/") == -1 && url.indexOf("localhost/") == -1){
		return retObj;
	};
	var domain = urlSplit[2].toLowerCase().split(".")[0];
	if(_constants.validSites.indexOf(domain) > -1) {
		localStorage.setItem("RequestCreationAllowed", true);
		retObj["domain"] = domain;
		retObj["url"] = url;
		retObj["valid"] = true;

		if(domain != "localhost"){
			retObj["versionUrl"] = urlSplit.slice(0, 5).join("/") + '/?u=/ver';
		}else{
			retObj["versionUrl"] = urlSplit.slice(0, 4).join("/") + '/?u=/ver';
		}

		return retObj;
	}else if(localStorage.getItem("currentWindow") == "main"){
		localStorage.setItem("RequestCreationAllowed", false);
		return retObj;
	}

};

URLManagement.prototype.getReleaseData = function(){
	var self = this;
	return new Promise(function(resolve, reject){
		var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
		$.ajax({
			url: appVerPageUrl,
			type: "POST",
			data: JSON.stringify({
				fct_name: "ocGetReleases",
				"params": {}
			}),
			contentType: "application/json",
			dataType: "json",
			success: function (data) {
				if(data.status == "OK") {
					resolve(JSON.stringify(data))
				}else{
					resolve(JSON.stringify(self.getTempSoftwareData()["releases"]))
				}
			},
			error: function (data) {
				resolve(JSON.stringify(self.getTempSoftwareData()["releases"]))
			}
		});
	});
};

URLManagement.prototype.getProductComponentData = function(){
	var self = this;
	return new Promise(function(resolve, reject){
		var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
		$.ajax({
			url: appVerPageUrl,
			type: "POST",
			data: JSON.stringify({
				fct_name: "ocGetProductComponents",
				"params": {}
			}),
			contentType: "application/json",
			dataType: "json",
			success: function (data) {
				if(data.status == "OK") {
					resolve(JSON.stringify(data))
				}else{
					resolve(JSON.stringify(self.getTempSoftwareData()["product-components"]))
				}
			},
			error: function (data) {
				resolve(JSON.stringify(self.getTempSoftwareData()["product-components"]))
			}
		});
	});
};
URLManagement.prototype.storeSoftwareData = function(){

	var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
	var self = this;
	var retObj = {};
	$.ajax({
		url: appVerPageUrl,
		type: "POST",
		data: JSON.stringify({
			fct_name: "ocGetProductComponents",
			"params": {}
		}),
		contentType: "application/json",
		dataType: "json",
		success: function (data) {
			if(data.status == "OK"){
				retObj["product-components"] = data;
			}else{
				console.log("fail!");
				retObj["product-components"] = self.getTempSoftwareData()["product-components"];
			}
		},
		error: function (data) {
			console.log("fuck");
			retObj["product-components"] = self.getTempSoftwareData()["product-components"];
		}
	});
	$.ajax({
		url: appVerPageUrl,
		type: "POST",
		data: JSON.stringify({
			fct_name: "ocGetReleases",
			"params": {}
		}),
		contentType: "application/json",
		dataType: "json",
		success: function (data) {
			if(data.status == "OK") {
				retObj["releases"] = data;
			}else{
				console.log("fail!");
				retObj["releases"] = self.getTempSoftwareData()["releases"];
			}
		},
		error: function (data) {
			console.log("fuck");
			retObj["releases"] = self.getTempSoftwareData()["releases"];
		}
	});
	//var appVerPageUrl = "https://ia-dev.enablon.com/7.10/Software.ext/go.aspx?u=/Referent/PCaRel";

	//$.get(appVerPageUrl,
	//	function (data, status) {
	//		if(status === 'success') {
	//			if($(data).find(".releases").length!== 0){
	//				var releaseData = $(data).find(".releases").children();
	//				console.log(releaseData.length);
	//				var releaseObject = {};
	//				for(var i=0; i < releaseData.length; i++){
	//					var release = releaseData[i];
	//					var code = $(release).text();
	//					var id = $(release).prop("id");
	//					releaseObject[code] = id;
	//				};
	//				console.log("saving releases to localstorage");
	//				localStorage.setItem("releases", JSON.stringify(releaseObject))
	//			}else{
	//				console.warn("Cannot connect to software dev");
	//			}
	//			if($(data).find(".product-component").length!== 0){
	//				var prodCompData = $(data).find(".product-component").children();
	//				var prodCompObject = {};
	//				for(var i=0; i < prodCompData.length; i++){
	//					var component = prodCompData[i];
	//					var code = $(component).text();
	//					var id = $(component).prop("id");
	//					prodCompObject[code] = id;
	//				};
	//				console.log("saving components to localstorage");
	//				localStorage.setItem("product-components", JSON.stringify(prodCompObject))
	//			}else{
	//				console.warn("Cannot connect to software dev");
	//			}
	//		}else{
	//			console.warn("Could not connect to "+ appVerPageUrl)
	//		}
	//	}
	//);
	console.log(retObj);
	return retObj;
};
URLManagement.prototype.getTempSoftwareData = function(){
	var releaseObject = {};
	releaseObject["EHS 6.0-5 (El Dorado)"] = 68;
	releaseObject["Enablon 7.0 (Alberta)"] = 91;
	releaseObject["Enablon 7.10 (Ithor)"] = 135;
	releaseObject["Enablon 7.2 (Brittany)"] = 87;
	releaseObject["Enablon 7.5 (Colorado/Dagobah)"] = 97;
	releaseObject["Enablon 7.6 (Endor)"] = 98;
	releaseObject["Enablon 7.7 (Felucia)"] = 118;
	releaseObject["Enablon 7.8 (Gotham)"] = 127;
	releaseObject["Enablon 7.9 (Hoth)"] = 133;
	releaseObject["Enablon 8.0"] = 134;
	releaseObject["Enablon 8.1"] = 182;
	releaseObject["Enablon 8.2"] = 183;
	releaseObject["Enablon 8.x (Candidate Backlog for next minor of 8)"] = 113;
	releaseObject["Enablon X.x (Long-Term Backlog)"] = 86;
	//localStorage.setItem("releases", JSON.stringify(releaseObject))

	var prodCompObject = {};
	prodCompObject[2191]={code:"CW", name:"ChromeWare", path:"Corporate"};
	prodCompObject[1]={code:"CR", name:"CR - Corporate Responsibility", path:"Obso"};
	prodCompObject[2]={code:"EHS_HO", name:"Portail (Integration EHS)", path:"Obso > EHS"};
	prodCompObject[3]={code:"SD_", name:"SD - Sustainable Development", path:"EP_before 7.0"};
	prodCompObject[4]={code:"EMS_", name:"EMS - Event Management System", path:"EP_before 7.0"};
	prodCompObject[5]={code:"ACS_", name:"ACS - Audit & Compliance System", path:"EP_before 7.0"};
	prodCompObject[6]={code:"EHS_AP", name:"Action Plan (Integration EHS)", path:"Obso > EHS"};
	prodCompObject[7]={code:"ACS_CORE", name:"Coeur", path:"EP_before 7.0 > ACS_"};
	prodCompObject[8]={code:"Audit", name:"Audit Process Management", path:"EP_before 7.0 > ACS_"};
	prodCompObject[9]={code:"F57", name:"Framework & 5.7", path:"EP_before 7.0 > ACS_"};
	prodCompObject[10]={code:"ACS_CA", name:"Cause Analysis", path:"EP_before 7.0 > ACS_"};
	prodCompObject[11]={code:"Skills", name:"Skills", path:"EP_before 7.0 > ACS_"};
	prodCompObject[12]={code:"INSP", name:"Inspection Management", path:"EP_before 7.0 > EMS_"};
	prodCompObject[13]={code:"ACS_AP", name:"Action Plans", path:"EP_before 7.0 > ACS_"};
	prodCompObject[14]={code:"ACS_DOC", name:"Documentation", path:"EP_before 7.0 > ACS_"};
	prodCompObject[15]={code:"ACS_Auditor", name:"Auditors Management", path:"EP_before 7.0 > ACS_"};
	prodCompObject[16]={code:"PYPKG", name:"PY - Insurance Policy management", path:"EP_before 7.0"};
	prodCompObject[17]={code:"Obso", name:"Obsolete", path:"<Top>"};
	prodCompObject[18]={code:"WizFrame", name:"FW - WizFrame", path:"EP_before 7.0"};
	prodCompObject[19]={code:"HO_", name:"HO - Portal", path:"EP_before 7.0"};
	prodCompObject[20]={code:"AP_", name:"AP - Action Plans", path:"EP_before 7.0"};
	prodCompObject[21]={code:"JSAJHA", name:"JSA JHA", path:"EP_before 7.0 > EMS_"};
	prodCompObject[22]={code:"CTM", name:"Compliance Task Management", path:"EP_before 7.0 > EMS_"};
	prodCompObject[23]={code:"Events", name:"Events", path:"EP_before 7.0 > EMS_"};
	prodCompObject[24]={code:"LegFo", name:"Legal Forms", path:"EP_before 7.0 > EMS_"};
	prodCompObject[25]={code:"OH", name:"Occupation Health", path:"EP_before 7.0 > EMS_"};
	prodCompObject[26]={code:"IH", name:"Industrial Hygiene", path:"EP_before 7.0 > EMS_"};
	prodCompObject[27]={code:"WMS-EMS", name:"WMS - Waste", path:"EP_before 7.0 > EMS_"};
	prodCompObject[28]={code:"COEUR", name:"Coeur", path:"EP_before 7.0 > EMS_"};
	prodCompObject[29]={code:"FRM57", name:"FrameWork & 5.7", path:"EP_before 7.0 > EMS_"};
	prodCompObject[30]={code:"ERM_Int", name:"ERM Integration", path:"Obso"};
	prodCompObject[32]={code:"RM_", name:"RM - Risk Management", path:"EP_before 7.0"};
	prodCompObject[33]={code:"IC_", name:"IC - Internal Control", path:"EP_before 7.0"};
	prodCompObject[34]={code:"CA_", name:"CA - Continuous Assessment", path:"EP_before 7.0"};
	prodCompObject[35]={code:"IA_", name:"IA - Internal Audit", path:"EP_before 7.0"};
	prodCompObject[36]={code:"modSD_AP", name:"Action Plans (only scope with portal)", path:"EP_before 7.0 > SD_"};
	prodCompObject[37]={code:"zSD_Core", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[38]={code:"SD_CfSuite", name:"Conformité Suite", path:"EP_before 7.0 > SD_"};
	prodCompObject[39]={code:"zSD_Fw", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[40]={code:"SD/ECM_GHG", name:"GHG Module", path:"EP_before 7.0 > SD_"};
	prodCompObject[41]={code:"zmod_IDM", name:"To Delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[42]={code:"modSD_SH", name:"Stakeholders (Not Relased Yet)", path:"EP_before 7.0 > SD_"};
	prodCompObject[43]={code:"SD_RPT", name:"z_Reports & Dashboard", path:"EP_before 7.0 > SD_"};
	prodCompObject[44]={code:"modSD_Offline", name:"Offline Excel", path:"EP_before 7.0 > SD_"};
	prodCompObject[45]={code:"Portail", name:"Portail", path:"Obso > EHS > EHS_HO"};
	prodCompObject[46]={code:"EMS_EvRC", name:"Evaluation Risque Chimique", path:"EP_before 7.0 > EMS_"};
	prodCompObject[47]={code:"FDS", name:"MSDS", path:"EP_before 7.0 > EMS_"};
	prodCompObject[48]={code:"IC_TRA", name:"Transverse", path:"EP_before 7.0 > IC_"};
	prodCompObject[49]={code:"2", name:"Synchro", path:"EP_before 7.0 > IC_"};
	prodCompObject[50]={code:"IC_REF", name:"Référentiels", path:"EP_before 7.0 > IC_"};
	prodCompObject[51]={code:"4", name:"Campagnes", path:"EP_before 7.0 > IC_"};
	prodCompObject[52]={code:"5", name:"Input Data", path:"EP_before 7.0 > IC_"};
	prodCompObject[53]={code:"6", name:"Offline", path:"EP_before 7.0 > IC_"};
	prodCompObject[54]={code:"7", name:"Plans d'action", path:"EP_before 7.0 > IC_"};
	prodCompObject[55]={code:"8", name:"Feuilles de test", path:"EP_before 7.0 > IC_"};
	prodCompObject[56]={code:"9", name:"Alertes", path:"EP_before 7.0 > IC_"};
	prodCompObject[57]={code:"IC_REP", name:"Reporting", path:"EP_before 7.0 > IC_"};
	prodCompObject[58]={code:"IC_DOC", name:"Documentation", path:"EP_before 7.0 > IC_"};
	prodCompObject[59]={code:"IC_TES", name:"Testing", path:"EP_before 7.0 > IC_"};
	prodCompObject[60]={code:"13", name:"Control delegations", path:"EP_before 7.0 > IC_"};
	prodCompObject[61]={code:"IC_ITGOV", name:"IT Gov", path:"EP_before 7.0 > IC_"};
	prodCompObject[62]={code:"15", name:"Non conformités", path:"EP_before 7.0 > IC_"};
	prodCompObject[63]={code:"IC_PAR", name:"Partage d'informations", path:"EP_before 7.0 > IC_"};
	prodCompObject[65]={code:"BCM_", name:"BCM - Business Continuity Management", path:"EP_before 7.0"};
	prodCompObject[66]={code:"BPM", name:"BPM - Business Process Management", path:"Obso"};
	prodCompObject[67]={code:"AMF", name:"AMF", path:"EP_before 7.0 > IC_"};
	prodCompObject[68]={code:"IA.3", name:"Plan pluriannuel", path:"EP_before 7.0 > IA_"};
	prodCompObject[69]={code:"PA", name:"Plan d'audit (annuel)", path:"EP_before 7.0 > IA_"};
	prodCompObject[70]={code:"MI", name:"Définition des missions", path:"EP_before 7.0 > IA_"};
	prodCompObject[71]={code:"RECO", name:"Suivi des recommandations", path:"EP_before 7.0 > IA_"};
	prodCompObject[73]={code:"COMP", name:"Gestion des compétences", path:"EP_before 7.0 > IA_"};
	prodCompObject[74]={code:"ACTIV", name:"Suivi d'activités (agenda, activités, Gantt, TS, expense)", path:"EP_before 7.0 > IA_"};
	prodCompObject[75]={code:"GANTT", name:"Gantt", path:"EP_before 7.0 > IA_"};
	prodCompObject[76]={code:"TASK", name:"Tâches d'une mission", path:"EP_before 7.0 > IA_"};
	prodCompObject[77]={code:"PT", name:"Programme du travail", path:"EP_before 7.0 > IA_"};
	prodCompObject[78]={code:"FT", name:"Feuilles de travail", path:"EP_before 7.0 > IA_"};
	prodCompObject[79]={code:"PC", name:"Points clés", path:"EP_before 7.0 > IA_"};
	prodCompObject[80]={code:"REC", name:"Recommandations", path:"EP_before 7.0 > IA_"};
	prodCompObject[81]={code:"QUEST", name:"Questionnaires", path:"EP_before 7.0 > IA_"};
	prodCompObject[82]={code:"TRA", name:"Transverse", path:"EP_before 7.0 > IA_"};
	prodCompObject[83]={code:"SYNCHRO", name:"Synchronisation Offline", path:"EP_before 7.0 > IA_"};
	prodCompObject[84]={code:"ALERT", name:"Alertes", path:"EP_before 7.0 > IA_"};
	prodCompObject[85]={code:"RAPPORT", name:"Rapport d'audit", path:"EP_before 7.0 > IA_"};
	prodCompObject[86]={code:"REPORT", name:"Reporting", path:"EP_before 7.0 > IA_"};
	prodCompObject[88]={code:"IA_REF", name:"Référentiels", path:"EP_before 7.0 > IA_"};
	prodCompObject[89]={code:"ARCHIV", name:"Archivage des travaux d'audit", path:"EP_before 7.0 > IA_"};
	prodCompObject[90]={code:"INFOS", name:"Partage d'informations", path:"EP_before 7.0 > IA_"};
	prodCompObject[91]={code:"WF", name:"WF", path:"EP_before 7.0 > IA_"};
	prodCompObject[94]={code:"Batch", name:"xDisplayBatches", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[95]={code:"Switch", name:"xDisplaySwitches", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[96]={code:"FW_CST", name:"xDisplayConstants", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[97]={code:"Menu", name:"Constants and Functions for Menus & Ergonomy", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[98]={code:"Tpl", name:"Templates", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[99]={code:"Histo", name:"Historization Functions", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[100]={code:"EHS_DC", name:"Document Control", path:"Obso > EHS > EHS_HO"};
	prodCompObject[101]={code:"OII", name:"Occupational Injury and Illness", path:"EP_before 7.0 > EMS_"};
	prodCompObject[102]={code:"CA_MS", name:"Multi source", path:"EP_before 7.0 > CA_"};
	prodCompObject[103]={code:"DC", name:"Doc Control", path:"EP_before 7.0 > HO_"};
	prodCompObject[104]={code:"ERM_REF", name:"Référentiels", path:"Obso > ERM Suite"};
	prodCompObject[105]={code:"ERM_UTI", name:"Gestion des utilisateurs", path:"Obso > ERM Suite"};
	prodCompObject[106]={code:"LGA", name:"Langues", path:"Obso > ERM Suite"};
	prodCompObject[107]={code:"ERM_REP", name:"Reporting", path:"Obso > ERM Suite"};
	prodCompObject[108]={code:"ERM_SET", name:"Settings", path:"Obso > ERM Suite"};
	prodCompObject[109]={code:"HO_SET", name:"Settings", path:"EP_before 7.0 > HO_"};
	prodCompObject[110]={code:"HO_REF", name:"Référentiels", path:"EP_before 7.0 > HO_"};
	prodCompObject[111]={code:"HO_TES", name:"Testing", path:"EP_before 7.0 > HO_"};
	prodCompObject[112]={code:"HO_ANA", name:"Analyse", path:"EP_before 7.0 > HO_"};
	prodCompObject[113]={code:"HO_DOC", name:"Documentation", path:"EP_before 7.0 > HO_"};
	prodCompObject[114]={code:"HO_PAR", name:"Partage d'informations", path:"EP_before 7.0 > HO_"};
	prodCompObject[115]={code:"HO.02_old", name:"HO - 2 - User Roles", path:"EP_before 7.0 > HO_"};
	prodCompObject[116]={code:"ERM_IAP", name:"Intégration WizPA", path:"Obso > ERM Suite"};
	prodCompObject[117]={code:"ERM_IHO", name:"Intégration WizHO", path:"Obso > ERM Suite"};
	prodCompObject[118]={code:"CAL", name:"Calendar", path:"Obso > EHS > EHS_HO"};
	prodCompObject[119]={code:"CD", name:"Company Directory", path:"Obso > EHS > EHS_HO"};
	prodCompObject[120]={code:"PROF*", name:"PROF - Proficiency", path:"EP_before 7.0"};
	prodCompObject[122]={code:"HO_REP", name:"Reporting", path:"EP_before 7.0 > HO_"};
	prodCompObject[125]={code:"ERM_DOC", name:"Documentation", path:"Obso > ERM Suite"};
	prodCompObject[126]={code:"AP.03_old", name:"Global Action Plans", path:"EP_before 7.0 > AP_"};
	prodCompObject[127]={code:"WW", name:"Water", path:"EP_before 7.0 > EMS_"};
	prodCompObject[128]={code:"JSAJHA2", name:"JSA JHA Version 2", path:"EP_before 7.0 > EMS_"};
	prodCompObject[129]={code:"AQS_", name:"AQS - Air Quality System", path:"EP_before 7.0"};
	prodCompObject[130]={code:"SOURCE", name:"Emission Source Modeling", path:"EP_before 7.0 > AQS_"};
	prodCompObject[131]={code:"CALC", name:"Calculation Library", path:"EP_before 7.0 > AQS_"};
	prodCompObject[132]={code:"FOREC", name:"AQS Forecasting", path:"EP_before 7.0 > AQS_"};
	prodCompObject[133]={code:"SCEN", name:"Scenario Analysis", path:"EP_before 7.0 > AQS_"};
	prodCompObject[134]={code:"Allowances", name:"Allowance Management", path:"EP_before 7.0 > AQS_"};
	prodCompObject[135]={code:"CMS_", name:"CMS - Chemical Management System", path:"EP_before 7.0"};
	prodCompObject[136]={code:"MoCh", name:"MoC - Management of Change", path:"EP_before 7.0"};
	prodCompObject[137]={code:"ENVA", name:"Env. Analysis", path:"EP_before 7.0 > EMS_"};
	prodCompObject[138]={code:"EQUIP", name:"Equipment Management", path:"EP_before 7.0 > EMS_"};
	prodCompObject[139]={code:"FDS2", name:"MSDS Full", path:"EP_before 7.0 > EMS_"};
	prodCompObject[140]={code:"PERMv1", name:"Permit Management (v1)", path:"EP_before 7.0 > EMS_"};
	prodCompObject[141]={code:"Eve1", name:"Incident tracking", path:"EP_before 7.0 > EMS_ > Events"};
	prodCompObject[142]={code:"Eve2", name:"Reg. Inspections", path:"EP_before 7.0 > EMS_ > Events"};
	prodCompObject[143]={code:"Eve3", name:"Investigation management", path:"EP_before 7.0 > EMS_ > Events"};
	prodCompObject[144]={code:"Eve4", name:"Cause analysis", path:"EP_before 7.0 > EMS_ > Events"};
	prodCompObject[146]={code:"BPM_ANA", name:"Analyse", path:"Obso > BPM"};
	prodCompObject[147]={code:"BPM_DOC", name:"Documentation", path:"Obso > BPM"};
	prodCompObject[148]={code:"BPM_REF", name:"Référentiels", path:"Obso > BPM"};
	prodCompObject[149]={code:"BPM_REP", name:"Reporting", path:"Obso > BPM"};
	prodCompObject[150]={code:"BPM_SET", name:"Settings", path:"Obso > BPM"};
	prodCompObject[151]={code:"BPM_TES", name:"Testing", path:"Obso > BPM"};
	prodCompObject[152]={code:"BPM_UTI", name:"Gestion des utilisateurs", path:"Obso > BPM"};
	prodCompObject[153]={code:"BPM_MOD", name:"Modules", path:"Obso > BPM"};
	prodCompObject[154]={code:"HO_MOD", name:"Modules", path:"EP_before 7.0 > HO_"};
	prodCompObject[155]={code:"BPM_TRA", name:"Transverse", path:"Obso > BPM"};
	prodCompObject[156]={code:"BPM_PAR", name:"Partage d'informations", path:"Obso > BPM"};
	prodCompObject[157]={code:"RM_ANA", name:"[Obsolete] - Analyse", path:"EP_before 7.0 > RM_"};
	prodCompObject[158]={code:"RM_DOC", name:"[Obsolete] - Documentation", path:"EP_before 7.0 > RM_"};
	prodCompObject[159]={code:"RM_MOD", name:"[Obsolete] - Modules", path:"EP_before 7.0 > RM_"};
	prodCompObject[160]={code:"RM_PAR", name:"[Obsolete] - Partage d'informations", path:"EP_before 7.0 > RM_"};
	prodCompObject[161]={code:"RM_REF", name:"[Obsolete] - Référentiels", path:"EP_before 7.0 > RM_"};
	prodCompObject[162]={code:"RM.08_", name:"Reporting", path:"EP_before 7.0 > RM_"};
	prodCompObject[163]={code:"RM_SET", name:"[Obsolete] - Settings", path:"EP_before 7.0 > RM_"};
	prodCompObject[164]={code:"RM_TES", name:"[Obsolete] - Testing", path:"EP_before 7.0 > RM_"};
	prodCompObject[165]={code:"RM_TRA", name:"[Obsolete] - Transverse", path:"EP_before 7.0 > RM_"};
	prodCompObject[166]={code:"RM_UTI", name:"[Obsolete] - Gestion des utilisateurs", path:"EP_before 7.0 > RM_"};
	prodCompObject[167]={code:"CA_ANA", name:"Analyse", path:"EP_before 7.0 > CA_"};
	prodCompObject[168]={code:"CA_DOC", name:"Documentation", path:"EP_before 7.0 > CA_"};
	prodCompObject[169]={code:"CA_MOD", name:"Modules", path:"EP_before 7.0 > CA_"};
	prodCompObject[170]={code:"CA_PAR", name:"Partage d'informations", path:"EP_before 7.0 > CA_"};
	prodCompObject[171]={code:"CA_REF", name:"Référentiels", path:"EP_before 7.0 > CA_"};
	prodCompObject[172]={code:"CA_REP", name:"Reporting", path:"EP_before 7.0 > CA_"};
	prodCompObject[173]={code:"CA_SET", name:"Settings", path:"EP_before 7.0 > CA_"};
	prodCompObject[174]={code:"CA_TES", name:"Testing", path:"EP_before 7.0 > CA_"};
	prodCompObject[175]={code:"CA_TRA", name:"Transverse", path:"EP_before 7.0 > CA_"};
	prodCompObject[176]={code:"CA_UTI", name:"Gestion des utilisateurs", path:"EP_before 7.0 > CA_"};
	prodCompObject[177]={code:"BPM_BUI", name:"Builder Access", path:"Obso > BPM"};
	prodCompObject[178]={code:"CA_BUI", name:"Builder Access", path:"EP_before 7.0 > CA_"};
	prodCompObject[179]={code:"RM_BUI", name:"[Obsolete] - Builder Access", path:"EP_before 7.0 > RM_"};
	prodCompObject[180]={code:"BCM_ANA", name:"Analyse", path:"EP_before 7.0 > BCM_"};
	prodCompObject[181]={code:"BCM_BUI", name:"Builder Access", path:"EP_before 7.0 > BCM_"};
	prodCompObject[182]={code:"BCM_DOC", name:"Documentation", path:"EP_before 7.0 > BCM_"};
	prodCompObject[183]={code:"BCM_MOD", name:"Modules", path:"EP_before 7.0 > BCM_"};
	prodCompObject[184]={code:"BCM_PAR", name:"Partage d'informations", path:"EP_before 7.0 > BCM_"};
	prodCompObject[185]={code:"BCM_REF", name:"Référentiels", path:"EP_before 7.0 > BCM_"};
	prodCompObject[186]={code:"BCM.04", name:"Dashboard & Reporting", path:"EP_before 7.0 > BCM_"};
	prodCompObject[187]={code:"BCM_SET", name:"Settings", path:"EP_before 7.0 > BCM_"};
	prodCompObject[188]={code:"BCM_TES", name:"Testing", path:"EP_before 7.0 > BCM_"};
	prodCompObject[189]={code:"BCM_TRA", name:"Transverse", path:"EP_before 7.0 > BCM_"};
	prodCompObject[190]={code:"BCM_UTI", name:"Gestion des utilisateurs", path:"EP_before 7.0 > BCM_"};
	prodCompObject[191]={code:"CBI", name:"CBI - Competitive & Business Intelligence", path:"Obso"};
	prodCompObject[192]={code:"CBI_ANA", name:"Analyse", path:"Obso > CBI"};
	prodCompObject[193]={code:"CBI_BUI", name:"Builder Access", path:"Obso > CBI"};
	prodCompObject[194]={code:"CBI_DOC", name:"Documentation", path:"Obso > CBI"};
	prodCompObject[195]={code:"CBI_MOD", name:"Modules", path:"Obso > CBI"};
	prodCompObject[196]={code:"CBI_PAR", name:"Partage d'informations", path:"Obso > CBI"};
	prodCompObject[197]={code:"CBI_REF", name:"Référentiels", path:"Obso > CBI"};
	prodCompObject[198]={code:"CBI_REP", name:"Reporting", path:"Obso > CBI"};
	prodCompObject[199]={code:"CBI_SET", name:"Settings", path:"Obso > CBI"};
	prodCompObject[200]={code:"CBI_TES", name:"Testing", path:"Obso > CBI"};
	prodCompObject[201]={code:"CBI_TRA", name:"Transverse", path:"Obso > CBI"};
	prodCompObject[202]={code:"CBI_UTI", name:"Gestion des utilisateurs", path:"Obso > CBI"};
	prodCompObject[203]={code:"AML", name:"AML - Anti Money Laundering", path:"Obso"};
	prodCompObject[204]={code:"AML_ANA", name:"Analyse", path:"Obso > AML"};
	prodCompObject[205]={code:"AML_BUI", name:"Builder Access", path:"Obso > AML"};
	prodCompObject[206]={code:"AML_DOC", name:"Documentation", path:"Obso > AML"};
	prodCompObject[207]={code:"AML_MOD", name:"Modules", path:"Obso > AML"};
	prodCompObject[208]={code:"AML_PAR", name:"Partage d'informations", path:"Obso > AML"};
	prodCompObject[209]={code:"AML_REF", name:"Référentiels", path:"Obso > AML"};
	prodCompObject[210]={code:"AML_REP", name:"Reporting", path:"Obso > AML"};
	prodCompObject[211]={code:"AML_SET", name:"Settings", path:"Obso > AML"};
	prodCompObject[212]={code:"AML_TES", name:"Testing", path:"Obso > AML"};
	prodCompObject[213]={code:"AML_TRA", name:"Transverse", path:"Obso > AML"};
	prodCompObject[214]={code:"AML_UTI", name:"Gestion des utilisateurs", path:"Obso > AML"};
	prodCompObject[215]={code:"IC_UTI", name:"Gestion des utilisateurs", path:"EP_before 7.0 > IC_"};
	prodCompObject[216]={code:"CBI_INT", name:"Integration ERM", path:"Obso > CBI"};
	prodCompObject[217]={code:"CA_INT", name:"Integration ERM", path:"EP_before 7.0 > CA_"};
	prodCompObject[218]={code:"BPM_INT", name:"Integration ERM", path:"Obso > BPM"};
	prodCompObject[219]={code:"BCM_INT", name:"Integration ERM", path:"EP_before 7.0 > BCM_"};
	prodCompObject[220]={code:"AML_INT", name:"Integration ERM", path:"Obso > AML"};
	prodCompObject[221]={code:"IC_INT", name:"Integration ERM", path:"EP_before 7.0 > IC_"};
	prodCompObject[223]={code:"IC_MOD", name:"Modules", path:"EP_before 7.0 > IC_"};
	prodCompObject[224]={code:"IC_BUI", name:"Builder Access", path:"EP_before 7.0 > IC_"};
	prodCompObject[225]={code:"ITG", name:"z_ITG - IT Governance", path:"Obso"};
	prodCompObject[226]={code:"ITG_ANA", name:"Analyse", path:"Obso > ITG"};
	prodCompObject[227]={code:"ITG_BUI", name:"Builder Access", path:"Obso > ITG"};
	prodCompObject[228]={code:"ITG_DOC", name:"Documentation", path:"Obso > ITG"};
	prodCompObject[229]={code:"ITG_INT", name:"Integration ERM", path:"Obso > ITG"};
	prodCompObject[230]={code:"ITG_MOD", name:"Modules", path:"Obso > ITG"};
	prodCompObject[231]={code:"ITG_PAR", name:"Partage d'informations", path:"Obso > ITG"};
	prodCompObject[232]={code:"ITG_REF", name:"Référentiels", path:"Obso > ITG"};
	prodCompObject[233]={code:"ITG_REP", name:"Reporting", path:"Obso > ITG"};
	prodCompObject[234]={code:"ITG_SET", name:"Settings", path:"Obso > ITG"};
	prodCompObject[235]={code:"ITG_TES", name:"Testing", path:"Obso > ITG"};
	prodCompObject[236]={code:"ITG_TRA", name:"Transverse", path:"Obso > ITG"};
	prodCompObject[237]={code:"ITG_UTI", name:"Gestion des utilisateurs", path:"Obso > ITG"};
	prodCompObject[238]={code:"IA_TES", name:"Testing", path:"EP_before 7.0 > IA_"};
	prodCompObject[239]={code:"IA_CS", name:"Catalogue Service", path:"EP_before 7.0 > IA_"};
	prodCompObject[240]={code:"CA_CS", name:"Catalogue Service", path:"EP_before 7.0 > CA_"};
	prodCompObject[241]={code:"AML_CS", name:"Catalogue Service", path:"Obso > AML"};
	prodCompObject[242]={code:"BCM_CS", name:"Catalogue Service", path:"EP_before 7.0 > BCM_"};
	prodCompObject[243]={code:"BPM_CS", name:"Catalogue Service", path:"Obso > BPM"};
	prodCompObject[244]={code:"CBI_CS", name:"Catalogue Service", path:"Obso > CBI"};
	prodCompObject[245]={code:"IC_CS", name:"Catalogue Service", path:"EP_before 7.0 > IC_"};
	prodCompObject[246]={code:"ITG_CS", name:"Catalogue Service", path:"Obso > ITG"};
	prodCompObject[248]={code:"IC_FOR", name:"Formation", path:"EP_before 7.0 > IC_"};
	prodCompObject[249]={code:"modSD_SR", name:"Social Reporting", path:"EP_before 7.0 > SD_"};
	prodCompObject[250]={code:"modSD_WP", name:"Web Publication", path:"EP_before 7.0 > SD_"};
	prodCompObject[251]={code:"DASH", name:"Dashboards", path:"EP_before 7.0 > EMS_"};
	prodCompObject[252]={code:"EvRE", name:"Env. Risk Assessment", path:"EP_before 7.0 > EMS_"};
	prodCompObject[253]={code:"EXP", name:"Exposure Risk Assessment", path:"EP_before 7.0 > EMS_"};
	prodCompObject[254]={code:"CONC", name:"Concerns Reporting", path:"EP_before 7.0 > EMS_"};
	prodCompObject[255]={code:"BBS", name:"BBS - Behaviour Based Safety", path:"EP_before 7.0 > EMS_"};
	prodCompObject[256]={code:"CNSA", name:"Contractor Safety", path:"EP_before 7.0 > EMS_"};
	prodCompObject[257]={code:"ERGO", name:"Ergonomics analysis", path:"EP_before 7.0 > EMS_"};
	prodCompObject[258]={code:"EHS_BCM", name:"Crisis management", path:"Obso > EHS"};
	prodCompObject[259]={code:"GHGINT", name:"Database Interfaces", path:"EP_before 7.0 > AQS_"};
	prodCompObject[260]={code:"z_FMSDS", name:"z_Full MSDS Generation", path:"EP_before 7.0 > CMS_"};
	prodCompObject[261]={code:"CMS.07_", name:"Safety Data Sheets (MSDS Management)", path:"EP_before 7.0 > CMS_"};
	prodCompObject[262]={code:"z_CHEMINV", name:"z_Chemical Inventory", path:"EP_before 7.0 > CMS_"};
	prodCompObject[263]={code:"z_CMS_EVRC", name:"z_CMS - Chemical Risk Assessment", path:"EP_before 7.0 > CMS_"};
	prodCompObject[264]={code:"z_PRODCOMP", name:"z_Chemical Product Composition", path:"EP_before 7.0 > CMS_"};
	prodCompObject[265]={code:"z_REGL", name:"z_Conformité réglementaire", path:"EP_before 7.0 > CMS_"};
	prodCompObject[266]={code:"CMS.18_", name:"REACH Compliance (Enregistrement REACh)", path:"EP_before 7.0 > CMS_"};
	prodCompObject[267]={code:"modSD_Vol", name:"Volunteering (Not Relased Yet)", path:"EP_before 7.0 > SD_"};
	prodCompObject[268]={code:"zSD_Testing", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[269]={code:"EMS_TEST", name:"Testing", path:"EP_before 7.0 > EMS_"};
	prodCompObject[270]={code:"ACS_Cont", name:"Content", path:"EP_before 7.0 > ACS_"};
	prodCompObject[272]={code:"ASEC", name:"Application Server Enablon Connect", path:"R&D AS"};
	prodCompObject[273]={code:"Builder", name:"Application Builder", path:"R&D AS > ASEC"};
	prodCompObject[274]={code:"Kernel", name:"Kernel", path:"R&D AS > ASEC"};
	prodCompObject[275]={code:"Reports & Dashboard", name:"Reports & Dashboard", path:"R&D AS > ASEC"};
	prodCompObject[276]={code:"Security", name:"Security", path:"R&D AS > ASEC > Architecture"};
	prodCompObject[277]={code:"Outils", name:"Tools", path:"R&D AS > ASEC"};
	prodCompObject[278]={code:"SD/ECM_D_BP", name:"Best Practices (Not Relased Yet)", path:"EP_before 7.0 > SD_"};
	prodCompObject[279]={code:"zDA", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[280]={code:"Modules", name:"Modules / Packages / Bundles", path:"R&D AS > ASEC > Builder"};
	prodCompObject[281]={code:"RM_WF", name:"[Obsolete] - Workflow", path:"EP_before 7.0 > RM_"};
	prodCompObject[282]={code:"ERM_TES", name:"Testing", path:"Obso > ERM Suite"};
	prodCompObject[283]={code:"ERM_MOD", name:"Modules", path:"Obso > ERM Suite"};
	prodCompObject[284]={code:"CG", name:"CG - Corporate Governance", path:"CGv"};
	prodCompObject[285]={code:"CM", name:"CM - Corporate Management", path:"CGv"};
	prodCompObject[286]={code:"NRE", name:"Gestion des mandats", path:"CGv > CM"};
	prodCompObject[287]={code:"SIG", name:"Maps manager", path:"Obso > EHS > EHS_HO"};
	prodCompObject[288]={code:"Wizness", name:"Shared platforms", path:"<Top>"};
	prodCompObject[289]={code:"Wiz.com - WS", name:"Wizness.com - Website", path:"Wizness"};
	prodCompObject[290]={code:"SkinLib", name:"SkinLib", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[291]={code:"ITG_CMP", name:"Campagnes", path:"Obso > ITG"};
	prodCompObject[292]={code:"ITG_CTB", name:"Contribution", path:"Obso > ITG"};
	prodCompObject[293]={code:"Forum", name:"Forum", path:"Wizness > Wiz.com - WS"};
	prodCompObject[294]={code:"News", name:"News", path:"Wizness > Wiz.com - WS"};
	prodCompObject[295]={code:"GRP", name:"Groups/Communities", path:"Wizness > Wiz.com - WS"};
	prodCompObject[296]={code:"EVT", name:"Events", path:"Wizness > Wiz.com - WS"};
	prodCompObject[297]={code:"FWK", name:"Framework", path:"Wizness > Wiz.com - WS"};
	prodCompObject[298]={code:"SREG", name:"Self-Registration", path:"Wizness > Wiz.com - WS > FWK"};
	prodCompObject[299]={code:"MH", name:"Menu & Header", path:"Wizness > Wiz.com - WS > FWK"};
	prodCompObject[300]={code:"Wic", name:"WizIc", path:"Wizness > Wiz.com - WS > FWK"};
	prodCompObject[301]={code:"zSD_Erg", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[302]={code:"zSD_Camp", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[304]={code:"zSD_Ind", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[305]={code:"SD_Obj", name:"Objective Management", path:"EP_before 7.0 > SD_"};
	prodCompObject[306]={code:"zSD_al", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[307]={code:"SD/ECM_For", name:"Scenario Analysis", path:"EP_before 7.0 > SD_"};
	prodCompObject[308]={code:"FDB", name:"Feedback", path:"Wizness > Wiz.com - WS"};
	prodCompObject[309]={code:"GXP", name:"GXP Standard", path:"Wizness"};
	prodCompObject[310]={code:"GXP.03", name:"Users & Contacts Management Module", path:"Wizness > GXP"};
	prodCompObject[311]={code:"GXP.04", name:"Audit Management Module", path:"Wizness > GXP"};
	prodCompObject[312]={code:"GXP.05", name:"Assessment questionnaire module", path:"Wizness > GXP"};
	prodCompObject[313]={code:"GXP.06", name:"Trading Relationships Module / Extended Supply Chain Module", path:"Wizness > GXP"};
	prodCompObject[314]={code:"GXP.07", name:"Statistical Reports Module", path:"Wizness > GXP"};
	prodCompObject[315]={code:"GXP.08", name:"Risk Calculator Module", path:"Wizness > GXP"};
	prodCompObject[316]={code:"GXP.09", name:"Public Website Management Module", path:"Wizness > GXP"};
	prodCompObject[317]={code:"GXP.02", name:"GXP Solution", path:"Wizness > GXP"};
	prodCompObject[318]={code:"GXP.01", name:"Technical", path:"Wizness > GXP"};
	prodCompObject[319]={code:"GXP.10", name:"Alerts Management Module", path:"Wizness > GXP"};
	prodCompObject[320]={code:"GXP.11", name:"Performane Metrics Collection Module", path:"Wizness > GXP"};
	prodCompObject[321]={code:"Rconc", name:"Concentration du besoin", path:"Obso"};
	prodCompObject[322]={code:"BR6.0", name:"Besoins rapports pour socle 6.0", path:"Obso > Rconc"};
	prodCompObject[323]={code:"GXP.12", name:"Document Management Module", path:"Wizness > GXP"};
	prodCompObject[324]={code:"ERM_ER", name:"Ergonomy", path:"Obso > ERM Suite"};
	prodCompObject[325]={code:"QRA", name:"QRA - Quantitative Risk Assessment", path:"Obso"};
	prodCompObject[326]={code:"QRA_AN", name:"Analysis", path:"Obso > QRA"};
	prodCompObject[327]={code:"MyE_TES", name:"Testing", path:"Wizness > Wiz.com - WS"};
	prodCompObject[328]={code:"PCM", name:"z_PCM - Policy & Compliance Management", path:"Obso"};
	prodCompObject[329]={code:"PCM_RP", name:"Rules & Policy", path:"Obso > PCM"};
	prodCompObject[330]={code:"PCM_WB", name:"Whistleblowing", path:"Obso > PCM"};
	prodCompObject[331]={code:"PCM_INV", name:"Investigations", path:"Obso > PCM"};
	prodCompObject[332]={code:"PCM_HD", name:"Helpdesk", path:"Obso > PCM"};
	prodCompObject[333]={code:"PCM_COM", name:"Communication", path:"Obso > PCM"};
	prodCompObject[334]={code:"PCM_ANA", name:"Analysis", path:"Obso > PCM"};
	prodCompObject[335]={code:"PCM_TES", name:"Testing", path:"Obso > PCM"};
	prodCompObject[336]={code:"PCM_DOC", name:"Documentation", path:"Obso > PCM"};
	prodCompObject[337]={code:"PCM_ERM", name:"Suite integration", path:"Obso > PCM"};
	prodCompObject[338]={code:"zSD_Quest", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[339]={code:"SD/ECM_SP", name:"Sustainability Projects", path:"EP_before 7.0 > SD_"};
	prodCompObject[340]={code:"SD/ECM__C&T", name:"Cap and trade  (Not Relased Yet_Planned for 2012)", path:"EP_before 7.0 > SD_"};
	prodCompObject[343]={code:"modSD_calccarb", name:"Calculette Carbone (Not Relased Yet_Planned for 2012)", path:"EP_before 7.0 > SD_"};
	prodCompObject[344]={code:"LAND", name:"Land Management", path:"EP_before 7.0 > EMS_"};
	prodCompObject[345]={code:"CLA_", name:"CLA - Claims Management", path:"EP_before 7.0 > EMS_"};
	prodCompObject[346]={code:"IC_ANA", name:"Analysis", path:"EP_before 7.0 > IC_"};
	prodCompObject[347]={code:"IA_DOC", name:"Documentation", path:"EP_before 7.0 > IA_"};
	prodCompObject[348]={code:"IA_ANA", name:"Analyse", path:"EP_before 7.0 > IA_"};
	prodCompObject[349]={code:"RM_PRM", name:"[Obsolete] - Project Risk Management", path:"EP_before 7.0 > RM_"};
	prodCompObject[350]={code:"RAP", name:"Rapports", path:"EP_before 7.0 > ACS_"};
	prodCompObject[351]={code:"ACS_FIN", name:"Findings Tracking & Recommendation", path:"EP_before 7.0 > ACS_"};
	prodCompObject[352]={code:"ASM", name:"ASM - Authorization and Sign Management", path:"CGv"};
	prodCompObject[353]={code:"ASM.03", name:"Master Data", path:"CGv > ASM"};
	prodCompObject[354]={code:"ASM.06", name:"Power Management", path:"CGv > ASM"};
	prodCompObject[355]={code:"ASM.05", name:"Delegation Management", path:"CGv > ASM"};
	prodCompObject[356]={code:"ASM.01", name:"ASM Solution", path:"CGv > ASM"};
	prodCompObject[357]={code:"ASM.07", name:"Reporting", path:"CGv > ASM"};
	prodCompObject[358]={code:"Profil", name:"Profil", path:"Wizness > Wiz.com - WS"};
	prodCompObject[359]={code:"ICQ", name:"Questionnaires", path:"EP_before 7.0 > IC_"};
	prodCompObject[360]={code:"CON", name:"Contacts", path:"Wizness > Wiz.com - WS"};
	prodCompObject[362]={code:"Web", name:"Website", path:"Wizness > Wiz.com - WS"};
	prodCompObject[363]={code:"W2", name:"Waste 2", path:"EP_before 7.0 > EMS_"};
	prodCompObject[364]={code:"SD/ECM_CRC", name:"CRC (Not Relased Yet)", path:"EP_before 7.0 > SD_"};
	prodCompObject[365]={code:"WCM (obsolete)", name:"Website Content Management (obsolete)", path:"Wizness"};
	prodCompObject[366]={code:"WCM_PUB", name:"Publisher", path:"Wizness > WCM (obsolete)"};
	prodCompObject[367]={code:"CA_COE", name:"Coeur", path:"EP_before 7.0 > CA_"};
	prodCompObject[368]={code:"OTH", name:"Others", path:"Wizness > Wiz.com - WS"};
	prodCompObject[370]={code:"ACS_AS", name:"Audit Scheduler", path:"EP_before 7.0 > ACS_"};
	prodCompObject[371]={code:"RCM_", name:"RCM - Regulatory Compliance Management", path:"EP_before 7.0"};
	prodCompObject[373]={code:"EHS_DPT", name:"Departments", path:"Obso > EHS > EHS_HO"};
	prodCompObject[374]={code:"SD_MC", name:"Essential - Metrics Collection", path:"EP_before 7.0 > SD_"};
	prodCompObject[375]={code:"SD_MC1", name:"Indicator Management", path:"EP_before 7.0 > SD_ > SD_MC"};
	prodCompObject[376]={code:"SD_AMC", name:"Advanced - Metrics Collection", path:"EP_before 7.0 > SD_"};
	prodCompObject[377]={code:"SD_AMC1", name:"Advanced Indicator Management", path:"EP_before 7.0 > SD_ > SD_AMC"};
	prodCompObject[378]={code:"SD_MC2", name:"Input Form", path:"EP_before 7.0 > SD_ > SD_MC"};
	prodCompObject[379]={code:"SD_MC3", name:"Campaign Management", path:"EP_before 7.0 > SD_ > SD_MC"};
	prodCompObject[380]={code:"SD_AMC2", name:"Advanced Campaign Management", path:"EP_before 7.0 > SD_ > SD_AMC"};
	prodCompObject[381]={code:"SD_MC4", name:"Core", path:"EP_before 7.0 > SD_ > SD_MC"};
	prodCompObject[382]={code:"IS", name:"Information Sharing", path:"EP_before 7.0 > SD_"};
	prodCompObject[383]={code:"IS1", name:"Legal Register", path:"EP_before 7.0 > SD_ > IS"};
	prodCompObject[385]={code:"SWF", name:"Workflow Factory", path:"EP_before 7.0 > SD_"};
	prodCompObject[386]={code:"IDM1", name:"Gift", path:"EP_before 7.0 > SD_ > zmod_IDM"};
	prodCompObject[387]={code:"IDM2", name:"Volunteering", path:"EP_before 7.0 > SD_ > zmod_IDM"};
	prodCompObject[388]={code:"IDM3", name:"LBG Management", path:"EP_before 7.0 > SD_ > zmod_IDM"};
	prodCompObject[389]={code:"ASSET", name:"Asset Management", path:"Obso > EHS > EHS_HO"};
	prodCompObject[390]={code:"ECM", name:"ECM - To delete", path:"Obso"};
	prodCompObject[391]={code:"0GHG", name:"GHG Emissions Accounting", path:"Obso > ECM"};
	prodCompObject[392]={code:"1C&T", name:"Cap & Trade", path:"Obso > ECM"};
	prodCompObject[393]={code:"2UDM", name:"Utility Data Management", path:"Obso > ECM"};
	prodCompObject[394]={code:"3EE&C", name:"Energy Efficiency & Certification", path:"Obso > ECM"};
	prodCompObject[395]={code:"4ER", name:"External Reporting", path:"Obso > ECM"};
	prodCompObject[396]={code:"Content", name:"Content", path:"Obso > ECM"};
	prodCompObject[397]={code:"CO2B", name:"CO2 Benchmark®", path:"Obso > ECM > Content"};
	prodCompObject[398]={code:"5CC", name:"Carbon Calculator", path:"Obso > ECM"};
	prodCompObject[399]={code:"WCM_WIC", name:"WIZIC", path:"Wizness > WCM (obsolete)"};
	prodCompObject[400]={code:"WCM_NEW", name:"NEWS", path:"Wizness > WCM (obsolete)"};
	prodCompObject[401]={code:"WCM_DOC", name:"DOCUMENTS", path:"Wizness > WCM (obsolete)"};
	prodCompObject[402]={code:"WCM_EVT", name:"EVENTS", path:"Wizness > WCM (obsolete)"};
	prodCompObject[403]={code:"WCM_COR", name:"CORE DEVELOPMENTS", path:"Wizness > WCM (obsolete)"};
	prodCompObject[404]={code:"WCM_FOR", name:"FORUM", path:"Wizness > WCM (obsolete)"};
	prodCompObject[405]={code:"WCM_CSS", name:"CSS (Cascading Style Sheets)", path:"Wizness > WCM (obsolete)"};
	prodCompObject[406]={code:"RISK", name:"Risques", path:"EP_before 7.0 > IA_"};
	prodCompObject[407]={code:"CSR_", name:"CSR - Corporate Social Responsibility", path:"EP_before 7.0"};
	prodCompObject[408]={code:"IDM", name:"Initiatives Management", path:"EP_before 7.0 > CSR_"};
	prodCompObject[409]={code:"IDM.0", name:"0 - LBG Reporting", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[410]={code:"IDM.7", name:"7 - Volunteering", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[411]={code:"IDM.8", name:"8 - Gift", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[412]={code:"PCM_MCQ", name:"MCQ", path:"Obso > PCM"};
	prodCompObject[413]={code:"PCM_ACK", name:"Acknowledgement", path:"Obso > PCM"};
	prodCompObject[414]={code:"PCM_SET", name:"Settings", path:"Obso > PCM"};
	prodCompObject[415]={code:"PCM_REP", name:"Reporting", path:"Obso > PCM"};
	prodCompObject[416]={code:"PCM_EXC", name:"Exceptions", path:"Obso > PCM"};
	prodCompObject[417]={code:"PCM_TRA", name:"Transverse", path:"Obso > PCM"};
	prodCompObject[418]={code:"PPS", name:"PPS", path:"Obso"};
	prodCompObject[419]={code:"Adm_Tplt", name:"Administration Template", path:"Obso > PPS"};
	prodCompObject[420]={code:"Adm_Chg", name:"Administration Charge", path:"Obso > PPS"};
	prodCompObject[421]={code:"Rpt_Tpl", name:"Rapport Template", path:"Obso > PPS"};
	prodCompObject[422]={code:"Rpt_Chg", name:"Rapport Charge", path:"Obso > PPS"};
	prodCompObject[423]={code:"InfShr_Tplt", name:"Information Sharing Template", path:"Obso > PPS"};
	prodCompObject[424]={code:"Prev_Chg", name:"Prévention Charge", path:"Obso > PPS"};
	prodCompObject[425]={code:"Prev_Tplt", name:"Prévention Template", path:"Obso > PPS"};
	prodCompObject[426]={code:"Prod_Chg", name:"Production Charge", path:"Obso > PPS"};
	prodCompObject[427]={code:"Sin_Chg", name:"Sinistre Charge", path:"Obso > PPS"};
	prodCompObject[428]={code:"Sin_Tplt", name:"Sinistre Template", path:"Obso > PPS"};
	prodCompObject[429]={code:"Test", name:"Testing", path:"Obso > PPS"};
	prodCompObject[430]={code:"R&D", name:"Socle", path:"Obso > PPS"};
	prodCompObject[431]={code:"RM_Tplt", name:"Cartographie Template", path:"Obso > PPS"};
	prodCompObject[432]={code:"RM_Chg", name:"Cartographie Charge", path:"Obso > PPS"};
	prodCompObject[433]={code:"ACS_Ass", name:"Self-Asessment Checklist", path:"EP_before 7.0 > ACS_"};
	prodCompObject[434]={code:"ACS_OL", name:"Offline Module", path:"EP_before 7.0 > ACS_"};
	prodCompObject[435]={code:"ACS_CAL", name:"Audit Calendar", path:"EP_before 7.0 > ACS_"};
	prodCompObject[436]={code:"ACS_UPDT", name:"Updater", path:"EP_before 7.0 > ACS_"};
	prodCompObject[437]={code:"ACS_AudR", name:"Audit Report Generation", path:"EP_before 7.0 > ACS_"};
	prodCompObject[438]={code:"ACS_TECH", name:"Technique", path:"EP_before 7.0 > ACS_"};
	prodCompObject[439]={code:"SD_EMC", name:"Expert - Metrics Collection", path:"EP_before 7.0 > SD_"};
	prodCompObject[441]={code:"SD/ECM_UDM", name:"Utility Data Management", path:"EP_before 7.0 > SD_"};
	prodCompObject[442]={code:"BEE", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[443]={code:"SD/ECM_ExtRep", name:"External Reporting", path:"EP_before 7.0 > SD_"};
	prodCompObject[444]={code:"SD/ECM_Transp", name:"Carbon Logistics (Not Relased Yet)", path:"EP_before 7.0 > SD_"};
	prodCompObject[445]={code:"SD/ECM_BENCH", name:"CO2 Benchmark (Not Relased Yet)", path:"EP_before 7.0 > SD_"};
	prodCompObject[446]={code:"WEATH", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[447]={code:"AUD", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[448]={code:"zCROSS", name:"To delete", path:"EP_before 7.0 > SD_"};
	prodCompObject[449]={code:"HO_ASSET", name:"Asset Management", path:"EP_before 7.0 > HO_"};
	prodCompObject[450]={code:"HO_SYNC", name:"Synchronization", path:"EP_before 7.0 > HO_"};
	prodCompObject[451]={code:"HO_CORE", name:"Core", path:"EP_before 7.0 > HO_"};
	prodCompObject[452]={code:"SOCS", name:"Gestion des sociétés", path:"CGv > CM"};
	prodCompObject[453]={code:"PERSONNE", name:"Gestion des personnes", path:"CGv > CM"};
	prodCompObject[454]={code:"FISC", name:"Module Fiscal", path:"CGv > CM"};
	prodCompObject[455]={code:"SJ", name:"Secrétariat Juridique", path:"CGv > CM"};
	prodCompObject[456]={code:"PJ", name:"Paramétrage Juridique", path:"CGv > CM"};
	prodCompObject[457]={code:"OPE", name:"Opérations", path:"CGv > CM"};
	prodCompObject[458]={code:"z_AP_CO", name:"z_Core", path:"EP_before 7.0 > AP_"};
	prodCompObject[459]={code:"z_AP_AN", name:"z_Alert & Notifications", path:"EP_before 7.0 > AP_"};
	prodCompObject[460]={code:"AP.02_old", name:"Tasks", path:"EP_before 7.0 > AP_"};
	prodCompObject[461]={code:"z_AP_STT", name:"z_Settings", path:"EP_before 7.0 > AP_"};
	prodCompObject[462]={code:"z_AP_CFG", name:"z_Configuration", path:"EP_before 7.0 > AP_"};
	prodCompObject[463]={code:"z_AP_LYT", name:"z_Layout", path:"EP_before 7.0 > AP_"};
	prodCompObject[464]={code:"z_AP_PRD", name:"z_Periodicity", path:"EP_before 7.0 > AP_"};
	prodCompObject[465]={code:"z_AP_WF", name:"z_Validation WF", path:"EP_before 7.0 > AP_"};
	prodCompObject[466]={code:"z_AP_MMD", name:"z_Main Module", path:"EP_before 7.0 > AP_"};
	prodCompObject[467]={code:"HO_LYT", name:"Layout", path:"EP_before 7.0 > HO_"};
	prodCompObject[468]={code:"HO_Task", name:"Task Management", path:"EP_before 7.0 > HO_"};
	prodCompObject[469]={code:"TSK", name:"Task Management", path:"Obso > EHS > EHS_HO"};
	prodCompObject[470]={code:"HO_World", name:"Worldmap", path:"EP_before 7.0 > HO_"};
	prodCompObject[471]={code:"World", name:"Worldmap", path:"Obso > EHS > EHS_HO"};
	prodCompObject[472]={code:"AP42_EF", name:"AP-42 EFs", path:"EP_before 7.0 > AQS_"};
	prodCompObject[473]={code:"SD_EMC1", name:"Uncertainty Management", path:"EP_before 7.0 > SD_ > SD_EMC"};
	prodCompObject[474]={code:"SD_Obj1", name:"Objective - Basic", path:"EP_before 7.0 > SD_ > SD_Obj"};
	prodCompObject[475]={code:"SD_Obj2", name:"Objective - Advanced", path:"EP_before 7.0 > SD_ > SD_Obj"};
	prodCompObject[476]={code:"SD_Obj3", name:"Objective - Expert", path:"EP_before 7.0 > SD_ > SD_Obj"};
	prodCompObject[477]={code:"SRM", name:"Stakeholder's Relationship Management", path:"EP_before 7.0 > CSR_"};
	prodCompObject[478]={code:"SM1", name:"Stakeholders Management", path:"EP_before 7.0 > CSR_ > SRM"};
	prodCompObject[479]={code:"SM2", name:"Contact Management", path:"EP_before 7.0 > CSR_ > SRM"};
	prodCompObject[481]={code:"RuleMk", name:"Rule Making News", path:"EP_before 7.0 > RCM_"};
	prodCompObject[483]={code:"RH", name:"Human Ressource", path:"EP_before 7.0 > SD_"};
	prodCompObject[484]={code:"RH1", name:"Gestion des employés", path:"EP_before 7.0 > SD_ > RH"};
	prodCompObject[485]={code:"RH2", name:"Suivi de carrière", path:"EP_before 7.0 > SD_ > RH"};
	prodCompObject[486]={code:"6CRC", name:"Carbon Reduction Commitment", path:"Obso > ECM"};
	prodCompObject[487]={code:"RH3", name:"Gestion de compétences et de talents", path:"EP_before 7.0 > SD_ > RH"};
	prodCompObject[488]={code:"Reporting", name:"Reporting", path:"CGv > CM"};
	prodCompObject[489]={code:"DGE", name:"DGE", path:"CGv > CM"};
	prodCompObject[490]={code:"EVX", name:"EVX - Plug in", path:"CGv > CM"};
	prodCompObject[491]={code:"DEP", name:"Depreciated Modules - TB removed", path:"CGv > CM"};
	prodCompObject[492]={code:"Ergonomie", name:"Ergonomie", path:"CGv > CM"};
	prodCompObject[493]={code:"ACS_Enh", name:"Enhesa", path:"EP_before 7.0 > ACS_ > ACS_Cont"};
	prodCompObject[494]={code:"ACS_STP", name:"STP", path:"EP_before 7.0 > ACS_ > ACS_Cont"};
	prodCompObject[495]={code:"ACS_Aec", name:"Aecom", path:"EP_before 7.0 > ACS_ > ACS_Cont"};
	prodCompObject[496]={code:"RCM_CO", name:"Content Partners", path:"EP_before 7.0 > RCM_"};
	prodCompObject[497]={code:"RCM.Enhesa", name:"Enhesa", path:"EP_before 7.0 > RCM_ > RCM_CO"};
	prodCompObject[498]={code:"z_CHEMCONTENT", name:"z_Chemical Content Provider", path:"EP_before 7.0 > CMS_"};
	prodCompObject[499]={code:"z_CHEMREP", name:"z_Reports & Dashboards", path:"EP_before 7.0 > CMS_"};
	prodCompObject[500]={code:"R&D AS", name:"Application Server", path:"<Top>"};
	prodCompObject[501]={code:"Corporate", name:"Internal Software", path:"<Top>"};
	prodCompObject[503]={code:"SI", name:"Special Initiatives", path:"Misc"};
	prodCompObject[504]={code:"ACM", name:"z_ACM - Agreement and Contract Management", path:"Obso"};
	prodCompObject[505]={code:"CLM", name:"CLM - Contract Lifecycle Management", path:"CGv"};
	prodCompObject[506]={code:"DRM", name:"DRM - Data Room Management_OBSOLET??", path:"CGv"};
	prodCompObject[507]={code:"LM", name:"LM - Litigation Management", path:"CGv"};
	prodCompObject[509]={code:"REM", name:"REM - Real Estate Management", path:"Obso"};
	prodCompObject[510]={code:"Wizness Legal", name:"Wizness Legal", path:"Wizness"};
	prodCompObject[511]={code:"IntSoft", name:"Internal Software", path:"Corporate"};
	prodCompObject[512]={code:"AM", name:"amMap", path:"EP_before 7.0 > HO_"};
	prodCompObject[513]={code:"NEW", name:"WizNEW", path:"Misc"};
	prodCompObject[514]={code:"REP", name:"Reports", path:"Obso"};
	prodCompObject[515]={code:"ABS", name:"ABS - Anti Bribery System", path:"Obso"};
	prodCompObject[516]={code:"EHS", name:"EHS Suite (obsolete)", path:"Obso"};
	prodCompObject[517]={code:"GHG MS", name:"GHG MS - To delete", path:"Obso"};
	prodCompObject[518]={code:"PCS", name:"z_PCS - Product Stewartship", path:"Obso"};
	prodCompObject[519]={code:"ERM Suite", name:"z_ERM - Enterprise Risk Management Suite", path:"Obso"};
	prodCompObject[520]={code:"PEM", name:"PEM - Performance Management", path:"Obso"};
	prodCompObject[521]={code:"RIMS", name:"z_RIMS - Risk and Insurance Management System", path:"Obso"};
	prodCompObject[522]={code:"POS", name:"Purchase Optimization System", path:"Obso"};
	prodCompObject[523]={code:"TM", name:"Transformation Management", path:"Obso"};
	prodCompObject[527]={code:"AS CG", name:"Application Server Corporate Governance", path:"CGv"};
	prodCompObject[528]={code:"IND", name:"Industrialization", path:"Misc > SI"};
	prodCompObject[529]={code:"PM Brainstorm", name:"Product Management Dashboard", path:"Misc > SI"};
	prodCompObject[530]={code:"MyEnablon (obsolete)", name:"Wiz - MyEnablon (obsolete)", path:"Wizness"};
	prodCompObject[532]={code:"SAAS (obsolete)", name:"Software as a service (obsolete)", path:"Wizness"};
	prodCompObject[533]={code:"x_MT (obsolete)", name:"GXP Management Tools (obsolete)", path:"Wizness"};
	prodCompObject[534]={code:"SM", name:"Shared Modules", path:"Obso"};
	prodCompObject[535]={code:"SR", name:"SR - Sustainability Reporting", path:"Obso"};
	prodCompObject[536]={code:"OP (obsolete)", name:"Online Payment (obsolete)", path:"Wizness"};
	prodCompObject[538]={code:"GXP.13", name:"Alerts Factory Module", path:"Wizness > GXP"};
	prodCompObject[539]={code:"GXP.14", name:"Application Factory Module", path:"Wizness > GXP"};
	prodCompObject[540]={code:"GXP.15", name:"Benchmark Against Peers Module", path:"Wizness > GXP"};
	prodCompObject[541]={code:"GXP.16", name:"Best Practices Sharing Module", path:"Wizness > GXP"};
	prodCompObject[542]={code:"GXP.17", name:"Companies & Sites Management Module", path:"Wizness > GXP"};
	prodCompObject[543]={code:"GXP.18", name:"Connectors & Web Services Module", path:"Wizness > GXP"};
	prodCompObject[544]={code:"GXP.19", name:"CSR Protocols Module", path:"Wizness > GXP"};
	prodCompObject[545]={code:"GXP.20", name:"Data Encryption Module", path:"Wizness > GXP"};
	prodCompObject[546]={code:"GXP.21", name:"Data Validation Process Module", path:"Wizness > GXP"};
	prodCompObject[547]={code:"GXP.22", name:"Data-Mining Capabilities Module", path:"Wizness > GXP"};
	prodCompObject[548]={code:"GXP.23", name:"Expert Feedback Module", path:"Wizness > GXP"};
	prodCompObject[549]={code:"GXP.24", name:"GHG Emissions Calculator Module", path:"Wizness > GXP"};
	prodCompObject[550]={code:"GXP.25", name:"Import/Export Management Module", path:"Wizness > GXP"};
	prodCompObject[551]={code:"GXP.26", name:"Interactions Tracking Module", path:"Wizness > GXP"};
	prodCompObject[552]={code:"GXP.27", name:"Invitation for registration Module", path:"Wizness > GXP"};
	prodCompObject[553]={code:"GXP.28", name:"Key Performance Indicators Module", path:"Wizness > GXP"};
	prodCompObject[554]={code:"GXP.29", name:"Mass Mailing Module", path:"Wizness > GXP"};
	prodCompObject[555]={code:"GXP.30", name:"Multilingual Support Module", path:"Wizness > GXP"};
	prodCompObject[556]={code:"GXP.31", name:"Non-compliance Tracking Module", path:"Wizness > GXP"};
	prodCompObject[557]={code:"GXP.32", name:"Offline Excel Questionnaire Module", path:"Wizness > GXP"};
	prodCompObject[558]={code:"GXP.33", name:"Online Payment Module", path:"Wizness > GXP"};
	prodCompObject[559]={code:"GXP.34", name:"Online Self-Registration Module", path:"Wizness > GXP"};
	prodCompObject[560]={code:"GXP.35", name:"Product Catalogues Module", path:"Wizness > GXP"};
	prodCompObject[561]={code:"GXP.36", name:"Product Compliance Tracking Module", path:"Wizness > GXP"};
	prodCompObject[562]={code:"GXP.37", name:"Reports Factory Module", path:"Wizness > GXP"};
	prodCompObject[563]={code:"GXP.38", name:"Site Data Access Management Module", path:"Wizness > GXP"};
	prodCompObject[564]={code:"GXP.39", name:"Targets Setting & Follow up Module", path:"Wizness > GXP"};
	prodCompObject[565]={code:"GXP.40", name:"Training Management Module", path:"Wizness > GXP"};
	prodCompObject[566]={code:"GXP.41", name:"User Personnal Dashboard Module", path:"Wizness > GXP"};
	prodCompObject[567]={code:"GXP.42", name:"Wizness Module", path:"Wizness > GXP"};
	prodCompObject[568]={code:"GXP.43", name:"Workflows Factory Module", path:"Wizness > GXP"};
	prodCompObject[569]={code:"GXP.44", name:"Workflows Management Module", path:"Wizness > GXP"};
	prodCompObject[570]={code:"GXP.45", name:"Action Plan Management Module", path:"Wizness > GXP"};
	prodCompObject[571]={code:"SD_AMC3", name:"Cluster validation", path:"EP_before 7.0 > SD_ > SD_AMC"};
	prodCompObject[572]={code:"SD_EMC3", name:"Local Administration", path:"EP_before 7.0 > SD_ > SD_EMC"};
	prodCompObject[573]={code:"SD_EMC2", name:"Metrics Partitioning", path:"EP_before 7.0 > SD_ > SD_EMC"};
	prodCompObject[574]={code:"SD_EMC4", name:"Measurement Unit Preferences", path:"EP_before 7.0 > SD_ > SD_EMC"};
	prodCompObject[575]={code:"SD_EMC5", name:"Scoring", path:"EP_before 7.0 > SD_ > SD_EMC"};
	prodCompObject[576]={code:"IA_TECH", name:"Technical Component", path:"EP_before 7.0 > IA_"};
	prodCompObject[577]={code:"IA_Core", name:"Core", path:"EP_before 7.0 > IA_"};
	prodCompObject[578]={code:"ACS_Testing", name:"Testing", path:"EP_before 7.0 > ACS_"};
	prodCompObject[579]={code:"IA.1", name:"Technical", path:"EP_before 7.0 > IA_"};
	prodCompObject[580]={code:"IA.2", name:"IA Solution", path:"EP_before 7.0 > IA_"};
	prodCompObject[582]={code:"IA.4", name:"Proposition automatique de missions", path:"EP_before 7.0 > IA_"};
	prodCompObject[583]={code:"IA.5", name:"Rapport d’audit configurable", path:"EP_before 7.0 > IA_"};
	prodCompObject[584]={code:"IA.6", name:"Synchronisation des calendriers", path:"EP_before 7.0 > IA_"};
	prodCompObject[585]={code:"IA.7", name:"Simplification de l’application", path:"EP_before 7.0 > IA_"};
	prodCompObject[586]={code:"IA.8", name:"Questionnaire pré et post audit", path:"EP_before 7.0 > IA_"};
	prodCompObject[587]={code:"IA.9", name:"Evaluation des risques simple", path:"EP_before 7.0 > IA_"};
	prodCompObject[588]={code:"IA.10_", name:"Réaffectation des tâches en masse", path:"EP_before 7.0 > IA_"};
	prodCompObject[589]={code:"IA.11_", name:"Report Factory", path:"EP_before 7.0 > IA_"};
	prodCompObject[590]={code:"SW", name:"Software solution", path:"Corporate"};
	prodCompObject[591]={code:"SW-QAP", name:"QAP", path:"Corporate > SW"};
	prodCompObject[592]={code:"SW-REQUEST", name:"Requests", path:"Corporate > SW"};
	prodCompObject[593]={code:"SW-REQUIREMENT", name:"Requirements", path:"Corporate > SW"};
	prodCompObject[594]={code:"SW-TRANSVERSAL", name:"Transversal", path:"Corporate > SW"};
	prodCompObject[595]={code:"SW-SOCLES", name:"Application Servers (application)", path:"Corporate > SW"};
	prodCompObject[596]={code:"Deviation", name:"Deviation Management", path:"EP_before 7.0 > AQS_"};
	prodCompObject[597]={code:"BT", name:"Bêta-test", path:"Wizness > Wiz.com - WS"};
	prodCompObject[598]={code:"Documents", name:"Document repository", path:"Wizness > Wiz.com - WS"};
	prodCompObject[599]={code:"SW-MW", name:"Market Watch", path:"Corporate > SW > SW-PRESALES"};
	prodCompObject[600]={code:"IDM.1", name:"1 - Initiative Assessment", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[601]={code:"IDM.2", name:"2 - External Initiative Request", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[602]={code:"MapsM", name:"Maps manager", path:"EP_before 7.0 > HO_"};
	prodCompObject[603]={code:"RMF", name:"RMF - Risk Management Framework (US)", path:"Obso"};
	prodCompObject[613]={code:"RMF.11", name:"Context - Internal & External", path:"Obso > RMF"};
	prodCompObject[614]={code:"IDM.4", name:"4 - External Reporting", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[615]={code:"BCM.01_", name:"Technical", path:"EP_before 7.0 > BCM_"};
	prodCompObject[616]={code:"BCM.02_", name:"BCM Solution (Core)", path:"EP_before 7.0 > BCM_"};
	prodCompObject[617]={code:"BCM.03.1", name:"Chat Module - Group Management", path:"EP_before 7.0 > BCM_"};
	prodCompObject[618]={code:"BCM.03.2", name:"Chat Module - Discussion Window", path:"EP_before 7.0 > BCM_"};
	prodCompObject[619]={code:"BCM.03.3", name:"Chat Module - Logs Management", path:"EP_before 7.0 > BCM_"};
	prodCompObject[620]={code:"BCM.03.4", name:"Chat Module - User List Window", path:"EP_before 7.0 > BCM_"};
	prodCompObject[621]={code:"BCM.03.5", name:"Chat Module - Events Window", path:"EP_before 7.0 > BCM_"};
	prodCompObject[622]={code:"BCM.03.6", name:"Chat Module - Reporting", path:"EP_before 7.0 > BCM_"};
	prodCompObject[623]={code:"BCM.03.0", name:"Chat Module - Core", path:"EP_before 7.0 > BCM_"};
	prodCompObject[624]={code:"GRI.G3", name:"GRI G3", path:"EP_before 7.0 > SD_ > SD/ECM_ExtRep"};
	prodCompObject[625]={code:"CDP", name:"CDP", path:"EP_before 7.0 > SD_ > SD/ECM_ExtRep"};
	prodCompObject[626]={code:"DJSI", name:"DJSI", path:"EP_before 7.0 > SD_ > SD/ECM_ExtRep"};
	prodCompObject[627]={code:"PEG", name:"PEG", path:"EP_before 7.0 > SD_ > SD/ECM_ExtRep"};
	prodCompObject[628]={code:"RMF.01", name:"Technical", path:"Obso > RMF"};
	prodCompObject[629]={code:"BCM.05", name:"Business Impact Analysis Module", path:"EP_before 7.0 > BCM_"};
	prodCompObject[630]={code:"BCM.06", name:"Crisis Management Module", path:"EP_before 7.0 > BCM_"};
	prodCompObject[631]={code:"BCM.07", name:"Business Continuity Plan", path:"EP_before 7.0 > BCM_"};
	prodCompObject[632]={code:"FW_BT", name:"Builder Tools", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[638]={code:"AQS_Core", name:"AQS - Core Platform", path:"EP_before 7.0 > AQS_"};
	prodCompObject[639]={code:"AQS_Plus", name:"AQS_Plus Platform", path:"EP_before 7.0 > AQS_"};
	prodCompObject[640]={code:"AQS_Premium", name:"AQS_Premium Platform", path:"EP_before 7.0 > AQS_"};
	prodCompObject[641]={code:"EPA Tanks", name:"EPA Tanks 4.09", path:"EP_before 7.0 > AQS_"};
	prodCompObject[642]={code:"OffLine Excel", name:"AQS_OffLine Excel", path:"EP_before 7.0 > AQS_"};
	prodCompObject[643]={code:"AQS_Events", name:"Emission Events", path:"EP_before 7.0 > AQS_"};
	prodCompObject[644]={code:"RCM.Watch", name:"Compliance Watch", path:"EP_before 7.0 > RCM_"};
	prodCompObject[647]={code:"RCM_Req", name:"Requirements (Core RCM)", path:"EP_before 7.0 > RCM_"};
	prodCompObject[648]={code:"RCM.Tasks", name:"Compliance Tasks", path:"EP_before 7.0 > RCM_"};
	prodCompObject[649]={code:"CompTsks", name:"Compliance Tasking", path:"EP_before 7.0 > RCM_"};
	prodCompObject[650]={code:"DevMgt", name:"Deviation Management", path:"EP_before 7.0 > RCM_"};
	prodCompObject[651]={code:"RCM.RegScan", name:"RegScan", path:"EP_before 7.0 > RCM_ > RCM_CO"};
	prodCompObject[652]={code:"EA.obs", name:"EA - Environmental Analysis", path:"EP_before 7.0 > AQS_"};
	prodCompObject[653]={code:"Wast", name:"Waste", path:"EP_before 7.0 > AQS_ > EA.obs"};
	prodCompObject[654]={code:"Wat_OLD", name:"Water OLD", path:"EP_before 7.0 > AQS_ > EA.obs"};
	prodCompObject[655]={code:"EnvAn", name:"Environmental Analysis", path:"EP_before 7.0 > AQS_ > EA.obs"};
	prodCompObject[656]={code:"Wast.Core", name:"Core", path:"EP_before 7.0 > AQS_ > EA.obs > Wast"};
	prodCompObject[657]={code:"Wast.Ship", name:"Shipment", path:"EP_before 7.0 > AQS_ > EA.obs > Wast"};
	prodCompObject[658]={code:"Wasr.Stor", name:"Storage", path:"EP_before 7.0 > AQS_ > EA.obs > Wast"};
	prodCompObject[659]={code:"SH", name:"Stakeholders", path:"Wizness > Wiz.com - WS"};
	prodCompObject[661]={code:"ASM.02", name:"Technical", path:"CGv > ASM"};
	prodCompObject[662]={code:"ASM.04", name:"HO Synchronization", path:"CGv > ASM"};
	prodCompObject[663]={code:"ERM.01", name:"Technical", path:"Obso > ERM Suite"};
	prodCompObject[664]={code:"ERM.02", name:"ERM Solution", path:"Obso > ERM Suite"};
	prodCompObject[665]={code:"ERM.03", name:"Reporting Module", path:"Obso > ERM Suite"};
	prodCompObject[666]={code:"ERM.04", name:"User Management Module", path:"Obso > ERM Suite"};
	prodCompObject[667]={code:"ERM.05", name:"Master Data Module", path:"Obso > ERM Suite"};
	prodCompObject[668]={code:"RSC", name:"Responsible Supply Chain", path:"Wizness"};
	prodCompObject[669]={code:"RSC.01", name:"Technical", path:"Wizness > RSC"};
	prodCompObject[670]={code:"RSC.02", name:"RSC Solution", path:"Wizness > RSC"};
	prodCompObject[671]={code:"RSC.03", name:"Suppliers Management", path:"Wizness > RSC"};
	prodCompObject[672]={code:"RSC.04", name:"Factories Management", path:"Wizness > RSC"};
	prodCompObject[673]={code:"RSC.05", name:"Suppliers Self Registration", path:"Wizness > RSC"};
	prodCompObject[674]={code:"RSC.06", name:"Extended Supply Chain", path:"Wizness > RSC"};
	prodCompObject[675]={code:"RSC.07", name:"Online Payment", path:"Wizness > RSC"};
	prodCompObject[676]={code:"RSC.08", name:"Product Catalogue", path:"Wizness > RSC"};
	prodCompObject[677]={code:"RSC.09", name:"Internal Audit", path:"Wizness > RSC"};
	prodCompObject[678]={code:"RSC.10", name:"External Audit", path:"Wizness > RSC"};
	prodCompObject[679]={code:"RSC.11", name:"Follow-up audits", path:"Wizness > RSC"};
	prodCompObject[680]={code:"RSC.12", name:"Findings Tracking", path:"Wizness > RSC"};
	prodCompObject[681]={code:"RSC.13", name:"Audit Checklist", path:"Wizness > RSC"};
	prodCompObject[682]={code:"RSC.14", name:"Offline Excel Checklist", path:"Wizness > RSC"};
	prodCompObject[683]={code:"RSC.15", name:"Self Assessment", path:"Wizness > RSC"};
	prodCompObject[684]={code:"RSC.16", name:"Risk Assessment", path:"Wizness > RSC"};
	prodCompObject[685]={code:"RSC.17", name:"Performance Metrics", path:"Wizness > RSC"};
	prodCompObject[686]={code:"RSC.18", name:"KPI Calculation", path:"Wizness > RSC"};
	prodCompObject[687]={code:"RSC.19", name:"Objectives Management", path:"Wizness > RSC"};
	prodCompObject[688]={code:"RSC.20", name:"Carbon Footprint", path:"Wizness > RSC"};
	prodCompObject[689]={code:"RSC.21", name:"Corrective Action Plans", path:"Wizness > RSC"};
	prodCompObject[690]={code:"RSC.22", name:"Training Management", path:"Wizness > RSC"};
	prodCompObject[691]={code:"RSC.23", name:"Benchmark against peers", path:"Wizness > RSC"};
	prodCompObject[692]={code:"RSC.24", name:"Best Practices Sharing", path:"Wizness > RSC"};
	prodCompObject[693]={code:"RSC.25", name:"Expert Feedback", path:"Wizness > RSC"};
	prodCompObject[694]={code:"RSC.26", name:"Document Repository", path:"Wizness > RSC"};
	prodCompObject[695]={code:"RSC.27", name:"Statistical reports", path:"Wizness > RSC"};
	prodCompObject[696]={code:"RSC.28", name:"User Personal Dashboard", path:"Wizness > RSC"};
	prodCompObject[697]={code:"RSC.29", name:"Search Capabilities", path:"Wizness > RSC"};
	prodCompObject[698]={code:"RSC.30", name:"Advanced Data-Mining", path:"Wizness > RSC"};
	prodCompObject[699]={code:"RSC.31", name:"Reports Builder", path:"Wizness > RSC"};
	prodCompObject[700]={code:"RSC.32", name:"Workflow Builder", path:"Wizness > RSC"};
	prodCompObject[701]={code:"RSC.33", name:"Alerts & Rules Builder", path:"Wizness > RSC"};
	prodCompObject[702]={code:"RSC.34", name:"Application Builder", path:"Wizness > RSC"};
	prodCompObject[703]={code:"RSC.35", name:"Users & Contacts", path:"Wizness > RSC"};
	prodCompObject[704]={code:"RSC.36", name:"Validation workflows", path:"Wizness > RSC"};
	prodCompObject[705]={code:"RSC.37", name:"Notifications & Rules", path:"Wizness > RSC"};
	prodCompObject[706]={code:"RSC.38", name:"Import & Export", path:"Wizness > RSC"};
	prodCompObject[707]={code:"RSC.39", name:"Wizness Connection", path:"Wizness > RSC"};
	prodCompObject[708]={code:"RSC.40", name:"Connectors & Web Services", path:"Wizness > RSC"};
	prodCompObject[709]={code:"RSC.41", name:"Multilingual Support", path:"Wizness > RSC"};
	prodCompObject[710]={code:"ERM.06", name:"Business Process Reader", path:"Obso > ERM Suite"};
	prodCompObject[711]={code:"Ext_XML_Report", name:"External XML Reporting", path:"EP_before 7.0 > AQS_"};
	prodCompObject[712]={code:"ERM.07", name:"Rules Factory", path:"Obso > ERM Suite"};
	prodCompObject[713]={code:"ERM.08", name:"Form Factory", path:"Obso > ERM Suite"};
	prodCompObject[714]={code:"ERM.09", name:"Graphical Workflow", path:"Obso > ERM Suite"};
	prodCompObject[715]={code:"RM_KRI", name:"[Obsolete] - Key Risk Indicators", path:"EP_before 7.0 > RM_"};
	prodCompObject[716]={code:"SW-PRESALES", name:"Pre-Sales", path:"Corporate > SW"};
	prodCompObject[717]={code:"RMF.02", name:"RMF Solution", path:"Obso > RMF"};
	prodCompObject[718]={code:"RMF.12", name:"Context - Management Context", path:"Obso > RMF"};
	prodCompObject[719]={code:"RMF.21", name:"Assessment - Identification", path:"Obso > RMF"};
	prodCompObject[720]={code:"RMF.22", name:"Assessment - Analysis", path:"Obso > RMF"};
	prodCompObject[721]={code:"RMF.23", name:"Assessment - Evaluation", path:"Obso > RMF"};
	prodCompObject[722]={code:"RMF.30", name:"Monitoring", path:"Obso > RMF"};
	prodCompObject[723]={code:"RMF.40", name:"Review", path:"Obso > RMF"};
	prodCompObject[724]={code:"RMF.51", name:"Framework - Design", path:"Obso > RMF"};
	prodCompObject[725]={code:"RMF.52", name:"Framework - Implement", path:"Obso > RMF"};
	prodCompObject[726]={code:"RMF.53", name:"Framework - Monitor", path:"Obso > RMF"};
	prodCompObject[727]={code:"RMF.54", name:"Framework - Review", path:"Obso > RMF"};
	prodCompObject[728]={code:"RM_SCE", name:"[Obsolete] - Scenario", path:"EP_before 7.0 > RM_"};
	prodCompObject[729]={code:"IDM.3", name:"3 - Core Reporting", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[730]={code:"IDM.5", name:"5 - Content", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[731]={code:"IDM.6", name:"6 - Link to Others Modules", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[732]={code:"IDM.9", name:"9 - Extended Product", path:"EP_before 7.0 > CSR_ > IDM"};
	prodCompObject[733]={code:"RMF.03", name:"Reporting & Dashboard", path:"Obso > RMF"};
	prodCompObject[734]={code:"RMF.20", name:"Assessment - General", path:"Obso > RMF"};
	prodCompObject[735]={code:"RMF.20.1", name:"Assessment - Risk Registers", path:"Obso > RMF"};
	prodCompObject[736]={code:"RMF.24", name:"Assessment - Treatment", path:"Obso > RMF"};
	prodCompObject[737]={code:"RMF.12.1", name:"Context - Management Context - Common Vocabulary", path:"Obso > RMF"};
	prodCompObject[738]={code:"RMF.12.2", name:"Context - Management Context - Methods", path:"Obso > RMF"};
	prodCompObject[739]={code:"RMF.12.3", name:"Context - Management Context - Risk Appetite", path:"Obso > RMF"};
	prodCompObject[740]={code:"RMF.60", name:"Treatment - Action Items", path:"Obso > RMF"};
	prodCompObject[741]={code:"BP", name:"Best Practice", path:"Obso > EHS > EHS_HO"};
	prodCompObject[742]={code:"Wiz.com - ME", name:"Wizness.com - My Enablon", path:"Wizness"};
	prodCompObject[743]={code:"Wiz.com - NS", name:"Wizness.com - Nab Store", path:"Wizness"};
	prodCompObject[744]={code:"Wiz.com - MDMS", name:"Wizness.com - MDMS", path:"Wizness"};
	prodCompObject[745]={code:"CO_01", name:"WS Federation", path:"Wizness > Wiz.com - MDMS"};
	prodCompObject[746]={code:"CO_02", name:"Wall", path:"Wizness > Wiz.com - MDMS"};
	prodCompObject[747]={code:"CO_03", name:"Master Data Management System", path:"Wizness > Wiz.com - MDMS"};
	prodCompObject[748]={code:"CO_04", name:"Unique Identifier (Wiz Id)", path:"Wizness > Wiz.com - MDMS"};
	prodCompObject[749]={code:"RIMS_HO", name:"Portal", path:"Obso > RIMS"};
	prodCompObject[750]={code:"RIMS_PRD", name:"Questionnaire Gestion des valeurs", path:"Obso > RIMS > RIMS_Quest"};
	prodCompObject[751]={code:"RIMS_PREV", name:"Questionnaire Prevention", path:"Obso > RIMS > RIMS_Quest"};
	prodCompObject[752]={code:"RIMS_RECO", name:"Recommandations", path:"Obso > RIMS"};
	prodCompObject[753]={code:"RIMS_POL", name:"Police", path:"Obso > RIMS"};
	prodCompObject[754]={code:"RIMS_IMS", name:"Sinistre", path:"Obso > RIMS"};
	prodCompObject[755]={code:"RIMS_AP", name:"Action plans", path:"Obso > RIMS"};
	prodCompObject[756]={code:"RIMS_BCM", name:"Business Compliance Management", path:"Obso > RIMS"};
	prodCompObject[757]={code:"RIMS_RM", name:"Risk", path:"Obso > RIMS"};
	prodCompObject[758]={code:"RIMS_Mig", name:"Migration produit/socle", path:"Obso > RIMS"};
	prodCompObject[759]={code:"RIMS_Geo", name:"Geolocalisation / World Map", path:"Obso > RIMS"};
	prodCompObject[760]={code:"RIMS_Quest", name:"Quetionnaire", path:"Obso > RIMS"};
	prodCompObject[761]={code:"ME.01", name:"Technical", path:"Wizness > Wiz.com - ME"};
	prodCompObject[762]={code:"ME.02", name:"My Enablon Solution", path:"Wizness > Wiz.com - ME"};
	prodCompObject[763]={code:"ME.03", name:"Content", path:"Wizness > Wiz.com - ME"};
	prodCompObject[764]={code:"ME.04", name:"Ergonomy", path:"Wizness > Wiz.com - ME"};
	prodCompObject[765]={code:"WS.02", name:"Public Pages", path:"Wizness > Wiz.com - WS"};
	prodCompObject[766]={code:"WS.03", name:"Social Tools", path:"Wizness > Wiz.com - WS"};
	prodCompObject[767]={code:"WS.01", name:"Technical", path:"Wizness > Wiz.com - WS"};
	prodCompObject[768]={code:"WS.04", name:"Content", path:"Wizness > Wiz.com - WS"};
	prodCompObject[769]={code:"WS.05", name:"Ergonomy", path:"Wizness > Wiz.com - WS"};
	prodCompObject[770]={code:"IC.01_", name:"Technical", path:"EP_before 7.0 > IC_"};
	prodCompObject[771]={code:"IC.02_", name:"IC Solution", path:"EP_before 7.0 > IC_"};
	prodCompObject[772]={code:"CA__", name:"Technical", path:"EP_before 7.0 > CA_"};
	prodCompObject[773]={code:"CA___", name:"CA Solution", path:"EP_before 7.0 > CA_"};
	prodCompObject[774]={code:"ITG.01", name:"Technical", path:"Obso > ITG"};
	prodCompObject[775]={code:"ITG.02", name:"ITG Solution", path:"Obso > ITG"};
	prodCompObject[776]={code:"PCM.01", name:"Technical", path:"Obso > PCM"};
	prodCompObject[777]={code:"PCM.02", name:"PCM Solution", path:"Obso > PCM"};
	prodCompObject[778]={code:"RM.01_", name:"Technical", path:"EP_before 7.0 > RM_"};
	prodCompObject[779]={code:"RM.02_", name:"RM Solution", path:"EP_before 7.0 > RM_"};
	prodCompObject[780]={code:"CM.01", name:"Technical", path:"CGv > CM"};
	prodCompObject[781]={code:"CLM.01", name:"Technical", path:"CGv > CLM"};
	prodCompObject[782]={code:"WS.06", name:"Mobile version", path:"Wizness > Wiz.com - WS"};
	prodCompObject[783]={code:"NS.01", name:"Wizness Rankings", path:"Wizness > Wiz.com - NS"};
	prodCompObject[784]={code:"NS.02", name:"2.0 Report", path:"Wizness > Wiz.com - NS"};
	prodCompObject[785]={code:"RM.03_", name:"Context", path:"EP_before 7.0 > RM_"};
	prodCompObject[786]={code:"RM.04_", name:"Risk Identification", path:"EP_before 7.0 > RM_"};
	prodCompObject[787]={code:"RM.05_", name:"Risk Analysis", path:"EP_before 7.0 > RM_"};
	prodCompObject[788]={code:"RM.06_", name:"Risk Evaluation", path:"EP_before 7.0 > RM_"};
	prodCompObject[789]={code:"RM.07_", name:"Risk Treatment", path:"EP_before 7.0 > RM_"};
	prodCompObject[790]={code:"R5", name:"El Dorado Integration", path:"EP_before 7.0 > AQS_"};
	prodCompObject[792]={code:"CMS.19_", name:"TSCA Compliance (TSCA)", path:"EP_before 7.0 > CMS_"};
	prodCompObject[793]={code:"EHS Suite", name:"z_EHS - Environmental Health & Safety Suite", path:"Obso"};
	prodCompObject[794]={code:"EHS.01", name:"Technical", path:"Obso > EHS Suite"};
	prodCompObject[795]={code:"EHS.02", name:"EHS Miscellaneous", path:"Obso > EHS Suite"};
	prodCompObject[796]={code:"EHS.03", name:"Report Library", path:"Obso > EHS Suite"};
	prodCompObject[797]={code:"EHS.04", name:"User Management", path:"Obso > EHS Suite"};
	prodCompObject[798]={code:"EHS.05", name:"Master Data", path:"Obso > EHS Suite"};
	prodCompObject[799]={code:"EHS.07", name:"Mobile/Offline", path:"Obso > EHS Suite"};
	prodCompObject[800]={code:"EHS.06", name:"Ergonomy", path:"Obso > EHS Suite"};
	prodCompObject[801]={code:"EHS.08", name:"Wizness Integration", path:"Obso > EHS Suite"};
	prodCompObject[802]={code:"EHS.09", name:"Consultant Feature", path:"Obso > EHS Suite"};
	prodCompObject[803]={code:"RM.10", name:"Risk aggregation", path:"EP_before 7.0 > RM_"};
	prodCompObject[804]={code:"RM.20", name:"Methods", path:"EP_before 7.0 > RM_"};
	prodCompObject[805]={code:"TechSD", name:"Technical", path:"EP_before 7.0 > SD_"};
	prodCompObject[806]={code:"SD_CNT", name:"Packaged SD content", path:"EP_before 7.0 > SD_"};
	prodCompObject[807]={code:"RM.031", name:"Objectives", path:"EP_before 7.0 > RM_"};
	prodCompObject[808]={code:"SW-SCRUM", name:"SCRUM", path:"Corporate > SW"};
	prodCompObject[809]={code:"SW-TESTMGT", name:"Test Management", path:"Corporate > SW"};
	prodCompObject[810]={code:"RM.032", name:"Libraries", path:"EP_before 7.0 > RM_"};
	prodCompObject[811]={code:"RM.033", name:"Registers", path:"EP_before 7.0 > RM_"};
	prodCompObject[812]={code:"RM.040", name:"Risk Register", path:"EP_before 7.0 > RM_"};
	prodCompObject[813]={code:"CMS.14_", name:"ChemAdvisor", path:"EP_before 7.0 > CMS_"};
	prodCompObject[814]={code:"AutoCM", name:"Auto CM 7", path:"Misc > TST > Test Auto FR"};
	prodCompObject[815]={code:"AutoAS", name:"Auto Application Server", path:"Misc > TST > Test Auto FR"};
	prodCompObject[816]={code:"AutoAuthentication", name:"Auto Authentication", path:"Misc > TST > Test Auto FR > AutoAS"};
	prodCompObject[817]={code:"SW-RN", name:"Release Notes", path:"Corporate > SW"};
	prodCompObject[818]={code:"SW-BUILDS", name:"Builds Management", path:"Corporate > SW"};
	prodCompObject[819]={code:"SW-SHARE", name:"Share", path:"Corporate > SW"};
	prodCompObject[820]={code:"z_Syns", name:"z_Synonyms", path:"EP_before 7.0 > CMS_"};
	prodCompObject[821]={code:"CMS.10_", name:"Regulatory Compliance", path:"EP_before 7.0 > CMS_"};
	prodCompObject[832]={code:"OFFL", name:"Offline", path:"EP_before 7.0 > EMS_"};
	prodCompObject[833]={code:"Eve5", name:"Télétransmission", path:"EP_before 7.0 > EMS_ > Events"};
	prodCompObject[834]={code:"Families", name:"Families", path:"R&D AS > ASEC > Builder"};
	prodCompObject[835]={code:"Version Manager", name:"Version Manager", path:"R&D AS > ASEC > Builder"};
	prodCompObject[836]={code:"Langpack Manager", name:"Langpack Manager", path:"R&D AS > ASEC > Builder"};
	prodCompObject[837]={code:"Switches", name:"Switches", path:"R&D AS > ASEC > Builder"};
	prodCompObject[840]={code:"OOP Interface", name:"Programming Interface (OOP)", path:"R&D AS > ASEC > Builder"};
	prodCompObject[841]={code:"Nabsic Editor", name:"Nabsic Editor", path:"R&D AS > ASEC > Builder"};
	prodCompObject[842]={code:"Site Settings", name:"Site Settings", path:"R&D AS > ASEC > Administration"};
	prodCompObject[844]={code:"Search Tool", name:"Builder Search", path:"R&D AS > ASEC > Builder"};
	prodCompObject[845]={code:"Batch History", name:"Batch History", path:"R&D AS > ASEC > Builder"};
	prodCompObject[846]={code:"Spec Manager", name:"Spec Manager", path:"R&D AS > ASEC > Builder"};
	prodCompObject[847]={code:"Builder History", name:"Builder History", path:"R&D AS > ASEC > Builder"};
	prodCompObject[848]={code:"Layout", name:"Layout", path:"R&D AS > ASEC > Builder"};
	prodCompObject[849]={code:"Debugging", name:"Debugging Tools", path:"R&D AS > ASEC > Builder"};
	prodCompObject[851]={code:"Graph Field", name:"Graph Field", path:"R&D AS > ASEC > Table > Forms & Sub-forms"};
	prodCompObject[852]={code:"Graph Object", name:"Graph Object", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[853]={code:"DocumentBuilder / Da", name:"DocumentBuilder / DataMapper", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[854]={code:"NewDoc", name:"Document Generator", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[856]={code:"Progression Bars", name:"Progression Bars", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[857]={code:"Approval Process", name:"Approval Process (Workflow)", path:"R&D AS > ASEC > Table"};
	prodCompObject[858]={code:"Rules", name:"Rules", path:"R&D AS > ASEC > Table"};
	prodCompObject[859]={code:"Map Object", name:"Map Object", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[860]={code:"Javascript Kit", name:"Javascript Kit", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[862]={code:"Call Nabsic From JS", name:"Call Nabsic From Javascript (RPC)", path:"R&D AS > ASEC > Builder"};
	prodCompObject[863]={code:"Reports Module", name:"Reports Module", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[864]={code:"Report Library", name:"Report Library", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[865]={code:"Report Designer", name:"Report Designer", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[866]={code:"Stat Object", name:"Statistical Object", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[867]={code:"Export in Report", name:"Export of Reports", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[868]={code:"Dashboard", name:"Dashboard", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[869]={code:"Schedule", name:"Report Scheduler", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[870]={code:"Table", name:"Table", path:"R&D AS > ASEC"};
	prodCompObject[871]={code:"Fractal", name:"Fractal (Tree Mode)", path:"R&D AS > ASEC > Table"};
	prodCompObject[872]={code:"Forms & Sub-forms", name:"Forms & Sub-forms", path:"R&D AS > ASEC > Table"};
	prodCompObject[874]={code:"Library", name:"Library", path:"R&D AS > ASEC > Table"};
	prodCompObject[875]={code:"Agenda", name:"Agenda Module", path:"R&D AS > ASEC > Table"};
	prodCompObject[876]={code:"Explorer Object", name:"Explorer Object", path:"R&D AS > ASEC > Table"};
	prodCompObject[877]={code:"Archive Table", name:"Archive Table", path:"R&D AS > ASEC > Builder"};
	prodCompObject[878]={code:"Multi Sources", name:"Multi Sources", path:"R&D AS > ASEC > Table"};
	prodCompObject[879]={code:"Data Edition", name:"Input mode & all fields", path:"R&D AS > ASEC > Table"};
	prodCompObject[882]={code:"Query Builder", name:"Query Builder", path:"R&D AS > ASEC > Table"};
	prodCompObject[883]={code:"Rich Text Editor", name:"Rich Text Editor", path:"R&D AS > ASEC > Table > Forms & Sub-forms"};
	prodCompObject[884]={code:"Data Exchange", name:"Data Exchange", path:"R&D AS > ASEC"};
	prodCompObject[885]={code:"LDAP", name:"LDAP", path:"R&D AS > ASEC > Authentication"};
	prodCompObject[886]={code:"Web Services", name:"Web Services", path:"R&D AS > ASEC > API"};
	prodCompObject[887]={code:"WizIntegration", name:"WizIntegration", path:"R&D AS > ASEC > Data Exchange"};
	prodCompObject[889]={code:"Enablon Connectors", name:"Connectors", path:"R&D AS > ASEC > Data Exchange"};
	prodCompObject[891]={code:"Import/Export csv et", name:"Import/Export - CSV and XML", path:"R&D AS > ASEC > Data Exchange"};
	prodCompObject[892]={code:"Offline HTML5", name:"Offline HTML5 Module", path:"R&D AS > ASEC > Data Exchange"};
	prodCompObject[894]={code:"Synchronization", name:"Synchronization Module", path:"R&D AS > ASEC > Data Exchange"};
	prodCompObject[897]={code:"Architecture", name:"Architecture", path:"R&D AS > ASEC"};
	prodCompObject[899]={code:"DBMS", name:"Database Management", path:"R&D AS > ASEC > Architecture"};
	prodCompObject[900]={code:"Web Server", name:"Web Server", path:"R&D AS > ASEC > Administration"};
	prodCompObject[901]={code:"Administration", name:"Administration & Installation", path:"R&D AS > ASEC"};
	prodCompObject[902]={code:"WizLoader", name:"WizLoader", path:"R&D AS > ASEC > Administration"};
	prodCompObject[903]={code:"Installer", name:"Installer", path:"R&D AS > ASEC > Administration"};
	prodCompObject[904]={code:"WizAdmin", name:"WizAdmin", path:"R&D AS > ASEC > Administration"};
	prodCompObject[905]={code:"WizBatch", name:"WizBatch (Enablon Batch Manager)", path:"R&D AS > ASEC > Administration"};
	prodCompObject[906]={code:"WizManager", name:"WizManager", path:"R&D AS > ASEC > Administration"};
	prodCompObject[907]={code:"Users & Permissions", name:"Users & Permissions", path:"R&D AS > ASEC"};
	prodCompObject[908]={code:"Access Group", name:"Access Group", path:"R&D AS > ASEC > Builder"};
	prodCompObject[909]={code:"Advanced Right Manag", name:"Advanced Right Management", path:"R&D AS > ASEC > Users & Permissions"};
	prodCompObject[910]={code:"Users Table", name:"Users Table", path:"R&D AS > ASEC > Users & Permissions"};
	prodCompObject[911]={code:"Authentication", name:"Authentication", path:"R&D AS > ASEC"};
	prodCompObject[912]={code:"My Configuration", name:"My Configuration", path:"R&D AS > ASEC > Users & Permissions"};
	prodCompObject[914]={code:"Form Factory", name:"Form Factory", path:"R&D AS > ASEC > Builder"};
	prodCompObject[915]={code:"Approval Process Fac", name:"Approval Process Factory", path:"R&D AS > ASEC > Table"};
	prodCompObject[916]={code:"Report Factory", name:"Report Factory", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[917]={code:"Rules Factory", name:"Rules Factory", path:"R&D AS > ASEC > Table"};
	prodCompObject[918]={code:"Forum Page", name:"Forum Page", path:"R&D AS > ASEC > Table"};
	prodCompObject[919]={code:"Offline XLS", name:"Offline Excel", path:"R&D AS > ASEC > Data Exchange"};
	prodCompObject[920]={code:"Batches", name:"Batches", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[921]={code:"GUI & IDE", name:"GUI & IDE (App. Builder)", path:"R&D AS > ASEC > Builder"};
	prodCompObject[924]={code:"Translation Manager", name:"Translation Manager", path:"R&D AS > ASEC > Builder"};
	prodCompObject[925]={code:"Web Browser", name:"Web Browser", path:"R&D AS > ASEC > Architecture"};
	prodCompObject[926]={code:"Compilation", name:"Compilation", path:"R&D AS > ASEC > Administration"};
	prodCompObject[927]={code:"Com Center", name:"Com Center", path:"R&D AS > ASEC > Table"};
	prodCompObject[932]={code:"Mail", name:"Email", path:"R&D AS > ASEC > Data Exchange"};
	prodCompObject[933]={code:"OS Server", name:"OS Server", path:"R&D AS > ASEC > Administration"};
	prodCompObject[935]={code:"Monitoring", name:"Monitoring", path:"R&D AS > ASEC > Administration"};
	prodCompObject[936]={code:"Calc Processor", name:"Calc Processor", path:"R&D AS > ASEC > Builder"};
	prodCompObject[937]={code:"Data Search", name:"Search Mode", path:"R&D AS > ASEC > Table"};
	prodCompObject[938]={code:"Data Processing", name:"Data Processing", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[939]={code:"Hot Backup", name:"Hot Backup", path:"R&D AS > ASEC > Architecture > DBMS"};
	prodCompObject[941]={code:"Calculated field", name:"Calculations", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[942]={code:"Drill down", name:"Drill Down", path:"R&D AS > ASEC > Reports & Dashboard > Reports Module"};
	prodCompObject[943]={code:"Sort", name:"Sort & Top", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[944]={code:"trendline & forecast", name:"Trendline & Forecast Reports", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[945]={code:"Matrix", name:"Matrix Report", path:"R&D AS > ASEC > Reports & Dashboard > Reports Module"};
	prodCompObject[946]={code:"reports architecture", name:"Reports Architecture", path:"R&D AS > ASEC > Reports & Dashboard > Reports Module"};
	prodCompObject[947]={code:"Ndim", name:"N-Dimensions Tables & Graphics", path:"R&D AS > ASEC > Reports & Dashboard > Reports Module"};
	prodCompObject[948]={code:"Gant", name:"Gantt", path:"R&D AS > ASEC > Table"};
	prodCompObject[949]={code:"EP_before 7.0", name:"Enablon Platform_Before 7.0 (will be obsolete)", path:"<Top>"};
	prodCompObject[950]={code:"EP.01", name:"Technical", path:"Misc > EPGroup"};
	prodCompObject[951]={code:"EP.02", name:"Platform Core", path:"Misc > EPGroup"};
	prodCompObject[952]={code:"EP.03", name:"AS Features implementation", path:"Misc > EPGroup"};
	prodCompObject[953]={code:"B.Practices", name:"Best Practices", path:"EP_before 7.0 > HO_"};
	prodCompObject[954]={code:"CO_05", name:"Connectivity", path:"Wizness > Wiz.com - MDMS"};
	prodCompObject[956]={code:"ACS-RS", name:"RegScan", path:"EP_before 7.0 > ACS_ > ACS_Cont"};
	prodCompObject[957]={code:"ACS-Insp", name:"Inspection with Checklist", path:"EP_before 7.0 > ACS_"};
	prodCompObject[959]={code:"AQS_Sample", name:"Sample", path:"EP_before 7.0 > AQS_"};
	prodCompObject[960]={code:"WATER", name:"Water", path:"EP_before 7.0 > AQS_"};
	prodCompObject[961]={code:"CO_06", name:"Apps", path:"Wizness > Wiz.com - MDMS"};
	prodCompObject[962]={code:"IT", name:"IT", path:"Misc"};
	prodCompObject[963]={code:"UX", name:"User Interface", path:"R&D AS > ASEC"};
	prodCompObject[964]={code:"ADE", name:"Automatic Delivery", path:"EP"};
	prodCompObject[965]={code:"UX.1", name:"Visibility", path:"R&D AS > ASEC > UX"};
	prodCompObject[966]={code:"UX.2", name:"Readability", path:"R&D AS > ASEC > UX"};
	prodCompObject[967]={code:"UX.3", name:"Usability", path:"R&D AS > ASEC > UX"};
	prodCompObject[968]={code:"UX.4", name:"Interactivity", path:"R&D AS > ASEC > UX"};
	prodCompObject[969]={code:"UX.5", name:"Fastness", path:"R&D AS > ASEC > UX"};
	prodCompObject[970]={code:"UX.6", name:"Adaptability", path:"R&D AS > ASEC > UX"};
	prodCompObject[971]={code:"UX.7", name:"Auto-Adapt", path:"R&D AS > ASEC > UX"};
	prodCompObject[972]={code:"UX.8", name:"Accessibility", path:"R&D AS > ASEC > UX"};
	prodCompObject[973]={code:"UX.1.1", name:"Global Interface Review", path:"R&D AS > ASEC > UX > UX.1"};
	prodCompObject[974]={code:"UX.1.2", name:"Library Design", path:"R&D AS > ASEC > UX > UX.1"};
	prodCompObject[975]={code:"UX.1.3", name:"Reports (User Experience)", path:"R&D AS > ASEC > UX > UX.1"};
	prodCompObject[976]={code:"UX.1.4", name:"Calendar", path:"R&D AS > ASEC > Table"};
	prodCompObject[977]={code:"UX.4.1", name:"Social Layer", path:"R&D AS > ASEC > UX > UX.4"};
	prodCompObject[978]={code:"UX.7.1", name:"Adaptative Design", path:"R&D AS > ASEC > UX > UX.7"};
	prodCompObject[979]={code:"UX.8.1", name:"Where is Waldo?", path:"R&D AS > ASEC > UX > UX.8"};
	prodCompObject[980]={code:"UX.6.1", name:"Widget Factory", path:"R&D AS > ASEC > UX > UX.6"};
	prodCompObject[981]={code:"UX.4.2", name:"Interactivity Inside The Solution", path:"R&D AS > ASEC > UX > UX.4"};
	prodCompObject[982]={code:"UX.4.3", name:"Interactivity Outside the Solution", path:"R&D AS > ASEC > UX > UX.4"};
	prodCompObject[983]={code:"UX.6.2", name:"Model–view–controller (MVC)", path:"R&D AS > ASEC > UX > UX.6"};
	prodCompObject[984]={code:"UX.4.4", name:"Help Center", path:"R&D AS > ASEC > UX > UX.4"};
	prodCompObject[985]={code:"UX.7.2", name:"Solution Adaptive Skills", path:"R&D AS > ASEC > UX > UX.7"};
	prodCompObject[986]={code:"ERM.10", name:"Campaign Module", path:"Obso > ERM Suite"};
	prodCompObject[987]={code:"TST", name:"Test", path:"Misc"};
	prodCompObject[988]={code:"NEO", name:"Neolians", path:"Misc > TST"};
	prodCompObject[989]={code:"NeoAuto", name:"Automation", path:"Misc > TST > NEO"};
	prodCompObject[990]={code:"NeoMaint", name:"Maintenance", path:"Misc > TST > NEO"};
	prodCompObject[991]={code:"NeoRelease", name:"Release", path:"Misc > TST > NEO"};
	prodCompObject[992]={code:"SD_Doc", name:"Documentation", path:"EP_before 7.0 > SD_"};
	prodCompObject[993]={code:"FW_CustNav", name:"Customized Navigation", path:"EP_before 7.0 > WizFrame"};
	prodCompObject[994]={code:"CMS.15_", name:"3E SDS (3E)", path:"EP_before 7.0 > CMS_"};
	prodCompObject[995]={code:"SW-PCP", name:"Product Committee Project", path:"Corporate > SW"};
	prodCompObject[996]={code:"EP.04.1", name:"Phase 1 - Process for one Team", path:"EP > ADE"};
	prodCompObject[997]={code:"EP.04.2", name:"Phase 2 - Process for multi-team", path:"EP > ADE"};
	prodCompObject[998]={code:"EP.04.3", name:"Phase 3 - External Use", path:"EP > ADE"};
	prodCompObject[999]={code:"EP.04.4", name:"Phase 4 - Use by client", path:"EP > ADE"};
	prodCompObject[1004]={code:"SD_Obj0", name:"Objective - Core", path:"EP_before 7.0 > SD_ > SD_Obj"};
	prodCompObject[1005]={code:"HO_Maps", name:"Local Maps", path:"EP_before 7.0 > HO_"};
	prodCompObject[1006]={code:"CMS.16_", name:"Tier II chemical inventory report (Tier II)", path:"EP_before 7.0 > CMS_"};
	prodCompObject[1007]={code:"FR", name:"Formatting Rules", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[1008]={code:"CMS.09_", name:"Inventory Management (Inventory)", path:"EP_before 7.0 > CMS_"};
	prodCompObject[1009]={code:"EP.05", name:"User Experience", path:"Misc > EPGroup"};
	prodCompObject[1010]={code:"UX .1", name:"Visibility", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1011]={code:"UX .2", name:"Readability", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1012]={code:"UX .3", name:"Usability", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1013]={code:"UX .4", name:"Interactivity", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1014]={code:"UX .5", name:"Fastness / Productivity", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1015]={code:"UX .6", name:"Adaptability", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1016]={code:"UX .7", name:"Auto-Adapt", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1017]={code:"UX .8", name:"Accessibility", path:"Misc > EPGroup > EP.05"};
	prodCompObject[1018]={code:"z_CMS.05", name:"z_ARIEL", path:"EP_before 7.0 > CMS_"};
	prodCompObject[1019]={code:"z_CMS.06", name:"z_UEx", path:"EP_before 7.0 > CMS_"};
	prodCompObject[1020]={code:"Test Auto FR", name:"Test Auto FR", path:"Misc > TST"};
	prodCompObject[1021]={code:"Test Auto US", name:"Test Auto US", path:"Misc > TST"};
	prodCompObject[1022]={code:"Test Auto US AQS", name:"Test Auto US AQS", path:"Misc > TST > Test Auto US"};
	prodCompObject[1023]={code:"Test Auto US RCM", name:"Test Auto US RCM", path:"Misc > TST > Test Auto US"};
	prodCompObject[1024]={code:"Test Auto US WMS", name:"Test Auto US WMS", path:"Misc > TST > Test Auto US"};
	prodCompObject[1025]={code:"EO", name:"Enablon Office", path:"Corporate"};
	prodCompObject[1026]={code:"EO-HO", name:"EO -Portal", path:"Corporate > EO"};
	prodCompObject[1027]={code:"EO-CS", name:"EO - Cust. Space", path:"Corporate > EO"};
	prodCompObject[1028]={code:"EO-AC", name:"EO - Accounting", path:"Corporate > EO"};
	prodCompObject[1029]={code:"EO-PR", name:"EO - Production", path:"Corporate > EO"};
	prodCompObject[1030]={code:"EO-GS", name:"EO - General Services", path:"Corporate > EO"};
	prodCompObject[1031]={code:"EO-HR", name:"EO - Human Resources", path:"Corporate > EO"};
	prodCompObject[1032]={code:"EO-CO", name:"EO - Corp", path:"Corporate > EO"};
	prodCompObject[1033]={code:"EO-IT", name:"EO - IT", path:"Corporate > EO"};
	prodCompObject[1034]={code:"AutoAB", name:"Auto Application Builder", path:"Misc > TST > Test Auto FR > AutoAS"};
	prodCompObject[1035]={code:"ProcSafety", name:"Process Safety", path:"EP_before 7.0 > EMS_"};
	prodCompObject[1036]={code:"RCM_TRI", name:"TRI (Obsolete) - Toxic Release Inventory Report", path:"EP_before 7.0 > RCM_"};
	prodCompObject[1037]={code:"NPRI", name:"National Pollutant Release Inventory", path:"EP_before 7.0 > RCM_"};
	prodCompObject[1038]={code:"RCM.Strategy", name:"Compliance Strategy", path:"EP_before 7.0 > RCM_"};
	prodCompObject[1039]={code:"RCM.Register", name:"Regulatory Register", path:"EP_before 7.0 > RCM_"};
	prodCompObject[1040]={code:"Obj", name:"Objective Management", path:"EP_before 7.0 > CSR_"};
	prodCompObject[1041]={code:"Obj.1", name:"Strategy management", path:"EP_before 7.0 > CSR_ > Obj"};
	prodCompObject[1043]={code:"Obj.2", name:"Objective creation", path:"EP_before 7.0 > CSR_ > Obj"};
	prodCompObject[1044]={code:"Obj.3", name:"Objective in rpts and questionnaires", path:"EP_before 7.0 > CSR_ > Obj"};
	prodCompObject[1045]={code:"FW_BlackBar", name:"Black Bar", path:"EP_before 7.0 > WizFrame > FW_CustNav"};
	prodCompObject[1046]={code:"FW_AppsBar", name:"Apps Bar", path:"EP_before 7.0 > WizFrame > FW_CustNav"};
	prodCompObject[1047]={code:"FW_QuickBar", name:"Quick Bar", path:"EP_before 7.0 > WizFrame > FW_CustNav"};
	prodCompObject[1048]={code:"FW_SmartBar", name:"Smart Bar", path:"EP_before 7.0 > WizFrame > FW_CustNav"};
	prodCompObject[1049]={code:"FW_LeftPanel", name:"Left Panel", path:"EP_before 7.0 > WizFrame > FW_CustNav"};
	prodCompObject[1050]={code:"Projects", name:"Projects Management", path:"EP_before 7.0 > CSR_"};
	prodCompObject[1051]={code:"NeoCustProj", name:"Customer project", path:"Misc > TST > NEO"};
	prodCompObject[1052]={code:"EO-SF2EO", name:"Salesforce to Enablon Bridge", path:"Corporate > EO"};
	prodCompObject[1053]={code:"TaskManager", name:"Task Manager", path:"R&D AS > ASEC > Table"};
	prodCompObject[1054]={code:"Multiprofile", name:"Multi-Profile", path:"R&D AS > ASEC > Users & Permissions"};
	prodCompObject[1055]={code:"Misc", name:"Miscellaneous", path:"<Top>"};
	prodCompObject[1056]={code:"EPGroup", name:"EP group", path:"Misc"};
	prodCompObject[1057]={code:"TestPerf", name:"Performance", path:"<Top>"};
	prodCompObject[1058]={code:"License", name:"License", path:"R&D AS > ASEC > Administration"};
	prodCompObject[1059]={code:"ZIPLibrary", name:"ZIP Library", path:"R&D AS > ASEC > Architecture"};
	prodCompObject[1060]={code:"ListMode", name:"List Mode", path:"R&D AS > ASEC > Table"};
	prodCompObject[1063]={code:"DocEng", name:"DocEng - Doc Engine", path:"EP_before 7.0 > HO_"};
	prodCompObject[1064]={code:"ListReport", name:"List Report", path:"R&D AS > ASEC > Reports & Dashboard > Reports Module"};
	prodCompObject[1065]={code:"HD", name:"HelpDesk", path:"Corporate"};
	prodCompObject[1066]={code:"HD-MISC", name:"HD - Miscelleneous", path:"Corporate > HD"};
	prodCompObject[1067]={code:"Oscar", name:"Oscar", path:"Corporate"};
	prodCompObject[1068]={code:"MFW", name:"z_Management Framework", path:"Obso"};
	prodCompObject[1069]={code:"EO-EX2EO", name:"Exchange to Office Bridge", path:"Corporate > EO"};
	prodCompObject[1070]={code:"HO_RSK", name:"RSK - Risk Core", path:"EP_before 7.0 > HO_"};
	prodCompObject[1071]={code:"HO_OFF", name:"HO - Offline", path:"EP_before 7.0 > HO_"};
	prodCompObject[1072]={code:"Policy", name:"Policy & Waranties", path:"EP_before 7.0 > PYPKG"};
	prodCompObject[1073]={code:"SIM", name:"Premium simulation", path:"EP_before 7.0 > PYPKG"};
	prodCompObject[1074]={code:"EP.06", name:"Security Audit", path:"Misc > EPGroup"};
	prodCompObject[1075]={code:"RCM.Requirement", name:"Requirements", path:"EP_before 7.0 > RCM_ > RCM.Strategy"};
	prodCompObject[1077]={code:"RCM.Regulation", name:"Regulation Management", path:"EP_before 7.0 > RCM_ > RCM.Register"};
	prodCompObject[1078]={code:"RCM.Permit", name:"Permit Management", path:"EP_before 7.0 > RCM_ > RCM.Register"};
	prodCompObject[1079]={code:"RCM.Policy", name:"Policy Management", path:"EP_before 7.0 > RCM_ > RCM.Register"};
	prodCompObject[1081]={code:"MS_AQS", name:"Multi-Server AQA", path:"EP_before 7.0 > AQS_"};
	prodCompObject[1082]={code:"RCM.AssignMatrix", name:"Assignment Matrix", path:"EP_before 7.0 > RCM_ > RCM.Strategy"};
	prodCompObject[1083]={code:"RCM_NPRI", name:"NPRI - National Pollutant Release Inventory", path:"EP_before 7.0 > RCM_"};
	prodCompObject[1084]={code:"Waste", name:"WMS - Waste", path:"EP_before 7.0"};
	prodCompObject[1085]={code:"QA", name:"Quality Assurance", path:"Misc"};
	prodCompObject[1086]={code:"QASW", name:"QA Software", path:"Misc > QA"};
	prodCompObject[1087]={code:"IC_ADM", name:"Administration", path:"EP_before 7.0 > IC_"};
	prodCompObject[1088]={code:"Nabsic", name:"Nabsic Language", path:"R&D AS > ASEC > Builder"};
	prodCompObject[1091]={code:"TECH_INT", name:"TECHNICAL INTEGRATION", path:"EP_before 7.0"};
	prodCompObject[1092]={code:"CGv", name:"Corporate Governance", path:"<Top>"};
	prodCompObject[1093]={code:"IntegrationCMSAQS", name:"AQS integration in CMS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1094]={code:"IntegrationIMSAQS", name:"AQS integration in IMS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1095]={code:"i1_RCM_AQS", name:"Int1 RCM/AQS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1096]={code:"i1_AQS_SD", name:"Int1 AQS & SD", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1097]={code:"RMCBM", name:"BCM Integration in RM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1098]={code:"RMCA", name:"CA Integration in RM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1100]={code:"CSRMoC", name:"CSR Integration in MoC", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1101]={code:"SDObjectives", name:"Objectives Integration in SD", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1102]={code:"CSRSP", name:"CSR Integration in Sustainability Projects", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1103]={code:"IntegrationRCMAE", name:"EA Integration in RCM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1104]={code:"IARM", name:"IA Integration in RM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1105]={code:"RMIC", name:"IC Integration in RM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1106]={code:"IntegrationIMSCMS", name:"IMS Integration in CMS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1107]={code:"RMIMS", name:"IMS integration in RM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1108]={code:"Integration_IMS_RCM", name:"Int EMS/RCM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1109]={code:"i1_RCM_ACS", name:"Int1 RCM/ACS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1110]={code:"Integration_RCM_IMS", name:"Int RCM/IMS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1111]={code:"IntegrationRCM_IM", name:"RCM Integration in Inspection", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1112]={code:"CARCM", name:"RCM Integration in CA", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1113]={code:"ICRCM", name:"RCM Integration in IC", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1114]={code:"RMRCM", name:"RCM Integration in RM", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1115]={code:"TRI_", name:"TRI_", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1116]={code:"IntSampleAQS", name:"Int Sampling,AQS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1117]={code:"IntTRIAQS", name:"Int TRI / AQS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1118]={code:"IntTRIWMS", name:"Int TRI / WMS", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1130]={code:"SDSRM", name:"SRM Integration in SD", path:"EP_before 7.0 > TECH_INT"};
	prodCompObject[1140]={code:"HO.01_old", name:"HO - 1 - Generic Functions", path:"EP_before 7.0 > HO_"};
	prodCompObject[1141]={code:"Land Use", name:"Land Use", path:"EP_before 7.0 > AQS_"};
	prodCompObject[1154]={code:"CMS.10.2_", name:"Restricted Substance Lists", path:"EP_before 7.0 > CMS_ > CMS.10_"};
	prodCompObject[1155]={code:"CMS.10.3_", name:"Chemical Limits", path:"EP_before 7.0 > CMS_ > CMS.10_"};
	prodCompObject[1169]={code:"AP.01_old", name:"Action Plans Management", path:"EP_before 7.0 > AP_"};
	prodCompObject[1170]={code:"AP.04_old", name:"Reports", path:"EP_before 7.0 > AP_"};
	prodCompObject[1171]={code:"EP", name:"Enablon Platform", path:"<Top>"};
	prodCompObject[1172]={code:"HO", name:"Portal", path:"EP"};
	prodCompObject[1173]={code:"HO.01", name:"Portal (Core)", path:"EP > HO"};
	prodCompObject[1174]={code:"HO.01.2", name:"Functional Axes", path:"EP > HO > HO.01"};
	prodCompObject[1175]={code:"HO.01.1", name:"Organizational Axis Management", path:"EP > HO > HO.01"};
	prodCompObject[1177]={code:"HO.01.1.1", name:"Axes", path:"EP > HO > HO.01 > HO.01.1"};
	prodCompObject[1178]={code:"HO.01.1.2", name:"Geography", path:"EP > HO > HO.01 > HO.01.1"};
	prodCompObject[1179]={code:"HO.01.1.3", name:"Similar Exposure Group (SEG) Definition", path:"EP > HO > HO.01 > HO.01.1"};
	prodCompObject[1180]={code:"HO.01.2.1", name:"Departments", path:"EP > HO > HO.01 > HO.01.2"};
	prodCompObject[1181]={code:"HO.01.2.2", name:"Processes", path:"EP > HO > HO.01 > HO.01.2"};
	prodCompObject[1182]={code:"HO.01.3", name:"Units and Conversions", path:"EP > HO > HO.01"};
	prodCompObject[1183]={code:"HO.01.4", name:"Dashboards & Reports (Portal)", path:"EP > HO > HO.01"};
	prodCompObject[1184]={code:"HO.02", name:"Document Engine", path:"EP > HO"};
	prodCompObject[1185]={code:"HO.02.1", name:"Template Library", path:"EP > HO > HO.02"};
	prodCompObject[1186]={code:"HO.02.2", name:"Template Sections", path:"EP > HO > HO.02"};
	prodCompObject[1187]={code:"HO.03", name:"Risk", path:"EP > HO"};
	prodCompObject[1188]={code:"HO.03.1", name:"Integration", path:"EP > HO > HO.03"};
	prodCompObject[1189]={code:"HO.03.1.1", name:"Chemical Risk", path:"EP > HO > HO.03 > HO.03.1"};
	prodCompObject[1190]={code:"HO.04", name:"Document Control", path:"EP > HO"};
	prodCompObject[1191]={code:"HO.04.1", name:"Document Management", path:"EP > HO > HO.04"};
	prodCompObject[1192]={code:"HO.04.2", name:"Repository", path:"EP > HO > HO.04"};
	prodCompObject[1193]={code:"HO.05", name:"Offline (HTML5)", path:"EP > HO"};
	prodCompObject[1194]={code:"HO.05.1", name:"Offline IMS", path:"EP > HO > HO.05"};
	prodCompObject[1195]={code:"HO.05.2", name:"Offline ACS", path:"EP > HO > HO.05"};
	prodCompObject[1196]={code:"HO.06", name:"Asset Management", path:"EP > HO"};
	prodCompObject[1197]={code:"HO.06.1", name:"Equipments", path:"EP > HO > HO.06"};
	prodCompObject[1198]={code:"HO.06.2", name:"Location", path:"EP > HO > HO.06"};
	prodCompObject[1199]={code:"HO.06.3", name:"Buildings", path:"EP > HO > HO.06"};
	prodCompObject[1200]={code:"HO.07", name:"Root Cause Analysis", path:"EP > HO"};
	prodCompObject[1201]={code:"HO.07.1", name:"Integration", path:"EP > HO > HO.07"};
	prodCompObject[1202]={code:"HO.07.1.1", name:"EMS", path:"EP > HO > HO.07 > HO.07.1"};
	prodCompObject[1203]={code:"HO.08", name:"Maps Manager", path:"EP > HO"};
	prodCompObject[1204]={code:"HO.08.1", name:"Maps Inventory", path:"EP > HO > HO.08"};
	prodCompObject[1205]={code:"HO.08.2", name:"Elements", path:"EP > HO > HO.08"};
	prodCompObject[1206]={code:"HO.08.3", name:"Integration", path:"EP > HO > HO.08"};
	prodCompObject[1209]={code:"HO.08.3.3", name:"Waste (Maps)", path:"EP > HO > HO.08 > HO.08.3"};
	prodCompObject[1210]={code:"HO.09", name:"Directories Management", path:"EP > HO"};
	prodCompObject[1211]={code:"HO.09.1", name:"Directory", path:"EP > HO > HO.09"};
	prodCompObject[1212]={code:"HO.09.2", name:"Movements", path:"EP > HO > HO.09"};
	prodCompObject[1213]={code:"HO.09.3", name:"Business Directory", path:"EP > HO > HO.09"};
	prodCompObject[1214]={code:"HO.10", name:"Global Calendar", path:"EP > HO"};
	prodCompObject[1215]={code:"HO.10.1", name:"Meetings (Manage Corporate Meetings)", path:"EP > HO > HO.10"};
	prodCompObject[1216]={code:"HO.10.2", name:"Calendar (Display elements from the Suite)", path:"EP > HO > HO.10"};
	prodCompObject[1217]={code:"HO.11", name:"Stakeholders", path:"EP > HO"};
	prodCompObject[1218]={code:"HO.03.1.2", name:"Industrial Hygiene", path:"EP > HO > HO.03 > HO.03.1"};
	prodCompObject[1219]={code:"HO.03.1.3", name:"Environmental Analysis", path:"EP > HO > HO.03 > HO.03.1"};
	prodCompObject[1221]={code:"HO.07.1.2", name:"RCM", path:"EP > HO > HO.07 > HO.07.1"};
	prodCompObject[1222]={code:"HO.07.1.3", name:"ACS", path:"EP > HO > HO.07 > HO.07.1"};
	prodCompObject[1223]={code:"HO.03.1.4", name:"Management of Change", path:"EP > HO > HO.03 > HO.03.1"};
	prodCompObject[1224]={code:"HO.08.3.1", name:"IMS", path:"EP > HO > HO.08 > HO.08.3"};
	prodCompObject[1225]={code:"HO.08.3.2", name:"JSA", path:"EP > HO > HO.08 > HO.08.3"};
	prodCompObject[1226]={code:"CSR", name:"Corporate Social Responsibility", path:"EP"};
	prodCompObject[1227]={code:"CSR.01", name:"Objectives", path:"EP > CSR"};
	prodCompObject[1228]={code:"CSR.01.1", name:"Strategy hierarchy", path:"EP > CSR > CSR.01"};
	prodCompObject[1229]={code:"CSR.01.2", name:"Objectives", path:"EP > CSR > CSR.01"};
	prodCompObject[1230]={code:"CSR.01.3", name:"Integrations", path:"EP > CSR > CSR.01"};
	prodCompObject[1231]={code:"CSR.01.3.1", name:"Metrics", path:"EP > CSR > CSR.01 > CSR.01.3"};
	prodCompObject[1232]={code:"CSR.01.3.2", name:"Risk", path:"EP > CSR > CSR.01 > CSR.01.3"};
	prodCompObject[1233]={code:"CSR.01.4", name:"Dashboards & Reports", path:"EP > CSR > CSR.01"};
	prodCompObject[1234]={code:"CSR.02", name:"Initiative and Donation", path:"EP > CSR"};
	prodCompObject[1235]={code:"CSR.02.1", name:"Budget Management", path:"EP > CSR > CSR.02"};
	prodCompObject[1236]={code:"CSR.02.1.1", name:"Budgets", path:"EP > CSR > CSR.02 > CSR.02.1"};
	prodCompObject[1237]={code:"CSR.02.1.2", name:"Programmes", path:"EP > CSR > CSR.02 > CSR.02.1"};
	prodCompObject[1238]={code:"CSR.02.2", name:"Funding Source Requests (Grant Requests)", path:"EP > CSR > CSR.02"};
	prodCompObject[1239]={code:"CSR.02.3", name:"Initiative and Donation - Initiatives", path:"EP > CSR > CSR.02"};
	prodCompObject[1240]={code:"CSR.02.4", name:"People and Organizations", path:"EP > CSR > CSR.02"};
	prodCompObject[1241]={code:"CSR.02.5", name:"Dashboards & Reports", path:"EP > CSR > CSR.02"};
	prodCompObject[1242]={code:"CSR.03", name:"Stakeholder Relationships", path:"EP > CSR"};
	prodCompObject[1243]={code:"CSR.03.1", name:"Issues and Stakeholder Profiling", path:"EP > CSR > CSR.03"};
	prodCompObject[1244]={code:"CSR.03.2", name:"Stakeholder Engagement", path:"EP > CSR > CSR.03"};
	prodCompObject[1245]={code:"CSR.03.3", name:"Archive Issue and Stakeholder Profiles", path:"EP > CSR > CSR.03"};
	prodCompObject[1246]={code:"CSR.03.4", name:"Integrations", path:"EP > CSR > CSR.03"};
	prodCompObject[1247]={code:"CSR.03.4.1", name:"Document Engine", path:"EP > CSR > CSR.03 > CSR.03.4"};
	prodCompObject[1248]={code:"CSR.03.4.2", name:"Meetings", path:"EP > CSR > CSR.03 > CSR.03.4"};
	prodCompObject[1249]={code:"CSR.03.4.3", name:"Action Plans", path:"EP > CSR > CSR.03 > CSR.03.4"};
	prodCompObject[1250]={code:"CSR.03.4.4", name:"Document Control", path:"EP > CSR > CSR.03 > CSR.03.4"};
	prodCompObject[1251]={code:"CSR.03.4.5", name:"Metrics", path:"EP > CSR > CSR.03 > CSR.03.4"};
	prodCompObject[1252]={code:"CSR.03.5", name:"Dashboards & Reports", path:"EP > CSR > CSR.03"};
	prodCompObject[1253]={code:"SD", name:"Metrics", path:"EP"};
	prodCompObject[1254]={code:"SD.01", name:"Metrics", path:"EP > SD"};
	prodCompObject[1255]={code:"SD.01.1", name:"Indicator Reference Data", path:"EP > SD > SD.01"};
	prodCompObject[1256]={code:"SD.01.2", name:"Archive", path:"EP > SD > SD.01"};
	prodCompObject[1257]={code:"SD.01.3", name:"Reporting Calendar", path:"EP > SD > SD.01"};
	prodCompObject[1258]={code:"SD.01.3.1", name:"Gregorian Calendar", path:"EP > SD > SD.01 > SD.01.3"};
	prodCompObject[1259]={code:"SD.01.3.2", name:"The Fiscal Calendar", path:"EP > SD > SD.01 > SD.01.3"};
	prodCompObject[1260]={code:"SD.01.3.3", name:"Custom Calendar", path:"EP > SD > SD.01 > SD.01.3"};
	prodCompObject[1261]={code:"SD.01.4", name:"Reporting Campaigns", path:"EP > SD > SD.01"};
	prodCompObject[1262]={code:"SD.01.4.1", name:"Campaign Manager", path:"EP > SD > SD.01 > SD.01.4"};
	prodCompObject[1263]={code:"SD.01.4.2", name:"Campaign Updater", path:"EP > SD > SD.01 > SD.01.4"};
	prodCompObject[1264]={code:"SD.01.4.3", name:"Email Alerts", path:"EP > SD > SD.01 > SD.01.4"};
	prodCompObject[1265]={code:"SD.01.4.4", name:"Import and Export", path:"EP > SD > SD.01 > SD.01.4"};
	prodCompObject[1266]={code:"SD.01.4.5", name:"Data Validation", path:"EP > SD > SD.01 > SD.01.4"};
	prodCompObject[1267]={code:"SD.01.4.6", name:"Campaign Maintenance", path:"EP > SD > SD.01 > SD.01.4"};
	prodCompObject[1268]={code:"SD.01.5", name:"Contribution", path:"EP > SD > SD.01"};
	prodCompObject[1269]={code:"SD.01.6", name:"Analysis & Reports", path:"EP > SD > SD.01"};
	prodCompObject[1270]={code:"SD.02", name:"External Reporting", path:"EP > SD"};
	prodCompObject[1271]={code:"SD.03", name:"Scenario Analysis", path:"EP > SD"};
	prodCompObject[1272]={code:"SD.04", name:"Costs and Benefits", path:"EP > SD"};
	prodCompObject[1273]={code:"SD.05", name:"Utility Data Management", path:"EP > SD"};
	prodCompObject[1274]={code:"SD.06", name:"GreenHouse Gas", path:"EP > SD"};
	prodCompObject[1275]={code:"EMS", name:"Event Management System", path:"EP"};
	prodCompObject[1276]={code:"EMS.01", name:"IMS (Incident Management System)", path:"EP > EMS"};
	prodCompObject[1277]={code:"EMS.01.1", name:"Log Book reporting", path:"EP > EMS > EMS.01"};
	prodCompObject[1278]={code:"EMS.01.2", name:"Event reporting", path:"EP > EMS > EMS.01"};
	prodCompObject[1279]={code:"EMS.01.3", name:"OII", path:"EP > EMS > EMS.01"};
	prodCompObject[1280]={code:"EMS.01.4", name:"Central Administration Management", path:"EP > EMS > EMS.01"};
	prodCompObject[1281]={code:"EMS.01.5", name:"Legal Forms", path:"EP > EMS > EMS.01"};
	prodCompObject[1282]={code:"EMS.01.6", name:"Dashboards & Reports", path:"EP > EMS > EMS.01"};
	prodCompObject[1283]={code:"EMS.02", name:"Industrial Hygiene", path:"EP > EMS"};
	prodCompObject[1284]={code:"EMS.02.1", name:"Regulatory compliance", path:"EP > EMS > EMS.02"};
	prodCompObject[1285]={code:"EMS.02.2", name:"Agent Library", path:"EP > EMS > EMS.02"};
	prodCompObject[1286]={code:"EMS.02.3", name:"Similar Exposure Groups", path:"EP > EMS > EMS.02"};
	prodCompObject[1287]={code:"EMS.02.4", name:"Exposure Risk Assessment", path:"EP > EMS > EMS.02"};
	prodCompObject[1288]={code:"EMS.02.5", name:"Monitoring", path:"EP > EMS > EMS.02"};
	prodCompObject[1289]={code:"EMS.02.6", name:"Dashboards & Reports", path:"EP > EMS > EMS.02"};
	prodCompObject[1290]={code:"EMS.03", name:"JSA", path:"EP > EMS"};
	prodCompObject[1291]={code:"EMS.03.1", name:"Job Safety Analysis / Job Hazard Analysis", path:"EP > EMS > EMS.03"};
	prodCompObject[1292]={code:"EMS.03.2", name:"Safety Risk Assessment", path:"EP > EMS > EMS.03"};
	prodCompObject[1293]={code:"EMS.04", name:"Ergonomics", path:"EP > EMS"};
	prodCompObject[1294]={code:"EMS.05", name:"BBS (Behavior Based Safety)", path:"EP > EMS"};
	prodCompObject[1295]={code:"EMS.06", name:"Occupational Health", path:"EP > EMS"};
	prodCompObject[1296]={code:"EMS.07", name:"Claims", path:"EP > EMS"};
	prodCompObject[1297]={code:"EMS.03.3", name:"Dashboards & Reports", path:"EP > EMS > EMS.03"};
	prodCompObject[1298]={code:"EMS.05.1", name:"Dashboards & Reports", path:"EP > EMS > EMS.05"};
	prodCompObject[1299]={code:"EMS.07.1", name:"Dashboards & Reports", path:"EP > EMS > EMS.07"};
	prodCompObject[1300]={code:"EMS.04.1", name:"Dashboards & Reports", path:"EP > EMS > EMS.04"};
	prodCompObject[1301]={code:"EMS.06.1", name:"Dashboards & Reports", path:"EP > EMS > EMS.06"};
	prodCompObject[1302]={code:"AP", name:"Action Plans", path:"EP"};
	prodCompObject[1303]={code:"AP.01", name:"Action Plans Management", path:"EP > AP"};
	prodCompObject[1304]={code:"AP.01.1", name:"Action Plans (table)", path:"EP > AP > AP.01"};
	prodCompObject[1305]={code:"AP.01.2", name:"Action Plan Integrations", path:"EP > AP > AP.01"};
	prodCompObject[1319]={code:"AP.02", name:"Action Plan Tasks", path:"EP > AP"};
	prodCompObject[1320]={code:"AP.03", name:"Global Action Plans", path:"EP > AP"};
	prodCompObject[1321]={code:"AP.04", name:"AP Dashboards & Reports", path:"EP > AP"};
	prodCompObject[1326]={code:"AP.01.2.1", name:"AP to ACS integration (Audits)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1327]={code:"AP.01.2.2", name:"AP to CMS integration (Chemical)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1328]={code:"AP.01.2.3", name:"AP to CA integration (Continuous Assessment)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1329]={code:"AP.01.2.4", name:"AP to CSR integration (Corporate Social Responsibility)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1330]={code:"AP.01.2.5", name:"AP to EMS integration (Event Management System)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1331]={code:"AP.01.2.6", name:"AP to IA integration (Internal Audit)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1332]={code:"AP.01.2.7", name:"AP to IC integration (Internal Control)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1333]={code:"AP.01.2.8", name:"AP to MOC integration (Management of Change)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1334]={code:"AP.01.2.9", name:"AP to PROF integration (Proficiency)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1335]={code:"AP.01.2.10", name:"AP to RCM integration (Compliance)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1336]={code:"AP.01.2.11", name:"AP to RM integration (Risk)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1337]={code:"AP.01.2.12", name:"AP to SD integration (Metrics)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1338]={code:"AP.01.2.13", name:"AP to AQS integration (Environmental)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[1339]={code:"TCK", name:"Tracks", path:"Corporate"};
	prodCompObject[1340]={code:"FW", name:"WizFrame & UEx", path:"EP"};
	prodCompObject[1341]={code:"UIR", name:"Classic Interface", path:"EP > FW"};
	prodCompObject[1342]={code:"UIR.1", name:"Header", path:"EP > FW > UIR"};
	prodCompObject[1343]={code:"FW.01.1.1", name:"Black Bar", path:"EP > FW > UIR > UIR.1"};
	prodCompObject[1344]={code:"FW.01.1.2", name:"Customer Header", path:"EP > FW > UIR > UIR.1"};
	prodCompObject[1345]={code:"FW.01.1.3", name:"Quick Bar", path:"EP > FW > UIR > UIR.1"};
	prodCompObject[1346]={code:"FW.01.1.3.1", name:"Com Center", path:"EP > FW > UIR > UIR.1 > FW.01.1.3"};
	prodCompObject[1347]={code:"FW.01.1.3.2", name:"Global Task Manager", path:"EP > FW > UIR > UIR.1 > FW.01.1.3"};
	prodCompObject[1348]={code:"FW.01.1.3.3", name:"Global Calendar", path:"EP > FW > UIR > UIR.1 > FW.01.1.3"};
	prodCompObject[1349]={code:"FW.01.1.3.4", name:"Global Search", path:"EP > FW > UIR > UIR.1 > FW.01.1.3"};
	prodCompObject[1350]={code:"FW.01.1.3.5", name:"Quick Add", path:"EP > FW > UIR > UIR.1 > FW.01.1.3"};
	prodCompObject[1351]={code:"FW.01.1.3.6", name:"User Preferences (Picture)", path:"EP > FW > UIR > UIR.1 > FW.01.1.3"};
	prodCompObject[1352]={code:"UIR.2", name:"Main Menu", path:"EP > FW > UIR"};
	prodCompObject[1353]={code:"FW.01.2.1", name:"Workspace Access (Site Access)", path:"EP > FW > UIR > UIR.2"};
	prodCompObject[1354]={code:"FW.01.2.2", name:"Functional Navigation Workspace (User Menu)", path:"EP > FW > UIR > UIR.2"};
	prodCompObject[1355]={code:"FW.01.2.3", name:"Administration Navigation Workspace (Admin Menu)", path:"EP > FW > UIR > UIR.2"};
	prodCompObject[1356]={code:"UIR.3", name:"Workspace (Core Page)", path:"EP > FW > UIR"};
	prodCompObject[1357]={code:"FW.01.3.1", name:"Smart Bar", path:"EP > FW > UIR > UIR.3"};
	prodCompObject[1358]={code:"FW.01.3.1.1", name:"Advanced Tools", path:"EP > FW > UIR > UIR.3 > FW.01.3.1"};
	prodCompObject[1359]={code:"FW.01.3.1.2", name:"View Controllers (view, search, process, stream)", path:"EP > FW > UIR > UIR.3 > FW.01.3.1"};
	prodCompObject[1360]={code:"FW.01.3.1.3", name:"Quick Filter (filter by)", path:"EP > FW > UIR > UIR.3 > FW.01.3.1"};
	prodCompObject[1361]={code:"FW.01.3.2", name:"Core Page", path:"EP > FW > UIR > UIR.3"};
	prodCompObject[1362]={code:"HO.01.5", name:"Information Sharing", path:"EP > HO > HO.01"};
	prodCompObject[1363]={code:"CMS", name:"Chemical", path:"EP"};
	prodCompObject[1364]={code:"CMS.01", name:"Materials Management", path:"EP > CMS"};
	prodCompObject[1365]={code:"CMS.01.1", name:"Management of Mixtures and Pure Substances", path:"EP > CMS > CMS.01"};
	prodCompObject[1366]={code:"CMS.01.2", name:"Basic Chemical Substances Library", path:"EP > CMS > CMS.01"};
	prodCompObject[1367]={code:"CMS.02", name:"Safety Datasheets", path:"EP > CMS"};
	prodCompObject[1368]={code:"CMS.02.1", name:"Simplified Safety Data sheet Management", path:"EP > CMS > CMS.02"};
	prodCompObject[1369]={code:"CMS.02.2", name:"Use Cases and Exposure scenario", path:"EP > CMS > CMS.02"};
	prodCompObject[1370]={code:"CMS.02.3", name:"Safety Data sheet Authoring", path:"EP > CMS > CMS.02"};
	prodCompObject[1371]={code:"CMS.03", name:"Inventory Management", path:"EP > CMS"};
	prodCompObject[1372]={code:"CMS.03.1", name:"Transaction Management", path:"EP > CMS > CMS.03"};
	prodCompObject[1373]={code:"CMS.03.2", name:"Audit Inventory", path:"EP > CMS > CMS.03"};
	prodCompObject[1374]={code:"CMS.03.3", name:"Container Management", path:"EP > CMS > CMS.03"};
	prodCompObject[1375]={code:"CMS.04", name:"Regulatory Compliance", path:"EP > CMS"};
	prodCompObject[1376]={code:"CMS.04.1", name:"Restricted Substance Lists", path:"EP > CMS > CMS.04"};
	prodCompObject[1377]={code:"CMS.04.2", name:"Chemical Limits", path:"EP > CMS > CMS.04"};
	prodCompObject[1378]={code:"CMS.05", name:"Supply Chain Communication Management", path:"EP > CMS"};
	prodCompObject[1379]={code:"CMS.05.1", name:"Supplier Declaration Portal", path:"EP > CMS > CMS.05"};
	prodCompObject[1380]={code:"CMS.05.2", name:"Progress of Supplier Information Gathering", path:"EP > CMS > CMS.05"};
	prodCompObject[1381]={code:"CMS.06", name:"Parts Management", path:"EP > CMS"};
	prodCompObject[1382]={code:"CMS.06.1", name:"Bill of Materials (BOM)", path:"EP > CMS > CMS.06"};
	prodCompObject[1383]={code:"CMS.06.2", name:"Bill of Substances (BOS)", path:"EP > CMS > CMS.06"};
	prodCompObject[1384]={code:"CMS.07", name:"ChemAdvisor", path:"EP > CMS"};
	prodCompObject[1385]={code:"CMS.07.1", name:"Import Tool", path:"EP > CMS > CMS.07"};
	prodCompObject[1386]={code:"CMS.07.2", name:"Synonyms", path:"EP > CMS > CMS.07"};
	prodCompObject[1387]={code:"CMS.08", name:"3E SDS", path:"EP > CMS"};
	prodCompObject[1388]={code:"CMS.08.1", name:"Status", path:"EP > CMS > CMS.08"};
	prodCompObject[1389]={code:"CMS.08.2", name:"Languages", path:"EP > CMS > CMS.08"};
	prodCompObject[1390]={code:"CMS.08.3", name:"SDS Import", path:"EP > CMS > CMS.08"};
	prodCompObject[1391]={code:"CMS.09", name:"Tier II Chemical Inventory Report", path:"EP > CMS"};
	prodCompObject[1392]={code:"CMS.09.1", name:"Audit Inventory", path:"EP > CMS > CMS.09"};
	prodCompObject[1393]={code:"CMS.09.2", name:"Tier II calculation process", path:"EP > CMS > CMS.09"};
	prodCompObject[1394]={code:"CMS.09.3", name:"Tier II Report table", path:"EP > CMS > CMS.09"};
	prodCompObject[1395]={code:"CMS.10", name:"Regulatory Notifications", path:"EP > CMS"};
	prodCompObject[1396]={code:"CMS.10.1", name:"Export and Import Notices", path:"EP > CMS > CMS.10"};
	prodCompObject[1397]={code:"CMS.10.2", name:"Risks Declarations", path:"EP > CMS > CMS.10"};
	prodCompObject[1398]={code:"CMS.10.3", name:"Allegations", path:"EP > CMS > CMS.10"};
	prodCompObject[1399]={code:"CMS.10.4", name:"Notification Management", path:"EP > CMS > CMS.10"};
	prodCompObject[1400]={code:"CMS.11", name:"REACH Compliance", path:"EP > CMS"};
	prodCompObject[1401]={code:"CMS.11.1", name:"Product Use Case Descriptions", path:"EP > CMS > CMS.11"};
	prodCompObject[1402]={code:"CMS.11.2", name:"REACH Regulations", path:"EP > CMS > CMS.11"};
	prodCompObject[1403]={code:"CMS.11.3", name:"REACH compliance report", path:"EP > CMS > CMS.11"};
	prodCompObject[1404]={code:"CMS.11.4", name:"Supplier REACH status", path:"EP > CMS > CMS.11"};
	prodCompObject[1405]={code:"CMS.11.5", name:"REACH settings [Reference Table Management]", path:"EP > CMS > CMS.11"};
	prodCompObject[1406]={code:"CMS.12", name:"TSCA Compliance", path:"EP > CMS"};
	prodCompObject[1407]={code:"CMS.12.1", name:"Export and Import Notices", path:"EP > CMS > CMS.12"};
	prodCompObject[1408]={code:"CMS.12.2", name:"Risk Declaration", path:"EP > CMS > CMS.12"};
	prodCompObject[1409]={code:"CMS.12.3", name:"Allegations", path:"EP > CMS > CMS.12"};
	prodCompObject[1410]={code:"CMS.12.4", name:"Pre-Manufacture Notice and Significant New Use Notice", path:"EP > CMS > CMS.12"};
	prodCompObject[1411]={code:"CMS.12.5", name:"Reports", path:"EP > CMS > CMS.12"};
	prodCompObject[1412]={code:"CMS.13", name:"Dashboards & Reports", path:"EP > CMS"};
	prodCompObject[1413]={code:"HO.12", name:"Shared Configuration", path:"EP > HO"};
	prodCompObject[1414]={code:"HO.12.1", name:"Global Import", path:"EP > HO > HO.12"};
	prodCompObject[1415]={code:"HO.12.2", name:"Synchronization", path:"EP > HO > HO.12"};
	prodCompObject[1416]={code:"WMS", name:"Waste Management System", path:"EP"};
	prodCompObject[1417]={code:"WMS.01", name:"User Roles", path:"EP > WMS"};
	prodCompObject[1418]={code:"WMS.02", name:"Places and Partners", path:"EP > WMS"};
	prodCompObject[1419]={code:"WMS.02.1", name:"Generators", path:"EP > WMS > WMS.02"};
	prodCompObject[1420]={code:"WMS.02.2", name:"Transporters", path:"EP > WMS > WMS.02"};
	prodCompObject[1421]={code:"WMS.02.3", name:"Disposal Facilities", path:"EP > WMS > WMS.02"};
	prodCompObject[1422]={code:"WMS.02.4", name:"Brokers", path:"EP > WMS > WMS.02"};
	prodCompObject[1423]={code:"WMS.03", name:"Waste Profiles", path:"EP > WMS"};
	prodCompObject[1424]={code:"WMS.04", name:"Inventory", path:"EP > WMS"};
	prodCompObject[1425]={code:"WMS.04.1", name:"Areas", path:"EP > WMS > WMS.04"};
	prodCompObject[1426]={code:"WMS.04.2", name:"Containers", path:"EP > WMS > WMS.04"};
	prodCompObject[1427]={code:"WMS.04.3", name:"Movement history", path:"EP > WMS > WMS.04"};
	prodCompObject[1428]={code:"WMS.05", name:"Shipment and Invoices", path:"EP > WMS"};
	prodCompObject[1429]={code:"WMS.05.1", name:"Invoices", path:"EP > WMS > WMS.05"};
	prodCompObject[1430]={code:"WMS.05.2", name:"Shipments", path:"EP > WMS > WMS.05"};
	prodCompObject[1431]={code:"WMS.05.3", name:"External Shipment", path:"EP > WMS > WMS.05"};
	prodCompObject[1433]={code:"WMS.05.5", name:"PCB Shipments", path:"EP > WMS > WMS.05"};
	prodCompObject[1434]={code:"WMS.05.6", name:"Waste Shipments", path:"EP > WMS > WMS.05"};
	prodCompObject[1435]={code:"WMS.05.7", name:"Recurring Shipments", path:"EP > WMS > WMS.05"};
	prodCompObject[1436]={code:"WMS.05.7.1", name:"Shipment Templates", path:"EP > WMS > WMS.05 > WMS.05.7"};
	prodCompObject[1437]={code:"WMS.05.7.2", name:"Shipment Definition", path:"EP > WMS > WMS.05 > WMS.05.7"};
	prodCompObject[1438]={code:"WMS.06", name:"Compliance", path:"EP > WMS"};
	prodCompObject[1440]={code:"WMS.06.1", name:"Compliance Register", path:"EP > WMS > WMS.06"};
	prodCompObject[1441]={code:"WMS.06.2", name:"Tasks", path:"EP > WMS > WMS.06"};
	prodCompObject[1442]={code:"WMS.06.3", name:"Reporting", path:"EP > WMS > WMS.06"};
	prodCompObject[1443]={code:"WMS.06.3.1", name:"RCRA Hazardous Waste Reports", path:"EP > WMS > WMS.06 > WMS.06.3"};
	prodCompObject[1444]={code:"WMS.06.3.2", name:"Generated Documents", path:"EP > WMS > WMS.06 > WMS.06.3"};
	prodCompObject[1445]={code:"WMS.07", name:"Local Properties", path:"EP > WMS"};
	prodCompObject[1447]={code:"WMS.08", name:"Reports", path:"EP > WMS"};
	prodCompObject[1448]={code:"AQS", name:"Air Quality System", path:"EP"};
	prodCompObject[1449]={code:"AQS.01", name:"User Roles", path:"EP > AQS"};
	prodCompObject[1450]={code:"AQS.02", name:"Inventory", path:"EP > AQS"};
	prodCompObject[1451]={code:"AQS.02.1", name:"Materials Management", path:"EP > AQS > AQS.02"};
	prodCompObject[1452]={code:"AQS.02.1.1", name:"Materials", path:"EP > AQS > AQS.02 > AQS.02.1"};
	prodCompObject[1453]={code:"AQS.02.1.2", name:"Compounds", path:"EP > AQS > AQS.02 > AQS.02.1"};
	prodCompObject[1454]={code:"AQS.02.1.3", name:"Material Property Values", path:"EP > AQS > AQS.02 > AQS.02.1"};
	prodCompObject[1455]={code:"AQS.02.2", name:"Equipment Management", path:"EP > AQS > AQS.02"};
	prodCompObject[1456]={code:"AQS.02.2.1", name:"Equipment", path:"EP > AQS > AQS.02 > AQS.02.2"};
	prodCompObject[1457]={code:"AQS.02.2.2", name:"Equipment Property Values", path:"EP > AQS > AQS.02 > AQS.02.2"};
	prodCompObject[1458]={code:"AQS.02.3", name:"Units Management", path:"EP > AQS > AQS.02"};
	prodCompObject[1459]={code:"AQS.02.3.1", name:"All Environmental Units", path:"EP > AQS > AQS.02 > AQS.02.3"};
	prodCompObject[1460]={code:"AQS.02.3.2", name:"Environmental Units", path:"EP > AQS > AQS.02 > AQS.02.3"};
	prodCompObject[1461]={code:"AQS.02.3.3", name:"Virtual Environmental Units", path:"EP > AQS > AQS.02 > AQS.02.3"};
	prodCompObject[1462]={code:"AQS.03", name:"Scenarios", path:"EP > AQS"};
	prodCompObject[1463]={code:"AQS.03.1", name:"Scenarios", path:"EP > AQS > AQS.03"};
	prodCompObject[1464]={code:"AQS.03.2", name:"Sub Scenarios", path:"EP > AQS > AQS.03"};
	prodCompObject[1466]={code:"AQS.04", name:"Events", path:"EP > AQS"};
	prodCompObject[1467]={code:"AQS.04.1", name:"Environmental Events", path:"EP > AQS > AQS.04"};
	prodCompObject[1468]={code:"AQS.04.2", name:"Events Scheduling", path:"EP > AQS > AQS.04"};
	prodCompObject[1469]={code:"AQS.04.3", name:"Global Events", path:"EP > AQS > AQS.04"};
	prodCompObject[1476]={code:"AQS.05", name:"Data Management", path:"EP > AQS"};
	prodCompObject[1477]={code:"AQS.05.01", name:"Entry Forms", path:"EP > AQS > AQS.05"};
	prodCompObject[1478]={code:"AQS.05.02", name:"Event-Entry Forms", path:"EP > AQS > AQS.05"};
	prodCompObject[1479]={code:"AQS.05.03", name:"Scenario-Entry Forms", path:"EP > AQS > AQS.05"};
	prodCompObject[1480]={code:"AQS.05.04", name:"Data", path:"EP > AQS > AQS.05"};
	prodCompObject[1481]={code:"AQS.05.05", name:"Measured Data", path:"EP > AQS > AQS.05"};
	prodCompObject[1483]={code:"AQS.05.07", name:"Simulated Data", path:"EP > AQS > AQS.05"};
	prodCompObject[1484]={code:"AQS.05.08", name:"Forecast Data", path:"EP > AQS > AQS.05"};
	prodCompObject[1485]={code:"AQS.05.09", name:"Samples", path:"EP > AQS > AQS.05"};
	prodCompObject[1486]={code:"AQS.05.10", name:"Sample Data", path:"EP > AQS > AQS.05"};
	prodCompObject[1487]={code:"AQS.05.11", name:"Alerts", path:"EP > AQS > AQS.05"};
	prodCompObject[1488]={code:"AQS.05.11.1", name:"Alert Definitions", path:"EP > AQS > AQS.05 > AQS.05.11"};
	prodCompObject[1490]={code:"AQS.05.12", name:"Calculation Engine", path:"EP > AQS > AQS.05"};
	prodCompObject[1491]={code:"AQS.05.12.1", name:"Deployment Log", path:"EP > AQS > AQS.05 > AQS.05.12"};
	prodCompObject[1492]={code:"AQS.05.12.2", name:"Cancel Requests", path:"EP > AQS > AQS.05 > AQS.05.12"};
	prodCompObject[1493]={code:"AQS.05.12.3", name:"Calculation Log Error", path:"EP > AQS > AQS.05 > AQS.05.12"};
	prodCompObject[1495]={code:"AQS.05.13", name:"Environmental MTQ", path:"EP > AQS > AQS.05"};
	prodCompObject[1496]={code:"AQS.06", name:"Data Integration", path:"EP > AQS"};
	prodCompObject[1497]={code:"AQS.06.1", name:"Data Sources", path:"EP > AQS > AQS.06"};
	prodCompObject[1502]={code:"AQS.06.2", name:"Data Mapping", path:"EP > AQS > AQS.06"};
	prodCompObject[1507]={code:"AQS.06.4", name:"Data Buffer", path:"EP > AQS > AQS.06"};
	prodCompObject[1529]={code:"AQS.07", name:"Sampling", path:"EP > AQS"};
	prodCompObject[1530]={code:"AQS.07.1", name:"Chain of Custody", path:"EP > AQS > AQS.07"};
	prodCompObject[1531]={code:"AQS.07.2", name:"Samples", path:"EP > AQS > AQS.07"};
	prodCompObject[1532]={code:"AQS.07.3", name:"Sample Results", path:"EP > AQS > AQS.07"};
	prodCompObject[1533]={code:"AQS.07.4", name:"Sample Templates", path:"EP > AQS > AQS.07"};
	prodCompObject[1534]={code:"AQS.07.7", name:"Methods", path:"EP > AQS > AQS.07"};
	prodCompObject[1535]={code:"AQS.08", name:"Compliance", path:"EP > AQS"};
	prodCompObject[1536]={code:"AQS.08.1", name:"Compliance Strategy", path:"EP > AQS > AQS.08"};
	prodCompObject[1537]={code:"AQS.08.1.1", name:"Requirements", path:"EP > AQS > AQS.08 > AQS.08.1"};
	prodCompObject[1538]={code:"AQS.08.2", name:"Unit Assignment", path:"EP > AQS > AQS.08"};
	prodCompObject[1539]={code:"AQS.08.2.1", name:"[deprecated] Unit Assignment Matrix (Site Access only)", path:"EP > AQS > AQS.08 > AQS.08.2"};
	prodCompObject[1540]={code:"AQS.08.3", name:"Compliance Tasks", path:"EP > AQS > AQS.08"};
	prodCompObject[1541]={code:"AQS.08.3.1", name:"Task Definitions", path:"EP > AQS > AQS.08 > AQS.08.3"};
	prodCompObject[1542]={code:"AQS.08.3.2", name:"Alert Definitions", path:"EP > AQS > AQS.08 > AQS.08.3"};
	prodCompObject[1543]={code:"AQS.08.3.3", name:"Compliance Tasks", path:"EP > AQS > AQS.08 > AQS.08.3"};
	prodCompObject[1544]={code:"AQS.08.4", name:"Compliance Limits", path:"EP > AQS > AQS.08"};
	prodCompObject[1545]={code:"AQS.08.4.1", name:"[deprecated] Compliance Limits", path:"EP > AQS > AQS.08 > AQS.08.4"};
	prodCompObject[1546]={code:"AQS.08.5", name:"Compliance Watch", path:"EP > AQS > AQS.08"};
	prodCompObject[1548]={code:"AQS.09", name:"Tanks Management", path:"EP > AQS"};
	prodCompObject[1549]={code:"AQS.09.1", name:"Templates", path:"EP > AQS > AQS.09"};
	prodCompObject[1550]={code:"AQS.09.1.1", name:"Tank Templates", path:"EP > AQS > AQS.09 > AQS.09.1"};
	prodCompObject[1551]={code:"AQS.09.2", name:"Equipment", path:"EP > AQS > AQS.09"};
	prodCompObject[1552]={code:"AQS.09.2.1", name:"Equipment", path:"EP > AQS > AQS.09 > AQS.09.2"};
	prodCompObject[1553]={code:"AQS.09.2.2", name:"Characteristics", path:"EP > AQS > AQS.09 > AQS.09.2"};
	prodCompObject[1554]={code:"AQS.10", name:"Templates Library", path:"EP > AQS"};
	prodCompObject[1555]={code:"AQS.10.01", name:"Material Templates", path:"EP > AQS > AQS.10"};
	prodCompObject[1556]={code:"AQS.10.02", name:"Material Property Definitions", path:"EP > AQS > AQS.10"};
	prodCompObject[1557]={code:"AQS.10.03", name:"Equipment Templates", path:"EP > AQS > AQS.10"};
	prodCompObject[1558]={code:"AQS.10.04", name:"Equipment Property Definitions", path:"EP > AQS > AQS.10"};
	prodCompObject[1559]={code:"AQS.10.05", name:"Unit and Event Templates", path:"EP > AQS > AQS.10"};
	prodCompObject[1560]={code:"AQS.10.06", name:"Unit Templates", path:"EP > AQS > AQS.10"};
	prodCompObject[1561]={code:"AQS.10.07", name:"Virtual Unit Templates", path:"EP > AQS > AQS.10"};
	prodCompObject[1562]={code:"AQS.10.08", name:"Event Templates", path:"EP > AQS > AQS.10"};
	prodCompObject[1563]={code:"AQS.10.09", name:"Global Event Templates", path:"EP > AQS > AQS.10"};
	prodCompObject[1564]={code:"AQS.10.10", name:"Parameters", path:"EP > AQS > AQS.10"};
	prodCompObject[1565]={code:"AQS.10.11", name:"Formula History", path:"EP > AQS > AQS.10"};
	prodCompObject[1566]={code:"AQS.10.12", name:"Formula Builder", path:"EP > AQS > AQS.10"};
	prodCompObject[1567]={code:"AQS.11", name:"Emission Factors", path:"EP > AQS"};
	prodCompObject[1568]={code:"AQS.11.1", name:"All Protocols", path:"EP > AQS > AQS.11"};
	prodCompObject[1569]={code:"AQS.11.2", name:"Standard Protocols", path:"EP > AQS > AQS.11"};
	prodCompObject[1570]={code:"AQS.11.3", name:"My Protocols", path:"EP > AQS > AQS.11"};
	prodCompObject[1571]={code:"AQS.11.4", name:"Emission Factors", path:"EP > AQS > AQS.11"};
	prodCompObject[1572]={code:"PY", name:"Insurance Policy Management", path:"EP"};
	prodCompObject[1573]={code:"PY.01", name:"Program Management", path:"EP > PY"};
	prodCompObject[1575]={code:"PY.02", name:"Current policies", path:"EP > PY"};
	prodCompObject[1576]={code:"PY.03", name:"Achived policies", path:"EP > PY"};
	prodCompObject[1577]={code:"PY.04", name:"Coverages", path:"EP > PY"};
	prodCompObject[1578]={code:"PY.05", name:"Insurance premium", path:"EP > PY"};
	prodCompObject[1579]={code:"PY.06", name:"Dashboards & Reports", path:"EP > PY"};
	prodCompObject[1580]={code:"CLA", name:"Claims", path:"EP"};
	prodCompObject[1581]={code:"CLA.01", name:"Claims", path:"EP > CLA"};
	prodCompObject[1582]={code:"CLA.02", name:"Transactions", path:"EP > CLA"};
	prodCompObject[1583]={code:"CLA.03", name:"Dashboards & Reports", path:"EP > CLA"};
	prodCompObject[1584]={code:"FW.02", name:"Page Library", path:"EP > FW"};
	prodCompObject[1585]={code:"CA", name:"Continuous Assessment", path:"EP"};
	prodCompObject[1588]={code:"CA.03", name:"Assessment Module (contribution)", path:"EP > CA"};
	prodCompObject[1589]={code:"CA.03.1", name:"Working Papers", path:"EP > CA > CA.03"};
	prodCompObject[1590]={code:"CA.03.2", name:"Control Items", path:"EP > CA > CA.03"};
	prodCompObject[1591]={code:"CA.03.3", name:"Issues", path:"EP > CA > CA.03"};
	prodCompObject[1592]={code:"CA.03.4", name:"Custom Task List", path:"EP > CA > CA.03"};
	prodCompObject[1593]={code:"CA.03.5", name:"Testing Sheet", path:"EP > CA > CA.03"};
	prodCompObject[1594]={code:"CA.03.6", name:"Excel Offline", path:"EP > CA > CA.03"};
	prodCompObject[1595]={code:"CA.04", name:"Dashboards & Reports", path:"EP > CA"};
	prodCompObject[1597]={code:"CA.01", name:"Functional Structure", path:"EP > CA"};
	prodCompObject[1598]={code:"CA.01.1", name:"Processes", path:"EP > CA > CA.01"};
	prodCompObject[1599]={code:"CA.01.2", name:"Risks", path:"EP > CA > CA.01"};
	prodCompObject[1600]={code:"CA.01.3", name:"Generic Controls", path:"EP > CA > CA.01"};
	prodCompObject[1601]={code:"CA.02", name:"Control Plans", path:"EP > CA"};
	prodCompObject[1602]={code:"CA.02.1", name:"Local Control Management and Schedule", path:"EP > CA > CA.02"};
	prodCompObject[1603]={code:"CA.02.2", name:"Control Delegation by a Shared Service Center", path:"EP > CA > CA.02"};
	prodCompObject[1604]={code:"IA", name:"Internal Audit", path:"EP"};
	prodCompObject[1605]={code:"IA.01", name:"Functional Structure", path:"EP > IA"};
	prodCompObject[1606]={code:"IA.01.1", name:"Audit Services", path:"EP > IA > IA.01"};
	prodCompObject[1607]={code:"IA.01.2", name:"Processes", path:"EP > IA > IA.01"};
	prodCompObject[1608]={code:"IA.01.3", name:"Audit Items", path:"EP > IA > IA.01"};
	prodCompObject[1609]={code:"IA.01.4", name:"Risks", path:"EP > IA > IA.01"};
	prodCompObject[1610]={code:"IA.01.5", name:"Audit Reference Data", path:"EP > IA > IA.01"};
	prodCompObject[1611]={code:"IA.02", name:"Audit Plan", path:"EP > IA"};
	prodCompObject[1612]={code:"IA.03", name:"Risk Based Auditing", path:"EP > IA"};
	prodCompObject[1613]={code:"IA.04", name:"Audit Execution", path:"EP > IA"};
	prodCompObject[1614]={code:"IA.05", name:"Recommendations", path:"EP > IA"};
	prodCompObject[1615]={code:"IA.06", name:"Audit Work Archives", path:"EP > IA"};
	prodCompObject[1616]={code:"IA.07", name:"Skills Assessment", path:"EP > IA"};
	prodCompObject[1617]={code:"IA.08", name:"Auditor Personal Space", path:"EP > IA"};
	prodCompObject[1618]={code:"IA.08.1", name:"Auditor Card", path:"EP > IA > IA.08"};
	prodCompObject[1619]={code:"IA.08.2", name:"Expense Sheets", path:"EP > IA > IA.08"};
	prodCompObject[1620]={code:"IA.08.3", name:"Timesheets", path:"EP > IA > IA.08"};
	prodCompObject[1621]={code:"IA.09", name:"Pre and Post Audit Surveys", path:"EP > IA"};
	prodCompObject[1622]={code:"IA.10", name:"Dashboards & Reports", path:"EP > IA"};
	prodCompObject[1623]={code:"IA.11", name:"Offline Fat Client", path:"EP > IA"};
	prodCompObject[1624]={code:"IC", name:"Internal Control", path:"EP"};
	prodCompObject[1625]={code:"IC.01", name:"Group Controls", path:"EP > IC"};
	prodCompObject[1626]={code:"IC.02", name:"Local Controls", path:"EP > IC"};
	prodCompObject[1627]={code:"IC.03", name:"Campaign management", path:"EP > IC"};
	prodCompObject[1628]={code:"IC.03.1", name:"Updater", path:"EP > IC > IC.03"};
	prodCompObject[1629]={code:"IC.03.2", name:"Testing Campaigns", path:"EP > IC > IC.03"};
	prodCompObject[1630]={code:"IC.03.3", name:"Control Delegation by a Shared Service Center", path:"EP > IC > IC.03"};
	prodCompObject[1631]={code:"IC.03.4", name:"User Network", path:"EP > IC > IC.03"};
	prodCompObject[1632]={code:"IC.04", name:"Assessment module (contribution)", path:"EP > IC"};
	prodCompObject[1633]={code:"IC.04.1", name:"Assessment Input", path:"EP > IC > IC.04"};
	prodCompObject[1634]={code:"IC.04.1.1", name:"Questionnaires", path:"EP > IC > IC.04 > IC.04.1"};
	prodCompObject[1635]={code:"IC.04.1.2", name:"Site Library", path:"EP > IC > IC.04 > IC.04.1"};
	prodCompObject[1636]={code:"IC.04.2", name:"Follow Up", path:"EP > IC > IC.04"};
	prodCompObject[1637]={code:"IC.04.3", name:"Audit", path:"EP > IC > IC.04"};
	prodCompObject[1638]={code:"IC.05", name:"Dashboards & Reports", path:"EP > IC"};
	prodCompObject[1639]={code:"BCM", name:"Business Continuity Management", path:"EP"};
	prodCompObject[1641]={code:"BCM.02", name:"Incident Management", path:"EP > BCM"};
	prodCompObject[1643]={code:"BCM.01", name:"Business Continuity Plans", path:"EP > BCM"};
	prodCompObject[1646]={code:"BCM.01.1", name:"Business Continuity Plans (BCPs)", path:"EP > BCM > BCM.01"};
	prodCompObject[1647]={code:"BCM.01.2", name:"Crisis Management", path:"EP > BCM > BCM.01"};
	prodCompObject[1648]={code:"BCM.01.3", name:"Crisis Communication Module", path:"EP > BCM > BCM.01"};
	prodCompObject[1649]={code:"BCM.01.4", name:"Dashboards & Reports", path:"EP > BCM > BCM.01"};
	prodCompObject[1651]={code:"BCM.02.1", name:"Incident Tracking", path:"EP > BCM > BCM.02"};
	prodCompObject[1653]={code:"FW.02.1", name:"Layout", path:"EP > FW > FW.02"};
	prodCompObject[1654]={code:"FW.02.2", name:"News", path:"EP > FW > FW.02"};
	prodCompObject[1655]={code:"FW.02.3", name:"Audit Trail", path:"EP > FW > FW.02"};
	prodCompObject[1656]={code:"FW.02.4", name:"Shared Functions", path:"EP > FW > FW.02"};
	prodCompObject[1657]={code:"FW.03", name:"Reports", path:"EP > FW"};
	prodCompObject[1659]={code:"FW.05", name:"Templates", path:"EP > FW"};
	prodCompObject[1660]={code:"FW.02.5", name:"Icons", path:"EP > FW > FW.02"};
	prodCompObject[1666]={code:"AQS.06.5", name:"Archiving Rules", path:"EP > AQS > AQS.06"};
	prodCompObject[1667]={code:"ACS", name:"Audit and Compliance System", path:"EP"};
	prodCompObject[1668]={code:"AQS.06.2.1", name:"Material Property Data Mapping", path:"EP > AQS > AQS.06 > AQS.06.2"};
	prodCompObject[1669]={code:"ACS.09", name:"ACS User Roles", path:"EP > ACS"};
	prodCompObject[1670]={code:"AQS.06.2.2", name:"Material Composition Data Mapping", path:"EP > AQS > AQS.06 > AQS.06.2"};
	prodCompObject[1671]={code:"ACS.01", name:"Assessment", path:"EP > ACS"};
	prodCompObject[1672]={code:"AQS.06.2.3", name:"Equipment Property Data Mapping", path:"EP > AQS > AQS.06 > AQS.06.2"};
	prodCompObject[1673]={code:"AQS.06.2.4", name:"Parameter Data Mapping", path:"EP > AQS > AQS.06 > AQS.06.2"};
	prodCompObject[1674]={code:"ACS.01.2", name:"Assessment Manager", path:"EP > ACS > ACS.01"};
	prodCompObject[1675]={code:"xxx", name:"[Deprecated]", path:"EP > ACS > ACS.01"};
	prodCompObject[1677]={code:"ACS.01.4", name:"Expenses & Fees", path:"EP > ACS > ACS.01"};
	prodCompObject[1680]={code:"AQS.06.4.1", name:"Material Property Data Buffer", path:"EP > AQS > AQS.06 > AQS.06.4"};
	prodCompObject[1681]={code:"AQS.06.4.2", name:"Material Composition Data Buffer", path:"EP > AQS > AQS.06 > AQS.06.4"};
	prodCompObject[1682]={code:"AQS.06.4.3", name:"Equipment Property Data Buffer", path:"EP > AQS > AQS.06 > AQS.06.4"};
	prodCompObject[1683]={code:"ACS.02", name:"Follow Up", path:"EP > ACS"};
	prodCompObject[1684]={code:"AQS.06.4.4", name:"Parameter Data Buffer", path:"EP > AQS > AQS.06 > AQS.06.4"};
	prodCompObject[1685]={code:"ACS.02.1", name:"Assessment Results", path:"EP > ACS > ACS.02"};
	prodCompObject[1686]={code:"AQS.06.4.5", name:"Parameter Data Archive", path:"EP > AQS > AQS.06 > AQS.06.4"};
	prodCompObject[1687]={code:"ACS.02.2", name:"Findings", path:"EP > ACS > ACS.02"};
	prodCompObject[1688]={code:"ACS.02.3", name:"Action Plans", path:"EP > ACS > ACS.02"};
	prodCompObject[1689]={code:"AQS.07.8", name:"Settings", path:"EP > AQS > AQS.07"};
	prodCompObject[1690]={code:"AQS.07.6.1", name:"Reasons for Sampling", path:"EP > AQS > AQS.07 > AQS.07.8"};
	prodCompObject[1691]={code:"AQS.07.6.2", name:"Sample Types", path:"EP > AQS > AQS.07 > AQS.07.8"};
	prodCompObject[1692]={code:"AQS.07.6.3", name:"Analyte Qualifiers", path:"EP > AQS > AQS.07 > AQS.07.8"};
	prodCompObject[1693]={code:"AQS.07.6.4", name:"Sample Qualifiers", path:"EP > AQS > AQS.07 > AQS.07.8"};
	prodCompObject[1694]={code:"AQS.07.6.5", name:"Sample Media", path:"EP > AQS > AQS.07 > AQS.07.8"};
	prodCompObject[1695]={code:"AQS.07.6.6", name:"NODI Codes", path:"EP > AQS > AQS.07 > AQS.07.8"};
	prodCompObject[1696]={code:"AQS.07.6.7", name:"Reported Sample Frequencies", path:"EP > AQS > AQS.07 > AQS.07.8"};
	prodCompObject[1697]={code:"ACS.02.4", name:"Causes", path:"EP > ACS > ACS.02"};
	prodCompObject[1701]={code:"ACS.03", name:"Questions", path:"EP > ACS"};
	prodCompObject[1702]={code:"ACS.03.1", name:"Questions", path:"EP > ACS > ACS.03"};
	prodCompObject[1703]={code:"ACS.03.3", name:"Standards and Norms", path:"EP > ACS > ACS.03"};
	prodCompObject[1705]={code:"ACS.03.4", name:"Legal Register", path:"EP > ACS > ACS.03"};
	prodCompObject[1706]={code:"ACS.03.5", name:"Version Tool", path:"EP > ACS > ACS.03"};
	prodCompObject[1707]={code:"xxxxx", name:"[Deprecated]", path:"EP > ACS > ACS.03 > ACS.03.5"};
	prodCompObject[1708]={code:"xxxxxx", name:"[Deprecated]", path:"EP > ACS > ACS.03 > ACS.03.5"};
	prodCompObject[1709]={code:"ACS.04", name:"Content Providers", path:"EP > ACS"};
	prodCompObject[1714]={code:"ACS.05", name:"Inspection Management", path:"EP > ACS"};
	prodCompObject[1715]={code:"ACS.05.1", name:"Inspections", path:"EP > ACS > ACS.05"};
	prodCompObject[1716]={code:"ACS.05.2", name:"Checklists", path:"EP > ACS > ACS.05"};
	prodCompObject[1717]={code:"ACS.05.3", name:"Observations", path:"EP > ACS > ACS.05"};
	prodCompObject[1718]={code:"ACS.05.4", name:"Checklist Definitions", path:"EP > ACS > ACS.05"};
	prodCompObject[1719]={code:"xxxxxxxxx", name:"[Deprecated]", path:"EP > ACS > ACS.05 > ACS.05.4"};
	prodCompObject[1722]={code:"ACS.05.7", name:"Inspection Definitions", path:"EP > ACS > ACS.05"};
	prodCompObject[1723]={code:"xxxxxxx", name:"[Deprecated]", path:"EP > ACS > ACS.05 > ACS.05.7"};
	prodCompObject[1724]={code:"ACS.05.8", name:"Action Plans", path:"EP > ACS > ACS.05"};
	prodCompObject[1725]={code:"xxxxxxxx", name:"[Deprecated]", path:"EP > ACS > ACS.05 > ACS.05.8"};
	prodCompObject[1730]={code:"xxxxxxxxxxxxx", name:"[Deprecated]", path:"EP > ACS"};
	prodCompObject[1731]={code:"xxxxxxxxxx", name:"[Deprecated]", path:"EP > ACS > xxxxxxxxxxxxx"};
	prodCompObject[1734]={code:"xxxxxxxxxxxx", name:"[Deprecated]", path:"EP > ACS > xxxxxxxxxxxxx"};
	prodCompObject[1736]={code:"xxxxxxxxxxx", name:"[Deprecated]", path:"EP > ACS > xxxxxxxxxxxxx > xxxxxxxxxxxx"};
	prodCompObject[1741]={code:"ACS.06", name:"ACS Reports", path:"EP > ACS"};
	prodCompObject[1742]={code:"ACS.07", name:"ACS Dashboards", path:"EP > ACS"};
	prodCompObject[1743]={code:"RCM", name:"Regulatory Compliance System", path:"EP"};
	prodCompObject[1744]={code:"RCM.01", name:"Generic Functions", path:"EP > RCM"};
	prodCompObject[1745]={code:"RCM.02", name:"User Roles", path:"EP > RCM"};
	prodCompObject[1746]={code:"RCM.03", name:"Compliance Registers", path:"EP > RCM"};
	prodCompObject[1747]={code:"RCM.03.0", name:"Compliance Register", path:"EP > RCM > RCM.03"};
	prodCompObject[1748]={code:"RCM.03.1", name:"Regulations", path:"EP > RCM > RCM.03"};
	prodCompObject[1749]={code:"zzz", name:"[Deprecated]", path:"EP > RCM > RCM.03 > RCM.03.1"};
	prodCompObject[1750]={code:"zzzz", name:"[Deprecated]", path:"EP > RCM > RCM.03 > RCM.03.1"};
	prodCompObject[1752]={code:"RCM.03.4", name:"Permits", path:"EP > RCM > RCM.03"};
	prodCompObject[1753]={code:"yy", name:"[Deprecated]", path:"EP > RCM > RCM.03 > RCM.03.4"};
	prodCompObject[1754]={code:"zz", name:"[Deprecated]", path:"EP > RCM > RCM.03 > RCM.03.4"};
	prodCompObject[1755]={code:"TCK.01", name:"Requirement Management", path:"Corporate > TCK"};
	prodCompObject[1756]={code:"TCK.02", name:"Action Item Management", path:"Corporate > TCK"};
	prodCompObject[1757]={code:"TCK.03", name:"Test Case Management", path:"Corporate > TCK"};
	prodCompObject[1758]={code:"TCK.04", name:"Release Management", path:"Corporate > TCK"};
	prodCompObject[1759]={code:"TCK.05", name:"Change Request Management", path:"Corporate > TCK"};
	prodCompObject[1760]={code:"TCK.06", name:"Resource Management", path:"Corporate > TCK"};
	prodCompObject[1761]={code:"TCK.07", name:"Time Manager", path:"Corporate > TCK"};
	prodCompObject[1762]={code:"RCM.03.6", name:"Policies", path:"EP > RCM > RCM.03"};
	prodCompObject[1763]={code:"y", name:"[Deprecated]", path:"EP > RCM > RCM.03 > RCM.03.6"};
	prodCompObject[1764]={code:"z", name:"[Deprecated]", path:"EP > RCM > RCM.03 > RCM.03.6"};
	prodCompObject[1766]={code:"RCM.04", name:"Compliance Strategy", path:"EP > RCM"};
	prodCompObject[1767]={code:"RCM.04.1", name:"Requirements", path:"EP > RCM > RCM.04"};
	prodCompObject[1770]={code:"RCM.04.4", name:"Site Level Applicability", path:"EP > RCM > RCM.04"};
	prodCompObject[1771]={code:"zzzzz", name:"[Deprecated]", path:"EP > RCM > RCM.04 > RCM.04.4"};
	prodCompObject[1772]={code:"RCM.05", name:"Compliance Tasks", path:"EP > RCM"};
	prodCompObject[1773]={code:"RCM.05.1", name:"Task Definitions", path:"EP > RCM > RCM.05"};
	prodCompObject[1774]={code:"RCM.05.2", name:"Alert Definitions", path:"EP > RCM > RCM.05"};
	prodCompObject[1775]={code:"RCM.05.3", name:"Tasks", path:"EP > RCM > RCM.05"};
	prodCompObject[1776]={code:"RCM.06", name:"Compliance Watch", path:"EP > RCM"};
	prodCompObject[1777]={code:"RCM.06.1", name:"Compliance Watch", path:"EP > RCM > RCM.06"};
	prodCompObject[1778]={code:"RCM.06.2", name:"Causes", path:"EP > RCM > RCM.06"};
	prodCompObject[1779]={code:"RCM.06.3", name:"Enforcement Actions", path:"EP > RCM > RCM.06"};
	prodCompObject[1780]={code:"Xxxx", name:"[Deprecated]", path:"EP > RCM > RCM.06 > RCM.06.3"};
	prodCompObject[1781]={code:"RCM.07", name:"Action Plans", path:"EP > RCM"};
	prodCompObject[1782]={code:"RCM.07.1", name:"Action Plans", path:"EP > RCM > RCM.07"};
	prodCompObject[1783]={code:"RCM.07.2", name:"Action Plans Tasks", path:"EP > RCM > RCM.07"};
	prodCompObject[1784]={code:"RCM.08", name:"Content Provider", path:"EP > RCM"};
	prodCompObject[1785]={code:"RCM.08.1", name:"Enhesa", path:"EP > RCM > RCM.08"};
	prodCompObject[1786]={code:"RCM.08.2", name:"Regscan", path:"EP > RCM > RCM.08"};
	prodCompObject[1787]={code:"RCM.09", name:"RCM Reports", path:"EP > RCM"};
	prodCompObject[1790]={code:"X", name:"[Deprecated]", path:"EP > RCM > RCM.09"};
	prodCompObject[1792]={code:"XX", name:"[Deprecated]", path:"EP > RCM > RCM.09"};
	prodCompObject[1793]={code:"RCM.10", name:"RCM Dashboards", path:"EP > RCM"};
	prodCompObject[1794]={code:"EMS.08", name:"Mobility", path:"EP > EMS"};
	prodCompObject[1795]={code:"ACS.08", name:"Mobility", path:"EP > ACS"};
	prodCompObject[1796]={code:"FW.06", name:"Adaptive", path:"EP > FW"};
	prodCompObject[1797]={code:"RM", name:"Risk Management", path:"EP"};
	prodCompObject[1798]={code:"RM.01", name:"Risk Management", path:"EP > RM"};
	prodCompObject[1799]={code:"RM.01.1", name:"Risk Register", path:"EP > RM > RM.01"};
	prodCompObject[1800]={code:"RM.01.2", name:"Risk Assessment", path:"EP > RM > RM.01"};
	prodCompObject[1801]={code:"RM.01.3", name:"Assessment Follow-up", path:"EP > RM > RM.01"};
	prodCompObject[1802]={code:"RM.01.4", name:"Controls management", path:"EP > RM > RM.01"};
	prodCompObject[1803]={code:"RM.01.5", name:"Risk Proposal", path:"EP > RM > RM.01"};
	prodCompObject[1804]={code:"RM.01.6", name:"Risk Portfolio", path:"EP > RM > RM.01"};
	prodCompObject[1805]={code:"RM.01.7", name:"Bow Tie Analysis", path:"EP > RM > RM.01"};
	prodCompObject[1806]={code:"RM.02", name:"Incident Management", path:"EP > RM"};
	prodCompObject[1807]={code:"RM.03", name:"Interviews Management", path:"EP > RM"};
	prodCompObject[1808]={code:"RM.04", name:"Risk Evaluation Campaign", path:"EP > RM"};
	prodCompObject[1809]={code:"RM.05", name:"Project Risk Management", path:"EP > RM"};
	prodCompObject[1810]={code:"RM.06", name:"Key Risk Indicators (KRIs)", path:"EP > RM"};
	prodCompObject[1811]={code:"RM.07", name:"Delegation Management", path:"EP > RM"};
	prodCompObject[1812]={code:"RM.08", name:"Dashboards & Reports", path:"EP > RM"};
	prodCompObject[1813]={code:"ACS.04.1", name:"Enhesa", path:"EP > ACS > ACS.04"};
	prodCompObject[1814]={code:"ACS.04.2", name:"RegScan", path:"EP > ACS > ACS.04"};
	prodCompObject[1815]={code:"ACS.04.3", name:"STP", path:"EP > ACS > ACS.04"};
	prodCompObject[1816]={code:"TRI", name:"Toxic Release Inventory", path:"EP"};
	prodCompObject[1817]={code:"TRI.01", name:"Reporting Sites", path:"EP > TRI"};
	prodCompObject[1818]={code:"TRI.02", name:"Form - Rs", path:"EP > TRI"};
	prodCompObject[1819]={code:"TRI.03", name:"Schedule 1", path:"EP > TRI"};
	prodCompObject[1820]={code:"AQS.02.1.1.1", name:"Material Property Data Entry Form", path:"EP > AQS > AQS.02 > AQS.02.1 > AQS.02.1.1"};
	prodCompObject[1821]={code:"AQS.02.2.1.1", name:"Equipment Property Data Entry Form", path:"EP > AQS > AQS.02 > AQS.02.2 > AQS.02.2.1"};
	prodCompObject[1822]={code:"AQS.10.04.1", name:"EPD Formula Builder", path:"EP > AQS > AQS.10 > AQS.10.04"};
	prodCompObject[1824]={code:"AQS.12", name:"AQS Reports", path:"EP > AQS"};
	prodCompObject[1825]={code:"AQS.10.02.1", name:"MPD Formula Builder", path:"EP > AQS > AQS.10 > AQS.10.02"};
	prodCompObject[1826]={code:"AQS.06.1.1", name:"ODBC", path:"EP > AQS > AQS.06 > AQS.06.1"};
	prodCompObject[1827]={code:"AQS.06.1.2", name:"Process Historian (PI)", path:"EP > AQS > AQS.06 > AQS.06.1"};
	prodCompObject[1828]={code:"EMS.03.4", name:"Integrations", path:"EP > EMS > EMS.03"};
	prodCompObject[1829]={code:"EMS.03.4.1", name:"RCM", path:"EP > EMS > EMS.03 > EMS.03.4"};
	prodCompObject[1830]={code:"WMS.05.4", name:"BSD Shipments", path:"EP > WMS > WMS.05"};
	prodCompObject[1831]={code:"ACS.02.5", name:"Input Forms", path:"EP > ACS > ACS.02"};
	prodCompObject[1832]={code:"ACS.03.2", name:"Guidance", path:"EP > ACS > ACS.03"};
	prodCompObject[1833]={code:"AQS.13", name:"Multi-Server", path:"EP > AQS"};
	prodCompObject[1834]={code:"AQS.14", name:"Water", path:"EP > AQS"};
	prodCompObject[1835]={code:"SW-USERS", name:"Users Management", path:"Corporate > SW"};
	prodCompObject[1836]={code:"SW-PROJECTS", name:"Projects Management", path:"Corporate > SW"};
	prodCompObject[1837]={code:"SW-CUSTOMPRJCTS", name:"Customer Projects", path:"Corporate > SW > SW-PROJECTS"};
	prodCompObject[1838]={code:"SW-WEBSERVICES", name:"Web services Helpdesk/Software", path:"Corporate > SW > SW-PROJECTS"};
	prodCompObject[1839]={code:"SW-CAPITALIZATION", name:"Capitalization", path:"Corporate > SW > SW-PROJECTS"};
	prodCompObject[1840]={code:"SW-LIBRARY", name:"Documents Library", path:"Corporate > SW"};
	prodCompObject[1841]={code:"SW-REPORTS", name:"Reports Management", path:"Corporate > SW"};
	prodCompObject[1842]={code:"SW-REPORTLIBRARY", name:"Report Library", path:"Corporate > SW > SW-REPORTS"};
	prodCompObject[1843]={code:"SW-REPORTFACTORY", name:"Report Factory", path:"Corporate > SW > SW-REPORTS"};
	prodCompObject[1844]={code:"SW-VERSIONS", name:"Versions Management", path:"Corporate > SW"};
	prodCompObject[1845]={code:"RCM.04.2", name:"Task Templates", path:"EP > RCM > RCM.04"};
	prodCompObject[1846]={code:"RCM.04.3", name:"Alert Templates", path:"EP > RCM > RCM.04"};
	prodCompObject[1847]={code:"SW-RELEASES", name:"Releases Management", path:"Corporate > SW"};
	prodCompObject[1848]={code:"SW-REVIEW", name:"Project Review", path:"Corporate > SW > SW-PROJECTS"};
	prodCompObject[1849]={code:"SW-CONTENTMGMT", name:"Content Management", path:"Corporate > SW"};
	prodCompObject[1850]={code:"SW-SECURITY", name:"Security", path:"Corporate > SW"};
	prodCompObject[1851]={code:"SW-UX", name:"UX", path:"Corporate > SW"};
	prodCompObject[1852]={code:"SW-INNO", name:"Innovation", path:"Corporate > SW"};
	prodCompObject[1853]={code:"SW-ADMIN", name:"Administration", path:"Corporate > SW"};
	prodCompObject[1854]={code:"INCIDENTS", name:"Incidents", path:"Corporate > SW"};
	prodCompObject[1855]={code:"MoC", name:"Management of Change", path:"EP"};
	prodCompObject[1856]={code:"MoC.01", name:"Initiation", path:"EP > MoC"};
	prodCompObject[1857]={code:"MoC.02", name:"Analysis", path:"EP > MoC"};
	prodCompObject[1858]={code:"MoC.03", name:"Implementation & Follow Up", path:"EP > MoC"};
	prodCompObject[1859]={code:"MoC.04", name:"Reports", path:"EP > MoC"};
	prodCompObject[1860]={code:"MoC.05", name:"User Roles", path:"EP > MoC"};
	prodCompObject[1861]={code:"MoC.1.1", name:"Change Register", path:"EP > MoC > MoC.01"};
	prodCompObject[1862]={code:"MoC.1.2", name:"Global Change Register", path:"EP > MoC > MoC.01"};
	prodCompObject[1863]={code:"MoC.2.1", name:"Impacted Resources", path:"EP > MoC > MoC.02"};
	prodCompObject[1864]={code:"MoC.2.2", name:"Change Documents", path:"EP > MoC > MoC.02"};
	prodCompObject[1865]={code:"MoC.2.3", name:"Requirements", path:"EP > MoC > MoC.02"};
	prodCompObject[1866]={code:"MoC.2.4", name:"Impacts", path:"EP > MoC > MoC.02"};
	prodCompObject[1867]={code:"MoC.2.5", name:"Risk Assessment", path:"EP > MoC > MoC.02"};
	prodCompObject[1868]={code:"MoC.2.6", name:"Analysis Checklists", path:"EP > MoC > MoC.02"};
	prodCompObject[1869]={code:"MoC.3.1", name:"Evaluation Checklists", path:"EP > MoC > MoC.03"};
	prodCompObject[1870]={code:"MoC.3.2", name:"Action Plans", path:"EP > MoC > MoC.03"};
	prodCompObject[1871]={code:"MoC.3.3", name:"Follow Up", path:"EP > MoC > MoC.03"};
	prodCompObject[1872]={code:"EA", name:"Environmental Analysis", path:"EP"};
	prodCompObject[1873]={code:"EA.1", name:"Aspects", path:"EP > EA"};
	prodCompObject[1874]={code:"EA.2", name:"Aspects Revision", path:"EP > EA"};
	prodCompObject[1875]={code:"EA.3", name:"Impacts", path:"EP > EA"};
	prodCompObject[1880]={code:"AQS.05.11.2", name:"Alert Logs", path:"EP > AQS > AQS.05 > AQS.05.11"};
	prodCompObject[1881]={code:"AQS.05.06", name:"Calculated Data", path:"EP > AQS > AQS.05"};
	prodCompObject[1882]={code:"SW-PRDCOMPONENTS", name:"Product Components", path:"Corporate > SW"};
	prodCompObject[1883]={code:"CMA", name:"Conflicts Minerals", path:"Wizness"};
	prodCompObject[1884]={code:"AQS.06.3", name:"Data Validation", path:"EP > AQS > AQS.06"};
	prodCompObject[1885]={code:"PROF", name:"Proficiency", path:"EP"};
	prodCompObject[1886]={code:"PROF.01", name:"Skills Management", path:"EP > PROF"};
	prodCompObject[1887]={code:"PROF.01.1", name:"Skills", path:"EP > PROF > PROF.01"};
	prodCompObject[1888]={code:"PROF.01.2", name:"Training Requirements", path:"EP > PROF > PROF.01"};
	prodCompObject[1889]={code:"PROF.01.3", name:"Skills Assessment", path:"EP > PROF > PROF.01"};
	prodCompObject[1890]={code:"PROF.02", name:"Training Management", path:"EP > PROF"};
	prodCompObject[1891]={code:"PROF.02.1", name:"Programs", path:"EP > PROF > PROF.02"};
	prodCompObject[1892]={code:"PROF.02.2", name:"Training Sessions", path:"EP > PROF > PROF.02"};
	prodCompObject[1893]={code:"PROF.02.3", name:"Self-Subscription", path:"EP > PROF > PROF.02"};
	prodCompObject[1894]={code:"PROF.02.4", name:"Meetings", path:"EP > PROF > PROF.02"};
	prodCompObject[1895]={code:"PROF.02.5", name:"Training Area", path:"EP > PROF > PROF.02"};
	prodCompObject[1896]={code:"PROF.03", name:"Training Assessment", path:"EP > PROF"};
	prodCompObject[1897]={code:"PROF.03.1", name:"Standard Questions", path:"EP > PROF > PROF.03"};
	prodCompObject[1898]={code:"PROF.03.2", name:"Questionnaires", path:"EP > PROF > PROF.03"};
	prodCompObject[1899]={code:"PROF.02.6", name:"Training Materials", path:"EP > PROF > PROF.02"};
	prodCompObject[1900]={code:"PROF.03.3", name:"Training Questions", path:"EP > PROF > PROF.03"};
	prodCompObject[1901]={code:"PROF.05", name:"Users", path:"EP > PROF"};
	prodCompObject[1902]={code:"PROF.06", name:"Action Plans", path:"EP > PROF"};
	prodCompObject[1906]={code:"PROF.07", name:"Dashboards", path:"EP > PROF"};
	prodCompObject[1908]={code:"PROF.08", name:"Reports", path:"EP > PROF"};
	prodCompObject[1909]={code:"UP", name:"Upgrade Pack", path:"EP"};
	prodCompObject[1911]={code:"RCM.08.3", name:"Environmental Essentials", path:"EP > RCM > RCM.08"};
	prodCompObject[1912]={code:"GLPI", name:"GLPI Integration in EO", path:"Corporate > EO"};
	prodCompObject[1913]={code:"PROF.02.5.1", name:"My Session", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1914]={code:"PROF.02.5.2", name:"Questions", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1915]={code:"PROF.02.5.3", name:"My Dashboards", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1916]={code:"PROF.02.5.4", name:"My Meetings", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1917]={code:"PROF.02.5.5", name:"My Questionnaires", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1918]={code:"PROF.02.5.6", name:"My Documents", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1919]={code:"PROF.02.5.7", name:"Validate", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1920]={code:"PROF.02.5.8", name:"Attendance Sheet", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1921]={code:"PROF.02.5.9", name:"My Reports", path:"EP > PROF > PROF.02 > PROF.02.5"};
	prodCompObject[1922]={code:"PROF.02.6.1", name:"Training Catalog", path:"EP > PROF > PROF.02 > PROF.02.6"};
	prodCompObject[1923]={code:"PROF.02.6.2", name:"Training Documents", path:"EP > PROF > PROF.02 > PROF.02.6"};
	prodCompObject[1924]={code:"PROF.07.1", name:"Skills", path:"EP > PROF > PROF.08"};
	prodCompObject[1925]={code:"PROF.07.2", name:"Trainings", path:"EP > PROF > PROF.08"};
	prodCompObject[1926]={code:"PROF.07.3", name:"Advanced Analysis", path:"EP > PROF > PROF.08"};
	prodCompObject[1927]={code:"PROF.07.4", name:"Advanced Reports", path:"EP > PROF > PROF.08"};
	prodCompObject[1928]={code:"PROF.04", name:"Company Directories", path:"EP > PROF"};
	prodCompObject[1929]={code:"PROF.04.1", name:"Directory", path:"EP > PROF > PROF.04"};
	prodCompObject[1930]={code:"PROF.04.2", name:"Business Directory", path:"EP > PROF > PROF.04"};
	prodCompObject[1931]={code:"DrillThrough", name:"Drill Through", path:"R&D AS > ASEC > Reports & Dashboard > Reports Module"};
	prodCompObject[1932]={code:"AQS.06.4.6", name:"Data Buffer Entry Form", path:"EP > AQS > AQS.06 > AQS.06.4"};
	prodCompObject[1933]={code:"AQS.02.4", name:"Units Inventory", path:"EP > AQS > AQS.02"};
	prodCompObject[1934]={code:"CustomMenu", name:"Custom Configuration Menu", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[1935]={code:"ReportSnapshots", name:"Snapshots", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[1936]={code:"ReportLabels", name:"Labels Edition", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[1937]={code:"UIK", name:"UI Kit", path:"EP > FW > UIR"};
	prodCompObject[1938]={code:"AQS.03.3", name:"Offline Excel", path:"EP > AQS > AQS.03"};
	prodCompObject[1940]={code:"TechDebt", name:"Technical Debt", path:"Corporate > EO"};
	prodCompObject[1941]={code:"TechDebtHD", name:"HD - Technical Debt", path:"Corporate > HD"};
	prodCompObject[1942]={code:"EO-ADM", name:"EO - Administration", path:"Corporate > EO"};
	prodCompObject[1943]={code:"EO-PSA", name:"EO - Professional Services Automation", path:"Corporate > EO"};
	prodCompObject[1944]={code:"ExtraColRow", name:"Extra Columns & Rows", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[1945]={code:"ReportConfig", name:"Report Configuration", path:"R&D AS > ASEC > Reports & Dashboard > Report Designer"};
	prodCompObject[1946]={code:"PrintReport", name:"Print Report", path:"R&D AS > ASEC > Reports & Dashboard > Export in Report"};
	prodCompObject[1947]={code:"RptExportExcel", name:"Export to Excel", path:"R&D AS > ASEC > Reports & Dashboard > Export in Report"};
	prodCompObject[1948]={code:"RptExportWord", name:"Export to Word", path:"R&D AS > ASEC > Reports & Dashboard > Export in Report"};
	prodCompObject[1949]={code:"RptExportPPT", name:"Export to Powerpoint", path:"R&D AS > ASEC > Reports & Dashboard > Export in Report"};
	prodCompObject[1950]={code:"RptExportPDF", name:"Export to PDF", path:"R&D AS > ASEC > Reports & Dashboard > Export in Report"};
	prodCompObject[1951]={code:"RptExportCSV", name:"Export to CSV", path:"R&D AS > ASEC > Reports & Dashboard > Export in Report"};
	prodCompObject[1952]={code:"EmailReport", name:"Email Report", path:"R&D AS > ASEC > Reports & Dashboard > Export in Report"};
	prodCompObject[1953]={code:"Staffing", name:"PSA -3- Staffing Management", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1954]={code:"OSCAR-ADM", name:"Oscar - Administration", path:"Corporate > Oscar"};
	prodCompObject[1955]={code:"PY.07", name:"Insurance premium simulation", path:"EP > PY"};
	prodCompObject[1956]={code:"PY.08", name:"Insurance premium breakdown", path:"EP > PY"};
	prodCompObject[1957]={code:"PSA-echDebt", name:"PSA -0- Technical Debt", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1958]={code:"PERF TEST", name:"Product Performance Test", path:"Corporate"};
	prodCompObject[1959]={code:"BenchMark", name:"Benchmark", path:"TestPerf"};
	prodCompObject[1960]={code:"LoadTests", name:"Load Tests", path:"TestPerf"};
	prodCompObject[1961]={code:"NonReg", name:"Non regression tests", path:"TestPerf"};
	prodCompObject[1962]={code:"OracleTests", name:"Oracle Performance tests", path:"TestPerf"};
	prodCompObject[1963]={code:"BigData", name:"High volumes Tests", path:"TestPerf"};
	prodCompObject[1964]={code:"TimeMgt", name:"PSA -4- Activities Tracking", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1965]={code:"TaskDef", name:"PSA -2- Tasks Management", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1966]={code:"PrjDef", name:"PSA -1- Project Definition", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1967]={code:"PSAMig", name:"PSA -8- Migration", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1968]={code:"Monit_Cont", name:"PSA -5- Monitoring and Control", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1969]={code:"AnalysisPSA", name:"PSA -6- Analysis Reporting", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1970]={code:"PSAFin", name:"PSA -7- Financials", path:"Corporate > EO > EO-PSA"};
	prodCompObject[1971]={code:"HD-ADM", name:"HD - Administration", path:"Corporate > HD"};
	prodCompObject[1972]={code:"PHA", name:"Process Hazard Analysis", path:"EP"};
	prodCompObject[1973]={code:"HDSLAmgt", name:"HD - SLA Management", path:"Corporate > HD"};
	prodCompObject[1975]={code:"HD-WS", name:"HD - WebServices", path:"Corporate > HD"};
	prodCompObject[1976]={code:"FuncTest", name:"Function specific performance tests", path:"TestPerf"};
	prodCompObject[1977]={code:"ProcTest", name:"Process Performance", path:"TestPerf"};
	prodCompObject[1978]={code:"HDSECU", name:"HD - Security", path:"Corporate > HD"};
	prodCompObject[1979]={code:"HD-Rep", name:"HD - Reporting", path:"Corporate > HD"};
	prodCompObject[1980]={code:"OSC-MISC", name:"Oscar - Miscelleneous", path:"Corporate > Oscar"};
	prodCompObject[1981]={code:"SW-SLA", name:"SW - SLA Management", path:"Corporate > SW"};
	prodCompObject[1982]={code:"HD-REQ", name:"HD - Requests", path:"Corporate > HD"};
	prodCompObject[1983]={code:"Testing Framework", name:"Testing Framework", path:"R&D AS > ASEC > Builder"};
	prodCompObject[1984]={code:"SolutionExplorer", name:"Solution Explorer", path:"R&D AS > ASEC > Builder"};
	prodCompObject[1985]={code:"EO-UX", name:"EO - User Experience", path:"Corporate > EO"};
	prodCompObject[1986]={code:"ScrCap", name:"Screen Capture", path:"Corporate > TCK"};
	prodCompObject[1987]={code:"AQS.07.5", name:"Sample Definitions", path:"EP > AQS > AQS.07"};
	prodCompObject[1988]={code:"AQS.07.6", name:"Sample Profiles", path:"EP > AQS > AQS.07"};
	prodCompObject[1989]={code:"Log system", name:"Log system / Log4NET", path:"R&D AS > ASEC > Administration"};
	prodCompObject[1991]={code:"MultiLang fields", name:"Multi-Lang Fields", path:"R&D AS > ASEC > Table > Forms & Sub-forms"};
	prodCompObject[1992]={code:"AtO", name:"ADP to Office", path:"Corporate > EO"};
	prodCompObject[1993]={code:"PHA.1", name:"Initiation", path:"EP > PHA"};
	prodCompObject[1994]={code:"PHA.2", name:"Analysis", path:"EP > PHA"};
	prodCompObject[1995]={code:"PHA.3", name:"Follow Up", path:"EP > PHA"};
	prodCompObject[1996]={code:"PHA.4", name:"Dashboards & Reports", path:"EP > PHA"};
	prodCompObject[1997]={code:"PHA.5", name:"User Roles", path:"EP > PHA"};
	prodCompObject[1998]={code:"PHA.1.1", name:"Processes", path:"EP > PHA > PHA.1"};
	prodCompObject[2001]={code:"PHA.2.1", name:"Nodes", path:"EP > PHA > PHA.2"};
	prodCompObject[2002]={code:"PHA.2.2", name:"Hazards", path:"EP > PHA > PHA.2"};
	prodCompObject[2003]={code:"PHA.2.3", name:"Causes", path:"EP > PHA > PHA.2"};
	prodCompObject[2004]={code:"PHA.2.4", name:"Consequences", path:"EP > PHA > PHA.2"};
	prodCompObject[2005]={code:"PHA.2.5", name:"Safeguards", path:"EP > PHA > PHA.2"};
	prodCompObject[2007]={code:"PHA.3.1", name:"Action Plans", path:"EP > PHA > PHA.3"};
	prodCompObject[2008]={code:"SSO", name:"SSO, CSO", path:"R&D AS > ASEC > Authentication"};
	prodCompObject[2009]={code:"StdAuthentication", name:"Standard Authentication", path:"R&D AS > ASEC > Authentication"};
	prodCompObject[2010]={code:"WizFederation", name:"WizFederation", path:"R&D AS > ASEC > Authentication"};
	prodCompObject[2011]={code:"WSFed", name:"WS-Fed", path:"R&D AS > ASEC > Authentication"};
	prodCompObject[2012]={code:"API", name:"API", path:"R&D AS > ASEC"};
	prodCompObject[2013]={code:"JSONService", name:"JSON Service", path:"R&D AS > ASEC > API"};
	prodCompObject[2014]={code:"UX.1.5", name:"Theme Designer", path:"R&D AS > ASEC > UX > UX.1"};
	prodCompObject[2015]={code:"PHA.1.2", name:"Process Hazard Analyses", path:"EP > PHA > PHA.1"};
	prodCompObject[2016]={code:"PHA.1.3", name:"Meetings", path:"EP > PHA > PHA.1"};
	prodCompObject[2017]={code:"EnablonWebsite", name:"Enablon.com Website", path:"Corporate"};
	prodCompObject[2018]={code:"ISEC", name:"InfoSec", path:"Misc"};
	prodCompObject[2019]={code:"ISO.5", name:"5. Information security policies", path:"Misc > ISEC"};
	prodCompObject[2020]={code:"ISO.6", name:"6. Organization of information security", path:"Misc > ISEC"};
	prodCompObject[2021]={code:"ISO.7", name:"7. Human resource security", path:"Misc > ISEC"};
	prodCompObject[2022]={code:"ISO.8", name:"8. Asset management", path:"Misc > ISEC"};
	prodCompObject[2023]={code:"ISO.9", name:"9. Access control", path:"Misc > ISEC"};
	prodCompObject[2024]={code:"ISO.10", name:"10. Cryptography", path:"Misc > ISEC"};
	prodCompObject[2025]={code:"ISO.11", name:"11. Physical and environmental security", path:"Misc > ISEC"};
	prodCompObject[2026]={code:"ISO.12", name:"12. Operations security", path:"Misc > ISEC"};
	prodCompObject[2027]={code:"ISO.13", name:"13. Communications security", path:"Misc > ISEC"};
	prodCompObject[2028]={code:"ISO.14", name:"14. System acquisition, development and maintenance", path:"Misc > ISEC"};
	prodCompObject[2029]={code:"ISO.15", name:"15. Supplier relationships", path:"Misc > ISEC"};
	prodCompObject[2030]={code:"ISO.16", name:"16. Information security incident management", path:"Misc > ISEC"};
	prodCompObject[2031]={code:"ISO.17", name:"17. Information security aspects of business continuity management", path:"Misc > ISEC"};
	prodCompObject[2032]={code:"ISO.18", name:"18. Compliance", path:"Misc > ISEC"};
	prodCompObject[2033]={code:"ISO.5.1", name:"5.1 Management direction for information security", path:"Misc > ISEC > ISO.5"};
	prodCompObject[2034]={code:"ISO.5.1.1", name:"5.1.1 Policies for information security", path:"Misc > ISEC > ISO.5 > ISO.5.1"};
	prodCompObject[2035]={code:"ISO.5.1.2", name:"5.1.2 Review of the policies for information security", path:"Misc > ISEC > ISO.5 > ISO.5.1"};
	prodCompObject[2036]={code:"ISO.6.1", name:"6.1 Internal organization", path:"Misc > ISEC > ISO.6"};
	prodCompObject[2037]={code:"ISO.6.2", name:"6.2 Mobile devices and teleworking", path:"Misc > ISEC > ISO.6"};
	prodCompObject[2038]={code:"ISO.7.1", name:"7.1 Prior to employment", path:"Misc > ISEC > ISO.7"};
	prodCompObject[2039]={code:"ISO.7.2", name:"7.2 During employment", path:"Misc > ISEC > ISO.7"};
	prodCompObject[2040]={code:"ISO.8.1", name:"8.1 Responsibility for assets", path:"Misc > ISEC > ISO.8"};
	prodCompObject[2041]={code:"ISO.8.2", name:"8.2 Information classification", path:"Misc > ISEC > ISO.8"};
	prodCompObject[2042]={code:"ISO.8.3", name:"8.3 Media handling", path:"Misc > ISEC > ISO.8"};
	prodCompObject[2043]={code:"ISO.9.1", name:"9.1 Business requirements of access control", path:"Misc > ISEC > ISO.9"};
	prodCompObject[2044]={code:"ISO.9.2", name:"9.2 User access management", path:"Misc > ISEC > ISO.9"};
	prodCompObject[2045]={code:"ISO.9.3", name:"9.3 User responsibilities", path:"Misc > ISEC > ISO.9"};
	prodCompObject[2046]={code:"ISO.9.4", name:"9.4 System and application access control", path:"Misc > ISEC > ISO.9"};
	prodCompObject[2047]={code:"ISO.14.1", name:"14.1 Security requirements of information systems", path:"Misc > ISEC > ISO.14"};
	prodCompObject[2048]={code:"ISO.14.2", name:"14.2 Security in development and support processes", path:"Misc > ISEC > ISO.14"};
	prodCompObject[2049]={code:"ISO.14.3", name:"14.3 Test data", path:"Misc > ISEC > ISO.14"};
	prodCompObject[2050]={code:"ISO.15.1", name:"15.1 Information security in supplier relationships", path:"Misc > ISEC > ISO.15"};
	prodCompObject[2051]={code:"ISO.15.2", name:"15.2 Supplier service delivery management", path:"Misc > ISEC > ISO.15"};
	prodCompObject[2052]={code:"ISO.16.1", name:"16.1 Management of information security incidents and improvements", path:"Misc > ISEC > ISO.16"};
	prodCompObject[2053]={code:"ISO.17.1", name:"17.1 Information security continuity", path:"Misc > ISEC > ISO.17"};
	prodCompObject[2054]={code:"ISO.17.2", name:"17.2 Redundancies", path:"Misc > ISEC > ISO.17"};
	prodCompObject[2055]={code:"ISO.18.1", name:"18.1 Compliance with legal and contractual requirements", path:"Misc > ISEC > ISO.18"};
	prodCompObject[2056]={code:"ISO.18.2", name:"18.2 Information security reviews", path:"Misc > ISEC > ISO.18"};
	prodCompObject[2057]={code:"ReportsCart", name:"Reports Cart", path:"R&D AS > ASEC > Reports & Dashboard"};
	prodCompObject[2058]={code:"UIL", name:"Smart View UI", path:"EP > FW"};
	prodCompObject[2062]={code:"UIL.2", name:"Cardboard (Light Home Page)", path:"EP > FW > UIL"};
	prodCompObject[2065]={code:"SW-AP", name:"Software Action Plan", path:"Corporate > SW"};
	prodCompObject[2066]={code:"EMS.09", name:"Contractor Safety Management", path:"EP > EMS"};
	prodCompObject[2067]={code:"INSCARDS", name:"Insurance CARDS", path:"EP > PY"};
	prodCompObject[2068]={code:"FW.07", name:"Integration Test Functions", path:"EP > FW"};
	prodCompObject[2069]={code:"CUST PERF", name:"Performance (Customer / Partner)", path:"Corporate"};
	prodCompObject[2070]={code:"METRICS", name:"Metrics", path:"Corporate > CUST PERF"};
	prodCompObject[2071]={code:"Perf_ACS", name:"Audit Applications", path:"Corporate > CUST PERF"};
	prodCompObject[2072]={code:"Perf_AP", name:"Portal", path:"Corporate > CUST PERF"};
	prodCompObject[2073]={code:"PERF_BPM", name:"Performance BPM", path:"Corporate"};
	prodCompObject[2074]={code:"Perf_IC", name:"Internal Control", path:"Corporate > PERF_BPM"};
	prodCompObject[2075]={code:"IAPerf_AP", name:"Performance Action Plan", path:"Corporate > PERF_BPM"};
	prodCompObject[2076]={code:"AP.01.2.14", name:"AP to WMS integration (Waste)", path:"EP > AP > AP.01 > AP.01.2"};
	prodCompObject[2077]={code:"HO_Ext_XML_Report", name:"External XML Reporting (Centralized Module)", path:"EP > HO > HO.12"};
	prodCompObject[2078]={code:"AutoDeploy", name:"AutoDeploy", path:"R&D AS > ASEC > Administration"};
	prodCompObject[2079]={code:"MobServ", name:"Mobility Server", path:"EP"};
	prodCompObject[2082]={code:"UIK.2", name:"Buttons", path:"EP > FW > UIR > UIK"};
	prodCompObject[2083]={code:"UIK.5", name:"Legend", path:"EP > FW > UIR > UIK"};
	prodCompObject[2085]={code:"UIK.6", name:"Progress Bar", path:"EP > FW > UIR > UIK"};
	prodCompObject[2087]={code:"UIK.3", name:"Caret Menu (Drop down menu)", path:"EP > FW > UIR > UIK"};
	prodCompObject[2088]={code:"UIK.7", name:"Typography (Font and Size)", path:"EP > FW > UIR > UIK"};
	prodCompObject[2089]={code:"UIK.4", name:"Color Kit", path:"EP > FW > UIR > UIK"};
	prodCompObject[2090]={code:"UIK.1", name:"Alert / Notifications UI", path:"EP > FW > UIR > UIK"};
	prodCompObject[2093]={code:"UIK.9", name:"Modal Windows", path:"EP > FW > UIR > UIK"};
	prodCompObject[2094]={code:"UIK.8", name:"Z for 8.0 Only Input Field", path:"EP > FW > UIR > UIK"};
	prodCompObject[2095]={code:"UIK.8.1", name:"Slider Switch", path:"EP > FW > UIR > UIK > UIK.8"};
	prodCompObject[2096]={code:"UIK.8.2", name:"Glyphicon Picker", path:"EP > FW > UIR > UIK > UIK.8"};
	prodCompObject[2097]={code:"UIK.9.1", name:"Dialog Box", path:"EP > FW > UIR > UIK > UIK.9"};
	prodCompObject[2098]={code:"UIK.9.2", name:"Loading Pop-Up", path:"EP > FW > UIR > UIK > UIK.9"};
	prodCompObject[2099]={code:"UIK.9.3", name:"Pop-up", path:"EP > FW > UIR > UIK > UIK.9"};
	prodCompObject[2100]={code:"FW.01.3.2.1", name:"List View", path:"EP > FW > UIR > UIR.3 > FW.01.3.2"};
	prodCompObject[2101]={code:"FW.01.3.2.2", name:"Tree View", path:"EP > FW > UIR > UIR.3 > FW.01.3.2"};
	prodCompObject[2102]={code:"FW.01.3.2.3", name:"GANTT View", path:"EP > FW > UIR > UIR.3 > FW.01.3.2"};
	prodCompObject[2103]={code:"FW.01.3.2.4", name:"Form View (Edit/Zoom)", path:"EP > FW > UIR > UIR.3 > FW.01.3.2"};
	prodCompObject[2104]={code:"UIL.1", name:"Light Smart Bar", path:"EP > FW > UIL"};
	prodCompObject[2107]={code:"UIL.3", name:"Light UI Workspace", path:"EP > FW > UIL"};
	prodCompObject[2108]={code:"UIL.3.1", name:"Wizard (Light UI)", path:"EP > FW > UIL > UIL.3"};
	prodCompObject[2109]={code:"UIK.10", name:"Tooltip", path:"EP > FW > UIR > UIK"};
	prodCompObject[2110]={code:"UIK.11", name:"Icons", path:"EP > FW > UIR > UIK"};
	prodCompObject[2111]={code:"UIT", name:"UI Text", path:"EP > FW > UIR"};
	prodCompObject[2112]={code:"EnaLoader", name:"Enablon Loader", path:"R&D AS > ASEC > Administration"};
	prodCompObject[2113]={code:"UIK.8.3", name:"Date Picker", path:"EP > FW > UIR > UIK > UIK.8"};
	prodCompObject[2114]={code:"W", name:"Widget / Objects / Tools", path:"EP > FW"};
	prodCompObject[2115]={code:"W.01", name:"Scheduler", path:"EP > FW > W"};
	prodCompObject[2116]={code:"SFDC", name:"SalesForce", path:"Corporate"};
	prodCompObject[2117]={code:"ACCT", name:"Account Management", path:"Corporate > SFDC"};
	prodCompObject[2118]={code:"OPP", name:"Opportunity Management", path:"Corporate > SFDC"};
	prodCompObject[2119]={code:"OSServerForAS", name:"OS Server (supported by Application Server)", path:"R&D AS > ASEC > Administration"};
	prodCompObject[2121]={code:"HO.01.2.3", name:"Domains", path:"EP > HO > HO.01 > HO.01.2"};
	prodCompObject[2122]={code:"UIR.4", name:"Theme Designer", path:"EP > FW > UIR"};
	prodCompObject[2123]={code:"Fractal Field", name:"Fractal Field", path:"R&D AS > ASEC > Table"};
	prodCompObject[2124]={code:"UIR.5", name:"Troubleshooting Pages", path:"EP > FW > UIR"};
	prodCompObject[2125]={code:"Multipopup", name:"Multipopup", path:"R&D AS > ASEC > Table > Forms & Sub-forms"};
	prodCompObject[2126]={code:"SVIMS", name:"Smart View IMS", path:"EP > EMS > EMS.01"};
	prodCompObject[2127]={code:"UIR.6", name:"Legacy (Deprecated since 7.3)", path:"EP > FW > UIR"};
	prodCompObject[2128]={code:"HO.01.5.3", name:"Best Practices", path:"EP > HO > HO.01 > HO.01.5"};
	prodCompObject[2129]={code:"HO.01.5.1", name:"News", path:"EP > HO > HO.01 > HO.01.5"};
	prodCompObject[2130]={code:"HO.01.5.2", name:"Library", path:"EP > HO > HO.01 > HO.01.5"};
	prodCompObject[2131]={code:"Barcode", name:"BarCode and QRCode", path:"R&D AS > ASEC > Kernel"};
	prodCompObject[2132]={code:"HO.xx", name:"User Management (Portal)", path:"EP > HO"};
	prodCompObject[2133]={code:"SharedGrp", name:"Shared Group Table", path:"R&D AS > ASEC > Users & Permissions"};
	prodCompObject[2134]={code:"HD-Downloads", name:"HD - Downloads", path:"Corporate > HD"};
	prodCompObject[2135]={code:"DashboardUX", name:"Dashboard UX Component", path:"R&D AS > ASEC > Reports & Dashboard > Dashboard"};
	prodCompObject[2137]={code:"Translation", name:"Translation", path:"EP"};
	prodCompObject[2138]={code:"W.02", name:"UX Questionnaires", path:"EP > FW > W"};
	prodCompObject[2139]={code:"Autocomplete", name:"Autocomplete", path:"R&D AS > ASEC > Table > Forms & Sub-forms"};
	prodCompObject[2140]={code:"HC", name:"Help Center", path:"EP"};
	prodCompObject[2141]={code:"HC.1", name:"User Onboarding", path:"EP > HC"};
	prodCompObject[2142]={code:"HC.2", name:"Cloud Documentation", path:"EP > HC"};
	prodCompObject[2143]={code:"HC.3", name:"Anytime Feedback (Tracks Like)", path:"EP > HC"};
	prodCompObject[2144]={code:"HC.4", name:"FAQ", path:"EP > HC"};
	prodCompObject[2145]={code:"UIL.3.2", name:"Workspace Side Bar", path:"EP > FW > UIL > UIL.3"};
	prodCompObject[2146]={code:"RTT", name:"Report Testing Tools", path:"EP"};
	prodCompObject[2147]={code:"IPAD", name:"Classic Mobile Interface", path:"EP > FW > UIR"};
	prodCompObject[2148]={code:"ACS.02.6", name:"Finding Templates", path:"EP > ACS > ACS.02"};
	prodCompObject[2149]={code:"TestAuto", name:"Test Auto", path:"EP"};
	prodCompObject[2150]={code:"W.03", name:"Activity Stream", path:"EP > FW > W"};
	prodCompObject[2151]={code:"HO.12.3", name:"Glossary", path:"EP > HO > HO.12"};
	prodCompObject[2152]={code:"W.04", name:"Bulk Action", path:"EP > FW > W"};
	prodCompObject[2153]={code:"W.05", name:"In Cell Edit", path:"EP > FW > W"};
	prodCompObject[2154]={code:"AQS.15", name:"My Dashboard", path:"EP > AQS"};
	prodCompObject[2155]={code:"AQS.Doc", name:"Documentation", path:"EP > AQS"};
	prodCompObject[2156]={code:"AQS.16", name:"Site Workspace", path:"EP > AQS"};
	prodCompObject[2157]={code:"AQS.17", name:"Administration Workspace", path:"EP > AQS"};
	prodCompObject[2158]={code:"AQS.18", name:"User Experience (not table-specific)", path:"EP > AQS"};
	prodCompObject[2159]={code:"RCM.11", name:"Integration with Other Products", path:"EP > RCM"};
	prodCompObject[2160]={code:"RCM.11.1", name:"Integration with EMS", path:"EP > RCM > RCM.11"};
	prodCompObject[2161]={code:"RCM.12", name:"RCM Light (Smart View)", path:"EP > RCM"};
	prodCompObject[2162]={code:"ACS.01.1", name:"Audit Plans", path:"EP > ACS > ACS.01"};
	prodCompObject[2163]={code:"ACS.01.3", name:"Auditors", path:"EP > ACS > ACS.01"};
	prodCompObject[2164]={code:"ACS.03.6", name:"Versioned Questions", path:"EP > ACS > ACS.03"};
	prodCompObject[2165]={code:"ACS.05.9", name:"Tasks", path:"EP > ACS > ACS.05"};
	prodCompObject[2166]={code:"ACS.05.5", name:"Published Checklists", path:"EP > ACS > ACS.05"};
	prodCompObject[2167]={code:"ACS.05.6", name:"Inspection Templates", path:"EP > ACS > ACS.05"};
	prodCompObject[2168]={code:"ACS.02.7", name:"Offline Excel Results", path:"EP > ACS > ACS.02"};
	prodCompObject[2169]={code:"ACS.02.8", name:"Offline Excel Checklists", path:"EP > ACS > ACS.02"};
	prodCompObject[2170]={code:"ACS.05.10", name:"Offline Inspections", path:"EP > ACS > ACS.05"};
	prodCompObject[2171]={code:"ACS.00", name:"Generic Functions", path:"EP > ACS"};
	prodCompObject[2172]={code:"WMS.09", name:"Administration Workspace", path:"EP > WMS"};
	prodCompObject[2173]={code:"WMS.DOC", name:"Documentation", path:"EP > WMS"};
	prodCompObject[2174]={code:"WMS.10", name:"User Experience (not table-specific)", path:"EP > WMS"};
	prodCompObject[2175]={code:"WMS.11", name:"My Dashboard", path:"EP > WMS"};
	prodCompObject[2176]={code:"RCM.03.2", name:"Citations", path:"EP > RCM > RCM.03"};
	prodCompObject[2177]={code:"RCM.03.3", name:"Citation References", path:"EP > RCM > RCM.03"};
	prodCompObject[2178]={code:"RCM.03.5", name:"Conditions", path:"EP > RCM > RCM.03"};
	prodCompObject[2179]={code:"RCM.03.7", name:"Policy Sections", path:"EP > RCM > RCM.03"};
	prodCompObject[2180]={code:"RCM.04.5", name:"Assignment Matrix", path:"EP > RCM > RCM.04"};
	prodCompObject[2181]={code:"CP", name:"Content Portal", path:"EP"};
	prodCompObject[2182]={code:"ACS.10", name:"ACS Light (Smart View)", path:"EP > ACS"};
	prodCompObject[2183]={code:"UIL.4", name:"Smart Mobile Interface", path:"EP > FW > UIL"};
	prodCompObject[2184]={code:"Export", name:"Export", path:"R&D AS > ASEC > Table"};
	prodCompObject[2185]={code:"DBMetadata", name:"Metadata (App. Builder)", path:"R&D AS > ASEC > Architecture > DBMS"};
	prodCompObject[2186]={code:"DBData", name:"Data (Forms & Table)", path:"R&D AS > ASEC > Architecture > DBMS"};
	prodCompObject[2187]={code:"DBReportData", name:"Data (Reports)", path:"R&D AS > ASEC > Architecture > DBMS"};
	prodCompObject[2188]={code:"Documentation", name:"", path:"EP"};
	//localStorage.setItem("product-components", JSON.stringify(prodCompObject))

	return {"product-components": prodCompObject, "releases": releaseObject}
};

module.exports = URLManagement;
},{"./constants":5}],14:[function(require,module,exports){
/**
 * Created by pnarielwala on 4/6/2016.
 */
var _modal = require('./modal');
var _constants = new (require('./constants'));

var Version = function(){
    function onInstall() {
        console.log("Extension Installed");
    }

    function onUpdate() {
        console.log("Extension Updated");
        var updateHTML =
            "<div>" +
                "<h4>Changes:</h4>" +
                "<ul class='errorList'>" +
                    "<li>Added Required fields</li>" +
                    "<li>Credentials are no longer saved</li>" +
                "</ul>" +
            "<div>";
        new _modal("success", "ChromeWare has Updated!", updateHTML, _constants.ebMsgHTML).display();
    }

    function getVersion() {
        var details = chrome.app.getDetails();
        return details.version;
    }

    // Check if the version has changed.
    var currVersion = getVersion();
    var prevVersion = localStorage['version']
    if (currVersion != prevVersion) {
        // Check if we just installed this extension.
        if (typeof prevVersion == 'undefined') {
            onInstall();
        } else {
            onUpdate();
        }
        localStorage['version'] = currVersion;
    }
};

module.exports = Version;
},{"./constants":5,"./modal":9}],15:[function(require,module,exports){
var Windows = function(){
    this.defaultId = undefined;
    this.loadingId = undefined;
};

Windows.prototype.initWindows = function(){
    jQuery.ajaxSetup({async:false});
    $.get("body.html")
        .done(function(data){
            $("#app").append(data)
        });
    $.get("login.html")
        .done(function(data){
            $("#loginWindow").append(data)
        });
    $.get("main.html")
        .done(function(data){
            $("#main").append(data)
        });
    $.get("request.html")
        .done(function(data){
            $("#request").append(data)
        });
    $.get("modal.html")
        .done(function(data){
            $("#modal").append(data)
        });
    $.get("quickLinks.html")
        .done(function(data){
            $("#quickLinks").append(data)
        });
    jQuery.ajaxSetup({async:true});
    this.setLoadingWindow();
    this.setDefaultWindow();
};
Windows.prototype.setDefaultWindow = function(){
    if($(".default").length === 1){
        var defaultWindow = $(".default").attr("id");
        if(defaultWindow !== undefined && defaultWindow !== null){
            this.defaultId = defaultWindow;
        }else{
            console.warn("Default window has no id assigned: " + defaultWindow)
        }
    }else{
        console.warn("Default window has not been defined")
    }
};
Windows.prototype.setLoadingWindow = function(){
    if($(".loading-window").length === 1){
        var loadingWindow = $(".loading-window").attr("id");
        if(loadingWindow !== undefined && loadingWindow !== null){
            loadingId = loadingWindow;
        }else{
            console.warn("Loading window has no id assigned")
        }
    }else{
        console.warn("Loading window has not been defined")
    }
};
Windows.prototype.hideWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
};
Windows.prototype.hideWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
};
Windows.prototype.showWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.showWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.removeClasses = function(id){
    $("#" + id).removeClass("animated-now")
        .removeClass("animated")
        .removeClass("slideInLeft")
        .removeClass("slideInRight")
        .removeClass("slideOutLeft")
        .removeClass("slideOutRight");
};
Windows.prototype.showLoading = function(){
    $("#" + loadingId).show();
};
Windows.prototype.hideLoading = function(){
    $("#" + loadingId).hide();
};
Windows.prototype.loadCurrentWindow = function(){
    this.showWindow(localStorage.getItem("currentWindow") == undefined ? this.defaultId : localStorage.getItem("currentWindow"))
};

module.exports = new Windows();
},{}]},{},[8]);
