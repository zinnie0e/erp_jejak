////////////////////////////////////////////
//=============== 제품입'출고 ===============//
////////////////////////////////////////////


//구매관리


//판매관리


//반입관리


//증정관리


//폐기관리
function ChkLength1(){
	if($("input[name=date1]").val().length == 6){
		$("input[name=stype]").val(4);
		SelDisposalManagement();
	} 
}

function ChkLength2(){
    if ($("input[name=pnum]").val().length == 4){
    	SelDisposalManagement();
    }
}

function CleanComm(){
	$("input[name=pnum]").val('');
}

function chkMan1(tcode){
	logNow(tcode);
	if(tcode.length == 6){
		logNow("나 6임");
		$("input[name=man1]").val(tcode);
	    //document.man1.value = tcode;
		SelDisposalManagement();
	}
}

function SelDisposalManagement(){
	logNow("ggggg");
	var date1 = $("input[name=date1]").val();
	var pnum = $("input[name=pnum]").val();
	if (date1.length < 6) return $("input[name=date1]").focus();
	else{
		if(pnum.length < 4) return $("input[name=pnum]").focus();
		else return $("input[name=man1]").focus();
	}
	logNow(date1);
	if(date1 != ""){
		logNow("zzz");
		var dbname = date1.substring(0,4);
		logNow(dbname);
		
		var new_pnum = "9999";
		if(!pnum){
			var from = {dbname: dbname, s1ilja: date1}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/productio/select_disposal_management1",
				async: false,
				data : JSON.stringify(from),
				success: function (result) {
					logNow(result);
					if(!result){
						alert("QUERY_ERROR");
						exit;
					}
					if(result[0]){
						logNow("gg");
					}
				}
			});
		}
		logNow("ready");
	}
}

//구매일보
function SelPurchaseDaily(bdate){
	$('#pioPurchaseDailyDataTemp').css('display', 'none');
	$('#pioPurchaseDailyData').css('display', '');
	
	var from = {dbname: bdate.substring(2,6), date: bdate.substring(2,8)}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_purchase_daily2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			
			logNow(result);
			var object_num = Object.keys(result);
			
			var bookname = "";
			var custcode = "";
			var custname = "";
			var bc_code = "0";
			var bc_bunh = "0";
			var ss_chk = 0;
			
			htmlString = "";
			htmlString +=
				'<tr>'+
					'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">발행번호</span></td>'+
					'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제작일</span></td>'+
					'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제작부수</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처명</span></td>'+
					'<td width="40" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">코드</span></td>'+
					'<td width="230" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="50" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서코드</span></td>'+
					'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정가</span></td>'+
					'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">단가</span></td>'+
					'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
				'</tr>';
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var from = {s1book: data["s1book"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/productio/select_purchase_daily3",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						bookname = result[0]["sbname"];
					}
				});
				
				var from = {s1cust: data["s1cust"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/productio/select_purchase_daily4",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						custcode = result[0]["wccode2"];
						custname = result[0]["wcname"];
					}
				});
				logNow(bc_code);
				logNow(custcode);
				if ((bc_code != custcode) || (bc_bunh != data["s1bunh"])){
					bc_code = custcode;
					bc_bunh = data["s1bunh"];
					ss_chk = 0;
				}
				else ss_chk = 1; 
				
				var from = {s1bunh: data["s1bunh"], date: bdate.substring(2,8), s1book: data["s1book"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/productio/select_purchase_daily5",
					async: false,
					data : JSON.stringify(from),
					success: function (result2) {

						logNow(result2);
						var object_num2 = Object.keys(result2);
						
						for(var j in object_num2){
							var data2 = result2[object_num2[j]]; 
							
							var full_date = MsToFulldate(data2["jdate"]);
							full_date = full_date.substring(2,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
							
							htmlString += 
								'<tr>'+
									'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(ss_chk) htmlString += "&nbsp;"; else htmlString += data["s1bunh"]; htmlString += '</span></td>'+
									'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data2["jdate"]) htmlString += full_date; htmlString += '</span></td>'+
									'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data2["jnum"]) +'</span></td>'+
									'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(ss_chk) htmlString += "&nbsp;"; else htmlString += custname; htmlString += '</span></td>'+
									'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(ss_chk) htmlString += "&nbsp;"; else htmlString += custcode; htmlString += '</span></td>'+
									'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;"><a href="javascript:PrintIt();">'+ bookname +'</a></span></td>'+
									'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["s1book"] +'</span></td>'+
									'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["s1uprc"]) +'</span></td>'+
									'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["s1dang"]) +'</span></td>'+
									'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["s1qnty"]) +'</span></td>'+
									'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["s1amnt"]) +'</span></td>'+
								'</tr>';
						}
						$("#pioPurchaseDailyData").html(htmlString);
					}
				});
			}
		}
	});
	
	document.getElementById("btnPrint").onclick = function() { //인쇄 버튼 클릭 시 
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu8("6_인쇄팝업"));
		
		htmlString = "";
		
		var ty = $("select[name=ty]").val();
		var tm = $("select[name=tm]").val();
		var td;
		var tdate = ty.substring(2,4) + tm; // 2001
		
		var from = {dbname: tdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_purchase_daily1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					td = data["s1ilja"].substring(4,6);
					
					htmlString += 
						'<table border="0" cellpadding="0" cellspacing="0" width="750">'+
						    '<tr>'+
						        '<td width="750" height="40">'+
						            '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
						                '<tr>'+
						                	'<td height="80" width="100%" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:20pt;"><b>구매일보</b></span></td>'+
						                '</tr>'+
						                '<tr>'+
						                    '<td>'+
						                        '<table>'+
						                            '<tr>'+
						                                '<td height="20" width="650" align="left" valign="middle"><span style="font-size:11pt;"><b>입고일 : '+ ty +' 년 '+ tm +' 월 '+ td +' 일</b></span></td>'+
						                                '<td height="20" width="100" align="right" valign="middle"><span style="font-size:10pt;">( 단위 : 원 )</span></td>'+
						                            '</tr>'+
						                        '</table>'+
						                    '</td>'+
						                '</tr>'+
						            '</table>'+
						        '</td>'+
						    '</tr>'+
						    '<tr>'+
						        '<td width="750">'+
						            '<table border="0" cellspacing="0" width="750" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
						                '<tr>'+
						                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="50" align="center" valign="middle" bgcolor="#FFFFFF" height="32"><span style="font-size:10pt; letter-spacing:3pt;">번호</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="80" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:1pt;">거래처명</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:3pt;">코드</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="250" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">도 서 명</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">코드</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="60" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">정가</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">단가</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="60" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">수량</span></td>'+
						                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="80" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">금액</span></td>'+
						                '</tr>';
					
					logNow("-----------");
					logNow(data["s1ilja"]);
					var from = {dbname: tdate, date: data["s1ilja"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_purchase_daily2_2",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							logNow(result2);
							
							var aaa = 1; var sum1 = 0; var sum2 = 0; var td_sum1 = 0; var td_sum2 = 0;
							var bc_code = "0"; var bc_bunh = "0"; var ss_chk = 0;
							var bookname = ""; var custcode = ""; var custname = "";
							
							var object_num2 = Object.keys(result2);
							for(var k in object_num2){
								var data2 = result2[object_num[k]]; 
								var arc_num = object_num2.length;
								//logNow(data2["s1book"]);
								
								var from = {s1book: data2["s1book"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/productio/select_purchase_daily3",
									async: false,
									data : JSON.stringify(from),
									success: function (result) {
										bookname = result[0]["sbname"];
									}
								});
								
								var from = {s1cust: data2["s1cust"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/productio/select_purchase_daily4",
									async: false,
									data : JSON.stringify(from),
									success: function (result) {
										custcode = result[0]["wccode2"];
										custname = result[0]["wcname"];
									}
								});
								
								if ((bc_code != custcode) || (bc_bunh != data2["s1bunh"])){
									if(aaa > 1){
										htmlString +=
											'<tr>'+
							                    '<td style="border-bottom: 2px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">번호별소계</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="250" height="32" align="left" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-left:5pt;">&nbsp;</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(sum1) +'</span></td>'+
							                    '<td style="border-bottom: 2px solid #000000" width="80" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(sum2) +'</span></td>'+
							                '</tr>';
									}
									if((aaa < arc_num) || (aaa == arc_num)){
										bc_code = custcode;
										bc_bunh = data2["s1bunh"];
										ss_chk = 0;
										sum1 = 0;
										sum2 = 0;
									}
								}else	ss_chk = 1;
								
								sum1 += data2["s1qnty"];
								sum2 += data2["s1amnt"];
								td_sum1 += data2["s1qnty"];
								td_sum2 += data2["s1amnt"];
								
								htmlString +=
									'<tr>'+
					                    '<td style="border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'; if(ss_chk) htmlString += "&nbsp;"; else htmlString += data2["s1bunh"]; htmlString += '</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'; if(ss_chk) htmlString += "&nbsp;"; else htmlString += custname; htmlString += '</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'; if(ss_chk) htmlString += "&nbsp;"; else htmlString += custcode; htmlString += '</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="250" height="32" align="left" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-left:5pt;">'+ bookname +'</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data2["s1book"] +'</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(data2["s1uprc"]) +'</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(data2["s1dang"].toFixed(2)) +'</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(data2["s1qnty"]) +'</span></td>'+
					                    '<td style="border-bottom: 1px solid #000000" width="80" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(data2["s1amnt"]) +'</span></td>'+
					                '</tr>';
								aaa += 1;
							}
							var d = new Date();
							d = d.getFullYear() + "." + (d.getMonth()+1) + "." + d.getDate();
							htmlString +=
												'<tr>'+
								                    '<td style="border-bottom: 3px double #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">번호별소계</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="250" height="32" align="left" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-left:5pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(sum1) +'</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="80" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(sum2) +'</span></td>'+
								                '</tr>'+
								                '<tr>'+
								                    '<td style="border-bottom: 3px double #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">[[ 합 계 ]]</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="250" height="32" align="left" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-left:5pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(td_sum1) +'</span></td>'+
								                    '<td style="border-bottom: 3px double #000000" width="80" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">'+ numberWithCommas(td_sum2) +'</span></td>'+
								                '</tr>'+
								            '</table>'+
								        '</td>'+
								    '</tr>'+
									'<tr>'+
								        '<td width="750" height="40">'+
								            '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
								                '<tr>'+
								                	'<td width="50%" align="left" valign="middle"><span style="font-size:9pt; padding-left:1pt;"><b>'+ string.com_name +'</b></span></td>'+
								                    '<td width="50%" align="right" valign="middle"><span style="font-size:9pt; padding-right:1pt;"><b>(( '+ d +' ))</b></span></td>'+
								                '</tr>'+
								            '</table>'+
								        '</td>'+
								    '</tr>'+
								'</table>'+
								'<p style="page-break-after:always"></p>';
						}
					});
				}
			}
		});
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}

