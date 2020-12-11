//////////////////////////////////////////
//=============== 용지관리 ===============//
/////////////////////////////////////////


//용지구입
function setOptionYongji(){ //용지구입 옵션 셋업
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/yongji/select_reg_list",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[i]; 
				$("select[name=jicode]").append("<option value='" + data["wjcode"] + "'>" + data["wjcode"] + " - " + data["wjname"] + "</option>");
			}
		}
	});
}

function setOptionCust(set_option){ //거래처 옵션 셋업
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/yongji/select_cust_yj_list",
		async: false,
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[i]; 
				
				if(set_option == 0){
					$("select[name=ccode]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] +" ("+ data["wccode"] + ")" + "</option>");
				} else if(set_option == 1){
					$("select[name=comid]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
				} else {
					$("select[name=comid_buy]").append("<option value='" + i + "'>" + data["wcname"] + "</option>");
				}
			}
			$("select[name=comid]").val("6008");
		}
	});
}

function yongjiBuyOrder(date1, date2){ //거래별원장 출력
	htmlString = 
		'<tr>' +
			'<td width="130" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><b>사용의뢰일</b></span></p></td>' +
			'<td width="260" colspan="2" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><b>용지구입</b></span></p></td>' +
			'<td width="200" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><b>거래처</b></span></p></td>' +
			'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><b>수량</b></span></p></td>' +
			'<td width="110" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><b>메뉴</b></span></p></td>' +
		'</tr>';
	
	upBuyOrder();
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_buy_order_list",
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			for(var i in object_num){
				var data = result[i]; 
				
				var fxamount = data["fxamount"];
				var num5 = Math.floor(fxamount / 500);
				var num6 = fxamount % 500;
				
				var full_date = MsToFulldate(data["jdate"]);
				full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);

				htmlString +=
					'<tr>' +
						'<td width="130" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>' +
						'<td width="190" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["yjname"] +'</span></td>' +
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">('+ data["yjcode"] +')</span></td>' +
//						'<form method="post" action="yongju3.php">' +
//							'<input type="hidden" name="jm_id" value='+ data["uid"] +'>' +
//							'<input type="hidden" name="ib" value='+ data["ib"] +'>' +
//							'<input type="hidden" name="fx" value='+ data["fxamount"] +'>' +
						'<td width="200" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if (fxamount != 0){
								htmlString += '<select name="comid_buy" style="font-family:굴림; font-size:9pt; width:180px;" size="1"></select>';
							}
							htmlString += '</span></td>' +
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><font color="red">';
							htmlString += (fxamount != 0) ? (num5 + " R " + num6) : "0";
							htmlString += '</font></span></td>' +
						'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							//구현_세션이 추가되어 권한을 파싱해야 함
							var json_data = { id : "ajk" };
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: SETTING_URL + "/login/dung",
								data : JSON.stringify(json_data),
								success: function (result) {
									logNow(result);
									
									if (result <= 1){
										var json_data = {
												uid : data["uid"],
												ib : data["ib"],
												fxamount : data["fxamount"],
												comid : $("select[name=comid_buy]").val()};
										
										if (fxamount != 0){
											htmlString += '<input type="button" value="주문" onClick="javascript:buyOrderList(' + "'" + json_data + "'" + ');">';
										}else{
											htmlString += '<input type="button" value="투입" onClick="javascript:buyOrderList(' + "'" + json_data + "'" + ');">';
										}
									}
								}
							});
							
							htmlString += '</span></td>' +
