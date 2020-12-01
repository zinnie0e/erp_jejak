/////////////////////////////////////////
//=============== 회계전표 ===============//
/////////////////////////////////////////


//회계전표
function SelAccountingSlip(){ 
	var ymd = new Date($("select[name=ty]").val(), $("select[name=tm]").val(), 0, 0, 0, 1);
	var month = (ymd.getMonth() + 1) >= 10 ? (ymd.getMonth() + 1) : '0' + (ymd.getMonth() + 1);
	var day = (ymd.getDate()) >= 10 ? (ymd.getDate()) : '0' + (ymd.getDate());
	ymd = ymd.getFullYear().toString() + month.toString() + day.toString();
	
	var resultData1;
	
	var from = {ymd: ymd}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/accountingslip/select_accounting_slip1",
		data : JSON.stringify(from),
		success: function (result) {
			resultData1 = result;
			logNow(result);
			
			var object_num = Object.keys(result); 
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var sum_c = 0; var sum_d = 0; var jab = 0; var jab_str = "";
				var b1 = 0; var b2 = 0; var b3 = 0; var b4 = 0; var b5 = 0; var b6 = 0; var b7 = 0; var b8 = 0; 
				var b9 = 0; var b10 = 0; var b11 = 0; var b12 = 0; var b13 = 0; var b14 = 0; var b15 = 0; 
				
				var mdate = ymd.substring(2,8);
				
				htmlString += 
					'<tr>'+
						'<td width="390" align="center" valign="top" bgcolor="white" height="30">'+
							'<table width="100%" border="1" cellspacing="0" cellpadding="0" bordercolor="white">'+
								'<tr>'+
									'<td style="border-bottom: 1px solid #C0C0C0" width="40" height="25" align="center"><span style="font-size:9pt;">월.일</span></td>'+
									'<td style="border-bottom: 1px solid #C0C0C0; border-left: 1px solid #C0C0C0" height="25" width="260" align="center"><span style="font-size:9pt;">적 요</span></td>'+
									'<td style="border-bottom: 1px solid #C0C0C0; border-left: 1px solid #C0C0C0" height="25" width="90" align="center"><span style="font-size:9pt;">금 액</span></td>'+
								'</tr>';
				
				var from = {ymd: ymd, jeuid: data["jeuid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/accountingslip/select_accounting_slip2",
					data : JSON.stringify(from),
					success: function (result2) {
						logNow("inum");
						logNow(result2);
						
						if(!result2) alert("전표데이터 읽기 오류");
						
						var object_num2 = Object.keys(result2); 
						for(var j in object_num2){
							var data2 = result2[object_num2[j]]; 
							
							var uid = data2["uid"];
							var psum = data2["debit"];
							var pdesc = data2["descript"];
							var pnum = data2["inum"];
							var pdan = data2["idanga"];
							sum_c += data2["debit"];
							
							var from = {paruid: uid}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: SETTING_URL + "/accountingslip/select_accounting_slip3",
								data : JSON.stringify(from),
								success: function (result3) {
									logNow("--------");
									logNow(result3);
									if(result3.length != 0){
										var object_num3 = Object.keys(result3); 
										
										for(var ii = 1; ii <= 15; ii++){
											var fdname = "b" + ii;
											eval("b" + ii + " += " + result3[0][fdname] + ";");
											sum_d += result3[0][fdname];
										}
										
										if(j == object_num2.length-1){
											jab = sum_c - sum_d;
											if(jab > 0) jab_str = "잡이익";
											if(jab < 0) {jab_str = "잡손실"; jab *= -1;}
										}
									}
								}
							});
							
							htmlString += 
								'<tr>'+
									'<td style="border-bottom: 1px solid #C0C0C0" width="40" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ mdate +'</span></td>'+
									'<td style="border-bottom: 1px solid #C0C0C0" width="260" height="25" align="left" valign="top"><span style="font-size:9pt; padding-left:3pt;">'+ pdesc +'<br> @ '+ numberWithCommas(pdan.toFixed(2)) +' X '+ numberWithCommas(pnum) +'부</span></td>'+
									'<td style="border-bottom: 1px solid #C0C0C0" width="90" height="25" align="right" valign="middle"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(psum) +'</span></td>'+
								'</tr>';
						}
					}
				});
				if(jab_str){
					htmlString +=
						'<tr>'+
							'<td style="border-bottom: 1px solid #C0C0C0" width="40" height="25" align="center"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
							'<td style="border-bottom: 1px solid #C0C0C0" width="260" height="25" align="right"><span style="font-size:9pt; padding-right:5pt;">-- '+ jab_str +' --</span></td>'+
							'<td style="border-bottom: 1px solid #C0C0C0" width="90" height="25" align="right"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(jab) +'</span></td>'+
						'</tr>';
				}
				htmlString += 
						'</table>'+
					'</td>'+
					'<td width="390" align="center" valign="middle" bgcolor="white" height="30">'+
						'<table width="100%" border="1" cellspacing="0" cellpadding="0" bordercolor="white">'+
							'<tr>'+
								'<td style="border-bottom: 1px solid #C0C0C0" width="40" height="25" align="center"><span style="font-size:9pt;">월.일</span></td>'+
								'<td style="border-bottom: 1px solid #C0C0C0; border-left: 1px solid #C0C0C0" height="25" width="260" align="center"><span style="font-size:9pt;">적 요</span></td>'+
								'<td style="border-bottom: 1px solid #C0C0C0; border-left: 1px solid #C0C0C0" height="25" width="90" align="center"><span style="font-size:9pt;">금 액</span></td>'+
							'</tr>';
				
				for(var ii = 1; ii <= 15; ii++){
					switch(ii){
						case 1:
							var gname = "용지"; var gcode = "5101"; var bdata = b1; break;
						case 2:
							var gname = "제판"; var gcode = "5306"; var bdata = b2; break;
						case 3:
							var gname = "인쇄"; var gcode = "5307"; var bdata = b3; break;
						case 4:
							var gname = "제본"; var gcode = "5308"; var bdata = b4; break;
						case 5:
							var gname = "코팅"; var gcode = "5309"; var bdata = b5; break;
						case 6:
							var gname = "원고"; var gcode = "5301"; var bdata = b6; break;
						case 7:
							var gname = "저자"; var gcode = "5302"; var bdata = b7; break;
						case 8:
							var gname = "출력"; var gcode = "5304"; var bdata = b8; break;
						case 9:
							var gname = "사보"; var gcode = "5303"; var bdata = b9; break;		
						case 10:
							var gname = "증지"; var gcode = "5305"; var bdata = b10; break;		
						case 11:
							var gname = "비닐"; var gcode = "5310"; var bdata = b11; break;
						case 12:
							var gname = "케이스"; var gcode = "5311"; var bdata = b12; break;
						case 13:
							var gname = "스티커"; var gcode = "5313"; var bdata = b13; break;
						case 14:
							var gname = "음반"; var gcode = "5312"; var bdata = b14; break;
						case 15:
							var gname = "교구"; var gcode = "5320"; var bdata = b15; break;
					}
					if(bdata != 0){
						htmlString += 
							'<tr>'+
								'<td style="border-bottom: 1px solid #C0C0C0" width="40" height="25" align="center"><span style="font-size:9pt;"><?if ($j == 2) echo("$mdate");?></span></td>'+
								'<td style="border-bottom: 1px solid #C0C0C0" width="260" height="25" align="right"><span style="font-size:9pt; padding-right:5pt;">( '+ gname +' )</span></td>'+
								'<td style="border-bottom: 1px solid #C0C0C0" width="90" height="25" align="right"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(bdata) +'</span></td>'+
							'</tr>';
					}
				}
				htmlString += 
							'</table>'+
						'</td>'+
					'</tr>';
			}
			$("#accountingSlipData").html(htmlString);
		}
	});
	
	document.getElementById("btnPrint").onclick = function() { //인쇄 버튼 클릭 시 
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu9("0_프린터팝업"));
		
		htmlString = "";
		
		logNow(resultData1);
		var object_num = Object.keys(resultData1); 
		for(var i in object_num){
			var data = resultData1[object_num[i]]; 
			
			var mk_month;
			
			var from = {uid: data["jeuid"]}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/accountingslip/select_accounting_slip1_1",
				async: false,
				data : JSON.stringify(from),
				success: function (result) {
					mk_month = (MsToFulldate(result[0]["bdate"])).substring(4,6);
				}
			});
			
			var sum_c = 0; var sum_d = 0; var jab = 0; var jab_str = "";
			for(var ii = 1 ; ii <= 15 ; ii++){
				eval("var b" + ii + " = 0;");
			}
			
			var from = {ymd: ymd, jeuid: data["jeuid"]}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/accountingslip/select_accounting_slip2",
				data : JSON.stringify(from),
				success: function (result2) {
					logNow("inum");
					logNow(result2);
					
					if(!result2) alert("전표데이터 읽기 오류");
					
					htmlString +=
						'<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="508">'+
							'<tr>'+
								'<td width="153" height="28">　</td>'+
								'<td width="213" height="28" align="left"><span style="font-size:15pt; padding-left:25pt;"><b>차 변</b></span></td>'+
								'<td width="134" height="28">　</td>'+
							'</tr>'+
							'<tr>'+
								'<td width="153" height="24">　</td>'+
								'<td width="213" height="24" align="left" valign="bottom"><span style="font-size:10pt; padding-left:38pt;">'+ ymd.substring(2,4) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(4,6) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(6,8) +'</span></td>'+
								'<td width="134" height="24">　</td>'+
							'</tr>'+
							'<tr>'+
								'<td width="153" height="18" align="right" valign="middle"><span style="font-size:10pt; padding-right:20pt;">'+ mk_month +' 월분</span></td>'+
								'<td width="213" height="18"></td>'+
								'<td width="134" height="18" align="center"><span style="font-size:12pt;">제 품</span></td>'+
							'</tr>'+
							'<tr>'+
								'<td width="153" height="38">　</td>'+
								'<td width="213" height="38">　</td>'+
								'<td width="134" height="38">　</td>'+
							'</tr>';
					
					var object_num2 = Object.keys(result2); 
					var lineno = object_num2.length + 1;
					for(var j in object_num2){
						var data2 = result2[object_num2[j]]; 
						
						var uid = data2["uid"];
						var psum = data2["debit"];
						var pdesc = data2["descript"];
						var pnum = data2["inum"];
						var pdan = data2["idanga"];
						sum_c += data2["debit"];
						
						var from = {paruid: uid}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: SETTING_URL + "/accountingslip/select_accounting_slip3",
							data : JSON.stringify(from),
							success: function (result3) {
								logNow("--------");
								logNow(result3);
								if(result3.length != 0){
									var object_num3 = Object.keys(result3); 
									
									for(var ii = 1; ii <= 15; ii++){
										var fdname = "b" + ii;
										eval("b" + ii + " += " + result3[0][fdname] + ";");
										sum_d += result3[0][fdname];
									}
									
									if(j == object_num2.length-1){
										jab = sum_c - sum_d;
										if(jab > 0) jab_str = "잡이익";
										if(jab < 0) {jab_str = "잡손실"; jab *= -1;}
									}
									if(j == 0){
										htmlString +=
											'<tr>'+
												'<td width="153" height="16" align="center" valign="top"><span style="font-size:9pt; letter-spacing:5pt;">제조</span></td>'+
												'<td width="347" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; padding-left:4pt;">('+ data["jeuid"] +')'+ pdesc +'</span></td>'+
											'</tr>';
									}
								}
							}
						});
						
						htmlString +=
							'<tr>'+
								'<td width="153" height="16" align="center" valign="top"><span style="font-size:9pt;"></span></td>'+
								'<td width="213" height="16" align="right" valign="top"><span style="font-size:9pt; padding-right:15pt;">@ '+ numberWithCommas(pdan.toFixed(2)) +' X '+ numberWithCommas(pnum) +'부</span></td>'+
								'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ psum +'</b></span></td>'+
							'</tr>';
					}
					if(jab_str == "잡이익"){
						lineno += 1;
						htmlString +=
							'<tr>'+
								'<td width="366" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-left:120pt;">--'+ jab_str +'--</span></td>'+
								'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"></span></td>'+
							'</tr>';
					}
					for(var i = lineno ; i < 12 ; i++){
						htmlString += '<tr><td width=500 colspan=3 height=16> </td></tr>';
					}
					htmlString +=
							'<tr>'+
								'<td width="366" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-left:120pt;"></span></td>'+
								'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ sum_c +'</b></span></td>'+
							'</tr>'+
							'<tr>'+
								'<td width="500" colspan="3" height="25" align="right" valign="bottom"><span style="font-size:9pt; letter-spacing:0pt; padding-right:0pt;"> </span></td>'+
							'</tr>'+
							'<tr>'+
								'<td width="500" colspan="3" height="20" align="right" valign="bottom"><span style="font-size:9pt; letter-spacing:0pt; padding-right:0pt;">'+ string.com_name +'</span></td>'+
							'</tr>'+
						'</table>'+
						'<p style="page-break-before:always">';
					
					if(jab_str == "잡손실"){
						htmlString +=
							'<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="508">'+
								'<tr>'+
									'<td width="153" height="28">　</td>'+
									'<td width="213" height="28" align="left"><span style="font-size:15pt; padding-left:25pt;"><b>차 변</b></span></td>'+
									'<td width="134" height="28">　</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="24">　</td>'+
									'<td width="213" height="24" align="left" valign="bottom"><span style="font-size:10pt; padding-left:38pt;">'+ ymd.substring(2,4) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(4,6) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(6,8) +'</span></td>'+
									'<td width="134" height="24">　</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="18" align="right" valign="bottom"><span style="font-size:10pt; padding-right:20pt;">'+ mk_month +' 월분</span></td>'+
									'<td width="213" height="18"></td>'+
									'<td width="134" height="18" align="center"><span style="font-size:12pt; letter-spacing:5pt;">잡손실</span></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="38">　</td>'+
									'<td width="213" height="38">　</td>'+
									'<td width="134" height="38">　</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="16" align="center" valign="top"><span style="font-size:9pt; letter-spacing:5pt;">제조</span></td>'+
									'<td width="347" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; padding-left:4pt; letter-spacing:-1pt;">('+ data["jeuid"] +')'+ pdesc +' [제조차액]</span></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="366" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-left:120pt;"></span></td>'+
									'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ jab +'</b></span></td>'+
								'</tr>';
						for(var i = 1 ; i <= 10 ; i++){
							htmlString += '<tr><td width=500 colspan=3 height=16></td></tr>';
						}
						htmlString +=
									'<tr>'+
									'<td width="366" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-left:120pt;"></span></td>'+
									'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ jab +'</b></span></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="500" colspan="3" height="25" align="right" valign="bottom"><span style="font-size:9pt; letter-spacing:0pt; padding-right:0pt;"> </span></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="500" colspan="3" height="20" align="right" valign="bottom"><span style="font-size:9pt; letter-spacing:0pt; padding-right:0pt;">'+ string.com_name +'</span></td>'+
								'</tr>'+
							'</table>'+
							'<p style="page-break-before:always">';
					}
					
					htmlString +=
						'<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="508">'+
							'<tr>'+
								'<td width="153" height="28">　</td>'+
								'<td width="213" height="28" align="left"><span style="font-size:15pt; padding-left:25pt;"><b>대 변</b></span></td>'+
								'<td width="134" height="28">　</td>'+
							'</tr>'+
							'<tr>'+
								'<td width="153" height="24">　</td>'+
								'<td width="213" height="24" align="left" valign="bottom"><span style="font-size:10pt; padding-left:38pt;">'+ ymd.substring(2,4) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(4,6) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(6,8) +'</span></td>'+
								'<td width="134" height="24">　</td>'+
							'</tr>'+
							'<tr>'+
								'<td width="153" height="18" align="right" valign="bottom"><span style="font-size:10pt; padding-right:20pt;">'+ mk_month +' 월분</span></td>'+
								'<td width="213" height="18"></td>'+
								'<td width="134" height="18" align="center"><span style="font-size:12pt;">제 조</span></td>'+
							'</tr>'+
							'<tr>'+
								'<td width="153" height="38">　</td>'+
								'<td width="213" height="38">　</td>'+
								'<td width="134" height="38">　</td>'+
							'</tr>'+
							'<tr>'+
								'<td width="153" height="16" align="center" valign="top"><span style="font-size:9pt; letter-spacing:5pt;">제품</span></td>'+
								'<td width="347" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; padding-left:4pt;">('+ data["jeuid"] +')'+ pdesc +'</span></td>'+
							'</tr>';
					lineno = 1;
					for(var ii = 1 ; ii <= 15 ; ii++){
						if (eval("b" + ii) == 0) continue;
						
						switch(ii){
							case 1:
								var gname = "용지"; var gcode = "5101"; break;
							case 2:
								var gname = "제판"; var gcode = "5306"; break;
							case 3:
								var gname = "인쇄"; var gcode = "5307"; break;
							case 4:
								var gname = "제본"; var gcode = "5308"; break;
							case 5:
								var gname = "코팅"; var gcode = "5309"; break;
							case 6:
								var gname = "원고"; var gcode = "5301"; break;
							case 7:
								var gname = "저자"; var gcode = "5302"; break;
							case 8:
								var gname = "출력"; var gcode = "5304"; break;
							case 9:
								var gname = "사보"; var gcode = "5303"; break;		
							case 10:
								var gname = "증지"; var gcode = "5305"; break;		
							case 11:
								var gname = "비닐"; var gcode = "5310"; break;
							case 12:
								var gname = "케이스"; var gcode = "5311"; break;
							case 13:
								var gname = "스티커"; var gcode = "5313"; break;
							case 14:
								var gname = "음반"; var gcode = "5312"; break;
							case 15:
								var gname = "교구"; var gcode = "5320"; break;
						}
						
						var bigo = gname;
						lineno += 1;
						
						htmlString += 
							'<tr>'+
								'<td width="366" colspan="2" height="16" align="right" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-right:20pt;">('+ bigo +')</span></td>'+
								'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ eval("b" + ii) +'</b></span></td>'+
							'</tr>';
					}
					if(jab_str == "잡손실"){
						lineno += 1;
						htmlString +=
							'<tr>'+
								'<td width="366" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-left:120pt;">--'+ jab_str +'--</span></td>'+
								'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"></span></td>'+
							'</tr>';
					}
					for(var i = lineno ; i <= 12 ; i++){
						htmlString += '<tr><td width=500 colspan=3 height=16></td></tr>';
					}
					htmlString +=
							'<tr>'+
								'<td width="366" colspan="2" height="16" align="right" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-right:20pt;"></span></td>'+
								'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ sum_d +'</b></span></td>'+
							'</tr>'+
							'<tr>'+
								'<td width="500" colspan="3" height="25" align="right" valign="bottom"><span style="font-size:9pt; letter-spacing:0pt; padding-right:0pt;">'+ string.com_name +'</span></td>'+
							'</tr>'+
						'</table>'+
						'<p style="page-break-before:always">';
					
					if(jab_str == "잡이익"){
						htmlString +=
							'<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="508">'+
								'<tr>'+
									'<td width="153" height="28">　</td>'+
									'<td width="213" height="28" align="left"><span style="font-size:15pt; padding-left:25pt;"><b>대 변</b></span></td>'+
									'<td width="134" height="28">　</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="24">　</td>'+
									'<td width="213" height="24" align="left" valign="bottom"><span style="font-size:10pt; padding-left:38pt;">'+ ymd.substring(2,4) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(4,6) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ ymd.substring(6,8) +'</span></td>'+
									'<td width="134" height="24">　</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="18" align="right" valign="bottom"><span style="font-size:10pt; padding-right:20pt;">'+ mk_month +' 월분</span></td>'+
									'<td width="213" height="18"></td>'+
									'<td width="134" height="18" align="center"><span style="font-size:12pt; letter-spacing:5pt;">잡이익</span></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="38">　</td>'+
									'<td width="213" height="38">　</td>'+
									'<td width="134" height="38">　</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="153" height="16" align="center" valign="top"><span style="font-size:9pt; letter-spacing:5pt;">제조</span></td>'+
									'<td width="347" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; padding-left:4pt; letter-spacing:-1pt;">('+ data["jeuid"] +')'+ pdesc +' [제조차액]</span></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="366" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-left:120pt;"></span></td>'+
									'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ jab +'</b></span></td>'+
								'</tr>';
						
						for(var i = 1 ; i <= 11 ; i++){
							htmlString += '<tr><td width=500 colspan=3 height=16></td></tr>';
						}
						htmlString +=
							'<tr>'+
								'<td width="366" colspan="2" height="16" align="left" valign="top"><span style="font-size:9pt; letter-spacing:5pt; padding-left:120pt;"></span></td>'+
								'<td width="134" height="16" align="right" valign="top"><span style="font-size:10pt; letter-spacing:5pt; padding-right:8pt;"><b>'+ jab +'</b></span></td>'+
							'</tr>'+
							'<tr>'+
								'<td width="500" colspan="3" height="25" align="right" valign="bottom"><span style="font-size:9pt; letter-spacing:0pt; padding-right:0pt;">'+ string.com_name +'</span></td>'+
							'</tr>'+
						'</table>'+
						'<p style="page-break-before:always">';
					}
				}
			});
		}
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
	
}