//월입고현황표
function SelMonStockStatusTable(date1, date2){	
	$('#pioMonStockStatusTableDataTemp').css('display', 'none');
	$('#pioMonStockStatusTableData').css('display', '');
	
	var from = {date1: date1, date2: date2}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/productio/select_mon_stockstatus_table",
		data : JSON.stringify(from),
		success: function (result) {
			
			logNow(result);
			var object_num = Object.keys(result);
		    var pm_num = 0;
		    
		    htmlString = "";
		    htmlString +=
		    	'<tr>'+
					'<td width="40" align="center" valign="middle" bgcolor="#F4F4F4" height="40"><span style="font-size:9pt;">번호</span></td>'+
					'<td width="200" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작<br>수량</span></td>'+
					'<td width="70" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">총제작비</span></td>'+
					'<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작일</span></td>'+
					'<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">총입고<br>수량</span></td>'+
					'<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">미입고<br>수량</span></td>'+
					'<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><font color="blue">증</font>ㆍ<font color="red">감</font></span></td>'+
					'<td width="40" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
					'<td width="80" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제본소</span></td>'+
					'<td width="50" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">메뉴</span></td>'+
				'</tr>';
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				pm_num = data["tnum"] - data["jnum"];
				
				var full_date = MsToFulldate(data["jdate"]);
				full_date = full_date.substring(2,4) + full_date.substring(4,6) + full_date.substring(6,8);
				
				switch (data["jgubn"]){
					case 1:
						var ret = "신간"; break;
					case 2:
						var ret = "재판"; break;
					case 3:
						var ret = "개정"; break;
				}
				htmlString += 
					'<tr>'+
						'<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td width="200" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:3pt; letter-spacing:-1pt;"><a href="javascript:SelMonStockStatusTableDetail('+ data["uid"] +');" class="n">'+ data["bookname"] +'</a></span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["jnum"]) +'</span></td>'+
						'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["wtotal"]) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["tnum"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(data["xnum"] > 0) htmlString += numberWithCommas(data["xnum"]); else htmlString += "0"; htmlString += '</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(pm_num >= 0) htmlString += '<font color=blue>'+ pm_num +'</font>'; else { pm_num *= -1; htmlString += '<font color=red>'+ pm_num +'</font>';} htmlString += '</span></td>'+
						'<td width="45" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ ret +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["wcname"]) +'</span></td>'+
						'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:0pt;">'; if(!data["fchk"]) htmlString += '<input type="button" value="마감" onClick="javascript:Fin_1('+ "'" + data["bookname"] + "'" + ',' + data["uid"] + ');">'; htmlString += '</span></td>'+
					'</tr>';
			}
			$("#pioMonStockStatusTableData").html(htmlString);
		}
	});
	
	document.getElementById("btnPrint").onclick = function() { //계산서 인쇄 버튼 클릭 시
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu8("7_인쇄팝업"));
		
		htmlString = "";
		htmlString += 
			'<tr>'+
		        '<td width="100%" height="40" valign="top" align="center"><span style="font-size:18pt; letter-spacing:3pt;"><b>'+ $("select[name=ty]").val() +' 년 '+ $("select[name=tm]").val() +' 월 &nbsp;입 고 현 황 표</span></td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="100%" height="20" valign="top" align="right"><span style="font-size:9pt; letter-spacing:1pt;"><b>(단위 : 부수)</b></span></td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="100%">'+
		            '<table border="1" cellspacing="0" width="1375" cellpadding="2" bgcolor="white" bordercolor="white">'+
		                '<tr>'+
		                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="40" rowspan="2" align="center" valign="middle" bgcolor="white" height="60"><span style="font-size:10pt;"><b>번호</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="320" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:25pt;"><b>품&nbsp;명</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="60" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>수량</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="80" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>제조비</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="60" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>단가</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>1차</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>2차</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>3차</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>4차</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>5차</b></span></td>'+
		                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="60" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;"><b>마감부수</b></span></td>'+
		                '</tr>'+
		                '<tr>'+
		                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>                '+
		                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
		                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
		                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
		                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
		                '</tr>';
		
		var from = {date1: date1, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/productio/select_mon_stockstatus_table2",
			data : JSON.stringify(from),
			success: function (result) {
				var object_num = Object.keys(result);
			    var pm_num = 0; var rec_num = 0; 
			    var d = new Date();
				d = d.getFullYear() + "." + (d.getMonth()+1) + "." + d.getDate();
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					pm_num = data["tnum"] - data["jnum"];
					
					var full_date = MsToFulldate(data["jdate"]);
					full_date = full_date.substring(2,4) + full_date.substring(4,6) + full_date.substring(6,8);
					
					switch (data["jgubn"]){
						case 1:
							var ret = "신간"; break;
						case 2:
							var ret = "재판"; break;
						case 3:
							var ret = "개정"; break;
					}
					
					
					if(((rec_num % 25) == 0) && rec_num){
						htmlString +=
										'</table>'+
							        '</td>'+
							    '</tr>'+
							    '<tr>'+
							        '<td width="100%" height="30" valign="middle" align="center">'+
							            '<table width="100%">'+
							                '<tr>'+
							                    '<td width="80%" align="left"><span style="font-size:9pt;"><b>'+ string.com_name +'</b></span></td>'+
							                    '<td width="20%" align="right"><span style="font-size:9pt;">(( '+ d +' ))</span></td>'+
							                '</tr>'+
							            '</table>'+
							        '</td>'+
							    '</tr>'+
							'</table>'+
							'<p style="page-break-before:always">'+
							'<table border="0" cellpadding="0" cellspacing="0" width="1375">'+
							    '<tr>'+
							        '<td width="100%" height="40" valign="top" align="center"><span style="font-size:18pt; letter-spacing:3pt;"><b>'+ $("select[name=ty]").val() +' 년 '+ $("select[name=tm]").val() +' 월 &nbsp;입 고 현 황 표</span></td>'+
							    '</tr>'+
							    '<tr>'+
							        '<td width="100%" height="20" valign="top" align="right"><span style="font-size:9pt; letter-spacing:1pt;"><b>(단위 : 부수)</b></span></td>'+
							    '</tr>'+
							    '<tr>'+
							        '<td width="100%">'+
							            '<table border="1" cellspacing="0" width="1375" cellpadding="2" bgcolor="white" bordercolor="white">'+
							                '<tr>'+
							                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="40" rowspan="2" align="center" valign="middle" bgcolor="white" height="60"><span style="font-size:10pt;"><b>번호</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="320" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:25pt;"><b>품&nbsp;명</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="60" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>수량</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="80" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>제조비</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" width="60" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:3pt;"><b>단가</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>1차</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>2차</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>3차</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>4차</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="151" colspan="3" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;"><b>5차</b></span></td>'+
							                    '<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="60" rowspan="2" height="60" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;"><b>마감부수</b></span></td>'+
							                '</tr>'+
							                '<tr>'+
							                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>                '+
							                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
							                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
							                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
							                	'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>날짜</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>수량</b></span></td>'+
							                	'<td style="border-bottom: 1px solid #000000" width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:2pt;"><b>단가</b></span></td>'+
							                '</tr>';
					}
					rec_num += 1;
					
					htmlString +=
						'<tr>'+
		                    '<td style="border-bottom: 1px solid #000000" width="30" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ rec_num +'</span></td>'+
		                    '<td style="border-bottom: 1px solid #000000" width="330" height="32" align="left" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-left:4pt;">'+ data["bookname"] +'</span></td>'+
		                    '<td style="border-bottom: 1px solid #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:3pt;">'+ numberWithCommas(data["jnum"]) +'</span></td>'+
		                    '<td style="border-bottom: 1px solid #000000" width="80" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:3pt;">'+ numberWithCommas(data["wtotal"]) +'</span></td>'+
		                    '<td style="border-bottom: 1px solid #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:3pt;">'+ numberWithCommas(data["wdanga"].toFixed(1)) +'</span></td>';
					
					var row2num;
					var from = {uid: data["uid"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_mon_stockstatus_table3",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							var object_num2 = Object.keys(result2);
							row2num = object_num2.length;
							for(var j in object_num2){
								var data2 = result2[object_num2[j]];
								
								var subdate = data2["idate"].substring(2,4) + '-' + data2["idate"].substring(4,6);
								
								htmlString +=
									'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ subdate +'</span></td>'+
				                	'<td style="border-bottom: 1px solid #000000" width="50" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:3pt;">'+ data2["inum"] +'</span></td>'+
				                	'<td style="border-bottom: 1px solid #000000" width="50" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:3pt;">'+ numberWithCommas(data2["idanga"].toFixed(1)) +'</span></td>';
							}
						}
					});
					
					row2num = 5 - row2num;
					for(var k = row2num; k > 0; k--){
						htmlString +=
							'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>'+
		                	'<td style="border-bottom: 1px solid #000000" width="50" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">&nbsp;</span></td>';
					}
					htmlString += 
							'<td style="border-left: 1px solid #000000; border-bottom: 1px solid #000000" width="60" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:4pt;">';
	                    	if(data["fchk"]) htmlString += numberWithCommas(data["tnum"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
	                    '</tr>';
				}
				
				htmlString += 
							'</table>'+
				        '</td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="100%" height="30" valign="middle" align="center">'+
				            '<table width="100%">'+
				                '<tr>'+
				                    '<td width="80%" align="left"><span style="font-size:9pt;"><b>'+ string.com_name +'</b></span></td>'+
				                    '<td width="20%" align="right"><span style="font-size:9pt;">(( '+ d +' ))</span></td>'+
				                '</tr>'+
				            '</table>'+
				        '</td>'+
				    '</tr>';
				
			}
		});
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}

function SelMonStockStatusTableDetail(uid){ //월입고현황표 디테일
	$('#jejak_detail_view').html(jmenu8("7_detail"));
	
	var from = {uid: uid}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/productio/select_mon_stockstatus_table_detail1",
		data : JSON.stringify(from),
		success: function (result) {
			(document.getElementById("bookname")).innerHTML = result[0]["bookname"];
			
			switch (result[0]["jgubn"]){
				case 1:
					var ret = "신간"; break;
				case 2:
					var ret = "재판"; break;
				case 3:
					var ret = "개정"; break;
			}
			
			var from = {uid: uid}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/productio/select_mon_stockstatus_table_detail2",
				data : JSON.stringify(from),
				success: function (result2) {
					
					logNow(result2);
					var object_num = Object.keys(result2);
					var sum = 0; var xnum = 0;
				    htmlString = "";
				    htmlString +=
				    	'<tr>'+
		                    '<td width="35" align="center" valign="middle" bgcolor="#F4F4F4" height="40"><span style="font-size:9pt;">번호</span></td>'+
		                    '<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작수량</span></td>'+
		                    '<td width="75" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제조비</span></td>'+
		                    '<td width="80" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고일</span></td>'+
		                    '<td width="75" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">단가</span></td>'+
		                    '<td width="55" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
		                    '<td width="70" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">총입고수량</span></td>'+
		                    '<td width="70" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">미입고수량</span></td>'+
		                    '<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><font color="blue">증</font>ㆍ<font color="red">감</font></span></td>'+
		                    '<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
		                    '<td width="80" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제본소</span></td>'+
		                    '<td width="60" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">전표</span></td>'+
		                '</tr>';
					
					for(var i in object_num){
						var data = result2[object_num[i]]; 
						
						sum += data["inum"];
						xnum = result[0]["jnum"] - sum;
						
						var full_date = data["idate"].substring(0,2) + "." + data["idate"].substring(2,4) + "." + data["idate"].substring(4,6);
						
						htmlString += 
							'<tr>'+
			                    '<td width="35" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
			                    '<td style="padding-right:10px;" width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(result[0]["jnum"]) +'</span></td>'+
			                    '<td width="75" style="padding-right:8px;" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(result[0]["wtotal"]) +'</span></td>'+
			                    '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
			                    '<td width="75" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10;">'+ numberWithCommas(data["idanga"]) +'</span></td>'+
			                    '<td style="padding-right:10px;" width="55" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["inum"]) +'</span></td>'+
			                    '<td style="padding-right:10px;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(sum) +'</span></td>'+
			                    '<td style="padding-right:10px;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(xnum < 0) htmlString += "0"; else htmlString += numberWithCommas(xnum); htmlString += '</span></td>'+
			                    '<td style="padding-right:4px;" width="40" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(xnum < 0) {xnum *= -1; htmlString += '<font color=blue>'+ xnum +'</font>';} else htmlString += '<font color=red>'+ xnum +'</font>'; htmlString += '</span></td>'+
			                    '<td width="40" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ ret +'</span></td>'+
			                    '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ result[0]["wcname"] +'</span></td>'+
			                    '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["pnum"] +'</span></td>'+
			                '</tr>';
					}
					$("#pioMonStockStatusTableDetailData").html(htmlString);
				}
			});
		}
	});
}

function Fin_1(bname, uids){ //원래 date도 보내서 리프레시해야함 다시 볼것
	var tStr = bname + " 마감?";
	if (confirm(tStr)){
		logNow(uids);
		var from = {uid: uids}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/productio/update_mon_stockstatus_table1",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert("update성공1");
			},
			error: function () {
			}
		});
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/productio/update_mon_stockstatus_table2",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert("update성공2");
			},
			error: function () {
			}
		});
	}	
}

//재고조회
function SearchBookcode(){
	popUp = "";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open("/bookcode", "BOOKW", 'left=0,top=0,width=380,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu8("8_popup"));
	
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
							'<td onClick="javascript:window.opener.InBookInfo('+ data["sbbook"] +');self.close();" onMouseOver=this.style.backgroundColor="8CFFFE" onMouseOut=this.style.backgroundColor="FFFFFF" width="260" align="left" style="border-left-width: 1; border-right-width: 1; border-top-width: 1; border-bottom-style: dotted; border-bottom-width: 1" bordercolorlight="#FFFFFF" bordercolordark="#FFFFFF" bordercolor="#000000"><span style="font-size:9pt; padding-left:3pt;">'+
								'<font color="'+ font_color +'">'+ data["sbname"] +'</font></span></td>'+
						'</tr>';
				}
				(popUp.document.getElementById("pioMoncuDailytotalData2")).innerHTML = htmlString;
			}
		});
    }
}

function InBookInfo(sbbook){ // m9와 함수 겹침
	$("input[name=pcode]").val(sbbook);
	selInvenInquiry(1);
}

