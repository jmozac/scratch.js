/*
// ScratchJS	
// Is an upgrade version from latest CafeDOM v0.2
// Author 		: jMozac a.k.a K4pT3N
// URL			: Cafelinux.Info
// Contact		: [/|@] jmozac
// required 	: static.css
// history		:
//		v1.0	: 
			added obj2query({var:val})
				Usage:
					var data={a:"a",b:"b"};
 * 					var obj={target:_host,method:"post",data:data}	
 * 			added number2dotted(el)
 * 				Usage:
 * 					number2dotted(oo("element")) // without .value
 * 						
// 	v2		: element(property); newElement(el_type,obj); append(el_parent,el_child,position); oo(@elementsName);
//		v2.1	: fix[X-Requested-With]:METHOD
* 		Start from v0.2 all history moved to CHANGELOG.md
*/

/* POPUP */

function popup_alert(msg,rButton_Callback){
	// BUTTON
	if(!rButton_Callback){
		rButton_Callback={
			ok:function(){popup_close()}
		}
	}
	var b;
	var boxalert=newElement('div',{
			html:
				'<div class=cover id=popup-cover>'+
					'<div class=cover-box id=cover-box>'+
						'<div class=cover-content id=cover-content>'+
							'<div class=cover-content-box id=cover-content-box>'+
								'<div class=cover-content-box-message id=alert-message>'+
									msg+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
	});
	append(oo("%body")[0],boxalert);
	popup_button(rButton_Callback);
}
function popup_button(rButton_Callback,objButtonExtended){
	var btn_class='btn-cover';
	var btn_type='input';
	var alert_div_button=newElement('div',{class:'cover-content-box-nav',id:'alert-button'});
	
	var objButton={
		btn_ok		:newElement(btn_type,{type:'button',class:'cover-button',val:'OK',id:'popup-btn-ok'}),
		btn_yes		:newElement(btn_type,{type:'button',class:'cover-button',val:'Yes',id:'popup-btn-yes'}),
		btn_cancel	:newElement(btn_type,{type:'button',class:'cover-button',val:'Cancel',id:'popup-btn-cancel'})
	};
	if(typeof objButtonExtended === 'object'){
		objButton = Object.assign(objButtonExtended,objButton);
	}
	for (var key in rButton_Callback) {
		if (rButton_Callback.hasOwnProperty(key)) {
			append(alert_div_button,objButton['btn_'+key]);
			objButton['btn_'+key].onclick=rButton_Callback[key];
		}
	}
	append(oo("cover-content-box"),alert_div_button);
}
function popup_close(){
	oo("popup-cover").remove();
}

ls = localStorage;

function oo(el) {
	var n = el.substring(0, 1),
	t = el.substring(1, el.length);
	switch (n) {
		case '@'	:return document.getElementsByName(t);break;
		case '%'	:return document.getElementsByTagName(t);break;
		case '.'	:return document.getElementsByClassName(t);break;
		default	:return document.getElementById(el);break;
	}
}
function showhide(el,anime){
	var a=oo(el);
	if(a.style.display=="block" || !(a.style.display)){
		a.style.display="none";
	} else {
		a.style.display="block";
		a.style.animation=anime+" 1s";
	}
}
function ajax() {
	var e;
	return e = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP')
}
function X(obj,func){
	var method = obj.method ? obj.method : 'get';
	var	jx = ajax();
		jx.open(method, obj.target, !0);
		jx.onreadystatechange = function(){
			if(jx.readyState==4){
				if(jx.status==200){
					return func(jx.responseText);
				} else if(jx.status==408 || jx.status===0){
					if(obj.retry){
						if(obj.delay){
							return setTimeout("X("+obj+","+func+"",obj.delay);
						} else {
							return X(obj,func);
						}
					} else {
						return jx.status; 
					}
				} else {
					return "Error: "+jx.status;
				}
			}
		};
	
	if(method=='post'){
		jx.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	var data = (obj.data) ? obj.data : '';
	jx.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	jx.send(data)
}
function obj2query(obj){
	return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&');
}
function goto(e,t) {
	if(t=="_blank"){
		window.open = e;
	} else {
		window.location = e;
	}
}

function clog(e) {
  return console.log(e)
}

function inNumOnly(e) {
  CZ('#' + e).addEventListener('keypress', function (e) {
    (e.which < 48 || e.which > 57) && (8 !== e.which || e.metaKey) && e.which > 40 < e.which && e.preventDefault()
  })
}
function FormNotNULL(e,exception) {
  for (var n = CZ('#' + e).elements, t = n.length, r = 0; t - 1 > r; r++) {
    var i = n[r].value;
    if(n[r].id!==exception){
		if (clog(i), '' == i) return alert('Field #' + n[r].id + ' do not empty'),
		!1
	}
  }
}
/* FUNCTIONS */
function number2dotted(el) {
	var	v=oo(el).value.split('.').join('');
	var op;	
	if(v.length>3){
		var n=Math.round(v.length/3);
		var rev=v.split("").reverse().join("");
		var pieces=[];
		for(var i=0;i<n+1;i++){
			pieces.push(rev.substr(i*3,3));
		}
		var im=pieces.join('.').split("").reverse().join("");
		op=(im.substr(0,1)=='.')?im.substr(1,im.length-1):im;
	} else {
		op=v;
	}
	oo(el).value=op;
}
/* DOM Manipulations */
function element(property) {
  var obj = {
    html	: 'innerHTML',
    val		: 'value',
    class	: 'className'
  };
  return obj.hasOwnProperty(property) ? obj[property] : property
}
function newElement(el_type,obj) {
  var el = document.createElement(el_type);
  for (var r in obj) el[element(r)] = obj[r];
  return el
}
function append(el_parent,el_child,position){
	if(!position && position!==0) position="last";
	switch(position){
		case "first"	:
		case 0	 	:
			el_parent.insertBefore(el_child,el_parent.firstChild);
			break;
		case "last"		:
			el_parent.appendChild(el_child);
			break;
		default		:
			el_parent.insertBefore(el_child,el_parent.childNodes[position]);
			break;
	}
}
Element.prototype.remove = function () {
  this.parentElement.removeChild(this)
}