function MakeAccountingSlip(){ //전표작성 //검증필요
	var tyear = parseInt($("select[name=ty]").val());
	var tmon = parseInt($("select[name=tm]").val());
	
	if (tyear == "") return $("select[name=ty]").focus();
	if (tmon == "") return $("select[name=tm]").focus();
	
	var tblname = "JEJOMSTEST";
	
	var num_PR = 0; // 제판,인쇄
	var num_CT = 0; // 코팅
	var num_JB = 0; // 제본
	var num_ST = 0; // 스티커
	var num_CD = 0; // CD
	var num_CS = 0; // 케이스
	var num_VN = 0; // 비닐
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_accounting_slip4",
		async: false,
		success: function (result) {
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				eval("num_" + data["jmfieldyac"] + " = " + data["count"] + ";");
			}
		}
	});
	
	var td2 = new Date(tyear, tmon, 0, 0, 0, 1);
	var month = td2.getMonth()+1;
	var month = (td2.getMonth()+1) >= 10 ? (td2.getMonth()+1) : '0' + (td2.getMonth()+1);
	var day = (td2.getDate()) >= 10 ? (td2.getDate()) : '0' + (td2.getDate());
	
	td2 = td2.getFullYear().toString() + month + day;
	logNow(td2);
	
	var from = {ymd: td2}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_accounting_slip5",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow("//");
			logNow(result);
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var from = {paruid: data["uid"]};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url : SETTING_URL + "/accountingslip/delete_accounting_slip1",
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
					},
					error : function(){
					}
				});
			}
		}
	});
	
	var from = {ymd: td2}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_accounting_slip5",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow("//");
			logNow(result);
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				for(var ii = 1; ii <= 15; ii++){
					eval("var t" + ii + " = " + 0 + ";");
				}
				
				//제조비 내역
				var data2;
				logNow("--------------------------------------");
				logNow("jeuid : " + data["jeuid"]);
				var from = {dbname: tblname, jeuid: data["jeuid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/accountingslip/select_accounting_slip6",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						data2 = result[0];
						logNow(data2);
					}
				});
				
				var total_cost = data2["sum1"];
				var total_num = data2["jejoamnt"];
				var perc = data["inum"] / total_num;
				
				t1 = data2["yj1"];
				// 제판
				for(var ii = 1 ; ii <= num_PR ; ii++){
					var fdname = "jp" + ii;
					if(data2[fdname] > 0){
						t2 = data2[fdname];
						break;
					}
				}
				// 인쇄
				for(var ii = 1 ; ii <= num_PR ; ii++){ 
					var fdname = "pr" + ii;
					if(data2[fdname] > 0){
						t3 = data2[fdname];
						break;
					}
				}
				// 제본
				t4 = 0;
				for(var ii = 1 ; ii <= num_JB ; ii++){ 
					var fdname = "jb" + ii;
					if(data2[fdname] > 0) t4 += data2[fdname];
				}
				// 코팅
				for(var ii = 1 ; ii <= num_CT ; ii++){
					var fdname = "ct" + ii;
					if(data2[fdname] > 0){
						t5 = data2[fdname];
						break;
					}
				}
				t6 = data2["s1"];	
				t7 = data2["s2"] + data2["s21"];	// 저자
				t8 = data2["s3"];	// 출력
				t9 = data2["s4"];	// 사보
				t10 = data2["s5"];	// 증지
				// 비닐
				for(var ii = 1 ; ii <= num_VN ; ii++){ 
					var fdname = "vn" + ii;
					if(data2[fdname] > 0){
						t11 = data2[fdname];
						break;
					}
				}
				// 케이스
				for(var ii = 1 ; ii <= num_CS ; ii++){ 
					var fdname = "cs" + ii;
					if(data2[fdname] > 0){
						t12 = data2[fdname];
						break;
					}
				}
				// 스티커
				for(var ii = 1 ; ii <= num_ST ; ii++){
					var fdname = "st" + ii;
					if(data2[fdname] > 0){
						t13 += data2[fdname];
					}
				}
				// CD
				for(var ii = 1 ; ii <= num_CD ; ii++){
					fdname = "cd" + ii;
					if(data2[fdname] > 0){
						t14 = data2[fdname];
						break;
					}
				}	
				var from = {jeuid: data["jeuid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/accountingslip/select_accounting_slip7",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						t15 = result[0]["w9"];
					}
				});
				// 잔액
				logNow("seqno : " + data["seqno"]);
				logNow("td2 : " + td2);
				
				var data3;
				if(data["seqno"] == 1){
					//$query = "SELECT UID FROM HGJEON WHERE JEUID='$mrow[JEUID]' AND YMD < '$td2' ORDER BY YMD DESC, SEQNO DESC";
					var from = {jeuid: data["jeuid"], ymd: td2}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/accountingslip/select_accounting_slip8_1",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							data3 = result[0];
						}
					});
				}else{
					//$query = "SELECT UID FROM HGJEON WHERE JEUID='$mrow[JEUID]' AND YMD <= '$td2' AND SEQNO < $mrow[SEQNO] ORDER BY YMD DESC, SEQNO DESC";
					var from = {jeuid: data["jeuid"], ymd: td2, seqno: data["seqno"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/accountingslip/select_accounting_slip8_2",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							data3 = result[0];
						}
					});
				}
				logNow(data3);
				
				for(var ii = 1; ii <= 15; ii++){
					eval("var j" + ii + " = " + 0 + ";");
				}
				for(var ii = 1; ii <= 15; ii++){
					eval("var b" + ii + " = " + 0 + ";");
				}
				
				if(data3){
					var from = {paruid: data3["uid"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/accountingslip/select_accounting_slip9",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							logNow(result);
							for(var ii = 1 ; ii <= 15 ; ii++){
								var fdname = "j" + ii;
								eval("j" + ii + " = " + result[0][fdname] + ";");
								
							}
						}
					});
				}else{
					for(var ii = 1 ; ii <= 15 ; ii++){
						eval("j" + ii + " = " + "t" + ii + ";");
					}
				}
				
				// 금액계산
				var t_sum = 0; var n_jab = 0;
				if(data["fchk"] == 1){ // 마감
					for(var ii = 1 ; ii <= 15 ; ii++){
						eval("b" + ii + " = " + "j" + ii + ";");
						eval("j" + ii + " = " + 0 + ";");
					}
					for(var ii = 1 ; ii <= 15 ; ii++){// 잡이익,손실
						eval("t_sum += " + "b" + ii + ";");
					}
						
					n_jab = data["debit"] - t_sum;
				}else{
					t_sum = 0;
					for(var ii = 1 ; ii <= 15 ; ii++){
						eval("b" + ii + " = " + "Math.round(t" + ii + " * perc);");
						eval("t_sum += " + "b" + ii + ";");
						eval("j" + ii + " -= " + "b" + ii + ";");
					}
					// 용지대 조정
					t_sum -= data["debit"];
					b1 -= t_sum;
					j1 += t_sum;
					n_jab = 0;
				}
				
				var from = {
						paruid: data["uid"], 
						ymd2: td2,
						b1: b1,
						b2: b2,
						b3: b3,
						b4: b4,
						b5: b5,
						b6: b6,
						b7: b7,
						b8: b8,
						b9: b9,
						b10: b10,
						b11: b11,
						b12: b12,
						b13: b13,
						b14: b14,
						b15: b15,
						j1: j1,
						j2: j2,
						j3: j3,
						j4: j4,
						j5: j5,
						j6: j6,
						j7: j7,
						j8: j8,
						j9: j9,
						j10: j10,
						j11: j11,
						j12: j12,
						j13: j13,
						j14: j14,
						j15: j15,
						jab: n_jab
					}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/accountingslip/insert_accounting_slip",
					async: false,
					data: JSON.stringify(from),
					success: function (result) {
						logNow(result);
					},
					error: function () {
					}
				});
			}
			alert('전표 작성 완료');
		}
	});
}

