////////////////////////////////////////////
//=============== 제품제작진행 ===============//
////////////////////////////////////////////


//발주예정제품리스트
function SelJpBaljuYj(signdate, lm_s, lm_t){
	var from = {signdate: signdate, lm_s: lm_s, lm_t: lm_t}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_bjlist_list",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
					
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				htmlString += 
					'<tr>'+
						'<td width="1410">'+
							'<table border="0" cellspacing="1" width="1400" bgcolor="#CCCCCC" bordercolorlight="#CCCCCC" bordercolordark="white" cellpadding="0">'+
								'<tr>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">순번</span></font></td>'+
									'<td width="50" bgcolor="white" height="40" align="center" valign="middle"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">도서명</span></font></td>'+
									'<td width="300" bgcolor="white" height="40" align="left" valign="middle" colspan="3"><p style="margin-left:10px;"><span style="font-size:9pt;">';
										if(data["bcheck"]) htmlString += '<font color=blue>'+ data["bname"] +'</font>'; else htmlString += '<font color=red>'+ data["bname"] +'</font>'; htmlString += '</span></p></td>'+
									'<td width="50" height="40" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt;"><font color="#666666">코드</font></span></td>'+
									'<td width="50" height="40" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] +'</span></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">정가</span></font></td>'+
									'<td width="100" bgcolor="white" height="40" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'+ data["bprice"] +'</span></td>'+
									'<td width="700" bgcolor="#F6F6F6" height="40" align="left" valign="middle" colspan="14"><p><font color="#666666"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
										if(data["bcheck"]) htmlString += '<input type="button" value="발주" onClick="javascript:ConfirmReadyBalju('+ data["uid"] +', 2, '+ "'" + data["bname"] + "', " + data["bcheck"] + ", '" + signdate + "'" +');">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
										else htmlString += '<input type="button" value="발주" onClick="javascript:ConfirmReadyBalju('+ data["uid"] +', 1, '+ "'" + data["bname"] + "', " + data["bcheck"] + ", '" + signdate + "'" +');">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; htmlString +=
										'<input type="button" value="삭제" onClick="javascript:DelJpBaljuYj('+ data["uid"] +');">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월 별 실 판 매 수 량</span></font></p>'+
									'</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">면수</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" colspan="2" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주점 수량</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">현 재고 수량</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">판매<br>여유일</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주 수량</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle" colspan="2"><font color="#666666"><span style="font-size:9pt;">최초발행</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">연간<br>증감율</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">월평균<br>판매</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">색도</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>실판매</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>총반입</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">01</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">02</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">03</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">04</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">05</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">06</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">07</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">08</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">09</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">10</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">11</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">12</span></font></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bmyun"] +'</span></td>'+
									'<td width="100" bgcolor="white" colspan="2" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum1"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum2"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pdate"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bnum"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'+ data["pfirst"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yinc"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ppan"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bcolor"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ypan"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yban"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p1"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p2"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p3"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p4"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p5"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p7"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p7"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p8"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p9"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p10"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p11"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p12"] +'</span></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
					'</tr>';
			}
			$("#jpBalYjData").html(htmlString);
		}
	});
	
	document.getElementById("PopUpPrintBjlist").onclick = function() { //인쇄 버튼 클릭 시
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "PopUpPrintBjlist", 'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		
		popUp.document.write(jmenu4("0_인쇄팝업"));
		
		var date2 = parseInt(signdate.substring(6,8))+1
		date2 = date2 >= 10 ? date2 : '0' + date2;
		date2 = signdate.substring(0,6) + date2;
		
		htmlString = "";
		htmlString += 
			'<table border="0" cellpadding="0" cellspacing="0" width="780">'+
				'<tr>'+
			        '<td width="780" height="60">&nbsp;</td>'+
			    '</tr>'+
				'<tr>'+
			        '<td width="780" height="40" align="center" valign="top"><p><span style="font-size:18pt;"><b>'+ signdate.substring(0,4) +'년 '+ signdate.substring(4,6) +'월 '+ signdate.substring(6,8) +'일&nbsp; 발 주 예 정 상 품&nbsp; 리 스 트</b></span></p></td>'+
			    '</tr>';
		
		var from = {date1: signdate, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_bjlist_list1",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					if ((i > 0) && ((i % 5) == 0)){
						htmlString +=
							'</table>'+
							'<p style="page-break-before:always">'+
							'<table border="0" cellpadding="0" cellspacing="0" width="780">'+
								'<tr>'+
							        '<td width="780" height="40">&nbsp;</td>'+
							    '</tr>'+
								'<tr>'+
							        '<td width="780" height="40" align="center" valign="top"><p><span style="font-size:18pt;"><b>'+ signdate.substring(0,4) +'년 '+ signdate.substring(4,6) +'월 '+ signdate.substring(6,8) +'일&nbsp; 발 주 예 정 상 품&nbsp; 리 스 트</b></span></p></td>'+
							    '</tr>'; 
					}
					
					htmlString +=
						'<tr>'+
					        '<td width="780">'+
					            '<table border="0" cellspacing="1" width="100%" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC" style="border-top-width:1px; border-top-color:rgb(204,204,204); border-top-style:solid;">'+
					                '<tr>'+
					                    '<td align="center" valign="middle" bgcolor="#F4F4F4" height="25" width="60"><span style="font-size:9pt;">순번</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					                    '<td style="padding-left:10px;" width="257" height="25" align="left" valign="middle" bgcolor="white" colspan="3"><span style="font-size:9pt;">'+ data["bname"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">코드</span></td>'+
					                    '<td width="60" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] +'</span></td>'+
					                    '<td width="90" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정가</span></td>'+
					                    '<td style="padding-left:10px;" width="154" height="25" align="left" valign="middle" bgcolor="white" colspan="2"><span style="font-size:9pt;">'+ data["bprice"] +'</span></td>'+
					                '</tr>'+
					                '<tr>'+
					                    '<td height="25" align="center" valign="middle" bgcolor="#F4F4F4" width="60"><span style="font-size:9pt;">면수</span></td>'+
					                    '<td width="100" height="25" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">발주점수량</span></td>'+
					                    '<td width="85" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">현재고수량</span></td>'+
					                    '<td width="85" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">월평균판매</span></td>'+
					                    '<td width="85" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">발주수량</span></td>'+
					                    '<td width="110" height="25" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">최초발행</span></td>'+
					                    '<td width="90" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">연간증감율</span></td>'+
					                    '<td width="80" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판매여유일</span></td>'+
					                    '<td width="73" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">색도</span></td>'+
					                '</tr>'+
					                '<tr>'+
					                    '<td height="25" align="center" valign="middle" bgcolor="white" width="60"><span style="font-size:9pt;">'+ data["bmyun"] +'</span></td>'+
					                    '<td width="100" height="25" align="center" valign="middle" bgcolor="white" colspan="2"><span style="font-size:9pt;">'+ data["pnum1"] +'</span></td>'+
					                    '<td width="85" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["pnum2"] +'</span></td>'+
					                    '<td width="85" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["ppan"] +'</span></td>'+
					                    '<td width="85" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bnum"] +'</span></td>'+
					                    '<td width="110" height="25" align="center" valign="middle" bgcolor="white" colspan="2"><span style="font-size:9pt;">'+ data["pfirst"] +'</span></td>'+
					                    '<td width="90" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["yinc"] +'</span></td>'+
					                    '<td width="80" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["pdate"] +'</span></td>'+
					                    '<td width="73" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcolor"] +'</span></td>'+
					                '</tr>'+
					            '</table>'+
							'</td>'+
					    '</tr>'+
					    '<tr>'+
					        '<td width="780">'+
					            '<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC" style="border-bottom-width:1px; border-bottom-color:rgb(204,204,204); border-bottom-style:solid;">'+
					                '<tr>'+
					                    '<td height="25" align="center" valign="middle" bgcolor="#F4F4F4" width="780" colspan="14"><span style="font-size:9pt;">월 별 실 판 매 수 량</span></td>'+
					                '</tr>'+
					                '<tr>'+
					                    '<td width="90" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">년간실판매</span></td>'+
					                    '<td width="90" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">년간총매입</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">1</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">2</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">3</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">4</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">5</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">6</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">7</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">8</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">9</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">10</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">11</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">12</span></td>'+
					                '</tr>'+
					                '<tr>'+
					                    '<td width="90" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["ypan"] +'</span></td>'+
					                    '<td width="90" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["yban"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p1"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p2"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p3"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p4"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p5"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p6"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p7"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p8"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p9"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p10"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p11"] +'</span></td>'+
					                    '<td width="50" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["p12"] +'</span></td>'+
					                '</tr>'+
					            '</table>'+
					        '</td>'+
					    '</tr>'+
					    '<tr>'+
					        '<td width="780" height="20"><p><span style="font-size:9pt;">&nbsp;</span></p></td>'+
					    '</tr>';
					
				}
				htmlString += '</table>';
				(popUp.document.getElementById("popdata")).innerHTML = htmlString;
			}
		});
	}
}

function DelJpBaljuYj(uid){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid: uid};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/jpjejak/delete_bjlist_item",
			data : JSON.stringify(from),
			success : function(result) {
				alert("데이터 삭제 완료");
			},
			error : function(){
			}
		});
	}
}

var Total_Y = new Array(); var Total_B = new Array(); var arr_index = 0; var barr_index = 0; var t_panh;
function ConfirmReadyBalju(uid, mode, bname, bcheck, jdate){
	var t_str; 
	if (bcheck == 1) t_str = bname + " 에 대한 제작을 진행합니다.";
	else t_str = bname + " 에 대한 제작을 진행합니다.";
	if(confirm(t_str) == false) return;
	else ReadyBalju(uid, mode, jdate);
}

