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
			var j = 1; 
			htmlString = "";
			htmlString += 
				'<tr>'+
					'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;"><b>번호</b></span></td>'+
					'<td width="400" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>거래처명</b></span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>건수</b></span></td>'+
					'<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>금액</b></span></td>'+
					'<td width="120" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>인쇄</b></span></td>'+
				'</tr>';
			
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
								
								htmlString += 
									'<tr>'+
										'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (j++) +'</span></td>'+
										'<td style="padding-left:10px;" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</a></span></td>'+
										'<td style="padding-right:10px;" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data2["count"]) +'</span></td>'+
										'<td style="padding-right:10px;" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data2["sum"]) +'</span></td>'+
										'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><input type="button" value="인 쇄" onClick="javascript:PrintKbYongjiDae('+ data["wccode"] +')"></span></td>'+
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

function PrintKbYongjiDae(wccode){
	var t_URL = "/popup?print";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu6("3_인쇄팝업"));
	
	logNow(wccode);
	var ty = $("select[name=ty]").val(); //2020
	var tm = $("select[name=tm]").val(); //1
	
	var st = new Date(parseInt(ty), (parseInt(tm)-1), 1, 0, 0, 1).getTime()/1000; //1일
	var et = new Date(parseInt(ty), tm, 0, 23, 59, 59); //막일
	
	var et_day = parseInt(et.getDate());
	et_day = et_day >= et_day ? et_day : '0' + et_day;
	
	var et = et.getTime()/1000;
	
	var p1 = "106-48-64212";
	var p2 = "세광음악출판사";
	var p3 = "박세원";
	var p4 = "서울특별시 용산구 만리재로 178 (서계동)<br>&nbsp;&nbsp;(Tel:714-0046 Fax:3274-1271)";
	var p5 = "제조외";
	var p6 = "출판외";
	
	htmlString = "";
	
	var from = {wccode: wccode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_yongji3",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			htmlString +=
				'<table width="750" border="0" cellpading="0" cellspacing="0">'+
					'<tr>'+
						'<td height="60" colspan="12" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:20pt;"><b>거래명세표</b></font></td>'+
					'</tr>'+
					'<tr>'+
						'<td height="30" colspan="12" align="left" valign="middle"><span style="font-size:10pt;">기간 : '+ ty +'년 '+ tm +'월 01일 ~ '+ ty +'년 '+ tm +'월 '+ et_day +'일</font></td>'+
					'</tr>'+
					'<tr>'+
						'<td rowspan="4" width="30" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="center" valign="middle"><span style="font-size:10pt;">공<br><br><br>급<br><br><br>자</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">등록<br>번호</font></td>'+
						'<td width="305" colspan="4" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="center" valign="middle"><span style="font-size:10pt;">'+ result[0]["wcsaup"] +'</font></td>'+
						'<td rowspan="4" width="30" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="center" valign="middle"><span style="font-size:10pt;">공<br>급<br>받<br>는<br>자</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">등록<br>번호</font></td>'+
						'<td width="305" colspan="4" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="40" align="center" valign="middle"><span style="font-size:10pt;">'+ p1 +'</font></td>'+
					'</tr>'+
					'<tr>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">상호</font></td>'+
						'<td width="155" colspan="2" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ result[0]["wcname"] +'</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">성명</font></td>'+
						'<td width="110" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ result[0]["wcdeap"] +'</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">상호</font></td>'+
						'<td width="155" colspan="2" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ p2 +'</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">성명</font></td>'+
						'<td width="110" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ p3 +'</font></td>'+
					'</tr>'+
					'<tr>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">주소</font></td>'+
						'<td width="305" colspan="4" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ result[0]["wcjuso"] +'</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">주소</font></td>'+
						'<td width="305" colspan="4" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ p4 +'</font></td>'+
					'</tr>'+
					'<tr>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">업태</font></td>'+
						'<td width="115" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ result[0]["wctae"] +'</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">종목</font></td>'+
						'<td width="150" colspan="2" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ result[0]["wcjong"] +'</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">업태</font></td>'+
						'<td width="115" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ p5 +'</font></td>'+
						'<td width="40" height="40" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">종목</font></td>'+
						'<td width="150" colspan="2" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="40" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">'+ p6 +'</font></td>'+
					'</tr>';
		}
	});
	
	(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	htmlString = "";
	htmlString +=
		'<tr>'+
		    '<td width="40" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">월/일</span></td>'+
		    '<td width="140" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:30pt;">품목</span></td>'+
		    '<td width="40" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">평량</span></td>'+
		    '<td width="70" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:5pt;">규격</span></td>'+
		    '<td width="50" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:5pt;">수량</span></td>'+
		    '<td width="70" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:5pt;">단가</span></td>'+
		    '<td width="50" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">할인율</span></td>'+
		    '<td width="70" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">공급가액</span></td>'+
		    '<td width="60" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:5pt;">세액</span></td>'+
		    '<td width="90" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:15pt;">합계</span></td>'+
		    '<td width="60" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">비고</span></td>'+
		'</tr>';
	
	var sum1 = 0; var sum2 = 0; var sum3 = 0; var sum4 = 0; var sum5 = 0;
	
	var from = {date1: st, date2: et, wccode: wccode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_yongji4",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result); 
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var danga = Math.round((data["n_fac"] * (100 - data["n_halin"])) / 100);
				var cost1 = Math.round(data["tprice"] / 1.1);
				var tax1 = data["tprice"] - cost1;
				var qnty = (data["num"] / 500);
				
				sum1 += qnty;
				sum2 += 0;
				sum3 += cost1;
				sum4 += tax1;
				sum5 += cost1 + tax1;
				
				var data2;
				
				var from = {jicode: data["jicode"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_yongji5",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						data2 = result[0];
					}
				});
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(4,6) + "/" + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:3pt; letter-spacing:0pt;">'+ data2["wjname"] +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["op1"] +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ data2["op2"] +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(qnty.toFixed(3)) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(danga) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data["n_halin"].toFixed(2)) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(cost1) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tax1) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="18" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(cost1+tax1) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="18" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
					'</tr>';
			}
			htmlString +=
					'<tr>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; letter-spacing:30pt;">합계</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum1.toFixed(3)) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">&nbsp;</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum3) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum4) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sum5) +'</span></td>'+
						'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
					'</tr>'+
				'</table>';
		}
	});
	(popUp.document.getElementById("popdata2")).innerHTML = htmlString;
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
			htmlString +=
				'<tr>'+
					'<td width="140" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;"><b>지급년월일</b></span></td>'+                    
					'<td width="220" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>거래처</b></span></td>'+
					'<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>구분</b></span></td>'+
					'<td width="120" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>금액</b></span></td>'+
					'<td width="160" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>메뉴</b></span></td>'+
				'</tr>';
				
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
			htmlString +=
				'<tr>'+
					'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:120px;" placeholder="2000-01-01" name="cdate"></span>'+
					'</td>'+
					'<td width="220" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<select name="ccode" size="1">'+
							'<option value="">======================</option>'+
						'</select></span>'+
					'</td>'+
					'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<select name="cgubn" size="1">'+
							'<option value="">==========</option>'+
							'<option value="표지">표지</option>'+
							'<option value="본문">본문</option>'+
							'<option value="칼라프린트">칼라프린트</option>'+
							'<option value="스티커">스티커</option>'+
							'<option value="전단지">전단지</option>'+
							'<option value="프로그램">프로그램</option>'+
							'<option value="포스트">포스트</option>'+
						'</select></span>'+
					'</td>'+
					'<td width="120" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<INPUT style="text-align:right; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:110px;" name="cprice"></span>'+
					'</td>'+
					'<td width="160" height="30" align="center" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<input type="button" value=" 등 록 " onClick="javascript:InsertKbPrint();"></span>'+
					'</td>'+
				'</tr>';
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
			htmlString +=
				'<tr>'+
					'<td width="140" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;"><b>지급년월일</b></span></td>'+
					'<td width="220" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>거래처</b></span></td>'+
					'<td width="100" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>구분</b></span></td>'+
					'<td width="120" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>금액</b></span></td>'+
					'<td width="200" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>메뉴</b></span></td>'+
				'</tr>';
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
			htmlString +=
				'<tr>'+
					'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:120px;" placeholder="2000-01-01" name="cdate"></span>'+
					'</td>'+
					'<td width="220" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<select name="ccode" size="1">'+
							'<option value="">======================</option>'+
						'</select></span>'+
					'</td>'+
					'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<select name="cgubn" size="1">'+
							'<option value="">========</option>'+
							'<option value="악보">악보</option>'+
							'<option value="가사">가사</option>'+
						'</select></span>'+
					'</td>'+
					'<td width="120" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<INPUT style="text-align:right; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:110px;" name="cprice"></span>'+
					'</td>'+
					'<td width="200" height="30" align="center" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						'<input type="button" value=" 등 록 " onClick="javascript:InsertKbHouseOrgan();"></span>'+
					'</td>'+
				'</tr>';
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
	$('#kbPressworkDataTemp').css('display', 'none');
	$('#kbPressworkData').css('display', '');
	
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
			htmlString +=
				'<tr>'+
					'<td width="60" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제작번호</span></td>'+
					'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">년월일</span></td>'+
					'<td width="280" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="77" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄비</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름.소부비</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">계산</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">회계</span></td>'+
				'</tr>';
			
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
	$("#kbPressworkData").html(htmlString);
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
						                    '<option value="2">관리비</option>'+ 
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
			
			$('select[name=op2]').val(result[0]["op52"]);
		
			htmlString = "";
			htmlString +=
				'<tr>'+
	                '<td width="114" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">구분</span></td>'+
	                '<td width="114" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름량</span></td>'+
	                '<td width="114" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름단가</span></td>'+
	                '<td width="114" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
	                '<td width="110" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">대지비</span></td>'+
	                '<td width="141" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">합계</span></td>'+
	                '<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수정</span></td>'+
	            '</tr>';
			var htmlString2 = "";
			htmlString2 +=
				'<tr>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">구분</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">판종</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">판수</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">단가</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">금액</span></td>'+
	                '<td width="125" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">합계</span></td>'+
	            '</tr>';
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
	                    '<td width="141" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString += numberWithCommas((sum_1 * 1.1).toFixed(0)); htmlString += '</span></td>'+
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
			htmlString +=
				'<tr>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">구분</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">R수</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">도수</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">단가</span></td>'+
	                '<td width="128" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">금액</span></td>'+
	                '<td width="125" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">합계</span></td>'+
	            '</tr>';
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