//원천징수
function SelhWithholdingTax(bdate){
	$('#asWithholdingTaxDataTemp').css('display', 'none');
	$('#asWithholdingTaxData').css('display', '');
	
	var from = {date: bdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/accountingslip/select_withholding_tax",
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			var sum_1 = 0; var sum_2 = 0; var sum_3 = 0;
			
			htmlString = "";
			htmlString +=
				'<tr>'+
					'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">성명</span></td>'+
					'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">날짜</span></td>'+
					'<td width="100" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">주민등록번호</span></td>'+
					'<td width="280" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">주소</span></td>'+
					'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
					'<td width="70" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">지급액</span></td>'+
					'<td width="60" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">소득세</span></td>'+
					'<td width="60" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">주민세</span></td>'+
					'<td width="60" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">합계</span></td>'+
				'</tr>';
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				sum_1 += data["kyamnt"];
				sum_2 += data["kytax1"];
				sum_3 += data["kytax2"];
				
				var full_date = data["kydate1"].substring(2,4) + '.' + data["kydate1"].substring(4,6) + '.' + data["kydate2"];
				
				htmlString += 
					'<tr>'+
						'<td width="50" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><a href="javascript:DelhWithholdingTax(' + data["uid"] + ',' + 4 + ');">'+ data["kyname"] +'</a></span></td>'+
						'<td width="50" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="100" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;">'+ data["kynum"] +'</span></td>'+
						'<td width="280" height="25" align="left" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-left:3pt;">'+ data["kyaddr"] +'</span></td>'+
						'<td width="50" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-right:0pt;">'+ data["kygubn"] +'</span></td>'+
						'<td width="70" height="25" align="right" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-right:3pt;"><INPUT name="KYANMT" onKeypress="if(event.keyCode == 13){javascript:ModiWithholdingTax(1, this.value, '+ data["uid"] +');}" value="'+ numberWithCommas(data["kyamnt"]) +'" style="text-align:right; font-family:굴림; font-size:9pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:64px;"></span></td>'+
						'<td width="60" height="25" align="right" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-right:3pt;"><INPUT name="KYTAX1" onKeypress="if(event.keyCode == 13){javascript:ModiWithholdingTax(2, this.value, '+ data["uid"] +');}" value="'+ numberWithCommas(data["kytax1"]) +'" style="text-align:right; font-family:굴림; font-size:9pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:54px;"></span></td>'+
						'<td width="60" height="25" align="right" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-right:3pt;"><INPUT name="KYTAX2" onKeypress="if(event.keyCode == 13){javascript:ModiWithholdingTax(3, this.value, '+ data["uid"] +');}" value="'+ numberWithCommas(data["kytax2"]) +'" style="text-align:right; font-family:굴림; font-size:9pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:54px;"></span></td>'+
						'<td width="60" height="25" align="right" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data["kytax1"] + data["kytax2"]) +'</span></td>'+
					'</tr>';
			}
			
			htmlString +=
				'<tr>'+
					'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">'+ object_num.length +'</span></td>'+
					'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
					'<td width="100" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
					'<td width="280" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
					'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
					'<td width="70" height="25" align="right" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum_1) +'</span></td>'+
					'<td width="60" height="25" align="right" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum_2) +'</span></td>'+
					'<td width="60" height="25" align="right" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum_3) +'</span></td>'+
					'<td width="60" height="25" align="right" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum_2+sum_3) +'</span></td>'+
				'</tr>';
			
			$("#asWithholdingTaxData").html(htmlString);
		}
	});
	
	document.getElementById("PopUpWithholdingTax").onclick = function() { //on click
		var t_URL = "/popup?uid=";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "WithholdingTax", 'left=0,top=0,width=760,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu9("1_프린터팝업"));
		
		var page = 1;
		htmlString = "";
		htmlString += 
			'<table border="0" cellpadding="0" cellspacing="0" width="700">'+
			    '<tr>'+
			        '<td width="700" height="40" colspan="2" align="center"><span style="font-size:18pt; letter-spacing:15pt;"><b><u>자유직업소득</u></b></span></td>'+
			    '</tr>'+
			    '<tr>'+
			        '<td width="350" height="25"></td>'+
			        '<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">'+ string.com_name +' ('+ bdate.substring(0,4) + '.' + bdate.substring(4,6) +')</span></p></td>'+
			    '</tr>'+
			    '<tr>'+
			    	'<td width="700" align="left" valign="top" colspan="2">'+
			    		'<table border="0" cellspacing="1" width="700" bordercolordark="white" bordercolorlight="black" bordercolor="black" cellpadding="0" bgcolor="#000000">'+
			                '<tr>'+
			                    '<td width="70" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt;"><b>날짜<b></span></p></td>'+
			                    '<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>성명<b></span></td>'+
			                    '<td width="330" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>적요<b></span></td>'+
			                    '<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>지급액<b></span></td>'+
			                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>소득세<b></span></td>'+
			                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>주민세<b></span></td>'+
			                '</tr>';
		
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/accountingslip/select_withholding_tax2",
			data : JSON.stringify(from),
			success: function (result) {
				var object_num = Object.keys(result);
				var sum_1 = 0; var sum_2 = 0; var sum_3 = 0;
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					sum_1 += data["kyamnt"];
					sum_2 += data["kytax1"];
					sum_3 += data["kytax2"];
					
					var full_date = data["kydate1"].substring(2,4) + '.' + data["kydate1"].substring(4,6) + '.' + data["kydate2"];
					
					htmlString += 
						'<tr>'+
				            '<td width="70" height="23" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
				            '<td width="80" height="23" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["kyname"] +'</span></td>'+
				            '<td width="330" height="23" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:4pt;">'+ data["kycomm"] +'</span></td>'+
				            '<td width="80" height="23" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["kyamnt"]) +'</span></td>'+
				            '<td width="70" height="23" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["kytax1"]) +'</span></td>'+
				            '<td width="70" height="23" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["kytax2"]) +'</span></td>'+
				        '</tr>';
					if((++i) % 35 == 1 && i != 1){
						htmlString += 
									'</table>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td width="350" align="left" height="30" valign="bottom"><span style="font-size:9pt;">Page : '+ page +'</span></td>'+
								'<td width="350" align="right" height="30" valign="bottom"><span style="font-size:9pt;"></span></td>'+
							'</tr>'+		
						'</table>'+
						'<p style="page-break-before:always">'+
						'<table border="0" cellpadding="0" cellspacing="0" width="700">'+
						    '<tr>'+
						        '<td width="700" height="40" colspan="2" align="center"><span style="font-size:18pt; letter-spacing:15pt;"><b><u>자유직업소득</u></b></span></td>'+
						    '</tr>'+
						    '<tr>'+
						        '<td width="350" height="25"></td>'+
						        '<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">'+ string.com_name +' ('+ bdate.substring(0,4) + '.' + bdate.substring(4,6) +')</span></p></td>'+
						    '</tr>'+
						    '<tr>'+
					        	'<td width="700" align="left" valign="top" colspan="2">'+
					        		'<table border="0" cellspacing="1" width="700" bordercolordark="white" bordercolorlight="black" bordercolor="black" cellpadding="0" bgcolor="#000000">'+
						                '<tr>'+
						                    '<td width="70" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt;"><b>날짜<b></span></p></td>'+
						                    '<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>성명<b></span></td>'+
						                    '<td width="330" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>적요<b></span></td>'+
						                    '<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>지급액<b></span></td>'+
						                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>소득세<b></span></td>'+
						                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>주민세<b></span></td>'+
						                '</tr>';
						page += 1;
					}
				}
				htmlString += 
								'<tr>'+
						            '<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><b>'+ object_num.length +'</b></span></td>'+
						            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
						            '<td width="330" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
						            '<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;"><b>'+ numberWithCommas(sum_1) +'</b></span></td>'+
						            '<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;"><b>'+ numberWithCommas(sum_2) +'</b></span></td>'+
						            '<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;"><b>'+ numberWithCommas(sum_3) +'</b></span></td>'+
						        '</tr>'+        
						    '</table>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td width="350" align="left" height="30" valign="bottom"><span style="font-size:9pt;">Page : '+ page +'</span></td>'+
						'<td width="350" align="right" height="30" valign="bottom"><span style="font-size:9pt;">자료수 : '+ object_num.length +'</span></td>'+
					'</tr>'+
				'</table>';
			}
		});
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
    }
}

