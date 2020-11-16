/////////////////////////////////////////
//=============== 직접경비 ===============//
/////////////////////////////////////////


//선불직접경비 입력


//용지대
function SelKbYongjiDae(date1, date2){ //용지대
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_yongji1",
		async: false,
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var from = { date1: date1, date2: date2, wccode: data["wccode"] }
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/directkb/select_kb_yongji2",
					data : JSON.stringify(from),
					success: function (result2) {
						logNow(result2);
								
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							if (data2["count"] > 0){
								var j = 1; 
								htmlString += 
									'<tr>'+
										'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (j++) +'</span></td>'+
										'<td style="padding-left:10px;" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</a></span></td>'+
										'<td style="padding-right:10px;" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data2["count"]) +'</span></td>'+
										'<td style="padding-right:10px;" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data2["sum"]) +'</span></td>'+
										'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><input type="button" value="인 쇄" onClick="javascript:PrintIt(<?=$sy?>, <?=$sm?>, <?=$row[wccode]?>)"></span></td>'+
									'</tr>';
							}
						}
					}
				});
			}
			$("#kbYongjiData").html(htmlString);
		}
	});
}

//출력료
function SelKbPrint(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_print1",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
						'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="220" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cgubn"] +'</span></td>'+
						'<td width="120" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice"]) +'</span></td>'+
						'<td width="160" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
					'</tr>';
					
			}
			$("#kbPrintData").html(htmlString);
		}
	});
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_print2",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				$("select[name=ccode]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
			}
		}
	});
}

function InsertKbPrint(){
	var new_uid = 0;
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_print3",
		async: false,
		success: function (result) {
			new_uid = result[0]["max_uid"] + 1;
		}
	});
	
	var ccode = $("select[name=ccode]").val(); 
	var cdate = new Date($("input[name=cdate]").val().substring(0,4) + "/" + $("input[name=cdate]").val().substring(5,7) + "/" + $("input[name=cdate]").val().substring(8,10)).getTime()/1000;
	var cgubn = $("select[name=cgubn] option:checked").val(); 
	var cprice = $("input[name=cprice]").val(); 
	
	var from = {
			uid: new_uid,
			ccode: ccode, 
			cdate: cdate,
			cgubn: cgubn,
			cprice: cprice 
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/insert_kb_print",
		data: JSON.stringify(from),
		success: function (result) {
			alert('데이터 입력 완료');
		},
		error: function () {
		}
	});
}

//사보료
function SelKbHouseOrgan(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_house_organ1",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
						'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="220" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cgubn"] +'</span></td>'+
						'<td width="120" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice"]) +'</span></td>'+
						'<td width="200" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
					'</tr>';
			}
			$("#kbHouseOrganData").html(htmlString);
		}
	});
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_house_organ2",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				$("select[name=ccode]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
			}
		}
	});
}

function InsertKbHouseOrgan(){
	var new_uid = 0;
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_house_organ3",
		async: false,
		success: function (result) {
			new_uid = result[0]["max_uid"] + 1;
		}
	});
	
	var ccode = $("select[name=ccode]").val(); 
	var cdate = new Date($("input[name=cdate]").val().substring(0,4) + "/" + $("input[name=cdate]").val().substring(5,7) + "/" + $("input[name=cdate]").val().substring(8,10)).getTime()/1000;
	var cgubn = $("select[name=cgubn] option:checked").val(); 
	var cprice = $("input[name=cprice]").val(); 
	
	var from = {
			uid: new_uid,
			ccode: ccode, 
			cdate: cdate,
			cgubn: cgubn,
			cprice: cprice 
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/insert_kb_house_organ",
		data: JSON.stringify(from),
		success: function (result) {
			alert('데이터 입력 완료');
		},
		error: function () {
		}
	});
}