function ReadyBalju(uid, mode, jdate){
	$('#jejak_detail_view').html(jmenu4("0_발주버튼"));
	
	var t_bcode; var t_num; var t_type;
	var from = {uid: uid}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_bjyj_jejak1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			t_bcode = result[0]["bcode"];
			t_num = result[0]["bnum"];
			t_type = result[0]["btype"];
		}
	});
	
	if (t_type == 2) $('select[name=jetype]').val("2");
	else if (t_type == 1) $('select[name=jetype]').val("1");
	else if (t_type == 3) $('select[name=jetype]').val("3");
		
	var tbook = t_bcode.substring(0,5);
	var from = {sbbook: tbook + '%'}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_bjyj_jejak2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if (result[0]["sbbook"] != t_bcode){
				alert("구코드!!! 확인바람.");
				//exit;
			}
		}
	});
	
	var t_amount = t_num;
	
	$('input[name=bnum]').val(t_num);
	
	var data0;
	var t_janh; var ppp; var t_panh2; var t_jan2; var page_num; var julsu;
	var bu_panh1; var bu_panh2; var bu_panh3; var bu_panh4; 
	var bu_janh1; var bu_janh2; var bu_janh3; var bu_janh4; 
	var from = {sbbook: t_bcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_bjyj_jejak3",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			data0 = result[0];
			t_janh = data0["sbjanh"];
			if (data0["sbsbph1"]){
				bu_panh1 = data0["sbsbph1"];
				bu_janh1 = data0["sbsbjh1"];
				if (data0["sbsbph2"]){
					bu_panh2 = data0["sbsbph2"];
					bu_janh2 = data0["sbsbjh2"];
					
					if (data0["sbsbph3"]){
						bu_panh3 = data0["sbsbph3"];
						bu_janh3 = data0["sbsbjh3"];
						
						if (data0["sbsbph4"]){
							bu_panh4 = data0["sbsbph4"];
							bu_janh4 = data0["sbsbjh4"];
						}
					}
				}
			}
			julsu = data0["sbjlsu"];
			ppp = CheckPANH(data0["sbpanh"]);
			t_panh = data0["sbpanh"].substring(0,1);
			if (data0["sbpanh2"])
			    t_panh2 = data0["sbpanh2"].substring(0,1);
			else
			    t_panh2 = "";
			t_jan2 = CheckJANH(data0["sbjanh"]);

			page_num = data0["sbpage"];
			
			htmlString = "";
			htmlString += 
				'<input type="hidden" name="mode" value="'+ mode +'">'+
				'<input type="hidden" name="uid" value="'+ uid +'">'+
				'<input type="hidden" name="jdate" value="'+ jdate +'">'+
				'<tr>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data0["sbname"] +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data0["sbbook"] +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data0["sbuprc"]) +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ page_num +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data0["sbpanh"] +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jan2 +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white" colspan="2"><span style="font-size:9pt;">'+ data0["sbbigo"] +'</span></td>'+
				'</tr>'+
	        	'<input type="hidden" name="bcode" value="'+ data0["sbbook"] +'">'+
	        	'<input type="hidden" name="bname" value="'+ data0["sbname"] +'">'+
	        	'<input type="hidden" name="panh" value="'+ data0["sbpanh"] +'">'+
	        	'<input type="hidden" name="myun" value="'+ data0["sbpage"] +'">';
			$("#bookjejak").html(htmlString);
		}
	});
	
	var tmp_code = t_bcode.substring(0,5);
	var total_amount = 0;
	var total_yeobun = 0;	
	
	var t_yonj;
	var from = {wybook: tmp_code}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_bjyj_jejak4",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			t_yonj = result[0]["count_uid"];
		}
	});
	
	var jijlcode;
	var data2; var data3; 
	var from = {wybook: tmp_code}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_bjyj_jejak5",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var tgubn; 
			var t_jung1; var t_jung2; var t_yeo1; var t_yeo2;
			htmlString = "";
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				jijlcode = data["wyjijl"];
				
				var jijlname;
				var from = {wjcode: jijlcode}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_bjyj_jejak6",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						data2 = result2[0];
						jijlname = result2[0]["wjname"] + " (" + jijlcode + ")";
					}
				});
				
				if ((data["wygubn"] == '01') || (data["wygubn"] == '15')){ // 표지, 속표지 - 2015.07.06
					if (data["wygubn"] == '01') tgubn = "표지";
					else tgubn = "속표지";
					
					var from = {bu: t_num}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak7",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					if (t_janh == 4){ // 양장 -- 케이스와 같은 방식 (부수 / 페이지) -- 2009.02.11
						var f_result = CalcJM(jijlcode, t_num, 0, data3["ye"], data["wycolo"], data["wypage"], t_panh, 0);
						t_jung1 = f_result.tj1; 
						t_jung2 = f_result.tj2;
						t_yeo1 = f_result.ty1; 
						t_yeo2 = f_result.ty2;
					}else{
						if (t_bcode.substring(0,3) == '393'){// 전집류
							var f_result = CalcJM(jijlcode, t_num * 4, ppp, data3["ye"], data["wycolo"]+1, julsu, t_panh, 0);
							t_jung1 = f_result.tj1; 
							t_jung2 = f_result.tj2;
							t_yeo1 = f_result.ty1; 
							t_yeo2 = f_result.ty2;
						}else{
							if (data["wypage"] == 6) {// 3절, 6면짜리
								var f_result = CalcJM(jijlcode, t_num * 4, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 1);
								t_jung1 = f_result.tj1; 
								t_jung2 = f_result.tj2;
								t_yeo1 = f_result.ty1; 
								t_yeo2 = f_result.ty2;
							}else{
								if (data["wychek"] == 4){// 4P - 파랑새 창작동요 19집
									var f_result = CalcJM(jijlcode, t_num * 4, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 2);
									t_jung1 = f_result.tj1; 
									t_jung2 = f_result.tj2;
									t_yeo1 = f_result.ty1; 
									t_yeo2 = f_result.ty2;
								}else{
									if (t_janh == 7){// 스프링
										var f_result = CalcJM(jijlcode, t_num * 4, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 3);
										t_jung1 = f_result.tj1; 
										t_jung2 = f_result.tj2;
										t_yeo1 = f_result.ty1; 
										t_yeo2 = f_result.ty2;
									}else{
										var f_result = CalcJM(jijlcode, t_num * 4, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 0);
										t_jung1 = f_result.tj1; 
										t_jung2 = f_result.tj2;
										t_yeo1 = f_result.ty1; 
										t_yeo2 = f_result.ty2;
									}
								}
							}
						}
					}
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, tgubn, data["wycolo"], data["wyboo9"], 0);
					htmlString += 
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ tgubn +'</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">4</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
						
				}
				if((data["wygubn"] == '02') || (data["wygubn"] == '16') || (data["wygubn"] == '17') || (data["wygubn"] == '09')){ // 면지, 도비라
					var tmp_do = data["wycolo"];
					if (tmp_do != 2) tmp_do = 8;
					
					var from = {bu: t_amount, do_: tmp_do}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak8",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					var f_result = CalcJM2(jijlcode, t_num * data["wypage"], ppp, data3["ye"], data["wycolo"], julsu, data["wypage"], 1);
					t_jung1 = f_result.tj1; 
					t_jung2 = f_result.tj2;
					t_yeo1 = f_result.ty1; 
					t_yeo2 = f_result.ty2;
					
					if (data["wygubn"] == '02')
						CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "면지", data["wycolo"], data["wyboo9"], data["wypage"]);
					else{
						if (data["wygubn"] == '16') // 면지2 -- 2016.11.29
							CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "면지2", data["wycolo"], data["wyboo9"], data["wypage"]);
						else{
							if (data["wygubn"] == '17') // 면지1 -- 2016.11.29
								CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "면지1", data["wycolo"], data["wyboo9"], data["wypage"]);
							else
								CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "도비라", data["wycolo"], data["wyboo9"], data["wypage"]);
						}
					}
					htmlString += 
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data["wygubn"] == "02") htmlString += "면지"; else if(data["wygubn"] == "16") htmlString += "면지2"; else if(data["wygubn"] == "17") htmlString += "면지1"; else htmlString += "도비라"; htmlString += '</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wypage"] +'</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if (data["wygubn"] == '05'){ // 케이스
					var from = {bu: t_num}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak7",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					var f_result = CalcJM(jijlcode, t_num, 0, data3["ye"], data["wycolo"], data["wypage"], t_panh, 0);
					t_jung1 = f_result.tj1; 
					t_jung2 = f_result.tj2;
					t_yeo1 = f_result.ty1; 
					t_yeo2 = f_result.ty2;
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "케이스", data["wycolo"], data["wyboo9"], 0);
					
					htmlString +=
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">케이스</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if (data["wygubn"] == '06'){ // 화보
					var from = {bu: t_num}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak7",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					var f_result = CalcJM(jijlcode, t_num * data["wypage"], ppp, data3["ye"], data["wycolo"], julsu, t_panh, 0);
					t_jung1 = f_result.tj1; 
					t_jung2 = f_result.tj2;
					t_yeo1 = f_result.ty1; 
					t_yeo2 = f_result.ty2;
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "화보", data["wycolo"], data["wyboo9"], data["wypage"]);
					
					htmlString +=
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">화보</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wypage"] +'</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if (data["wygubn"] == '07'){ // 엽서
					var from = {bu: t_num}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak7",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					var f_result = CalcJM(jijlcode, t_num*4, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 0);
					t_jung1 = f_result.tj1; 
					t_jung2 = f_result.tj2;
					t_yeo1 = f_result.ty1; 
					t_yeo2 = f_result.ty2;
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "엽서", data["wycolo"], data["wyboo9"], 0);
					
					htmlString +=
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">엽서</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if (data["wygubn"] == '08'){ // 별지
					var tmp_do = data["wycolo"];
					if (tmp_do != 2) tmp_do = 8;
					
					var from = {bu: t_amount}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak9",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					if (tmp_code == '43171'){// 최광순 플루트 교본(1) - 정미는 부수/4
						var f_result = CalcJM2(jijlcode, t_num/4, 1, data3["ye"], data["wycolo"], julsu, data0["sbbyul"], t_panh);
						t_jung1 = f_result.tj1; 
						t_jung2 = f_result.tj2;
						t_yeo1 = f_result.ty1; 
						t_yeo2 = f_result.ty2;
					}else{// 별지는 표지여분
						var f_result = CalcJM(jijlcode, t_num * data["wypage"], ppp, data3["ye"], data["wycolo"], julsu, t_panh, 0);
						t_jung1 = f_result.tj1; 
						t_jung2 = f_result.tj2;
						t_yeo1 = f_result.ty1; 
						t_yeo2 = f_result.ty2;
					} 
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "별지", data["wycolo"], data["wyboo9"], data["wypage"]);
					
					htmlString +=
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">별지</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wypage"] +'</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if (data["wygubn"] == '10'){ // 날개
					var from = {bu: t_num}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak7",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					var f_result = CalcJM(jijlcode, t_num, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 0);
					t_jung1 = f_result.tj1; 
					t_jung2 = f_result.tj2;
					t_yeo1 = f_result.ty1; 
					t_yeo2 = f_result.ty2;
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "날개", data["wycolo"], data["wyboo9"], 0);
					
					htmlString +=
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">날개</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if (data["wygubn"] == '11'){ // 비닐
					var from = {bu: t_num}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak7",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					var f_result = CalcJM(jijlcode, t_num, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 0);
					t_jung1 = f_result.tj1; 
					t_jung2 = f_result.tj2;
					t_yeo1 = f_result.ty1; 
					t_yeo2 = f_result.ty2;
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "비닐", data["wycolo"], data["wyboo9"], 0);
					
					htmlString +=
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">비닐</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if (data["wygubn"] == '12'){ // 띠지
					var from = {bu: t_num}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak7",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							data3 = result3[0];
						}
					});
					
					var f_result = CalcJM(jijlcode, t_num, ppp, data3["ye"], data["wycolo"], julsu, t_panh, 0);
					t_jung1 = f_result.tj1; 
					t_jung2 = f_result.tj2;
					t_yeo1 = f_result.ty1; 
					t_yeo2 = f_result.ty2;
					CalcT(jijlcode, data2["wjname"], t_jung1, t_jung2, t_yeo1, t_yeo2, "띠지", data["wycolo"], data["wyboo9"], 0);
					
					htmlString +=
						'<tr>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">띠지</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">-</span></td>'+
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wycolo"] +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_jung1 + ' R ' + t_jung2 +'</span></td>'+
							'<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_yeo1 + ' R ' + t_yeo2 +'</span></td>'+
							'<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
						'</tr>';
				}
				if ((data["wygubn"] == '03') || (data["wygubn"] == '04') || (data["wygubn"] == '13') || (data["wygubn"] == '14')){ // 본문
					var total_record;
					var from = {wdbook: tmp_code, wdboo9: data["wyboo9"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_bjyj_jejak10",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							total_record = result3[0]["count_uid"]
						}
					});
					if (!total_record)
						htmlString += 
							'<tr>'+
								'<td width="765" height="30" align="center" valign="middle" bgcolor="white" colspan="7"><span style="font-size:9pt;"><b>대수정보가 없습니다. 정보를 입력해 주세요.</b></span></td>'+
							'</tr>';
					else{
						var t_gu1 = "";
					    if ((data["wyboo9"] > 0) && (data["wyboo9"] < 5))
							t_gu1 = "부록" + data["wyboo9"] + " ";
						else if (data["wyboo9"] ==  5){
						    var tmp_boo = parseInt(data["wyboo9"]) - 3;
						}
						switch (data["wygubn"]){
							case '03':
								t_gu = "본문1"; break;
							case '04':
								t_gu = "본문2"; break;
							case '13':
								t_gu = "본문3"; break;
							case '14':
								t_gu = "본문4"; break;
						}
						var from = {wdbook: tmp_code, wdboo9: data["wyboo9"]}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_bjyj_jejak11",
							async: false,
							data : JSON.stringify(from),
							success: function (result4) {
								var tmp_ye;
								var object_num4 = Object.keys(result4);
								for(var k in object_num4){
									var data4 = result4[object_num4[k]]; 
									var tmp_do = data4["wdcolo"];
									if (tmp_do != 2) tmp_do = 8;
									
									var from = {bu: t_amount, do_: tmp_do}
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										url: SETTING_URL + "/jpjejak/select_bjyj_jejak8",
										async: false,
										data : JSON.stringify(from),
										success: function (result5) {
											switch (data4["wdcolo"]){
												case 4:
													tmp_ye = result5[0]["ye"] * 0.8 * 0.85; break;
												case 6:
													tmp_ye = result5[0]["ye"] * 0.8; break;
												default:
													tmp_ye = result5[0]["ye"]; break;
											}
										}
									});
									
									tmp_ye = Math.ceil(tmp_ye);

									if ((data["wyboo9"] == 5) && (t_panh2 == 'B')) // 나도피
									    tmp_ye = Math.ceil(tmp_ye * 0.9);
									else if ((parseInt(data["wyboo9"]) > 0) && (eval("bu_panh" + data["wyboo9"]).substring(0,1) == 'B'))
										tmp_ye = Math.ceil(tmp_ye * 0.9);
									else if (jijlcode.substring(5,6) == '0')
										tmp_ye = Math.ceil(tmp_ye * 0.9);

									if ((tmp_code == '47102') || (tmp_code == '47101') || (tmp_code == '47103')) // 즐거운 기악합주 1,2 -- 한대 24p 기준으로
										tmp_num = (data4["wdpage"] * t_num) / 24;
									else{
										if ((data["wyboo9"] > 0) && (data["wyboo9"] < 5)){  // 부록
											tmp_ppp = CheckPANH(eval("bu_panh" + data["wyboo9"]));
											tmp_num = (data4["wdpage"] * t_num) / tmp_ppp;
										}else if (data["wyboo9"] == 5){ // 본서2 본문 (나도피)
										    tmp_ppp = CheckPANH(t_panh2);
											tmp_num = (data4["wdpage"] * t_num) / tmp_ppp;
										}else // 일반
											tmp_num = (data4["wdpage"] * t_num) / ppp;
									}

									num1 = Math.floor(tmp_num / 500);
									num2 = tmp_num % 500;
									total_amount = total_amount + tmp_num;
									total_yeobun = total_yeobun + tmp_ye;
									tnum1 = Math.floor(tmp_ye / 500);
									tnum2 = tmp_ye % 500;
									
									CalcT(jijlcode, data2["wjname"], num1, num2, tnum1, tnum2, t_gu, data4["wdcolo"], data["wyboo9"], 0);
									if (t_panh == 'B')
										CalcB(t_gu, data["wyboo9"], data4["wddesu"], data4["wdpage"], data4["wdcolo"], num1, num2, tnum1, tnum2, jijlcode, data2["wjname"], ppp/2);
									else
										CalcB(t_gu, data["wyboo9"], data4["wddesu"], data4["wdpage"], data4["wdcolo"], num1, num2, tnum1, tnum2, jijlcode, data2["wjname"], ppp);
									
									htmlString +=
										'<tr>'+
								            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_gu1 + t_gu +'</span></td>'+
								            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data4["wddesu"] +'</span></td>'+
								            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data4["wdpage"] +'</span></td>'+
								            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data4["wdcolo"] +'</span></td>'+
								            '<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(num1) htmlString += num1 + ' R '; if(num2) htmlString += num2; htmlString += '</span></td>'+
								            '<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(tnum1) htmlString += tnum1 + ' R '; if(tnum2) htmlString += tnum2; htmlString += '</span></td>'+
								            '<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
								        '</tr>';
								            
								    if (data4["wdqnty"] > 1){
										ttt = 1;
										while (ttt < data4["wdqnty"]){
											aa1 = data4["wddesu"] + ttt;
											total_amount = total_amount + tmp_num;
											total_yeobun = total_yeobun + tmp_ye;
											CalcT(jijlcode, data2["wjname"], num1, num2, tnum1, tnum2, t_gu, data4["wdcolo"], data["wyboo9"], 0);
											if (t_panh == 'B')
												CalcB(t_gu, data["wyboo9"], aa1, data4["wdpage"], data4["wdcolo"], num1, num2, tnum1, tnum2, jijlcode, data2["wjname"], ppp/2);
											else
												CalcB(t_gu, data["wyboo9"], aa1, data4["wdpage"], data4["wdcolo"], num1, num2, tnum1, tnum2, jijlcode, data2["wjname"], ppp);
									
											htmlString +=
												'<tr>'+
													'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ t_gu1 + t_gu +'</span></td>'+
													'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ aa1 +'</span></td>'+
												     '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data4["wdpage"] +'</span></td>'+
												    '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data4["wdcolo"] +'</span></td>'+
												    '<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(num1) htmlString += num1 + ' R '; if(num2) htmlString += num2; htmlString += '</span></td>'+
												    '<td width="135" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(tnum1) htmlString += tnum1 + ' R '; if(tnum2) htmlString += tnum2; htmlString += '</span></td>'+
												    '<td width="175" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jijlname +'</span></td>'+
												'</tr>';
											
											ttt++;
										}
									}
								}
							}
						});
					}
				}
			}
			logNow("Total_Y");
			logNow(Total_Y);
			
			for(var i = 0 ; i < arr_index ; i++){
				num3 = Math.floor(Total_Y[i][2] / 500);
				num4 = Total_Y[i][2] % 500;
				tnum3 = Math.floor(Total_Y[i][3] / 500);
				tnum4 = Total_Y[i][3] % 500;
				num5 = Math.floor((Total_Y[i][2] + Total_Y[i][3]) / 500);
				num6 = (Total_Y[i][2] + Total_Y[i][3]) % 500;
				
				htmlString +=
					'<tr>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><font color="red"><b>';
					if ((Total_Y[i][6] > 0) && (Total_Y[i][6] < 5)){
					    htmlString += "부록";
					    htmlString += Total_Y[i][6];
					}
					htmlString += Total_Y[i][4];
					htmlString += 
							'</b></font></span></td>'+
		    			    '<td width="240" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="3"><span style="font-size:9pt;"><font color="red"><b>'+ num5 + ' R ' + num6 +'</b></font></span></td>'+
		    			    '<td width="135" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><font color="red"><b>'+ num3 + ' R ' + num4 +'</b></font></span></td>'+
		    			    '<td width="135" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><font color="red"><b>'+ tnum3 + ' R ' + tnum4 +'</b></font></span></td>'+
		    			    '<td width="175" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><font color="red"><b>'+ Total_Y[i][1] +'</b></font></span></td>'+
		    			'</tr>'+
		    			'<input type="hidden" name="t3_jcode[]" value="'+ Total_Y[i][0] +'">'+
		    			'<input type="hidden" name="t3_jname[]" value="'+ Total_Y[i][1] +'">'+
		    			'<input type="hidden" name="t3_jm[]" value="'+ Total_Y[i][2] +'">'+
		    			'<input type="hidden" name="t3_yb[]" value="'+ Total_Y[i][3] +'">'+
		    			'<input type="hidden" name="t3_gubn[]" value="'+ Total_Y[i][4] +'">'+
		    			'<input type="hidden" name="t3_colo[]" value="'+ Total_Y[i][5] +'">'+
		    			'<input type="hidden" name="t3_bu[]" value="'+ Total_Y[i][6] +'">'+
		    			'<input type="hidden" name="t3_pg[]" value="'+ Total_Y[i][7] +'">';
			}
			for(var i = 0 ; i < barr_index ; i++){
				htmlString +=
					'<input type="hidden" name="b3_gubn[]" value="'+ Total_B[i][0] +'">'+
					'<input type="hidden" name="b3_bu[]" value="'+ Total_B[i][1] +'">'+
					'<input type="hidden" name="b3_dae[]" value="'+ Total_B[i][2] +'">'+
					'<input type="hidden" name="b3_pg[]" value="'+ Total_B[i][3] +'">'+
					'<input type="hidden" name="b3_do[]" value="'+ Total_B[i][4] +'">'+
					'<input type="hidden" name="b3_jm[]" value="'+ Total_B[i][5] +'">'+
	    			'<input type="hidden" name="b3_yb[]" value="'+ Total_B[i][6] +'">'+
	    			'<input type="hidden" name="b3_jc[]" value="'+ Total_B[i][7] +'">'+
	    			'<input type="hidden" name="b3_jn[]" value="'+ Total_B[i][8] +'">'+
	    			'<input type="hidden" name="b3_bigo[]" value="'+ Total_B[i][9] +'">';
			}
			$("#bookdeasu").html(htmlString);
		}
	});
	
	//거래처
	var wcjob = new Array("인쇄", "코팅", "제본", "용지", "스티커", "CD", "케이스", "비닐", "기타", "증지");
	for(var i = 0; i < wcjob.length; i++){
		var from = {wcjob: wcjob[i]}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_bjyj_jejak12",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				var object_num = Object.keys(result);
				for(var j in object_num){
					var data = result[object_num[j]]; 
					
					if(wcjob[i] == "인쇄"){
						appendString = "<option value='" + data["wccode"] + "'"; if(data["wccode"] == "1001") appendString += " selected"; appendString += ">" + data["wcname"] + "</option>";
						$("select[name=m1]").append(appendString);
					}else if(wcjob[i] == "코팅"){
						appendString = "<option value='" + data["wccode"] + "'"; if(data["wccode"] == "2003") appendString += " selected"; appendString += ">" + data["wcname"] + "</option>";
						$("select[name=m2]").append(appendString);
					}else if(wcjob[i] == "제본"){
						appendString = "<option value='" + data["wccode"] + "'"; 
							if((data["wccode"] == "3016") && (t_janh == '3')) appendString += " selected";
							else if((data["wccode"] == "3015") && (t_janh == '5')) appendString += " selected";
							else if((data["wccode"] == "3006") && (t_janh == '7')) appendString += " selected";
							else if((data["wccode"] == "3002") && (t_janh == '4')) appendString += " selected";
						appendString += ">" + data["wcname"] + "</option>";
						$("select[name=m3]").append(appendString);
						$("select[name=m31]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
						$("select[name=m32]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
						$("select[name=m33]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
						$("select[name=m34]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "용지"){
						$("select[name=m4]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "스티커"){
						$("select[name=m5]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "목형"){
						$("select[name=m11]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "CD"){
						$("select[name=m6]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "케이스"){
						$("select[name=m7]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "비닐"){
						$("select[name=m8]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "기타"){
						$("select[name=m9]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}else if(wcjob[i] == "증지"){
						$("select[name=m10]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
					}
				}
			}
		});
	}
	
	var from = {sbbook: t_bcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_bjyj_jejak13",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if(result[0]["sbinji"] == 0) $('select[name=SBINJI]').val("0");
			if(result[0]["sbinji"] == 1) $('select[name=SBINJI]').val("1");
		}
	});
	
	htmlString = "";
	htmlString +=
		'<tr>'+
			'<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBMYUN" value="'+ data0["sbmyun"] +'"></span></td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBBYUL" value="'+ data0["sbbyul"] +'"></span></td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBHWBO" value="'+ data0["sbhwbo"] +'"></span></td>'+
		    '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
		    	'<select name="SBCOTI" size="1">'+
		    		'<option value="0">=======</option>'+
		    		'<option value="1"'; if(data0["sbcoti"] == 1) htmlString += "selected"; else htmlString += '>'; htmlString += '>유광</option>'+
		    		'<option value="2"'; if(data0["sbcoti"] == 2) htmlString += "selected"; else htmlString += '>'; htmlString += '>무광</option>'+
					'<option value="7"'; if(data0["sbcoti"] == 7) htmlString += "selected"; else htmlString += '>'; htmlString += '>무광(에폭시)</option>'+
					'<option value="8"'; if(data0["sbcoti"] == 8) htmlString += "selected"; else htmlString += '>'; htmlString += '>유광(에폭시)</option>'+
		    		'<option value="3"'; if(data0["sbcoti"] == 3) htmlString += "selected"; else htmlString += '>'; htmlString += '>홀로그램</option>'+
					'<option value="4"'; if(data0["sbcoti"] == 4) htmlString += "selected"; else htmlString += '>'; htmlString += '>홀로그램(크리스탈)</option>'+
		    		'<option value="5"'; if(data0["sbcoti"] == 5) htmlString += "selected"; else htmlString += '>'; htmlString += '>엠보싱</option>'+
				'</select></span>'+
			'</td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBJLSU" value="'+ data0["sbjlsu"] +'"></span></td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBJNJI" value="'+ data0["sbjnji"] +'"></span></td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBSTIC" value="'+ data0["sbstic"] +'"></span></td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBCD" value="'+ data0["sbcd"] +'"></span></td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBWING2" value="'+ data0["sbwing2"] +'"></span></td>'+
		    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBCASE2" value="'+ data0["sbcase2"] +'"></span></td>'+
		    '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
				'<select name="SBCOTI2" size="1">'+
					'<option value="0">=======</option>'+
					'<option value="7"'; if(data0["sbcoti2"] == 7) htmlString += "selected"; else htmlString += '>'; htmlString += '>유광에폭시</option>'+
					'<option value="8"'; if(data0["sbcoti2"] == 7) htmlString += "selected"; else htmlString += '>'; htmlString += '>무광에폭시</option>'+
					'<option value="4"'; if(data0["sbcoti2"] == 4) htmlString += "selected"; else htmlString += '>'; htmlString += '>오바코팅</option>'+
				'</select></span>'+
			'</td>'+
		    '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SBMUSN" value="'+ data0["sbmusn"] +'"></span></td>'+
		    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; text-align:center; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:28px;" name="SBBINB" value="'+ data0["sbbinb"] +'"></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td width="40" height="60" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">비고</span></td>'+
		    '<td width="600" height="60" align="center" valign="middle" bgcolor="white" colspan="11"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:580px;" name="SBBIGO" value="'+ data0["sbbigo"] +'"></span></td>'+
		    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><input type="image" src="/resources/style/images/jejak/btn_modify.gif" onClick=""></span></td>'+
		'</tr>';
	
	$("#bookinfo").html(htmlString);
}

function CheckPANH(pancode){
	var ppp;
	switch(pancode){
		case "A3" :
			ppp = 8; break;
		case "A4" :
			ppp = 16; break;
		case "A5" :
			ppp = 32; break;
		case "A6" :
			ppp = 64; break;
		case "B4" :
			ppp = 16; break;
		case "B5" :
			ppp = 32; break;
		case "B6" :
			ppp = 64; break;
		default :
			ppp = 16; break;
	}
	return ppp;
}

function CalcJM(jcode, tn, pp, t_yeo, colo, jul, panh, btype){ // 표지여분
	if(!pp){ // 케이스
	    if (jul) // 2008-10-02 : PAGE있으면 PAGE수로 없으면 1/10
	        t_jung = Math.ceil(tn / jul);
	    else t_jung = Math.ceil(tn / 10);
	    
    }else{
		t_jung = tn / pp;
		if(jul == 3) t_jung = t_jung * 8 / 9;
		else{
			if (((jcode.substring(5,6) == '0') || (jcode.substring(5,6) == '3')) && (panh == "A")) // 4*6 -- 2009.01.30
				t_jung = Math.ceil(t_jung / 2);
		}
	}
	if (btype == 1) // (한국가곡 200곡선 - 52201, 52202, 52103 : 표지가 3절이지만 6장만 나옴) - KSWYONJ0 - WYPAGE : 6
		t_jung = tn / 24;
	if (btype == 2) // (파랑새 동요 19집 - 56509 : 표지가 4장 나옴) - KSWYONJ0 - WYCHEK : 4
		t_jung = tn / 16;
	if (btype == 3){ // 스프링은 4*6일때도 1/2 안함
		if ((jcode.substring(5,6) == '0') || (jcode.substring(5,6) == '3')) // 4*6
			t_jung = t_jung * 2;
	}
	t_jung = Math.ceil(t_jung);
	switch (colo){
		case 3:
			t_yeo = t_yeo * 1.4; break;
		case 4:
			t_yeo = t_yeo * 1.4 * 1.3; break;
		case 5:
			t_yeo = t_yeo * 1.4 * 1.3 * 1.2; break;
		case 9:
			t_yeo = t_yeo * 1.4 * 1.3 * 1.2 * 1.2; break;
	}
	/* 여분 60 미만은 60으로 고정 --- 15.08.04 */
	if (t_yeo < 60)
		t_yeo = 60;
	/* ---- */
	if ((jcode.substring(5,6) == '0') || (jcode.substring(5,6) == '3')) // 4*6 - 10%차감
		t_yeo = t_yeo * 0.9;

	tj1 = Math.floor(t_jung / 500);
	tj2 = Math.floor(t_jung % 500);
	ty1 = Math.floor(t_yeo / 500);
	ty2 = Math.floor(t_yeo % 500);
	
	return {
		tj1: tj1,
		tj2: tj2,
		ty1: ty1,
		ty2: ty2
    };
}

function CalcJM2(jcode, tn, pp, t_yeo, colo, jul, page, panh){ // 본문여분
	t_jung = Math.ceil(tn / pp);
	switch(colo){
		case 4:
			t_yeo = t_yeo * 0.8 * 0.85; break;
		case 6:
			t_yeo = t_yeo * 0.8; break;
		default:
			t_yeo = t_yeo; break;
	}
	
	if (colo == 0) // 본문과 같은 면지, 색도 0이면 25
		t_yeo = 25;
	
	if (panh == 1) // 면지는 본문여분 + 10%
		t_yeo *= 1.1;

	if ((jcode.substring(5,6) == '0') || (jcode.substring(5,6) == '3')) // 4*6 - 10%차감
		t_yeo = t_yeo * 0.9;
	
	t_yeo = Math.ceil(t_yeo);

	tj1 = Math.floor(t_jung / 500);
	tj2 = Math.floor(t_jung % 500);
	ty1 = Math.floor(t_yeo / 500);
	ty2 = Math.floor(t_yeo % 500);
	
	return {
		tj1: tj1,
		tj2: tj2,
		ty1: ty1,
		ty2: ty2
    };
}

function CalcT(jcode, jname, j1, j2, y1, y2, gubn, col, bu, pg){
	var bb = -1;
	for(var i = 0 ; i < arr_index; i++){
		if ((Total_Y[i][0] == jcode) && (Total_Y[i][4] == gubn) && (Total_Y[i][6] == bu) && (Total_Y[i][5] == col)){
			bb = i;
			break;
		}
	}
	if(bb > -1){
		t1 = (j1 * 500) + j2;
		t2 = (y1 * 500) + y2;
		Total_Y[bb][2] += t1;
		Total_Y[bb][3] += t2;
	}else{
		t1 = (j1 * 500) + j2;
		t2 = (y1 * 500) + y2;
		Total_Y[arr_index] = new Array(jcode, jname, t1, t2, gubn, col, bu, pg);
		arr_index++;
	}
}

function CalcB(gubn, bu, dae, pg, do_, j1, j2, y1, y2, jcode, jname, pp){
	var t1 = (j1 * 500) + j2;
	var t2 = (y1 * 500) + y2;
	if (pp != pg) tbigo = "돈땡 (" + pg + " p)";
    else tbigo = " ";
	Total_B[barr_index] = new Array(gubn, bu, dae, pg, do_, t1, t2, jcode, jname, tbigo);
	barr_index++;
}

function ChBu(){
	var t_num = $('input[name=bnum]').val();
	var t_type = $('select[name=jetype]').val();
	var tmp_id = $('input[name=uid]').val();
	var mode = $('input[name=mode]').val();
	var jdate = $('input[name=jdate]').val();
	
	if (confirm("수량을 변경하시겠습니까?") == false) return;
	
	var from = {bnum: t_num, btype: t_type, uid: tmp_id}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/update_jp_bjyjjejak1",
		data: JSON.stringify(from),
		success: function (result) {
			ReadyBalju(tmp_id, mode, jdate);
		},
		error: function () {
		}
	});
}

function StartBalju(){
	if($('select[name=m1]').val() == 'N'){
		alert("인쇄 선택하세요");
		return $("select[name=m1]").focus();
	}
	if (confirm("발주작업 진행하시겠습니까?") == false) return;
	
	logNow("발주스타트");
	
	var listid = $('input[name=uid]').val();
	var m1 = $('select[name=m1]').val();
	var m2 = $('select[name=m2]').val();
	var m3 = $('select[name=m3]').val();
	var m4 = $('select[name=m4]').val();
	var m5 = $('select[name=m5]').val();
	var m6 = $('select[name=m6]').val();
	var m7 = $('select[name=m7]').val();
	var m8 = $('select[name=m8]').val();
	var m9 = $('select[name=m9]').val();
	var m10 = $('select[name=m10]').val();
	var m11 = $('select[name=m11]').val();
	var m12 = $('select[name=m12]').val();
	var m13 = $('select[name=m13]').val();
	
	var bcode = $('input[name=bcode]').val();
	var jetype = $('select[name=jetype]').val();
	
	var data0;
	
	var from = {sbbook: bcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_startbj1",
		data : JSON.stringify(from),
		success: function (result) {
			data0 = result[0];
		}
	});
	
	var bookprice = data0["sbuprc"];
	var inse = 0; var sach = 0;
	if (data0["sbinse"] > 0) inse = data0["sbinse"];
	else{
		if (data0["sbhj04"] > 0) inse = data0["sbhj04"];
	}
	if (data0["sbjnji"]) var jnji = data0["sbjnji"];
	else jnji = 0;
	if (bcode.substring(0,3) == "918") jnji = 0; // 캠프는 증지 신청만 하고 붙이지 않음
	if (data0["sbinji"]) var inji = 1;
	if (data0["sbstic"]) var stic = data0["sbstic"];
	if (data0["sbmyun"]) var myunji = 1;
	else myunji = 0;
	if (data0["sbbyul"]) var byulji = 1;
	else byulji = 0;
	if (data0["sbcd"]) var cdgo = parseInt(data0["sbcd"]);
	else if (data0["sbcd"] == 2) cdgo = 2;
	if (data0["sbmusn"]) var musn = 1;
	if (data0["sbwing2"]) var wing = 1;
	if (data0["sbbinb"]) var binb = 1;
	if (data0["sbsach"]) sach = 1;
	var coating = data0["sbcoti"];
	if (!coating) coating = 1;
	overcoating = data0["sbcoti2"];
	var case_ = data0["sbcase2"];
	
	var muji_page = 0; var byji_page = 0; var hwbo_page = 0;
	var myun_num = 0; var byji_num = 0; var hwbo_num = 0;

	var bbco = bcode.substring(0,5);
	var ex_bu = 0;

	var t_myun = data0["sbpage"];
	if (data0["sbpage2"]){
	    t_myun += data0["sbpage2"];
		var bon2 = 1;
	}else bon2 = 0;

	// 출판사, 데테 구분
	var t_com = data0["sbbook"].substring(0,2);
	if ((t_com == '03') || (t_com == '04')) t_com = 1; // DT
	else t_com = 0; // 출판

	// 신간여부 구분
	var tyear = parseInt(data0["sbapdt"].substring(0,1));
	if (tyear > 0) tyear = "19" + data0["sbapdt"].substring(0,2);
	else tyear = "20" + data0["sbapdt"].substring(0,1);

	if (jetype == 2) var is_new = 0; // 재판
	else is_new = 1;

	var t_panh2 = data0["sbpanh"];
	var t_janh2 = data0["sbjanh"];
	
	var ppp;
	switch (data0["sbpanh"]) {
		case "A3" :
			ppp = 8; break;
		case "A4" :
			ppp = 16; break;
		case "A5" :
			ppp = 32; break;
		case "A6" :
			ppp = 64; break;
		case "B4" :
			ppp = 8; break;
		case "B5" :
			ppp = 16; break;
		case "B6" :
			ppp = 32; break;		
		default :
			ppp = 16; break;
	}

	var t_janh;
	switch (data0["sbjanh"]){
		case 1:
			t_janh = "무선"; break;
		case 2:
			t_janh = "반양장"; break;
		case 3:
			t_janh = "절공"; break;
		case 4:
			t_janh = "양장"; break;
		case 5:
			t_janh = "중철"; break;
		case 6:
			t_janh = "중미싱"; break;
		case 7:
			t_janh = "스프링"; break;
		case 8:
			t_janh = "PUR무선"; break;
	}
	
	// 발주완료표시
	var from = { uid : listid }
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/jpjejak/update_startbj1",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
		},
		error : function() {
		}
	});
	
	var ipdate; var jejakdate;
	var from = {uid: listid}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_startbj2",
		data : JSON.stringify(from),
		success: function (result) {
			ipdate = parseInt(new Date().getTime()/1000 + (parseInt(result[0]["pdate"]) * 60 * 60 * 24));
			jejakdate = result[0]["signdate"];
		}
	});
	
	// 인쇄완료일. 입고완료일 등록 --> 발주일 기준 40일, 45일 - 2014.09.24
	var pwan = new Date().getTime()/1000 + (60*60*24*40);
	var iwan = new Date().getTime()/1000 + (60*60*24*45);
	pwan = MsToFulldate(pwan).substring(4,8);
	iwan = MsToFulldate(iwan).substring(4,8);
	
	//신간등록
	if (jetype == 1){
		var sk_arr = new Array("911", "913", "912", "711");
		var tcode = bcode.substring(0,3);
		if (!inArray(tcode, sk_arr)) {
			var ddd = new Date().getTime()/1000 + 3024000;
			var from = { yjbook : bcode, yjdate: ddd }
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/jpjejak/insert_startbj1",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
				},
				error : function() {
				}
			});
		}
	}
	
	// 발주정보
	var new_uid;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_startbj3",
		async: false,
		success: function (result) {
			if (result[0]["max_uid"]) new_uid = result[0]["max_uid"] + 1;
			else new_uid = 1;
		}
	});
	
	var bon_uid = new_uid;
	
	var bdate = new Date(parseInt("20" + jejakdate.substring(0,2)), parseInt(jejakdate.substring(2,4))-1, parseInt(jejakdate.substring(4,6)), 0, 0, 1).getTime()/1000;
	var tdate = new Date(parseInt(MsToFulldate(bdate).substring(0,4)), parseInt(MsToFulldate(bdate).substring(4,6)), 1, 0, 0, 1).getTime()/1000;
	
	var new_crnum;
	var from = {bdate: tdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_startbj4",
		data : JSON.stringify(from),
		success: function (result) {
			if (result[0] != null) new_crnum = result[0]["max_crnum"] + 10;
			else new_crnum = 10;
		}
	});
	

	var from = {	
		uid: new_uid, listid: listid, bdate: bdate, m1: m1, m2: m2, m3: m3, m4: m4, m5: m5, m6: m6, m7: m7, m8: m8, m9: m9, 
		m10: m10, m11: m11, m12: m12, m13: m13, crnum: new_crnum, ipdate: ipdate, pwan: pwan, iwan: iwan
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/jpjejak/insert_startbj2",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
		},
		error : function() {
			alert("제작예정 error 1");
		}
	});

	// 입고테이블 작성
	var new_b;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_startbj5",
		async: false,
		success: function (result) {
			if (result[0]["max_uid"]) new_b = result[0]["max_uid"] + 1;
			else new_b = 1;
		}
	});
	var from = {uid: listid}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_startbj6",
		data : JSON.stringify(from),
		success: function (result) {
			data0 = result[0];
		}
	});
	var from = {	
		uid: new_b, bookname: data0["bname"], bookcode: data0["bcode"], jdate: bdate, juid: new_uid, 
		ccode: m3, jnum: data0["bnum"], jgubn: data0["btype"], m3: m3, xnum: data0["bnum"]
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/jpjejak/insert_startbj3",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
		},
		error : function() {
			alert("입고테이블 error 1");
		}
	});
	
	var tuid = new_uid;
	var tuid2 = tuid;
	var b_index = new Array();
	b_index[0] = new Array(new_uid, 0);

	// 사용용지별
	var tmp_uid = 0; var new_u; var new_u5; var pyo_jijl; var pyo_jm; var t_filmcost;
	var bnum = $('input[name=bnum]').val();
	
	var t_colo2;
	for (var i = 0 ; i < $('input[name="t3_jcode[]"]').length ; i++){
		//여기
		var t3_jcode = $('input[name="t3_jcode[]"]')[i].value;
		var t3_gubn = $('input[name="t3_gubn[]"]')[i].value;
		var t3_pg = $('input[name="t3_pg[]"]')[i].value;
		var t3_bu = $('input[name="t3_bu[]"]')[i].value;
		var t3_jm = $('input[name="t3_jm[]"]')[i].value;
		var t3_colo = $('input[name="t3_colo[]"]')[i].value;
		var t_colo = parseInt($('input[name="t3_colo[]"]')[i].value);///
		var t3_jname = $('input[name="t3_jname[]"]')[i].value;
		var t3_yb = $('input[name="t3_yb[]"]')[i].value;
		
		if ((t3_gubn == '면지') || (t3_gubn == '면지1') || (t3_gubn == '면지2')){
			muji_page += t3_pg;
			myun_num++;
		}
		if (t3_gubn == '별지'){
			byji_page += t3_pg;
			byji_num++;
		}
		if (t3_gubn == '화보'){
			hwbo_page += t3_pg;
			hwbo_num++;
		}
		// 2008-12-03 나도피 추가
	    if (t3_bu == 5) {
	        tuid = bon_uid;
			var ttt = t3_bu;
			b_index[ttt] = new Array(new_uid, 0);
	    }
	    if ((t3_bu > 0) && (t3_bu < 5)){
	    	var ex_bu = 1; // 부록있음 check
	    	$.ajax({
	    		type: "POST",
	    		dataType: "json",
	    		url: SETTING_URL + "/jpjejak/select_startbj3",
	    		async: false,
	    		success: function (result) {
	    			new_uid = result[0]["max_uid"] + 1;
	    			
	    		}
	    	});
	    	var from = {bdate: tdate}
	    	$.ajax({
	    		type: "POST",
	    		contentType: "application/json; charset=utf-8;",
	    		dataType: "json",
	    		async: false,
	    		url: SETTING_URL + "/jpjejak/select_startbj4",
	    		data : JSON.stringify(from),
	    		success: function (result) {
	    			new_crnum = result[0]["max_crnum"] + 10;
	    		}
	    	});
	    	eval("var custcode = m3" + t3_bu + ";");
	    	
	    	var from = {	
	    		uid: new_uid, 
	    		listid: listid, 
	    		bdate: bdate, 
	    		m1: m1, 
	    		m2: "0", 
	    		m3: custcode, 
	    		m4: m4,
	    		bucode: t3_bu, 
	    		crnum: new_crnum, 
	    		ipdate: ipdate,
	    		pwan: pwan, 
	    		iwan: iwan
	    	}
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/jpjejak/insert_startbj4",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
				},
				error : function() {
					alert("입고테이블 error 1");
				}
			});
	    	
	    	tuid = new_uid;
			ttt = t3_bu;
			b_index[ttt] = new Array(new_uid, 0);
		}
	    $.ajax({
    		type: "POST",
    		dataType: "json",
    		url: SETTING_URL + "/jpjejak/select_startbj7",
    		async: false,
    		success: function (result) {
    			if(result[0]["max_uid"]) new_u = result[0]["max_uid"] + 1;
    			else new_u = 1;
    		}
    	});
	    $.ajax({
    		type: "POST",
    		dataType: "json",
    		url: SETTING_URL + "/jpjejak/select_startbj8",
    		async: false,
    		success: function (result) {
    			if(result[0]["max_uid"]) new_u5 = result[0]["max_uid"] + 1;
    			else new_u5 = 1;
    		}
    	});
	    
	    var t_amount = Math.ceil(bnum / 500);
		if (t_amount > 21) t_amount = 21; // 인쇄비 : 10500부 이상 동일
		var t_panh = ($('input[name=panh]').val()).substring(0,1);
		
		if ((t3_gubn == '면지') || (t3_gubn == '면지1') || (t3_gubn == '면지2') || (t3_gubn == '도비라')){
			var wygubn;
			switch (t3_gubn){
				case "면지" :
				case "도비라" :
					wygubn = '03'; break;
				case "면지1" :
					wygubn = '17'; break;
				case "면지2" :
					wygubn = '16'; break;
			}
			//row query문 보내서 결과값을 안씀 > SELECT * FROM jejak.KSWYONJ0 WHERE wybook = #{wybook} AND wygubn = #{wygubn} LIMIT 1
		}
		if ((t3_gubn == '표지') || (t3_gubn == '속표지')){ //-- 2015.07.06
			pyo_jijl = t3_jcode.substring(5,6);
			if ((pyo_jijl == '1') || (pyo_jijl == '4') || (t3_jcode == "080120")) pyo_jijl = 'A';
			else pyo_jijl = 'B';
		}
		
		t_colo2 = 0;
		logNow(t_colo);
		if ((t3_gubn == '표지') || (t3_gubn == '속표지') || (t3_gubn == '화보') || (t3_gubn == '별지') || (t3_gubn == '케이스') || (t3_gubn == '면지') || (t3_gubn == '면지1') || (t3_gubn == '면지2') || (t3_gubn == '도비라')){
			if ((t3_gubn == '표지') && ((bcode.substring(0,3) == '393')||(bcode.substring(0,5) == '41201')||(bcode.substring(0,5) == '41202')||(bcode.substring(0,5) == '41203')||(bcode.substring(0,5) == '41204')||(bcode.substring(0,5) == '41206')||(bcode.substring(0,5) == '41207')||(bcode.substring(0,5) == '41208')||(bcode.substring(0,5) == '41209')||(bcode.substring(0,5) == '41210')))
				t_colo2 = t_colo + 2;
			else{					
				if (t_colo > 1) t_colo2 = t_colo + 1;
				else t_colo2 = 0;
			}
			if ((t3_gubn == '표지') || (t3_gubn == '속표지')) //-- 2015.07.06
				pyo_jm = t3_jm;
		}else{
			if (t_colo > 2) t_colo2 = 8;
			else t_colo2 = 2;
		}
		
		var yj_pan = t3_jcode.substring(5,6);
		if ((yj_pan == '1') || (yj_pan == '4') || (t3_jcode == "080120")) yj_pan = 'A';
		else yj_pan = 'B';
		
		if (t3_gubn.indexOf("본문") != -1 || (t3_gubn == '면지') || (t3_gubn == '면지1') || (t3_gubn == '면지2') || (t3_gubn == '도비라'))
			var from = {pbu: t_amount, ppan: t_panh, pcolo: t_colo2, option: ", pcolo desc"};
		else 
			var from = {pbu: t_amount, ppan: yj_pan, pcolo: 1, option: ""};
		
		logNow(from);
		var pdanga;
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_startbj9",
			data : JSON.stringify(from),
			success: function (result2) {
				logNow(result2);
				pdanga = result2[0]["pprice"];
			}
		});
		var t_jm1 = Math.floor(t3_jm / 500);
		var t_jm2 = t3_jm % 500;	
		var rnum = t_jm1;
		
		if (t_jm2 > 1){
			if (t_jm2 < 251) rnum += 0.5;
			else rnum += 1;
		}
		if (rnum < 1) rnum = 1; // 최소 1R
		
		var pcost;
		if (t3_gubn.indexOf("본문") != -1 || (t3_gubn == '면지') || (t3_gubn == '면지1') || (t3_gubn == '면지2') || (t3_gubn == '도비라')){
			if (t3_gubn.indexOf("본문") != -1) pcost = rnum * pdanga * t_colo * 1.1;
			else pcost = rnum * pdanga * (t_colo + 1) * 1.1;
		}else{
			pcost = rnum * pdanga * t_colo2 * 1.1;
		}
		
		if ((i > 0) && (t3_gubn == $('input[name="t3_gubn[]"]')[i-1].value) && (t3_bu == $('input[name="t3_bu[]"]')[i-1].value) && (t3_gubn.indexOf("본문") != -1)){
			if (!tmp_uid) tmp_uid = new_u - 1;
			
			var t5_jm; var t5_yb;
			var from = {uid: tmp_uid}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/jpjejak/select_startbj10",
				data : JSON.stringify(from),
				success: function (result) {
					t5_jm = result[0]["jm"] + t3_jm;
					t5_yb = result[0]["yb"] + t3_yb;
				}
			});
			
			var from = { jm: t5_jm, yb: t5_yb, uid: tmp_uid }
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/jpjejak/update_startbj2",
				async: false,
				data: JSON.stringify(from),
				success: function (result) {
				},
				error: function () {
				}
			});
			

			var from = {
				uid : new_u,
				listid : tuid,
				jcode : t3_jcode,
				jname : t3_jname,
				jm : 0,
				yb : 0,
				gubn : t3_gubn,
				colo : t3_colo,
				bucode : t3_bu,
				pcost : pcost,
				pdanga : pdanga,
				rnum : rnum
			}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/jpjejak/insert_startbj5",
				async: false,
				data: JSON.stringify(from),
				success: function (result) {
				},
				error: function () {
				}
			});
		}else{
			var from = {
				uid : new_u,
				listid : tuid,
				jcode : t3_jcode,
				jname : t3_jname,
				jm : t3_jm,
				yb : t3_yb,
				gubn : t3_gubn,
				colo : t3_colo,
				bucode : t3_bu,
				pcost : pcost,
				pdanga : pdanga,
				rnum : rnum
			}
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/jpjejak/insert_startbj5",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
				},
				error : function() {
				}
			});
		}
		// 필름, 소부비 계산  - 본문 제외
		if (t3_gubn.indexOf("본문") == -1){
			var from = {fpanh: t_panh2}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/jpjejak/select_startbj11",
				data : JSON.stringify(from),
				success: function (result) {
					t_filmcost = result[0]["fprice"];
				}
			});
			
			var t_pan; var t_film;
			switch (t3_gubn){
				case '표지':
					t_pan = t3_colo;
					if (bbco == '31121') t_pan += 1; // 31121 표지판수 +1
					if (t_com || is_new || (t_pan == 0)) t_film = 0;
					else t_film = 3;
					break;
				case '화보':
					t_pan = t3_colo;
					t_film = 0;
					// 2015.03.16 추가 -- 4p 경우 도수/2
					if (t3_pg == 4) t_pan = t_pan / 2;
					break;
				case '면지':
				case '면지1':
				case '면지2':
				case '도비라':
					// 면지는 도수/2 - 2008.12.19
					t_pan = Math.ceil(t3_colo / 2);
					t_film = 0;
					// 2015.03.16 추가 - 8p, 16p 경우 도수와 같음
					if (t3_pg > 4) t_pan = t3_colo;
					break;
				case '별지':
					t_pan = t3_colo;
					// 2015.03.16 추가 - 4p 경우 도수/2 -- 한국가곡 200선(하)는 예외 - 2016.09.02
					if ((t3_pg == 4) && (bbco != '52202')) t_pan = t_pan / 2;
					t_film = 0;
					if ((bbco == '12504') || (bbco == '33115')){ // 톡톡튀는 팬더동요 (삽지 2p 약물코팅), 나도피4 별지 코팅
						if (t_jm2 > 375) t_jm1 += 1;
						else{
							if (t_jm2 > 250) t_jm1 += 0.75;
							else{
								if (t_jm2 > 125) t_jm1 += 0.5;
								else t_jm1 += 0.25;
							}
						}
						var coa_dan; var coat_cost;
						$.ajax({
							type: "POST",
							dataType: "json",
							url: SETTING_URL + "select_startbj12",
							async: false,
							success: function (result8) {
								coa_dan = result8[0]["ccost"];
								coat_cost = t_jm1 * result8[0]["ccost"];
							}
						});
						
						var new_uid8;
						$.ajax({
							type: "POST",
							dataType: "json",
							url: SETTING_URL + "select_startbj13",
							async: false,
							success: function (result8) {
								if (result8[0]["max_uid"]) new_uid8 = result8[0]["max_uid"] + 1;
								else new_uid8 = 1;
							}
						});

						var from = {
							uid : new_uid8,
							ccode8 : m2,
							bcode8 : bcode,
							cdate8 : bdate,
							cnum8 : t_jm1,
							cprice8 : coa_dan,
							totcost8 : coat_cost,
							crnum8 : tuid2
						}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/insert_startbj6",
							async: false,
							data: JSON.stringify(from),
							success: function (result) {
							},
							error: function () {
								alert("코팅비 error");
							}
						});
					}
					break;
				case '케이스':
					t_pan = t3_colo;
					t_film = 0;
					break;
				default:
					t_pan = t3_colo;
					t_film = 0;
					break;
			}
			var ttp = t_pan * 7000;
			var ttl = t_film * t_filmcost;
			var tt_sum = (ttl + ttp) * 1.1;
			
			if (myun_num > 1){
				var from = {listid5: tuid}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/jpjejak/select_startbj14",
					data : JSON.stringify(from),
					success: function (result) {
						if (result[0]["pannum5"] < t_pan){
							mod_uid = result[0]["uid"];
							
							var from = { pannum5: t_pan, sobu5: ttp, sum5: tt_sum, uid: mod_uid };
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/jpjejak/update_startbj3",
								async: false,
								data: JSON.stringify(from),
								success: function (result) {
								},
								error: function () {
									alert("필름,소부비 error 1");
								}
							});
						}
					}
				});
				
			}else{
				var daeji = 0;
				if (is_new){
					daeji = t_pan * 2000;
					tt_sum += daeji * 1.1;
				}
				var from = {
					uid: new_u5, 
					listid5: tuid, 
					gubn5: t3_gubn, 
					panst5: 'PS판', 
					pannum5: t_pan, 
					filmnum5: t_film, 
					filmdan5: t_filmcost, 
					filmcost5: ttl, 
					daeji5: daeji, 
					sobudan5: 7000, 
					sobu5: ttp, 
					sum5: tt_sum
				}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/insert_startbj7",
					async: false,
					data: JSON.stringify(from),
					success: function (result) {
					},
					error: function () {
						alert("필름,소부비 error 2");
					}
				});
				new_u5 += 1;
			}
		}
	}
	
	//대수정보
	var t_pan = 0;
	for (var i = 0 ; i < $('input[name="b3_jc[]"]').length ; i++){
		var b3_gubn = $('input[name="b3_gubn[]"]')[i].value;
		var b3_bu = $('input[name="b3_bu[]"]')[i].value;
		var b3_dae = $('input[name="b3_dae[]"]')[i].value;
		var b3_pg = $('input[name="b3_pg[]"]')[i].value;
		var b3_do = $('input[name="b3_do[]"]')[i].value;
		var b3_jm = $('input[name="b3_jm[]"]')[i].value;
		var b3_yb = $('input[name="b3_yb[]"]')[i].value;
		var b3_jc = $('input[name="b3_jc[]"]')[i].value;
		var b3_jn = $('input[name="b3_jn[]"]')[i].value;
		var b3_bigo = $('input[name="b3_bigo[]"]')[i].value;
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "select_startbj13",
			async: false,
			success: function (result) {
				if (result[0]["max_uid"]) new_uid = result[0]["max_uid"] + 1;
				else new_uid = 1;
			}
		});
		tid = b3_bu;
		ta = b_index[tid][0];
		var tbigo = 0;
		
		var from = {
			uid: new_uid, 
			listid: ta, 
			gb: b3_gubn, 
			bu: b3_bu, 
			dae: b3_dae, 
			pg: b3_pg, 
			colo: b3_do, 
			jm: b3_jm, 
			yb: b3_yb, 
			jc: b3_jc, 
			jn: b3_jn, 
			t4bigo: b3_bigo
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/insert_startbj8",
			async: false,
			data: JSON.stringify(from),
			success: function (result) {
			},
			error: function () {
			}
		});
		
		if (b3_do == 2) t_pan += 2;  // 2도(양면) ---> 판수 = 도수
		else{
			var tmp_pan = (b3_pg * 100) / ppp;
			var t_mod = tmp_pan % 100;
			if ((t_mod == 25) || (t_mod == 75)) tmp_pan += 25;
			tmp_pan = (tmp_pan * b3_do) / 100;
			t_pan += Math.ceil(tmp_pan);
		}
		if (bbco == '31326') t_pan = 43; // 세광부르크뮐러 연습곡
	}
	
	// 본문 필름.소부비
	ttp = t_pan * 7000;
	if (t_com || is_new) t_film = 0;
	else t_film = 2;
	ttl = t_film * t_filmcost;
	tt_sum = (ttl + ttp) * 1.1;
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_startbj8",
		async: false,
		success: function (result) {
			if(result[0]["max_uid"]) new_u5 = result[0]["max_uid"] + 1;
			else new_u5 = 1;
		}
	});
	
	var daeji = 0;
	if (is_new){
		daeji = t_pan * 2000;
		tt_sum += daeji * 1.1;
	}
	var from = {
		uid: new_u5, 
		listid5: tuid, 
		gubn5: $('input[name="b3_gubn[]"]')[0].value, 
		panst5: 'PS판', 
		pannum5: t_pan, 
		filmnum5: t_film, 
		filmdan5: t_filmcost, 
		filmcost5: ttl, 
		daeji5: daeji, 
		sobudan5: 7000, 
		sobu5: ttp, 
		sum5: parseInt(tt_sum)
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/insert_startbj7",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
		},
		error: function () {
			alert("필름,소부비 error 3");
		}
	});
	
	// 제본

	// 본서제본
	var t_myunsu = t_myun;
	if (t_janh2 != 7) t_myunsu += 8; // 표지 -- 스프링은 표지 포함 안 함 - 2015.09.06
	
	if (t_myunsu < 100) t_myunsu = 100;

	var tmp_inji = 0;
	if (jnji){
		if (m3 == "3006") tmp_inji += 20; //성일사 - 수량에 상관없이 20원 . 2016.06.23
		else tmp_inji += (20 * jnji);
	}
	if (inji) tmp_inji += 20;
	// 스티커, 화보, 별지, 면지, 평가지, 오리꼬미는 무조선 10원 - 2015.09.06
	if (stic) tmp_inji += 10;
	if (cdgo) tmp_inji += 20; //tmp_inji += 20 * cdgo; -- CD는 무조건 20원
	if (wing) tmp_inji += 20; // 표지오리꼬미
	if (binb) tmp_inji += 20; // 책속의책 (스즈키V시리즈) - 기타단가 +20
	// 면지는 수량 상관없이 추가 10원 - 2016.06.15
	if (myunji) tmp_inji += 10;
	if (byulji) tmp_inji += 10; // 별지 10원 - 2016.06.15
	if (!binb && ex_bu) tmp_inji += 20; // 책속의 책 아닌 부록 있을경우 갯수에 상관없이 20원  - 2016.07.19
	if (t_janh2 < 4) t_janh3 = 4;
	else t_janh3 = t_janh2;
	
	var jdanga;
	switch (t_janh2){
		case 7 : // 스프링 - 2015.09.06
			if (tmyunsu >= 208) var addi = 208;
			else var addi = 207;
			
			var pdanga7;
			var from = {addi: addi, pnum: bnum}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/jpjejak/select_startbj16",
				data : JSON.stringify(from),
				success: function (result7) {
					pdanga7 = result7[0]["jcost"];
				}
			});
			
			if (tmp_inji) sum_4 = (pdanga7 + tmp_inji) * bnum;
			else sum_4 = pdanga7 * bnum;
			jdanga = 0;
			break;
		case 5 : // 중철 - 판형 무관하게 꼭지당 6원 - 2015.09.06
			var jdan;
			if (bcode.substring(0,3) == "918") jdan = 30; // 캠프는 30원 - 2015.09.06
			else{
				if (bcode.substring(0,3) == "982") jdan = 10; // 진도카드는 10원 - 2015.09.06
				else{
					tcode = bcode.substring(0,5);
					// 중철 꼭지수 계산 변경 - 2016.05.09
					
					var from = {wdbook: tcode}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/jpjejak/select_startbj17",
						data : JSON.stringify(from),
						success: function (result7) {
							ppan = result7[0]["sum_wdqnty"] + 1; // 표지 1꼭지 추가=
						}
					});
					jdan = ppan * 6; // 꼭지당 6원
				}
			}
			if (tmp_inji) sum_4 = (jdan + tmp_inji) * bnum;
			else sum_4 = jdan * bnum;
			jdanga = 0;
			pdanga7 = jdan;
			break;
	    case 8 : // PUR
	    	var from = {pgubn: t_panh2, jgubn: 8}
	    	$.ajax({
	    		type: "POST",
	    		contentType: "application/json; charset=utf-8;",
	    		dataType: "json",
	    		async: false,
	    		url: SETTING_URL + "/jpjejak/select_startbj18",
	    		data : JSON.stringify(from),
	    		success: function (result7) {
	    			jdanga = result7[0]["jcost"];
	    		}
	    	});
			if (t_myun < 100){
				jdanga += 0.05;
				pdanga7 = jdanga * 100;
			}else{
				pdanga7 = jdanga * t_myunsu;
			}
			if (tmp_inji) sum_4 = (pdanga7 + tmp_inji) * bnum;
			else sum_4 = pdanga7 * bnum;
	        break;
	    case 4 : // 양장
	    	var from = {tcode: bcode, jgubn: 2}
	    	$.ajax({
	    		type: "POST",
	    		contentType: "application/json; charset=utf-8;",
	    		dataType: "json",
	    		async: false,
	    		url: SETTING_URL + "/jpjejak/select_startbj19",
	    		data : JSON.stringify(from),
	    		success: function (result7) {
	    			if(result7.length != 0){
	    				pdanga7 = result7[0]["jcost"];
	    			}else pdanga7 = 900;
	    		}
	    	});
			if (tmp_inji) sum_4 = (pdanga7 + tmp_inji) * bnum;
			else sum_4 = pdanga7 * bnum;
			jdanga = 0;
			break;
		default: // 기타
			var from = {pgubn: t_panh2, jgubn: t_janh3}
	    	$.ajax({
	    		type: "POST",
	    		contentType: "application/json; charset=utf-8;",
	    		dataType: "json",
	    		async: false,
	    		url: SETTING_URL + "/jpjejak/select_startbj18",
	    		data : JSON.stringify(from),
	    		success: function (result7) {
	    			jdanga = result7[0]["jcost"];
	    		}
	    	});
			// 키즈도시락은 90전 - 15.11.03
			t_arr = new Array("32516", "32517", "32518", "32519");
			tcode = bcode.substring(0,5);
			if (inArray(tcode, t_arr)) jdanga = 0.9;
			// 상철제본운 0.8 -- 16.07.04
			if (sach){
				jdanga = 0.8;
				// 스마트8은 0.4 추가
				t_arr = new Array("11031", "11032", "11033", "11034", "11035", "11036");
				tcode = bcode.substring(0,5);
				if (inArray(tcode, t_arr)) jdanga += 0.4;
			}

			pdanga7 = jdanga * t_myunsu;
			if (tmp_inji) sum_4 = ((jdanga * t_myunsu) + tmp_inji) * bnum;
			else sum_4 = jdanga * t_myunsu * bnum;
			// 최저금액 80,000 적용
			if (sum_4 < 80000) sum_4 = 80000;
			break;
	}
	sum_4 *= 1.1;
	sum_4 = Math.round(sum_4);
	
	var new_uid7;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_startbj20",
		async: false,
		success: function (result7) {
			if(result7[0]["max_uid"]) new_uid7 = result7[0]["max_uid"] + 1;
			else new_uid7 = 1;
		}
	});
	
	var from = {
		uid: new_uid7, 
		ccode7: m3, 
		bcode7: bcode, 
		cdate7: bdate, 
		cgubn7: t_janh2, 
		cnum7: bnum, 
		cpage7: t_myunsu, 
		cprice17: jdanga, 
		cprice27: tmp_inji, 
		crnum7: tuid2, 
		totcost7: sum_4, 
		pdanga7: pdanga7
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/insert_startbj9",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
			logNow(result);		
		},
		error: function () {
			alert("제본비 error");			
		}
	});
	
	// 부록제본
	var from = {wdbook: bbco}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_startbj21",
		data : JSON.stringify(from),
		success: function (result) {
			//if (result[0]["wdboo9c"] == 5) row9 = mysql_fetch_row($result);
			if (result[0]["wdboo9"] > 0){
				for (var i = 1 ; i <= result[0]["wdboo9"] ; i++){
					var data8;
					var from = {sbbook: bcode}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/jpjejak/select_startbj1",
						data : JSON.stringify(from),
						success: function (result) {
							if(result.length != 0) alert("KSCBOOK error");
							data8 = result[0];
						}
					});
					
					eval("var field_namep = SBSBPH" + i + ";");
					eval("var field_namej = SBSBJH" + i + ";");
					eval("var field_nameg = SBSBPG" + i + ";");
					
					var t_myunsu = data8[field_nameg];
					var t_janhb = data8[field_namej];
					var t_panhb = data8[field_namep];
					
					if (t_myunsu < 100) t_myunsu = 100;
					
					if (t_janhb < 4) t_janh3 = 4;
					else t_janh3 = t_janhb;
					
					var jdanga;
					switch (t_janhb){
						case 7 : // 스프링
							var from = {tcode: bcode, jgubn: 7}
					    	$.ajax({
					    		type: "POST",
					    		contentType: "application/json; charset=utf-8;",
					    		dataType: "json",
					    		async: false,
					    		url: SETTING_URL + "/jpjejak/select_startbj19",
					    		data : JSON.stringify(from),
					    		success: function (result7) {
					    			if(result7.length != 0){
					    				pdanga7 = result7[0]["jcost"];
					    			}else pdanga7 = 970;
					    		}
					    	});
							sum_4 = pdanga7 * bnum;
							sum_4 *= 1.1;
							sum_4 = Math.round(sum_4);
							jdanga = 0;
							break;
						case 5 : // 중철
							var from = {pgubn: t_panhb, jgubn: 5}
					    	$.ajax({
					    		type: "POST",
					    		contentType: "application/json; charset=utf-8;",
					    		dataType: "json",
					    		async: false,
					    		url: SETTING_URL + "/jpjejak/select_startbj18",
					    		data : JSON.stringify(from),
					    		success: function (result7) {
					    			pdanga7 = result7[0]["jcost"];
					    		}
					    	});
							sum_4 = pdanga7 * bnum;
							// 부록중철 최저단가 50000 -- 2016.07.19
							sum_4 = Math.max(sum_4, 50000);
							sum_4 *= 1.1;
							sum_4 = Math.round(sum_4);
							jdanga = 0;
							break;
					    case 8: // PUR무선
					    	var from = {pgubn: t_panhb, jgubn: 8}
					    	$.ajax({
					    		type: "POST",
					    		contentType: "application/json; charset=utf-8;",
					    		dataType: "json",
					    		async: false,
					    		url: SETTING_URL + "/jpjejak/select_startbj18",
					    		data : JSON.stringify(from),
					    		success: function (result7) {
					    			jdanga = result7[0]["jcost"];
					    		}
					    	});
							pdanga7 = jdanga * t_myunsu;
							sum_4 = jdanga * t_myunsu * bnum;
							sum_4 *= 1.1;
							sum_4 = Math.round(sum_4);
							break;
						default: // 기타
							// 절공 부록은 무조건 40원 - 2016.08.10
							jdanga = 0.4;
							pdanga7 = 40;
							sum_4 = pdanga7 * bnum;
							sum_4 *= 1.1;
							sum_4 = Math.round(sum_4);
							break;
					}
					if (i > 0) eval("custcode = m3" + i + ";");
					else custcode = m3;
					
					var from = {
						ccode7: custcode, 
						bcode7: bcode, 
						cdate7: bdate, 
						cgubn7: t_janhb, 
						cnum7: bnum, 
						cpage7: t_myunsu, 
						cprice17: jdanga, 
						cprice27: 0, 
						crnum7: tuid2, 
						totcost7: sum_4, 
						pdanga7: pdanga7
					}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/insert_startbj10",
						async: false,
						data: JSON.stringify(from),
						success: function (result) {
						},
							error: function () {
							alert("제본비 error 2");			
						}
					});
					
				}
			}
		}
	});
	// 코팅
	t_pyojm = pyo_jm % 500;
	pyo_jm = Math.floor(pyo_jm / 500);
	
	if (t_pyojm >= 438) pyo_jm += 1;
	else{
		if (t_pyojm >= 313) pyo_jm += 0.75;
		else{
			if (t_pyojm >= 188) pyo_jm += 0.5;
			else{
				if (t_pyojm >= 1) pyo_jm += 0.25;
			}
		}
	}
	var data;
	if ((coating == 3) || (coating == 4)){// 홀로그램, 홀로그램(크리스탈)
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/books/select_bookList22",
			async: false,
			success: function (result) {
				data = result[0];
			}
		});
	}else{
		var from = {cpanh: pyo_jijl, cgub: coating }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_startbj23",
			data : JSON.stringify(from),
			success: function (result) {
				data = result[0];
			}
		});
	}
	coa_dan = data["ccost"];
	coat_cost = pyo_jm * data["ccost"];
		
	var new_uid8;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "select_startbj13",
		async: false,
		success: function (result8) {
			if (result8[0]["max_uid"]) new_uid8 = result8[0]["max_uid"] + 1;
			else new_uid8 = 1;
		}
	});
	
	var from = {
		uid : new_uid8,
		ccode8 : m2,
		bcode8 : bcode,
		cdate8 : bdate,
		cnum8 : pyo_jm,
		cprice8 : coa_dan,
		totcost8 : coat_cost,
		crnum8 : tuid2
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/insert_startbj6",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
		},
		error: function () {
			alert("코팅비 error 2");
		}
	});
	
	if (overcoating){
		if (overcoating == 4){
			$.ajax({
				type: "POST",
				dataType: "json",
				url: SETTING_URL + "select_startbj12",
				async: false,
				success: function (result) {
					data = result[0];
				}
			});
		}else{
			var from = {cpanh: pyo_jijl, cgub: overcoating }
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/jpjejak/select_startbj23",
				data : JSON.stringify(from),
				success: function (result) {
					data = result[0];
				}
			});
		}
		coa_dan = data["ccost"];
		coat_cost = pyo_jm * data["ccost"];
		
		var new_uid8;
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "select_startbj13",
			async: false,
			success: function (result8) {
				if (result8[0]["max_uid"]) new_uid8 = result8[0]["max_uid"] + 1;
				else new_uid8 = 1;
			}
		});
			
		var from = {
			uid : new_uid8,
			ccode8 : m2,
			bcode8 : bcode,
			cdate8 : bdate,
			cnum8 : pyo_jm,
			cprice8 : coa_dan,
			totcost8 : coat_cost,
			crnum8 : tuid2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/insert_startbj6",
			async: false,
			data: JSON.stringify(from),
			success: function (result) {
			},
			error: function () {
				alert("추가코팅 error");
			}
		});
	}
	
	// 기타비용
	var w1 = 0;	// 원고
	var w2 = 0;	// 저작
	var w3 = 0;	// 출력
	var w4 = 0;	// 사보
	var w5 = 0;	// 증지
	var w6 = 0;	// 케이스
	var w7 = 0;	// 스티커
	var w8 = 0;	// 음반
	var w9 = 0;	// 기타
	var w10 = 0;	// 비닐
	var w11 = 0; // 목형비

	if (inse){
		w2 = inse * bookprice * bnum * 0.01;
	}

	if (m10){ // 증지
		var from = {
			ccode5: m10, 
			bcode5: bcode, 
			cdate5: bdate, 
			cnum5: bnum, 
			crnum5: tuid2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/insert_startbj11",
			async: false,
			data: JSON.stringify(from),
			success: function (result) {
			},
			error: function () {
				alert("증지대 기록 오류");
			}
		});
	}
	if (m5){ // 스티커
		var from = {
			ccode9: m5, 
			bcode9: bcode, 
			cdate9: bdate, 
			cnum9: bnum, 
			cprice9: 0, 
			bitag: 4, 
			crnum9: tuid2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/insert_startbj12",
			async: false,
			data: JSON.stringify(from),
			success: function (result) {
			},
			error: function () {
				alert("스티커 기록 오류");
			}
		});
	}
	if (m11){ // 목형
		var from = {
			ccode9: m11, 
			bcode9: bcode, 
			cdate9: bdate, 
			cnum9: bnum, 
			cprice9: 0, 
			bitag: 4, 
			crnum9: tuid2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/insert_startbj12",
			async: false,
			data: JSON.stringify(from),
			success: function (result) {
			},
			error: function () {
				alert("목형비 기록 오류");
			}
		});
	}
	if (m6){ // cd
		var from = {
			ccode9: m6, 
			bcode9: bcode, 
			cdate9: bdate, 
			cnum9: bnum, 
			cprice9: 0, 
			bitag: 3, 
			crnum9: tuid2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/insert_startbj12",
			async: false,
			data: JSON.stringify(from),
			success: function (result) {
			},
			error: function () {
				alert("CD 오류 1");
			}
		});
	}
	
	var new_wuid;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "select_startbj24",
		async: false,
		success: function (result) {
			if (result[0]["max_uid"]) new_wuid = result[0]["max_uid"] + 1;
			else new_wuid = 1;
		}
	});
	
	var from = {
		uid: new_wuid, 
		jenum: tuid2, 
		w1: w1, 
		w2: w2,
		w3: w3,
		w4: w4,
		w5: w5,
		w6: w6,
		w7: w7,
		w8: w8,
		w9: w9,
		w10: w10,
		w11: w11
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/insert_startbj13",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
		},
		error: function () {
			alert("총원가 error");
		}
	});
	
	var from = {bcode: bcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_startbj25",
		data : JSON.stringify(from),
		success: function (result) {
			if(result.length != 0){
				var from = { uid : result[0]["uid"] }
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/jpjejak/update_startbj4",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
					},
					error : function() {
					}
				});
			}
		}
	});
	
}