//						'</form>' +
					'</tr>';
			}
		}
	});
	
	htmlString +=
		'<!-- 기타 용지 주문 -->' +
		'<tr>' +
			'<td width="780" colspan="6" height="5" align="center" valign="middle" bgcolor="white"> </td>' +
		'</tr>' +
		//'<form name="jform" method="post" action="yongju2_b.php">' +
		'<tr>' +
			'<td width="130" height="30" align="center" valign="middle" bgcolor="white"><p><span style="font-size:9pt;">-</span></p></td>' +
			'<td width="260" colspan="2" height="30" align="center" valign="middle" bgcolor="white"><p><span style="font-size:9pt;">' +
				'<select name="jicode" style="font-family:굴림; font-size:9pt; width:200px;" size="1">' +
				'</select></span></p>' +
			'</td>' +
			'<td width="200" height="30" align="center" valign="middle" bgcolor="white"><p><span style="font-size:9pt;">' +
				'<select name="comid" style="font-family:굴림; font-size:9pt; width:180px;" size="1">' +
				'</select></span></p>' +
			'</td>' +
			'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><p><span style="font-size:9pt;">' +
				'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:50px;" name="jnum"> R</span></p>' +
			'</td>' +
			'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><p><span style="font-size:9pt;">';
				
				var json_data = {
						jicode : $("select[name=jicode]").val(),
						comid : $("select[name=comid]").val(),
						jsum : $('input[name=jnum]').val()};
				
				htmlString += '<input type="button" value=" 구 입 " onclick="javascript:buyOrder(' + "'" + json_data + "'" + ');"></span></p>' +
			'</td>' +
		'</tr>';
		
	$('#data9').html(htmlString);
	
	setOptionYongji();
	setOptionCust(1);
	setOptionCust(2);
	
	htmlString = 
		'<tr>'+
			'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구입일</span></td>'+
			'<td width="75" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구입처</span></td>'+
			'<td width="55" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">용지코드</span></td>'+
			'<td width="105" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">품명</span></td>'+
			'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">공장도단가</span></td>'+
			'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">할인율</span></td>'+
			'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구입단가</span></td>'+
			'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구매수량</span></td>'+
			'<td width="75" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
			'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">세액</span></td>'+
			'<td width="75" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">합계</span></td>'+
		'</tr>';
	
	//검증필요_구현_ 미입력분 수식 수정필요, 할인입력 구현필요
	var from = { date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/yongji/select_order_list",
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			var cnum1; var cnum2; var cost1; var tax1; 
			var sum1 = 0; var sum2 = 0; var sum3 = 0;
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
				
				if(data["num"] > 0){
					cnum1 = Math.floor((data["num"]) / 500);
					cnum2 = data["num"] % 500;
				}else{
					cnum1 = Math.floor((data["num"]) / 500) * -1;
					cnum2 = (data["num"] * -1) % 500;
				}
				var danga = Math.round((data["n_fac"] * (100 - data["n_halin"])) / 100);
				if(data["tprice"] > 0){
					cost1 = Math.round(data["tprice"] / 1.1);
					tax1 = data["tprice"] - cost1;
				}else{
					cost1 = Math.round((data["tprice"] * -1) / 1.1);
					tax1 = ((data["tprice"] * -1) - cost1) * -1;
					cost1 *= -1;
				}
				sum1 += cost1;
				sum2 += tax1;
				sum3 += data["num"];
				
				htmlString += 
					'<tr>'+
						'<td height="30" width="60" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 1 + ',' + data["uid"] + ',' + MsToFulldate(data["date"]) +');">'+ full_date +'</a></span></td>'+
						'<td height="30" width="75.5" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 2 + ',' + data["uid"] + ',' + "'" + data["wcname"] + "'" +');">'+ data["wcname"] +'</a></span></td>'+
						'<td height="30" width="55" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 3 + ',' + data["uid"] + ',' + "'" + data["wjname"] + '/' + data["jicode"] + "'" +' );">'+ data["jicode"] +'</a></span></td>'+
						'<td height="30" width="105.7" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:4pt;">'+ data["wjname"] +'</span></td>'+
						'<td height="30" width="60" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(data["n_fac"]) +'</span></td>'+
						'<td height="30" width="40" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<input type="text" style="width:38px;"size="3" name="n_hal[]" value="'+ data["n_halin"].toFixed(1) +'" onKeypress="if(event.keyCode == 13){javascript:buyHalin('+ "'" + data["uid"] + "'," + "'" + data["jicode"] + "'," + 'this.value);}"></span></td>'+
						'<td height="30" width="70.5" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(danga) +'</span></td>'+
						'<td height="30"  align="center" valign="middle" bgcolor="white">'+
							'<table border="0">'+
								'<tr>'+
									'<td width="35" align="right"><span style="font-size:9pt; padding-right:3pt;">'+ cnum1 +'</span></td>'+
									'<td width="11" align="center"><span style="font-size:9pt;">R</span></td>'+
									'<td width="35" align="left"><span style="font-size:9pt; padding-left:3pt;">'+ cnum2 +'</span></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
						'<td height="30" width="76" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(cost1) +'</span></td>'+
						'<td height="30" width="70" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(tax1) +'</span></td>'+
						'<td height="30" width="77" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(cost1+tax1) +'</span></td>'+
						'<input type="hidden" name="uid[]" value="<?=$row[uid]?>">'+
						'<input type="hidden" name="jcode[]" value="<?=$row[jicode]?>">'+
					'</tr>';
			}
		}
	});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/yongji/select_order_list_input",
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			var cnum1; var cnum2; var cost1; var tax1; 
			var sum1 = 0; var sum2 = 0; var sum3 = 0;
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
				
				if(data["num"] > 0){
					cnum1 = Math.floor((data["num"]) / 500);
					cnum2 = data["num"] % 500;
				}else{
					cnum1 = Math.floor((data["num"]) / 500) * -1;
					cnum2 = (data["num"] * -1) % 500;
				}
				var danga = Math.round((data["n_fac"] * (100 - data["n_halin"])) / 100);
				if(data["tprice"] > 0){
					cost1 = Math.round(data["tprice"] / 1.1);
					tax1 = data["tprice"] - cost1;
				}else{
					cost1 = Math.round((data["tprice"] * -1) / 1.1);
					tax1 = ((data["tprice"] * -1) - cost1) * -1;
					cost1 *= -1;
				}
				sum1 += cost1;
				sum2 += tax1;
				sum3 += data["num"];
				
				htmlString += 
					'<tr>'+
						'<td height="30" width="60" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 1 + ',' + data["uid"] + ',' + MsToFulldate(data["date"]) +');">'+ full_date +'</a></span></td>'+
						'<td height="30" width="75.5" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 2 + ',' + data["uid"] + ',' + "'" + data["wcname"] + "'" +');">'+ data["wcname"] +'</a></span></td>'+
						'<td height="30" width="55" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 3 + ',' + data["uid"] + ',' + "'" + data["wjname"] + '/' + data["jicode"] + "'" +' );">'+ data["jicode"] +'</a></span></td>'+
						'<td height="30" width="105.7" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:4pt;">'+ data["wjname"] +'</span></td>'+
						'<td height="30" width="60" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(data["n_fac"]) +'</span></td>'+
						'<td height="30" width="40" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + data["n_halin"].toFixed(1) + '</span></td>'+
						'<td height="30" width="70.5" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(danga) +'</span></td>'+
						'<td height="30"  align="center" valign="middle" bgcolor="white">'+
							'<table border="0">'+
								'<tr>'+
									'<td width="35" align="right"><span style="font-size:9pt; padding-right:3pt;">'+ cnum1 +'</span></td>'+
									'<td width="11" align="center"><span style="font-size:9pt;">R</span></td>'+
									'<td width="35" align="left"><span style="font-size:9pt; padding-left:3pt;">'+ cnum2 +'</span></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
						'<td height="30" width="76" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(cost1) +'</span></td>'+
						'<td height="30" width="70" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(tax1) +'</span></td>'+
						'<td height="30" width="77" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(cost1+tax1) +'</span></td>'+
						'<input type="hidden" name="uid[]" value="<?=$row[uid]?>">'+
						'<input type="hidden" name="jcode[]" value="<?=$row[jicode]?>">'+
					'</tr>';
			}
			
			htmlString += 
				'<tr>'+
					'<td colspan="7" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt; letter-spacing:50;">합계</span></td>'+
					'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<table width="100%" border="0">'+
							'<tr>'+
								'<td width="40%" align="right"><span style="font-size:9pt; padding-right:3pt;"><a id="sum31"></a></span></td>'+
								'<td width="20%" align="center"><span style="font-size:9pt;">R</span></td>'+
								'<td width="40%" align="left"><span style="font-size:9pt; padding-left:3pt;"><a id="sum32"></a></span></td>'+
							'</tr>'+
						'</table></span>'+
					'</td>'+
					'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;"><a id="sum1"></a></span></td>'+
					'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;"><a id="sum2"></a></span></td>'+
					'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;"><a id="sum3"></a></span></td>'+
				'</tr>';
		
			$("#data6").html(htmlString);
			(document.getElementById("sum31")).innerHTML = Math.floor(sum3 / 500);
			(document.getElementById("sum32")).innerHTML = sum3 % 500;
			(document.getElementById("sum1")).innerHTML = numberWithCommas(sum1);
			(document.getElementById("sum2")).innerHTML = numberWithCommas(sum2);
			(document.getElementById("sum3")).innerHTML = numberWithCommas(sum1+sum2);
		}
	});
}

//검증필요_ update 포함 - 입 력
function buyOrderInput(){
	//uid[] 있음, sum[] 없음, num[] 없음
	//jcode[]은 있지만 jcode로 파싱됨(jcode는 없음)
	var input_check = confirm("용지 구입가 입력 하시겠습니까??");
	if(input_check){
		var uid = $('input[name="uid[]"]');
		var jcode = $('input[name="jcode[]"]');
		var sum = $('input[name="sum[]"]');
		var num = $('input[name="num[]"]');
		for(var i = 0; i < sum.length; i++){
			if(sum[i] != null && sum[i] > 0){
				var json_data = { uid: uid[i], wjcode: jcode[i], tprice: sum[i], num: num[i] };
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/up_order_input",
					data: JSON.stringify(json_data),
					success: function (result) {
						logNow(result);
					}
				});
			}
		}
	}
}