//인쇄비
function SelKbPresswork(date1, date2){ 
	var from = { date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_presswork1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
						
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var f_sum = 0; var p_sum = 0; var op2 = 0; var op51 = ""; var op52 = "";
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/directkb/select_kb_presswork2",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							op2 = data2["op52"];
							f_sum += data2["sum5"];
						}
					}
				});
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/directkb/select_kb_presswork3",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							p_sum += data2["pcost"];
						}
					}
				});
				switch (data["tax"]){
					case 0:
						op51 = "세금계산서"; break;
					case 1:
						op51 = "계산서"; break;
				}
				switch(op2){
					case 1:
						op52 = "제품원가"; break;
					case 2:
						op52 = "관리비"; break;
				}
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["crnum"] +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="280" height="30" align="left" valign="middle" bgcolor="white"><a href="javascript:SelKbPressworkDetail('+ data["uid"] +')" class="n"><p style="margin-left:5px;"><span style="font-size:9pt;">'+ data["bname"] +'&nbsp;&nbsp;:&nbsp;&nbsp;'+ data["bcode"]; if(data["bucode"]) htmlString += '-' + data["bucode"]; htmlString += '</span></p></a></td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(p_sum) +'</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(f_sum) +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ op51 +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ op52 +'</span></td>'+
					'</tr>';
			}
		}
	});
	$("#kbPressworkData").html(htmlString);
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_presswork4",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
						
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var f_sum = 0; var p_sum = 0; 
				
				var full_date = MsToFulldate(data["jbdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/directkb/select_kb_presswork5",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							f_sum += data2["sum5"];
						}
					}
				});
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/directkb/select_kb_presswork6",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							p_sum += data2["pcost"];
						}
					}
				});
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="280" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["jbname"] +'</span></td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(p_sum) +'</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(f_sum) +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">세금계산서</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">관리비</span></td>'+
					'</tr>';
			}
		}
	});
	$("#kbPressworkData2").html(htmlString);
}

function SelKbPressworkDetail(uid){ //인쇄비 디테일
	$('#jejak_detail_view').html(jmenu6("인쇄비_디테일"));
	
	var from = { uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_presswork7",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
				        '<td width="780">'+
				        	'<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">'+
					            '<tr>'+
					                '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작번호</span></td>'+
					                '<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["crnum"] +'</span></td>'+
					                '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">년월일</span></td>'+
					                '<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
					                '<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					                '<td style="padding-left:10;" width="353" height="30" bgcolor="white"><span style="font-size:9pt;">'+ data["bname"] + ' - ' + data["bcode"] +  '</span></td>'+
					            '</tr>'+
					        '</table>'+
					    '</td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="780" height="10"></td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="780">'+
				        	'<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">'+
				                '<tr>'+
				                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
				                    '<td width="200" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] + ' - ' + data["m1"] +'</span></td>'+
				                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">계산</span></td>'+
				                    '<td width="145" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    '<select name="op1" size="1" style="font-family:굴림; font-size:9pt; width:100;">'+
						                    '<option value="0"'; if (data["tax"] == 0) htmlString += ' selected'; htmlString += '>세금계산서</option>'+
						                    '<option value="1"'; if (data["tax"] == 1) htmlString += ' selected'; htmlString += '>계산서</option>'+
										'</select></span>'+
				                    '</td>'+
				                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">회계</span></td>'+
				                    '<td width="145" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    '<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:100;">'+
						                    '<option value="1">제품원가</option>'+
						                    '<option value="2">관리비</option>'+ // 여기 op52값 가져오는거 해야함
										'</select></span>'+
				                    '</td>'+
				                    '<td width="72" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><a href="javascript:ChgKbPressworkDetail('+ uid +', 1);"><img src="/resources/style/images/jejak/btn_modify.gif" border="0"></a></span></td>'+
				                '</tr>'+
				            '</table>'+
				        '</td>'+
				    '</tr>';
			}
			$("#kbPressworkDetailData").html(htmlString);
		}
	});
	var record_num = 1; var sum_all = 0; var sum_1 = 0; var sum_2 = 0; var sum_3 = 0;
	var from = { uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_presswork8",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var total_record = object_num.length;
		
			htmlString = "";
			var htmlString2 = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				if (data["filmcost5"]) sum_1 += data["filmcost5"];
				else sum_1 += data["daeji5"];
				sum_all += (data["filmcost5"] * 1.1);
				
				sum_2 += data["sobu5"];
				sum_all += (data["sobu5"] * 1.1);
				
				htmlString +=
					'<tr>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gubn5"] +'</span></td>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["filmnum5"] +'</span></td>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["filmdan5"]) + '</span></td>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["filmcost5"]) + '</span></td>'+
	                    '<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><input type="text" size="10" name="daeji5[]" value="'+ data["daeji5"] +'"></span></td><input type="hidden" name="t5id[]" value="'+ data["uid"] +'">'+
	                    '<td width="141" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString += numberWithCommas(sum_1 * 1.1); htmlString += '</span></td>'+
	                    '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString += '<input type="image" src="/resources/style/images/jejak/btn_modify.gif" onClick="ChgKbPressworkDetail();">'; htmlString += '</span></td>'+
	                '</tr>';
	                    
				htmlString2 +=
					'<tr>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["gubn5"] +'</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["panst5"] +'</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["pannum5"] +'</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["sobudan5"]) + '</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["sobu5"]) + '</span></td>'+
		                '<td width="125" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString2 += numberWithCommas(Math.floor(sum_2 * 1.1)); htmlString2 += '</span></td>'+
		            '</tr>';
		        record_num++;
			}
			$("#kbPressworkDetailData2").html(htmlString); 
			$("#kbPressworkDetailData3").html(htmlString2);
		}
	});
	
	var from = { uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_presswork9",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var total_record = object_num.length;
			
			htmlString = "";
			record_num = 1;
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				sum_3 += data["pcost"];
				sum_all += data["pcost"];
				
				htmlString +=
					'<tr>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["gubn"] +'</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["rnum"] +'</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["colo"] +'</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["pdanga"]) + '</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["pcost"]) + '</span></td>'+
	                    '<td width="125" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString += numberWithCommas(sum_3); htmlString += '</span></td>'+
	                '</tr>';
				record_num++;
			}
			$("#kbPressworkDetailData4").html(htmlString);
			(document.getElementById("sum_all")).innerHTML = numberWithCommas(sum_all);
		}
	});
}