// 제작계획표
function Searchjejakplan(code, date1, date2, lm_s, lm_t){ //제품이랑 잡물이랑 나누기 code 분리
	if(code == 1){ //제품
		var from = {date1: date1, date2: date2, lm_s: lm_s, lm_t: lm_t}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_jejakplan1",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
					
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["bdate"]);
					full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
					
					var btype2 = ""; var t_p = ""; var t_j = ""; var t_g = ""; var SBJANH = ""; var inse = ""; var coat = "";
					
					if (data["sbinse"] > 0) inse = data["sbinse"];
					else inse = data["sbhj04"];
					if (inse) inse += "%";
				
					if (!data["bucode"]){
						t_p = "sbpanh";
						t_j = "sbjanh";
						t_g = "bmyun";
					}else{
						t_p = "sbsbph" + data["bucode"];
						t_j = "sbsbjh" + data["bucode"];
						t_g = "sbsbpg" + data["bucode"];
					}
					
					switch (parseInt(data[t_j])){
						case 1:
							SBJANH = "무선"; break;
						case 2:
							SBJANH = "반양장"; break;
						case 3:
							SBJANH = "절공"; break;
						case 4:
							SBJANH = "양장"; break;
						case 5:
							SBJANH = "중철"; break;
						case 6:
							SBJANH = "중미싱"; break;
						case 7:
							SBJANH = "스프링"; break;
				        case 8:
							SBJANH = "PUR"; break;
					}
					
					switch (data["btype"]){
						case 1:
							btype2 = "신간"; break;
						case 2:
							btype2 = "재판"; break;
						case 3:
							btype2 = "개정"; break;
					}
					
					switch (data["sbcoti"]){
						case 1:
							coat = "유광"; break;
						case 2:
							coat = "무광"; break;
						case 3:
							coat = "홀로그램"; break;
						case 4:
							coat = "홀로그램(크리스탈)"; break;
						case 5:
							coat = "엠보싱"; break;
						case 7:
							coat = "무광에폭시"; break;
						case 8:
							coat = "유광에폭시"; break;
						default:
							coat = " "; break;
					}
					
					var from = {uid: data["uid"]}
					var arr_size = 0;
					var yongji_array = new Array();
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/jpjejak/select_jejakplan2",
						data : JSON.stringify(from),
						success: function (result2) {
							var object_num = Object.keys(result2);
							var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0;
							for(var i in object_num){
								var data2 = result2[object_num[i]]; 
									
								jnum1 = Math.floor(data2["jm"] / 500);
								jnum2 = data2["jm"] % 500;
								jnum = jnum1 + " R " + jnum2;
								ynum1 = Math.floor(data2["yb"] / 500);
								ynum2 = data2["yb"] % 500;
								ynum = ynum1 + " R " + ynum2;
							
								yongji_array[arr_size] = new Array (data2["gubn"], data2["jcode"], data2["jname"], data2["colo"], jnum, ynum);
								
								arr_size++;
							}
						}
					});
					
					var prev_jj = "";
					var from = {bcode: data["bcode"], listid: data["listid"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/jpjejak/select_jejakplan3",
						data : JSON.stringify(from),
						success: function (result) {
							var object_num = Object.keys(result);
							for(var i in object_num){
								var data = result[object_num[i]]; 
								
								var from = {uid: data["uid"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									async: false,
									url: SETTING_URL + "/jpjejak/select_jejakplan4",
									data : JSON.stringify(from),
									success: function (result) {
										if(result){
											prev_jj = data["signdate"].substring(2,4) + ". "+ data["signdate"].substring(4,6) + ". " + data["signdate"].substring(6) + " : " + data["bnum"] + " 부";
										}
									}
								});	
								break;
							}
						}
					});
					
					htmlString += 
						'<tr>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="310">'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ full_date +'</font></b></span></td>'+
										'<td width="242" colspan="6" height="25" valign="middle" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ data["bname"] +'</font></b></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'+ data["bcode"] + '-' + data["bucode"] +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ btype2 +'</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">'+ numberWithCommas(data["bprice"]) +'</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">'+ numberWithCommas(data["bnum"]) +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data[t_p] + '</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ SBJANH + '</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data[t_g] + '</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'+ data["crnum"] +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt; padding-left:0pt;"><font face="돋움">'+ inse +'</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="306" colspan="7" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'; if(data["sbbigo"]) htmlString += ' ≫ ' + data["sbbigo"]; htmlString += '</font></span></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="311">';
									for(var i=0; i < arr_size ; i++){
										htmlString += 
											'<tr>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][0] +'</font></span></td>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][1] +'</font></span></td>'+
												'<td width="69" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][2] +'</font></span></td>'+
												'<td width="19" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][3] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][4] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][5] +'</font></span></td>'+
											'</tr>';
										}
									htmlString +=
								'</table>'+
							'</td>'+
							'<td width="240" align="center" valign="top">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="231">'+
									'<tr>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m1"] != "0") htmlString += data["m1"] + '&nbsp;' + data["wcname1"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m2"] != "0") htmlString += data["m2"] + '&nbsp;' + data["wcname2"]; htmlString += '</font></span></td>'+
										'<td width="49" height="25" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center" ><span style="font-size:9pt;"><font face="돋움">'+ coat +'</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m3"] != "0") htmlString += data["m3"] + '&nbsp;' + data["wcname3"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt; padding-left:0pt;"><font face="돋움"></font></span></td>'+
										'<td width="49" height="25" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center" ><span style="font-size:9pt;"><font face="돋움">'+
											'<input type="button" value="취소" onClick="javascript:CancelIt(<?=$row[uid]?>,<?=$row[crnum]?>);"></font></span>'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td width="219" colspan="3" height="25" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt; padding-left:0pt;"><font face="돋움">'+ prev_jj +'</font></span></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td width="880" colspan="3" height="1" style="border-top-width:1px; border-top-color:rgb(0,0,0); border-top-style:solid;"><span style="font-size:1pt;"></span></td>'+
						'</tr>';
				}
				$("#jpJejakplanData").html(htmlString);
			}
		});
	} else if(code == 2){ //잡물
		var from = {date1: date1, date2: date2, lm_s: lm_s, lm_t: lm_t}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jmjejak/select_jejakplan1",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
					
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["jbdate"]);
					full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
					
					var t_p = ""; var t_j = ""; var t_g = ""; var SBJANH = ""; var coat = "";
					
					t_p = "sbpanh";
					t_j = "sbjanh";
					t_g = "bmyun";
					
					switch (data["jbjanh"])
					{
						case 1:
							SBJANH = "무선"; break;
						case 2:
							SBJANH = "반양장"; break;
						case 3:
							SBJANH = "절공"; break;
						case 4:
							SBJANH = "양장"; break;
						case 5:
							SBJANH = "중철"; break;
						case 6:
							SBJANH = "중미싱"; break;
						case 7:
							SBJANH = "스프링"; break;
			            case 8:
							SBJANH = "PUR"; break;
						default:
							SBJANH = "없음"; break;
					}
					
					switch (data["sbcoti"]){
						case 1:
							coat = "유광"; break;
						case 2:
							coat = "무광"; break;
						case 3:
							coat = "홀로그램"; break;
						case 4:
							coat = "홀로그램(크리스탈)"; break;
						case 5:
							coat = "엠보싱"; break;
						case 7:
							coat = "무광에폭시"; break;
						case 8:
							coat = "유광에폭시"; break;
						default:
							coat = " "; break;
					}
					
					var from = {uid: data["uid"]}
					var arr_size = 0;
					var yongji_array = new Array();
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/jmjejak/select_jejakplan2",
						data : JSON.stringify(from),
						success: function (result2) {
							var object_num = Object.keys(result2);
							var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0;
							for(var i in object_num){
								var data2 = result2[object_num[i]]; 
									
								jnum1 = Math.floor(data2["jm"] / 500);
								jnum2 = data2["jm"] % 500;
								jnum = jnum1 + " R " + jnum2;
								ynum1 = Math.floor(data2["yb"] / 500);
								ynum2 = data2["yb"] % 500;
								ynum = ynum1 + " R " + ynum2;
							
								yongji_array[arr_size] = new Array (data2["gubn"], data2["yjcode"], data2["yjname"], data2["colo"], jnum, ynum);
								
								arr_size++;
							}
						}
					});
					
					htmlString += 
						'<tr>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="310">'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ full_date +'</font></b></span></td>'+
										'<td width="242" colspan="6" height="25" valign="middle" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ data["jbname"] +'</font></b></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">'+ numberWithCommas(data["jbamnt"]) +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data["jbpanh"] +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ SBJANH +'</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data["jbpage"] +'</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'+ (++i) +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="306" colspan="7" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'; if(data["jbbigo"]) htmlString += ' ≫ ' + data["jbbigo"]; htmlString += '</font></span></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="311">';
									for(var i=0; i < arr_size ; i++){
										htmlString += 
											'<tr>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][0] +'</font></span></td>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][1] +'</font></span></td>'+
												'<td width="69" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][2] +'</font></span></td>'+
												'<td width="19" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][3] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][4] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][5] +'</font></span></td>'+
											'</tr>';
									}
									htmlString +=
								'</table>'+
							'</td>'+
							'<td width="240" align="center" valign="top">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="231">'+
									'<tr>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m1"] != "N") htmlString += data["m1"] + '&nbsp;' + data["wcname1"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m2"] != "N") htmlString += data["m2"] + '&nbsp;' + data["wcname2"]; htmlString += '</font></span></td>'+
										'<td width="49" height="45" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center"><span style="font-size:9pt;"><font face="돋움"><?=$coat?></font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m3"] != "N") htmlString += data["m3"] + '&nbsp;' + data["wcname3"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m8"] != "N") htmlString += data["m8"] + '&nbsp;' + data["wcname8"]; htmlString += '</font></span></td>'+
										'<td width="49" height="45" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center"><span style="font-size:9pt;"><font face="돋움">'+
											'<input type="button" value="취소" onClick="javascript:CancelIt(<?=$row[UID]?>);"></font></span>'+
										'</td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
						'</tr>'+								
						'<tr>'+
							'<td width="880" colspan="3" height="1" style="border-top-width:1px; border-top-color:rgb(0,0,0); border-top-style:solid;"><span style="font-size:1pt;"></span></td>'+
						'</tr>';	
				}
				$("#jmJejakplanData").html(htmlString);
			}
		});
	}
}

