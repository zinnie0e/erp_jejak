<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<html>
<head>
	<title>Home</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="/resources/js/main.js"></script>
	<script src="/resources/js/jejakContent.js"></script>
	
	<script src="/resources/js/jejakFunction.js"></script>
	<script src="/resources/js/mfunction/m1_f.js"></script>
	<script src="/resources/js/mfunction/m2_f.js"></script>
	<script src="/resources/js/mfunction/m3_f.js"></script>
	<script src="/resources/js/mfunction/m4_f.js"></script>
	<script src="/resources/js/mfunction/m5_f.js"></script>
	<script src="/resources/js/mfunction/m6_f.js"></script>			
	<script src="/resources/js/mfunction/m7_f.js"></script>
	<script src="/resources/js/mfunction/m8_f.js"></script>
	<script src="/resources/js/mfunction/m9_f.js"></script>
	
	<script src="/resources/js/jmenu/jmenu1.js"></script>
	<script src="/resources/js/jmenu/jmenu2.js"></script>
	<script src="/resources/js/jmenu/jmenu3.js"></script>
	<script src="/resources/js/jmenu/jmenu4.js"></script>
	<script src="/resources/js/jmenu/jmenu5.js"></script>
	<script src="/resources/js/jmenu/jmenu6.js"></script>
	<script src="/resources/js/jmenu/jmenu7.js"></script>
	<script src="/resources/js/jmenu/jmenu8.js"></script>
	<script src="/resources/js/jmenu/jmenu9.js"></script>
	<link rel="stylesheet" type="text/css" href="/resources/style/css/home.css">
	<link rel="stylesheet" type="text/css" href="/resources/style/css/jejak.css">
	<link rel="stylesheet" type="text/css" href="/resources/style/css/jejakContent.css">
	<link rel="shortcut icon" href="#">
</head>
<body>
	<div id="div_home">
		<div id="select_page">
			<div id="btn_jejak" onclick="javascript:getString(0);"></div>
			<div id="btn_art" onclick="javascript:getString(100);"></div> 
		</div>
		<div id="login_page">
			<div id="login_left"></div>
			<div id="login_center">
				<img id="img_sekwanglogin" src="/resources/style/images/login/login_txt.gif">
				<div id="div_id"><img id="img_id" src="/resources/style/images/login/txt_id.gif"><input type="text" id="txb_id" onkeydown="javascript:Enter_Check(0);"></div>
				<div id="div_pw"><img id="img_pw" src="/resources/style/images/login/txt_pw.gif"><input type="password" id="txb_pw" onkeydown="javascript:Enter_Check(0);"></div>
				<div id="btn_login" onclick="javascript:login();"></div>
			</div>
			<div id="login_right"></div>
		</div>
	</div>
</body>
</html>
