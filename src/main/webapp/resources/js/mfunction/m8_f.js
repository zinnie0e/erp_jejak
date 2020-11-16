////////////////////////////////////////////
//=============== 제품입'출고 ===============//
////////////////////////////////////////////


//구매관리


//판매관리


//반입관리


//증정관리


//폐기관리


//구매일보
function SelPurchaseDaily(bdate){
	var from = {dbname: bdate.substring(2,6), date: bdate.substring(2,8)}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/productio/select_purchase_daily2",
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
}

//월입고현황표
function SelMonStockStatusTable(date1, date2){
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
		    htmlString = "";
		    var pm_num = 0;
			
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
function SearchBookcode(){ //////여기 하는 중 0902 미완성
	popUp = "";
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open("/bookcode", "BOOKW", 'left=0,top=0,width=380,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	popUp.document.write(jmenu8("8_popup"));
	
	document.getElementById("btnSearchbookcode").onclick = function() { // on click
		var test = document.getElementById("txtBookcode").innerText;
		logNow(test);
    }


	//(popUp.document.getElementById("jname")).innerHTML = wjname;
}

//월간거래처구분별일일집계


//도서수불카드


//거래명세서일일번호별집계


//일일집계현황
function SelDailyStatus(bdate){
	var dbname = bdate.substring(2,6);
	var sq_A = 0; var sq_C = 0; var sq_D = 0; var sq_E = 0; var sq_F = 0;
	var sa_A = 0; var sa_C = 0; var sa_D = 0; var sa_E = 0; var sa_F = 0;
	htmlString = "";
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
								
								switch (data["s1gubn"]){
								case "A":
									qnty_A = data["sum1"];
									amnt_A = data["sum2"];
									sq_A += data["sum1"];
									sa_A += data["sum2"];
									break;
								case "C":
									qnty_C = data["sum1"];
									amnt_C = data["sum2"];
									sq_C += data["sum1"];
									sa_C += data["sum2"];
									break;
								case "D":
									qnty_D = data["sum1"];
									amnt_D = data["sum2"];
									sq_D += data["sum1"];
									sa_D += data["sum2"];
									break;
								case "E":
									qnty_E = data["sum1"];
									amnt_E = data["sum2"];
									sq_E += data["sum1"];
									sa_E += data["sum2"];
									break;
								case "F":
									qnty_F = data["sum1"];
									amnt_F = data["sum2"];
									sq_F += data["sum1"];
									sa_F += data["sum2"];
									break;
								}
							}
							
							//
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
	$("#pioDailyStatusData1").html(htmlString);
	(document.getElementById("sq_A")).innerHTML = numberWithCommas(sq_A);
	(document.getElementById("sa_A")).innerHTML = numberWithCommas(sa_A);
	(document.getElementById("sq_C")).innerHTML = numberWithCommas(sq_C);
	(document.getElementById("sa_C")).innerHTML = numberWithCommas(sa_C);
	(document.getElementById("sq_D")).innerHTML = numberWithCommas(sq_D);
	(document.getElementById("sa_D")).innerHTML = numberWithCommas(sa_D);
	(document.getElementById("sq_E")).innerHTML = numberWithCommas(sq_E);
	(document.getElementById("sa_E")).innerHTML = numberWithCommas(sa_E);
	(document.getElementById("sq_F")).innerHTML = numberWithCommas(sq_F);
	(document.getElementById("sa_F")).innerHTML = numberWithCommas(sa_F);
}

//폐기리스트
function SelDisposalList(){
	var dbname = ($("select[name=ty]").val()).substring(2,4) + $("select[name=tm]").val();
	
	var from = {dbname: dbname}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/productio/select_disposal_list",
		data : JSON.stringify(from),
		success: function (result) {
			
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
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
			
			$("#pioDisposalListData").html(htmlString);
			(document.getElementById("sq")).innerHTML = numberWithCommas(sq);
			(document.getElementById("sa")).innerHTML = numberWithCommas(sa);
		}
	});
}

//구분별도서수불재고현황