function ChgKbPressworkDetail(uid, ttg){//디테일 수정1 미완성
	if(ttg == 1){
		logNow(uid);
		logNow($("select[name=op2]").val());
		
		var op52 = $("select[name=op2]").val();
		var from = {op52: op52, uid: uid}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/directkb/update_kb_presswork_op52",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);// 왜 로그에 false 라고 뜨는지ㅠㅠ 해야함 아마 DB 버전문제로 key값으로 수정안해서 그런건가
				alert("update성공");
			},
			error: function () {
			}
		}); 
		
	}else{
		logNow("다른수정2");
		//배열 가져오는거 해야함
		
	}
}

//제본비
function SelKbBinding(bdate){
	var tdate;
	var tm = parseInt(bdate.substring(4,6)) - 1;
	if(tm <= 0){
		var ty = parseInt(bdate.substring(2,4)) - 1;
		tdate = (ty >= 10 ? ty : '0' + ty) + "12" + "%";
	}
	else tdate = bdate.substring(2,4) + (tm >= 10 ? tm : '0' + tm) + "%";
	
	var from = {tdate: tdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_binding1",
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			htmlString = ""; var tsum = 0;
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var from = {t1id: data["t1id"], idate: data["idate"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/directkb/select_kb_binding2",
					data : JSON.stringify(from),
					success: function (result2) {
						if(result2.length == 0) {
							var from = {juid: data["juid"]}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: SETTING_URL + "/directkb/select_kb_binding3",
								data : JSON.stringify(from),
								success: function (result3) {
									sum_totcost7 = result3["sum_totcost7"];
									logNow(data);
									
									var full_date = MsToFulldate(data["jdate"]);
									full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
									
									var full_date2 = data["idate"];
									full_date2 = full_date2.substring(0,2) + "/" + full_date2.substring(2,4) + "/" + full_date2.substring(4,6);
									
									tsum += sum_totcost7;
									
									htmlString += 
										'<tr>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date2 +'</span></td>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bookcode"] +'</span></td>'+
											'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["bookname"] +'</span></td>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
											'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+ numberWithCommas(data["jnum"]) +'</span></td>'+
											'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+ numberWithCommas(sum_totcost7) +'</span></td>'+
										'</tr>';
									
									
								}
							});
							$("#kbBindingData").html(htmlString);
							(document.getElementById("tsum")).innerHTML = numberWithCommas(tsum);
						}
					}
				});
			}
		}
	});
}

//코팅비
function SelKbCoating(date1, date2){
	var from = { date1: date1, date2: date2 }
	var sp3 = 0;
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_coating1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var p3 = Math.floor(data["totcost8"] * 1.1);
				sp3 += p3;
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["crnum"] +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="260" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">'+
							'<a href="javascript:SelKbCoatingDetail('+ data["uid"] +')" class="n">'+ data["bname"] + ' - ' + data["bcode"] + '</span></p></a>'+
						'</td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cnum8"] +' R</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice8"]) +'</span></td>'+
						'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p3) +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">대신실업</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">제품</span></td>'+
					'</tr>';
			}
			$("#kbCoatingData1").html(htmlString);
		}
	});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_coating2",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["jbdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var p3 = Math.floor(data["totcost8"] * 1.1);
				sp3 += p3;
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="260" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">'+
							'<a href="exj_view.php?uid=<?=$row[uid]?>" class="n">'+ data["jbname"] +'</span></p></a>'+
						'</td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cnum8"] +' R</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice8"]) +'</span></td>'+
						'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p3) +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">대신실업</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">관리비</span></td>'+
					'</tr>';
			}
			$("#kbCoatingData2").html(htmlString);
		}
	});
	(document.getElementById("sp3")).innerHTML = numberWithCommas(sp3);
}

