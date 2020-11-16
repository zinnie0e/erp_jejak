///////////////////////////////////////////
//=============== 월결산자료 ===============//
///////////////////////////////////////////

//도서별 원가계산서
function SelBookCostStatement(lm_s, lm_t){
	var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
	day = parseInt($("select[name=td]").val()) + 1;
	day = day >= 10 ? day : '0' + day;
	var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
	
	var from = {date1: date1, date2: date2, lm_s: lm_s, lm_t: lm_t}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/monthclosing/select_bookcost_statement2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);		
			
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]];
				
				var yjtag;
				if(!yjtag){
					var from = {uid: data["uid"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/monthclosing/select_bookcost_statement3",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							if(result[0]["yjtag"]) yjtag = 1;
							else yjtag = 0;
						}
					});
				}
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["crnum"] +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] +'-'+ data["bucode"] +'</span></td>'+
						'<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;"><a href="ex_view.php?uid=<?=$row[uid]?>&ty=<?=$ty?>&tm=<?=$tm?>&td=<?=$td?>&page=<?=$page?>" class="n">'+ data["bname"] +'</a></span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:15pt" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["bnum"]) +'</span></td>'+
						'<td width="137" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(yjtag) htmlString += '<input type="button" value="용지대 계산" onClick="javascript:CalcYJ();"></span>'; htmlString +=
						'</td>'+
					'</tr>';
			}
			$("#mcBookCostStatementData").html(htmlString);
		}
	});
}

//잡물 원가계산서
function SelJMCostStatement(lm_s, lm_t){
	var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
	day = parseInt($("select[name=td]").val()) + 1;
	day = day >= 10 ? day : '0' + day;
	var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
	
	var from = {date1: date1, date2: date2, lm_s: lm_s, lm_t: lm_t}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/monthclosing/select_jmcost_statement2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);		
			
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]];
				
				var yjtag;
				if(!yjtag){
					var from = {uid: data["uid"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url: SETTING_URL + "/monthclosing/select_jmcost_statement3",
						async: false,
						data : JSON.stringify(from),
						success: function (result) {
							if(result[0]["yjtag"]) yjtag = 1;
							else yjtag = 0;
						}
					});
				}
				
				var full_date = MsToFulldate(data["jbdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["uid"] +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;"><a href="exj_view.php?uid=<?=$row[UID]?>&ty=<?=$ty?>&tm=<?=$tm?>&td=<?=$td?>&page=<?=$page?>" class="n">'+ data["jbname"] +'</a></span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:15pt" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["jbamnt"]) +'</span></td>'+
						'<td width="137" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(yjtag) htmlString += '<input type="button" value="용지대 계산" onClick="javascript:CalcYJ();"></span>'; htmlString +=
						'</td>'+
					'</tr>';
					
			}
			$("#mcJMCostStatementData").html(htmlString);
		}
	});
}