function DelhWithholdingTax(uid){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid: uid};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/accountingslip/delete_withholding_tax",
			data : JSON.stringify(from),
			success : function(result) {
				alert("데이터 삭제 완료");
			},
			error : function(){
			}
		});
	}
}

function InsertWithholdingTax(){
	var kydate1 = $("select[name=ty]").val() + $("select[name=tm]").val();
	var kydate2 = $("input[name=KYDATE2]").val(); //날짜
	var kynum = $("input[name=KYNUM]").val(); //주민등록번호
	var kyname = $("input[name=KYNAME]").val(); //성명
	var kyaddr = $("input[name=KYADDR]").val(); //주소
	var kyamnt = $("input[name=KYAMNT]").val(); //지급액
	var kycomm = $("input[name=KYCOMM]").val(); //적요
	var kygubn = $("input[name=KYGUBN]").val(); //비고
	
	if (kydate2 == "") return $("input[name=KYDATE2]").focus();
	if (kynum == "") return $("input[name=KYNUM]").focus();
	if (kyname == "") return $("input[name=KYNAME]").focus();
	if (kyaddr == "") return $("input[name=KYADDR]").focus();
	if (kyamnt == "") return $("input[name=KYAMNT]").focus();
	if (kycomm == "") return $("input[name=KYCOMM]").focus();
	if (kygubn == "") return $("input[name=KYGUBN]").focus();
	
	kydate2 = kydate2 >= 10 ? kydate2 : '0' + kydate2;
	
	if(parseInt(kyamnt) < 33333){
		var new_tax1 = 0;
		var new_tax2 = 0;
	}else{
		var new_tax1 = Math.round((parseInt(kyamnt) * 0.03), -1);
		var new_tax2 = Math.round((parseInt(kyamnt) * 0.1), -1);
	}
	logNow(new_tax1);
	logNow(new_tax1);
	
	var from = {
			kydate1: kydate1, 
			kydate2: kydate2,
			kyname: kyname,
			kynum: kynum,
			kyaddr: kyaddr,
			kycomm: kycomm,
			kyamnt: parseInt(kyamnt),
			kytax1: new_tax1,
			kytax1: new_tax2,
			kygubn: kygubn
		}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/insert_withholding_tax",
		data: JSON.stringify(from),
		success: function (result) {
			logNow(result);
			$("input[name=KYDATE2]").val(""); //날짜
			$("input[name=KYNUM]").val(""); //주민등록번호
			$("input[name=KYNAME]").val(""); //성명
			$("input[name=KYADDR]").val(""); //주소
			$("input[name=KYAMNT]").val(""); //지급액
			$("input[name=KYCOMM]").val(""); //적요
			$("input[name=KYGUBN]").val(""); //비고
			alert('성공');
		},
		error: function () {
		}
	});
}