//검증필요_ update 포함 - 할인
function buyHalin(uid, jicode, halin){
	var json_data = { uid: uid, wjcode: jicode, halin: halin };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		url: SETTING_URL + "/jpjejak/up_buy_halin",
		data: JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
			
			yongjiBuyOrder($('select[name=ty]').val(), $('select[name=tm]').val());
		}
	});
}

//검증필요_ insert 포함 - 구 입
function buyOrder(json_data){
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		async: false,
		url : SETTING_URL + "/yongji/in_order_check_input",
		data : JSON.stringify(json_data),
		success : function(result) {
			logNow(result);
			
			yongjiBuyOrder($('select[name=ty]').val(), $('select[name=tm]').val());
		},
	});
}

//검증필요_ insert, update 포함 - 주문 및 투입
function buyOrderList(json_data){
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		async: false,
		url : SETTING_URL + "/yongji/in_order_check_input_list",
		data : JSON.stringify(json_data),
		success : function(result) {
			logNow(result);
			
			yongjiBuyOrder($('select[name=ty]').val(), $('select[name=tm]').val());
		},
	});
}

//검증필요_ insert 포함 - 용지 계산
function inBuyOrder(){
	$.ajax({
		type: "POST",
		dataType: "text",
		url : SETTING_URL + "/yongji/in_buy_order",
		success : function(result) {
			logNow(result);
		}
	});
}

//검증 필요 update 포함
function upBuyOrder(){
	$.ajax({
		type: "POST",
		dataType: "text",
		url : SETTING_URL + "/yongji/up_buy_order",
		success : function(result) {
			logNow(result);
		}
	});
}

//-----코드정리 여기부터
function showPopUp(code, uid, title){ //거래별원장 구입일, 구입처, 용지코드 수정 팝업 //팝업창 여러개띄우기 //해야함 미완성
	popUp = "";
	global_uid = "";
	global_uid = uid;
	var t_URL = "/popup?uid=" + uid;
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, uid, 'left=0,top=0,width=390,height=350,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	
	if(code == 1){//구입일 팝업
		popUp.document.write(jmenu3("0-구입일-popup"));
		
		title = (title.toString()).substring(0,4) + "-" + (title.toString()).substring(4,6) + "-" + (title.toString()).substring(6,8);
		(popUp.document.getElementById("dsend")).innerHTML = title;
		return;
	}
	if(code == 2){//구입처 팝업
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/yongji/select_cust_wcname_yj_list",
			success: function (result) {
				popUp.document.write(jmenu3("0-구입처-popup"));
				(popUp.document.getElementById("wcname")).innerHTML = title;
				
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					
					var data = result[object_num[i]]; 
					
					var objOption = document.createElement("option");
				    objOption.text = data["wcname"];
				    objOption.value = data["wccode"];
				    
				    (popUp.document.getElementById("comm")).append(objOption);
				}
			}
		});
	}
	if(code == 3){//용지코드 팝업
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/yongji/sel_order_detail_code_list",
			success: function (result) {
				popUp.document.write(jmenu3("0-용지-popup"));
				var title_split = title.split('/');
				(popUp.document.getElementById("wjname")).innerHTML = title_split[0];
				(popUp.document.getElementById("jicode")).innerHTML = title_split[1];
				
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var objOption = document.createElement("option");
				    objOption.text = data["wjname"] + " - " + data["wjcode"];
				    objOption.value = data["wjcode"];
				    
				    (popUp.document.getElementById("yjyj")).append(objOption);
				}
			}
		});
	}
}

function UpPopUp(code){//팝업 데이터 업데이트
	if(code == 1){
		var yyy = popUp.document.getElementById("yyy").value;
		var mmm = popUp.document.getElementById("mmm").value;
		var ddd = popUp.document.getElementById("ddd").value;
		
		if (yyy == "") return popUp.document.getElementById("yyy").focus(); //포커스 고정
		if (mmm == "") return popUp.document.getElementById("mmm").focus();
		if (ddd == "") return popUp.document.getElementById("ddd").focus();
		
		var date = new Date(yyy + "/" + mmm + "/" + ddd).getTime()/1000;
		logNow(date);
		
		var from = {
		    uid: global_uid,
		    wccode: date
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/yongji/up_order_detail_date",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				popUp.close();
			},
			error : function(){
			}
		});
		return;
	}
	if(code == 2){
		var s = popUp.document.getElementById("comm");
	    var temp = s.options[s.selectedIndex].value;
	    logNow(temp);

	    logNow(global_uid);
	    
	    var from = {
	    	uid: global_uid,
	    	wccode: temp
	    }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/yongji/up_order_detail_cust",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				popUp.close();
			},
			error : function(){
			}
		});
		return;
	}
	if(code == 3){
		var s = popUp.document.getElementById("yjyj");
	    var temp = s.options[s.selectedIndex].text;
	    temp = temp.split(' - ');
	    logNow(temp[0]);
	    logNow(temp[1]);

	    logNow(global_uid);
	    
	    var from = {
	    	uid: global_uid,
	    	wjcode: temp[1],
	    	wjname: temp[0]
	    }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/yongji/up_order_detail_code",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				popUp.close();
			},
			error : function(){
			}
		});
		return;
	}
}

//거래처별 구매
function SearchYjCu(){ 
	var date1 = new Date($("select[name=sy]").val() + "/"
			+ $("select[name=sm]").val() + "/"
			+ $("select[name=sd]").val()).getTime() / 1000;
	var date2 = new Date($("select[name=ey]").val() + "/"
			+ $("select[name=em]").val() + "/"
			+ $("select[name=ed]").val()).getTime() / 1000;
	var wccode = $("select[name=ccode]").val();
	
	var from = { wccode: wccode, date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/yongji/select_cust_buy_list",
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			var p1 = 0; var p2 = 0; var p3 = 0; 
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; // json data
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var tsum = data["tprice"]
				var tprice = Math.round(tsum/1.1);
				var ttax = tsum - tprice;
				
				p1 += tprice; p2 += ttax; p3 += tsum;
				
				htmlString += 
					'<tr>'+
						'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="231" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wjname"] +'</span></td>'+
						'<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ Math.floor((data["num"])/500) + " R " + (data["num"])%500 +'</span></td>'+
						'<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(Math.round(data["danga"])) + '</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(tprice) +'</span></td>'+
						'<td width="70" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(ttax) +'</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(tsum) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
					'</tr>';
			}
			$("#data4").html(htmlString);
			(document.getElementById("tprice")).innerHTML = numberWithCommas(p1);
			(document.getElementById("ttax")).innerHTML = numberWithCommas(p2);
			(document.getElementById("tsum")).innerHTML = numberWithCommas(p3);
		}
	});
}