//품목별 원재료명세서(월별)
function SelPumMon(bdate){
	var from = {msdate: bdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/monthclosing/select_pum_mon1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			if(!result.length){
				logNow("나 없어");
				$.ajax({
					type: "POST",
					dataType: "json",
					url: SETTING_URL + "/monthclosing/select_pum_mon2",
					async: false,
					success: function (result) {
						var object_num = Object.keys(result);
						for(var i in object_num){
							var data = result[object_num[i]]; // json data
							var from = {
									yjcode: data["wjcode"], 
									msdate: bdate
							}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								url: SETTING_URL + "/monthclosing/insert_pum_mon1",
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
			}
		}
	});
	
	var from = {msdate: bdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/monthclosing/select_pum_mon3",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			var snum1 = 0; var snum2 = 0; var snum3 = 0; var snum4 = 0;
			var samnt1 = 0; var samnt2 = 0; var samnt3 = 0; var samnt4 = 0;
			var num1 = 0; var num2 = 0; var num3 = 0; var num4 = 0; var num5 = 0; var num6 = 0; var num7 = 0; var num8 = 0;
			for(var i in object_num){
				var data = result[object_num[i]]; // json data
				
				
				if ((data["qnty1"] == 0) && (data["qnty2"] == 0) && (data["qnty3"] == 0) && (data["qnty4"] == 0)) continue;
				
				if (data["qnty1"] > 0){
					num1 = Math.floor(data["qnty1"] / 500);
					num2 = data["qnty1"] % 500;
				}else{
					num1 = Math.floor(Math.abs(data["qnty1"]) / 500) * -1;
					num2 = Math.abs(data["qnty1"]) % 500;
				}
				
				if (data["qnty2"] > 0){
					num3 = Math.floor(data["qnty2"] / 500);
					num4 = data["qnty2"] % 500;
				}else{
					num3 = Math.floor(Math.abs(data["qnty2"]) / 500) * -1;
					num4 = Math.abs(data["qnty2"]) % 500;
				}
				
				if (data["qnty3"] > 0){
					num5 = Math.floor(data["qnty3"] / 500);
					num6 = data["qnty3"] % 500;
				}else{
					num5 = Math.floor(Math.abs(data["qnty3"]) / 500) * -1;
					num6 = Math.abs(data["qnty3"]) % 500;
				}
				
				if (data["qnty4"] > 0)
				{
					num7 = Math.floor(data["qnty4"] / 500);
					num8 = data["qnty4"] % 500;
				}else{
					num7 = Math.floor(Math.abs(data["qnty4"]) / 500) * -1;
					num8 = Math.abs(data["qnty4"]) % 500;
				}
				
				snum1 += data["qnty1"];
				samnt1 += data["amnt1"];
				snum2 += data["qnty2"];
				samnt2 += data["amnt2"];
				snum3 += data["qnty3"];
				samnt3 += data["amnt3"];
				snum4 += data["qnty4"];
				samnt4 += data["amnt4"];
				
				htmlString += 
					'<tr>'+
						'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["wjname"] +'</span></td>'+
						'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += num2; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt1"]) +'</span></td>'+
						'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += num4; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt2"]) +'</span></td>'+
						'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += num6; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt3"]) +'</span></td>'+
						'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += num8; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt4"]) +'</span></td>'+
					'</tr>';
			}
			$("#mcPumMonData1").html(htmlString);
			
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
					'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">합계</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += num2; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt1) +'</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += num4; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt2) +'</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += num6; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt3) +'</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += num8; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt4) +'</span></td>'+
				'</tr>';
					
				$("#mcPumMonData2").html(htmlString);
		}
	});
}

//품목별 원재료명세서(기간)
function SelPumPer(bdate){
	var from = {msdate: bdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/monthclosing/select_pum_per1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			var snum1 = 0; var snum2 = 0; var snum3 = 0; var snum4 = 0;
			var samnt1 = 0; var samnt2 = 0; var samnt3 = 0; var samnt4 = 0;
			var num1 = 0; var num2 = 0; var num3 = 0; var num4 = 0; var num5 = 0; var num6 = 0; var num7 = 0; var num8 = 0;
			for(var i in object_num){
				var data = result[object_num[i]]; // json data
				
				if ((data["qnty1"] == 0) && (data["qnty2"] == 0) && (data["qnty3"] == 0) && (data["qnty4"] == 0))
					continue;
				
				
				num1 = Math.floor(data["qnty1"] / 500);
				num2 = data["qnty1"] % 500;
				num3 = Math.floor(data["qnty2"] / 500);
				num4 = data["qnty2"] % 500;
				num5 = Math.floor(data["qnty3"] / 500);
				num6 = data["qnty3"] % 500;
				num7 = Math.floor(data["qnty4"] / 500);
				num8 = data["qnty4"] % 500;
				
				snum1 += data["qnty1"];
				samnt1 += data["amnt1"];
				snum2 += data["qnty2"];
				samnt2 += data["amnt2"];
				snum3 += data["qnty3"];
				samnt3 += data["amnt3"];
				snum4 += data["qnty4"];
				samnt4 += data["amnt4"];
				
				htmlString += 
					'<tr>'+
						'<td style="cursor:hand" onClick="javascript:View_All();" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["wjname"] +'</span></td>'+
						'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += num2; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt1"]) +'</span></td>'+
						'<td style="cursor:hand" onClick="javascript:View_Com();" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += num4; htmlString += '</span></td>'+
						'<td style="cursor:hand" onClick="javascript:View_Com();" width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt2"]) +'</span></td>'+
						'<td style="cursor:hand" onClick="javascript:View_Com();" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += num6; htmlString += '</span></td>'+
						'<td style="cursor:hand" onClick="javascript:View_Com();" width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt3"]) +'</span></td>'+
						'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += num8; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt4"]) +'</span></td>'+
					'</tr>';
			}
			$("#mcPumPerData1").html(htmlString);
			
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
					'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">합계</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += num2; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt1) +'</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += num4; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt2) +'</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += num6; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt3) +'</span></td>'+
					'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += num8; htmlString += '</span></td>'+
					'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt4) +'</span></td>'+
				'</tr>';
					
			$("#mcPumPerData2").html(htmlString);
		}
	});
}

//제조비명세표


//거래처별 지불명세서