function ModiWithholdingTax(ctype, cval, cuid){
	var value = parseInt(cval.replace(",",""));
	
	switch (ctype){
		case 1:
			var chrec = "kyamnt"; break;
		case 2:
			var chrec = "kytax1"; break;
		case 3:
			var chrec = "kytax2"; break;
	}

	var from = {
		uid: cuid,
		value: value, 
		chrec: chrec
	}

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/update_withholding_tax",
		data: JSON.stringify(from),
		success: function (result) {
			alert("데이터 수정 완료");
		},
		error: function () {
		}
	});
}

//도서별 월별집계
function SelMonthlySumByBook(){ 
	$('#MonthlySumByBookData').css('display', '');
	
	var date1 = $("input[name=date1]").val();
	var bookcode = $("input[name=book1]").val();
	
	if (date1 == "") return $("input[name=date1]").focus();
	if (bookcode == "") return $("input[name=book1]").focus();
	
	var from = {sbbook: bookcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/accountingslip/select_production_bybook1",
		data : JSON.stringify(from),
		success: function (result) {
			var title = "20" + date1 + " 년 " + "< " + result[0]["sbname"] + " > 월별 집계"; 
			$("#title").text(title);
			$('input[name=book2]').attr('value',result[0]["sbname"]);
		}
	});
	
	var htmlString = "";
	htmlString += 
		'<tr>'+
			'<td width="20" rowspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">월</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">구매</font></span></td>'+        
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">판매</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">반입</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">증정</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">폐기</font></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+        
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+       
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+       
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+      
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+       
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+       
		'</tr>';
	
	var t_sumq1 = 0; // 구매
	var t_sumq3 = 0; // 판매
	var t_sumq4 = 0; // 반입
	var t_sumq5 = 0; // 증정
	var t_sumq6 = 0; // 폐기
	var t_suma1 = 0; // 구매
	var t_suma3 = 0; // 판매
	var t_suma4 = 0; // 반입
	var t_suma5 = 0; // 증정
	var t_suma6 = 0; // 폐기
	
	var d = new Date();
	var current_year = ((d.getFullYear()).toString()).substring(2,4);
	
	if(date1 == current_year) 
		var emon = d.getMonth() + 1;
	else
		var emon = 12;
	
	for(var i = 1; i <= emon; i++){
		var month = (i) >= 10 ? (i) : '0' + (i);
		
		var from = {year: date1, month: month.toString(), bookcode: bookcode}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/accountingslip/select_monthly_sum_bybook",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				htmlString +=
					'<tr>'+
						'<td width="20" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ i +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq1"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma1"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq3"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma3"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq4"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma4"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq5"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma5"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq6"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma6"]) +'</span></td>'+
					'</tr>';
				
				t_sumq1 += result[0]["sumq1"];
				t_suma1 += result[0]["suma1"];
			    t_sumq3 += result[0]["sumq3"];
			    t_suma3 += result[0]["suma3"];
			    t_sumq4 += result[0]["sumq4"];
			    t_suma4 += result[0]["suma4"];
			    t_sumq5 += result[0]["sumq5"];
			    t_suma5 += result[0]["suma5"];
			    t_sumq6 += result[0]["sumq6"];
			    t_suma6 += result[0]["suma6"];
			}
		});
	}
	htmlString +=
		'<tr>'+
			'<td width="20" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">계</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq1) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma1) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq3) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma3) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq4) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma4) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq5) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma5) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq6) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma6) +'</span></td>'+
		'</tr>';
	
	$("#MonthlySumByBookData").html(htmlString);
}

//년도별 월별집계
function SelMonthlyAggregateByYear(){
	$('#asMonthlyAggregateByYearData').css('display', '');
	
	var date1 = $("input[name=date1]").val();
	
	(document.getElementById("title")).innerHTML = "20" + date1 + "년 월별 집계";
	
	var d = new Date();
	var current_year = ((d.getFullYear()).toString()).substring(2,4);
	
	if(date1 == current_year) 
		var emon = d.getMonth() + 1;
	else
		var emon = 12;
	
	var t_sumq1 = 0; // 구매
	var t_sumq3 = 0; // 판매
	var t_sumq4 = 0; // 반입
	var t_sumq5 = 0; // 증정
	var t_sumq6 = 0; // 폐기
	var t_suma1 = 0; // 구매
	var t_suma3 = 0; // 판매
	var t_suma4 = 0; // 반입
	var t_suma5 = 0; // 증정
	var t_suma6 = 0; // 폐기
	
	var htmlString = "";
	htmlString += 
		'<tr>'+
			'<td width="20" rowspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">월</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">구매</font></span></td>'+        
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">판매</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">반입</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">증정</font></span></td>'+
			'<td width="140" colspan="2" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">폐기</font></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+        
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+        
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+      
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+       
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>'+       
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+       
		'</tr>';
	
	for(var i = 1; i <= emon; i++){
		var month = (i) >= 10 ? (i) : '0' + (i);
		
		var from = {year: date1, month: month.toString()}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/accountingslip/select_monthlyaggregate_byyear",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				htmlString +=
					'<tr>'+
						'<td width="20" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ i +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq1"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma1"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq3"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma3"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq4"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma4"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq5"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma5"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["sumq6"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(result[0]["suma6"]) +'</span></td>'+
					'</tr>';
				
				t_sumq1 += result[0]["sumq1"];
				t_suma1 += result[0]["suma1"];
			    t_sumq3 += result[0]["sumq3"];
			    t_suma3 += result[0]["suma3"];
			    t_sumq4 += result[0]["sumq4"];
			    t_suma4 += result[0]["suma4"];
			    t_sumq5 += result[0]["sumq5"];
			    t_suma5 += result[0]["suma5"];
			    t_sumq6 += result[0]["sumq6"];
			    t_suma6 += result[0]["suma6"];
			}
		});
	}
	htmlString +=
		'<tr>'+
			'<td width="20" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">계</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq1) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma1) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq3) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma3) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq4) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma4) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq5) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma5) +'</span></td>'+
			'<td width="60" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_sumq6) +'</span></td>'+
			'<td width="80" bgcolor="#F4F4F4" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(t_suma6) +'</span></td>'+
		'</tr>';
	
	$("#asMonthlyAggregateByYearData").html(htmlString);
}

