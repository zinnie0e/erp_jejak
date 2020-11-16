const IS_DEBUG = true;


function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

var string = null;
$(document).ready(function () {
	$.getJSON( "/resources/style/json/jejak.json", function( data ){
		string = data;
	});
	mouseOverOut();
});

var checkNum;
function select(select_num){
	$("#select_page").hide();
	
	if(select_num == 0){ //0 == 제작 
		$("#login_page").show();
		checkNum = select_num;
		return;

	}else{ //1 == 아트
		$("#login_page").show();
		checkNum = select_num;
		return;
	}
}

function login(){
	
	
	var userId = $("#txb_id").val();
	var userPw = $("#txb_pw").val();
	if (userId == "") return $("#txb_id").focus();
	if (userPw == "") return $("#txb_pw").focus();
	
	$('#txb_id').val('');
	$('#txb_pw').val('');
	
	if(checkNum == 0){
		showJejak();
		showSideMenu(2);
		$('#jejak_detail_view').html(jmenu2("0"));
	}else{
		showArt();
	}
}

function logout(){
	$("#div_home").show();
	$("#div_jejak").hide();
	$("#div_jejak").hide();
}

function datatec(){
	alert("로그인 해 주세요.");
}

function showJejak(){
	$("#div_home").hide();
	$("#div_jejak").show();
}

function showArt(){
	$("#div_home").hide();
	$("#div_art").show();
}

function mouseOverOut(){
	$(".menu_btn").mouseenter(function(){ 
		 $(this).css('background-image', 'url('+string.top_menu_ov_url[$(this).attr("value")]+')');
	}).mouseleave(function(){
		$(this).css('background-image', 'url('+string.top_menu_url[$(this).attr("value")]+')');
	});

	$(".jejak_side_menu_btn").mouseenter(function(){ 
		$(this).css('background-color', '#00304F');
	}).mouseleave(function(){
		$(this).css('background-color', '#004476');
	});
}

function makeListInfo(menu_num) {
	var listInfo = "";
	var onclickHtml = "";

	if(menu_num == 1){
		listInfo = string.side_menu_list_1;
		onclickHtml = 'onclick="javascript:m1(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 2){
		listInfo = string.side_menu_list_2;
		onclickHtml = 'onclick="javascript:m2(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 3){
		listInfo = string.side_menu_list_3;
		onclickHtml = 'onclick="javascript:m3(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 4){
		listInfo = string.side_menu_list_4;
		onclickHtml = 'onclick="javascript:m4(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 5){
		listInfo = string.side_menu_list_5;
		onclickHtml = 'onclick="javascript:m5(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 6){
		listInfo = string.side_menu_list_6;
		onclickHtml = 'onclick="javascript:m6(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 7){
		listInfo = string.side_menu_list_7;
		onclickHtml = 'onclick="javascript:m7(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 8){
		listInfo = string.side_menu_list_8;
		onclickHtml = 'onclick="javascript:m8(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}else if(menu_num == 9){
		listInfo = string.side_menu_list_9;
		onclickHtml = 'onclick="javascript:m9(this);"';
		return {
        	listInfo: listInfo,
        	onclickHtml: onclickHtml
    	};
	}
}

var listInfo;
function showSideMenu(menu_num){

	var str = "";
	listInfo = makeListInfo(menu_num).listInfo;
	var onclickHtml = makeListInfo(menu_num).onclickHtml;

	$("#jejak_middle").css('padding-left', 'calc((100% - 1000px) / 2)');
	str += '<div id="jajak_side_menu_top" style="background-image:url(' + string.side_menu_top_url[menu_num - 1] + ')"/>';

	$(listInfo).each(function (i, v) {
		if (v == " ") {
			str += '<div style="width: 160px; height: 34px;"></div>';
		} else {
			if (menu_num == 6) {
				if (v == "선불직접경비" || v == "후불직접경비 명세서") {
					str += '<div style="width:190px; height:50px;"><font color="white"><b>' + v + '</b></font></div>';
				} else {
					str += '<div class="jejak_side_menu_btn" value="' + i + '" '+ onclickHtml +' title="' + v + '">- ' + v + '</div>';
					str += '<div style="width:190px; height:1px; background-image:url(' + string.jajak_side_menu_dotline + ')" />';
				}
			} else {
				str += '<div class="jejak_side_menu_btn" value="' + i + '" '+ onclickHtml +' title="' + v + '">- ' + v + '</div>';
				str += '<div style="width:190px; height:1px; background-image:url(' + string.jajak_side_menu_dotline + ')" />';
			}
		}
	});

	$('#jejak_side_menu').html(str);
	
	mouseOverOut();
	if(menu_num == "1"){$('#jejak_detail_view').html(jmenu1("1"));}
	if(menu_num == "2"){$('#jejak_detail_view').html(jmenu2("0"));}
	if(menu_num == "3"){$('#jejak_detail_view').html(jmenu3("0"));}
	if(menu_num == "4"){$('#jejak_detail_view').html(jmenu4("1"));}
	if(menu_num == "5"){$('#jejak_detail_view').html(jmenu5("0"));}
	if(menu_num == "6"){$('#jejak_detail_view').html(jmenu6("4"));}
	if(menu_num == "7"){$('#jejak_detail_view').html(jmenu7("0"));}
	if(menu_num == "8"){$('#jejak_detail_view').html(jmenu8("6"));}
	if(menu_num == "9"){$('#jejak_detail_view').html(jmenu9("0"));}

}