//저자료 지급 내역(상/하)
function SelRoyaltyUD(bdate, gubn, gubn2){
	switch(parseInt(gubn)){
		case 1:
			var dbattr = "SBINSE ";
			break;
		case 2:
			var dbattr = "SBHJ04 ";
			break;
	}
	
	var from = { dbattr: dbattr } 
	var sum_t = 0;
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/monthclosing/select_royalty_ud1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			var num = 1;
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var sum_a = 0;  
				if (parseInt(gubn) == 1)
					var b_inse = data["sbinse"];
				else
					var b_inse = data["sbhj04"];
				var sum_p = 0;
				if (data["sbhjgb"] == 2){
					if (parseInt(gubn2) == 1) continue;
					var s_mon = 1;
					var e_mon = 12;
				}else{
					if (parseInt(gubn2) == 1){
						var s_mon = 1;
						var e_mon = 6;
					}else{
						var s_mon = 7;
						var e_mon = 12;
					}
				}
				
				for(var ii = s_mon; ii <= e_mon ; ii++){
					var month = (ii) >= 10 ? (ii) : '0' + (ii);
					var dbname = bdate.substring(2,4) + month;
					
					var from = { dbname: dbname, sbbook: data["sbbook"] }
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: SETTING_URL + "/monthclosing/select_royalty_ud2",
						data : JSON.stringify(from),
						success: function (result) {
							if(result[0] != null){
								if(result[0]["sum1"] != null) sum_p += result[0]["sum1"];
								if(result[0]["sum2"] != null) sum_p -= result[0]["sum2"];	
							}
						}
					});
				}
				
				if (sum_p == 0) continue;
				sum_a = Math.round((sum_p * b_inse * data["sbuprc"]) / 100);
				sum_t += sum_a;
				
				htmlString +=
					'<tr>'+
						'<td width="40" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ num +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></td>'+
						'<td width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["sbname"] +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["sbuprc"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ b_inse; if(data["sbhjgb"] == 1) htmlString += "반"; else htmlString += "일"; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sum_p) +'</span></td>'+
						'<td width="120" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sum_a) +'</span></td>'+
						'<td width="125" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sum_a) +'</span></td>'+
					'</tr>';
				num = num + 1;  
				logNow(num);
			}
			$("#mcRoyaltyUDData").html(htmlString);
			(document.getElementById("sum_t")).innerHTML = numberWithCommas(sum_t);
		}
	});
}

//월별 저자료 지출결의서
function SelMonthlyRoyalty(bdate){
	var from = { bdate: bdate } 
	var sum_t = 0;
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/monthclosing/select_monthly_royalty",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var sum_t = 0;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var sum_a = 0; var inse = 0;
				
				inse = data["sbinse"];
				juja = data["sbjuja"];
				sum_a = (inse * data["sbuprc"] * data["bnum"]) / 100;
				sum_t += sum_a;
				
				htmlString +=
					'<tr>'+
						'<td align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">&nbsp;&nbsp;'+ (++i) +'&nbsp;&nbsp;</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></td>'+
						'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["sbname"] +'</span></td>'+
						'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ juja +'</span></td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["sbuprc"]) +'</span></td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["bnum"]) +'</span></td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(inse) +'</span></td>'+
						'<td width="125" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sum_a) +'</span></td>'+
						'<td width="125" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"><input type="checkbox" name="chk[]" value="<?=$row[uid]?>"></span></td>'+
					'</tr>';
			}
			$("#mcMonthlyRoyaltyData").html(htmlString);
			(document.getElementById("sum_t")).innerHTML = numberWithCommas(sum_t);
		}
	});
}

//저자료 지급 내역 ??
function SelRoyalty(bdate){
	var from = { dbname: bdate.substring(2,6) } 
	var sum_t = 0;
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/monthclosing/select_royalty",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var sum_a = 0; var num = 1;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var b_inse = data["sbinse"];
				var sum_p = 0;
				sum_p += data["sum1"];
				sum_p -= data["sum2"];
				
				if (sum_p == 0) continue;
				
				sum_a = Math.round((sum_p * b_inse * data["sbuprc"]) / 100);
				sum_t += sum_a;
				
				htmlString +=
					'<tr>'+
						'<td width="40" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ (num++) +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></td>'+
						'<td width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["sbname"] +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["sbuprc"]) +'</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ b_inse; if(data["sbhjgb"] == 1) htmlString += "반"; else htmlString += "일"; htmlString += '</span></td>'+
						'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sum_p) +'</span></td>'+
						'<td width="120" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sum_a) +'</span></td>'+
						'<td width="125" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(sum_a) +'</span></td>'+
					'</tr>';
			}
			$("#mcRoyaltyData").html(htmlString);
			(document.getElementById("sum_t_1")).innerHTML = numberWithCommas(sum_t);
			(document.getElementById("sum_t_2")).innerHTML = numberWithCommas(sum_t);
		}
	});
}

