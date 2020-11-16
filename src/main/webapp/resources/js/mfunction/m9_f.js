/////////////////////////////////////////
//=============== 회계전표 ===============//
/////////////////////////////////////////


//회계전표
function SelAccountingSlip(){ 
	var ymd = new Date($("select[name=ty]").val(), $("select[name=tm]").val(), 0);
	var month = (ymd.getMonth() + 1) >= 10 ? (ymd.getMonth() + 1) : '0' + (ymd.getMonth() + 1);
	var day = (ymd.getDate()) >= 10 ? (ymd.getDate()) : '0' + (ymd.getDate());
	ymd = ymd.getFullYear().toString() + month.toString() + day.toString();
	
	var from = {ymd: ymd}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/accountingslip/select_accounting_slip1",
		data : JSON.stringify(from),
		success: function (result) {
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
									logNow(result3[0]);
									
									var object_num3 = Object.keys(result3); 
									
									for(var ii = 1; ii <= 15; ii++){
										var fdname = "b" + ii;
										if(ii == 1) b1 += result3[0][fdname];
										if(ii == 2) b2 += result3[0][fdname];
										if(ii == 3) b3 += result3[0][fdname];
										if(ii == 4) b4 += result3[0][fdname];
										if(ii == 5) b5 += result3[0][fdname];
										if(ii == 6) b6 += result3[0][fdname];
										if(ii == 7) b7 += result3[0][fdname];
										if(ii == 8) b8 += result3[0][fdname];
										if(ii == 9) b9 += result3[0][fdname];
										if(ii == 10) b10 += result3[0][fdname];
										if(ii == 11) b11 += result3[0][fdname];
										if(ii == 12) b12 += result3[0][fdname];
										if(ii == 13) b13 += result3[0][fdname];
										if(ii == 14) b14 += result3[0][fdname];
										if(ii == 15) b15 += result3[0][fdname];
										sum_d += result3[0][fdname];
									}
									
									if(j == object_num2.length-1){
										jab = sum_c - sum_d;
										if(jab > 0) jab_str = "잡이익";
										if(jab < 0) {jab_str = "잡손실"; jab *= -1;}
									}
									
									htmlString += 
										'<tr>'+
											'<td style="border-bottom: 1px solid #C0C0C0" width="40" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ mdate +'</span></td>'+
											'<td style="border-bottom: 1px solid #C0C0C0" width="260" height="25" align="left" valign="top"><span style="font-size:9pt; padding-left:3pt;">'+ pdesc +'<br> @ '+ numberWithCommas(pdan.toFixed(2)) +' X '+ numberWithCommas(pnum) +'부</span></td>'+
											'<td style="border-bottom: 1px solid #C0C0C0" width="90" height="25" align="right" valign="middle"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(psum) +'</span></td>'+
										'</tr>';
								}
							});
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
			$("#testestestest").html(htmlString);
		}
	});
}

//원천징수
function SelhWithholdingTax(bdate){
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
			htmlString = "";
			var sum_1 = 0; var sum_2 = 0; var sum_3 = 0;
			
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
			
			$("#asWithholdingTaxData").html(htmlString);
			(document.getElementById("sum1")).innerHTML = numberWithCommas(sum_1);
			(document.getElementById("sum2")).innerHTML = numberWithCommas(sum_2);
			(document.getElementById("sum3")).innerHTML = numberWithCommas(sum_3);
			(document.getElementById("sum4")).innerHTML = numberWithCommas(sum_2+sum_3);
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
			        '<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">세광음악출판사 ('+ bdate.substring(0,4) + '.' + bdate.substring(4,6) +')</span></p></td>'+
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
						        '<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">세광음악출판사 ('+ bdate.substring(0,4) + '.' + bdate.substring(4,6) +')</span></p></td>'+
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
			htmlString = "";
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
			$("#asByBookData").html(htmlString);
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
				htmlString = "";
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
				$("#asByBookData2").html(htmlString);
			}
		}
	});
}

function View_ProductionByBookDetail(objname){ //도서별 제작현황 디테일
	if (objname.style.display == 'none')
		objname.style.display = 'block';
    else
    	objname.style.display = 'none';
}

//전기 이월 작업


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
	
	var resultData;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/accountingslip/select_books_notin2",
		async: false,
		success: function (result) {
			resultData = result;
			var object_num = Object.keys(result);
			htmlString = "";
			
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
	   				'<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">세광음악출판사</span></p></td>'+
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
				logNow(i);
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
					    '<td width="350" height="25" align="left"><p style="padding-right:0px;"><span style="font-size:9pt;">< <a id="popupdate2"></a> 기준 ></span></p></td>'+
					    '<td width="350" height="25" align="right"><p style="padding-right:0px;"><span style="font-size:9pt;">세광음악출판사</span></p></td>'+
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
		(popUp.document.getElementById("popupdate2")).innerHTML = popupdate;
    }
}

//전도서재고조회
function SelAllBookStock(){ //DB두개연결 해야함
	var wnum = $("input[name=wnum]").val();
	htmlString = "";
	if(wnum){
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
			
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/accountingslip/select_allbooks_stock1",
			async: false,
			success: function (result) {
				logNow("c");
				var object_num = Object.keys(result); 
				var ii = 1;
				var num1 = 0; var num2 = 0;  var sum = 0;
				for(var k in object_num){
					var data = result[object_num[k]]; 
					if(data["sbbook"] == "981140" || data["sbbook"] == "981160" || data["sbbook"] == "981180") continue;
					
					
					var from = {sbbook: data["sbbook"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/accountingslip/select_allbooks_stock2",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							//logNow("b");
							if(result.length != 0) num1 = result[0]["sqcrnm"];
							
						}
					});
					
					//아트 데이터베이스에서 가져올 차례 ㅜㅜ 디비두개 연결하는거 springframework db 두개 연결 application.properties
					//
					
					//var from = {sbbook: data["sbbook"]}
					var num3 = 0;
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/accountingslip/select_allbooks_stock3",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							if(JSON.stringify(result) != '[null]') num3 = result[0]["sum_xnum"];
						}
					});
					
					sum = num1 + num2;
					if(sum < wnum){
						htmlString += 
							'<tr>'+
								'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ ii +'</span></td>'+
								'<td height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:0pt;">'+ data["sbbook"] +'</span></td>'+
								'<td height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
								'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(num1) +'</span></td>'+
								'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(num2) +'</span></td>'+       
								'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum) +'</span></td>'+
								'<td height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:3pt;">';if(num3) htmlString += '<font color="red">'+ numberWithCommas(num3) +'</font>'; htmlString += '</span></td>'+
							'</tr>';
						ii += 1;
					}
				}
			}
		});
		$("#dataAllBookStock").html(htmlString);
	}
}