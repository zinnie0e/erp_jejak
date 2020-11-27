var htmlString = "";
var total_page;
var global_uid;
var page_code = "";
var menuTitle = "";
var popUp;
 
var SETTING_URL = "http://localhost:9090";

///l test11
//============================공퉁 함수============================

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function MsToFulldate(milisecond){
	var d = new Date(milisecond * 1000);
	var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
	var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
	var full_date = d.getFullYear().toString() + month.toString() + day.toString();
	
	return full_date;
}

function Enter_Check(code){
    // 엔터키의 코드는 13입니다.
	if(code == 0){
		if(event.keyCode == 13){
			login();
		}
	}
	else{
		if(event.keyCode == 13) SearchBook(code);
	}
}

function pasing(total_record, page, lm_t){ 
	htmlString = "";
	htmlString += 
		'<tr>'+
			'<td width="780" height="50" align="center" valign="middle"><span style="font-size:9pt;">';
	
	var total_page = Math.ceil(total_record / lm_t); // 1page == 15records  //6
	var total_block = Math.ceil(total_page / 10); // 1block == 10page 		//1
	var current_block = Math.ceil(page / 10); // 현재 내가 속한 블럭
	var first_page = (current_block - 1) * 10;
	var last_page = current_block * 10;
	if (total_block == current_block) last_page = total_page;
	
	if(current_block > 1){
		var my_page = first_page;
		htmlString +=
			'<a href="javascript:goToPage('+ my_page +');">'+
				'<img src="/resources/style/images/jejak/icon_first.gif" width="15" height="15" border="0">'+
			'</a>&nbsp;&nbsp;';
	}else{
		htmlString += '&nbsp;';
	}
	
	for(var direct_page = first_page + 1 ; direct_page <= last_page ; direct_page++){
		if(page == direct_page) htmlString += '<font color="#3399FF"><b>' + direct_page + '</b></font>&nbsp;&nbsp;';
		else{
			htmlString += 
				'<a href="javascript:goToPage('+ direct_page +');"><font color="#333333">' + direct_page + '</font></a>&nbsp;&nbsp;';
		}	
	}
	
	if(current_block < total_block){
		var my_page = last_page + 1;
		htmlString +=
			'<a href="javascript:goToPage('+ my_page +');">'+
				'<img src="/resources/style/images/jejak/icon_end.gif" width="15" height="15" border="0">'+
	  		'</a></p>';
	}else{
		htmlString +='&nbsp;';
	}
	htmlString += '</span></td></tr>';
	$("#pagination").html(htmlString);
}