function ChgKbPressworkDetail(uid, ttg){
	if(ttg == 1){
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
				alert("회계 데이터 수정 완료");
			},
			error: function () {
			}
		}); 
		
	}else{
		for(var i = 0; i < $('input[name="daeji5[]"]').length; i++){
			var daeji5 = $('input[name="daeji5[]"]')[i].value;
			var t5id =  $('input[name="t5id[]"]')[i].value;
			if(daeji5){
				var t_sum;
				
				var from = {uid: t5id}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_presswork10",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						t_sum = (result[0]["sobu5"] + parseInt(daeji5)) * 1.1;
					}
				});
				
				var from = {daeji5: daeji5, sum5: t_sum, uid: t5id}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/update_kb_presswork_2",
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
}

function PrintPresswork(){
	var sdate = $("select[name=ty]").val() + $("select[name=tm]").val();
	
	var t_URL = "/popup?print";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu6("6_인쇄팝업"));
	
	var p1 = "106-48-64212";
	var p2 = "세광음악출판사";
	var p3 = "박세원";
	var p4 = "서울특별시 용산구 만리재로 178 (서계동)<br>&nbsp;&nbsp;(Tel:714-0046 Fax:3274-1271)";
	var p5 = "제조외";
	var p6 = "출판외";
	
	// 삼광사
	var htmlString2 =
		'<table width="700" border="0" cellpading="0" cellspacing="0">'+
			'<tr>'+
				'<td height="60" colspan="5" align="center" valign="middle">&nbsp;</td>'+
			'</tr>'+
			'<tr>'+
				'<td height="60" colspan="5" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:20pt;"><b>거래명세표</b></font></td>'+
			'</tr>'+
			'<tr>'+
				'<td height="30" colspan="5" align="right" valign="middle"><span style="font-size:10pt;">전화번호 : 031) 943-3994</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td rowspan="4" width="300" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt;"><span style="letter-spacing:3pt;">'+ $("select[name=ty]").val() +' 년 '+ $("select[name=tm]").val() +' 월 <br><br><br><br>'+ p2 +' 귀하<br><br><br><br><br><br><span style="font-size:8pt;">합계금액<br>(공급가액 + 세액)</span></font></td>'+
				'<td width="95" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업자등록</font></td>'+
				'<td width="355" colspan="3" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">113-03-71670</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
				'<td width="105" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">삼광사</font></td>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
				'<td width="105" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">박광원 (인)</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업자소재</font></td>'+
				'<td width="305" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기 파주 교하면 문발리 468번지</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
				'<td width="105" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조</font></td>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
				'<td width="105" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">인쇄</font></td>'+
			'</tr>'+
		'</table>'+
		'<br>'+
		'<table width="700" border="0" cellpading="0" cellspacing="0">'+
			'<tr>'+
			    '<td width="220" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:50pt;"><b>품명</b></span></td>'+
			    '<td width="110" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>규격</b></span></td>'+
			    '<td width="60" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:10pt;"><b>수량</b></span></td>'+
			    '<td width="60" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:10pt;"><b>단가</b></span></td>'+
			    '<td width="80" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>공급가액</b></span></td>'+
			    '<td width="70" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:15pt;"><b>세액</b></span></td>'+
			    '<td width="100" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>합계</b></span></td>'+
			'</tr>';
	
	htmlString = "";
	htmlString += htmlString2;
	
	var rec_no = 0; var page = 1;
	var psum1 = 0; var psum2 = 0; var psum3 = 0;
	var asum1 = 0; var asum2 = 0; var asum3 = 0;
	var xsum1 = 0; var xsum2 = 0; var xsum3 = 0;
	
	
	// 소부. 필름. 대지비
	var from = {bdate: sdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_presswork11",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var sobu2; var vat; var data2;
				rec_no += 1;
				
				var from = {uid: data["uid"]};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_presswork12",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						data2 = result2[0];
					}
				});
				var sobu2 = data2["pnum"] * data2["sobudan5"];
				var vat = Math.floor(sobu2 / 10);
				var tsum = sobu2 + vat;
				psum1 += sobu2;
				asum1 += sobu2;
				psum2 += vat;
				asum2 += vat;
				psum3 += sobu2 + vat;
				asum3 += sobu2 + vat;
				
				htmlString +=
					'<tr>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bname"] +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">'+ data["bpanh"] +'&nbsp;(소부비)</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["pnum"] +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["sobudan5"]) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sobu2) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
					'</tr>';
				
				if(data2["daeji"]){
					rec_no += 1;
					var daenum = Math.ceil(data2["daeji"] / 2000);
					vat = Math.floor(data2["daeji"] / 10);
					
					tsum = data2["daeji"] + vat;
					
					psum1 += data2["daeji"];
					asum1 += data2["daeji"];
					psum2 += vat;
					asum2 += vat;
					psum3 += data2["daeji"] + vat;
					asum3 += data2["daeji"] + vat;
					
					htmlString +=
						'<tr>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">(대지비)</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ daenum +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">2,000</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["daeji"]) +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
						'</tr>';
				}
				if(data2["fnum"]){
					rec_no += 1;
					var filmb2 = data2["fnum"] * data2["filmdan5"];
					vat = Math.floor(filmb2 / 10);
					
					tsum = filmb2 + vat;
					psum1 += filmb2;
					asum1 += filmb2;
					psum2 += vat;
					asum2 += vat;
					psum3 += filmb2 + vat;
					asum3 += filmb2 + vat;
					
					htmlString +=
						'<tr>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">(촬영비)</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["fnum"] +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["filmdan5"]) +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(filmb2) +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
						'</tr>';
				}
				if(rec_no >= 29){
					rec_no = 0;
					
					htmlString +=
						    '<tr>'+
						        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">소계</span></td>'+
						        '<td colspan="4" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">\\'+ numberWithCommas(psum1) +'</span></td>'+
						        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum2) +'</span></td>'+
						        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum3) +'</span></td>'+
						    '</tr>'+
						    '<tr>'+
						        '<td colspan="7" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">- '+ page +' -</span></td>'+
						    '</tr>'+
						'</table>'+
						'<p style="page-break-before:always">';
					
					htmlString += htmlString2;
					
					page++;
					psum1 = 0; psum2 = 0; psum3 = 0;
				}
			}
		}
	});
	
	//잡물
	var from = {bdate: sdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_presswork13",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var sobu2; var vat; var data2;
				rec_no += 1;
				
				var from = {uid: data["uid"]};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_presswork14",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						data2 = result2[0];
					}
				});
				
				var sobu2 = data2["pnum"] * data2["sobudan5"];
				var vat = Math.floor(sobu2 / 10);
				var tsum = sobu2 + vat;
				psum1 += sobu2;
				asum1 += sobu2;
				psum2 += vat;
				asum2 += vat;
				psum3 += sobu2 + vat;
				asum3 += sobu2 + vat;
				
				htmlString +=
					'<tr>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jbname"] +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">'+ data["jbpanh"] +'&nbsp;(소부비)</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["pnum"] +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["sobudan5"]) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sobu2) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
					'</tr>';
				if(data2["daeji"]){
					rec_no++;
					var daenum = Math.ceil(data2["daeji"] / 2000);
					vat = Math.floor(data2["daeji"] / 10);
					
					tsum = data2["daeji"] + vat;
					psum1 += data2["daeji"];
					asum1 += data2["daeji"];
					psum2 += vat;
					asum2 += vat;
					psum3 += data2["daeji"] + vat;
					asum3 += data2["daeji"] + vat;
					
					htmlString +=
						'<tr>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">(대지비)</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ daenum +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">2,000</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["daeji"]) +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
						    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
						'</tr>';
				}
			}
			htmlString +=
				    '<tr>'+
				        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">소계</span></td>'+
				        '<td colspan="4" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">\\'+ numberWithCommas(psum1) +'</span></td>'+
				        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum2) +'</span></td>'+
				        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum3) +'</span></td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">합계</span></td>'+
				        '<td colspan="4" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">\\'+ numberWithCommas(asum1) +'</span></td>'+
				        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(asum2) +'</span></td>'+
				        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(asum3) +'</span></td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td colspan="7" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">- '+ page +' -</span></td>'+
				    '</tr>'+
				'</table>'+
				'<p style="page-break-before:always">';
		}
	});
	(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	
	// 인쇄비 , 제본비
	var htmlString3 =
		'<table width="700" border="0" cellpading="0" cellspacing="0">'+
			'<tr>'+
				'<td height="60" colspan="5" align="center" valign="middle">&nbsp;</td>'+
			'</tr>'+
			'<tr>'+
				'<td height="60" colspan="5" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:20pt;"><b>거래명세표</b></font></td>'+
			'</tr>'+
			'<tr>'+
				'<td height="30" colspan="5" align="right" valign="middle"><span style="font-size:10pt;">전화번호 : 031) 943-3994</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td rowspan="4" width="300" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt;"><span style="letter-spacing:3pt;">'+ $("select[name=ty]").val() +' 년 '+ $("select[name=tm]").val() +' 월<br><br><br><br>'+ p2 +' 귀하<br><br><br><br><br><br><span style="font-size:8pt;">합계금액<br>(공급가액 + 세액)</span></font></td>'+
				'<td width="95" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업자등록</font></td>'+
				'<td width="355" colspan="3" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">113-03-71670</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
				'<td width="105" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">삼광사</font></td>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
				'<td width="105" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">박광원 (인)</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업자소재</font></td>'+
				'<td width="305" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기 파주 교하면 문발리 468번지</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
				'<td width="105" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조</font></td>'+
				'<td width="95" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
				'<td width="105" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">인쇄</font></td>'+
			'</tr>'+
		'</table>'+
		'<br>'+
		'<table width="700" border="0" cellpading="0" cellspacing="0">'+
		'<tr>'+
		    '<td width="220" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:70pt;"><b>품명</b></span></td>'+
		    '<td width="110" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:30pt;"><b>규격</b></span></td>'+
		    '<td width="80" colspan="2" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:10pt;"><b>수량</b></span></td>'+
		    '<td width="60" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:10pt;"><b>단가</b></span></td>'+
		    '<td width="80" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>공급가액</b></span></td>'+
		    '<td width="70" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>세액</b></span></td>'+
		    '<td width="80" style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>합계</b></span></td>'+
		'</tr>';
	
	htmlString = "";
	htmlString += htmlString3;
	
	var rec_no = 0; var page = 1;
	xsum1 = asum1; xsum2 = asum2; xsum3 = asum3;
	psum1 = 0; psum2 = 0; psum3 = 0;
	asum1 = 0; asum2 = 0; asum3 = 0;
	
	var from = {bdate: sdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_presswork15",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var ii = 0;
				
				var from = {uid: data["uid"]};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_presswork16",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num2 = Object.keys(result2);
						for(var j in object_num2){
							var data2 = result2[object_num2[j]]; 
							
							rec_no += 1;
							ii += 1;
							var pcost2 = Math.ceil(data2["pcost"] / 1.1);
							var vat = data2["pcost"] - pcost2;
							
							var tsum = pcost2 + vat;
							psum1 += pcost2;
							psum2 += vat;
							psum3 += pcost2 + vat;
							asum1 += pcost2;
							asum2 += vat;
							asum3 += pcost2 + vat;
							
							var tcolo = data2["colo"];
							var tgubn = data2["gubn"];
							if(data2["gubn"].indexOf('본문') != -1) 
								tgubn = "본문";
							
							
							if ((data2["gubn"] == '표지') && (data["bcode"].substring(0,3) == '393')) // 전집류 표지는 1도 더 추가 (총 2도 추가)
								tcolo += 1;
							if ((data2["gubn"] == '표지') || (data2["gubn"] == '속표지') || (data2["gubn"] == '화보') || (data2["gubn"] == '별지') || (data2["gubn"] == '케이스'))
								tcolo += 1;
							if ((data2["gubn"] == '면지') || data2["gubn"] == '도비라'){
								if (!((data2["jname"].indexOf('모') != -1) || (data2["jname"].indexOf('뉴') != -1)))
									tcolo += 1;
							}
							
							htmlString +=
								'<tr>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(ii == 1) htmlString += data["bname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt; letter-spacing:15pt;">'+ tgubn +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ data2["rnum"] +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ tcolo +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["pdanga"]) +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(pcost2) +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
								'</tr>';
						}
						if(rec_no >= 29){
							rec_no = 0;
							
							htmlString +=
								    '<tr>'+
								        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">소계</span></td>'+
								        '<td colspan="5" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">\\'+ numberWithCommas(psum1) +'</span></td>'+
								        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum2) +'</span></td>'+
								        '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum3) +'</span></td>'+
								    '</tr>'+
								    '<tr>'+
								        '<td colspan="8" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">- '+ page +' -</span></td>'+
								    '</tr>'+
								'</table>'+
								'<p style="page-break-before:always">';
							
							htmlString += htmlString3;
							page++;
							psum1 = 0; psum2 = 0; psum3 = 0;
						}
					}
				});
			}
		}
	});
	
	//잡물
	var from = {bdate: sdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_presswork17",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var ii = 0;
				
				var from = {uid: data["uid"]};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_presswork18",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num2 = Object.keys(result2);
						for(var j in object_num2){
							var data2 = result2[object_num2[j]]; 
							
							rec_no += 1;
							ii += 1;
							
							if(data2["pcost"]){
								var pcost2 = Math.round(data2["pcost"] / 1.1);
								var vat = Math.ceil(data2["pcost"] - pcost2);
								
								var tsum = pcost2 + vat;
								psum1 += pcost2;
								psum2 += vat;
								psum3 += pcost2 + vat;
								asum1 += pcost2;
								asum2 += vat;
								asum3 += pcost2 + vat;
								
								var tcolo = data2["colo"];
								if(data2["gubn"].indexOf('표지') != -1)
									tcolo += 1;
								
								htmlString +=
									'<tr>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(ii == 1) htmlString += data["jbname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt; letter-spacing:15pt;">'+ data2["gubn"] +'</span></td>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ data2["rnum"] +'</span></td>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ tcolo +'</span></td>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["pdanga"]) +'</span></td>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(pcost2) +'</span></td>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
										'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
									'</tr>';
							}
						}	
					}
				});
				
				//
				var from = {uid: data["uid"]};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_presswork19",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						logNow(result2);
						
						if(result2.length != 0){
							var pcost2 = Math.round(result2[0]["totcost7"] / 1.1);
							var vat = result2[0]["totcost7"] - pcost2;
							
							var tsum = pcost2 + vat;
							psum1 += pcost2;
							psum2 += vat;
							psum3 += pcost2 + vat;
							asum1 += pcost2;
							asum2 += vat;
							asum3 += pcost2 + vat;
							
							htmlString +=
								'<tr>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(ii == 0) htmlString += data["jbname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt; letter-spacing:15pt;">제본비</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">&nbsp;</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(pcost2) +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(vat) +'</span></td>'+
								    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(tsum) +'</span></td>'+
								'</tr>';
						}
					}
				});
			}
			if(rec_no < 29){
				htmlString +=
					'<tr>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">소계</span></td>'+
					    '<td colspan="5" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">\\'+ numberWithCommas(psum1) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum2) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(psum3) +'</span></td>'+
					'</tr>';
			}
			htmlString +=
				'<tr>'+
				    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">합계</span></td>'+
				    '<td colspan="5" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">\\'+ numberWithCommas(asum1) +'</span></td>'+
				    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(asum2) +'</span></td>'+
				    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(asum3) +'</span></td>'+
				'</tr>';
			
			xsum1 += asum1;
			xsum2 += asum2;
			xsum3 += asum3;
			
			htmlString +=
					'<tr>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">총계</span></td>'+
					    '<td colspan="5" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt; letter-spacing:0pt;">\\'+ numberWithCommas(xsum1) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(xsum2) +'</span></td>'+
					    '<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="22" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">\\'+ numberWithCommas(xsum3) +'</span></td>'+
					'</tr>'+
					'<tr>'+
					    '<td colspan="8" height="22" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">- '+ page +' -</span></td>'+
					'</tr>'+
				'</table>';
				
		}
	});
	(popUp.document.getElementById("popdata2")).innerHTML = htmlString;
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
			var tsum = 0; 
			
			htmlString = "";
			htmlString += 
				'<tr>'+
					'<td width="60" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제작일</span></td>'+
					'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고일</span></td>'+
					'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">코드</span></td>'+
					'<td width="260" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
					'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작부수</span></td>'+
					'<td width="100" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제본비</span></td>'+
				'</tr>';
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
						}
					}
				});
			}
			htmlString +=
				'<tr>'+
					'<td colspan="6" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:30pt; letter-spacing:40pt;">합계</span></td>'+
					'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+ numberWithCommas(tsum) +'</span></td>'+
				'</tr>';
			
			$("#kbBindingData").html(htmlString);
		}
	});
}