//용지전표
function SearchYjjp(current_page){
	$("#data5").html("");
	
	var sdate_val = $('input[name=sdate]').val();
	var edate_val = $('input[name=edate]').val(); 
	
	var date1;
	var date2;
	
	var year;
	var set_sdate;
	var set_edate;
	
	var now = new Date();
	if(sdate_val == "" && edate_val == ""){
		year = now.getYear();
		set_sdate = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + "01";
		set_edate = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDate();
		
		$('input[name=sdate]').val(now.getFullYear() + "" + (now.getMonth()+1) + "" + "01");
		$('input[name=edate]').val(now.getFullYear() + "" + (now.getMonth()+1) + "" + now.getDate());
	} else {
		if(sdate_val == "" || edate_val == "") return alert("각각 년도를 입력해야합니다.");
		if (sdate_val.substring(0, 4) != edate_val.substring(0, 4)) return alert("같은 년도를 입력해야합니다.");
		if(sdate_val.length != 8 || edate_val.length != 8) return alert("각각 8자리를 입력해야합니다.");
		
		year = sdate_val.substring(2, 4);
		set_sdate = sdate_val.substring(0, 4) + "/" + sdate_val.substring(4,6) + "/" + sdate_val.substring(6,8);
		set_edate = edate_val.substring(0, 4) + "/" + edate_val.substring(4,6) + "/" + edate_val.substring(6,8);
	}
	
	date1 = new Date(set_sdate).getTime() / 1000;
	date2 = new Date(set_edate).getTime() / 1000;
	
	var from = { value: year, date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/yongji/select_jp_list",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var min_date = 0;
			
			var object_num = Object.keys(result);
			
			pasing(object_num.length, current_page, 15);
			
			htmlString = "";
			for(var i in object_num){
				var show_list = (current_page * 15);
				var start_list = show_list - 15;
				
				if(i >= start_list && i < show_list){
					var data = result[object_num[i]]; // json data
					var num3; var num4; var wccode;
					
					var full_date = MsToFulldate(data["bdate"]);
					full_date = full_date.substring(0,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
					
					if(!data["spcom"]){ // 구매
						wccode = data["buycom"];
					}else{ // 제작
						wccode = data["spcom"];
					}
					
					if(data["jsum"] > 0){
						num3 = Math.floor((data["jsum"])/500);
						num4 = data["jsum"]%500;
					}else{
						num3 = Math.floor(((data["jsum"])*-1)/500)*-1;
						num4 = data["jsum"]%500*-1;
					}
					htmlString += 
						'<tr>'+
							'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["uid"] +'</span></td>'+
							'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="200" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(data["bname"] == null || data["comment"] == null){ htmlString += '入</span></td>';}
							else{ htmlString += data["bname"] + ' - ' + data["comment"] +'</span></td>';} htmlString += 
							'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:yjpresent('+ "'" + data["jiname"] + "','" + data["jicode"] + "','1'" +');">'+ data["jiname"] +'</a></span></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
								if(num3) htmlString += num3 + " R ";
								if(num4) htmlString += num4; htmlString += '</span></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
								'<input type="button" value=" .. " onclick="javascript:showPopUpJP('+ "'" + data["uid"] + "'," + "'" + MsToFulldate(data["bdate"]) + "'" + ');"></span>'+
							'</td>'+
						'</tr>';
				}
				$("#data5").html(htmlString);
				
				if(current_page == 1){
					var data = result[object_num[i]];
					var full_date = MsToFulldate(data["bdate"]);
					
					if(min_date == 0) min_date = parseInt(full_date);
					
					logNow(min_date + "/" + parseInt(full_date));
					
					if(min_date > parseInt(full_date)) min_date = parseInt(full_date);
					
				}
			}
			
			if(current_page == 1 && min_date != 0){
				$('input[name=sdate]').val(min_date);
			}
		}
	});
}

function showPopUpJP(uid, full_date){ //원재료 링크 팝업
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open("/popup", "2-전표-popup", 'left=0,top=0,width=500,height=390,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu3("2-전표-popup"));
	
	var a1; var a2;
	var b1; var b2; var b3;
	var c1; var c2;
	var d1; var d2;
	var e1; var e2;
	var f1; var f2;
	var g1; var g2; var g3; var g11; var g22; var g33; var set_g1; var set_g2; var set_g3;
	var h1;
	var i1;
	var j1;
	
	if("2018" == full_date.substring(0,4) &&
			((uid >= 1689 && uid <= 1702) ||
			(uid >= 1741 && uid <= 1744) ||
			(uid >= 1975 && uid <= 1982) ||
			(uid >= 1870 && uid <= 1873))){
		popUp.document.getElementById("a1").innerHTML = "타라";
	} else {
		popUp.document.getElementById("a1").innerHTML = "삼광사";
	}
	
	popUp.document.getElementById("a2").innerHTML = uid;
	
	popUp.document.getElementById("b1").innerHTML = full_date.substring(0,4);
	popUp.document.getElementById("b2").innerHTML = full_date.substring(4,6);
	popUp.document.getElementById("b3").innerHTML = full_date.substring(6,8);
	
	var from = { value: full_date.substring(2,4) ,uid: uid} 
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/sel_yj_jeon_popup",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			
			popUp.document.getElementById("c1").innerHTML = result["bname"];
			popUp.document.getElementById("c2").innerHTML = result["bcode"];
			
			if(result["popup_value"][0] != ""){
				popUp.document.getElementById("d1").innerHTML = result["comment"];
			} else {
				popUp.document.getElementById("d1").innerHTML = "入";
			}
			
			if(result["busu"] != 0){
				popUp.document.getElementById("d2").innerHTML = numberWithCommas(result["busu"]) + " 부";
			}
			
			popUp.document.getElementById("e1").innerHTML = result["panh"];
			
			if(result["myun"] != 0){
				popUp.document.getElementById("e2").innerHTML = numberWithCommas(result["myun"]) + " 면";
			}
			
			popUp.document.getElementById("f1").innerHTML = result["jiname"];
			popUp.document.getElementById("f2").innerHTML = result["jicode"];
			
			if(result["jnum1"] != 0){
				g1 = Math.floor(result["jnum1"] / 500)
				g11 = result["jnum1"] % 500;
				
				if(g1 > 0){
					set_g1 = g1 + " R " + g11;
				} else {
					set_g1 = g11;
				}
				
				popUp.document.getElementById("g1").innerHTML = set_g1;
			}
			if(result["jnum2"] != 0){
				g2 = Math.floor(result["jnum2"] / 500);
				g22 = result["jnum2"] % 500;
				
				if(g2 > 0){
					set_g2 = g2 + " R " + g22;
				} else {
					set_g2 = g22;
				}
				
				popUp.document.getElementById("g2").innerHTML = set_g2;
			}
			if(result["jsum"] != 0){
				if(result["jsum"] > 0){
					g3 = Math.floor(result["jsum"] / 500);
					g33 = result["jsum"] % 500;
					
					if(g3 > 0){
						set_g3 = g3 + " R " + g33;
					} else {
						set_g3 = g33;
					}
					
					popUp.document.getElementById("g3").innerHTML = set_g3;
				} else {
					g3 = Math.floor((result["jsum"] * (-1)) / 500) * (-1);
					g33 = result["jsum"] % 500 * (-1);
					
					if(g3 > 0){
						set_g3 = g3 + " R " + g33;
					} else {
						set_g3 = g33;
					}
					
					popUp.document.getElementById("g3").innerHTML = set_g3;
				}
			}
			
			popUp.document.getElementById("h1").innerHTML = result["popup_value"][1];
			popUp.document.getElementById("i1").innerHTML = result["popup_value"][2];
			popUp.document.getElementById("j1").innerHTML = string.com_name;
		}
	});
}
	