function selInvenInquiry(page){
	var pcode = $("input[name=pcode]").val();
	
	if(pcode == "") return alert("도서코드를 입력하세요");
	
	var page;
	if(!page) page = 0;
	
	$('#pioInvenInquiryDataTemp').css('display', 'none');
	$('#pioInvenInquiryData').css('display', '');
	
	var from = {sbbook: pcode, lm_s: page*30}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_inventory_inquiry1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
		    htmlString = "";
		    htmlString +=
		    	'<tr>'+
					'<td width="20" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">P</font></span></td>'+
					'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><font color="#666666">도서CODE</font></span></p></td>'+
					'<td width="280" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">도서명</font></span></td>'+
					'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><font color="#666666">정가</font></span></p></td>'+
					'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">출판사</font></span></td>'+
					'<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><font color="#666666">유통</font></span></p></td>'+
					'<td width="100" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">TOTAL</font></span></td>'+        
				'</tr>';
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var sqcrnm; var t_sum = 0;
				
				var from = {sqbook: data["sbbook"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/productio/select_inventory_inquiry2",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						sqcrnm = result[0]["sqcrnm"];
						t_sum = data["sqcrnm0"] + sqcrnm;
					}
				});
				
				htmlString +=
					'<tr>'+
						'<td width="20" height="30" align="center" valign="middle"><span style="font-size:9pt;">';if(data["sbpegi"]) htmlString += "P"; else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="80" height="30" align="center" valign="middle"><p style="margin-left:10px;"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></p></td>'+
						'<td width="280" height="30" align="left"><p style="margin-left:2px;"><span style="font-size:9pt;">'+ data["sbname"] +'</span></p></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:6;">'+ numberWithCommas(data["sbuprc"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:6;">'; if(sqcrnm != 0) htmlString += numberWithCommas(sqcrnm); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:6;">'; if(data["sqcrnm0"] != 0) htmlString += numberWithCommas(data["sqcrnm0"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="100" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:6;">'; if(t_sum != 0) htmlString += numberWithCommas(t_sum); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
					'</tr>';
				
			}
			$("#pioInvenInquiryData").html(htmlString);
		}
	});
	
	document.getElementById("BtnGoPrevPage").onclick = function() { 
		GoPrevPage(page);
	}
	document.getElementById("BtnGoNextPage").onclick = function() { 
		GoNextPage(page);
	}
}

function GoPrevPage(page){
	if (page > 0) page -= 1;
	else page = 0;
	selInvenInquiry(page);
}

function GoNextPage(page){
	page += 1;
	selInvenInquiry(page);
}

//월간거래처구분별일일집계
function SetupPIOMonCuDailytotal(){
	var date1 = $("input[name=date1]").val();
	var comm1 = $("input[name=comm1]").val();
	
	if(date1.length != 4) return $("input[name=date1]").focus();
	if(comm1 == "") return $("input[name=comm1]").focus();
	
	var from = {wccode2: comm1}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_mon_cu_dailytotal1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			$("input[name=comm2]").val(result[0]["wcname"]);
		}
	});	
	$('select[name=pgubn]').val("C");
	SelPIOMonCuDailytotal();
}

function SelPIOMonCuDailytotal(){
	var date1 = $("input[name=date1]").val();
	var comm1 = $("input[name=comm1]").val();
	var comm2 = $("input[name=comm2]").val();
	if(comm2 == "") return SetupPIOMonCuDailytotal();
	
	var pgubn = $("select[name=pgubn]").val();
	if(!pgubn) pgubn = "C";
	
	var resultData;
	
	if(date1 && comm1 && pgubn){
		var s1ilja1 = $("input[name=date1]").val() + "01";
		var s1ilja2 = $("input[name=date1]").val() + "31";
		
		var dbname = $("input[name=date1]").val();
		
		$('#pioMoncuDailytotalDataTemp').css('display', 'none');
		$('#pioMoncuDailytotalData').css('display', '');
		
		htmlString = "";
		htmlString +=
			'<tr>'+
				'<td width="80" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">NO</font></span></td>'+
				'<td width="160" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><font color="#666666">일자</font></span></p></td>'+
				'<td width="160" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">전표번호</font></span></td>'+
				'<td width="160" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;"><font color="#666666">수량</font></span></p></td>'+
				'<td width="160" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><font color="#666666">금액</font></span></td>'+
			'</tr>';
		
		var from = {dbname: dbname, s1ilja1: s1ilja1, s1ilja2: s1ilja2, s1gubn: pgubn, s1cust: comm1 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_mon_cu_dailytotal2",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				resultData = result;
				logNow(result);
				var object_num = Object.keys(result);
			   
			    var t_sum1 = 0; var t_sum2 = 0; 
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var n_date = data["s1ilja"].substring(4,6);
					
					t_sum1 += data["sum1"];
			        t_sum2 += data["sum2"];
					
					htmlString += 
						'<tr>'+
							'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:30;">'+ (++i) +'</span></td>'+
							'<td width="160" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:40;">'+ date1 +'<b>'+ n_date +'</b></span></td>'+
							'<td width="160" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:40;">'+ data["s1bunh"] +'</span></td>'+
							'<td width="160" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:40;">'+ numberWithCommas(data["sum1"]) +'</span></td>'+
							'<td width="160" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:40;">'+ numberWithCommas(data["sum2"]) +'</span></td>'+      
						'</tr>';
				}
				$("#pioMoncuDailytotalData").html(htmlString);
				(document.getElementById("t_sum1")).innerHTML = numberWithCommas(t_sum1);
				(document.getElementById("t_sum2")).innerHTML = numberWithCommas(t_sum2);
			}
		});	
	}
	
	document.getElementById("btnPrint").onclick = function() { //인쇄 버튼 클릭 시
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu8("9_인쇄팝업"));
		
		switch(pgubn){
			case "C":
				var gubn = "판매";
				break;
			case "D":
				var gubn = "반입";
				break;
		}
		
		htmlString = "";
		htmlString +=
			'<tr>'+
		        '<td width="650" height="40">'+
		            '<table border="0" cellpadding="0" cellspacing="0" width="650">'+
		                '<tr>'+
		                	'<td height="50" width="50" align="center" valign="middle">&nbsp;</td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000" height="50" width="550" align="center" valign="middle"><span style="font-size:15pt; letter-spacing:3pt;"><b>20'+ date1.substring(0,2) +'년 '+ date1.substring(2,4) +'월 '+ gubn +' 집계현황 </span><'+ $("input[name=comm2]").val() +'></b></td>'+
		                	'<td height="50" width="50" align="center" valign="middle">&nbsp;</td>'+
		                '</tr>'+
		            '</table>'+
		        '</td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="650" height="20">&nbsp;</td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="650">'+
		            '<table border="0" cellspacing="0" width="650" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
		                '<tr>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="50" align="center" valign="middle" bgcolor="#FFFFFF" height="32"><span style="font-size:10pt; letter-spacing:3pt;">NO</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="100" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:35pt;">일자</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="100" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">전표번호</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="120" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:40pt;">수량</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="120" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:50pt;">금액</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="160" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:50pt;">비고</span></td>'+
		                '</tr>';
		
		logNow(resultData);
		
		var object_num = Object.keys(resultData);
	    var t_sum1 = 0; var t_sum2 = 0; 
		for(var i in object_num){
			var data = resultData[object_num[i]]; 
			
			var n_date = data["s1ilja"].substring(4,6);
			
			t_sum1 += data["sum1"];
	        t_sum2 += data["sum2"];
	        
	        htmlString +=
	        	'<tr>'+
	                '<td width="50" height="20" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ (++i) +'</span></td>'+
	                '<td width="100" height="20" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-left:0pt;">'+ date1 +'.'+ n_date +'</span></td>'+
	                '<td width="100" height="20" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["s1bunh"] +'</span></td>'+
	                '<td width="120" height="20" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:15pt;">'+ numberWithCommas(data["sum1"]) +'</span></td>'+
	                '<td width="120" height="20" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:15pt;">'+ numberWithCommas(data["sum2"]) +'</span></td>'+
	                '<td width="160" height="20" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:15pt;"></span></td>'+
	            '</tr>';
		}
		htmlString +=
						'<tr>'+
				            '<td width="250" colspan="3" height="20" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">합계</span></td>'+
				            '<td width="120" height="20" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(t_sum1) +'</span></td>'+
				            '<td width="120" height="20" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(t_sum2) +'</span></td>'+
				            '<td width="160" height="20" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;"></span></td>'+
				        '</tr>'+
				    '</table>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td width="650" height="25" valign="middle">'+
				    '<table border="0" cellspacing="0" width="650" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
				        '<tr>'+
				            '<td style="border-top: 1px double #000000;" width="50%" height="25" align="left" valign="bottom"><span style="font-size:9pt; padding-left:1pt;">'+ string.com_name +'</span></td>'+
				            '<td style="border-top: 1px double #000000;" width="50%" height="25" align="right" valign="bottom"><span style="font-size:9pt; padding-right:1pt;">* PAGE : 1</span></td>'+
				        '</tr>'+
				    '</table>'+
				'</td>'+
			'</tr>';
			
		
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
			
	}
	
}

//도서수불카드
function SelPIOBookPaymentCard(){
	//su/205.php
	var date1 = $("input[name=date1]").val();
	var book1 = $("input[name=book1]").val();
	
	if(date1.length != 4) return $("input[name=date1]").focus();
	if(book1 == "") return $("input[name=book1]").focus();
	
	var year = date1.substring(0,2);
	var month = date1.substring(2,4);
	
	(document.getElementById("title")).innerHTML = year + ' 년 ' + month + ' 월';
	
	var from = {sbbook: book1}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_book_paymentcard1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			$("input[name=book2]").val(result[0]["sbname"]);
		}
	});	
	
	var t_sumall = 0;
	var t_sum1 = 0; var t_sum2 = 0; var t_sum3 = 0; var t_sum4 = 0; var t_sum5 = 0; var t_sum6 = 0;
	
	$('#pioBookPaymentCardData').css('display', '');
	
	htmlString = "";
	htmlString +=
		'<tr>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">월/일</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">전표</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">적요</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">구매</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">반출</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">판매</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">반입</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">증정</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">폐기</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">재입고</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">비고</font></span></td>'+
		'</tr>';
	
	var from = {dbname: year, sbbook: book1, month: parseInt(month)}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_book_paymentcard2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				t_sum1 += data["tbasr"];
		        t_sum2 += data["tbbsr"];
		        t_sum3 += data["tbcsr"];
		        t_sum4 += data["tbdsr"];
		        t_sum5 += data["tbesr"];
		        t_sum6 += data["tbfsr"];
			}
			t_sumall = t_sum1 + t_sum4 - t_sum2 - t_sum3 - t_sum5 - t_sum6;
			
			htmlString +=
				'<tr>'+
					'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">&nbsp;</font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">&nbsp;</font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">전월</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum1) +'</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum2) +'</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum3) +'</a></font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum4) +'</a></font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum5) +'</a></font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum6) +'</a></font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">0</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sumall) +'</a></font></span></td>'+
				'</tr>';
		}
	});

	var m_sum1 = 0; // 구매
	var m_sum2 = 0; // 반출
	var m_sum3 = 0; // 판매
	var m_sum4 = 0; // 반입
	var m_sum5 = 0; // 증정
	var m_sum6 = 0; // 폐기
	var m_sum7 = 0; // 재입고
	
	
	var from = {dbname: date1, sbbook: book1}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_book_paymentcard3",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				/*while(1){
					if ($ip_num && ($row2[S2ILJA] < $row[S1ILJA])){
				}*/ // 컬럼이 없음
				
				m_sum1 += data["sum1"];
		        m_sum2 += data["sum2"];
		        m_sum3 += data["sum3"];
		        m_sum4 += data["sum4"];
		        m_sum5 += data["sum5"];
		        m_sum6 += data["sum6"];
		        
		        t_sumall = t_sumall + data["sum1"] + data["sum4"] - data["sum2"] - data["sum3"] - data["sum5"] - data["sum6"];
		        
		        htmlString +=
		        	'<tr>'+
						'<td width="60" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["s1ilja"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["s1bunh"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle"><span style="font-size:9pt;">'; if(data["s1cust"]) htmlString += data["s1cust"]; else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="70" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">'; if(data["sum1"]) htmlString += numberWithCommas(data["sum1"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="70" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">'; if(data["sum2"]) htmlString += numberWithCommas(data["sum2"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="70" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">'; if(data["sum3"]) htmlString += numberWithCommas(data["sum3"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="70" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">'; if(data["sum4"]) htmlString += numberWithCommas(data["sum4"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="70" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">'; if(data["sum5"]) htmlString += numberWithCommas(data["sum5"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">'; if(data["sum6"]) htmlString += numberWithCommas(data["sum6"]); else htmlString += "&nbsp;"; htmlString += '</span></td>'+
						'<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">&nbsp;</span></td>'+
						'<td width="70" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:15;">'+ numberWithCommas(t_sumall) +'</span></td>'+
					'</tr>';
			}
			htmlString +=
				'<tr>'+
					'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">월계</font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">&nbsp;</font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">&nbsp;</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(m_sum1) +'</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(m_sum2) +'</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(m_sum3) +'</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(m_sum4) +'</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(m_sum5) +'</font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(m_sum6) +'</font></span></td>'+
					'<td width="60" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(m_sum7) +'</font></span></td>'+
					'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">&nbsp;</font></span></td>'+
				'</tr>';
			
			
		}
	});	
	
	t_sum1 += m_sum1;
	t_sum2 += m_sum2;
	t_sum3 += m_sum3;
	t_sum4 += m_sum4;
	t_sum5 += m_sum5;
	t_sum6 += m_sum6;
	//t_sum7 += m_sum7;
	
	htmlString +=
		'<tr>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">합계</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">&nbsp;</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">&nbsp;</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum1) +'</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum2) +'</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum3) +'</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum4) +'</font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum5) +'</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sum6) +'</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666"></font></span></td>'+
			'<td width="70" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#666666">'+ numberWithCommas(t_sumall) +'</font></span></td>'+
		'</tr>';
	$("#pioBookPaymentCardData").html(htmlString);
}