function PrintBinding(){ 
	var t_URL = "/popup?print";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu6("7_인쇄팝업"));
	
	var sm = parseInt($("select[name=tm]").val()) - 1;
	if(sm == 0){
		sm = 12;
		var sy = parseInt($("select[name=ty]").val()) - 1;
	}else{
		var sy = $("select[name=ty]").val();
	}
	sm = sm >= 10 ? sm : '0' + sm;
	var sdate = sy.toString() + sm.toString();
	logNow(sdate);
	
	htmlString = "";
	
	var from = {idate: sdate.substring(2,6)}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_binding4",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var rec = 1;
			
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var filename = "ms7_" + data["ccode"];
				
				var ccode = data["ccode"];
				logNow(ccode);
				
				htmlString += GetBinding(ccode, sdate);
				
				if(rec < object_num.length) htmlString += '<p style="page-break-before:always">';
				rec += 1;
				
			}
		}
	});
	(popUp.document.getElementById("popdata")).innerHTML = htmlString;
}

function GetBinding(ccode, sdate){
	var error = "<a><b>Warning</b>&nbsp;:&nbsp;ms7_" + ccode + "&nbsp;File&nbsp;Error</a>";
	if(!(ccode == "3006" || ccode == "3015" || ccode == "3016" || ccode == "3017" || ccode == "3021" || ccode == "3022" || ccode == "3023")) return error;
		
	htmlString = "";
	
	var asum = 0;
	var from = {ccode7: ccode, cdate7: sdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_binding5",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			asum += result[0]["sum_totcost7"];
		}
	});
	
	if(ccode == "3016" || ccode == "3017" || ccode == "3021" || ccode == "3022" || ccode == "3023"){
		var from = {jbdate: sdate, m3: ccode}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/directkb/select_kb_binding14",
			async: false,
			data : JSON.stringify(from),
			success: function (result2) {
				var object_num2 = Object.keys(result2);
				logNow(result2);
				for(var j in object_num2){
					var data2 = result2[object_num2[j]]; 
					
					var from = {crnum7: data2["uid"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/directkb/select_kb_binding15",
						async: false,
						data : JSON.stringify(from),
						success: function (result3) {
							asum += result3[0]["totcost7"];
						}
					});
				}
			}
		});
	}
	
	htmlString += GetBindingHeadHtml(ccode, sdate, asum);
	
	var rec_no = 1;
	var sp1 = 0; var sp2 = 0; var sp3 = 0;
	var page = 0;
	var qdate = sdate.substring(2,6);
	
	var from = {idate: qdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_binding6",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				//이건 왜 하는건지 모르겠음
				var from = {t1id: data["t1id"], idate: data["idate"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_binding7",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						//if(result.length != 0) continue;
					}
				});
				
				var juid; var bookname; var bookcode;
				var from = {t1id: data["t1id"], idate: data["idate"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_binding8",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						juid = result2[0]["juid"];
						bookname = result2[0]["bookname"];
						bookcode = result2[0]["bookcode"];
					}
				});
				
				var fieldname1; var fieldname2; var bucode;
				var from = {uid: juid}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_binding9",
					async: false,
					data : JSON.stringify(from),
					success: function (result2){
						bucode = result2[0]["bucode"];
						if(bucode){
							fieldname1 = "sbsbph" + bucode;
							fieldname2 = "sbsbpg" + bucode;
						}else{
							fieldname1 = "sbpanh";
							fieldname2 = "sbpage";
						}
					}
				});
				
				var tpanh; var tpage;
				var from = {fieldname1: fieldname1, fieldname2: fieldname2, sbbook: bookcode}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_binding10",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						tpanh = result2[0][fieldname1];
						tpage = result2[0][fieldname2];
					}
				});
				
				var pp1; var pp2; var pp3; 
				var from = {crnum7: juid}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_binding11",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num2 = Object.keys(result2);
						for(var j in object_num2){
							var data2 = result2[object_num2[j]]; 
							
							if(data2["ccode7"] != ccode) continue;
							pp3 = data2["totcost7"];
							pp1 = Math.ceil(pp3 / 1.1);
							pp2 = pp3 - pp1;
							sp1 += pp1;
							sp2 += pp2;
							sp3 += pp3;
							
							if(rec_no >= 25){
								rec_no = 1;
								page += 1;
								
								htmlString +=
									    '<tr>'+
									        '<td colspan="'; if(ccode == "3015") htmlString += 11; else htmlString += 10; htmlString += '" width="750" height="30" valign="middle" align="center"><span style="font-size:9pt;">- '+ page +' -</span></td>'+
									    '</tr>'+
									'</table>'+
									'<p style="page-break-before:always">';
								
								htmlString += GetBindingHeadHtml(ccode, sdate, asum);
							}
							
							//꼭지수 계산 
							var tcode = bookcode.substring(0,5);
							var gnum;
							var from = {tcode: tcode, bucode: bucode}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/directkb/select_kb_binding12",
								async: false,
								data : JSON.stringify(from),
								success: function (result2) {
									gnum = result2[0]["sum_wdqnty"];
								}
							});
							
							if(!bucode){ //본문만 표지 1 추가
								var from = {listid: juid}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/directkb/select_kb_binding13",
									async: false,
									data : JSON.stringify(from),
									success: function (result2) {
										if(result2.length != 0) gnum += 1;
									}
								});
							}
							// 신문과 진도카드는 고정. 꼭지 표시할 필요 없음
							if ((bookcode.substring(0,3) == "918") || ((bookcode >= "982010") && (bookcode <= "982020"))) gnum = 0;
							
							htmlString +=
								'<tr>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ bookname +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ tpanh +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">';if(tpage < 100) htmlString += "100"; else htmlString += tpage; htmlString += '</span></td>';
									if(ccode == "3015"){
										htmlString += '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'; if(gnum) htmlString += gnum; else htmlString += '&nbsp;'; htmlString += '</span></td>';
									} htmlString +=
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["pdanga7"].toFixed(1)) +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["cprice27"]) +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["cnum7"]) +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(pp1) +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(pp2) +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(pp3) +'</span></td>'+
									'<td style="border-left: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000;" width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
								'</tr>';
							rec_no += 1;
						}
					}
				});
			}
			page += 1; 
			htmlString +=
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">합계</span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>';
			        if(ccode == "3015"){
			        	htmlString += '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>';
			        } htmlString +=
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">&nbsp;</span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sp1) +'</span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sp2) +'</span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(sp3) +'</span></td>'+
			        '<td style="border-right: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
			    '</tr>'+
			    '<tr>'+
			        '<td colspan="'; if(ccode == "3015") htmlString += 11; else htmlString += 10; htmlString += '" width="750" height="30" valign="middle" align="center"><span style="font-size:9pt;">- '+ page +' -</span></td>'+
			    '</tr>'+
			'</table>';
		}
	});
	return htmlString;
}

