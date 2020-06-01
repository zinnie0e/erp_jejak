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
			<div id="btn_jejak" onclick="javascript:select(0);"></div>
			<div id="btn_art" onclick="javascript:select(1);"></div> 
		</div>
		<div id="login_page">
			<div id="login_left"></div>
			<div id="login_center">
				<img id="img_sekwanglogin" src="/resources/style/images/login/login_txt.gif">
				<div id="div_id"><img id="img_id" src="/resources/style/images/login/txt_id.gif"><input type="text" id="txb_id"></div>
				<div id="div_pw"><img id="img_pw" src="/resources/style/images/login/txt_pw.gif"><input type="password" id="txb_pw"></div>
				<div id="btn_login" onclick="javascript:login();"></div>
			</div>
			<div id="login_right"></div>
		</div>
	</div>
	
	<div id="div_jejak">
		<div id="jejak_top">
			<div id="jejak_top_body">
				<div id="div_logoTitle"><img id="img_logoTitle" src="/resources/style/images/jejak/title.gif"></div>
				<div id="div_logoTitleExc">
					<div id="btn_logout" onclick="javascript:logout();"></div>
					<div id="btn_datatec" onclick="javascript:datatec();"></div>
				</div>
			</div>
			<div id="jejak_top_menu">
				<div id="div_menu">
					<div class="menu_btn" value="0" id="menu_1" onclick="javascript:showSideMenu(1);"></div>
					<div class="menu_btn" value="1" id="menu_2" onclick="javascript:showSideMenu(2);"></div>
					<div class="menu_btn" value="2" id="menu_3" onclick="javascript:showSideMenu(3);"></div>
					<div class="menu_btn" value="3" id="menu_4" onclick="javascript:showSideMenu(4);"></div>
					<div class="menu_btn" value="4" id="menu_5" onclick="javascript:showSideMenu(5);"></div>
					<div class="menu_btn" value="5" id="menu_6" onclick="javascript:showSideMenu(6);"></div>
					<div class="menu_btn" value="6" id="menu_7" onclick="javascript:showSideMenu(7);"></div>
					<div class="menu_btn" value="7" id="menu_8" onclick="javascript:showSideMenu(8);"></div>
					<div class="menu_btn" value="8" id="menu_9" onclick="javascript:showSideMenu(9);"></div>
				</div>
			</div>
		</div>
		<div id="jejak_middle">
			<div id="jejak_side_menu"></div>
			<div id="jejak_detail_view"></div>
		</div>
		<div id="jejak_bottom"></div>
	</div>
	
	<div id="div_art">
		<p>여기 아트페이지</p>
	</div>

</body>
</html>