//도서별 제작현황
function SelProductionByBook(){
	$('#asByBookData').css('display', '');
	
	$("#asByBookData").html("");
	$("#asByBookData2").html("");
	var bookcode = $("input[name=man1]").val();
	var from = {sbbook: bookcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/accountingslip/select_production_bybook1",
		data : JSON.stringify(from),
		success: function (result) {
			$('input[name=book2]').attr('value',result[0]["sbname"]);
		}
	});
	
	var t_sum1 = 0; // 부수
	var t_sum2 = 0; // 제작비
	var t_sum3 = 0; // 입고
	var t_sum4 = 0; // 미입고
	var t_sum5 = 0; // 증감
	var ii = 0;
	
	htmlString = "";
	htmlString +=
		'<tr>'+
			'<td width="120" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">제작년월</font></span></td>'+        
			'<td width="120" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">부수</font></span></td>'+
			'<td width="140" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">제작비</font></span></td>'+
			'<td width="120" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">입고수량</font></span></td>'+
			'<td width="120" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">미입고수량</font></span></td>'+
			'<td width="100" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">증감</font></span></td>'+
		'</tr>';
	
	var from = {bcode: bookcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/accountingslip/select_production_bybook2",
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result); 
			for(var i in object_num){
				var data = result[object_num[i]];
				
				var total_cost = 0;
				var total_in = 0;
				var total_nin = 0;
				var fchk = 0;
				var ib_uid = 0;
				
				var from = {listid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/accountingslip/select_production_bybook3",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num2 = Object.keys(result2); 
						for(var j in object_num2){
							var data2 = result2[object_num2[j]]; 
							
							var full_date = MsToFulldate(data2["bdate"]);
							full_date = full_date.substring(2,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
							
							var from = {uid: data2["uid"]}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: SETTING_URL + "/accountingslip/select_production_bybook3_1",
								data : JSON.stringify(from),
								success: function (result3) {
									var object_num3 = Object.keys(result3); 
									for(var k in object_num3){
										var data3 = result3[object_num3[k]]; 
										total_cost += data3["wtotal"];
									}
								}
							});
							
							var from = {uid: data2["uid"]}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: SETTING_URL + "/accountingslip/select_production_bybook3_2",
								data : JSON.stringify(from),
								success: function (result3) {
									var object_num3 = Object.keys(result3); 
									for(var k in object_num3){
										var data3 = result3[object_num3[k]]; 
										
										total_in += data3["tnum"];
								    	total_nin += data3["xnum"];
								    	fchk = data3["fchk"];
								    	logNow("fchk");
										logNow(data3["fchk"]);
								    	if (ib_uid == 0)
								    		ib_uid = data3["uid2"];
									}
								}
							});
							
						}
						
						htmlString +=
							'<tr style="cursor:hand;" onClick="javascript:View_ProductionByBookDetail(comment'+ ii +');">'+
								'<td width="120" height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ full_date +'</span></td>'+
								'<td width="120" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;">'+ numberWithCommas(data["bnum"]) +'</span></td>'+
								'<td width="140" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;">'+ numberWithCommas(total_cost) +'</span></td>'+
								'<td width="120" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;">'+ numberWithCommas(total_in) +'</span></td>'+
								'<td width="120" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;">'; if(total_nin > 0) htmlString += numberWithCommas(Math.abs(total_nin)); htmlString += '</span></td>'+
								'<td width="100" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;"></span>';
								if(fchk != null){
									if(total_nin < 0){ // 초과
										htmlString += '<font color="blue"><b>';
										htmlString += numberWithCommas(Math.abs(total_nin));
										htmlString += '</b></font>';
									}
									if(total_nin > 0){ // 미달
										htmlString += '<font color="red"><b>';
										htmlString += numberWithCommas(total_nin);
										htmlString += '</b></font>';
									}
								} htmlString += 
								'</td>'+
							'</tr>'+
							'<tr style="display:none;" id="comment'+ ii +'">'+
								'<td width="720" colspan="6" align="center" bgcolor="#FCFCFC">'+
									'<table border="0" width="200">';			
								
							var from = {uid2: ib_uid}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: SETTING_URL + "/accountingslip/select_production_bybook4",
								data : JSON.stringify(from),
								success: function (result3) {
									var object_num3 = Object.keys(result3);
									for(var k in object_num3){
										var data3 = result3[object_num3[k]]; 
										
										htmlString +=
											'<tr>'+
												'<td width="100"><span style="font-size:9pt;">'+ data3["idate"].substring(0,2) + '.' + data3["idate"].substring(2,4) + '.' + data3["idate"].substring(4,6) + '</span></td>'+
												'<td width="100" align="right"><span style="font-size:9pt; padding-right:20pt;">'+ numberWithCommas(data3["inum"]) +' 부</span></td>'+
											'</tr>';
									}
								}
							});	
							htmlString +=
									'</table>'+
								'</td>'+
							'</tr>';
					}
				});
				ii += 1;
			}
		}
	});
	
	var from = {wwbook: bookcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/accountingslip/select_production_bybook5",
		data : JSON.stringify(from),
		success: function (result) {
			if(result.length != 0){
				var object_num = Object.keys(result); 
				for(var k in object_num){
					var data = result[object_num[k]];
					
					htmlString += 
						'<tr>'+
							'<td width="120" height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["wwyyyy"] + '.' + data["wwmmmm"] + '.' + data["wwdddd"] +'</span></td>'+
							'<td width="120" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;">'+ numberWithCommas(data["wwbusu"]) +'</span></td>'+
							'<td width="140" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;">'+ numberWithCommas(data["wttotl"]) +'</span></td>'+
							'<td width="120" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;"></span></td>'+
							'<td width="120" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;"></span></td>'+
							'<td width="100" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:20pt;"></span></td>'+
						'</tr>';	
				}
				
			}
		}
	});
	$("#asByBookData").html(htmlString);
}

function View_ProductionByBookDetail(objname){ //도서별 제작현황 디테일
	if (objname.style.display == 'none')
		objname.style.display = 'block';
    else
    	objname.style.display = 'none';
}

function SearchBookcode_m9(){
	popUp = "";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open("/bookcode", "BOOKW", 'left=0,top=0,width=380,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu9("5_popup"));
	
	(popUp.document.getElementById("btnSearchbookcode")).onclick = function() { 
		var bname = popUp.document.getElementById("txtBookcode").value;

		var from = {bname: bname}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_inventory_inquiry3",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var object_num = Object.keys(result);
			    htmlString = "";
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					if (data["sbpegi"] == "P") var font_color = "#AAAAAA";
					else var font_color = "#000000";
					
					htmlString += 
						'<tr>'+
							'<td width="40" align="center" style="border-left-width: 1; border-right-width: 1; border-top-width: 1; border-bottom-style: dotted; border-bottom-width: 1" bordercolorlight="#FFFFFF" bordercolordark="#FFFFFF" bordercolor="#000000"><span style="font-size:9pt;">'+
								'<font color="'+ font_color +'">'+ data["sbbook"] +'</font></span></td>'+
							'<td onClick="javascript:testttttttttt_m9('+ "'" + data["sbbook"] + "'" +');" onMouseOver=this.style.backgroundColor="8CFFFE" onMouseOut=this.style.backgroundColor="FFFFFF" width="260" align="left" style="border-left-width: 1; border-right-width: 1; border-top-width: 1; border-bottom-style: dotted; border-bottom-width: 1" bordercolorlight="#FFFFFF" bordercolordark="#FFFFFF" bordercolor="#000000"><span style="font-size:9pt; padding-left:3pt;">'+
								'<font color="'+ font_color +'">'+ data["sbname"] +'</font></span></td>'+
						'</tr>';
				}
				(popUp.document.getElementById("pioMoncuDailytotalData2")).innerHTML = htmlString;
			}
		});
    }
}

function testttttttttt_m9(sbbook){//질문
	logNow(sbbook);
}