//거래명세서일일번호별집계
function selDealDailyNumber(){
	var date1 = $("input[name=date1]").val();
	var pgubn = $("select[name=pgubn]").val();
	
	if(date1.length != 4) return $("input[name=date1]").focus();
	
	var from = {dbname: date1, s1gubn: pgubn}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_deal_dailynumber1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
		    htmlString = "";
		    var t_sum1 = 0; var t_sum2 = 0; 
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = data["s1ilja"].substring(0,2) + '. ' + data["s1ilja"].substring(2,4) + '. ' + data["s1ilja"].substring(4,6);
				
				t_sum1 += data["sum1"];
		        t_sum2 += data["sum2"];
		        
				htmlString +=
					'<tr>'+
						'<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle"><p style="margin-left:10px;"><span style="font-size:9pt;">'+ data["s1bunh"] +'</span></p></td>'+
						'<td width="200" height="30" align="center"><p style="margin-left:2px;"><span style="font-size:9pt;">'+ data["wcname"] +'</span></p></td>'+
						'<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt; padding-right:6;">'+ data["s1cust"] +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:6;">'+ numberWithCommas(data["sum1"]) +'</span></td>'+
						'<td width="120" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:6;">'+ numberWithCommas(data["sum2"]) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:6;"><?=$t_bigo?></span></td>'+
					'</tr>';
			}
			$("#pioDealDailyNumberData").html(htmlString);
			(document.getElementById("t_sum1")).innerHTML = numberWithCommas(t_sum1);
			(document.getElementById("t_sum2")).innerHTML = numberWithCommas(t_sum2);
		}
	});
	
	document.getElementById("btnPrint").onclick = function() { //계산서 인쇄 버튼 클릭 시
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu8("11_인쇄팝업1"));
		
		htmlString = ""
		logNow("계산서 인쇄");
		
		//기타 거래처는 일합
		UpdateKS300000(date1, "C", 1); //판매
		UpdateKS300000(date1, "D", 1); //반입
		
		//아트는 월합
		UpdateKS300000(date1, "C", 2); //판매
		UpdateKS300000(date1, "D", 2); //반입
		
		var tblname = "KS300000";
		logNow("---------------");
		var from = {dbname: tblname, s3ilja1: date1+"01", s3ilja2: date1+"31", s3gubn: "C"};
		logNow(from);
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber6",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var s1cust = data["s3cust"];
					var s1gubn = "C";
					var tnum = "<b>[일합]<b>";
					var qnty = data["s3qnty"];
					var amnt = data["s3amnt"];
					var tdate = data["s3ilja"];
					var bal_num = data["s3balb"];
					
					var result_htmlString = getPrintHtml(date1, s1cust, s1gubn, tnum, qnty, amnt, tdate, bal_num);
					
					htmlString += result_htmlString;
				}
			}
		});
		var from = {dbname: tblname, s3ilja1: date1+"01", s3ilja2: date1+"31", s3gubn: "D"};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber6",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var s1cust = data["s3cust"];
					var s1gubn = "D";
					var tnum = "<b>[일합] [반입]<b>";
					var qnty = data["s3qnty"];
					var amnt = data["s3amnt"];
					var tdate = data["s3ilja"];
					var bal_num = data["s3balb"];
					
					var result_htmlString = getPrintHtml(date1, s1cust, s1gubn, tnum, qnty, amnt, tdate, bal_num);
					
					htmlString += result_htmlString;
				}
			}
		});
		var from = {dbname: tblname, s3ilja: date1, s3gubn: "C"};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber7",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result); //////////////////////////////////////요기요
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var s1cust = data["s3cust"];
					var s1gubn = "C";
					var tnum = "<b>[월합]<b>";
					var qnty = data["s3qnty"];
					var amnt = data["s3amnt"];
					var tdate = data["s3ilja"];
					var bal_num = data["s3balb"];
					
					var result_htmlString = getPrintHtml(date1, s1cust, s1gubn, tnum, qnty, amnt, tdate, bal_num);
					
					htmlString += result_htmlString;
				}
			}
		});
		var from = {dbname: tblname, s3ilja: date1, s3gubn: "D"};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber7",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result); //////////////////////////////////////요기요
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var s1cust = data["s3cust"];
					var s1gubn = "D";
					var tnum = "<b>[월합] [반입]<b>";
					var qnty = data["s3qnty"];
					var amnt = data["s3amnt"];
					var tdate = data["s3ilja"];
					var bal_num = data["s3balb"];
					
					var result_htmlString = getPrintHtml(date1, s1cust, s1gubn, tnum, qnty, amnt, tdate, bal_num);
					
					htmlString += result_htmlString;
				}
			}
		});
		logNow("---------------");
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
	
	document.getElementById("btnPrint2").onclick = function() { //현황 인쇄 버튼 클릭 시
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu8("11_인쇄팝업2"));
		
		htmlString = "";
		for(var ii = 1; ii < 32; ii++){
			ii = ii >= 10 ? ii : '0' + ii;
			var tilja = date1 + ii;
			
			//판매
			var from = {dbname: date1, s1ilja: tilja, s1gubn: "C"}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/productio/select_deal_dailynumber2",
				data : JSON.stringify(from),
				success: function (result) {
					if(result.length != 0){
						htmlString += 
							'<tr>'+
						        '<td width="750" height="40">'+
						            '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
						                '<tr>'+
						                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                    '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000" height="50" width="450" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:5pt;"><b>거래명세서 일일 번호별 집계</b></span></td>'+
						                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                '</tr>'+
						                '<tr>'+
						                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                	'<td height="50" width="450" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:1pt;"><b>[ '+ tilja.substring(0,2) +'. '+ tilja.substring(2,4) +'. '+ tilja.substring(4,6) +' ]</b></span></td>'+
						                    '<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                '</tr>'+
						                '<tr>'+
						                	'<td height="50" width="150" align="left" valign="middle"><span style="font-size:12pt;">* 판매구분 : <b>판매</b></span></td>'+
						                	'<td height="50" width="450" align="center" valign="middle"><span style="font-size:12pt;">[ 장곡리 창고 ]</span></td>'+
						                    '<td height="50" width="150" align="right" valign="middle"><span style="font-size:12pt;">* PAGE : 1</span></td>'+
						                '</tr>'+
						            '</table>'+
						        '</td>'+
						    '</tr>'+
						    '<tr>'+
						        '<td width="750">'+
						            '<table border="0" cellspacing="0" width="750" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
						                '<tr>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="80" align="center" valign="middle" bgcolor="#FFFFFF" height="32"><span style="font-size:10pt; letter-spacing:3pt;">발행번호</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="140" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">거래처명</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="80" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:3pt;">CODE</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="120" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:30pt;">부수</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="140" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">출고액</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:7pt;">구분</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000; border-right: 1px dotted #000000;" width="120" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:30pt;">비고</span></td>'+
						                '</tr>';
						
						var object_num = Object.keys(result);
					    var t_sum1 = 0; var t_sum2 = 0; 
						
						for(var i in object_num){
							var data = result[object_num[i]]; 
							
							t_sum1 += data["sum1"];
					        t_sum2 += data["sum2"];
					        
					        htmlString +=
					        	'<tr>'+
					                '<td style="border-bottom: 1px solid #000000;" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["s1bunh"] +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="140" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["wcname"] +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["s1cust"] +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(data["sum1"]) +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="140" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(data["sum2"]) +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
					            '</tr>';
						}
						var d = new Date();
						d = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
						htmlString +=
										'<tr>'+
							                '<td style="border-bottom: 1px double #000000;" width="300" colspan="3" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:15pt;">[ 합 계 ]</span></td>'+	                
							                '<td style="border-bottom: 1px double #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(t_sum1) +'</span></td>'+
							                '<td style="border-bottom: 1px double #000000;" width="140" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(t_sum2) +'</span></td>'+
							                '<td style="border-bottom: 1px double #000000;" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
							                '<td style="border-bottom: 1px double #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
							            '</tr>'+
							        '</table>'+
							    '</td>'+
							'</tr>'+
							'<tr>'+
							    '<td width="750" height="40">'+
							        '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
							            '<tr>'+
							            	'<td width="50%" align="left" valign="middle"><span style="font-size:9pt; padding-left:1pt;">'+ string.com_name +'</span></td>'+
							                '<td width="50%" align="right" valign="middle"><span style="font-size:9pt; padding-right:1pt;">(( '+ d +' ))</span></td>'+
							            '</tr>'+
							        '</table>'+
							    '</td>'+
						    '</tr>';
					}
				}
			});
			
			//반입
			var from = {dbname: date1, s1ilja: tilja, s1gubn: "D"}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/productio/select_deal_dailynumber2",
				data : JSON.stringify(from),
				success: function (result) {
					if(result.length != 0){
						htmlString += 
							'<tr>'+
						        '<td width="750" height="40">'+
						            '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
						                '<tr>'+
						                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                    '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000" height="50" width="450" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:5pt;"><b>거래명세서 일일 번호별 집계</b></span></td>'+
						                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                '</tr>'+
						                '<tr>'+
						                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                	'<td height="50" width="450" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:1pt;"><b>[ '+ tilja.substring(0,2) +'. '+ tilja.substring(2,4) +'. '+ tilja.substring(4,6) +' ]</b></span></td>'+
						                    '<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
						                '</tr>'+
						                '<tr>'+
						                	'<td height="50" width="150" align="left" valign="middle"><span style="font-size:12pt;">* 판매구분 : <b>반입</b></span></td>'+
						                	'<td height="50" width="450" align="center" valign="middle"><span style="font-size:12pt;">[ 장곡리 창고 ]</span></td>'+
						                    '<td height="50" width="150" align="right" valign="middle"><span style="font-size:12pt;">* PAGE : 1</span></td>'+
						                '</tr>'+
						            '</table>'+
						        '</td>'+
						    '</tr>'+
						    '<tr>'+
						        '<td width="750">'+
						            '<table border="0" cellspacing="0" width="750" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
						                '<tr>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="80" align="center" valign="middle" bgcolor="#FFFFFF" height="32"><span style="font-size:10pt; letter-spacing:3pt;">발행번호</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="140" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:5pt;">거래처명</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="80" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:3pt;">CODE</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="120" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:30pt;">부수</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="140" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">출고액</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:7pt;">구분</span></td>'+
						                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000; border-right: 1px dotted #000000;" width="120" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:30pt;">비고</span></td>'+
						                '</tr>';
						
						var object_num = Object.keys(result);
					    var t_sum1 = 0; var t_sum2 = 0; 
						
						for(var i in object_num){
							var data = result[object_num[i]]; 
							
							t_sum1 += data["sum1"];
					        t_sum2 += data["sum2"];
					        
					        htmlString +=
					        	'<tr>'+
					                '<td style="border-bottom: 1px solid #000000;" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["s1bunh"] +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="140" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["wcname"] +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="80" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["s1cust"] +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(data["sum1"]) +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="140" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(data["sum2"]) +'</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
					                '<td style="border-bottom: 1px solid #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
					            '</tr>';
						}
						var d = new Date();
						d = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
						htmlString +=
										'<tr>'+
							                '<td style="border-bottom: 1px double #000000;" width="300" colspan="3" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:15pt;">[ 합 계 ]</span></td>'+	                
							                '<td style="border-bottom: 1px double #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(t_sum1) +'</span></td>'+
							                '<td style="border-bottom: 1px double #000000;" width="140" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(t_sum2) +'</span></td>'+
							                '<td style="border-bottom: 1px double #000000;" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
							                '<td style="border-bottom: 1px double #000000;" width="120" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
							            '</tr>'+
							        '</table>'+
							    '</td>'+
							'</tr>'+
							'<tr>'+
							    '<td width="750" height="40">'+
							        '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
							            '<tr>'+
							            	'<td width="50%" align="left" valign="middle"><span style="font-size:9pt; padding-left:1pt;">'+ string.com_name +'</span></td>'+
							                '<td width="50%" align="right" valign="middle"><span style="font-size:9pt; padding-right:1pt;">(( '+ d +' ))</span></td>'+
							            '</tr>'+
							        '</table>'+
							    '</td>'+
						    '</tr>';
					}
				}
			});
		}
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}