//중쇄예정제품
function selReprint(date1, date2){
	var pgubn2 = "";
	var new_num = 0;
	
	var from = { date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_reprint1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			
			htmlString =
				'<tr>'+
					'<td width="50" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">코드</span></td>'+
					'<td width="200" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">KC</span></td>'+
					'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
					'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
					'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
					'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
					'<td width="50" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">가격</span></td>'+
					'<td width="55" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>'+
					'<td width="45" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">중쇄</span></td>'+
					'<td width="45" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">인세</span></td>'+
					'<td width="45" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">지불</span></td>'+
					'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제본</span></td>'+
					'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">비고</span></td>'+
				'</tr>';
			
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[i]; 
				
				var bucode = data["bucode"];
				
				var bookname = "";
				var bookcode = "";
				var bookcode2 = "";
				
				var tpanh = "";
				var tjanh = "";
				var tpage = "";
				
				var temp_tjanh = "";
				if(bucode != 0){
					bookname = ">> 부 록 <<";
					bookcode = "";
					bookcode2 = "";
					
					var t_p = "sbsbph" + bucode;
					var t_j = "sbsbjh" + bucode;
					var t_g =  "sbsbpg" + bucode;
					tpanh = data[t_p];
					tjanh = setTjanh(data[t_j]);
					tpage = data[t_g];
				} else {
					bookname = data["bname"];
					bookcode = data["bcode"];
					bookcode2 = bookcode.substring(0, 5);
					
					tpanh = data["sbpanh"];
					tjanh = setTjanh(data["sbjanh"]);
					tpage = data["sbpage"];
				}
				
				var kc = "";
				switch (data["sbkc"]){
					case 1:
						kc = "Y";
						break;
					case 2:
						kc = "N";
						break;
				}
				
				var sbinse = data["sbinse"];
				var sbhj04 = data["sbhj04"];
				
				var inse = 0;
				if(sbinse != 0) inse = sbinse ;
				if(sbhj04 != 0) inse = sbhj04 ;
				
				var pgubn1 = "";
				switch (data["btype"]){
					case 1:
						pgubn1 = "신간";
						break;
					case 2:
						pgubn1 = "재판";
						break;
					case 3:
						pgubn1 = "개정";
						break;
				}
				
				pgubn2 = "";
				if(inse != 0 && bucode == 0){
					if(data["sbjjgb"] != 0){
						pgubn2 = "판매"
					} else {
						pgubn2 = "제작";
					}
				}
				
				var jebon = "";
				var from = { wccode: data["m3"] }
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/jpjejak/select_selYakc",
					data : JSON.stringify(from),
					success: function (result2) {
						jebon = result2["wcyakc"];
					}
				});
				
				var from = { bcode: data["bcode"], uid: data["uid"] }
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/jpjejak/select_reprint2",
					data : JSON.stringify(from),
					success: function (result3) {
						if(result3["jnum"] == data["uid"]){
							new_num = result3["pnum"];
						} else {
							new_num = result3["pnum"] + 1;
						}
					}
				});
				
				htmlString +=
					'<tr>'+
		                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
		                	bookcode + '</span></td>'+
		                '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+
		                	bookname + '</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:0pt;">'+
		                    kc + '</span></td>'+
		                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
		                    pgubn1 + '</span></td>'+
		                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
		                    tpanh + '</span></td>'+
		                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
		                	tjanh + '</span></td>'+
		                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+
		                    tpage + '</span></td>'+
		                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">';
							if(bucode == 0){
								htmlString += numberWithCommas(data["bprice"]);
							}
							htmlString += '</span></td>'+
		                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">';
							if(bucode == 0){
								htmlString += numberWithCommas(data["bnum"]);
							}
							htmlString += '</span></td>'+
		                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">';
							if(pgubn2 == "제작"){
								htmlString += new_num;
							}
							htmlString += '</span></td>';

							if(bookcode == "329210"){
								htmlString += '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">';
								if(inse != 0 && bucode == 0){
									htmlString += numberWithCommas(inse.toFixed(1));
								} 
								htmlString += '<br>15.0</span></td>'+
								'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+
			                    pgubn2 + '<br>제작</span></td>';
							} else {
								htmlString += '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">';
								if(inse != 0 && bucode == 0){
									htmlString += numberWithCommas(inse.toFixed(2));
								}
								htmlString += '</span></td>'+
								'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+
			                    pgubn2 + '</span></td>';
							}

				htmlString += '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+
		                 	jebon + '</span></td>'+
		                 '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(data["m10"] != "0" && data["m10"] != "N" && bucode == 0){
								htmlString += "증지";
							} else {
								if(data["sbinji"] == 1){
									htmlString += "인지";
								}
							}
							htmlString += '</span></td></tr>';				
			}
		}
	});
	
	var from = { date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_reprint3",
		data : JSON.stringify(from),
		success: function (result3) {
			logNow(result3);
			
			if(result3.length != 0){
				htmlString += '<tr><td height="10" align="center" valign="middle" bgcolor="white" colspan="14"><span style="font-size:9pt;"></span></td></tr>';
			}
			
			
			var object_num2 = Object.keys(result3);
			for(var i in object_num2){
				var data2 = result3[i]; 
								
				var jnji = "";
				var from = { jbcode: data2["jbcode"] }
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/jpjejak/select_reprint4",
					data : JSON.stringify(from),
					success: function (result4) {
						
						if(result4["sbjnji"] != null) jnji = "증지";
						
						htmlString +=
							'<tr>'+
				                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
				                result4["sbbook"] + '</span></td>'+
				                '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+
				                result4["sbname"] + '</span></td>'+
								'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
				                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
				                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
				                data2["jbpanh"] + '</span></td>'+
				                '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
				                setTjanh(data2["jbjanh"]) + '</span></td>'+
				                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+
				                data2["jbpage"] + '</span></td>'+
				                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;"></span></td>'+
				                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+
									numberWithCommas(data2["jbamnt"]) + '</span></td>'+
				                '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">';
									if(pgubn2 == "제작"){
										htmlString += new_num;
									}
									htmlString += '</span></td>'+
								'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;"></span></td>'+
								'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"></span></td>'+
								'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"></span></td>'+
				                 '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
				                 	jnji +'</span></td>'+
				            '</tr>';
					}
				});
			}
			$("#table_reprint").html(htmlString);
		}
	});
}