function SelKbCoatingDetail(uid){//코팅비_디테일 //원가계산서 //미완성
	
}

//비닐비, 케이스대, CD음반대, 스티커대, 기타
function SelKbManagement(tag, date1, date2){
	var from = { tag: tag, date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_management1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if(data["cnum9"] == 0) var t_dan = 0;
				else var t_dan = Math.ceil((data["cprice9"] / 1.1) / data["cnum9"]);
				
				htmlString +=
					'<tr>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td style="padding-left:10px;" width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SelKbManagementDetail('+ data["ccode9"] + ',' + tag +')" class="n">'+ data["sbname"] +'</a></span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode9"] +'</span></td>'+
						'<td width="150" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cnum9"]) + '</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(t_dan) + '</span></td>'+
						'<td width="90" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cprice9"]) + '</span></td>'+
					'</tr>';
			}
			$("#kbManagementData1").html(htmlString);
		}
	});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_management2",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if(data["cnum9"] == 0) var t_dan = 0;
				else var t_dan = Math.ceil((data["cprice9"] / 1.1) / data["cnum9"]);
				
				htmlString +=
					'<tr>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td style="padding-left:10px;" width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SelKbManagementDetail('+ data["ccode9"] + ',' + tag +')" class="n">'+ data["sbname"] +'</a></span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode9"] +'</span></td>'+
						'<td width="150" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cnum9"]) + '</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(t_dan) + '</span></td>'+
						'<td width="90" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cprice9"]) + '</span></td>'+
					'</tr>';
			}
			$("#kbManagementData2").html(htmlString);
		}
	});
}