function GetBindingHeadHtml(ccode, sdate, asum){
	var htmlString_head = "";
	switch (ccode){
	case "3006":
		htmlString_head = 
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
				'<tr>'+
					'<td height="20" colspan="6" align="center" valign="middle">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
					'<td height="60" colspan="6" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:50pt;"><b>청구서</b></font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ sdate.substring(0,4) +' 년 '+ sdate.substring(4,6) +' 월  '+ sdate.substring(6,8) +' 일</span></td>'+
					'<td rowspan="5" height="125" width="30" style="border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">공<br><br><br>급<br><br><br>자</font></td>'+
					'<td width="120" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">사업자 등록번호</font></td>'+
					'<td colspan="3" width="350" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">128-31-05743</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ string.com_name +' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;귀하</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">성일사</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">우진문</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td rowspan="2" height="50" width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:2pt;">아래와 같이 청구합니다.</span><br><br><br>금액 <span style="font-size:10pt; letter-spacing:-1pt;">'+ ReadKorean(asum) +'원정</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업장소재지</font></td>'+
					'<td width="350" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기도 고양시 일산동구 장항동 579-14</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제책</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">&nbsp;</span></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">전화번호</font></td>'+
					'<td width="130" style="border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031)906-0355</font></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">FAX</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">906-7881</font></td>'+
				'</tr>'+
			'</table>'+
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
				'<tr>'+
					'<td style="border-left: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>품명</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>규격</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>페이지</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="110" height="25" colspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>공급가액</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></span></td>'+
				'</tr>'+
				'<tr>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>권당</b></span></td>'+
					'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>기타</b></span></td>'+
				'</tr>';
		break;
		
	case "3015":
		htmlString_head = 
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
				'<tr>'+
					'<td height="20" colspan="6" align="center" valign="middle">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
					'<td height="60" colspan="6" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:50pt;"><b>청구서</b></font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ sdate.substring(0,4) +' 년 '+ sdate.substring(4,6) +' 월  '+ sdate.substring(6,8) +' 일</span></td>'+
					'<td rowspan="5" height="125" width="30" style="border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">공<br><br><br>급<br><br><br>자</font></td>'+
					'<td width="120" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">사업자 등록번호</font></td>'+
					'<td colspan="3" width="350" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">128-32-99141</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ string.com_name +' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;귀하</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">예주문화</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">진창호</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td rowspan="2" height="50" width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:2pt;">아래와 같이 청구합니다.</span><br><br><br>금액 <span style="font-size:10pt; letter-spacing:-1pt;">'+ ReadKorean(asum) +'원정</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업장소재지</font></td>'+
					'<td width="350" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기도 고양시 일산동구 장대길 42-131(장항동)</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제책</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">&nbsp;</span></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">전화번호</font></td>'+
					'<td width="130" style="border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">010-2350-1692</font></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">FAX</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031-907-4479</font></td>'+
				'</tr>'+
			'</table>'+
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;" width="220" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>책명</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>규격</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>페이지</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>꼭지수</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="90" height="25" colspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>부수</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>금액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" width="30" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></span></td>'+
			    '</tr>'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>권당</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="40" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>기타</b></span></td>'+
			    '</tr>';
		break;
		
	case "3016":
		htmlString_head = 
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
				'<tr>'+
					'<td height="20" colspan="6" align="center" valign="middle">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
					'<td height="60" colspan="6" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:50pt;"><b>청구서</b></font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ sdate.substring(0,4) +' 년 '+ sdate.substring(4,6) +' 월  '+ sdate.substring(6,8) +' 일</span></td>'+
					'<td rowspan="5" height="125" width="30" style="border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">공<br><br><br>급<br><br><br>자</font></td>'+
					'<td width="120" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">사업자 등록번호</font></td>'+
					'<td colspan="3" width="350" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">128-35-28220</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ string.com_name +' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;귀하</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">민성사</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">강민구</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td rowspan="2" height="50" width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:2pt;">아래와 같이 청구합니다.</span><br><br><br>금액 <span style="font-size:10pt; letter-spacing:-1pt;">'+ ReadKorean(asum) +'원정</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업장소재지</font></td>'+
					'<td width="350" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기도 고양시 일산동구 장항로 203-100(장항동)</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">서비스</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">인쇄기획대행</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">&nbsp;</span></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">전화번호</font></td>'+
					'<td width="130" style="border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031-906-0161</font></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">FAX</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031-906-0164</font></td>'+
				'</tr>'+
			'</table>'+
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>품명</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>규격</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>페이지</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="110" height="25" colspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>공급가액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></span></td>'+
			    '</tr>'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>권당</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>기타</b></span></td>'+
			    '</tr>';
		break;
		
	case "3017":
		htmlString_head = 
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
				'<tr>'+
					'<td height="20" colspan="6" align="center" valign="middle">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
					'<td height="60" colspan="6" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:50pt;"><b>청구서</b></font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ sdate.substring(0,4) +' 년 '+ sdate.substring(4,6) +' 월  '+ sdate.substring(6,8) +' 일</span></td>'+
					'<td rowspan="5" height="125" width="30" style="border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">공<br><br><br>급<br><br><br>자</font></td>'+
					'<td width="120" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">사업자 등록번호</font></td>'+
					'<td colspan="3" width="350" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">128-26-68201</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ string.com_name +' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;귀하</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">정성문화사</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">강성한</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td rowspan="2" height="50" width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:2pt;">아래와 같이 청구합니다.</span><br><br><br>금액 <span style="font-size:10pt; letter-spacing:-1pt;">'+ ReadKorean(asum) +'원정</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업장소재지</font></td>'+
					'<td width="350" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기 고양 일산 장항 607-6</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">인쇄.제본</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">&nbsp;</span></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">전화번호</font></td>'+
					'<td width="130" style="border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031-906-0161~3</font></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">FAX</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">906-0164</font></td>'+
				'</tr>'+
			'</table>'+
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>품명</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>규격</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>페이지</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="110" height="25" colspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>공급가액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></span></td>'+
			    '</tr>'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>권당</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>기타</b></span></td>'+
			    '</tr>';
		break;
		
	case "3021":
		htmlString_head = 
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
				'<tr>'+
					'<td height="20" colspan="6" align="center" valign="middle">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
					'<td height="60" colspan="6" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:50pt;"><b>청구서</b></font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ sdate.substring(0,4) +' 년 '+ sdate.substring(4,6) +' 월  '+ sdate.substring(6,8) +' 일</span></td>'+
					'<td rowspan="5" height="125" width="30" style="border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">공<br><br><br>급<br><br><br>자</font></td>'+
					'<td width="120" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">사업자 등록번호</font></td>'+
					'<td colspan="3" width="350" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">128-31-33730</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ string.com_name +' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;귀하</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">정원문화사</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">조경숙</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td rowspan="2" height="50" width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:2pt;">아래와 같이 청구합니다.</span><br><br><br>금액 <span style="font-size:10pt; letter-spacing:-1pt;">'+ ReadKorean(asum) +'원정</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업장소재지</font></td>'+
					'<td width="350" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기도 고양시 일산동구 장항동 579-14</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제책</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">&nbsp;</span></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">전화번호</font></td>'+
					'<td width="130" style="border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031)903-7961</font></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">FAX</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">903-7962</font></td>'+
				'</tr>'+
			'</table>'+
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>품명</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>규격</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>페이지</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="110" height="25" colspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>공급가액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></span></td>'+
			    '</tr>'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>권당</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>기타</b></span></td>'+
			    '</tr>';
		break;
		
	case "3022":
		htmlString_head = 
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
				'<tr>'+
					'<td height="20" colspan="6" align="center" valign="middle">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
					'<td height="60" colspan="6" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:50pt;"><b>청구서</b></font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ sdate.substring(0,4) +' 년 '+ sdate.substring(4,6) +' 월  '+ sdate.substring(6,8) +' 일</span></td>'+
					'<td rowspan="5" height="125" width="30" style="border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">공<br><br><br>급<br><br><br>자</font></td>'+
					'<td width="120" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">사업자 등록번호</font></td>'+
					'<td colspan="3" width="350" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">128-26-68201</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ string.com_name +' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;귀하</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">피앰앤태건</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">강성한</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td rowspan="2" height="50" width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:2pt;">아래와 같이 청구합니다.</span><br><br><br>금액 <span style="font-size:10pt; letter-spacing:-1pt;">'+ ReadKorean(asum) +'원정</span></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업장소재지</font></td>'+
					'<td width="350" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기 고양 일산 장항 607-6</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
					'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조</font></td>'+
					'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">인쇄.제본</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="250" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">&nbsp;</span></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">전화번호</font></td>'+
					'<td width="130" style="border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031-906-0161~3</font></td>'+
					'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">FAX</font></td>'+
					'<td width="100" style="border-right: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">906-0164</font></td>'+
				'</tr>'+
			'</table>'+
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>품명</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>규격</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>페이지</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="110" height="25" colspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>공급가액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></span></td>'+
			    '</tr>'+
			    '<tr>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>권당</b></span></td>'+
			        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>기타</b></span></td>'+
			    '</tr>';
		break;
		
	case "3023":
		htmlString_head = 
			'<table width="750" border="0" cellpading="0" cellspacing="0">'+
			'<tr>'+
				'<td height="20" colspan="6" align="center" valign="middle">&nbsp;</td>'+
			'</tr>'+
			'<tr>'+
				'<td height="60" colspan="6" align="center" valign="middle"><span style="font-size:20pt; letter-spacing:50pt;"><b>청구서</b></font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ sdate.substring(0,4) +' 년 '+ sdate.substring(4,6) +' 월  '+ sdate.substring(6,8) +' 일</span></td>'+
				'<td rowspan="5" height="125" width="30" style="border-top: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">공<br><br><br>급<br><br><br>자</font></td>'+
				'<td width="120" height="25" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">사업자 등록번호</font></td>'+
				'<td colspan="3" width="350" style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">141-05-39612</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="250" style="border-bottom: 1px solid #000000;" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">'+ string.com_name +' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;귀하</span></td>'+
				'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">상호</font></td>'+
				'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">영글문화사</font></td>'+
				'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">성명</font></td>'+
				'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">천정순</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td rowspan="2" height="50" width="250" style="border-bottom: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:2pt;">아래와 같이 청구합니다.</span><br><br><br>금액 <span style="font-size:10pt; letter-spacing:-1pt;">'+ ReadKorean(asum) +'원정</span></td>'+
				'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt;">사업장소재지</font></td>'+
				'<td width="350" colspan="3" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="left" valign="middle"><span style="font-size:10pt; padding-left:5pt;">경기도 파주시 소라지로 60(신촌동)</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">업태</font></td>'+
				'<td width="130" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제조업</font></td>'+
				'<td width="120" height="25" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:30pt;">종목</font></td>'+
				'<td width="100" style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">제본 및 제책</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td width="250" height="25" align="right" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">&nbsp;</span></td>'+
				'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:3pt;">전화번호</font></td>'+
				'<td width="130" style="border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031-942-8719</font></td>'+
				'<td width="120" height="25" style="border-left: 1px solid #000000;" align="center" valign="middle"><span style="font-size:10pt; letter-spacing:0pt;">FAX</font></td>'+
				'<td width="100" style="border-right: 1px solid #000000; border-left: 1px solid #000000;" height="25" align="center" valign="middle"><span style="font-size:10pt; padding-left:5pt;">031-942-8710</font></td>'+
			'</tr>'+
		'</table>'+
		'<table width="750" border="0" cellpading="0" cellspacing="0">'+
		    '<tr>'+
		        '<td style="border-left: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;" width="230" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>품명</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>규격</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>페이지</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="110" height="25" colspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="50" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>공급가액</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="60" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000;" width="80" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" width="40" height="50" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></span></td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="50" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>권당</b></span></td>'+
		        '<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>기타</b></span></td>'+
		    '</tr>';
		break;
	}
	
	return htmlString_head;
}