//전기 이월 작업
function SelElecCarryoverWork(){
	var date1 = $("input[name=date1]").val();
	if(date1.length != 2) return $("input[name=date1]").focus();
	
	$('#jejak_detail_view').html(jmenu9("7_디테일"));
	$("input[name=tmp_msg2]").val(' 도서수량 ');
	
	var ty = (parseInt(date1) + 1) >= 10 ? (parseInt(date1) + 1) : '0' + (parseInt(date1) + 1);
	
	// 도서수량 
	setTimeout(function(){
		var tblname1 = "KTBKS" + date1 + "0";
		var tblname2 = "KTBKS" + ty + "0";
		
		var mk_tbl = tblname2;
		
		var from = {dbname: mk_tbl}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/create_table_KTBKSyy0",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
			}
		});
		
		var from = {dbname: mk_tbl}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/trun_table",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
			}
		});
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/trun_table_KTTEMP1",
			async: false,
			success: function (result) {
				logNow(result);
			}
		});
		
		var from = {dbname: tblname1}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/select_elec_carryover_work1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow("---");
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var from = { s1book: data["tbsbook"] }
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/accountingslip/insert_elec_carryover_work1",
						async: false,
						data: JSON.stringify(from),
						success: function (result) {
							logNow(result);
						},
						error: function () {
						}
					});
				}
			}
		});
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/select_elec_carryover_work2",
			async: false,
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var tmp_msg = data["s1book"] + " ..........";
					$("input[name=tmp_msg]").val(tmp_msg); //실시간 처리 //질문
					
					logNow("tmp_msg: " + tmp_msg);
					
					(function(i) {
						var iw = 0;
						var from = {dbname: tblname1, tbsbook: data["s1book"]}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/accountingslip/select_elec_carryover_work3",
							async: false,
							data : JSON.stringify(from),
							success: function (result2) {
								
								var object_num2 = Object.keys(result2);
								for(var k in object_num2){
									var data2 = result2[object_num2[k]]; 
									iw += data2["tbasr"] - data2["tbbsr"] - data2["tbcsr"] + data2["tbdsr"] - data2["tbesr"] - data2["tbfsr"];
								}
								for(var ii = 0 ; ii <= 12 ; ii++){
									if(ii == 0){
										//$query = "INSERT INTO $tblname2 (TBSBOOK,TBMGUBN, TBASR) VALUES ('$mrow[0]',0, $iw)";
										var from = { dbname: tblname2, tbsbook: data["s1book"], tbasr: iw }
										$.ajax({
											type: "POST",
											contentType: "application/json; charset=utf-8;",
											dataType: "json",
											url: SETTING_URL + "/accountingslip/insert_elec_carryover_work2_1",
											async: false,
											data: JSON.stringify(from),
											success: function (result) {
												logNow(result);
											},
											error: function () {
											}
										});
									}else{
										//$query = "INSERT INTO $tblname2 (TBSBOOK,TBMGUBN) VALUES ('$mrow[0]',$ii)";
										var from = { dbname: tblname2, tbsbook: data["s1book"], tbmgubn: ii }
										$.ajax({
											type: "POST",
											contentType: "application/json; charset=utf-8;",
											dataType: "json",
											url: SETTING_URL + "/accountingslip/insert_elec_carryover_work2_2",
											async: false,
											data: JSON.stringify(from),
											success: function (result) {
												logNow(result);
											},
											error: function () {
											}
										});
									}
								}
							}
						});
					})(i);
				} 
			}
		});
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/trun_table_KTTEMP1",
			async: false,
			success: function (result) {
				logNow(result);
			}
		});
	}, 1000);
	
	/*logNow("*************************************************");
	$("input[name=tmp_msg2]").val(' 도서금액 ');
	
	// 도서금액
	setTimeout(function(){
		var tblname1 = "KTBKK" + date1 + "0";
		var tblname2 = "KTBKK" + ty + "0";
		
		var mk_tbl = tblname2;
		
		var from = {dbname: mk_tbl}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/create_table_KTBKKyy0",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
			}
		});
		
		var from = {dbname: mk_tbl}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/trun_table",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
			}
		});
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/trun_table_KTTEMP1",
			async: false,
			success: function (result) {
				logNow(result);
			}
		});
		
		var from = {dbname: tblname1}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/select_elec_carryover_work4",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow("---");
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var from = { s1book: data["tbkbook"] }
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/accountingslip/insert_elec_carryover_work1",
						async: false,
						data: JSON.stringify(from),
						success: function (result) {
							logNow(result);
						},
						error: function () {
						}
					});
				}
			}
		});
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/select_elec_carryover_work2",
			async: false,
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var tmp_msg = data["s1book"] + " ..........";
					$("input[name=tmp_msg]").val(tmp_msg); //실시간 처리 //질문
					
					logNow("tmp_msg2: " + tmp_msg);
					
					///여기부터
				} 
			}
		});
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/trun_table_KTTEMP1",
			async: false,
			success: function (result) {
				logNow(result);
			}
		});
		
	}, 1000);*/
}

//미입고 도서
function SelBooksNotin(){ 
	var popupdate;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_books_notin1",
		async: false,
		success: function (result) {
			var listdate = result[0]["listdate"];
			var full_date = MsToFulldate(listdate);
			full_date = full_date.substring(0,4) + '/' + full_date.substring(4,6) + '/' + full_date.substring(6,8);
			var d = new Date(listdate * 1000);
			var hour = (d.getHours()) >= 10 ? (d.getHours()) : '0' + (d.getHours());
			var minute = (d.getMinutes()) >= 10 ? (d.getMinutes()) : '0' + (d.getMinutes());
			full_date += ' ' + hour + ':' + minute;
			
			(document.getElementById("full_date")).innerHTML = full_date;
			popupdate = full_date;
		}
	});
	
	htmlString = "";
	htmlString +=
		'<tr>'+
			'<td width="40" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">번호</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">제작일</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">도서코드</font></span></td>'+
			'<td width="350" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">도서명</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">제작부수</font></span></td>'+
			'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">미입고수량</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">제본소</font></span></td>'+
		'</tr>';
	
	var resultData;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_books_notin2",
		async: false,
		success: function (result) {
			resultData = result;
			var object_num = Object.keys(result);
			
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = data["mkdate"].substring(2,4) + '.' + data["mkdate"].substring(4,6) + '.' + data["mkdate"].substring(6,8);
				
				htmlString += 
					'<tr>'+
						'<td width="40" bgcolor="#FFFFFF" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">'+ (++i) +'</font></span></td>'+
						'<td width="60" bgcolor="#FFFFFF" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">'+ full_date +'</font></span></td>'+
						'<td width="60" bgcolor="#FFFFFF" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">'+ data["mkbook"] +'</font></span></td>'+
						'<td width="350" bgcolor="#FFFFFF" align="left" valign="middle" height="30"><span style="font-size:9pt; padding-left:10;"><font color="#666666">'+ data["mkname"] +'</font></span></td>'+
						'<td width="60" bgcolor="#FFFFFF" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:10;"><font color="#666666">'+ numberWithCommas(data["mknum"]) +'</font></span></td>'+
						'<td width="80" bgcolor="#FFFFFF" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:10;"><font color="#666666">'+ numberWithCommas(data["mknum2"]) +'</font></span></td>'+
						'<td width="70" bgcolor="#FFFFFF" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">'+ data["mkname2"] +'</font></span></td>'+
					'</tr>';
			}
			$("#asBooksNotinData").html(htmlString);
		}
	});
	
	document.getElementById("PopUpBooknotin").onclick = function() { //on click
		logNow(resultData);
		
		var t_URL = "/popup?uid=";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "booknotin", 'left=0,top=0,width=760,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		
		popUp.document.write(jmenu9("9_프린터팝업"));
		
		var object_num = Object.keys(resultData);
		var page = 1;
		htmlString = "";
		
		htmlString += 
			'<table border="0" cellpadding="0" cellspacing="0" width="700">'+
	   			'<tr>'+
	   				'<td width="700" height="40" colspan="2" align="center"><span style="font-size:18pt; letter-spacing:13pt;"><b><u>미입고도서현황</u></b></span></td>'+
	   			'</tr>'+
	   			'<tr>'+
	   				'<td width="350" height="25" align="left"><p style="padding-right:0px;"><span style="font-size:9pt;">< <a id="popupdate"></a> 기준 ></span></p></td>'+
	   				'<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">'+ string.com_name +'</span></p></td>'+
	   			'</tr>'+
			    '<tr>'+
			        '<td width="700" align="left" valign="top" colspan="2">'+
			        	'<table border="0" cellspacing="1" width="700" bordercolordark="white" bordercolorlight="black" bordercolor="black" cellpadding="0" bgcolor="#000000">'+
				            '<tr>'+
				                '<td width="30" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt;"><b>번호<b></span></p></td>'+
				                '<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>제작일<b></span></td>'+
				                '<td width="300" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:40pt;"><b>도서명<b></span></td>'+
				                '<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>제작부수<b></span></td>'+
				                '<td width="50" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>미입고<b></span></td>'+
				                '<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>제본소<b></span></td>'+
				                '<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:40pt;"><b>비고<b></span></td>'+
				            '</tr>';
		
		for(var i in object_num){
			var data = resultData[object_num[i]]; 
			var full_date = data["mkdate"].substring(2,4) + '.' + data["mkdate"].substring(4,6) + '.' + data["mkdate"].substring(6,8);
			htmlString += 
				'<tr>'+
		            '<td width="30" height="23" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
		            '<td width="60" height="23" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
		            '<td width="300" height="23" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["mkname"] +'</span></td>'+
		            '<td width="60" height="23" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(data["mknum"]) +'</span></td>'+
		            '<td width="50" height="23" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(data["mknum2"]) +'</span></td>'+
		            '<td width="60" height="23" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["mkname2"] +'</span></td>'+
		            '<td width="140" height="23" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:0pt;"></span></td>'+
		        '</tr>';
			
			if((++i) % 35 == 1 && i != 1){
				htmlString += 
							'</table>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td width="700" height="40" colspan="2" align="center"><span style="font-size:10pt;"><b>- PAGE : '+ page +' -</b></span></td>'+
					'</tr>'+
				'</table>'+
				'<p style="page-break-before:always">'+
				'<table border="0" cellpadding="0" cellspacing="0" width="700">'+
					'<tr>'+
						'<td width="700" height="40" colspan="2" align="center"><span style="font-size:18pt; letter-spacing:13pt;"><b><u>미입고도서현황</u></b></span></td>'+
					'</tr>'+
					'<tr>'+
					    '<td width="350" height="25" align="left"><p style="padding-right:0px;"><span style="font-size:9pt;">< '+ popupdate +'</a> 기준 ></span></p></td>'+
					    '<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">'+ string.com_name +'</span></p></td>'+
					'</tr>'+
				    '<tr>'+
				    	'<td width="700" align="left" valign="top" colspan="2">'+
				    		'<table border="0" cellspacing="1" width="700" bordercolordark="white" bordercolorlight="black" bordercolor="black" cellpadding="0" bgcolor="#000000">'+
					            '<tr>'+
					                '<td width="30" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt;"><b>번호<b></span></p></td>'+
					                '<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>제작일<b></span></td>'+
					                '<td width="300" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:40pt;"><b>도서명<b></span></td>'+
					                '<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>제작부수<b></span></td>'+
					                '<td width="50" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>미입고<b></span></td>'+
					                '<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>제본소<b></span></td>'+
					                '<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:40pt;"><b>비고<b></span></td>'+
					            '</tr>';
				page += 1;
			}
		}
		htmlString += 
						'</table>'+
				    '</td>'+
				'</tr>'+
				'<tr>'+
					'<td width="700" height="40" colspan="2" align="center"><span style="font-size:10pt;"><b>- PAGE : '+ page +' -</b></span></td>'+
				'</tr> '+
			'</table>';
		
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
		(popUp.document.getElementById("popupdate")).innerHTML = popupdate;
    }
}

