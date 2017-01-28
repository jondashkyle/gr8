!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.gr8=n()}}(function(){return function n(t,e,r){function i(p,a){if(!e[p]){if(!t[p]){var u="function"==typeof require&&require;if(!a&&u)return u(p,!0);if(o)return o(p,!0);var f=new Error("Cannot find module '"+p+"'");throw f.code="MODULE_NOT_FOUND",f}var l=e[p]={exports:{}};t[p][0].call(l.exports,function(n){var e=t[p][1][n];return i(e?e:n)},l,l.exports,n,t,e,r)}return e[p].exports}for(var o="function"==typeof require&&require,p=0;p<r.length;p++)i(r[p]);return i}({1:[function(n,t,e){function r(n,t){var e=t?"max":"min";return Object.keys(n).map(function(t){return{key:t,value:n[t],open:"@media("+e+"-width:"+n[t]+"){",close:"}\n"}})}function i(n,t){return n.sort(function(n,e){return t?parseInt(n.value,10)>parseInt(e.value,10)?-1:1:parseInt(n.value,10)<parseInt(e.value,10)?-1:1})}function o(n){var t=[{open:"",close:""}];return n.responsive?t.concat(i(r(n.breakpoints,n.max),n.max)):t}t.exports=o},{}],2:[function(n,t,e){t.exports={spacing:[0,1,2,3,4],opacity:[0,25,50,75,100],viewport:100,aspect:[0,20,50,75,100],size:[0,100],order:[0,1,2,3,4],zIndex:[0,1,2,3,4],lineHeight:[1,1.5],fontSize:[6.4,3.2,2.4,1.6,1.2,1],textColumns:[1,2,3,4],unit:"rem",nested:!1,responsive:!1,attribute:!0,max:!0,breakpoints:{xl:"1439px",lg:"1260px",md:"1023px",sm:"767px"}}},{}],3:[function(n,t,e){function r(n){return"function"==typeof n}function i(n){return"string"==typeof n}function o(n){return Array.isArray(n)}function p(n){return"object"==typeof n&&!(n instanceof Array)}function a(n){return!isNaN(parseFloat(n))&&isFinite(n)}function u(n){return void 0!==n&&(""===n||0===n||n)}function f(n,t){return n=n||[],n.concat(t)}function l(n){return n}function s(n){return n=n||[],n.shift()}function c(n){n=n||{};var t=s(Object.keys(n));return{key:t,val:n[t]}}function d(n){return p(n)?c(n):{val:n}}function x(n){return p(n)?Object.keys(n).map(function(t){return n[t]}):n}function v(n){return n=n||{},u(n.key)?n.key:b(n.val)}function m(n,t){n=n||{};for(var e in t)"object"==typeof t[e]&&!t[e]instanceof Array?n[e]=m(n[e],t[e]):n[e]=t[e];return n}function g(n){return n=n||"",n.split("-").map(function(n){return n[0]}).join("")}function h(n){return n=n||"",g(o(n)?n.join("-"):n)}function y(n){return String(n).replace(".","-")}function b(n){return a(n)?y(n):g(n)}function w(n){if(!p(n))return!1;var t=["prefix","prop","unit","vals","transform","declaration"];return Object.keys(n).some(function(n){return t.indexOf(n)>-1})}function j(n){return o(n)?n:[n]}function k(n){return n=n||"",n.replace(/(\r\n|\n|\r|\t|\s{2,})/gm,"").trim()}function z(n,t){for(var e=[],r=n;r<=t;r++)e.push(r);return e}function O(n,t){for(var e,r=[],i=[],o=0;o<n.length;o++)e=n[o][t],i.indexOf(e)===-1&&(r.push(n[o]),i.push(e));return r}t.exports={isFcn:r,isStr:i,isArr:o,isObj:p,isUtil:w,exists:u,flatten:f,extend:m,removeEmpty:l,first:s,firstKeyVal:c,abbreviate:h,depunct:y,sanitize:b,strip:k,alwaysArr:j,prefill:z,getKeyOrVal:v,objToArr:x,getValObj:d,removeDups:O}},{}],4:[function(n,t,e){var r=n("./helpers"),i=n("./utils"),o=n("./defaults"),p=n("./variables"),a=n("./breakpoints");t.exports=function(n){function t(t){return t=t||"",t===!0?n.unit:t}function e(n,e){return n?t(e):""}function u(n,t){return r.isFcn(t)?t(n):n}function f(n,t){return n+":"+t}function l(n){var t=u(n.val,n.transform),i=e(n.val,n.unit);return r.alwaysArr(n.prop).map(function(n){return f(n,t+i)}).join(";")}function s(n,t){return"."+(n?n+"-"+t:t)}function c(n,t){return"["+n+'~="'+t+'"]'}function d(t,e){return r.alwaysArr(t).map(function(t){return e&&n.attribute?c(e,t):s(e,t)}).join(" ")}function x(n,t){return d(n.prefix,t)+n.suffix+"{"+r.strip(n.declaration)+"}"}function v(n,t,e){return{prefix:n||"",suffix:t||"",declaration:e||""}}function m(n){if(n.prefix&&r.isStr(n.declaration))return v(n.prefix,n.suffix,n.declaration)}function g(n){function t(){return r.exists(n.prefix)||r.exists(n.prop)}return r.exists(n.vals)&&t()}function h(n){return function(t){var e=n.prefix||r.abbreviate(n.prop),i=r.getKeyOrVal(t);return[e,i].join(n.hyphenate?"-":"")}}function y(n){if(g(n)){var t=h(n);return r.alwaysArr(n.vals).map(function(e){var i=r.getValObj(e),o=t(i),p=r.isFcn(n.declaration)?n.declaration(i.val):l(r.extend(n,{val:i.val}));return v(o,n.suffix,p)})}console.warn("        Unable to generate styles for "+JSON.stringify(n)+".        Missing values, prefix, or prop.      ")}function b(n){return m(n)||y(n)}function w(t){return r.isUtil(t)?t:r.isFcn(t)?r.alwaysArr(t(n)).map(w):r.isArr(t)||r.isObj(t)?r.objToArr(t).map(w).reduce(r.flatten,[]):void 0}function j(t){return n[t.option]?r.extend(t,{vals:n[t.option]}):t}function k(n){return r.isArr(n.prop)?n.prop.map(function(t){return b(r.extend(n,{prop:t}))}).reduce(r.flatten,[]):b(n)}function z(){var n=i.map(w).reduce(r.flatten,[]).filter(r.removeEmpty).map(j).map(k).reduce(r.flatten,[]).filter(r.removeEmpty);return n?n:[]}function O(){var t=z(),e=a(n),r=e.map(function(n){return[n.open,t.map(function(t){return x(t,n.key)}).join("\n"),n.close].join("\n")}).join("");return r.replace(/^\s*[\r\n]/gm,"")}n=r.extend(o,n);var A={};return A.add=function(n){utils.push(n)},A.string=function(){return O()},A.attach=function(){var n=document.createElement("style");n.innerHTML=O(),document.head.appendChild(n)},A.vars=function(n){var t=i.map(w).reduce(r.flatten,[]).filter(r.removeEmpty).map(j);return p(t,e,n)},A}},{"./breakpoints":1,"./defaults":2,"./helpers":3,"./utils":11,"./variables":20}],5:[function(n,t,e){e.size={prefix:"bgs",prop:"background-size",vals:[{c:"cover"},{ct:"contain"}]},e.position={prefix:"bgp",prop:"background-position",vals:["center","top","right","bottom","left"]},e.repeat={prefix:"bgr",prop:"background-repeat",vals:[{n:"no-repeat"},{x:"repeat-x"},{y:"repeat-y"}]}},{}],6:[function(n,t,e){var r=n("../helpers").flatten,i=n("../helpers").prefill,o=12,p=i(1,o),a=i(0,o),u=i(1,o-1);e.column={prefix:"c",prop:"width",unit:"%",vals:p,transform:function(n){return n/o*100}},e.offset={prefix:"co",prop:"margin-left",unit:"%",vals:a,transform:function(n){return n/o*100}},e.nestedColumn=function(n){return n.nested?u.map(function(n){var t=i(1,n);return t.map(function(t){return{prefix:["c"+n,"c"+t],declaration:"width:"+t/n*100+"%"}})}).reduce(r,[]):[]},e.nestedOffset=function(n){return n.nested?u.map(function(n){var t=i(1,n);return t.map(function(t){return{prefix:["co"+n,"co"+t],declaration:"margin-left:"+t/n*100+"%"}})}).reduce(r,[]):[]}},{"../helpers":3}],7:[function(n,t,e){var r={purp:"#912eff",blue:"#5497ff",teal:"#51feff",red:"#ff0000",lime:"#00ff00"};t.exports=[{prefix:"dev",declaration:"outline:1px solid "+r.purp},{prefix:"dev",suffix:" > *",declaration:"outline:1px solid "+r.blue},{prefix:"dev",suffix:" > * > *",declaration:"outline:1px solid "+r.teal},{prefix:"dev",suffix:" > * > * > *",declaration:"outline:1px solid "+r.red},{prefix:"dev",suffix:" > * > * > * > *",declaration:"outline:1px solid "+r.lime}]},{}],8:[function(n,t,e){t.exports={prop:"display",vals:["flex","block","inline-block","inline","table","table-cell","table-row","none"]}},{}],9:[function(n,t,e){e.display={prefix:"x",declaration:"display:flex"},e.align={prefix:"xa",prop:"align-items",vals:["center","baseline","stretch","flex-start","flex-end"]},e.direction={prefix:"xd",prop:"flex-direction",vals:["row","row-reverse","column","column-reverse"]},e.justify={prefix:"xj",prop:"justify-content",vals:["center",{b:"space-between"},{a:"space-around"},{s:"flex-start"},{e:"flex-end"}]},e.wrap={prefix:"x",prop:"flex-wrap",vals:[{w:"wrap"},{wr:"wrap-reverse"},{wn:"nowrap"}]},e.flex={prefix:"x",prop:"flex",vals:["initial",{x:"1"},"auto","none"]},e.order={option:"order",prefix:"xo",prop:"order"},e.orderSpecial={prefix:"xo",prop:"order",vals:[{t:-1},{b:99}]}},{}],10:[function(n,t,e){e.float={prop:"float",vals:["left","right","none"]},e.clear={prefix:"cf",suffix:":after",declaration:'    content:"";    display:block;    clear:both  '}},{}],11:[function(n,t,e){t.exports=[n("./column"),n("./margin"),n("./padding"),n("./opacity"),n("./background"),n("./flex"),n("./display"),n("./float"),n("./overflow"),n("./positioning"),n("./size"),n("./type"),n("./misc"),n("./dev")]},{"./background":5,"./column":6,"./dev":7,"./display":8,"./flex":9,"./float":10,"./margin":12,"./misc":13,"./opacity":14,"./overflow":15,"./padding":16,"./positioning":17,"./size":18,"./type":19}],12:[function(n,t,e){e.margin={option:"spacing",prop:["margin","margin-top","margin-right","margin-bottom","margin-left"],unit:!0},e.marginX={option:"spacing",prefix:"mx",prop:[["margin-left","margin-right"]],unit:!0},e.marginY={option:"spacing",prefix:"my",prop:[["margin-top","margin-bottom"]],unit:!0}},{}],13:[function(n,t,e){e.cursor={prefix:"cur",prop:"cursor",vals:["pointer","default","alias","zoom-in","zoom-out"]},e.userSelect={prop:"user-select",vals:["none","auto","text"]},e.pointerEvents={prop:"pointer-events",vals:["none","auto"]}},{}],14:[function(n,t,e){t.exports={option:"opacity",prefix:"op",prop:"opacity",transform:function(n){return n/100}}},{}],15:[function(n,t,e){t.exports={prop:["overflow","overflow-x","overflow-y"],vals:["hidden","scroll"]}},{}],16:[function(n,t,e){e.padding={option:"spacing",prop:["padding","padding-top","padding-right","padding-bottom","padding-left"],unit:!0},e.paddingX={option:"spacing",prefix:"px",prop:[["padding-left","padding-right"]],unit:!0},e.paddingY={option:"spacing",prefix:"py",prop:[["padding-top","padding-bottom"]],unit:!0}},{}],17:[function(n,t,e){e.position={prefix:"ps",prop:"position",vals:["absolute","relative","fixed","static"]},e.placement={prop:["top","right","bottom","left"],vals:0},e.zindex={option:"zIndex",prefix:"z",prop:"z-index"}},{}],18:[function(n,t,e){e.size={option:"size",prop:["width","height"],unit:"%"},e.viewportWidth={option:"viewport",prefix:"vw",prop:"width",unit:"vw"},e.viewportHeight={option:"viewport",prefix:"vh",prop:"height",unit:"vh"},e.viewportMinWidth={option:"viewport",prefix:"vwmn",prop:"min-width",unit:"vw"},e.viewportMinHeight={option:"viewport",prefix:"vhmn",prop:"min-height",unit:"vh"},e.viewportMaxWidth={option:"viewport",prefix:"vwmx",prop:"max-width",unit:"vw"},e.viewportMaxHeight={option:"viewport",prefix:"vhmx",prop:"max-height",unit:"vh"},e.aspect={option:"aspect",prefix:"ar",declaration:function(n){return'      content:"";      display:block;      padding-top:'+n+(n?"%":"")+"    "}}},{}],19:[function(n,t,e){e.fontSize={option:"fontSize",prop:"font-size",unit:!0},e.lineHeight={option:"lineHeight",prop:"line-height"},e.fontStyle={prop:"font-style",vals:["normal","italic"]},e.fontWeight={prop:"font-weight",vals:["normal","bold"]},e.textAlign={prop:"text-align",vals:["left","center","right","justify"]},e.textDecoration={prop:"text-decoration",vals:["underline","overline","line-through","none"]},e.textTransform={prop:"text-transform",vals:["uppercase","lowercase","capitalize","none"]},e.verticalAlign={prop:"vertical-align",vals:[{bl:"baseline"},"top","middle","bottom"]},e.textColumn={option:"textColumns",prefix:"tc",prop:"columns"}},{}],20:[function(n,t,e){var r=n("./helpers"),i={opts:[{s:"spacing"},{fs:"fontSize"},{lh:"lineHeight"}],template:"css"},o={less:function(n,t,e,i){return"@"+n+r.depunct(t)+": "+e+i+";"},sass:function(n,t,e,i){return"$"+n+r.depunct(t)+": "+e+i+";"},css:function(n,t,e,i){return"--"+n+r.depunct(t)+": "+e+i+";"}};t.exports=function(n,t,e){e=r.extend(i,e);var p=e.opts.map(r.getValObj),a=p.map(function(n){return n.val}),u=n.filter(function(n){return a.indexOf(n.option)>=0}),f=r.removeDups(u,"option"),l=f.map(function(n){return{option:n.option,prefix:p.find(function(t){return t.val===n.option}).key,values:n.vals,unit:t(1,n.unit)}}),s=l.map(function(n){var t=r.alwaysArr(n.values).map(function(t){var i=r.getValObj(t),p=i.key||i.val,a=n.unit||"";return r.isFcn(o[e.template])?o[e.template](n.prefix,p,i.val,a):""});return t}).reduce(r.flatten,[]);return"css"===e.template&&(s=[":root{"].concat(s,["}"])),s.join("\n")}},{"./helpers":3}]},{},[4])(4)});