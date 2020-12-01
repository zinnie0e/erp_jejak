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
									'<td width="300" bgcolor="white" height="40" align="left" valign="middle" colspan="3"><p style="margin-left:10px;"><span style="font-size:9pt;">'+ data["bname"] +'</span></p></td>'+
									'<td width="50" height="40" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt;"><font color="#666666">코드</font></span></td>'+
									'<td width="50" height="40" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] +'</span></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">정가</span></font></td>'+
									'<td width="100" bgcolor="white" height="40" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'+ data["bprice"] +'</span></td>'+
									'<td width="700" bgcolor="#F6F6F6" height="40" align="left" valign="middle" colspan="14"><p><font color="#666666"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
										'<input type="button" value="발주" onClick="javascript:SendIt();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+													
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

//제작계획표
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
		
		htmlString = "";
		if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")){
			htmlString +=
				'<tr>'+
		            '<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="50"><p><span style="font-size:9pt;">도서코드</span></p></td>'+
					'<td width="165" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
					'<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
		            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>'+
					'<td width="285" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">내용</span></td>'+
		            '<td width="100" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>'+
		        '</tr>';
		}else{
			htmlString +=
				'<tr>'+
					'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="50"><p><span style="font-size:9pt;">도서코드</span></p></td>'+                    
					'<td width="165" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
		            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>'+
					'<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄<br>완료일</span></td>'+
		            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고일</span></td>'+
		            '<td width="50" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>'+
		            '<td width="250" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">내용</span></td>'+
		        '</tr>';
		}
		$("#jpBalDetailData1").html(htmlString);
		
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
				htmlString = "";
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
												'<td height="30" align="center" valign="middle" bgcolor="white"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:36px;" name="pwan" maxlength="4" value="'+ data["pwan"] +'" onKeypress="if(event.keyCode == 13){javascript:chPwan();}"></span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:36px;" name="iwan" maxlength="4" value="'+ data["iwan"] +'" onKeypress="if(event.keyCode == 13){javascript:chIwan();}"></span></td>'+
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
								$("#jpBalDetailData2").html(htmlString);
							}
						});
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
				htmlString = "";
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
								'<input type="text" size="1" value="'+ data["colo"] +'"></span>'+
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
				htmlString = "";
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
				var object_num = Object.keys(result);
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
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
function SelJpJejakYejung(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/jpjejak/select_yejung1",
		async: false,
		success: function (result){
			var signdate = result.toString();
			
			var xxx = signdate.substring(4,6);
			full_date = signdate.substring(0,4) + " 년" + signdate.substring(4,6) + " 월" + signdate.substring(6,8) + " 일  ";
			(document.getElementById("time_result")).innerHTML = full_date;
			
			var from = {signdate: signdate}
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
					
					htmlString = "";
					for(var i in object_num){
						var data = result[object_num[i]];
						
						var nprice = 0;
						if (data["ncode"]) var tcode = data["ncode"];
						if (data["nprice"]) nprice = data["nprice"];
						
						htmlString += 
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
					}
					$("#JpYejungData").html(htmlString);
				}
			});
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

//제작예정리스트 등록


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