function UpdateKS300000(date1, type, code){
	var tblname2 = "KS300000";
	if(code == 1){//기타 거래처는 일합
		logNow(type);
		var from = {dbname: date1, s1gubn: type}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber3",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var from = {dbname: tblname2, s3ilja: data["s1ilja"], s3cust: data["s1cust"], s1gubn: type}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_deal_dailynumber4",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							logNow(result);
							if(result.length != 0){
								var from = {dbname: tblname2, s3qnty: data["sum1"], s3amnt: data["sum2"], uid: result[0]["uid"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									async: false,
									url: SETTING_URL + "/productio/update_deal_dailynumber1",
									data: JSON.stringify(from),
									success: function (result) {
										logNow(result);
									},
									error: function () {
									}
								});
							}else{
								var ty = date1.substring(0,2) + "0000";
								var new_balb;
								var from = {dbname: tblname2, s3ilja: ty}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/productio/select_deal_dailynumber5",
									async: false,
									data : JSON.stringify(from),
									success: function (result) {
										if(result){
											var tbal = parseInt(result[0]["max_s3balb"].substring(1,6)) + 1;
											new_balb = "S" + fillZero(tbal, 5);
										}else new_balb = "S00001";
										
										var from = {
												dbname: tblname2,
												s3ilja: data["s1ilja"], 
												s3gubn: type,
												s3balb: new_balb,
												s3cust: data["s1cust"],
												s3qnty: data["sum1"],
												s3amnt: data["sum2"],
												s3cjil: "일합",
												s3mank: data["s1ilja"]
											}
										$.ajax({
											type: "POST",
											contentType: "application/json; charset=utf-8;",
											dataType: "json",
											url: SETTING_URL + "/productio/insert_deal_dailynumber1",
											async: false,
											data: JSON.stringify(from),
											success: function (result) {
												logNow(result);
											},
											error: function () {
											}
										});
									}
								});
							}
						}
					});
				}
			}
		});
	}
	else if(code == 2){// 아트는 월합
		var yy1 = parseInt("20" + date1.substring(0,2));
		var mm1 = parseInt(date1.substring(2,4));
		var tdate1 = new Date(yy1, mm1, 0).getTime()/1000;
		var tdate = MsToFulldate(tdate1).substring(2,8);

		var from = {dbname: date1, s1gubn: type}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber3_2",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var from = {dbname: tblname2, s3ilja: tdate, s3cust: data["s1cust"], s1gubn: type}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_deal_dailynumber4_2",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							logNow(result);
							if(result.length != 0){
								var from = {dbname: tblname2, s3qnty: data["sum1"], s3amnt: data["sum2"], uid: result[0]["uid"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									async: false,
									url: SETTING_URL + "/productio/update_deal_dailynumber1",
									data: JSON.stringify(from),
									success: function (result) {
										logNow(result);
									},
									error: function () {
									}
								});
							}else{
								var ty = date1.substring(0,2) + "0000";
								var new_balb;
								var from = {dbname: tblname2, s3ilja: ty}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/productio/select_deal_dailynumber5",
									async: false,
									data : JSON.stringify(from),
									success: function (result) {
										if(result){
											var tbal = parseInt(result[0]["max_s3balb"].substring(1,6)) + 1;
											new_balb = "S" + fillZero(tbal, 5);
										}else new_balb = "S00001";
										
										logNow("aaaa      " + tdate);
										var from = {
												dbname: tblname2,
												s3ilja: tdate, 
												s3gubn: type,
												s3balb: new_balb,
												s3cust: data["s1cust"],
												s3qnty: data["sum1"],
												s3amnt: data["sum2"],
												s3cjil: "월합",
												s3mank: tdate
											}
										$.ajax({
											type: "POST",
											contentType: "application/json; charset=utf-8;",
											dataType: "json",
											url: SETTING_URL + "/productio/insert_deal_dailynumber1",
											async: false,
											data: JSON.stringify(from),
											success: function (result) {
												logNow(result);
											},
											error: function () {
											}
										});
									}
								});
							}
						}
					});
				}
			}
		});
	}
}

function getPrintHtml(date1, s1cust, s1gubn, tnum, qnty, amnt, tdate, bal_num){
	result_htmlString = "";
	var scname; var scsaup; var scdeap; var scadd1; var scupte; var scjong; 
	var from = {s1cust: s1cust}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_deal_dailynumber8",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			scname = result[0]["wcname"];
			scsaup = result[0]["wcsaup"];
			scdeap = result[0]["wcdeap"];
			scadd1 = result[0]["wcjuso"];
			scupte = result[0]["wctae"];
			scjong = result[0]["wcjong"];
		}
	});
	
	var sbbook;
	logNow("s1cust    " + s1cust);
	if(s1cust == "1006"){
		var from = {dbname: date1, s1ilja: date1, s1gubn: s1gubn}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber9",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				sbbook = result[0]["s1book"];
			}
		});
	}else{
		var from = {dbname: date1, s1ilja: tdate, s1cust: s1cust, s1gubn: s1gubn}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/productio/select_deal_dailynumber10",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				sbbook = result[0]["s1book"];
			}
		});
	}
	logNow("sbbook    " + sbbook);
	
	var bookname;
	var from = {sbbook: sbbook}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_deal_dailynumber11",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			bookname = result[0]["sbname"] + " 外";
		}
	});
	
	var new_amnt = amnt.toString();
	var blanknum = 10 - new_amnt.length;
	logNow(bal_num);
	bal_num = "0" + bal_num.substring(1,6);
	 logNow(new_amnt);
	 logNow(blanknum);
	 logNow(bal_num);
	 
	 
	result_htmlString +=
		'<tr>'+
	        '<td width="27" height="10">　</td>'+
	        '<td width="25" height="10">　</td>'+
	        '<td width="220" height="10">　</td>'+
	        '<td width="85" height="10">　</td>'+
	        '<td width="115" height="10" align="right">　</td>'+
	        '<td width="55" height="10" valign="bottom" align="left"><span style="font-size:9pt;">'+ bal_num +'</span></td>'+
	        '<td width="115" height="10"></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="32">　</td>'+
	        '<td width="25" height="32">　</td>'+
	        '<td width="220" height="32">　</td>    '+
	        '<td width="370" height="32" colspan="4" align="left" valign="bottom"><span style="font-size:10pt; padding-left:65pt;">'+ scsaup +'</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="36">　</td>'+
	        '<td width="25" height="36">　</td>'+
	        '<td width="220" height="36">　</td>'+
	        '<td width="200" colspan="2" height="36" align="left" valign="bottom">'+
	        '<table border="0"><tr><td width="65"> </td><td width="135"><span style="font-size:10pt; padding-left:0pt;">'+ scname +'</span></td></tr></table>	</td>'+
	        '<td width="170" colspan="2" height="36" align="left" valign="bottom"><span style="font-size:10pt; padding-left:40pt;">'+ scdeap +'</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="38">　</td>'+
	        '<td width="25" height="38">　</td>'+
	        '<td width="220" height="38">　</td>'+
	        '<td width="370" colspan="4" height="38" align="left" valign="bottom"><span style="font-size:10pt; padding-left:65pt;">'+ scadd1 +'</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="35">　</td>'+
	        '<td width="25" height="35">　</td>'+
	        '<td width="220" height="35">　</td>'+
	        '<td width="200" height="35" colspan="2" align="left" valign="bottom"><span style="font-size:10pt; padding-left:65pt;">'+ scupte +'</span></td>'+
	        '<td width="170" height="35" colspan="2" align="left" valign="bottom"><span style="font-size:10pt; padding-left:40pt;">'+ scjong +'</span></td>'+
	    '</tr>'+
	     '<tr>'+
	        '<td width="642" colspan="7" height="63">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="52" colspan="2" height="30" align="right"><span style="font-size:11pt;">20'+ tdate.substring(0,2) +'</span></td>    '+
	        '<td width="220" height="30" align="left">'+
	            '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="216" id="AutoNumber2" height="100%">'+
	                '<tr>'+
	                    '<td width="45" align="right"><span style="font-size:11pt; padding-right:2pt;">'+ tdate.substring(2,4) +'</span></td>'+
	                    '<td width="28" align="right"><span style="font-size:11pt;">'+ tdate.substring(4,6) +'</span></td>'+
	                    '<td width="25" align="right"><span style="font-size:11pt;">'+ blanknum +'</span></td>';
	
	var new_length = 10 - blanknum;
	if(tnum.indexOf('반입') != -1){
		amnt *= -1;
		new_amnt = "-" + new_amnt;
		new_length += 1;
	}
	var nodd = Math.floor(new_length/2);
	var neven = new_length - nodd;
	var tbl_width = (nodd * 9) + (neven * 10) + 13;
	
	result_htmlString += 
		'<td width="118" align="right"><!--<?=$new_amnt?></span></td>-->'+
            '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="118" height="100%">'+
	            '<tr>'+
		            '<td width="'+ (118-tbl_width) +'">&nbsp;</td>';
	
	var new_val = new_amnt.toString();
	for (var kk = 0; kk < new_length ; kk++){
		if ((kk % 2) == 1) var pwidth = 9;
		else var pwidth = 10;
		result_htmlString += '<td width="'+ pwidth +'" align="right"><span style="font-size:11pt;">'+ new_val.substring(kk, kk+1) +'</span></td>';
	}
	result_htmlString += 
									'<td width="13" align="left"><span style="font-size:11pt;">&nbsp;</span></td>'+
					            '</tr>'+
				            '</table>'+
			            '</td>'+
		            '</tr>'+
		        '</table>'+
		    '</td>'+
		    '<td width="85" height="30">　</td>'+
		    '<td width="115" height="30">　</td>'+
		    '<td width="170" colspan="2" height="30" align="right"><span style="font-size:10pt; padding-right:49pt;">'+ tnum +'</span></td>'+
		'</tr>'+
		'<tr>'+
		    '<td width="642" height="26" colspan="7">　</td>'+
		'</tr>'+
		'<tr>'+
		    '<td width="27" height="20" align="right" valign="bottom"><span style="font-size:10pt; padding-right:3pt;">'+ tdate.substring(2,4) +'</span></td>'+
		    '<td width="25" height="20" align="left" valign="bottom"><span style="font-size:10pt;">'+ tdate.substring(4,6) +'</span></td>'+
		    '<td width="305" colspan="2" height="20" align="left" valign="bottom"><span style="font-size:10pt; letter-spacing:-1pt;">'+ bookname +'</span></td>'+
		    '<td width="170" height="20" colspan="2" align="right" valign="bottom"><!--<?=$amnt?></span></td>-->'+
			    '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="170" height="100%">'+
		            '<tr>'+
		                '<td width="'+ (170-tbl_width) +'">&nbsp;</td>';
	
	for(var kk = 0; kk < new_length ; kk++){
		result_htmlString += '<td width="10" height="20" align="left" valign="bottom"><span style="font-size:11pt;">'+ new_val.substring(kk, kk+1) +'</span></td>';
	}
	result_htmlString +=
						'<td width="50" height="20" align="left" valign="bottom"><span style="font-size:11pt;">&nbsp;</span></td>'+
				    '</tr>'+
			    '</table>'+
		    '</td>'+
	        '<td width="115" height="20">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="25" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="220" height="31"><span style="font-size:10pt; letter-spacing:-1pt; padding-left:1pt;"></span></td>'+
	        '<td width="85" height="31" align="right"><span style="font-size:10pt; padding-right:34pt;"></span></td>'+
	        '<td width="170" height="31" colspan="2" align="right"><span style="font-size:10pt; padding-right:4pt;"></span></td>'+
	        '<td width="115" height="31">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="25" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="220" height="31"><span style="font-size:10pt; letter-spacing:-1pt; padding-left:1pt;"></span></td>'+
	        '<td width="85" height="31" align="right"><span style="font-size:10pt; padding-right:34pt;"></span></td>'+
	        '<td width="170" height="31" colspan="2" align="right"><span style="font-size:10pt; padding-right:4pt;"></span></td>'+
	        '<td width="115" height="31">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="34" align="center"><font size="2"></font></td>'+
	        '<td width="25" height="34" align="center"><font size="2"></font></td>'+
	        '<td width="220" height="34"><span style="font-size:10pt; letter-spacing:-1pt; padding-left:1pt;"></span></td>'+
	        '<td width="85" height="34" align="right"><span style="font-size:10pt; padding-right:34pt;"></span></td>'+
	        '<td width="170" height="34" colspan="2" align="right"><span style="font-size:10pt; padding-right:4pt;"></span></td>'+
	        '<td width="115" height="34">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="272" height="27" colspan="3" align="right" valign="top"><span style="font-size:11pt; padding-right:130pt;">'+ numberWithCommas(amnt) +'</span></td>'+
	        '<td width="85" height="27">　</td>'+
	        '<td width="115" height="27">　</td>'+
	        '<td width="170" height="27" colspan="2" align="left"><span style="font-size:12pt; padding-left:34pt;">■■</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="642" colspan="7" height="82">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="10">　</td>'+
	        '<td width="25" height="10">　</td>'+
	        '<td width="220" height="10">　</td>'+
	        '<td width="85" height="10">　</td>'+
	        '<td width="115" height="10" align="right">　</td>'+
	        '<td width="55" height="10" valign="bottom" align="left"><span style="font-size:9pt;">'+ bal_num +'</span></td>'+
	        '<td width="115" height="10"></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="32">　</td>'+
	        '<td width="25" height="32">　</td>'+
	        '<td width="220" height="32">　</td>    '+
	        '<td width="370" height="32" colspan="4" align="left" valign="bottom"><span style="font-size:10pt; padding-left:62pt;">'+ scsaup +'</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="36">　</td>'+
	        '<td width="25" height="36">　</td>'+
	        '<td width="220" height="36">　</td>'+
	        '<!--<td width="200" colspan="2" height="36" align="left" valign="bottom"><span style="font-size:10pt; padding-left:62pt;"><?=$scname?></span></td>-->'+
	        '<td width="200" colspan="2" height="36" align="left" valign="bottom">'+
	            '<table border="0">'+
	                '<tr>'+
	                    '<td width="65"> </td>'+
	                    '<td width="135"><span style="font-size:10pt; padding-left:0pt;">'+ scname +'</span></td>'+
	                '</tr'+
	            '></table>	'+
	        '</td>'+
	        '<td width="170" colspan="2" height="36" align="left" valign="bottom"><span style="font-size:10pt; padding-left:40pt;">'+ scdeap +'</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="38">　</td>'+
	        '<td width="25" height="38">　</td>'+
	        '<td width="220" height="38">　</td>'+
	        '<td width="370" colspan="4" height="38" align="left" valign="bottom"><span style="font-size:10pt; padding-left:62pt;">'+ scadd1 +'</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="35">　</td>'+
	        '<td width="25" height="35">　</td>'+
	        '<td width="220" height="35">　</td>'+
	        '<td width="200" height="35" colspan="2" align="left" valign="bottom"><span style="font-size:10pt; padding-left:62pt;">'+ scupte +'</span></td>'+
	        '<td width="170" height="35" colspan="2" align="left" valign="bottom"><span style="font-size:10pt; padding-left:40pt;">'+ scjong +'</span></td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="642" colspan="7" height="62">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="52" colspan="2" height="30" align="right"><span style="font-size:11pt;">20'+ tdate.substring(0,2) +'</span></td>    '+
	        '<td width="220" height="30" align="left">'+
	            '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="216" id="AutoNumber2" height="100%">'+
	                '<tr>'+
	                    '<td width="45" align="right"><span style="font-size:11pt; padding-right:4pt;">'+ tdate.substring(2,4) +'</span></td>'+
	                    '<td width="28" align="right"><span style="font-size:11pt; padding-right:3pt;">'+ tdate.substring(4,6) +'</span></td>'+
	                    '<td width="25" align="right"><span style="font-size:11pt; padding-right:2pt;">'+ blanknum +'</span></td>';
	
	nodd = Math.floor(new_length/2);
	neven = new_length - nodd;
	tbl_width = (nodd * 9) + (neven * 10) + 16;
	
	result_htmlString +=
		'<td width="118" align="right"><!--<?=$new_amnt?></span></td>-->'+
            '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="118" height="100%">'+
                '<tr>'+
                    '<td width="'+ (118-tbl_width) +'">&nbsp;</td>';
	
	new_val = new_amnt.toString();
	for(var kk = 0; kk < new_length ; kk++){
		if((kk % 2) == 1) var pwidth = "9";
		else var pwidth = "10";
		result_htmlString += '<td width="'+ pwidth +'" align="right"><span style="font-size:11pt;">'+ new_val.substring(kk, kk+1) +'</span></td>';
	}
	
	result_htmlString +=
									'<td width="16" align="left"><span style="font-size:11pt;">&nbsp;</span></td>'+
		                        '</tr>'+
		                    '</table>'+
		                '</td>'+
		            '</tr>'+
		        '</table>'+
		    '</td>'+
		    '<td width="85" height="30">　</td>'+
		    '<td width="115" height="30">　</td>'+
		    '<td width="170" colspan="2" height="30" align="right"><span style="font-size:10pt; padding-right:49pt;">'+ tnum +'</span></td>'+
		'</tr>'+
		'<tr>'+
		    '<td width="642" height="26" colspan="7">　</td>'+
		'</tr>'+
		'<tr>'+
		    '<td width="27" height="20" align="right" valign="bottom"><span style="font-size:10pt; padding-right:3pt;">'+ tdate.substring(2,4) +'</span></td>'+
		    '<td width="25" height="20" align="left" valign="bottom"><span style="font-size:10pt;">'+ tdate.substring(4,6) +'</span></td>'+
		    '<td width="305" colspan="2" height="20" align="left" valign="bottom"><span style="font-size:10pt; letter-spacing:-1pt;">'+ bookname +'</span></td>'+
		    '<td width="170" height="20" colspan="2" align="right" valign="bottom"><!--<?=$amnt?></span></td>-->'; tbl_width = new_length * 10 + 53; htmlString +=
			        '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="170" height="100%">'+
		            '<tr>'+
		                '<td width="'+ (170-tbl_width) +'">&nbsp;</td>';
		    
	for(var kk = 0; kk < new_length; kk++){	
		result_htmlString += '<td width="10" height="20" align="left" valign="bottom"><span style="font-size:11pt;">'+ new_val.substring(kk, kk+1) +'</span></td>';
	}
	
	result_htmlString +=
						'<td width="53" height="20" align="left" valign="bottom"><span style="font-size:11pt;">&nbsp;</span></td>'+
				    '</tr>'+
			    '</table>'+
		    '</td>'+
	        '<td width="115" height="20">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="25" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="220" height="31"><span style="font-size:10pt; letter-spacing:-1pt; padding-left:1pt;"></span></td>'+
	        '<td width="85" height="31" align="right"><span style="font-size:10pt; padding-right:34pt;"></span></td>'+
	        '<td width="170" height="31" colspan="2" align="right"><span style="font-size:10pt; padding-right:4pt;"></span></td>'+
	        '<td width="115" height="31">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="25" height="31" align="center"><font size="2"></font></td>'+
	        '<td width="220" height="31"><span style="font-size:10pt; letter-spacing:-1pt; padding-left:1pt;"></span></td>'+
	        '<td width="85" height="31" align="right"><span style="font-size:10pt; padding-right:34pt;"></span></td>'+
	        '<td width="170" height="31" colspan="2" align="right"><span style="font-size:10pt; padding-right:4pt;"></span></td>'+
	        '<td width="115" height="31">　</td>'+
	    '</tr>'+
	    '<tr>'+
	        '<td width="27" height="33" align="center"><font size="2"></font></td>'+
	        '<td width="25" height="33" align="center"><font size="2"></font></td>'+
	        '<td width="220" height="33"><span style="font-size:10pt; letter-spacing:-1pt; padding-left:1pt;"></span></td>'+
	        '<td width="85" height="33" align="right"><span style="font-size:10pt; padding-right:34pt;"></span></td>'+
	        '<td width="170" height="33" colspan="2" align="right"><span style="font-size:10pt; padding-right:4pt;"></span></td>'+
	        '<td width="115" height="33">　</td>'+
	    '</tr>  '+
	    '<tr>'+
	        '<td width="272" height="27" colspan="3" align="right" valign="top"><span style="font-size:11pt; padding-right:130pt;">'+ numberWithCommas(amnt) +'</span></td>'+
	        '<td width="85" height="27">　</td>'+
	        '<td width="115" height="27">　</td>'+
	        '<td width="170" height="27" colspan="2" align="left"><span style="font-size:12pt; padding-left:32pt;">■■</span></td>'+
	    '</tr>';
	
	
	return result_htmlString;
}