function ReadKorean(num){
	var return_val = ""; 
	if(!($.isNumeric(num))){
		alert("유효한 숫자가 아닙니다");
		return 0; 
	}
	if(num < 0){
		return_val = "영";
	  	return return_val;
	}
	var arr_number = (num.toString()).split("").reverse().join("");
	for(var i = arr_number.length - 1; i >= 0; i--){
		// 현재 자리를 구함 
		var digit = arr_number.substring(i, i+1);
		
		// 각 자리 명칭 
		switch (digit){ 
		    case '-' : return_val += "(-) "; break; 
		    case '0' : return_val += ""; break; 
		    case '1' : return_val += "일"; break;    
		    case '2' : return_val += "이"; break;    
		    case '3' : return_val += "삼"; break;    
		    case '4' : return_val += "사"; break;    
		    case '5' : return_val += "오"; break;    
		    case '6' : return_val += "육"; break;    
		    case '7' : return_val += "칠"; break;    
		    case '8' : return_val += "팔"; break;    
		    case '9' : return_val += "구"; break;    
		}
		
		if(digit == "-") continue; 
		
		// 4자리 표기법 공통부분 
	    if(digit != 0){ 
		    if(i % 4 == 1) return_val += "십"; 
		    else if(i % 4 == 2) return_val += "백"; 
		    else if(i % 4 == 3) return_val += "천"; 
	    } 
	    
	    // 4자리 한자 표기법 단위 
	    if(i % 4 == 0){ 
		    if(Math.floor(i / 4) == 0) return_val += ""; 
		    else if(Math.floor(i / 4) == 1) return_val += "만"; 
		    else if(Math.floor(i / 4) == 2) return_val += "억"; 
	    }
	} 
	return return_val;
} 