//용지등록하기
function SearchYgRegiList(lm_s, lm_t){ 
	var from = {lm_s: lm_s, lm_t: lm_t}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_yg_regi_list2",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result);
			var num1; var num2; 
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				if (data["curno"] >= 0){
					num1 = Math.floor((data["curno"])/500);
					num2 = (data["curno"])%500;
				}else{
					num1 = (Math.floor(((data["curno"])*-1)/500)*-1);
					num2 = (data["curno"])%500;
				}
				
				$("select[name=jicode]").append("<option value='" + data["wjcode"] + "'>" + data["wjcode"] + " - " + data["wjname"] + "</option>");
				
				htmlString += 
					'<tr>'+
						'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="yjang.htm?uid=<?=$my_uid?>">' + data["wjcode"] + '</a></span></td>'+
						'<td width="200" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:10px;"><span style="font-size:9pt;"><a href="javascript:yjpresent('+ "'" + data["wjname"] + "','" + data["wjcode"] + "','1'" +');">' + data["wjname"] + '</a></span></p></td>'+
						'<td width="100" height="30" align="center" valign="middle" bgcolor="white">'+
							'<table width="100" border="0">'+
								'<tr>'+
									'<td width="40" align="right"><span style="font-size:9pt; padding-right:3;">'; if(num1) htmlString += num1; htmlString += '</span></td>' +
									'<td width="20" align="center"><span style="font-size:9pt;">'; if(num1) htmlString += ' R '; htmlString += '</span></td>' +
									'<td width="40" align="left"><span style="font-size:9pt; padding-left:3;">'; if(num2) htmlString += num2; htmlString += '</span></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
						'<td width="100" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:15pt;">' + numberWithCommas(Math.round(data["danga"])) + '</span></td>'+
						'<td width="100" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:15pt;">' + numberWithCommas(data["facdanga"]) + '</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">' + (Math.round(data["halin"]*10)/10.0).toFixed(1) + '</span></td>'+
						'<td width="100" height="30" align="center" valign="middle" bgcolor="white">'+
							'<table border="0" cellpadding="0" cellspacing="0" width="100%">'+
								'<tr>'+
									'<td width="50" align="center" valign="middle"><a href="javascript:ModiYongjiList(' + data["uid"] + ');"><img src="/resources/style/images/jejak/btn_modify.gif" width="40" height="20" border="0"></a></td>'+
									'<td width="50" align="center" valign="middle"><a href="javascript:DelYongjiList(' + data["uid"] + ');"><img src="/resources/style/images/jejak/btn_delete.gif" width="40" height="20" border="0"></a></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
					'</tr>';
			}
			$("#data3").html(htmlString);
		}
	});
}

function RegistYongji(){ //용지 등록 폼
	$('#jejak_detail_view').html(jmenu3("3-등록"));
}

function InYongjiList(){ //용지 등록하기
	var ycode = $("input[name=ycode]").val(); //코드
	var yname = $("input[name=yname]").val(); //용지명
	var yrr = $("input[name=yrr]").val(); //현재고
	var ydan = $("input[name=ydan]").val(); //현단가
	var facdanga = $("input[name=facdanga]").val(); //공장도가
	var halin = $("input[name=halin]").val(); //할인율
	var ib = $("select[name=ib]").val(); //입사용지
	var wjtype = $("select[name=wjtype]").val(); //용지구분
	var op1 = $("input[name=op1]").val(); //평량
	var op2 = $("input[name=op2]").val(); //규격
	var op3 = $("input[name=op3]").val(); //중량

	var from = {
		wjcode: ycode, 
		wjname: yname,
		//yrr: yrr,
		danga: ydan,
		facdanga: facdanga,
		halin: halin,
		ib: ib,
		wjtype: wjtype,
		op1: op1,
		op2: op2,
		op3: op3
	}
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/yongji/insert_reg",
		data: JSON.stringify(from),
		success: function (result) {
			logNow(result);
			alert('성공');
		},
		error: function () {
		}
	});
}

function ModiYongjiList(uid){
	$('#jejak_detail_view').html(jmenu3("3-수정"));
	var from = {uid: uid}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/yongji/select_reg_detail",
		data : JSON.stringify(from),
		success: function (result) {
			var data = result;
			logNow(data);
			$("input[name=ycode]").val(data["wjcode"]);
			$("input[name=yname]").val(data["wjname"]);
			$("input[name=yrr]").val(data["curno"]);
			$("input[name=ydan]").val(data["danga"]);
			$("input[name=facdanga]").val(data["facdanga"]);
			$("input[name=halin]").val(data["halin"]);
			$("select[name=ib]").val(data["ib"]);
			$("select[name=wjtype]").val(data["wjtype"]);
			$("input[name=op1]").val(data["op1"]);
			$("input[name=op2]").val(data["op2"]);
			$("input[name=op3]").val(data["op3"]);
		}
	});
	
	document.getElementById("btn_UpIt").onclick = function() { //등록하기 버튼 클릭
		var ycode = $("input[name=ycode]").val(); //코드
		var yname = $("input[name=yname]").val(); //용지명
		var yrr = $("input[name=yrr]").val(); //현재고
		var ydan = $("input[name=ydan]").val(); //현단가
		var facdanga = $("input[name=facdanga]").val(); //공장도가
		var halin = $("input[name=halin]").val(); //할인율
		var ib = $("select[name=ib]").val(); //입사용지
		var wjtype = $("select[name=wjtype]").val(); //용지구분
		var op1 = $("input[name=op1]").val(); //평량
		var op2 = $("input[name=op2]").val(); //규격
		var op3 = $("input[name=op3]").val(); //중량

		var from = {
			uid: uid,
			wjcode: ycode, 
			wjname: yname,
			//yrr: yrr,
			danga: ydan,
			facdanga: facdanga,
			halin: halin,
			ib: ib,
			wjtype: wjtype,
			op1: op1,
			op2: op2,
			op3: op3
		}
		
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/yongji/update_reg",
			data: JSON.stringify(from),
			success: function (result) {
				alert("데이터 수정 완료");
			},
			error: function () {
			}
		});
	}
}