function setTjanh (temp_tjanh){
	switch (temp_tjanh)
	{
		case "1":
			tjanh = "무선";
			break;
		case "2":
			tjanh = "반양장";
			break;
		case "3":
			tjanh = "절공";
			break;
		case "4":
			tjanh = "양장";
			break;
		case "5":
			tjanh = "중철";
			break;
		case "6":
			tjanh = "중미싱";
			break;
		case "7":
			tjanh = "스프링";
			break;
		case "8":
			tjanh = "PUR";
			break;
	}
	
	return tjanh;
}


//발주서
function SelBalju(code, date1, date2){ //발주서 //제품이랑 잡물이랑 나누기 code 분리 SelJpBalju SelJmBalju
	//제품
	if(code == 1){
		var arr_size = 0;
		var cust = new Array();
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_bal_cust_list",
			async: false,
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					cust[arr_size] = new Array (data["wccode"], data["wcname"], data["wcjob"], 0);
					
					arr_size++;
				}
			}
		});
		var from = { bdate1: date1, bdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_bal_count_list",
			data : JSON.stringify(from),
			success: function (result2) {
				logNow(result2);
					
				var object_num = Object.keys(result2);
				htmlString = "";
				for(var i in object_num){
					var data = result2[object_num[i]]; 
					
					for (var j = 4 ; j < 15 ; j++){
						var temp = "";
						if(j == 4) temp = "m2"; if(j == 5) temp = "m3"; if(j == 6) temp = "m31"; if(j == 7) temp = "m32"; if(j == 8) temp = "m33"; if(j == 9) temp = "m34"; 
						if(j == 10) temp = "m4"; if(j == 11) temp = "m5"; if(j == 12) temp = "m6"; if(j == 13) temp = "m7"; if(j == 14) temp = "m8";   
						var ccode = data[temp];
						if (ccode){
							var ar_index = 0;
							while (ar_index < arr_size){
								if (ccode == cust[ar_index][0]){
									cust[ar_index][3]++;
									break;
								}
								ar_index++;
							}
						}
					}
				}
			}
		});
		
		htmlString = 
			'<tr>'+
				'<td width="100" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">년월일</span></td>'+
				'<td width="440" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
				'<td width="115" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
				'<td width="120" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">건수</span></td>'+
			'</tr>';
		
		for(var i = 0 ; i < arr_size ; i++){
			if (cust[i][3] == 0) continue;
			var full_date = $("select[name=ty]").val() + "-" + $("select[name=tm]").val() + "-" + $("select[name=td]").val();
			
			var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
			day = parseInt($("select[name=td]").val()) + 1;
			day = day >= 10 ? day : '0' + day;
			var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
			
		    htmlString += 
		    	'<tr>'+
					'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
					'<td style="padding-left:10px;" width="440" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SelBaljuDetail(1,'+ cust[i][0] + ",'" + cust[i][2] + "'," + date1 + ',' + date2 +');">'+ cust[i][1] +'&nbsp;&nbsp;&nbsp;('+ cust[i][0] +')</a></span></td>'+
					'<td width="115" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][2] +'</span></td>'+
					'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][3] +'</span></td>'+
				'</tr>';
		}
		$("#jpBalData").html(htmlString);
	}
	
	//잡물
	if(code == 2){
		var arr_size = 0;
		var cust = new Array();
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/jmjejak/select_bal_cust_list",
			async: false,
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					cust[arr_size] = new Array (data["wccode"], data["wcname"], data["wcjob"], 0);
					
					arr_size++;
				}
			}
		});
		//
		var from = { tdate1: date1, tdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jmjejak/select_bal_count_list",
			data : JSON.stringify(from),
			success: function (result2) {
				logNow(result2);
					
				var object_num = Object.keys(result2);
				htmlString = "";
				for(var i in object_num){
					var data = result2[object_num[i]]; 
					
					for (var j = 10 ; j < 23 ; j++){
						var temp = "";
						if(j == 10) temp = "m2"; if(j == 11) temp = "m3"; if(j == 12) temp = "m31"; if(j == 13) temp = "m32"; if(j == 14) temp = "m33"; if(j == 15) temp = "m34"; 
						if(j == 16) temp = "m4"; if(j == 17) temp = "m5";  if(j == 18) temp = "m6"; if(j == 19) temp = "m7"; if(j == 20) temp = "m8"; if(j == 21) temp = "m9"; if(j == 22) temp = "m10";   
						var ccode = data[temp];
						if (ccode){
							var ar_index = 0;
							while (ar_index < arr_size){
								if (ccode == cust[ar_index][0]){
									cust[ar_index][3]++;
									break;
								}
								ar_index++;
							}
						}
					}
				}
			}
		});
		
		htmlString= "";
		for(var i = 0 ; i < arr_size ; i++){
			if (cust[i][3] == 0) continue;
			var full_date = $("select[name=ty]").val() + "-" + $("select[name=tm]").val() + "-" + $("select[name=td]").val();
			
			var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
			day = parseInt($("select[name=td]").val()) + 1;
			day = day >= 10 ? day : '0' + day;
			var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
			
		    htmlString += 
		    	'<tr>'+
					'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
					'<td style="padding-left:10px;" width="440" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SelBaljuDetail(2,'+ cust[i][0] + ",'" + cust[i][2] + "'," + date1 + ',' + date2 +');">'+ cust[i][1] +'&nbsp;&nbsp;&nbsp;('+ cust[i][0] +')</a></span></td>'+
					'<td width="115" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][2] +'</span></td>'+
					'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][3] +'</span></td>'+
				'</tr>';
		}
		$("#jmBalData").html(htmlString);
	}
}