//코팅비
function SelKbCoating(date1, date2){
	$('#kbCoatingDataTemp').css('display', 'none');
	$('#kbCoatingData').css('display', '');
	
	var from = { date1: date1, date2: date2 }
	var sp3 = 0;
	
	htmlString = "";
	htmlString +=
		'<tr>'+
			'<td width="60" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제작번호</span></td>'+
			'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">년월</span></td>'+
			'<td width="260" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
			'<td width="77" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
			'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">단가</span></td>'+
			'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">공급가액</span></td>'+
			'<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
			'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">회계</span></td>'+
		'</tr>';
	
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
			
		}
	});
	htmlString +=
		'<tr>'+
			'<td width="547" height="30" colspan="5" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">합계</span></td>'+
			'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sp3) +'</span></td>'+
			'<td width="160" height="30" colspan="2" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
		'</tr>';
	
	$("#kbCoatingData").html(htmlString);
}

function SelKbCoatingDetail(uid){//코팅비_디테일 //원가계산서 //미완성
	
}

function PrintKbCoating(){ //wcname, page -> eval
	var t_URL = "/popup?print";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu6("7_인쇄팝업"));
	
	
	var sdate = $("select[name=ty]").val() + $("select[name=tm]").val();
	if(!sdate){
		var d = new Date();
		var sy = d.getFullYear();
		var sm = d.getMonth() + 1;
	}else{
		var sy = parseInt(sdate.substring(0,4));
		var sm = parseInt(sdate.substring(4,6));
	}
	var st = new Date(sy, sm-1, 1, 0, 0, 1).getTime()/1000;
	var et = new Date(sy, sm, 1, 0, 0, 0).getTime()/1000;
	
	var p1 = 0; var p2 = 0; var p3 = 0;
	var sp1 = 0; var sp2 = 0; var sp3 = 0;
	var rec_no = 0;
	var page = 1;
	
	htmlString = "";
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_coating3",
		async: false,
		success: function (result) {
			logNow("1");
			logNow(result);
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var wcname = data["wcname"];
				
				var htmlString_h = 
					'<table border="0" width="730" cellpadding="0" cellspacing="0">'+
						'<tr>'+
							'<td width="730" height="30" valign="middle" align="center">&nbsp;</td>'+
						'</tr>'+
						'<tr>'+
							'<td width="730" height="50" valign="middle" align="center"><span style="font-size:16pt;"><b>'+ sdate.substring(0,4) +'년 '+ sdate.substring(4,6) +'월 거래명세표 - '+ wcname +'</b></span></td>'+
						'</tr>'+
						'<tr>'+
							'<td width="730" height="20" valign="middle" align="left"><span style="font-size:9pt;">'+ string.com_name +'</span></td>'+
						'</tr>'+
						'<tr>'+
							'<td width="730" valign="middle" align="center">'+
								'<table width="730" border="1" cellpadding="0" cellspacing="0" bordercolor="#444444">'+
									'<tr>'+
										'<td width="230" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>품명</b></td>'+
										'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></td>'+
										'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></td>'+
										'<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>공급가액</b></td>'+
										'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>세액</b></td>'+
										'<td width="100" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>합계</b></td>'+
										'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>비고</b></td>'+
									'</tr>';
				
				var from = {date1: st, date2: et, wccode: data["wccode"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_coating4",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						logNow("2");
						logNow(result2);
						if(result2.length != 0){
							htmlString += htmlString_h;
								
							var object_num2 = Object.keys(result2);
							for(var j in object_num2){
								var data2 = result2[object_num2[j]]; 
								
								if (rec_no >= 30){
									rec_no = 0;
									htmlString +=
												'</table>'+
										        '</td>'+
										    '</tr>'+
										    '<tr>'+
										        '<td width="730" height="30" valign="middle" align="center"><span style="font-size:9pt;">'+ page +'</span></td>'+
										    '</tr>'+
										'</table>'+
										'<p style="page-break-before:always">';
									htmlString += htmlString_h;
									page += 1;
								}
								
								var from = {uid: data2["uid"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/directkb/select_kb_coating5",
									async: false,
									data : JSON.stringify(from),
									success: function (result3) {
										logNow("3");
										logNow(result3);
										var object_num3 = Object.keys(result3);
										for(var k in object_num3){
											var data3 = result3[object_num3[k]]; 
											
											p1 = data3["totcost8"];
											p3 = p1 * 1.1;
											p2 = p3 - p1;		
											sp1 += p1;
											sp2 += p2;
											sp3 += p3;
											
											htmlString +=
												'<tr>'+
													'<td width="230" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bname"] +'</td>'+
													'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ data3["cnum8"]; if(!data3["cgubn8"]) htmlString += ' R'; else htmlString += ' 부'; htmlString += '</td>'+
													'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data3["cprice8"]) +'</td>'+
													'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p1) +'</td>'+
													'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p2.toFixed(0)) +'</td>'+
													'<td width="100" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p3.toFixed(0)) +'</td>'+
													'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</td>'+
												'</tr>';
										}
										rec_no += 1; 
									}
								});
							}
						}
					}
				});
				
				//
				var from = {date1: st, date2: et, wccode: data["wccode"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/directkb/select_kb_coating6",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {
						if(result2.length != 0){
							var object_num2 = Object.keys(result2);
							for(var j in object_num2){
								var data2 = result2[object_num2[j]]; 
								
								if(rec_no >= 30){
									rec_no = 0;
									htmlString +=
												'</table>'+
										        '</td>'+
										    '</tr>'+
										    '<tr>'+
										        '<td width="730" height="30" valign="middle" align="center"><span style="font-size:9pt;">'+ page +'</span></td>'+
										    '</tr>'+
										'</table>'+
										'<p style="page-break-before:always">';
									htmlString += htmlString_h;
									page += 1;
								}
								
								var from = {uid: data2["uid"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/directkb/select_kb_coating7",
									async: false,
									data : JSON.stringify(from),
									success: function (result3) {
										var object_num3 = Object.keys(result3);
										for(var k in object_num3){
											var data3 = result3[object_num3[k]]; 
											
											p1 = data3["totcost8"];
											p3 = p1 * 1.1;
											p2 = p3 - p1;		
											sp1 += p1;
											sp2 += p2;
											sp3 += p3;
											
											htmlString +=
												'<tr>'+
													'<td width="230" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["jbname"] +'</td>'+
													'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ data3["cnum8"] +' R</td>'+
													'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data3["cprice8"]) +'</td>'+
													'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p1) +'</td>'+
													'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p2.toFixed(0)) +'</td>'+
													'<td width="100" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p3.toFixed(0)) +'</td>'+
													'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</td>'+
												'</tr>';
											rec_no += 1;
										}
									}
								});
							}
						}
					}
				});
				htmlString +=
					'<tr>'+
						'<td width="380" height="30" colspan="3" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">합계</td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sp1) +'</td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sp2.toFixed(0)) +'</td>'+
						'<td width="100" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sp3) +'</td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</td>'+
					'</tr>';
				
				htmlString += 
							'</table>'+
					        '</td>'+
					    '</tr>'+
					    '<tr>'+
					        '<td width="730" height="30" valign="middle" align="center"><span style="font-size:9pt;">'+ page +'</span></td>'+
					    '</tr>'+
					'</table>';
			}
			htmlString +=
			            	'</table>'+
			    		'</td>'+
			    	'</tr>'+
			    '</table>';
		}
	});
	(popUp.document.getElementById("popdata")).innerHTML = htmlString;
}