function yjpresent(wjname, wjcode, current_page){ //용지현재고
	if(wjcode != ""){
		$('#jejak_detail_view').html(jmenu3("3-용지현재고"));
		
		(document.getElementById("wjname")).innerHTML = wjname;
		(document.getElementById("wjcode")).innerHTML = wjcode;
	}
	
	logNow(wjcode + "/" + document.getElementById("wjcode").innerText);
	
	var from = {jicode: document.getElementById("wjcode").innerText}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url : SETTING_URL + "/yongji/select_yj_io_list",
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			page_code = "용지현재고";
			pasing(object_num.length, current_page, 15);
			
			htmlString = "";
			for(var i in object_num){
				var show_list = (current_page * 15);
				var start_list = show_list - 15;
				
				if(i >= start_list && i < show_list){
					var data = result[object_num[i]]; 
					var num1 = 0; var num2 = 0; var cnum1 = 0; var cnum2 = 0; 
					
					var full_date = MsToFulldate(data["date"]);
					full_date = full_date.substring(0,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
					
					if(data["num"] >= 0){
						num1 = Math.floor(data["num"] / 500);
						num2 = (data["num"] % 500);
					}else{
						if (data["comment"] == "入"){
							num1 = Math.floor((data["num"]*-1) / 500)*-1;
							num2 = (data["num"] % 500)*-1;
						}else{
							num1 = Math.floor((data["num"]*-1) / 500);
							num2 = (data["num"] % 500)*-1;
						}
					}
					
					if (data["curno"] >= 0){
						cnum1 = Math.floor(data["curno"] / 500);
						cnum2 = data["curno"] % 500;
					}else{
						cnum1 = Math.floor((data["curno"] * -1) / 500);
						cnum1 = cnum1 * -1;
						cnum2 = data["curno"] % 500;
					}
					
					htmlString += 
						'<tr>'+
							'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + full_date + '</span></td>'+
				            '<td width="240" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + data["comment"] + '</span></td>'+
				            '<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + data["jeon"] + '</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(data["comment"] == "入"){ if(num1) htmlString += num1 + " R "; htmlString += num2; } else htmlString += "&nbsp;"; htmlString += '</span></td>'+
				            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(data["comment"] != "入"){ if(num1) htmlString += num1 + " R "; htmlString += num2; } else htmlString += "&nbsp;"; htmlString += '</span></td>'+
				            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(cnum1) htmlString += cnum1 + " R "; htmlString += cnum2 + '</span></td>'+
				            '<td width="130" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + data["wcname"] + '</span></td>'+                   
			            '</tr>';
				}
			}
			$("#data8").html(htmlString);
		},
		error : function(){
		}
	});
}

function DelYongjiList(uid){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid: uid};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/yongji/delete_reg",
			data : JSON.stringify(from),
			success : function(result) {
				alert("데이터 삭제 완료");
			},
			error : function(){
			}
		});
	}
}