function SelKbManagementDetail(ccode9, tag){ //비닐비, 케이스대, CD음반대, 스티커대, 기타  - 디테일
	$('#jejak_detail_view').html(jmenu6("관리비_디테일"));
	var tag_name; var btag;
	switch (tag){
    	case 1:
    		tag_name = "비닐 관리";
    		btag = "비닐";
    		break;
    	case 2:
    		tag_name = "케이스 관리";
    		btag = "케이스";
    		break;
    	case 3:
    		tag_name = "CD. 음반 관리";
    		btag = "CD";
    		break;
    	case 4:
    		tag_name = "스티커 관리";
    		btag = "스티커";
    		break;
    	case 5:
    		tag_name = "기타 관리";
    		btag = "기타";
    		break;
    }
	(document.getElementById("tag_name")).innerHTML = tag_name;
	
	var from = { ccode9: ccode9 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_management3",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var data = result[0];
			htmlString = "";
			htmlString += 
				'<tr>'+
		            '<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
		            '<td width="345" height="30" align="center" valign="middle" bgcolor="white"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:290px; text-align:center;" name="cname" value="'+ data["wcname"] + ' - ' + data["wccode"] +'" onFocus="blur();" onClick="javascript:AddC();"></td>'+
		            '<td width="102" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">계산</span></td>'+
		            '<td width="185" height="30" align="center" valign="middle" bgcolor="white">'+
		            	'<select name="op1" size="1" style="font-family:굴림; font-size:9pt; width:100;">'+
		                    '<option value="0"'; if(data["tax"] == 0) htmlString += ' selected'; htmlString += '>세금계산서</option>'+
		                    '<option value="1"'; if(data["tax"] == 1) htmlString += ' selected'; htmlString += '>계산서</option>'+
						'</select>'+
					'</td>'+
		        '</tr>'+
		        '<input type="hidden" name="cc" value="<?=$cc?>">'+
		        '<input type="hidden" name="tag" value="<?=$tag?>">';
			
		    $("#kbManagementDetailData1").html(htmlString);
		}
	});
	
	var record_no = 1; var sum = 0;
	
	var from = { ccode9: ccode9, tag: tag }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_management4",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var  t_mul = 0;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if (data["cnum9"]) t_mul = (data["cprice9"] / 1.1) / data["cnum9"];
				else t_mul = 0;
				sum += t_mul;
				
				var top2 = data["op29"];
				
				htmlString +=
					'<tr>'+
		                '<td width="50" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ (record_no++) +'</span></td>'+
		                '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
		                '<td width="270" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["sbname"] +'&nbsp;-&nbsp;'+ data["sbbook"] +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(t_mul.toFixed(2)) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(data["cnum9"]) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; 
							if(data["cprice9"]) htmlString += numberWithCommas(data["cprice9"]); 
							else htmlString +=  
								'<INPUT style="text-align:right; padding-right:5; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:60px;" name="cprice[]">'+
								'<input type="hidden" name="uid[]" value="'+ data["uid"] +'">'; htmlString += '</span>'+
		                '</td>'+
		                '<td width="162" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+
		                    '<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:Chg('; if(data["op29"] == 1) htmlString += 2; else htmlString += 1; htmlString += ',' +  data["uid"] + ',' + data["ccode9"] + ',' + tag + ');">'+
							//<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;">
			                    '<option value="1"'; if(data["op29"] == 1) htmlString += ' selected'; htmlString += '>제품</option>'+
			                    '<option value="2"'; if(data["op29"] == 2) htmlString += ' selected'; htmlString += '>잡물</option>'+
			                '</select>';
			                if(!data["cprice9"]) htmlString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="javascript:jform.submit();"><image src="/resources/style/images/jejak/btn_modify.gif" border="0"></a>'; htmlString += '</span>'+
			            '</td>'+
		            '</tr>';     
			}
			$("#kbManagementDetailData2").html(htmlString);
		}
	});
	
	var from = { ccode9: ccode9, tag: tag } 
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/select_kb_management5",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var  t_mul = 0;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if (data["cnum9"]) t_mul = (data["cprice9"] / 1.1) / data["cnum9"]; 
				else t_mul = 0;
				sum += t_mul;
				
				var top2 = data["op29"];
				
				htmlString +=
					'<tr>'+
		                '<td width="50" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ (record_no++) +'</span></td>'+
		                '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
		                '<td width="270" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["sbname"] +'&nbsp;-&nbsp;'+ data["sbbook"] +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(t_mul.toFixed(2)) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(data["cnum9"]) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; 
							if(data["cprice9"]) htmlString += numberWithCommas(data["cprice9"]); 
							else htmlString +=  
								'<INPUT style="text-align:right; padding-right:5; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:60px;" name="cprice[]">'+
								'<input type="hidden" name="uid[]" value="'+ data["uid"] +'">'; htmlString += '</span>'+
		                '</td>'+
		                '<td width="162" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+
		                	'<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:Chg('; if(data["op29"] == 1) htmlString += 2; else htmlString += 1; htmlString += ',' +  data["uid"] + ',' + data["ccode9"] + ',' + tag + ');">'+
							//<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;">
			                    '<option value="1"'; if(data["op29"] == 1) htmlString += ' selected'; htmlString += '>제품</option>'+
			                    '<option value="2"'; if(data["op29"] == 2) htmlString += ' selected'; htmlString += '>잡물</option>'+
			                '</select>'; 
			                if(!data["cprice9"]) htmlString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="javascript:jform.submit();"><image src="/resources/style/images/jejak/btn_modify.gif" border="0"></a>'; htmlString += '</span>'+
			            '</td>'+
		            '</tr>';
				
			}
			$("#kbManagementDetailData3").html(htmlString);
		}
	});
	
	(document.getElementById("sum")).innerHTML = numberWithCommas(Math.floor(sum));
	
	if(tag == 5){
		htmlString = "";
		htmlString +=
			'<tr>'+
		        '<td width="50" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:70px;" name="cdate" maxlength="6"></td>'+
		        '<td width="270" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:260px;" name="bname" onFocus="blur();" onClick="javascript:AddB();"></td>'+
		            '<input type="hidden" name="bcode">'+
		            '<input type="hidden" name="ccode" value="<?=$cc?>">'+
		            '<input type="hidden" name="tag" value="<?=$tag?>">'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="text-align:right; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:64px;" name="t_sum"></td>'+
		        '<td width="162" align="center" valign="middle" bgcolor="white" height="30"><a href="javascript:SendIt();"><img src="/resources/style/images/jejak/b_in.gif" border="0"></a></td>'+
		    '</tr>';
		$("#kbManagementDetailData4").html(htmlString);
	}
}

function Chg(tval, mid, ccode, tag){ //디테일
	logNow(tval);
	logNow(mid);
	logNow(ccode);
	logNow(tag);
	//새로고침부분 해야함
	
	var from = {tval: tval, uid: mid}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/directkb/update_kb_op29",
		data: JSON.stringify(from),
		success: function (result) {
			logNow(result);
			alert("update성공");
		},
		error: function () {
		}
	});
}