//구매단가입력


//도서 수량.금액 집계


//도서금액집계


//주은교육 제작현황
function SearchMkJueun(date1, date2){ 
	var from = { date1: date1, date2: date2 }
	
	var resultData;
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/monthclosing/select_monthclosing_jueun",
		data : JSON.stringify(from),
		success: function (result) {
			resultData = result;
			var object_num = Object.keys(result); var tsum = 0;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var tprice = data["sbuprc"] * data["sbinse"] * data["bnum"] / 100;
				tsum += tprice;
				
				htmlString += 
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["bname"] +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bnum"] +'</span></td>'+                    
						'<td width="80" height="30" align="right" style="padding-right:15pt" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbinse"] +'</span></td>'+
						'<td width="137" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(tprice) +'</span></td>'+
					'</tr>';
			}
			$("#mcJueunData").html(htmlString);
			(document.getElementById("sum")).innerHTML = numberWithCommas(tsum);
		}
	});
	
	document.getElementById("PopUpPrint").onclick = function() { //on click
		var t_URL = "/popup?uid=";
		if(popUp && !popUp.closed){
			popUp.close();
		}
		popUp = window.open(t_URL, "MkJueun", 'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
		
		popUp.document.write(jmenu7("14_프린터팝업"));
		
		var object_num = Object.keys(resultData);
		htmlString = "";
		
		var d = new Date(parseInt($("select[name=ty]").val()), parseInt($("select[name=tm]").val()), 0);
		
		htmlString += 
			'<tr>'+
		        '<td width="720" height="150" align="center" valign="bottom">&nbsp;</td>'+
		    '</tr>'+
		    '<tr>'+
		        '<td width="720" height="50" align="center" valign="middle"><span style="font-size:18pt;"><b>'+ $("select[name=ty]").val() +'년 '+ $("select[name=tm]").val() +'월 주은교육 도서제작현황</b></span></td>'+
		    '</tr>'+
			'<tr>'+
		        '<td width="720" height="50" align="center" valign="bottom">'+
		        	'<table border="0">'+
		        		'<tr>'+
		        			'<td width="140" height="50" align="left" valign="middle"><span style="font-size:10pt;">세광음악출판사</span></td>'+
		        			'<td width="440" height="50" align="center" valign="middle"><span style="font-size:10pt;">발행일 : '+ d.getFullYear() + ' . ' + (d.getMonth()+1) + ' . ' + d.getDate() +'</span></td>'+
		        			'<td width="140" height="50" align="right" valign="middle"><span style="font-size:10pt;">( 단위 : 원 )</span></td>'+
		        		'</tr>'+
		        	'</table>'+
		        '</td>'+
		    '</tr>'+
		    '<tr>'+
		    	'<td width="720">'+
		    		'<table border="0" width="720" cellspacing="0" bordercolordark="white" bordercolorlight="black" cellpadding="0" bgcolor="white" height="30">'+
					    '<tr>'+
					        '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" height="45" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt; letter-spacing:7pt;"><b>순번</b></span></td>'+
					        '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="280" height="45" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt; letter-spacing:40pt;"><b>도서명</b></span></td>'+
					        '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="45" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt; letter-spacing:7pt;"><b>제작일</b></span></td>'+
					        '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="45" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt; letter-spacing:2pt;"><b>제작부수</b></span></td>'+
					        '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="45" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt; letter-spacing:0pt;"><b>인세율 (%)</b></span></td>'+
					        '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="45" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt; letter-spacing:2pt;"><b>인쇄금액</b></span></td>'+
					        '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" width="80" height="45" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt; letter-spacing:25pt;"><b>비고</b></span></td>'+
					    '</tr>';
		
		var tsum = 0;
		for(var i in object_num){
			var data = resultData[object_num[i]]; 
			
			var full_date = MsToFulldate(data["bdate"]);
			full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
			
			var tprice = data["sbuprc"] * data["sbinse"] * data["bnum"] / 100;
			tsum += tprice;
			
			htmlString += 
				'<tr>'+
			        '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
			        '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["bname"] +'</span></td>'+
			        '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
			        '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+ data["bnum"] +'</span></td>'+
			        '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+ data["sbinse"] +'</span></td>'+
			        '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(tprice) +'</span></td>'+
			        '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
			    '</tr>';
			
		}
		htmlString += 
						'<tr>'+
							'<td colspan="5" style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:9pt; letter-spacing:100pt;">합계</span></td>'+
							'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(tsum) +'</span></td>'+
							'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'</tr>'+
					'</table>'+
				'</td>'+
			'</tr>';
		
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
    }
}