//용지장부
function SearchYjJang(date1, date2, value, year){ 
	var yj_list;
	if(value == "1"){ //용지별
		htmlString = "";
		$("#yjjang").html(htmlString);
		
		$.ajax({
			type: "POST",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/yongji/select_jang_yj_list",
			success: function (result) {
				var object_num = Object.keys(result); 
				for (var n in object_num) {
					var data = result[n];
					
					var from = { wjcode: data["wjcode"], date1: date1, date2: date2 }
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url : SETTING_URL + "/yongji/select_jang_yj_io_list",
						data : JSON.stringify(from),
						success : function(result2) {
							if(result2.length){
								htmlString +=
									'<tr>'+
										'<td width="780" colspan="6" height="30" align="left" valign="middle" bgcolor="#EEEEEE"><span style="font-size:11pt; padding-left:10pt;"><b>'+
										'* '+ data["wjname"] +' ('+ data["wjcode"] +')</b></span></td>'+
			                        '</tr>';
							}
							
							var object_num = Object.keys(result2);
							
							for (var i in object_num) {
								var data2 = result2[i];
								
								if (!data2["num"]) continue;
								
								var cur_1 = Math.floor(data2["curno"] / 500);
								var cur_2 = data2["curno"] % 500;

								var new_num = Math.abs(data2["num"]);
								var num_1 = Math.floor(new_num / 500);
								var num_2 = new_num % 500;
								
								var jjnum = ""; var jjgubn = "";
								
								if (data2["num"] < 0){
									var from = { value: year, jeon: data2["jeon"] }
										
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										async: false,
										url : SETTING_URL + "/yongji/select_jang_yj_bu_list",
										data : JSON.stringify(from),
										success : function(result3) {
											jjgubn = result3["comment"];
											jjnum = result3["busu"];
										},
										error : function(){
										}
									});
								} else jjgubn = "";
								
								htmlString +=
									'<tr>'+
					                   	'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ MsToFulldate(data2["date"]).substring(6,8) +'</span></td>'+
					                   	'<td width="330" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+
					                       '<table border="0" width="320" cellpadding="0" cellspacing="0">'+
						                       	'<tr>'+
						                       		'<td align="left" width="240"><span style="font-size:9pt; padding-left:5pt; letter-spacing:-1pt;">'+ data2["comment"] +'</span></td>'+
						                   			'<td align="center" width="30"><span style="font-size:9pt;">'+ jjgubn +'</span></td>'+
						                   			'<td align="right" width="50"><span style="font-size:9pt; padding-right:0pt;">'; if(data2["num"] < 0) htmlString += numberWithCommas(Number(jjnum)); htmlString += '</span></td>'+
						                       	'</tr>'+                        	
						                    '</table></span>'+
						                '</td>'+
				                        '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["jeon"] +'</span></td>';
								if(data2["num"] > 0){
									htmlString +=
										'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                        '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
						                    	'<tr>'+
						                   			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
						                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
						                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
						                   		'</tr>'+
						                   	'</table></span>'+
						                '</td>';
								}else{
									htmlString +=
										'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>';
								}
								if(data2["num"] < 0){
									htmlString +=
						                '<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						                    '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
						                    	'<tr>'+
						                   			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
						                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
						                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
						                   		'</tr>'+
						                   	'</table></span>'+
						                '</td>';
								}else{
									htmlString +=
										'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>';
								}
									htmlString +=
					                    '<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    	'<table border="0" width="100" cellpadding="0" cellspacing="0">'+
						                    	'<tr>'+
						                    		'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(cur_1) +'</span></td>'+
						                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
						                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ cur_2 +'</span></td>'+
						                   		'</tr>'+
						                   	'</table></span>'+
						                '</td>'+
						            '</tr>';
							}
						},
						error : function(){
						}
					});
				}
				
				htmlString +=
				'<tr>'+
					'<td width="780" colspan="6" height="30" align="left" valign="middle" bgcolor="#EEEEEE"><span style="font-size:11pt; padding-left:10pt;"><b>'+
					'* 기타용지</b></span></td>'+
                '</tr>';
				
				var from = { date1: date1, date2: date2 }
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/yongji/select_jang_yj_other1",
					data : JSON.stringify(from),
					success: function (result) {
						var object_num = Object.keys(result); 
						for (var n in object_num) {
							var data = result[n];
							var data2;
							
							var from = { jicode: data["jicode"] }
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url : SETTING_URL + "/yongji/select_jang_yj_other2",
								data : JSON.stringify(from),
								success : function(result2) {
									data2 = result2;
								},
								error : function(){
								}
							});
							
							if(data2["jsuns"] != 99) continue;
							if(!data["num"]) continue;
							
							var cur_1 = Math.floor(data["curno"] / 500);
							var cur_2 = data["curno"] % 500;
							
							var new_num = Math.abs(data["num"]);
							var num_1 = Math.floor(new_num / 500);
							var num_2 = new_num % 500;
							
							var jjnum = ""; var jjgubn = "";
							
							if (data["num"] < 0){
								var from = { value: year, jeon: data["jeon"] }
									
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									async: false,
									url : SETTING_URL + "/yongji/select_jang_yj_bu_list",
									data : JSON.stringify(from),
									success : function(result3) {
										jjgubn = result3["comment"];
										jjnum = result3["busu"];
									},
									error : function(){
									}
								});
							} else jjgubn = "";
							
							htmlString +=
								'<tr>'+
				                   	'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ MsToFulldate(data["date"]).substring(6,8) +'</span></td>'+
				                   	'<td width="330" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+
				                       '<table border="0" width="320" cellpadding="0" cellspacing="0">'+
					                       	'<tr>'+
					                       		'<td align="left" width="240"><span style="font-size:9pt; padding-left:5pt; letter-spacing:-1pt;">' + data2["wjname"] + '&nbsp;&nbsp;&nbsp;' + data["comment"] + '</span></td>'+
					                   			'<td align="center" width="30"><span style="font-size:9pt;">'+ jjgubn +'</span></td>'+
					                   			'<td align="right" width="50"><span style="font-size:9pt; padding-right:0pt;">'; if(data["num"] < 0) htmlString += numberWithCommas(Number(jjnum)); htmlString += '</span></td>'+
					                       	'</tr>'+                        	
					                    '</table></span>'+
					                '</td>'+
			                        '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jeon"] +'</span></td>';
							if(data["num"] > 0){
								htmlString +=
									'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
				                        '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
					                    	'<tr>'+
					                   			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
					                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
					                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
					                   		'</tr>'+
					                   	'</table></span>'+
					                '</td>';
							}else{
								htmlString +=
									'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>';
							}
							if(data["num"] < 0){
								htmlString +=
					                '<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
					                    	'<tr>'+
					                   			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
					                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
					                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
					                   		'</tr>'+
					                   	'</table></span>'+
					                '</td>';
							}else{
								htmlString +=
									'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>';
							}
								htmlString +=
				                    '<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
				                    	'<table border="0" width="100" cellpadding="0" cellspacing="0">'+
					                    	'<tr>'+
					                    		'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(cur_1) +'</span></td>'+
					                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
					                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ cur_2 +'</span></td>'+
					                   		'</tr>'+
					                   	'</table></span>'+
					                '</td>'+
					            '</tr>';
						}
					}
				});
				
				$("#yjjang").html(htmlString);
			}
		});
	}
	if(value == "2"){ //구매처별
		htmlString = "";
		$("#yjjang").html(htmlString);
		
		$.ajax({
			type: "POST",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/yongji/select_cust_wcname_yj_list",
			success: function (result) {
				var object_num = Object.keys(result); 
				for (var n in object_num) {
					var data = result[n];

					var from = { wccode: data["wccode"], date1: date1, date2: date2 }
					
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url : SETTING_URL + "/yongji/select_jang_cust_io_list",
						data : JSON.stringify(from),
						success : function(result2) {
							if(result2.length){
								htmlString +=
									'<tr>'+
										'<td width="780" colspan="6" height="30" align="left" valign="middle" bgcolor="#EEEEEE"><span style="font-size:11pt; padding-left:10pt;"><b>'+
										'* '+ result2[0]["wcname"] +'</b></span></td>'+
									'</tr>';
							}
							var object_num = Object.keys(result2);
							
							for (var i in object_num) {
								var data2 = result2[i];
								var cur_1 = 0; var cur_2 = 0; var num_1 = 0; var num_2 = 0;
								
								if (!data2["num"])
									continue;
								cur_1 = Math.floor(data2["curno"] / 500);
								cur_2 = data2["curno"] % 500;

								num_1 = Math.floor(data2["num"] / 500);
								num_2 = data2["num"] % 500;
								
								htmlString += 
									'<tr>'+
					                    '<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ MsToFulldate(data2["date"]).substring(6,8) +'</span></td>'+
					                    '<td width="330" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data2["wjname"] +'</span></td>'+
					                    '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["jeon"] +'</span></td>'+
					                    '<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                        '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
					                    		'<tr>'+
					                    			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
					                    			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
					                    			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
					                    		'</tr>'+
					                    	'</table></span>'+
										'</td>'+
					                    '<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    	'<table border="0" width="100" cellpadding="0" cellspacing="0">'+
					                    		'<tr>'+
					                    			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(cur_1) +'</span></td>'+
					                    			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
					                    			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ cur_2 +'</span></td>'+
					                    		'</tr>'+
					                    	'</table></span>'+
										'</td>'+
					                    '<td width="110" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;"><!--<?=number_format($row[tprice])?>-->0</span></td>'+
									'</tr>';
								
							}
							$("#yjjang").html(htmlString);
						}
					});
				}
			}
		});
	}
}