function SelBaljuDetail(code, ccode, ctype, date1, date2){  //발주서 디테일 //제품이랑 잡물이랑 나누기 code 분리 
	if(code == 1){//제품
		$('#jejak_detail_view').html(jmenu4("발주서_디테일"));
		
		var from = { ccode: ccode }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_bal_list3",
			data : JSON.stringify(from),
			success: function (result) {
				
				var full_date = MsToFulldate(date1);
				var email = result[0]["wcemail"];
				
				(document.getElementById("wcname")).innerHTML = result[0]["wcname"];
				(document.getElementById("full_date")).innerHTML = full_date.substring(0,4) + " 년 "+ full_date.substring(4,6) + " 월 " + full_date.substring(6,8) + " 일";
				
			}
		});
		
		htmlString =
			'<tr>'+
	            '<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="50"><p><span style="font-size:9pt;">도서코드</span></p></td>'+
				'<td width="165" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
	            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
				'<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
	            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
	            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
	            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>';
		
		if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")){
			htmlString +=
					'<td width="285" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">내용</span></td>'+
		            '<td width="100" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>'+
		        '</tr>';
		}else{
			htmlString +=
					'<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄<br>완료일</span></td>'+
		            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고일</span></td>'+
		            '<td width="50" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>'+
		            '<td width="250" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">내용</span></td>'+
		        '</tr>';
		}
		
		var from = { bdate1: date1, bdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_bal_list4",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; // json data
					
					if((ctype != "제본") && (data["bucode"])) continue;
					if((data["m2"] == ccode) || (data["m3"] == ccode) || (data["m4"] == ccode) || (data["m5"] == ccode) || (data["m6"] == ccode) || (data["m7"] == ccode) || (data["m8"] == ccode) || (data["m9"] == ccode)){
						var from = { listid: data["listid"] }
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: SETTING_URL + "/jpjejak/select_bal_list5",
							data : JSON.stringify(from),
							success: function (result2) {
								logNow(result2);
								var object_num = Object.keys(result2);
								
								for(var i in object_num){
									var data2 = result2[object_num[i]]; // json data
									
									var sin = ""; var bigo = "";
									
									if (data2["btype"] == 1) sin = "신간";
									else sin = "재판";
									if ((ccode.toString()).substring(0,1)== "2"){
									    if (data2["tbigo"]) bigo = data2["tbigo"];
							            else{
							                switch(data2["sbcoti"]){
							                    case 1:
							                        bigo = "유광"; break;
							                    case 2:
							                        bigo = "무광"; break;
							                    case 3:
							                        bigo = "홀로그램"; break;
												case 4:
							                        bigo = "홀로그램(크리스탈)"; break;
							                    case 5:
							                        bigo = "엠보싱";  break;
												case 7:
							                        bigo = "무광에폭시"; break;
												case 8:
							                        bigo = "유광에폭시"; break;
							                }
											switch(data2["sbcoti2"]){
							                    case 7:
							                        bigo = "무광 후 유광에폭시"; break;
							                    case 8:
							                        bigo = "유광 후 무광에폭시"; break;
							                }
							            }
							        }else bigo = data2["sbbigo"];
									
									if (data["bucode"]){
										var janh = CheckJANH(data2["sbsbjh" + data["bucode"]]);
										var myun = data2["sbsbpg" + data["bucode"]];
									}else{
										var janh = CheckJANH(data2["sbjanh"]);
										var myun = data2["bmyun"];
									}
									
									if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")){ //코팅, 스티커는 입고처 표시
										htmlString += 
											'<tr>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bcode"] +'</span></td>'+
							                    '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data2["bname"] +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ sin +'</span></td>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bpanh"] +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ janh +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(myun) +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["bnum"]) +'</span></td>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:266px;" name="comm[]" value="'+ bigo +'"></span></td>'+
							                    '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:90px;" name="wname[]" value="'+ data["wcname"] +'"></span></td>'+
							                '<tr>';
									}else{
										htmlString += 
											'</tr>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bcode"] +'</span></td>'+
												'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data2["bname"] +'</span></td>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ sin +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bpanh"] +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ janh +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(myun) +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["bnum"]) +'</span></td>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							                    	'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:36px;" name="pwan" maxlength="4" value="'+ data["pwan"] +'" onKeypress="if(event.keyCode == 13){javascript:upBaljuDocument(this, '+ data2["uid"] +');}"></span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							                    	'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:36px;" name="iwan" maxlength="4" value="'+ data["iwan"] +'" onKeypress="if(event.keyCode == 13){javascript:upBaljuDocument(this, '+ data2["uid"] +');}"></span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
													if((janh == "중철") && (data["bucode"])){
														htmlString += 
															'<select name="ip2[]" size="1" style="width:30pt;">'+
										                        '<option value="본사">본사</option>'+
										                        '<option value="장곡">장곡</option>'+
																'<option value="민성" selected>민성</option>'+
										                        '<option value="영글">영글</option>'+
																'<option value="태산">태산</option>'+
																'<option value="중앙">중앙</option>'+
									                        '</select>';
													}else{
														htmlString += 
															'<select name="ip2[]" size="1" style="width:30pt;">'+
										                        '<option value="본사"'; if(data2["sbipgo"] == "본사") htmlString += ' selected'; htmlString += '>본사</option>'+
										                        '<option value="장곡"'; if(data2["sbipgo"] == "장곡") htmlString += ' selected'; htmlString += '>장곡</option>'+
																'<option value="민성"'; if(data2["sbipgo"] == "민성") htmlString += ' selected'; htmlString += '>민성</option>'+
										                        '<option value="영글"'; if(data2["sbipgo"] == "영글") htmlString += ' selected'; htmlString += '>영글</option>'+
																'<option value="태산"'; if(data2["sbipgo"] == "태산") htmlString += ' selected'; htmlString += '>태산</option>'+
																'<option value="중앙"'; if(data2["sbipgo"] == "중앙") htmlString += ' selected'; htmlString += '>중앙</option>'+
									                        '</select>';
													}
							                        htmlString += '</span>'+
							                    '</td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:246px;" name="comm[]" value="'+ bigo +'"></span></td>'+
							                '</tr>';
									}
								}
								$("#jpBalDetailData").html(htmlString);
							}
						});
						
						var htmlString_button;
						if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")){
							htmlString_button =
								'<center>'+
								'<input type="button" value=" 인 쇄 " onClick="javascript:PrintIt();">'+
								'&nbsp;&nbsp;'+
								'<input type="button" value=" email " onClick="javascript:MailIt();">'+
							'</center>';
						} else {
							htmlString_button =
								'<center>'+
								'<input type="button" value=" 인 쇄 " onClick="javascript:PrintIt2();">'+
								'&nbsp;&nbsp;'+
								'<input type="button" value=" email " onClick="javascript:MailIt();">'+
							'</center>';
						}
						
						$("#balju_button").html(htmlString_button);
					}
				}
			}
		});
	}
	if(code == 2){//잡물 
		$('#jejak_detail_view').html(jmenu5("발주서_디테일"));
		htmlString = "";
		htmlString += 
			'<tr>'+
		        '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="50"><p><span style="font-size:9pt;">도서코드</span></p></td>'+
		        '<td width="200" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>';
			if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")) htmlString += // 코팅, 스티커는 입고처 표시
				'<td width="150" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">비고</span></td>'+
				'<td width="100" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>';
			else htmlString +=
				'<td width="250" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">비고</span></td>'; htmlString +=
			'</tr>'+
			
		$("#jmBalDetailData1").html(htmlString);
			
		var from = { ccode: ccode }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jmjejak/select_bal_list3",
			data : JSON.stringify(from),
			success: function (result) {
				var full_date = MsToFulldate(date1);
						
				(document.getElementById("wcname")).innerHTML = result[0]["wcname"];
				(document.getElementById("full_date")).innerHTML = full_date.substring(0,4) + " 년 "+ full_date.substring(4,6) + " 월 " + full_date.substring(6,8) + " 일";
				
			}
		});
		
		var from = { tdate1: date1, tdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jmjejak/select_bal_list4",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					if((data["m2"] == ccode) || (data["m3"] == ccode) || (data["m5"] == ccode) || (data["m6"] == ccode) || (data["m8"] == ccode)){
						var from = { jbcode: data["jbcode"] }
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: SETTING_URL + "/jmjejak/select_bal_list5",
							data : JSON.stringify(from),
							success: function (result2) {
								logNow(result2);
								var object_num = Object.keys(result2);
								
								for(var i in object_num){
									var data2 = result2[object_num[i]]; 
									
									if ((ccode.toString()).substring(0,1)== "2"){   
									    if (data2["tbigo"]) bigo = data2["tbigo"]; //tbigo가 없는걸 .... 이상해..
							            else{
							                switch(data2["sbcoti"]){
							                    case 1:
							                        bigo = "유광"; break;
							                    case 2:
							                        bigo = "무광"; break;
							                    case 3:
							                        bigo = "홀로그램"; break;
							                }
							            }
							        }else bigo = data2["sbbigo"];
									janh = CheckJANH(data2["sbjanh"]);
									
									htmlString +=
										'<tr>'+
								            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
								            '<td width="200" height="30" align="left" style="padding-left:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jbname"] +'</span></td>'+
								            '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jbpanh"] +'</span></td>'+
								            '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ janh +'</span></td>'+
								            '<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jbpage"] +'</span></td>'+
								            '<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["jbamnt"]) +'</span></td>';					
								        if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")) htmlString += // 코팅, 스티커는 입고처 표시
								            '<td width="150" height="30" align="left" style="padding-left:5" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:140px;" name="comm[]" value="'+ bigo +'"></span></td>'+
								            '<td width="100" height="30" align="left" style="padding-left:5" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:90px;" name="wname[]" value="'+ data["wcname"] +'"></span></td>';
								        else htmlString +=
								            '<td width="250" height="30" align="left" style="padding-left:10" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:170px;" name="comm[]" value="'+ bigo +'"></span></td>'; htmlString +=
								        '</tr>';
								}
								$("#jmBalDetailData2").html(htmlString);
							}
						});
					}
				}
			}
		});
	}
}

function CheckJANH(jhcode){ //SelBaljuDetail
	switch (parseInt(jhcode)){
		case 1:
			var t_jan = "무선"; break;
		case 2:
			var t_jan = "반양장"; break;
		case 3:
			var t_jan = "절공"; break;
		case 4:
			var t_jan = "양장"; break;
		case 5:
			var t_jan = "중철"; break;
		case 6:
			var t_jan = "중미싱"; break;
		case 7:
			var t_jan = "스프링"; break;
		case 8:
			var t_jan = "PUR"; break;
	}
	return t_jan;
}

//검증필요_ update 포함됨
function upBaljuDocument(document, uid){
	var add_url = "";
	var json_data;
	
	if("pwan" == document.name){
		add_url = "/jpjejak/update_bal_pwan";
		json_data = { uid: uid, pwan: document.value };
	} else if("iwan" == document.name){
		add_url = "/jpjejak/update_bal_iwan";
		json_data = { uid: uid,  iwan: document.value };
	}
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		async: false,
		url: SETTING_URL + add_url,
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
}

//표지작업지시서
function SelPyoji(code, date1, date2){ //제품이랑 잡물이랑 나누기 code 분리
	if(code == 1){//제품
		var from = { bdate1: date1, bdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_jppyo_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
					
				var object_num = Object.keys(result);
				htmlString =
					'<tr>'+
						'<td width="270" align="center" valign="middle" bgcolor="#F4F4F4" height="50" rowspan="2"><p><span style="font-size:9pt;">건명</span></p></td>'+
						'<td width="50" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">제작<br>구분</span></td>'+
						'<td width="50" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">부수</span></td>'+
						'<td width="50" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">구분</span></td>'+
						'<td width="180" height="25" align="center" valign="middle" bgcolor="#F4F4F4" colspan="3"><span style="font-size:9pt;">용지사용</span></td>'+
						'<td width="30" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">색도</span></p></td>'+
						'<td width="50" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">작업<br>인계처</span></p></td>'+
						'<td width="80" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">정가</span></p></td>'+
						'<td width="120" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">비고</span></p></td>'+
					'</tr>'+
					'<tr>'+
						'<td width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">지질</span></td>'+
						'<td width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정미</span></td>'+
						'<td width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">여분</span></td>'+
					'</tr>';
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var yakc = ""; var comment = "";
					var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0; 
					
					if (((data["bcode"] >='113010') && (data["bcode"] <='113019')) && (data["gubn"] == "면지")) comment = "앞면지+뒷면지";
					if (((data["bcode"] >='113010') && (data["bcode"] <='113019')) && (data["gubn"] == "화보")) comment = "화보 5대";
						
					jnum1 = Math.floor(data["jm"] / 500);
					jnum2 = data["jm"] % 500;
					ynum1 = Math.floor(data["yb"] / 500);
					ynum2 = data["yb"] % 500;
					
					if(data["gubn"] == "표지"){
						var from = {wccode: data["m2"]}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: SETTING_URL + "/jpjejak/select_selYakc",
							data : JSON.stringify(from),
							success: function (result2) {
								yakc = result2["wcyakc"];
								if(!yakc){
									logNow("값 없음");
									var from = {wccode: data["m3"]}
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										async: false,
										url: SETTING_URL + "/jpjejak/select_selYakc",
										data : JSON.stringify(from),
										success: function (result3) {
											yakc = result3["wcyakc"];
										}
									});
								}
							}
						});
					}else{
						var query_data = "";
						if (((data["bcode"] == "124910") && (data["gubn"] == "면지")) || ((data["bcode"] == "124920") && (data["gubn"] == "면지")) || ((data["bcode"] == "124930") && (data["gubn"] == "면지")) || ((data["bcode"] == "124940") && (data["gubn"] == "면지")) || ((data["bcode"] == "124950") && (data["gubn"] == "면지")) || ((data["bcode"] == "124960") && (data["gubn"] == "면지1")) || ((data["bcode"] == "124970") && (data["gubn"] == "면지1")) || ((data["bcode"] == "124980") && (data["gubn"] == "면지1"))){
							query_data = data["m5"];
						}else{
							if (((data["bcode"] == "124710") && (data["gubn"] == "면지")) || ((data["bcode"] == "124720") && (data["gubn"] == "면지")) || ((data["bcode"] == "124730") && (data["gubn"] == "면지")) || ((data["bcode"] == "124740") && (data["gubn"] == "면지")) || ((data["bcode"] == "124750") && (data["gubn"] == "면지")) || ((data["bcode"] == "124760") && (data["gubn"] == "면지")) || ((data["bcode"] == "124770") && (data["gubn"] == "면지"))|| ((data["bcode"] == "124780") && (data["gubn"] == "면지")) || ((data["bcode"] == "124790") && (data["gubn"] == "면지")) || ((data["bcode"] == "124800") && (data["gubn"] == "면지")) || ((data["bcode"] == "124810") && (data["gubn"] == "면지")) || ((data["bcode"] == "124820") && (data["gubn"] == "면지")) || ((data["bcode"] == "124830") && (data["gubn"] == "면지")) || ((data["bcode"] == "124840") && (data["gubn"] == "면지")) || ((data["bcode"] == "124850") && (data["gubn"] == "면지")) || ((data["bcode"] == "124860") && (data["gubn"] == "면지")) || ((data["bcode"] == "124870") && (data["gubn"] == "면지")) || ((data["bcode"] == "124880") && (data["gubn"] == "면지")) || ((data["bcode"] == "124890") && (data["gubn"] == "면지")) || ((data["bcode"] == "124900") && (data["gubn"] == "면지"))){
								query_data = data["m3"];
							}else{
								if ((data["m12"] != "N") && (((data["bcode"] == "124810") && (data["gubn"] == "별지")) || (data["bcode"] != "124810")) && (((data["bcode"] == "124820") && (data["gubn"] == "별지")) || (data["bcode"] != "124820")) && (((data["bcode"] == "124830") && (data["gubn"] == "별지")) || (data["bcode"] != "124830")) && (((data["bcode"] == "124840") && (data["gubn"] == "별지")) || (data["bcode"] != "124840")) && (((data["bcode"] == "124850") && (data["gubn"] == "별지")) || (data["bcode"] != "124850")) && (((data["bcode"] == "124860") && (data["gubn"] == "별지")) || (data["bcode"] != "124860")) && (((data["bcode"] == "124870") && (data["gubn"] == "별지")) || (data["bcode"] != "124870")) && (((data["bcode"] == "124880") && (data["gubn"] == "별지")) || (data["bcode"] != "124880")) && (((data["bcode"] == "124890") && (data["gubn"] == "별지")) || (data["bcode"] != "124890")) && (((data["bcode"] == "124900") && (data["gubn"] == "별지")) || (data["bcode"] != "124900"))){
									query_data = data["m12"];
									comment = "도무송작업";
								}else{
									if ((data["m13"] == "N") || (data["bcode"] == "124780")){
										query_data = data["m3"];
									}else{
										query_data = data["m13"];
										comment = "도무송작업";
									}
								}
							}
						}
						var from = {
							wccode: query_data
						}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: SETTING_URL + "/jpjejak/select_selYakc",
							data : JSON.stringify(from),
							success: function (result4) {
								yakc = result4["wcyakc"];
							}
						});
					}
						
					if (data["bcode"] == "211200") comment = "표지코팅없음";
						
					htmlString += 
						'<tr>'+
							'<td width="270" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;'+ data["bname"] + ' - ' + data["bcode"] +'</span></td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data["btype"] == 1) htmlString += '신간'; else htmlString += '재판'; htmlString += '</span></td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["bnum"]) +'</span></td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gubn"] +'</span></td>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jname"] +'</span></td>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jnum1 + ' R ' + jnum2 +'</span></td>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ ynum1 + ' R ' + ynum2 +'</span></td>'+
							'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
								'<input type="text" size="1" value="'+ data["colo"] +'" onKeypress="if(event.keyCode == 13){javascript:upPyojiDocument(this.value, '+ data["uid"] +');}"></span>'+
							'</td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ yakc +'</span></td>'+
							'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(data["sbuprc"]) +'&nbsp;'; if (data["btype"] == 3) htmlString += '※'; else htmlString += '&nbsp;&nbsp;&nbsp;'; htmlString += '</span></td>'+
							'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
								'<INPUT style="font-family:굴림; font-size:9pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:118px;" name="comm[]" value="'+ comment +'"></span>'+
							'</td>'+
						'</tr>';
				}
				$("#jpPyoData").html(htmlString);
			}
		});
	}
	if(code == 2){//잡물
		var from = { tdate1: date1, tdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jmjejak/select_jmpyo_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
						
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var yakc = ""; var comment = ""; var query_data = "";
					var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0; 
					
					jnum1 = Math.floor(data["jm"] / 500);
					jnum2 = data["jm"] % 500;
					ynum1 = Math.floor(data["yb"] / 500);
					ynum2 = data["yb"] % 500;
						
					if ((data["m2"] != 'N') && (data["gubn"] == "표지")) query_data = data["m2"];
					else query_data = data["m3"];
					
					var from = {wccode: query_data}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/jpjejak/select_selYakc",
						data : JSON.stringify(from),
						success: function (result2) {
							logNow(result2);
							yakc = result2["wcyakc"];
						}
					});
					
					htmlString += 
						'<tr>'+
						'<td width="200" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;'+ data["jbname"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["jbamnt"]) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gubn"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["yjname"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jnum1 + " R " + jnum2 +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ ynum1 + " R " + ynum2 +'</span></td>'+
						'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbjlsu"] +'</span></td>'+
						'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["colo"] +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ yakc +'</span></td>'+
						'<td width="180" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							'<INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:170px;" name="comm[]"></span>'+
						'</td>'+
					'</tr>';
				}
				$("#jmPyoData").html(htmlString);
			}
		});
	}
}

//검증필요_ update 포함됨
function upPyojiDocument(value, uid){
	var json_data = { uid: uid,  colo: value };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		async: false,
		url: SETTING_URL + "/jpjejak/update_jppyo_colo",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
}