//일일집계현황
function SelDailyStatus(bdate){
	var dbname = bdate.substring(2,6);
	var sq_A = 0; var sq_C = 0; var sq_D = 0; var sq_E = 0; var sq_F = 0;
	var sa_A = 0; var sa_C = 0; var sa_D = 0; var sa_E = 0; var sa_F = 0;
	var resultData1; var resultData2;
	htmlString = "";
	htmlString +=
		'<tr>'+
			'<td width="30" rowspan="2" align="center" valign="middle" bgcolor="#F4F4F4" height="60"><span style="font-size:9pt;">일자</span></td>'+
			'<td width="150" colspan="2" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구매</span></td>'+
			'<td width="150" colspan="2" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판매</span></td>'+
			'<td width="150" colspan="2" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">반입</span></td>'+
			'<td width="150" colspan="2" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">증정</span></td>'+
			'<td width="150" colspan="2" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">폐기</span></td>'+
		'</tr>'+
		'<tr>'+
			'<td width="65" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
			'<td width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
			'<td width="65" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
			'<td width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
			'<td width="65" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
			'<td width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
			'<td width="65" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
			'<td width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
			'<td width="65" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
			'<td width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
		'</tr>';
	
	for(var ii = 1; ii < 32; ii++){
		ii = ii >= 10 ? ii : '0' + ii;
		var tdate = bdate.substring(2,6) + ii;
		
		var from = {dbname: dbname, date: tdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/productio/select_daily_status1",
			data : JSON.stringify(from),
			success: function (result) {
				resultData1 = result;
				if(result.length != 0){
					var qnty_A = 0; var qnty_C = 0; var qnty_D = 0; var qnty_E = 0; var qnty_F = 0;
					var amnt_A = 0; var amnt_C = 0; var amnt_D = 0; var amnt_E = 0; var amnt_F = 0;
					
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/productio/select_daily_status2",
						data : JSON.stringify(from),
						success: function (result) {
							resultData2 = result;
							logNow(result);
							var object_num = Object.keys(result);
							
							for(var i in object_num){
								var data = result[object_num[i]]; 
								eval("qnty_" + data["s1gubn"] + " = " + data["sum1"] + ";");
								eval("amnt_" + data["s1gubn"] + " = " + data["sum2"] + ";");
								eval("sq_" + data["s1gubn"] + " += " + data["sum1"] + ";");
								eval("sa_" + data["s1gubn"] + " += " + data["sum2"] + ";");
							}
							htmlString += 
								'<tr>'+
									'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ ii +'</span></td>'+
									'<td width="65" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(qnty_A) +'</span></td>'+
									'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(amnt_A) +'</span></td>'+
									'<td width="65" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(qnty_C) +'</span></td>'+
									'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(amnt_C) +'</span></td>'+
									'<td width="65" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(qnty_D) +'</span></td>'+
									'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(amnt_D) +'</span></td>'+
									'<td width="65" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(qnty_E) +'</span></td>'+
									'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(amnt_E) +'</span></td>'+
									'<td width="65" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(qnty_F) +'</span></td>'+
									'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(amnt_F) +'</span></td>'+
								'</tr>';
						}
					});
				}
			}
		});
	}
	htmlString +=
		'<tr>'+
			'<td width="30" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">합계</span></td>'+
			'<td width="65" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sq_A) +'</span></td>'+
			'<td width="85" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sa_A) +'</span></td>'+
			'<td width="65" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sq_C) +'</span></td>'+
			'<td width="85" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sa_C) +'</span></td>'+
			'<td width="65" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sq_D) +'</span></td>'+
			'<td width="85" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sa_D) +'</span></td>'+
			'<td width="65" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sq_E) +'</span></td>'+
			'<td width="85" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sa_E) +'</span></td>'+
			'<td width="65" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sq_F) +'</span></td>'+
			'<td width="85" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(sa_F) +'</span></td>'+
		'</tr>';
	
	$("#pioDailyStatusData1").html(htmlString);
	
	document.getElementById("btnPrint").onclick = function() { //인쇄 버튼 클릭 시
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		popUp.document.write(jmenu8("12_인쇄팝업"));
		
		var dbname = bdate.substring(2,6);
		var sq_A = 0; var sq_C = 0; var sq_D = 0; var sq_E = 0; var sq_F = 0;
		var sa_A = 0; var sa_C = 0; var sa_D = 0; var sa_E = 0; var sa_F = 0;

		htmlString = "";
		htmlString +=
			'<tr>'+
		        '<td width="1050" height="30" align="center">'+
		            '<table border="0" cellpadding="0" cellspacing="0" width="1050">'+
		                '<tr>'+
		                	'<td height="50" width="250" align="center" valign="middle">&nbsp;</td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" height="50" width="550" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:8pt;"><b>'+ $("select[name=ty]").val() +'년 '+ $("select[name=tm]").val() +'월 일일 집계 현황</b></span></td>'+
		                	'<td height="40" width="250" align="center" valign="middle">&nbsp;</td>'+
		                '</tr>'+
		            '</table>'+
		        '</td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="1050" height="17"></td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="1050" align="center">'+
		            '<table border="0" cellspacing="0" width="1050" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
		                '<tr>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="50" rowspan="2" align="center" valign="middle" bgcolor="white" height="50"><span style="font-size:10pt; letter-spacing:1pt;">일자</span></td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="200" colspan="2" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:50pt;">구매</span></td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="200" colspan="2" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:50pt;">판매</span></td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="200" colspan="2" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:50pt;">반입</span></td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="200" colspan="2" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:50pt;">증정</span></td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" width="200" colspan="2" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:50pt;">폐기</span></td>'+
		                '</tr>'+
		                '<tr>'+
		                	'<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="80" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;">수량</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="120" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:40pt;">금액</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="80" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;">수량</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="120" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:40pt;">금액</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="80" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;">수량</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="120" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:40pt;">금액</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="80" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;">수량</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="120" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:40pt;">금액</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000;" width="80" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:20pt;">수량</span></td>'+
		                    '<td style="border-bottom: 2px double #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" width="120" height="25" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:40pt;">금액</span></td>'+
		                '</tr>';
		
		for(var ii = 1; ii < 32; ii++){
			ii = ii >= 10 ? ii : '0' + ii;
			var tdate = bdate.substring(2,6) + ii;
			
			var from = {dbname: dbname, date: tdate}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/productio/select_daily_status1",
				data : JSON.stringify(from),
				success: function (result) {
					if(result.length != 0){
						var qnty_A = 0; var qnty_C = 0; var qnty_D = 0; var qnty_E = 0; var qnty_F = 0;
						var amnt_A = 0; var amnt_C = 0; var amnt_D = 0; var amnt_E = 0; var amnt_F = 0;
						
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: SETTING_URL + "/productio/select_daily_status2",
							data : JSON.stringify(from),
							success: function (result) {
								logNow(result);
								var object_num = Object.keys(result);
								
								for(var i in object_num){
									var data = result[object_num[i]]; 
									eval("qnty_" + data["s1gubn"] + " = " + data["sum1"] + ";");
									eval("amnt_" + data["s1gubn"] + " = " + data["sum2"] + ";");
									eval("sq_" + data["s1gubn"] + " += " + data["sum1"] + ";");
									eval("sa_" + data["s1gubn"] + " += " + data["sum2"] + ";");
								}
								
								htmlString +=
									'<tr>'+
					                    '<td width="50" height="24" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ ii +'</span></td>'+
					                    '<td width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(qnty_A) +'</span></td>'+
					                    '<td width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(amnt_A) +'</span></td>'+
					                    '<td width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(qnty_C) +'</span></td>'+
					                    '<td width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(amnt_C) +'</span></td>'+
					                    '<td width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(qnty_D) +'</span></td>'+
					                    '<td width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(amnt_D) +'</span></td>'+
					                    '<td width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(qnty_E) +'</span></td>'+
					                    '<td width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(amnt_E) +'</span></td>'+
					                    '<td width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(qnty_F) +'</span></td>'+
					                    '<td width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(amnt_F) +'</span></td>'+
					                '</tr>';
							}
						});
					}
				}
			});
		}
		var d = new Date();
		d = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
		htmlString +=
						'<tr>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="50" height="24" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">합계</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sq_A) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sa_A) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sq_C) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sa_C) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sq_D) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sa_D) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sq_E) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sa_E) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="80" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sq_F) +'</span></td>'+
				            '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000;" width="120" height="24" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:7pt;">'+ numberWithCommas(sa_F) +'</span></td>'+
				        '</tr>'+
				    '</table>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td width="1050" height="30">'+
					'<table border="0" cellpadding="0" cellspacing="0" width="1050">'+
						'<tr>'+
				        	'<td width="50%" align="left" valign="middle"><span style="font-size:9pt; padding-left:1pt;">'+ string.com_name +'</span></td>'+
				            '<td width="50%" align="right" valign="middle"><span style="font-size:9pt; padding-right:1pt;">(( '+ d +' )) </span></td>'+
				        '</tr>'+
				    '</table>'+
				'</td>'+
			'</tr>';
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}