//월별 용지 재고 현황
function SearchYjMonth(msdate){
	var from = {msdate: msdate}
	logNow(msdate);
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/yongji/check_mon",
		data : JSON.stringify(from),
		success: function (result) {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/yongji/select_mon_list",
				data : JSON.stringify(from),
				success: function (result) {
					var object_num = Object.keys(result);
					var num1 = 0; var num2 = 0; var num3 = 0; var num4 = 0; var num5 = 0; var num6 = 0; var num7 = 0; var num8 = 0;
					var snum1 = 0; var snum2 = 0; var snum3 = 0; var snum4 = 0;
					htmlString = "";
					for(var i in object_num){
						var data = result[object_num[i]]; // json data
						
						num1 = Math.floor(data["qnty1"] / 500);
						num2 = data["qnty1"] % 500;
						num3 = Math.floor(data["qnty2"] / 500);
						num4 = data["qnty2"] % 500;
						num5 = Math.floor(data["qnty3"] / 500);
						num6 = data["qnty3"] % 500;
						num7 = Math.floor(data["qnty4"] / 500);
						num8 = data["qnty4"] % 500;
						snum1 += data["qnty1"];
						snum2 += data["qnty2"];
						snum3 += data["qnty3"];
						snum4 += data["qnty4"];
						
						htmlString += 
							'<tr>'+
								'<td width="160" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;"><a href="javascript:showPopUpYJ('+ msdate + ',' + "'" + data["yjcode"] + "'" + ',' + "'" + data["wjname"] + "'" +');">'+ data["wjname"] +'</a></span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += numberWithCommas(num2) + '</span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += numberWithCommas(num4) + '</span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += numberWithCommas(num6) + '</span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += numberWithCommas(num8) + '</span></td>'+
							'</tr>';
							
					}
					$("#data7").html(htmlString);
					
					num1 = Math.floor(snum1 / 500);
					num2 = snum1 % 500;
					num3 = Math.floor(snum2 / 500);
					num4 = snum2 % 500;
					num5 = Math.floor(snum3 / 500);
					num6 = snum3 % 500;
					num7 = Math.floor(snum4 / 500);
					num8 = snum4 % 500;
					
					htmlString = "";
					htmlString +=
						'<tr>'+
							'<td width="160" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">합계</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += numberWithCommas(num2) + '</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += numberWithCommas(num4) + '</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += numberWithCommas(num6) + '</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += numberWithCommas(num8) + '</span></td>'+
						'</tr>';
					
					$("#data7-1").html(htmlString);
				}
			});
		}
	});
}

function showPopUpYJ(msdate, yjcode, wjname){ //원재료 링크 팝업
	popUp = "";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open("/popup", "", 'left=0,top=0,width=830,height=547,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu3("5-월별-popup"));
	(popUp.document.getElementById("jname")).innerHTML = wjname;
	
	var x1 = 0; var x2 = 0; var iw1 = ""; var iw2 = ""; var num1 = ""; var num2 = ""; var sum1 = 0; var sum2 = 0; var sum3 = ""; var sum4 = ""; 
	
	var from = { msdate: msdate, yjcode: yjcode } 
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_mon_popup1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			
			x1 = Math.floor(result[0]["qnty1"] / 500);
			x2 = result[0]["qnty1"] % 500;
			iw1 = x1 + " R " + x2;

			x1 = Math.floor(result[0]["qnty4"] / 500);
			x2 = result[0]["qnty4"] % 500;
			iw2 = x1 + " R " + x2;
		}
	});
	
	(popUp.document.getElementById("iw1")).innerHTML = iw1;
	
	var date1 = new Date((msdate.toString()).substring(0,4) + "/" + (msdate.toString()).substring(4,6) + "/" + "01").getTime()/1000;
	if(Number((msdate.toString()).substring(4,6)) == "12"){
		year = Number((msdate.toString()).substring(0,4)) + 1;
		var date2 = new Date(year + "/" + "01" + "/" + "01").getTime()/1000;
	}else{
		month = Number((msdate.toString()).substring(4,6)) + 1;
		month = month >= 10 ? month : '0' + month;
		var date2 = new Date((msdate.toString()).substring(0,4) + "/" + month + "/" + "01").getTime()/1000;
	}
	logNow(date1);
	logNow(date2);
	
	var from = {
	    	date1: date1,
	    	date2: date2,
	    	yjcode: yjcode
	    }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url : SETTING_URL + "/yongji/select_mon_popup2",
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			var num1 = 0;
			for(var i in object_num){
				var data = result[i]; 
				
				if (data["comment"] != '入'){
					num1 = "&nbsp;";
					x1 = Math.floor((data["num"]*-1) / 500);
					x2 = (data["num"]*-1) % 500;
					num2 = x1 + " R " + x2;
					sum2 += (data["num"]*-1);
				}
				else{
					if(data["num"] >= 0){
						x1 = Math.floor(data["num"] / 500);
						x2 = data["num"] % 500;
					}else{
						x1 = Math.floor((data["num"]*-1) / 500) * -1;
						x2 = (data["num"] % 500) * -1;
					}
					num1 = x1 + " R " + x2;
					num2 = "&nbsp;";
					sum1 += data["num"];
				}
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(4,6) + "." + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
						'<td align="center" height="25" width="58">'+ full_date +'</td>'+
						'<td align="left" height="25" width="331"><span style="padding-left:3pt;">'+ data["comment"] +'</span></td>'+
						'<td align="center" height="25" width="79">&nbsp;</td>'+
						'<td align="center" height="25" width="79">'+ num1 +'</td>'+
						'<td align="center" height="25" width="79">'+ num2 +'</td>'+
						'<td align="center" height="25" width="79">&nbsp;</td>'+
						'<td align="center" height="25" >'+ data["wcname"] +'</td>'+
					'</tr>';
				
			}
			(popUp.document.getElementById("popdate")).innerHTML = htmlString;
			//popUp.document.getElementById$("#popdate").html(htmlString);
			
		}
	});
	
	x1 = Math.floor(sum1 / 500);
	x2 = sum1 % 500;
	sum3 = x1 + " R " + x2;

	x1 = Math.floor(sum2 / 500);
	x2 = sum2 % 500;
	sum4 = x1 + " R " + x2;
	
	(popUp.document.getElementById("s_iw1")).innerHTML = iw1;
	(popUp.document.getElementById("s_iw2")).innerHTML = iw2;
	(popUp.document.getElementById("sum3")).innerHTML = sum3;
	(popUp.document.getElementById("sum4")).innerHTML = sum4;
}

//검증필요_update 포함 - 새로 작성
function newYjMonth(){
	var msdate = $("select[name=ty]").val() + $("select[name=tm]").val();
	
	if(msdate == 200901) return;
	
	var from = { msdate: msdate }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_mon_check_input1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
		}
	});

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_mon_check_input2",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
		}
	});

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_mon_check_input3",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
		}
	});

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_mon_check_input4",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
		}
	});

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/yongji/select_mon_check_input5",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
		}
	});
}