//본문작업지시서
function SelBonmun(code, date1, date2, lm_s, lm_t){ //제품이랑 잡물이랑 나누기 code 분리
	if(code == 1){//제품제작
		var from = { bdate1: date1, bdate2: date2, lm_s: lm_s, lm_t: lm_t }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_jpbon_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				htmlString =
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;">번호</span></p></td>'+
						'<td width="100" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작일</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서코드</span></td>'+
						'<td width="360" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
						'<td width="84" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄</span></td>'+
						'<td width="84" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제본</span></td>'+
					'</tr>';
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["bdate"]);
					full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
						
					htmlString +=
						'<tr>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] + '-' + data["bucode"] +'</span></td>'+
							'<td width="360" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">&nbsp;&nbsp;<a href="javascript:SelBonmunDetail(1, '+ data["uid"] +')" class="n">'+ data["bname"] +'</a></span></p></td>'+
							'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["temp1"] + '</span></td>'+
							'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["temp2"] + '</span></td>'+
						'</tr>';
				}
				$("#jpBonData").html(htmlString);
			}
		});
	}
	if(code == 2){// 잡물제작
		var from = { tdate1: date1, tdate2: date2, lm_s: lm_s, lm_t: lm_t }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jmjejak/select_jmbon_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
						
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["jbdate"]);
					full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
						
					htmlString += 
						'<tr>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
							'<td width="360" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">&nbsp;&nbsp;<a href="javascript:SelBonmunDetail(2, '+ data["uid"] +')" class="n">'+ data["jbname"] +'</a></span></p></td>'+
							'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data["temp1"]) htmlString += data["temp1"]; htmlString += '</span></td>'+
							'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data["temp2"]) htmlString += data["temp2"]; htmlString += '</span></td>'+
						'</tr>';
				}
				$("#jmBonData").html(htmlString);
			}
		});
	}
}

function SelBonmunDetail(code, uid){ //본문작업지시서 디테일 //제품이랑 잡물이랑 나누기 code 분리
	if(code == 1){ //제품
		$('#jejak_detail_view').html(jmenu4("본문작업지시서_디테일"));
		var bucode;
		var from = { uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_jpbon_list2",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				htmlString = "";
				
				var data = result[0]; 
				
				$('input[name=uid]').val(uid);
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "년 " + full_date.substring(4,6) + "월 " + full_date.substring(6,8) + "일";
				
				if (data["btype"] == 1) var typegubn = "신간";
				else var typegubn = "재판";
				
				var tbcode = data["bcode"].substring(0,5);
				var comment = "";
				comment = data["t3bigo"];
				if ((tbcode >= '12471') && (tbcode <= '12479')) comment += "본문 1대 우영테크"; // 음악가 친구 비발디
				if ((tbcode >= '12481') && (tbcode <= '12490')) comment += "인계처 : 우영테크 \n\n 본문 1대 미싱작업"; // NEW 음악가 친구
				
				(document.getElementById("wcname2")).innerHTML = data["wcname2"];
				(document.getElementById("bdate")).innerHTML = full_date;
				(document.getElementById("bname")).innerHTML = data["bname"];
				bucode = data["bucode"];
				if (data["bucode"] > 0){
            		if (data["bucode"] == 5) (document.getElementById("bucode")).innerHTML = "  -  본문2";
            		else (document.getElementById("bucode")).innerHTML = "  -  " + data["bucode"];
            	}
				(document.getElementById("jname_jcode")).innerHTML = data["jname"] + " - " + data["jcode"];
				(document.getElementById("pannum5")).innerHTML = data["pannum5"];
				(document.getElementById("typegubn")).innerHTML = typegubn;
				(document.getElementById("bnum")).innerHTML = data["bnum"];
				(document.getElementById("comment")).innerHTML = comment;
				if (data["pwan"] == "급") (document.getElementById("pwan")).innerHTML = "급";
				else (document.getElementById("pwan")).innerHTML = data["pwan"].substring(0,2) + "월 " + data["pwan"].substring(2,4) + "일";
				(document.getElementById("wcname")).innerHTML = data["wcname"];
			}
		});
		
		var from = { uid: uid, bucode: bucode}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_jpbon_list3",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0;  var rec_num = 0;
	 			htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					rec_num++;
					t1 = Math.floor(data["jm"] / 500);
					t2 = data["jm"] % 500;
					t3 = Math.floor(data["yb"] / 500);
					t4 = data["yb"] % 500;
					
					htmlString +=
						'<tr>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gb"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["dae"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM1[]" value="'+ t1 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM2[]" value="'+ t2 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB1[]" value="'+ t3 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB2[]" value="'+ t4 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:40px;" name="COLO[]" value="'+ data["colo"] +'"></span></td>'+
			                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:320px;" name="T4BIGO[]" value="'+ data["t4bigo"] +'"></span></td>'+
			            '</tr>'+
						'<input type="hidden" name="uids[]" value="'+ data["uid"] +'">';
				}
				if(rec_num < 20){
					var t_num = 20 - rec_num;
					for(var i = 0; i < t_num; i++){
						htmlString +=
							'<tr>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
				            '</tr>';
					}
				}
				$("#jpBonDetailData").html(htmlString);
			}
		});
		
		var from = { uid: uid, bucode: bucode}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/select_jpbon_list4",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0; var t5 = 0; var t6 = 0; var tta = 0; 
	 			htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					t1 += Math.floor(data["jm"] / 500);
					t2 += data["jm"] % 500;
					t3 += Math.floor(data["yb"] / 500);
					t4 += data["yb"] % 500;
					tta += data["jm"] + data["yb"];
				}
				t5 = Math.floor(tta / 500);
				t6 = tta % 500;
				
				$('input[name=SU1]').val(t1);
				$('input[name=SU2]').val(t2);
				$('input[name=SU3]').val(t3);
				$('input[name=SU4]').val(t4);
				$('input[name=SU5]').val(t5);
				$('input[name=SU6]').val(t6);
			}
		});
	}
	
	if(code == 2){ //잡물 
		$('#jejak_detail_view').html(jmenu5("본문작업지시서_디테일"));
		var from = { uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jmjejak/select_jmbon_list2",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0; var t5 = 0; var t6 = 0;
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["jbdate"]);
					full_date = full_date.substring(0,4) + "년 " + full_date.substring(4,6) + "월 " + full_date.substring(6,8) + "일";
					
					t1 = Math.floor(data["jm"] / 500);
					t2 = data["jm"] % 500;
					t3 = Math.floor(data["yb"] / 500);
					t4 = data["yb"] % 500;
					var tta = data["jm"] + data["yb"];
					t5 = Math.floor(tta / 500);
					t6 = tta % 500;
					
					(document.getElementById("wcname2")).innerHTML = data["wcname2"];
					(document.getElementById("jbdate")).innerHTML = full_date;
					(document.getElementById("jbname")).innerHTML = data["jbname"];
					(document.getElementById("yjname_yjcode")).innerHTML = data["yjname"] + " - " + data["yjcode"];
					(document.getElementById("pannum5")).innerHTML = data["pannum5"];
					(document.getElementById("jbamnt")).innerHTML = data["jbamnt"];
					(document.getElementById("comment")).innerHTML = data["t3bigo"];
					(document.getElementById("wcname")).innerHTML = data["wcname"];
					
					$('input[name=SU1]').val(t1);
					$('input[name=SU2]').val(t2);
					$('input[name=SU3]').val(t3);
					$('input[name=SU4]').val(t4);
					$('input[name=SU5]').val(t5);
					$('input[name=SU6]').val(t6);
				}
			}
		});
		
		var from = { uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jmjejak/select_jmbon_list3",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0;  var rec_num = 0;
	 			htmlString = "";
				for(var i in object_num){
					var data = result[i]; 
					
					rec_num++;
					t1 = Math.floor(data["jm"] / 500);
					t2 = data["jm"] % 500;
					t3 = Math.floor(data["yb"] / 500);
					t4 = data["yb"] % 500;
					
					htmlString +=
						'<tr>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gb"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["dae"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM1[]" value="'+ t1 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM2[]" value="'+ t2 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB1[]" value="'+ t3 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB2[]" value="'+ t4 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["colo"] +'</span></td>'+
			                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:320px;" name="T4BIGO[]" value="'+ data["t4bigo"] +'"></span></td>'+
			            '</tr>';
				}
				if(rec_num < 20){
					var t_num = 20 - rec_num;
					for(var i = 0; i < t_num; i++){
						htmlString +=
							'<tr>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
				            '</tr>';
					}
				}
				$("#jpBonDetailData").html(htmlString);
			}
		});
	}
}

//검증필요_ update 포함됨
function upBonmun(){
	var ins_id = 0;
	var old_jm = 0;
	var old_yb = 0;
	var listid = 0;
	var jicode = "";
	
	var json_data = { uid: $('input[name=uid]').val() };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_jpbon_detail1",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
			
			ins_id = result["uid"];
			old_jm = result["jm"];
			old_yb = result["yb"];
			listid = result["listid"];
			jicode = result["jcode"];
		}
	});
	
	var sum1 = 0;
	var sum2 = 0;
	
	var new_jm = 0;
	var new_yb = 0;
	
	for(var i = 0; i < $('input[name="JM1[]"]').length; i++){
		new_jm = ($('input[name="JM1[]"]')[i].value * 500) + $('input[name="JM2[]"]')[i].value;
		new_yb = ($('input[name="YB1[]"]')[i].value * 500) + $('input[name="YB2[]"]')[i].value;
		sum1 += parseInt(new_jm);
		sum2 += parseInt(new_yb);
		
		var json_data = { jm: new_jm, yb: new_yb, colo: $('input[name="COLO[]"]')[i].value, t4bigo: $('input[name="T4BIGO[]"]')[i].value, uid: $('input[name="uids[]"]')[i].value };
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/jpjejak/update_jpbon_detail2",
			data : JSON.stringify(json_data),
			success: function (result) {
				logNow(result);
			}
		});
	}
	
	var comm = addslashes($('input[name=comm]').val());
	var new_rnum = Math.floor(sum1 / 500);
	var new_rnum2 = sum1 % 500;
	if(new_rnum2 > 0){
		if(new_rnum2 <= 250){
			new_rnum += 0.5;
		} else {
			new_rnum += 1;
		}
	}
	
	var json_data = { jm: sum1, yb: sum2, rnum: new_rnum, t3bigo: comm, uid: ins_id };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/update_jpbon_detail3",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
	
	var crnum = 0;
	var json_data = { uid: listid };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_jpbon_detail4",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
			
			crnum = result["crnum"];
		}
	});
	
	var new_jm = sum1;
	var new_yb = sum2;
	var tnum = (-1) * (old_jm * old_yb);
	
	var new_id = 0;
	var jeon_num = 0;
	var new_date = "";
	
	var new_curno = 0;
	
	var json_data = { jicode: jicode, jeuid: crnum, num: tnum };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_jpbon_detail5",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
			
			new_id = result["uid"];
			jeon_num = result["jeon"];
			new_date = MsToFulldate(result["date"]).substring(2, 4);
			
			new_curno = result["curno"] + old_jm + old_yb - new_jm - new_yb;
		}
	});
	
	var new_num = new_jm + new_yb;
	var new_num2 = (new_jm + new_yb) * (-1);
	
	var json_data = { num: new_num2, curno: new_curno, uid: new_id };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/update_jpbon_detail6",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
	
	var json_data = { value: new_date, jnum1: new_jm, jnum2: new_yb, jsum: new_num, uid: jeon_num };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/update_jpbon_detail7",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
	
	var json_data = { jicode: jicode, uid: new_id };
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_jpbon_detail8",
		data : JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[i]; 
				
				new_curno += data["num"];
				var json_data = { curno: new_curno, uid: data["uid"] };
				
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: SETTING_URL + "/jpjejak/update_jpbon_detail9",
					data : JSON.stringify(json_data),
					success: function (result) {
						logNow(result);
					}
				});
			}
		}
	});
}

//입고대장
function SelJpWarehousing(bdate1, bdate2){
	var from = { bdate1: bdate1, bdate2: bdate2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_selWarehousing",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
				
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(2,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
				
				htmlString += 
					'<tr>'+
						'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["bname"] +'</span></td>'+
						'<td width="40" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">';
						if(data["btype"] == 1) htmlString += '신간'; else htmlString += '재판'; htmlString += '</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["bnum"]) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ full_date +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ data["iwan"].substring(0,2) + '.' + data["iwan"].substring(2,4) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"></span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"></span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ data["wcname"] +'</span></td>'+						
						'</tr>';
			}
			$("#jpdeaData").html(htmlString);
		}
	});
}

//제작예정리스트 열람
function SelJpJejakYejung(signdate, lm_s, lm_t){
	$("#JpYejungData").html("");
	
	var xxx = signdate.substring(4,6);
	full_date = signdate.substring(0,4) + " 년 " + signdate.substring(4,6) + " 월 " + signdate.substring(6,8) + " 일  ";
	(document.getElementById("time_result")).innerHTML = full_date;
	
	var from = {signdate: signdate, lm_s: lm_s, lm_t: lm_t}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_yejung2",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result); 
			
			for(var i in object_num){
				var data = result[object_num[i]];
				
				var nprice = 0;
				if (data["ncode"]) var tcode = data["ncode"];
				if (data["nprice"]) nprice = data["nprice"];
				
				htmlString =
					'<tr>'+
						'<td width="1410">'+
							'<table border="0" cellpadding="5" cellspacing="0" width="1410" bgcolor="#CCCCCC">'+
								'<tr>'+
									'<td width="1410">'+
										'<table border="0" cellspacing="1" width="1400" bgcolor="#CCCCCC" bordercolorlight="#CCCCCC" bordercolordark="white" cellpadding="0">'+
											'<tr>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">순번</span></font></td>'+
												'<td width="50" bgcolor="white" height="40" align="center" valign="middle"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">도서명</span></font></td>'+
												'<td width="300" bgcolor="white" height="40" align="left" valign="middle" colspan="3">'+
													'<table border="0" width="300">'+
														'<tr>'+
															'<td width="270" align="left"><p style="margin-left:3px;"><span style="font-size:9pt;">'+ data["bname"] +'</span></p></td>'+
															'<td width="30" align="right">&nbsp;</td>'+
														'</tr>'+
													'</table>'+
												'</td>'+
												'<td width="50" height="40" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt;"><font color="#666666">코드</font></span></td>'+
												'<td width="50" height="40" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(nprice) htmlString += tcode; else htmlString += data["bcode"]; htmlString += '</span></td>'+														
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">정가</span></font></td>'+
												'<td width="100" bgcolor="white" height="40" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'; if(nprice) htmlString += '<b><font color="red"> ' + data["bprice"] + ' </font></b>(' + nprice + ')'; else htmlString += data["bprice"]; htmlString += '</span></td>'+
												'<td width="700" bgcolor="#F6F6F6" height="40" align="left" valign="middle" colspan="14"><p><font color="#666666"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+																											
													'<input type="button" value="삭제" onClick="javascript:DelJpJejakYejung('+ data["uid"] +');">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월 별 실 판 매 수 량</span></font></p>'+
												'</td>'+													
											'</tr>'+
											'<tr>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">면수</span></font></td>'+
												'<td width="100" bgcolor="#F6F6F6" colspan="2" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주점 수량</span></font></td>'+
												'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">현 재고 수량</span></font></td>'+
												'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">판매<br>여유일</span></font></td>'+
												'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주 수량</span></font></td>'+
												'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle" colspan="2"><font color="#666666"><span style="font-size:9pt;">최초발행</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">연간<br>증감율</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">월 평균 판매</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">색도</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>실판매</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>총반입</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">01</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">02</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">03</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">04</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">05</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">06</span></font></td>'+														
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">07</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">08</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">09</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">10</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">11</span></font></td>'+
												'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">12</span></font></td>'+
											'</tr>'+
											'<tr>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bmyun"] +'</span></td>'+
												'<td width="100" bgcolor="white" colspan="2" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum1"] +'</span></td>'+
												'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum2"] +'</span></td>'+
												'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pdate"] +'</span></td>'+
												'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bnum"] +'</span></td>'+
												'<td width="100" bgcolor="white" height="30" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'+ data["pfirst"] +'</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yinc"] +'</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ppan"] +'</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bcolor"] +'</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ypan"] +'</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yban"] +'</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p1"]; if(xxx == "01") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p2"]; if(xxx == "02") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p3"]; if(xxx == "03") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p4"]; if(xxx == "04") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p5"]; if(xxx == "05") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p6"]; if(xxx == "06") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p7"]; if(xxx == "07") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p8"]; if(xxx == "08") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p9"]; if(xxx == "09") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p10"]; if(xxx == "10") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+															
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p11"]; if(xxx == "11") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
												'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p12"]; if(xxx == "12") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
											'</tr>'+
										'</table>'+
									'</td>'+
								'</tr>'+    
							'</table>'+
						'</td>'+
					'</tr>';
				
				$("#JpYejungData").append(htmlString);
			}
		}
	});
}

function DelJpJejakYejung(uid){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid: uid};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/jpjejak/delete_jp_yejung",
			data : JSON.stringify(from),
			success : function(result) {
				alert("데이터 삭제 완료");
			},
			error : function(){
			}
		});
	}
}