//비닐비, 케이스대, CD음반대, 스티커대, 기타
function SelKbManagement(tag, date1, date2){
	$('#kbManagementDataTemp').css('display', 'none');
	$('#kbManagementData').css('display', '');
	
	htmlString = "";
	htmlString +=
		'<tr>'+
			'<td width="90" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;"><b>년월일</b></span></td>'+
			'<td width="220" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>도서명</b></span></td>'+
			'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>도서코드</b></span></td>'+
			'<td width="150" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>거래처</b></span></td>'+
			'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>수량</b></span></td>'+
			'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>단가</b></span></td>'+
			'<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>금액</b></span></td>'+
		'</tr>';
	
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
		}
	});
	$("#kbManagementData").html(htmlString);
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
			htmlString = "";
			if(result.length != 0){
				var data = result[0];
				htmlString += 
					'<tr>'+
			            '<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
			            '<td width="345" height="30" align="center" valign="middle" bgcolor="white"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:290px; text-align:center;" name="cname" value="'+ data["wcname"] + ' - ' + data["wccode"] +'" onFocus="blur();" onClick="javascript:SearchCust('+ "'" + btag + "'" + ',' + tag +');"></td>'+
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
			}else{ //기타 입력버튼 상단
				htmlString += 
					'<tr>'+
			            '<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
			            '<td width="345" height="30" align="center" valign="middle" bgcolor="white"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:290px; text-align:center;" name="cname" value=" - " onFocus="blur();" onClick="javascript:SearchCust('+ "'" + btag + "'" + ',' + tag +');"></td>'+
			            '<td width="102" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">계산</span></td>'+
			            '<td width="185" height="30" align="center" valign="middle" bgcolor="white">'+
			            	'<select name="op1" size="1" style="font-family:굴림; font-size:9pt; width:100;">'+
			                    '<option value="0">세금계산서</option>'+
			                    '<option value="1">계산서</option>'+
							'</select>'+
						'</td>'+
			        '</tr>'+
			        '<input type="hidden" name="cc" value="<?=$cc?>">'+
			        '<input type="hidden" name="tag" value="<?=$tag?>">';
			}
		    $("#kbManagementDetailData1").html(htmlString);
		}
	});
	
	htmlString = "";
	htmlString +=
		'<tr>'+
		    '<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">번호</span></td>'+
		    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">년월일</span></td>'+
		    '<td width="270" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">도서명</span></td>'+
		    '<td width="70" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">단가</span></td>'+
		    '<td width="70" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">수량</span></td>'+
		    '<td width="70" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">금액</span></td>'+
		    '<td width="162" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">메뉴</span></td>'+
		'</tr>';
	
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
		                    '<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChgKbManagementOp('; if(data["op29"] == 1) htmlString += 2; else htmlString += 1; htmlString += ',' +  data["uid"] + ',' + data["ccode9"] + ',' + tag + ');">'+
							//<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;">
			                    '<option value="1"'; if(data["op29"] == 1) htmlString += ' selected'; htmlString += '>제품</option>'+
			                    '<option value="2"'; if(data["op29"] == 2) htmlString += ' selected'; htmlString += '>잡물</option>'+
			                '</select>';
			                if(!data["cprice9"]) htmlString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="javascript:ModiCprice('+ "'" + ccode9 + "'" + ',' + tag +');"><image src="/resources/style/images/jejak/btn_modify.gif" border="0"></a>'; htmlString += '</span>'+
			            '</td>'+
		            '</tr>';     
			}
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
		                	'<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChgKbManagementOp('; if(data["op29"] == 1) htmlString += 2; else htmlString += 1; htmlString += ',' +  data["uid"] + ',' + data["ccode9"] + ',' + tag + ');">'+
							//<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;">
			                    '<option value="1"'; if(data["op29"] == 1) htmlString += ' selected'; htmlString += '>제품</option>'+
			                    '<option value="2"'; if(data["op29"] == 2) htmlString += ' selected'; htmlString += '>잡물</option>'+
			                '</select>'; 
			                if(!data["cprice9"]) htmlString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="javascript:ModiCprice('+ "'" + ccode9 + "'" + ',' + tag +');"><image src="/resources/style/images/jejak/btn_modify.gif" border="0"></a>'; htmlString += '</span>'+
			            '</td>'+
		            '</tr>';
				
			}
		}
	});
	
	if(tag == 5){
		htmlString +=
			'<tr>'+
		        '<td width="50" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:70px;" name="cdate" maxlength="6"></td>'+
		        '<td width="270" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:260px;" name="bname" onFocus="blur();" onClick="javascript:SearchBook();"></td>'+
		            '<input type="hidden" name="bcode">'+
		            '<input type="hidden" name="ccode" value="<?=$cc?>">'+
		            '<input type="hidden" name="tag" value="<?=$tag?>">'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="text-align:right; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:64px;" name="t_sum"></td>'+
		        '<td width="162" align="center" valign="middle" bgcolor="white" height="30"><a href="javascript:InKbManagementDetail('+ ccode9 +');"><img src="/resources/style/images/jejak/b_in.gif" border="0"></a></td>'+
		    '</tr>';
	
	htmlString +=
		'<tr>'+
	        '<td width="470" align="center" valign="middle" bgcolor="#F4F4F4" height="30" colspan="4"></td>'+
	        '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">합계</span></td>'+
	        '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">'+ numberWithCommas(Math.round(sum)) +'</span></td>'+
	        '<td width="162" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;"></span></td>'+
	    '</tr>';
	}
	$("#kbManagementDetailData").html(htmlString);
}

function InKbManagementDetail(ccode){ //tag == 기타(5) 일때 데이터 insert
	var bcode = $("input[name=bcode]").val();
	var cdate = $("input[name=cdate]").val();
	var t_sum = $("input[name=t_sum]").val();
	
	if(bcode == "") return alert("도서 선택하세요");
	if(cdate == "") return alert("날짜 입력하세요");
	if(t_sum == "") return alert("금액 입력하세요");
	
	var new_uid;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_management9",
		async: false,
		success: function (result) {
			new_uid = result[0]["max_uid"] + 1;
		}
	});
	
	var new_date = new Date(parseInt("20" + cdate.substring(0,2)), parseInt(cdate.substring(2,4))-1, parseInt(cdate.substring(4,6)), 12, 0, 0).getTime()/1000;
	
	var from = {
		uid: new_uid,
		ccode9: ccode, 
		bcode9: bcode,
		cdate9: new_date,
		cprice9: t_sum 
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/insert_kb_management1",
		data: JSON.stringify(from),
		success: function (result) {
			alert('데이터 입력 완료');
			SelKbManagementDetail(ccode, 5);
		},
		error: function () {
		}
	});
}