function goToPage(current_page){
	if(page_code == "거래처"){
		$("#data").html("");
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/cust/select_custList1",
			async: false,
			success: function (result) {
				var total_record = result[0]["count"] 
				var lm_t = 15;	
				var lm_s = (current_page - 1) * lm_t;
				selCuList(lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	if(page_code == "전체도서검색"){
		$("#data2").html("");
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/books/select_bookList1",
			async: false,
			success: function (result) {
				var total_record = result[0]["count"] 
				var lm_t = 15;	
				var lm_s = (current_page - 1) * lm_t;
				selBookList(lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	
	if(page_code == "m2_도서검색"){
		$("#data2").html("");
		
		var from = {key: $("input[name=key]").val()}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/books/select_list_check1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"] 
				
				var lm_t = 15;	
				var lm_s = (current_page - 1) * lm_t;
				SelSearchBook(lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	
	if(page_code == "m4_도서검색"){
		$("#data2").html("");
		
		var from = {keyfield: $("select[name=keyfield]").val(), key: $("input[name=key]").val()}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_jp_yejung_regi1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"] 
				var lm_t = 15;	
				var lm_s = (current_page - 1) * lm_t;
				SelSearchBook(lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	if(page_code == "용지전표"){
		$("#data5").html("");
		
		SearchYjjp(current_page);
	}
	if(page_code == "용지등록"){
		$("#data3").html("");
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/yongji/select_yg_regi_list1",
			async: false,
			success: function (result) {
				var total_record = result[0]["count"] 
				var lm_t = 25;
				var lm_s = (current_page - 1) * lm_t;
				SearchYgRegiList(lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	if(page_code == "용지현재고"){
		$("#data8").html("");
		
		yjpresent("", "", current_page);
	}
	//도서별원가계산서
	if(page_code == "도서별원가계산서"){
		$("#mcBookCostStatementData").html(""); 

		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		var from = {date1: date1, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/monthclosing/select_bookcost_statement1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"] 
				var lm_t = 20;	
				var lm_s = (current_page - 1) * lm_t;
				SelBookCostStatement(lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	
	//잡물원가계산서
	if(page_code == "잡물원가계산서"){
		$("#mcJMCostStatementData").html(""); 

		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		var from = {date1: date1, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/monthclosing/select_jmcost_statement1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"] 
				var lm_t = 20;	
				var lm_s = (current_page - 1) * lm_t;
				SelJMCostStatement(lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	if(page_code == "제품_본문작업지시서"){
		$("#jpBonData").html("");
		
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		var from = {bdate1: date1, bdate2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_jpbon",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"];
				var lm_t = 20;	
				var lm_s = (current_page - 1) * lm_t;
				SelBonmun(1, date1, date2, lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	
	if(page_code == "잡물_본문작업지시서"){
		$("#jmBonData").html("");
		
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		var from = {tdate1: date1, tdate2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "//jmjejak/select_jmbon_list0",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"];
				var lm_t = 20;	
				var lm_s = (current_page - 1) * lm_t;
				SelBonmun(2, date1, date2, lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	
	if(page_code == "발주예정제품리스트"){
		$("#jpBalYjData").html("");
		
		var signdate = $("select[name=ty]").val() + $("select[name=tm]").val() + $("select[name=td]").val();
		
		var from = {signdate: signdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_bjlist_page_count",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"];
				var lm_t = 5;	
				var lm_s = (current_page - 1) * lm_t;
				SelJpBaljuYj(signdate, lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	
	if(page_code == "제품_제작계획표"){
		$("#jpJejakplanData").html("");
		
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		var from = {date1: date1, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_jejakplan0",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"];
				var lm_t = 10;	
				var lm_s = (current_page - 1) * lm_t;
				Searchjejakplan(1, date1, date2, lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
	
	if(page_code == "잡물_제작계획표"){
		$("#jmJejakplanData").html("");
		
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		var from = {date1: date1, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jmjejak/select_jejakplan0",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var total_record = result[0]["count"];
				var lm_t = 10;	
				var lm_s = (current_page - 1) * lm_t;
				Searchjejakplan(2, date1, date2, lm_s, lm_t);
				pasing(total_record, current_page, lm_t);
			}
		});
	}
}

//============================날짜 변화 함수============================

function SearchDays(code, bdate){
	if(code == 1){//제품제작
		var from = {bdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_jp_date",
			data : JSON.stringify(from),
			success: function (result) {
				
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td] option").remove(); //select option 초기화
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["bdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
	}
	if(code == 2){//잡물제작
		var from = {jbdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jmjejak/select_jm_date",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td] option").remove(); //select option 초기화
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["jbdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
	}
	
	if(code == 3){//둘다합친거
		$("select[name=td] option").remove(); //select option 초기화
		var from = {bdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_jp_date",
			data : JSON.stringify(from),
			success: function (result) {
				
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["bdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
		var from = {jbdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jmjejak/select_jm_date",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["jbdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
	}
	if(code == 4){//구매일보
		var from = {dbname: bdate.substring(2,6)}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_purchase_daily1",
			data : JSON.stringify(from),
			success: function (result) {
				
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td] option").remove(); //select option 초기화
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = data["s1ilja"].substring(4,6);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
	}
}

function ChangeDate(code){
	////////////
	// 년월 변경 //
	////////////
	if(code == 1 || code == 2 || code == 17 || code == 18 || code == 22 || code == 23 || code == 24 || code == 25 || code == 26 || code == 27 || code == 87){//년월 변경
		//yj_용지구입(1), yj_용지장부(2), kb_용지대(17), kb_인쇄비(18), kb_비닐비(22), kb_케이스대(23), kb_CD음반대(24), kb_스티커대(25), kb_기타(26)
		//mc_주은교육(27) 
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + "01").getTime()/1000;
		if(Number($("select[name=tm]").val()) == 12){
			year = Number($("select[name=ty]").val()) + 1;
			var date2 = new Date(year + "/" + "01" + "/" + "01").getTime()/1000;
		}else{
			month = Number($("select[name=tm]").val()) + 1;
			month = month >= 10 ? month : '0' + month;
			var date2 = new Date($("select[name=ty]").val() + "/" + month + "/" + "01").getTime()/1000;
		}
		
		if(code == 1) yongjiBuyOrder(date1, date2); 
		if(code == 2){ 
			var year = $("select[name=ty]").val().substring(2,4);
			var value = $("select[name=pgubn]").val();
			SearchYjJang(date1, date2, value, year);
		}
		if(code == 17) SelKbYongjiDae(date1, date2);
		if(code == 18) SelKbPresswork(date1, date2);
		if(code == 22) SelKbManagement(1, date1, date2);
		if(code == 23) SelKbManagement(2, date1, date2);
		if(code == 24) SelKbManagement(3, date1, date2);
		if(code == 25) SelKbManagement(4, date1, date2); 
		if(code == 26) SelKbManagement(5, date1, date2); 
		if(code == 27) SearchMkJueun(date1, date2); 
		if(code == 87) SelMonStockStatusTable(date1, date2); 
	}
	
	if(code == 3 || code == 4 || code == 12 || code == 19 || code == 20 || code == 28 || code == 29 || code == 31 || code == 33 || code == 35 || 
			code == 86 || code == 812 || code == 91){ 
		//yj_월별용지재고현황(3), 제품(4), 잡물(12), kb_제본비(19), kb_코팅비(20) 년월 변경, 
		//mc_저자료지급내역(28), mc_월별저자료지출결의서(29), mc_도서별 원가계산서(31), mc_잡물 원가계산서(33), mc_품목별 원재료명세서(월별)(35)
		//pio_구매일보(86)
		var bdate = $("select[name=ty]").val() + $("select[name=tm]").val();
		
		if(code == 3) SearchYjMonth(bdate);
		if(code == 4){ $("#jpdeaData").html(""); SearchDays(1, bdate); }
		if(code == 12) SearchDays(2, bdate);
		if(code == 19) SelKbBinding(bdate);
		if(code == 20) SearchDays(3, bdate); 
		if(code == 28) SelRoyalty(bdate); 
		if(code == 29) SelMonthlyRoyalty(bdate); 
		if(code == 31) SearchDays(1, bdate);
		if(code == 33) SearchDays(2, bdate);
		if(code == 35) SelPumMon(bdate);
		if(code == 86) SearchDays(4, bdate);
		if(code == 812) SelDailyStatus(bdate);
		if(code == 91) SelhWithholdingTax(bdate);
	}
	
	if(code == 30){ //mc_저자료 지급 내역(상/하)(30),
		var bdate = $("select[name=ty]").val();
		var gubn = $("select[name=gubn]").val();
		var gubn2 = $("select[name=gubn2]").val();
		
		SelRoyaltyUD(bdate, gubn, gubn2); 
	}
	
	if(code == 36){ 
		var bdate = $("select[name=ty]").val() + $("select[name=tm]").val() + $("select[name=tm2]").val();
		SelPumPer(bdate);
	}
	
	////////////
	//  일 변경  //
	////////////
	if(code == 5 || code == 861){//jp_발주예정(5) 일 변경
		var signdate = $("select[name=ty]").val() + $("select[name=tm]").val() + $("select[name=td]").val();
		
		if(code == 5) {
			page_code = "발주예정제품리스트";
			goToPage(1);
		}
		if(code == 861) SelPurchaseDaily(signdate); //구매일보
	}
	
	if(code == 6 || code == 8 || code == 9 || code == 10  || code == 11 || code == 13 || code == 14 || code == 15 || code == 16 || code == 21 || code == 32 || code == 34){ //일 변경
		//jp_제작계획표(6), jp_발주서(8), jp_표지작업(9), jp_본문작업(10), jp_입고대장(11)
		//jm_제작계획표(13),jm_표지작업(14), jm_본문작업(15), jm_발주서(16)
		//kb_코팅비(21)
		//mc_도서별 원가계산서(31), mc_잡물 원가계산서(34)
		
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		//제품
		if(code == 6) {
			page_code = "제품_제작계획표";
			goToPage(1);
		}
		if(code == 8) SelBalju(1, date1, date2);
		if(code == 9) SelPyoji(1, date1, date2);
		if(code == 10) {
			page_code = "제품_본문작업지시서";
			goToPage(1);
		}
		if(code == 11) SelJpWarehousing(date1, date2);
		//잡물
		if(code == 13) {
			page_code = "잡물_제작계획표";
			goToPage(1);
		}
		if(code == 14) SelPyoji(2, date1, date2);
		if(code == 15) {
			page_code = "잡물_본문작업지시서";
			goToPage(1);
		}
		if(code == 16) SelBalju(2, date1, date2);
		//직접경비
		if(code == 21) SelKbCoating(date1, date2); 
		//월결산자료
		if(code == 32) {
			page_code = "도서별원가계산서";
			goToPage(1);
		}
		if(code == 34) {
			page_code = "잡물원가계산서";
			goToPage(1);
		}
	}
}