//제작예정리스트 등록 //여기
function AddBaljuYjJpList(uid){
	logNow(uid);
	if (!confirm("발주예정상품 목록에 추가하시겠습니까?")) return;
	
	logNow("ok");
	
	var dur_pan = 35;

	var tday = new Date().getTime()/1000;
	logNow(new Date().getTime());
	var bday = tday - (60 * 60 * 24 * 365); // 시작 - 1년전
	var bdate = MsToFulldate(bday).substring(2,4) + MsToFulldate(bday).substring(4,6) + MsToFulldate(bday).substring(6,8);
	
	var sday = bday;
	var sdate = bdate;
	var sum_all = 0; var tmp_book; var tbl_e;
	
	var row_book;
	var from = {uid : uid.toString()}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			row_book = result[0];
			tmp_book = row_book["sbbook"].substring(0,5);
			
			if((row_book["sbbook"].substring(0,2) == '03') || (row_book["sbbook"].substring(0,2) == '04')) tbl_e = "D";
			else tbl_e = "0";	
		}
	});
	
	var new_colo;
	var hey;
	var from = {wdbook : tmp_book}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if (result[0] != null){
				hey = result[Object.keys(result)];
				new_colo = result[0]["max_wdcolo"]
			}else{
				alert("대수정보 읽기 오류.");
			}
		}
	});
	
	var from = {yjdate : bday, yjbook: row_book["sbbook"]}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add3",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if(result.length > 0){ // 발매 1년 이내
				var pdate = dur_pan;
				var p_qnty = result[0]["yjqnty"];
				var pnum2 = 0;
				
				// 현재고 - 유통
				var from = {sqbook : row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add4",
					async: false,
					data : JSON.stringify(from),
					error : function (){
						alert("유통 현재고 읽기 오류");
					},
					success: function (result2) {
						if (result2[0] != null){
							pnum2 += result2[0]["sqcrnm0"];
						}
					}
				});
				
				// 현재고 - 출판사, DT
				if(tbl_e == 'D') var from = {database : "dtjejak", sqbook: row_book["sbbook"]};
				else var from = {database : "jejak", sqbook: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add5",
					async: false,
					data : JSON.stringify(from),
					error : function (){
						alert("현재고 읽기 오류 (1)");
					},
					success: function (result2) {
						if (result2[0] != null || result2.length != 0){
							pnum2 += result2[0]["sqcrnm"];
						}
					}
				});
				
				// 가입고
				if(tbl_e == 'D') var from = {database : "dtjejak", bookcode: row_book["sbbook"]};
				else var from = {database : "jejak", bookcode: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add6",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						if (result2[0] != null){
							if(result2[0]["xnum"] > 0) pnum2 += result2[0]["xnum"];
						}else{
							alert("가입고 2 읽기 오류");
						}
					}
				});
				
				var pan_s = 0;
				var ban_s = 0;
				var p1 = 0; var p2 = 0; var p3 = 0; var p4 = 0; var p5 = 0; var p6 = 0;
				var p7 = 0; var p8 = 0; var p9 = 0; var p10 = 0; var p11 = 0; var p12 = 0;
				var bk_db = "KTBKS" + MsToFulldate(bday).substring(2,4) + "0";
				var b_index = parseInt(MsToFulldate(bday).substring(4,6));
				var from = {dbname : bk_db, tbsbook: row_book["sbbook"], tbmgubn: b_index};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add7",
					async: false,
					data : JSON.stringify(from),
					error : function (){
						alert("도서집계 읽기 오류");
					},
					success: function (result2) {
						for(var ii = (b_index + 1) ; ii < 13 ; ii++){
							if(result2[0]["tbcsr"]) eval("p" + ii + " = " + (result2[0]["tbcsr"] - result2[0]["tbdsr"]) + ";");
							else eval("p" + ii + " = 0;");
							eval("pan_s += p" + ii + ";");
							ban_s += result2[0]["tbdsr"];
						}
						if(b_index > 1){ //다음해
							bk_db = "KTBKS" + MsToFulldate(bday).substring(2,4) + "0";
							var from = {dbname : bk_db, tbsbook: row_book["sbbook"], tbmgubn: b_index};
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add8",
								async: false,
								data : JSON.stringify(from),
								error : function (){
									alert("도서집계 읽기 오류");
								},
								success: function (result3) {
										for (var ii = 1 ; ii < b_index ; ii++){
											if(!(result3.length == 0 || result3 == null)) eval("p" + ii + " = " + (result3[0]["tbcsr"] - result3[0]["tbdsr"]) + ";");
											else eval("p" + ii + " = 0;");
											eval("pan_s += p" + ii + ";");
											if(!(result3.length == 0 || result3 == null))
											ban_s += result3[0]["tbdsr"];
										}
								}
							});
						}
						
						// 이번달 오늘까지
						/*여기 아직 미작업*/
						var pan_s2 = 0;
						
						//266
						// 다음해 이후
						
						if(pan_s2) new_yinc = Math.round((pan_s / pan_s2), 2);
						else new_yinc = 0;
						
						var signdate = MsToFulldate(new Date().getTime()/1000);
						new_ppan = Math.ceil(pan_s / 12);
						
						b_index--;
						if (b_index == 0) b_index = 12;
						eval("p" + b_index + ">= 20500")
						if (eval("p" + b_index + ">= 20500")) // 1개월 20500 이상
							bnum = 20500;
						else{// 3개월 10500 이상
							psum = 0;
							for (var ii = b_index ; ii > (b_index - 3) ; ii--){
								if (ii < 1) new_i = 12 + ii;
								else new_i = ii;
								eval("psum += p" + new_i);
							}if (psum >= 10500) bnum = 10500;
							else{// 6개월 5500 이상
								psum = 0;
								for (var ii = b_index ; ii > (b_index - 6) ; ii--){
									if (ii < 1) new_i = 12 + ii;
									else new_i = ii;
									eval("psum += p" + new_i);					
								}if (psum >= 5500) bnum = 5500;
								else{// 9개월 3500 이상
									psum = 0;
									for (var ii = b_index ; ii > (b_index - 9) ; ii--){
										if (ii < 1) new_i = 12 + ii;
										else new_i = ii;
										eval("psum += p" + new_i);	
									}if (psum >= 3500) bnum = 3500;
									else{// 12개월 2500 이상							
										if (pan_s >= 2500) bnum = 2500;
										else{
											if ((pan_s + pan_s2) >= 1050) bnum = 1050;
											else bnum = 500;
										}
									}
								}
							}
						}
						
						switch (row["sbcoti"]){
						    case 1:
						        tbigo = "유광"; break;
						    case 2:
						        tbigo = "무광"; break;
						    case 3:
						        tbigo = "홀로그램"; break;
						    case 5:
						        tbigo = "엠보싱";  break;
						}
					    bjulsu = parseInt(row_book["sbjlsu"]);
					    
					    //isnert
					    var from = {
					    	signdate: signdate, bname: row_book["sbname"], bcode: row_book["sbbook"], bpanh: row_book["sbpanh"], bprice: row_book["sbuprc"], 
					    	bmyun: row_book["sbpage"], pnum1: sum_all, pnum2: pnum2, ppan: new_ppan, pfirst: row_book["sbapdt"], pdate: pdate, bcolor: new_colo,
					    	yinc: new_yinc, bnum: bnum, bjulsu: bjulsu, p1: p1, p2: p2, p3: p3, p4: p4, p5: p5, p6: p6, p7: p7, p8: p8, p9: p9, p10: p10, p11: p11, p12: p12,
					    	ypan: pan_s, yban: ban_s, tbigo: tbigo
					    } 
					    $.ajax({
					    	type: "POST",
					   		contentType: "application/json; charset=utf-8;",
					   		dataType: "json",
					   		url: SETTING_URL + "/jpjejak/insert_jp_jejak_yjlist_add1",
					   		async: false,
				    		data: JSON.stringify(from),
				    		success: function (result) {
				    			alert('데이터 입력 완료');
				    		},
				    		error: function () {
					    	}
					    });
					}
				});
				
			}else{
				logNow("1년 이후");
				
				var plus_d;
				if (row_book["sbjanh"] == '4') plus_d = 50; // 양장 - 50일
				else plus_d = dur_pan; // 기타 35일
					
				var eday = sday + (60 * 60 * 24 * plus_d);
				var edate = MsToFulldate(eday).substring(2,8);
				var jpdb2 = "KS1" + MsToFulldate(eday).substring(2,6) + "0";
				
				// 첫달 판매
				var jpdb1 = "KS1" + MsToFulldate(sday).substring(2,6) + "0";
				
				var from = {dbname : jpdb1, s1ilja: sdate, s1gubn: "C", s1book: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add17",
					async: false,
					data : JSON.stringify(from),
					error : function () {
						alert("매출기록을 읽어올 수 없습니다. (1)");
					},
					success: function (result2) {
						if(result[0] != null) sum_all += result2[0]["psum"];
					}
				});
				var from = {dbname : jpdb1, s1ilja: sdate, s1gubn: "D", s1book: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add17",
					async: false,
					data : JSON.stringify(from),
					error : function () {
						alert("매출기록을 읽어올 수 없습니다. (1-1)");
					},
					success: function (result2) {
						sumData = result2[Object.keys(result2)];
						if(result[0] != null) sum_all -= sumData["psum"];
					}
				});
				
				// 중간 판매
				sday = sday + (60 * 60 * 24 * 30);
				jpdb1 = "KS1" + MsToFulldate(sday).substring(2,6) + "0";
				if (jpdb1 < jpdb2){
					var from = {dbname : jpdb1, s1gubn: 'C', s1book: row_book["sbbook"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add18",
						async: false,
						data : JSON.stringify(from),
						error : function () {
							alert("매출기록을 읽어올 수 없습니다. (2)");
						},
						success: function (result2) {
							if(result[0] != null) sum_all += result2[0]["psum"];
						}
					});
					var from = {dbname : jpdb1, s1gubn: 'D', s1book: row_book["sbbook"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add18",
						async: false,
						data : JSON.stringify(from),
						error : function () {
							alert("매출기록을 읽어올 수 없습니다. (2-1)");
						},
						success: function (result2) {
							if(result[0] != null) sum_all -= result2[0]["psum"];
						}
					});
				}
				// 마지막달 판매
				var from = {dbname : jpdb2, s1ilja: edate, s1gubn: 'C', s1book: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add19",
					async: false,
					data : JSON.stringify(from),
					error : function () {
						alert("매출기록을 읽어올 수 없습니다. (3)");
					},
					success: function (result2) {
						if(result[0] != null) sum_all += result2[0]["psum"];
					},
				});
				var from = {dbname : jpdb2, s1ilja: edate, s1gubn: 'D', s1book: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add19",
					async: false,
					data : JSON.stringify(from),
					error : function () {
						alert("매출기록을 읽어올 수 없습니다. (3)");
					},
					success: function (result2) {
						if(result[0] != null) sum_all -= result2[0]["psum"];
					}
				});
				var pnum2 = 0;
				// 현재고 - 유통
				var from = {sqbook : row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add4",
					async: false,
					data : JSON.stringify(from),
					error : function () {
						alert("유통 현재고 읽기 오류");
					},
					success: function (result2) {
						if(result[0] != null) pnum2 += result2[0]["sqcrnm0"];
					}
				});
				
				// 현재고 - 출판사, DT
				if(tbl_e == 'D') var from = {database : "dtjejak", sqbook: row_book["sbbook"]};
				else var from = {database : "jejak", sqbook: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add5",
					async: false,
					data : JSON.stringify(from),
					error : function () {
						alert("현재고 읽기 오류 (2)");
					},
					success: function (result2) {
						if(result[0] != null) pnum2 += result2[0]["sqcrnm"];
					}
				});
				
				// 가입고
				if(tbl_e == 'D') var from = {database : "dtjejak", bookcode: row_book["sbbook"]};
				else var from = {database : "jejak", bookcode: row_book["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add20",
					async: false,
					data : JSON.stringify(from),
					error : function (){
						alert("가입고 1 읽기 오류");
					},
					success: function (result2) {
						if(result2[0] != null)
							if(result2[0]["xnum"] > 0) pnum2 += result2[0]["xnum"]; 
					}
				});
				
				if(sum_all > 0) pdate = Math.round((pnum2 * dur_pan) / sum_all);
				else pdate = 45;
				
				// 연간 판매량 계산
				var pan_s = 0; var ban_s = 0;
				var p1 = 0; var p2 = 0; var p3 = 0; var p4 = 0; var p5 = 0; var p6 = 0; var p7 = 0; var p8 = 0; var p9 = 0; var p10 = 0; var p11 = 0; var p12 = 0;
				var p = [0,0,0,0,0,0,0,0,0,0,0,0];
				var bk_db = "KTBKS" + MsToFulldate(bday).substring(2,4) + "0";
				b_index = parseInt(MsToFulldate(bday).substring(4,6));
				var from = { dbname : bk_db, tbsbook : row_book["sbbook"], tbmgubn : b_index }
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add7",
					async: false,
					data : JSON.stringify(from),
					error : function () {
						alert("도서집계 읽기 오류");
					},
					success: function (result2) {
						
						for(var ii = (b_index + 1) ; ii < 13 ; ii++){
							if (result2[0]["tbcsr"]) tbcsr = result2[0]["tbcsr"];
							else tbcsr = 0;
							if (result2[0]["tbdsr"]) tbdsr = result2[0]["tbdsr"];
							else tbdsr = 0;
								
							eval("p" + ii + "= tbcsr - tbdsr;");
							eval("pan_s += p" + ii + ";");
							ban_s += tbdsr;
						}
						if(b_index > 1){ //다음해
							var day = new Date().getFullYear();
							day = String(day);
							bk_db = "KTBKS" + day.substring(2,4) + "0";
							var from = {dbname : bk_db, tbsbook: row_book["sbbook"], tbmgubn: b_index}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add8",
								async: false,
								data : JSON.stringify(from),
								error : function (){
									alert("도서집계 읽기 오류");
								},
								success: function (result3) {
									var tbcsr = 0;
									var tbdsr = 0;
									for (var ii = 1 ; ii < b_index ; ii++){
										if(result[0] != null)
											if (result3[0]["tbcsr"]) tbcsr = result3[0]["tbcsr"];
											else tbcsr = 0;
										if(result[0] != null)
											if (result3[0]["tbdsr"]) tbdsr = result3[0]["tbdsr"];
											else tbdsr = 0;
												
										eval("p" + ii + "= "+tbcsr+" - " +  tbdsr);											
										eval("pan_s += p" + ii + ";");
										ban_s += tbdsr;
										}
									}
								});
							}
						// 이번달 오늘까지
						var mon = Number(String(parseInt(tday))+"000");
						cdate = new Date(mon); 
						tm = new Date(mon).getMonth()+1;
						tf = new Date();
						tf = tf.getFullYear() + String(tf.getMonth()+1) + String(tf.getDate());
						var temp = String(cdate.getFullYear());
						dk_db = "KS1" + String(temp.substring(0,2)) + String(cdate.getMonth()+1)+ "0";
						var from = {dbname : dk_db, s1book: row_book["sbbook"], s1ilja: tf}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add9",
							async: false,
							data : JSON.stringify(from),
							success: function (result) {
								if (result.length == 0){ //alert("전표 읽기 오류 (1)");
								}
								else
								{
									var row = result[Object.keys(result)];
									if(result[0] != null)
										eval("p" + tm + " += row[\"s1qnty\"]");
								}
							}
						});
						var from = {dbname : dk_db, s1book: row_book["sbbook"], tmp : "D", s1ilja: tf}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add10",
							async: false,
							data : JSON.stringify(from),
							success: function (result) {
								if (result.length == 0){ //alert("전표 읽기 오류 (2)");
								}
								else
								{
									var row = result[Object.keys(result)];
									if(result[0] != null)
									{
										eval("p" + tm + " -= row[\"s1qnty\"]");
										ban_s += row["s1qnty"];
									}
								}
							}
						});
						dk_db = "KS1" + String(temp.substring(0,2)) + String(cdate.getMonth()+1) + "B";
						var from = {dbname : dk_db, s1book: row_book["sbbook"], tmp: "D", s1ilja: tf}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add10",
							async: false,
							data : JSON.stringify(from),
							success: function (result) {
								if (result.length == 0){ //alert("전표 읽기 오류 (3)");
								}
								else
								{
									var row = result[Object.keys(result)];
									if(result[0] != null)
									{
										eval("p" + tm + " += row[\"s1qnty\"]");
										ban_s += row["s1qnty"];
									}
								}
							}
						});
						// 작년 오늘부터 끝까지
						dk_db = "KS1" + bdate.substring(0, 4) + "0";
						var from = {dbname : dk_db, s1book: row_book["sbbook"], tmp: "C", bdate: bdate}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add11",
							async: false,
							data : JSON.stringify(from),
							success: function (result) {
								if (result.length == 0){ //alert("전표 읽기 오류 (11)");
								}
								else
								{
									var row = result[Object.keys(result)];
									if(result[0] != null)
										eval("p" + tm + " += row[\"s1qnty\"]");
								}
							}
						});
						var from = {dbname : dk_db, s1book: row_book["sbbook"], tmp: "D", bdate: bdate}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add11",
							async: false,
							data : JSON.stringify(from),
							success: function (result) {
								if (result.length == 0){ //alert("전표 읽기 오류 (12)");
								}
								else
								{
									var row = result[Object.keys(result)];
									if(result[0] != null)
									{
										eval("p" + tm + " -= row[\"s1qnty\"]");
										ban_s += row["s1qnty"];
									}
								}
							}
						});
						dk_db = "KS1" + bdate.substring(0, 4) + "B";
						var from = {dbname : dk_db, s1book: row_book["sbbook"], tmp: "D", bdate: bdate}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add11",
							async: false,
							data : JSON.stringify(from),
							success: function (result) {
								if (result.length == 0){ //alert("전표 읽기 오류 (13)");
								}
								else
								{
									var row = result[Object.keys(result)];
									if(result[0] != null)
									{
										eval("p" + tm + " -= row[\"s1qnty\"]");
										ban_s += row["s1qnty"];
									}
								}
							}
						});
						
						eval("pan_s += p" + tm);
						pan_s2 = 0;
						bday = String(parseInt(bday));
						bday2 = parseInt(bday) - (60*60*24*365);
						bk_db = "KTBKS" + bday.substring(0,2) + "0";
						adate = new Date(bday2); 
						b_index = Number(adate.getMonth()+1);
						var from = {dbname : bk_db, tbsbook: row_book["sbbook"], tmp: b_index}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add12",
							async: false,
							data : JSON.stringify(from),
							error : function () {
								alert("도서집계 읽기 오류");
							},
							success: function (result) {
								for (ii = b_index ; ii < 13 ; ii++)
								{
									var row = result[Object.keys(result)];
									if(result[0] != null)
									pan_s2 += row["tbcsr"] - row["tbdsr"];
								}
								if (b_index > 1) // 다음해
								{
									bk_db = "KTBKS" + bday.substring(0,2) + "0";
									var from = {dbname : bk_db, tbsbook: row_book["sbbook"], tbmgubn: b_index}
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										url: SETTING_URL + "/jpjejak/select_jp_jejak_yjlist_add13",
										async: false,
										data : JSON.stringify(from),
										error : function () {
											alert("도서집계 읽기 오류");
										},
										success: function (result) {
											for (ii = 1 ; ii < b_index ; ii++)
											{
												row = result[Object.keys(result)];
												if(result[0] != null)
												pan_s2 += row["tbcsr"] - row["tbdsr"];
											}
										}
									});
								}
								if (pan_s2)
									new_yinc = Math.round((pan_s / pan_s2), 2);
								else
									new_yinc = 0;
								var current = String(tf) + "000";
								signdate = tf;
								new_ppan = Math.ceil(pan_s / 12);
								
								b_index--;
								if (b_index == 0)
									b_index = 12;
								if (eval("p"+ b_index + ">= 20500")) // 1개월 20500 이상
									bnum = 20500;
								else
								{	// 3개월 10500 이상
									psum = 0;
									for (ii = b_index ; ii > (b_index - 3) ; ii--)
									{
										if (ii < 1)
											new_i = 12 + ii;
										else
											new_i = ii;
										eval("psum += p"+new_i);
									}
									if (psum >= 10500)
										bnum = 10500;
									else
									{	// 6개월 5500 이상
										psum = 0;
										for (ii = b_index ; ii > (b_index - 6) ; ii--)
										{
											if (ii < 1)
												new_i = 12 + ii;
											else
												new_i = ii;
											eval("psum += p" + new_i);
										}
										if (psum >= 5500)
											bnum = 5500;
										else
										{	// 9개월 3500 이상
											psum = 0;
											for (ii = b_index ; ii > (b_index - 9) ; ii--)
											{
												if (ii < 1)
													new_i = 12 + ii;
												else
													new_i = ii;
												eval("psum += p" + new_i);
											}
											if (psum >= 3500)
												bnum = 3500;
											else
											{	// 12개월 2500 이상							
												if (pan_s >= 2500)
													bnum = 2500;
												else
												{
													if ((pan_s + pan_s2) >= 1050)
														bnum = 1050;
													else
														bnum = 500;
												}
											}
										}
									}
								}
								var tbigo;
								switch (row_book["sbcoti"])
								{
								    case 1:
								        tbigo = "유광";
								        break;
								    case 2:
								        tbigo = "무광";
								        break;
								    case 3:
								        tbigo = "홀로그램";
								        break;
								    case 5:
								        tbigo = "엠보싱";
								        break;
								}
								bjulsu = parseInt(row_book["sbjlsu"]);
								var from = {
										signdate: signdate,
										bname: row_book["sbname"],
										bcode: row_book["sbbook"],
										bpanh: row_book["sbpanh"],
										bprice: row_book["sbuprc"],
										bmyun: row_book["sbpage"], 
										pnum1: sum_all, 
										pnum2: pnum2,  
										ppan: new_ppan, 
										pfirst: row_book["sbapdt"], 
										pdate: pdate, 
										bcolor: new_colo,
										yinc: new_yinc, 
										bnum: bnum, 
										bjulsu: bjulsu, 
										p1: p1, 
										p2: p2, 
										p3: p3, 
										p4: p4, 
										p5: p5, 
										p6: p6, 
										p7: p7, 
										p8: p8, 
										p9: p9, 
										p10: p10,  
										p11: p11,  
										p12: p12, 
										ypan: pan_s, 
										yban: ban_s, 
										tbigo: tbigo
								}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/jpjejak/insert_jp_jejak_yjlist_add1",
									async: false,
									data : JSON.stringify(from),
									error : function () {
										alert("예정테이블 기록 오류");
									},
									success: function (result) {
									}
								});
							}
						});
					}
				});
			}
		}
	});
	
}


//제품정가인상리스트
function SelJpPriceupList(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_jp_priceup_list",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				htmlString +=
					'<tr>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] +'</span></td>'+
						'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'; if(data["sbname"]) htmlString += data["sbname"]; htmlString += '</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:100px;" name="price[]" value="'+ data["bprice"] +'">'+
							'<input type="hidden" name="uids[]" value="<?=$row[UID]?>"></span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
					'</tr>';
			}
			$("#jpPriceupData").html(htmlString);
		}
	});
}

//제품보류리스트
function SelJpHoldList(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_jp_hold_list",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				htmlString +=
					'<tr>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;'+ data["sbbook"] +'&nbsp;&nbsp;&nbsp;&nbsp;</span></td>'+
					'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["sbname"] +'</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>'+
					'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>'+
				'</tr>';
			}
			$("#jpholdData").html(htmlString);
		}
	});
}

//제품폐간리스트
function SelJpCloseList(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_jp_close_list",
		async: false,
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				htmlString +=
					'<tr>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></td>'+
						'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["sbname"] +'</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
					'</tr>';
			}
			$("#jpCloseData").html(htmlString);
		}
	});
}

//신간적정재고관리
function SelJpNewstockList(){
	var bdate = new Date((new Date().getFullYear()-1) + "/" + (new Date().getMonth()+1) + "/" + new Date().getDate()).getTime()/1000;
	var from = {bdate: bdate}
	logNow(bdate);
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/jpjejak/select_jp_newstock_list",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result); 
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["yjdate"]);
				full_date = full_date.substring(0,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
						'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["yjbook"] +'</span></td>'+
						'<td width="300" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["sbname"] +'</span></td>'+
						'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:100px;" name="qnty[]" value="'+ data["yjqnty"] +'">'+
							'<input type="hidden" name="uids[]" value="'+ data["uid"] +'"></span></td>'+
						'<td onClick="javascript:DelJpNewstockList('+ data["uid"] +');" onMouseOver=this.style.backgroundColor="FFDC7D" onMouseOut=this.style.backgroundColor="FFFFFF" width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">삭제</span></td>'+				
					'</tr>';
				
			}
			$("#jpNewstockData").html(htmlString);
		}
	});
}

function DelJpNewstockList(uid){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid: uid};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/jpjejak/delete_jp_newstock",
			data : JSON.stringify(from),
			success : function(result) {
				alert("데이터 삭제 완료");
			},
			error : function(){
			}
		});
	}
}

function ModiJpNewstockList(){//수정 하는거 펑션 다시 확인 수정안됨
for(var i = 0; i < $('input[name="qnty[]"]').length; i++){
		
		var yjqnty = $('input[name="qnty[]"]')[i].value;
		var uid = $('input[name="uids[]"]')[i].value;
		
		var from = { yjqnty: yjqnty, uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/update_jp_newstock",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
			},
			error: function () {
			}
		});
			return;
	}
	alert("update성공");
}

//SAMPLE제작