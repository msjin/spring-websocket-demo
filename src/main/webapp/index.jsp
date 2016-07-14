<html>
<body>
<div id="msgcount"></div>
<h2>Hello World!</h2>
</body>

<%
	String path = request.getContextPath();
	request.setAttribute("path", path);
%>

<%=path %>

<script type="text/javascript" src="static/jquery-1.5.1.min.js"></script>	
<script src="//cdn.bootcss.com/sockjs-client/1.0.3/sockjs.js"></script>
<script type="text/javascript">

$(function(){
	var websocket;
	if ('WebSocket' in window) {
	    websocket = new WebSocket("ws://"+window.location.host + window.location.pathname+"echo");
	} else if ('MozWebSocket' in window) {
	    websocket = new MozWebSocket("ws://"+window.location.host+"/workorder/echo");
	} else {
	    websocket = new SockJS(hz.basePath+"/sockjs/echo/");
	}
	websocket.onopen = function (evnt) {
		console.log("websoket open...");
	};
	websocket.onmessage = function (evnt) {
		alert("服务器发来消息："+evnt.data)
	};
	websocket.onerror = function (evnt) {
		console.log("websoket error...");
	};
	websocket.onclose = function (evnt) {
		console.log("websoket close...");
	}
});
</script>
</html>