//폐기리스트
function SelDisposalList(){
	$('#pioDisposalListDataTemp').css('display', 'none');
	$('#pioDisposalListData').css('display', '');
	
	var dbname = ($("select[name=ty]").val()).substring(2,4) + $("select[name=tm]").val();
	var resultData;
	var from = {dbname: dbname}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/productio/select_disposal_list",
		data : JSON.stringify(from),
		success: function (result) {
			resultData = result;
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			htmlString +=
				'<tr>'+
					'<td width="50" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">NO</span></td>'+
					'<td width="250" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">CODE</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정가</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">수량</span></td>'+
					'<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
					'<td width="180" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">비고</span></td>'+
				'</tr>';
			
			var sq = 0; var sa = 0;
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				sq += data["sum1"];
				sa += data["sum2"];
				var new_val = data["sum2"];
				
				htmlString += 
					'<tr>'+
						'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td width="250" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:7pt;">'+ data["sbname"] +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["s1book"] +'</span></td>'+
						'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:7pt;">'+ numberWithCommas(data["s1uprc"]) +'</span></td>'+
						'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:7pt;">'+ numberWithCommas(data["sum1"]) +'</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:7pt;">'+ numberWithCommas(data["sum2"]) +'</span></td>'+
						'<td width="180" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">&nbsp;</span></td>'+
					'</tr>';
			}
			htmlString +=
				'<tr>'+
					'<td width="440" colspan="4" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">합계</span></td>'+
					'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:7pt;">'+ numberWithCommas(sq) +'</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:7pt;">'+ numberWithCommas(sa) +'</span></td>'+
					'<td width="180" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">&nbsp;</span></td>'+
				'</tr>';
			
			$("#pioDisposalListData").html(htmlString);
		}
	});
	
	document.getElementById("btnPrint").onclick = function() { //인쇄 버튼 클릭 시
		logNow(resultData);
		var t_URL = "/popup?print";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "print", 'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		
		popUp.document.write(jmenu8("13_인쇄팝업"));
		
		htmlString = "";
		htmlString += 	
		    '<tr>'+
		        '<td width="750" height="40">'+
		            '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
		                '<tr>'+
		                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
		                    '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000" height="50" width="450" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:5pt;"><b>'+ $("select[name=ty]").val() +'년 '+ $("select[name=tm]").val() +'월 폐기 리스트</b></span></td>'+
		                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
		                '</tr>'+
		            '</table>'+
		        '</td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="750" height="20">&nbsp;</td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="750">'+
		            '<table border="0" cellspacing="0" width="750" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
		                '<tr>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="50" align="center" valign="middle" bgcolor="#FFFFFF" height="32"><span style="font-size:10pt; letter-spacing:3pt;">NO</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="250" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:35pt;">도서명</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:3pt;">ODE</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">정가</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">수량</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="90" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">금액</span></td>'+
		                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000; border-right: 1px dotted #000000;" width="150" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:35pt;">비고</span></td>'+
		                '</tr>';
		
		var rec_no = 0;
		var page = 1;
		var sq = 0; var sa = 0;
		
		var object_num = Object.keys(resultData);
		
		for(var i in object_num){
			var data = resultData[object_num[i]]; 
			sq += data["sum1"];
			sa += data["sum2"];
			var new_val = data["sum2"];
			
			if (((rec_no % 40) == 0) && (rec_no > 0)){
				htmlString += 
								'</table>'+
							'</td>'+
						'</tr>'+
						'<tr>'+
						    '<td width="750" height="25" valign="middle">'+
						        '<table border="0" cellspacing="0" width="750" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
						            '<tr>'+
						            	'<td style="border-top: 1px double #000000;" width="50%" height="25" align="left" valign="bottom"><span style="font-size:9pt; padding-left:1pt;">'+ string.com_name +'</span></td>'+
						                '<td style="border-top: 1px double #000000;" width="50%" height="25" align="right" valign="bottom"><span style="font-size:9pt; padding-right:1pt;">* PAGE : '+ page +'</span></td>'+
						            '</tr>'+
						        '</table>'+
						    '</td>'+
						'</tr>'+
						'<p style="page-break-before:always">'+
						'<tr>'+
				        '<td width="750" height="40">'+
				            '<table border="0" cellpadding="0" cellspacing="0" width="750">'+
				                '<tr>'+
				                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
				                    '<td style="border-top: 2px double #000000; border-bottom: 2px double #000000" height="50" width="450" align="center" valign="middle"><span style="font-size:18pt; letter-spacing:5pt;"><b>'+ $("select[name=ty]").val() +'년 '+ $("select[name=tm]").val() +'월 폐기 리스트</b></span></td>'+
				                	'<td height="50" width="150" align="center" valign="middle">&nbsp;</td>'+
				                '</tr>'+
				            '</table>'+
				        '</td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="750" height="20">&nbsp;</td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="750">'+
				            '<table border="0" cellspacing="0" width="750" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
				                '<tr>'+
				                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="50" align="center" valign="middle" bgcolor="#FFFFFF" height="32"><span style="font-size:10pt; letter-spacing:3pt;">NO</span></td>'+
				                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="250" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:35pt;">도서명</span></td>'+
				                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:3pt;">ODE</span></td>'+
				                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">정가</span></td>'+
				                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="70" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">수량</span></td>'+
				                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000;" width="90" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:20pt;">금액</span></td>'+
				                    '<td style="border-top: 1px double #000000; border-bottom: 1px double #000000; border-left: 1px dotted #000000; border-right: 1px dotted #000000;" width="150" height="32" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:10pt; letter-spacing:35pt;">비고</span></td>'+
				                '</tr>';
				page++;
			}
			if((rec_no > 0) && ((rec_no % 40) != 0) && ((rec_no % 5) == 0)) htmlString += '<tr><td width="750" colspan="7" height="10"></td></tr>';
			
			htmlString +=
				'<tr>'+
	                '<td width="50" height="16" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ (++i) +'</span></td>'+
	                '<td width="250" height="16" align="left" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-left:5pt; letter-spacing:-1pt;">'+ data["sbname"] +'</span></td>'+
	                '<td width="70" height="16" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt;">'+ data["s1book"] +'</span></td>'+
	                '<td width="70" height="16" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(data["s1uprc"]) +'</span></td>'+
	                '<td width="70" height="16" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(data["sum1"]) +'</span></td>'+
	                '<td width="90" height="16" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(new_val) +'</span></td>'+
	                '<td width="150" height="16" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
	            '</tr>';
	            
	        rec_no++;
		}
		htmlString +=
						'<tr>'+
				            '<td style="border-bottom: 1px double #000000; border-top: 1px double #000000;" width="440" colspan="4" height="32" align="center" valign="middle" bgcolor="white"><span style="font-size:10pt; letter-spacing:15pt;">[ 합 계 ]</span></td>'+
				            '<td style="border-bottom: 1px double #000000; border-top: 1px double #000000;" width="70" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(sq) +'</span></td>'+
				            '<td style="border-bottom: 1px double #000000; border-top: 1px double #000000;" width="90" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:10pt;">'+ numberWithCommas(sa) +'</span></td>'+
				            '<td style="border-bottom: 1px double #000000; border-top: 1px double #000000;" width="150" height="32" align="right" valign="middle" bgcolor="white"><span style="font-size:10pt; padding-right:5pt;">&nbsp;</span></td>'+
				        '</tr>'+
				    '</table>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td width="750" height="25" valign="middle">'+
					'<table border="0" cellspacing="0" width="750" bordercolordark="white" bordercolorlight="white" bordercolor="white" cellpadding="0" bgcolor="white">'+
					    '<tr>'+
					        '<td style="border-top: 1px double #000000;" width="50%" height="25" align="left" valign="bottom"><span style="font-size:9pt; padding-left:1pt;">'+ string.com_name +'</span></td>'+
					        '<td style="border-top: 1px double #000000;" width="50%" height="25" align="right" valign="bottom"><span style="font-size:9pt; padding-right:1pt;">* PAGE : '+ page +'</span></td>'+
					    '</tr>'+
					'</table>'+
				'</td>'+
			'</tr>';
		
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}