function ChgKbManagementOp(tval, mid, ccode, tag){ //디테일 -> 메뉴 옵션 수정
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

function ModiCprice(ccode, tag){ //디테일 -> 금액 값 수정
	logNow("tag: " + tag);
	
	for(var i = 0; i < $('input[name="cprice[]"]').length; i++){
		var uid = $('input[name="uid[]"]')[i].value;
		var cprice = $('input[name="cprice[]"]')[i].value;
		
		if (cprice > 0){
			var from = {cprice9: cprice, uid: uid}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/directkb/update_kb_management1",
				async: false,
				data: JSON.stringify(from),
				success: function (result) {
					logNow("1");
					logNow(result);
				},
				error: function () {
				}
			});
			
			var from = {uid: uid}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/directkb/select_kb_management7",
				async: false,
				data : JSON.stringify(from),
				success: function (result) {
					var fieldname;
					switch(tag){
						case 2:
							fieldname = "w6"; break;
						case 3:
							fieldname = "w8"; break;
						case 4:
							fieldname = "w7"; break;
						case 5:
							fieldname = "w9"; break;
					}
					logNow(fieldname);
					
					var from = {fieldname: fieldname, cprice9: cprice, jenum: result[0]["crnum9"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/directkb/update_kb_management2",
						async: false,
						data: JSON.stringify(from),
						success: function (result) {
							logNow("2");
							logNow(result);
						},
						error: function () {
						}
					});
				}
			});
		}
	}
	SelKbManagementDetail(ccode, tag);
}

function SearchCust(btag, tag){ //사보검색 팝업
	var t_URL = "/popup?print";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, "print", 'left=0,top=0,width=520,height=300,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu6("사보검색"));
	
	var from = {key: "wcjob", keyfield: btag}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/directkb/select_kb_management6",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if(result.length != 0){
				htmlString = "";
				htmlString +=
					'<tr>'+
			            '<td width="80" height="30" align="center" valign="middle" bgcolor="#E5E5E5"><span style="font-size:9pt;"><b><font color="#333333">코드</font></b></span></td>'+
			            '<td width="130" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">거래처명</font></b></span></p></td>'+
			            '<td width="100" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">분류</font></b></span></p></td>'+
			            '<td width="96" height="30" bgcolor="#E5E5E5" align="center" valign="middle"><span style="font-size:9pt;"><b><font color="#333333">선택</font></b></span></td>'+
			        '</tr>';
				
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					htmlString += 
						'<tr>'+
		                    '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wccode"] +'</span></td>'+
		                    '<td width="130" bgcolor="white" height="30" align="center" valign="middle"><p><span style="font-size:9pt;">'+ data["wcname"] +'</span></p></td>'+
		                    '<td width="100" bgcolor="white" height="30" align="center" valign="middle"><p><span style="font-size:9pt;">'+ data["wcjob"] +'</span></p></td>'+
		                    '<td width="96" height="30" bgcolor="white" align="center" valign="middle"><a href="javascript:window.opener.SelKbManagementDetail('+ "'" + data["wccode"] + "'" + ',' + tag +');self.close();"><img src="/resources/style/images/jejak/btn_pop_sel.gif" width="34" height="18" border="0"></a></td>'+
		                '</tr>';
				}
			}
		}
	});
	(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	
	popUp.document.getElementById("btnSearch").onclick = function() { //검색 버튼 클릭 시
		var key = popUp.document.getElementById("key").value;
		var keyfield = popUp.document.getElementById("keyfield").value;
		if(keyfield){
			var from = {key: key, keyfield: keyfield}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/directkb/select_kb_management6",
				async: false,
				data : JSON.stringify(from),
				success: function (result) {
					if(result.length != 0){
						htmlString = "";
						htmlString +=
							'<tr>'+
					            '<td width="80" height="30" align="center" valign="middle" bgcolor="#E5E5E5"><span style="font-size:9pt;"><b><font color="#333333">코드</font></b></span></td>'+
					            '<td width="130" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">거래처명</font></b></span></p></td>'+
					            '<td width="100" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">분류</font></b></span></p></td>'+
					            '<td width="96" height="30" bgcolor="#E5E5E5" align="center" valign="middle"><span style="font-size:9pt;"><b><font color="#333333">선택</font></b></span></td>'+
					        '</tr>';
						
						var object_num = Object.keys(result);
						for(var i in object_num){
							var data = result[object_num[i]]; 
							
							htmlString += 
								'<tr>'+
				                    '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wccode"] +'</span></td>'+
				                    '<td width="130" bgcolor="white" height="30" align="center" valign="middle"><p><span style="font-size:9pt;">'+ data["wcname"] +'</span></p></td>'+
				                    '<td width="100" bgcolor="white" height="30" align="center" valign="middle"><p><span style="font-size:9pt;">'+ data["wcjob"] +'</span></p></td>'+
				                    '<td width="96" height="30" bgcolor="white" align="center" valign="middle"><a href="javascript:window.opener.SelKbManagementDetail('+ "'" + data["wccode"] + "'" + ',' + tag +');self.close();"><img src="/resources/style/images/jejak/btn_pop_sel.gif" width="34" height="18" border="0"></a></td>'+
				                '</tr>';
						}
					}else{
						htmlString = "";
						htmlString +=
							'<tr>'+
					            '<td width="80" height="30" align="center" valign="middle" bgcolor="#E5E5E5"><span style="font-size:9pt;"><b><font color="#333333">코드</font></b></span></td>'+
					            '<td width="130" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">거래처명</font></b></span></p></td>'+
					            '<td width="100" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">분류</font></b></span></p></td>'+
					            '<td width="96" height="30" bgcolor="#E5E5E5" align="center" valign="middle"><span style="font-size:9pt;"><b><font color="#333333">선택</font></b></span></td>'+
					        '</tr>';
					}
				}
			});
			(popUp.document.getElementById("popdata")).innerHTML = htmlString;
		}
	}
}

function SearchBook(){ //도서검색 팝업
	var t_URL = "/popup?print";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, "print", 'left=0,top=0,width=520,height=300,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu6("도서검색"));
	
	popUp.document.getElementById("btnSearch").onclick = function() { //검색 버튼 클릭 시
		popUp.document.getElementById('popdataTemp').style.display="none";
		popUp.document.getElementById('popdata').style.display="block";
		
		var key = popUp.document.getElementById("key").value;
		var keyfield = popUp.document.getElementById("keyfield").value;
		if(keyfield){
			var from = {key: key, keyfield: keyfield}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/directkb/select_kb_management8",
				async: false,
				data : JSON.stringify(from),
				success: function (result) {
					if(result.length != 0){
						htmlString = "";
						htmlString +=
							'<tr>'+
			                    '<td width="100" height="30" align="center" valign="middle" bgcolor="#E5E5E5"><span style="font-size:9pt;"><b><font color="#333333">코드</font></b></span></td>'+
			                    '<td width="200" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">도서명</font></b></span></p></td>'+
			                    '<td width="96" height="30" bgcolor="#E5E5E5" align="center" valign="middle"><span style="font-size:9pt;"><b><font color="#333333">선택</font></b></span></td>'+
			                '</tr>';
						
						var object_num = Object.keys(result);
						for(var i in object_num){
							var data = result[object_num[i]]; 
							
							htmlString += 
								'<tr>'+
				                    '<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></td>'+
				                    '<td width="200" bgcolor="white" height="30" align="center" valign="middle"><p><span style="font-size:9pt;">'+ data["sbname"] +'</span></p></td>'+
				                    '<td width="96" height="30" bgcolor="white" align="center" valign="middle"><a href="javascript:window.opener.InBookInfo('+ data["sbbook"] + ',' + "'" + data["sbname"] + "'" +');self.close();"><img src="/resources/style/images/jejak/btn_pop_sel.gif" width="34" height="18" border="0"></a></td>'+
				                '</tr>';
						}
					}else{
						htmlString = "";
						htmlString +=
							'<tr>'+
			                    '<td width="100" height="30" align="center" valign="middle" bgcolor="#E5E5E5"><span style="font-size:9pt;"><b><font color="#333333">코드</font></b></span></td>'+
			                    '<td width="200" bgcolor="#E5E5E5" height="30" align="center" valign="middle"><p><span style="font-size:9pt;"><b><font color="#333333">도서명</font></b></span></p></td>'+
			                    '<td width="96" height="30" bgcolor="#E5E5E5" align="center" valign="middle"><span style="font-size:9pt;"><b><font color="#333333">선택</font></b></span></td>'+
			                '</tr>';
					}
				}
			});
			(popUp.document.getElementById("popdata")).innerHTML = htmlString;
		}
	}
}

function InBookInfo(bcode, bname){ //도서검색 팝업 -> 도서정보 출력
	var tName = bname + " - " + bcode;
	$("input[name=bcode]").val(bcode);
	$("input[name=bname]").val(tName);
}