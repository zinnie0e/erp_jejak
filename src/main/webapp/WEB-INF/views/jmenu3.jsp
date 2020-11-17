<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<html>
<head>
	<title>jmenu3</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="/resources/js/main.js"></script>
	<script src="/resources/js/jejakContent.js"></script>
	
	<script src="/resources/js/jejakFunction.js"></script>
	<script src="/resources/js/mfunction/m3_f.js"></script>

	<script src="/resources/js/jmenu/jmenu3.js"></script>
	<link rel="stylesheet" type="text/css" href="/resources/style/css/jejak.css">
	<link rel="stylesheet" type="text/css" href="/resources/style/css/jejakContent.css">
	<link rel="shortcut icon" href="#">
</head>
<body onload="javascript:getString(3);">
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
					<div class="menu_btn" value="0" id="menu_1" onclick="javascript:showPage(1);"></div>
					<div class="menu_btn" value="1" id="menu_2" onclick="javascript:showPage(2);"></div>
					<div class="menu_btn" value="2" id="menu_3" onclick="javascript:showPage(3);"></div>
					<div class="menu_btn" value="3" id="menu_4" onclick="javascript:showPage(4);"></div>
					<div class="menu_btn" value="4" id="menu_5" onclick="javascript:showPage(5);"></div>
					<div class="menu_btn" value="5" id="menu_6" onclick="javascript:showPage(6);"></div>
					<div class="menu_btn" value="6" id="menu_7" onclick="javascript:showPage(7);"></div>
					<div class="menu_btn" value="7" id="menu_8" onclick="javascript:showPage(8);"></div>
					<div class="menu_btn" value="8" id="menu_9" onclick="javascript:showPage(9);"></div>
				</div>
			</div>
		</div>
		<div id="jejak_middle">
			<div id="jejak_side_menu"></div>
			<div id="jejak_detail_view"></div>
		</div>
		<div id="jejak_bottom"></div>
	</div>
</body>
</html>