//구분별도서수불재고현황
function SelBookPaymentStockStatusByCate(){
	var ty = $("select[name=ty]").val();
	var tm = $("select[name=tm]").val();
	
	for(var i = 1; i <= 14; i++){
		eval("var sa_a" + i + " = 0;");
		eval("var sa_q" + i + " = 0;");
		//eval("var sq" + i + " = 0;");
		//eval("var sa" + i + " = 0;");
	}
	
	document.getElementById("Lay1").style.display = 'block';		
	setTimeout(function(){
		htmlString = "";
		$.ajax({
			type: "POST",
			dataType: "json",
			url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate1",
			async: false,
			success: function (result) {
				var object_num = Object.keys(result);
				logNow(result);
				
				for(var i in object_num){
					logNow(i);
					var sq1 = 0; var sq2 = 0; var sq3 = 0; var sq4 = 0; var sq5 = 0; var sq6 = 0; var sq7 = 0; var sq8 = 0; var sq9 = 0; var sq10 = 0; var sq11 = 0; var sq12 = 0; var sq13 = 0; var sq14 = 0; 
					var sa1 = 0; var sa2 = 0; var sa3 = 0; var sa4 = 0; var sa5 = 0; var sa6 = 0; var sa7 = 0; var sa8 = 0; var sa9 = 0; var sa10 = 0; var sa11 = 0; var sa12 = 0; var sa13 = 0; var sa14 = 0; 
					
					var data = result[object_num[i]]; //b_row
					
					var t_mon = parseInt(tm);
					var ipdan;
					
					// 단가
					var from = {sgbook: data["sbbook"], sgyyyy: parseInt(ty.substring(2,4))}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate2",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							if(result2.length != 0){
								for(var ii = t_mon ; ii >= 0 ; ii--){
									var var_name = "sgdn" + fillZero(ii, 2);
									if (result2[0][var_name]> 0){
										ipdan = result2[0][var_name];
										break;
									}
								}
							}
						}
					});
					
					// 전기이월수량
					var dbname1 = "KTBKS" + ty.substring(2,4) + "0";
					var from = {dbname: dbname1, tbsbook: data["sbbook"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate3",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							if(result2.length != 0){
								sq2 = result2[0]["tbasr"];
								sa_q2 += sq2;
								return;
							}
						}
					});
					
					// 여기서 에러남 //result2 [null] length->1
					// 전월이월수량
					var from = {dbname: dbname1, tbsbook: data["sbbook"], tbmgubn: t_mon}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate4",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							var sum_tbasr = 0; var sum_tbcsr = 0; var sum_tbdsr = 0; var sum_tbesr = 0; var sum_tbfsr = 0; 
							if(result2[0] != null){
								sum_tbasr = result2[0]["sum_tbasr"];
								sum_tbcsr = result2[0]["sum_tbcsr"];
								sum_tbdsr = result2[0]["sum_tbdsr"];
								sum_tbesr = result2[0]["sum_tbesr"];
								sum_tbfsr = result2[0]["sum_tbfsr"];
							}
							sq1 = sq2 + sum_tbasr - sum_tbcsr + sum_tbdsr - sum_tbesr - sum_tbfsr;
							sa_q1 += sq1;
							sq4 = sum_tbasr;
							sq6 = sum_tbcsr;
							sq8 = sum_tbdsr;
							sq10 = sum_tbesr;
							sq12 = sum_tbfsr;
						}
					});
					
					//당월 수량
					var from = {dbname: dbname1, tbsbook: data["sbbook"], tbmgubn: t_mon}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate5",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							if(result2.length != 0){
								sq3 = result2[0]["tbasr"];
								sq4 += result2[0]["tbasr"];
								sq5 = result2[0]["tbcsr"];
								sq6 += result2[0]["tbcsr"];
								sq7 = result2[0]["tbdsr"];
								sq8 += result2[0]["tbdsr"];
								sq9 = result2[0]["tbesr"];
								sq10 += result2[0]["tbesr"];
								sq11 = result2[0]["tbfsr"];
								sq12 += result2[0]["tbfsr"];
								sq14 = sq2 + sq4 - sq6 + sq8 - sq10 - sq12;
								sa_q3 += sq3;
								sa_q4 += sq4;
								sa_q5 += sq5;
								sa_q6 += sq6;
								sa_q7 += sq7;
								sa_q8 += sq8;
								sa_q9 += sq9;
								sa_q10 += sq10;
								sa_q11 += sq11;
								sa_q12 += sq12;
								sa_q14 += sq14;
							}
						}
					});
					
					if((sq1 + sq2 + sq3 + sq4 + sq5 + sq6 + sq7 + sq8 + sq9 + sq10 + sq11 + sq12 + sq14) == 0) continue;
					
					// 전기이월금액
					var dbname2 = "KTBKP" + ty.substring(2,4) + "0";
					var from = {dbname: dbname2, tbkbook: data["sbbook"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate6",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							if(result2.length != 0){
								sa2 = result2[0]["tbakm"];
								sa_a2 += sa2;
							}
						}
					});
					
					// 전월이월금액
					var from = {dbname: dbname2, tbkbook: data["sbbook"], tbmgubn: t_mon}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate7",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							var sum_tbakm = 0; var sum_tbckm = 0; var sum_tbdkm = 0; var sum_tbekm = 0; var sum_tbfkm = 0; 
							if(result2[0] != null){
								sum_tbakm = result2[0]["sum_tbakm"];
								sum_tbckm = result2[0]["sum_tbckm"];
								sum_tbdkm = result2[0]["sum_tbdkm"];
								sum_tbekm = result2[0]["sum_tbekm"];
								sum_tbfkm = result2[0]["sum_tbfkm"];
							}
							sa1 = sa2 + sum_tbakm - sum_tbckm + sum_tbdkm - sum_tbekm - sum_tbfkm;
							sa_a1 += sa1;
							sa4 = sum_tbakm;
							sa6 = sum_tbckm;
							sa8 = sum_tbdkm;
							sa10 = sum_tbekm;
							sa12 = sum_tbfkm;
						}
					});
					
					//당월 금액
					var from = {dbname: dbname2, tbkbook: data["sbbook"], tbmgubn: t_mon}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate8",
						async: false,
						data : JSON.stringify(from),
						success: function (result2) {
							logNow(result2[0]["tbckm"]);
							if(result2[0] != null){
								sa3 = result2[0]["tbakm"];
								sa4 += result2[0]["tbakm"];
								sa5 = result2[0]["tbckm"];
								sa6 += result2[0]["tbckm"];
								sa7 = result2[0]["tbdkm"];
								sa8 += result2[0]["tbdkm"];
								sa9 = result2[0]["tbekm"];
								sa10 += result2[0]["tbekm"];
								sa11 = result2[0]["tbfkm"];
								sa12 += result2[0]["tbfkm"];
								sa14 = sa2 + sa4 - sa6 + sa8 - sa10 - sa12;
								sa_a3 += sa3;
								sa_a4 += sa4;
								sa_a5 += sa5;
								sa_a6 += sa6;
								sa_a7 += sa7;
								sa_a8 += sa8;
								sa_a9 += sa9;
								sa_a10 += sa10;
								sa_a11 += sa11;
								sa_a12 += sa12;
								sa_a14 += sa14;
							}
						}
					});
					
					//여기까지 뽑아내야함 -> 인쇄
					
					// 수량 0일때 잔액 정리
					if((sq14 == 0) && (sa14 != 0)){
						if (sa5 > 0){ // 판매
							sa5 += sa14;
							sa6 += sa14;
							sa_a5 += sa14;
							sa_a6 += sa14;
							sa_a14 -= sa14;
							
							// 집계 변경
							var from = {dbname: dbname2, tbckm: sa5, tbkbook: data["sbbook"], tbmgubn: t_mon}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: SETTING_URL + "/productio/update_bookpayment_stockstatus_bycate1",
								data: JSON.stringify(from),
								success: function (result) {
									logNow("up1");
									logNow(result);
								},
								error: function () {
								}
							});
							sa14 = 0;
						}else{
							if (sa11 > 0){ // 폐기에 +
								sa11 += sa14;
								sa12 += sa14;
								sa_a11 += sa14;
								sa_a12 += sa14;
								sa_a14 -= sa14;
								
								// 집계 변경
								var from = {dbname: dbname2, tbfkm: sa11, tbkbook: data["sbbook"], tbmgubn: t_mon}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									async: false,
									url: SETTING_URL + "/productio/update_bookpayment_stockstatus_bycate2",
									data: JSON.stringify(from),
									success: function (result) {
										logNow("up2");
										logNow(result);
									},
									error: function () {
									}
								});
								
								//전표 변경
								var tblname = "KS1" + ty.substring(2,4) + tm + "A";
								var new_val; var new_uid;
								var from = {dbname: tblname, s1book: data["sbbook"], s1gubn: 'F'}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate9",
									async: false,
									data : JSON.stringify(from),
									success: function (result2) {
										new_val = result2[0]["s1amnt"] + sa14;
										logNow(result2[0]["s1amnt"]);
										logNow(sa14);
										logNow(new_val);
										new_uid = result2[0]["uid"];
									}
								});
								
								var from = {dbname: tblname, s1amnt: new_val, uid: new_uid}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									async: false,
									url: SETTING_URL + "/productio/update_bookpayment_stockstatus_bycate3",
									data: JSON.stringify(from),
									success: function (result) {
										logNow("up3");
										logNow(result);
									},
									error: function () {
									}
								});
								sa14 = 0;
							}else{
								if (sa9 > 0){ // 증정에 +
									sa9 += sa14;
									sa10 += sa14;
									sa_a9 += sa14;
									sa_a10 += sa14;
									sa_a14 -= sa14;
									
									// 집계 변경
									var from = {dbname: dbname2, tbfkm: sa9, tbkbook: data["sbbook"], tbmgubn: t_mon}
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										async: false,
										url: SETTING_URL + "/productio/update_bookpayment_stockstatus_bycate2",
										data: JSON.stringify(from),
										success: function (result) {
											logNow("up2-2");
											logNow(result);
										},
										error: function () {
										}
									});
									
									//전표 변경
									var tblname = "KS1" + ty.substring(2,4) + tm + "A";
									var new_val; var new_uid;
									var from = {dbname: tblname, s1book: data["sbbook"], s1gubn: 'E'}
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										url: SETTING_URL + "/productio/select_bookpayment_stockstatus_bycate9",
										async: false,
										data : JSON.stringify(from),
										success: function (result2) {
											new_val = result2[0]["s1amnt"] + sa14;
											new_uid = result2[0]["uid"];
										}
									});
									
									var from = {dbname: tblname, s1amnt: new_val, uid: new_uid}
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										async: false,
										url: SETTING_URL + "/productio/update_bookpayment_stockstatus_bycate3",
										data: JSON.stringify(from),
										success: function (result) {
											logNow("up3-2");
											logNow(result);
										},
										error: function () {
										}
									});
									sa14 = 0;
								}
							}
						}
					}
					//
					htmlString += 
						'<tr>'+
							'<td width="200" colspan="3" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:2pt;">'+ data["sbname"] +'</span></td>'+
						    '<td width="30" align="center" valign="middle" bgcolor="WHITE" height="30"><span style="font-size:9pt;">월</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq1) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa1) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq3) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa3) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq5) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa5) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq7) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa7) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq9) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa9) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq11) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa11) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">&nbsp;</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">&nbsp;</span></td>'+
						'</tr>'+
						'<tr>'+
							'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></td>'+
						    '<td width="65" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["sbuprc"]) +'</span></td>'+
						    '<td width="65" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(ipdan.toFixed(2)) +'</span></td>'+
						    '<td width="30" align="center" valign="middle" bgcolor="WHITE" height="30"><span style="font-size:9pt;">누</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq2) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa2) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq4) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa4) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq6) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa6) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq8) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa8) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq10) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa10) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq12) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa12) +'</span></td>'+
						    '<td width="50" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sq14) +'</span></td>'+
						    '<td width="80" height="30" align="right" valign="middle" bgcolor="WHITE"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa14) +'</span></td>'+
						'</tr>';
						
				}
				htmlString +=
					'<tr>'+
						'<td width="200" colspan="3" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">[[ 합계 ]]</span></td>'+
						'<td width="30" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">월</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q1) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a1) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q3) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a3) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q5) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a5) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q7) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a7) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q9) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a9) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q11) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a11) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">&nbsp;</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">&nbsp;</span></td>'+
					'</tr>'+
					'<tr>'+
						'<td width="200" colspan="3" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td width="30" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">누</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q2) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a2) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q4) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a4) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q6) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a6) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q8) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a8) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q10) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a10) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q12) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a12) +'</span></td>'+
						'<td width="50" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_q14) +'</span></td>'+
						'<td width="80" height="30" align="right" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(sa_a14) +'</span></td>'+
					'</tr>';
				$("#temp").html(htmlString);
			}
		});
		
	    document.getElementById("Lay1").style.display = 'none';
	},0);
}