function MakeBooksNotin(){ //새로계산 버튼
	var d = new Date();
	
	var newy = parseInt(d.getFullYear());
	var newm = parseInt(d.getMonth()) - 1;
	var newd = parseInt(d.getDate());
	
	if(newm == 0){
		newy -= 1;
		newm = 12;
	}
	
	var new_date = new Date().getTime()/1000;
	var new_date2;
	var new_date3 = new Date(newy, newm-1, 0).getTime()/1000;
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/turncate_books_notin1",
		async: false,
		success: function (result) {
			if(result == true){
				var from = {new_date3: String(new_date3)}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/accountingslip/select_books_notin3",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						var object_num = Object.keys(result);
						
						for(var i in object_num){
							var data = result[object_num[i]]; 
							new_date2 = MsToFulldate(data["jdate"]);
							
							var m3; var custname;
							var from = {juid: data["juid"]}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/accountingslip/select_books_notin4",
								async: false,
								data : JSON.stringify(from),
								success: function (result) {
									if(result.length != 0) m3 = result[0]["m3"];
									else m3 = "";
									
								}
							});
							var from = {m3: m3}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/accountingslip/select_books_notin5",
								async: false,
								data : JSON.stringify(from),
								success: function (result) {
									if(result.length != 0) custname = result[0]["wcyakc"];
									else custname = "";
									
								}
							});
							var from = {
									new_date: new_date, 
									new_date2: new_date2,
									bookcode: data["bookcode"],
									bookname: data["bookname"],
									jnum: data["jnum"],
									xnum: data["xnum"],
									custname: custname
								}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/accountingslip/insert_books_notin1",
								data: JSON.stringify(from),
								success: function (result) {
									logNow(result);
									
								},
								error: function () {
								}
							});
						}
					}
				});
			}else alert("DB ERROR");
		}
	});
}

//전도서재고조회
function SelAllBookStock(){ 
	var wnum = $("input[name=wnum]").val();
	htmlString = "";
	if(wnum){
		document.getElementById("Lay1").style.display = 'block';
		
		setTimeout(function(){
			htmlString += 
				'<tr>'+
					'<td width="720">'+
						'<table border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC">'+
							'<tr>'+
								'<td width="30" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">번호</font></span></td>'+
								'<td width="50" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">도서코드</font></span></td>'+
								'<td width="240" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">도서명</font></span></td>'+
								'<td width="100" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">출판사재고</font></span></td>'+
								'<td width="100" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">아트재고</font></span></td>'+        
								'<td width="100" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">합계</font></span></td>'+
								'<td width="100" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">미입고</font></span></td>'+
							'</tr>';
			var ii = 1;
			//출판사
			$.ajax({
				type: "POST",
				dataType: "json",
				url: SETTING_URL + "/accountingslip/select_allbooks_stock1",
				async: false,
				timeout: 5000,
				success: function (result) {
					logNow("c");
					var object_num = Object.keys(result); 
					
					for(var k in object_num){
						var data = result[object_num[k]]; 
						if(data["sbbook"] == "981140" || data["sbbook"] == "981160" || data["sbbook"] == "981180") continue;
						
						var numlist = CalStock(data["sbbook"], 1);
						
						var sum = numlist.num1 + numlist.num2;
						if(sum < wnum){
							logNow(sum);
							
							htmlString += 
								'<tr>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ ii +'</span></td>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["sbbook"] +'</span></td>'+
									'<td height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num1) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num2) +'</span></td>'+       
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">';if(numlist.num3) htmlString += '<font color="red">'+ numberWithCommas(numlist.num3) +'</font>'; htmlString += '</span></td>'+
								'</tr>';
									
							ii += 1;
						}
					}
				}
			});
			
			//출판사 보류
			$.ajax({
				type: "POST",
				dataType: "json",
				url: SETTING_URL + "/accountingslip/select_allbooks_stock1_2",
				async: false,
				success: function (result) {
					logNow("c");
					var object_num = Object.keys(result); 
					for(var k in object_num){
						var data = result[object_num[k]]; 
						
						var numlist = CalStock(data["sbbook"], 1);
						
						var sum = numlist.num1 + numlist.num2;
						if(sum < wnum){
							logNow(sum);
							htmlString += 
								'<tr bgcolor="CCFFCC">'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ ii +'</span></td>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["sbbook"] +'</span></td>'+
									'<td height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num1) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num2) +'</span></td>'+       
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">';if(numlist.num3) htmlString += '<font color="red">'+ numberWithCommas(numlist.num3) +'</font>'; htmlString += '</span></td>'+
								'</tr>';
							ii += 1;
						}
					}
				}
			});
			
			//데이타
			$.ajax({
				type: "POST",
				dataType: "json",
				url: SETTING_URL + "/accountingslip/select_allbooks_stock1_3",
				async: false,
				success: function (result) {
					logNow("c");
					var object_num = Object.keys(result); 
					for(var k in object_num){
						var data = result[object_num[k]]; 
						
						var numlist = CalStock(data["sbbook"], 2);
						
						var sum = numlist.num1 + numlist.num2;
						if(sum < wnum){
							logNow(sum);
							htmlString += 
								'<tr>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ ii +'</span></td>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["sbbook"] +'</span></td>'+
									'<td height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num1) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num2) +'</span></td>'+       
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">';if(numlist.num3) htmlString += '<font color="red">'+ numberWithCommas(numlist.num3) +'</font>'; htmlString += '</span></td>'+
								'</tr>';
							ii += 1;
						}
					}
				}
			});
			
			//데이타 보류
			$.ajax({
				type: "POST",
				dataType: "json",
				url: SETTING_URL + "/accountingslip/select_allbooks_stock1_4",
				async: false,
				success: function (result) {
					logNow("c");
					var object_num = Object.keys(result); 
					for(var k in object_num){
						var data = result[object_num[k]]; 
						
						var numlist = CalStock(data["sbbook"], 2);
						
						var sum = numlist.num1 + numlist.num2;
						if(sum < wnum){
							logNow(sum);
							htmlString += 
								'<tr bgcolor="CCFFCC">'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ ii +'</span></td>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["sbbook"] +'</span></td>'+
									'<td height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num1) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num1) +'</span></td>'+       
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">';if(numlist.num3) htmlString += '<font color="red">'+ numberWithCommas(numlist.num3) +'</font>'; htmlString += '</span></td>'+
								'</tr>';
							ii += 1;
						}
					}
				}
			});
			
			//마스터
			$.ajax({
				type: "POST",
				dataType: "json",
				url: SETTING_URL + "/accountingslip/select_allbooks_stock1_5",
				async: false,
				success: function (result) {
					logNow("c");
					var object_num = Object.keys(result); 
					for(var k in object_num){
						var data = result[object_num[k]]; 
						
						var numlist = CalStock(data["sbbook"], 3);
						
						var sum = numlist.num1 + numlist.num2;
						if(sum < wnum){
							logNow(sum);
							htmlString += 
								'<tr>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ ii +'</span></td>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["sbbook"] +'</span></td>'+
									'<td height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num1) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num2) +'</span></td>'+       
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">';if(numlist.num3) htmlString += '<font color="red">'+ numberWithCommas(numlist.num3) +'</font>'; htmlString += '</span></td>'+
								'</tr>';
							ii += 1;
						}
					}
				}
			});
			
			//마스터 보류
			$.ajax({
				type: "POST",
				dataType: "json",
				url: SETTING_URL + "/accountingslip/select_allbooks_stock1_6",
				async: false,
				success: function (result) {
					logNow("c");
					var object_num = Object.keys(result); 
					for(var k in object_num){
						var data = result[object_num[k]]; 
						
						var numlist = CalStock(data["sbbook"], 3);
						
						var sum = numlist.num1 + numlist.num2;
						if(sum < wnum){
							logNow(sum);
							htmlString += 
								'<tr bgcolor="CCFFCC">'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ ii +'</span></td>'+
									'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["sbbook"] +'</span></td>'+
									'<td height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num1) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(numlist.num2) +'</span></td>'+       
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum) +'</span></td>'+
									'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">';if(numlist.num3) htmlString += '<font color="red">'+ numberWithCommas(numlist.num3) +'</font>'; htmlString += '</span></td>'+
								'</tr>';
							ii += 1;
						}
					}
				}
			});
			$("#dataAllBookStock").html(htmlString);
			document.getElementById("Lay1").style.display = 'none';
		},0);
	}
}

function CalStock(sbbook, code){
	var num1; var num2; var num3; var dbname;
	
	if(code == 1) dbname = "jejak.";
	else if(code == 2) dbname = "dtjejak.";
	else if(code == 3) dbname = "mpjejak.";
	
	var from = {dbname: dbname, sbbook: sbbook}
	$.ajax({ // 출판재고
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_allbooks_stock2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if(result.length != 0) num1 = result[0]["sqcrnm"];
			else num1 = 0;
		}
	});
	var from = {sbbook: sbbook}
	$.ajax({ // 아트재고
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_allbooks_stock3",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if(result.length != 0) num2 = result[0]["sqcrnm0"];
			else num2 = 0;
		}
	});
	num3 = 0;
	var from = {dbname: dbname, sbbook: sbbook}
	$.ajax({ // 미입고
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_allbooks_stock4",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if(JSON.stringify(result) != '[null]') num3 = result[0]["sum_xnum"];
		}
	});
	
	return {
        num1: num1,
        num2: num2,
        num3: num3
    };
}