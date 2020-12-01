///////////////////////////////////////////
//=============== 월결산자료 ===============//
///////////////////////////////////////////

var com_name = "세광음악출판사";

// 도서별 원가계산서
function SelBookCostStatement(lm_s, lm_t) {
	var date1 = new Date($("select[name=ty]").val() + "/"
			+ $("select[name=tm]").val() + "/" + $("select[name=td]").val())
			.getTime() / 1000;
	day = parseInt($("select[name=td]").val()) + 1;
	day = day >= 10 ? day : '0' + day;
	var date2 = new Date($("select[name=ty]").val() + "/"
			+ $("select[name=tm]").val() + "/" + day).getTime() / 1000;
	var from = {
		date1 : date1,
		date2 : date2,
		lm_s : lm_s,
		lm_t : lm_t
	}
	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_bookcost_statement2",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);

					var object_num = Object.keys(result);
					htmlString = "";
					for ( var i in object_num) {
						var data = result[object_num[i]];

						var yjtag;
						if (!yjtag) {
							var from = {
								uid : data["uid"]
							}
							$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										url : SETTING_URL
												+ "/monthclosing/select_bookcost_statement3",
										async : false,
										data : JSON.stringify(from),
										success : function(result) {
											if (result[0]["yjtag"])
												yjtag = 1;
											else
												yjtag = 0;
										}
									});
						}

						var full_date = MsToFulldate(data["bdate"]);
						full_date = full_date.substring(0, 4) + "-"
								+ full_date.substring(4, 6) + "-"
								+ full_date.substring(6, 8);

						htmlString += 
							'<tr>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ 
							data["crnum"]+
							'</span></td>'+
							'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"]+ '-' + data["bucode"] + '</span></td>'+
							'<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;"><a href="javascript:SelBookCostStatementDetail('+ data["uid"] + ',' + full_date.substring(0, 4) + ',' + full_date.substring(5, 7) + ',' + full_date.substring(8, 10)+');" class="n">'+data["bname"]+'</a></span></td>'+
							'<td width="80" height="30" align="right" style="padding-right:15pt" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["bnum"]) + '</span></td>'+
							'<td width="137" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
						
						if (yjtag)
							htmlString += '<input type="button" value="용지대 계산" onClick="javascript:CalcYJ('+ data["uid"] + ',' + $("select[name=ty]").val() +','+ $("select[name=tm]").val() +','+ $("select[name=td]").val() +');"></span>';
						htmlString += '</td>' + '</tr>';
					}
					$("#mcBookCostStatementData").html(htmlString);
				}
			});
	
	document.getElementById("btnBookCostStatementPrint").onclick = function() {// 인쇄 //lwhee
		var t_URL = "/popup?print";
		if (popUp && !popUp.closed) {
			popUp.close();
		}
		popUp = window
				.open(
						t_URL,
						"PopUpPrintjejakplan",
						'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');// DATEW

		var t_jan;
		
		function CheckJANH(jhcode)
		{
			switch (jhcode)
			{
				case "1":
					t_jan = "무선";
					break;
				case "2":
					t_jan = "반양장";
					break;
				case "3":
					t_jan = "절공";
					break;
				case "4":
					t_jan = "양장";
					break;
				case "5":
					t_jan = "중철";
					break;
				case "6":
					t_jan = "중미싱";
					break;
				case "7":
					t_jan = "스프링";
					break;
			    case "8":
					t_jan = "PUR무선";
					break;
			}
			return t_jan;
		}
		
		
		
		
		//도서별 원가계산서 인쇄 
		popUp.document.write(jmenu7("0_인쇄팝업"));
		
		htmlString = "";
		/*htmlString +=
			'<tr>'+
			'<td bgcolor="white" width="100%" height="10"></td>'+
			'</tr>'+
			'</table>';
*/	
		//selBookCostStatement25
		from = {
				date1 : date1,
				date2 : date2
		}
		//전역 변수
		var ppp = 0;
		var bur_uid;
		var ytotcost = 0;
		var totcost7 = 0;
		var sum_41 = 0;
		var rec_num=0;
		var total_record=0;
		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8;",
			dataType : "json",
			url : SETTING_URL + "/monthclosing/select_bookcost_statement25",
			async : false,
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				var object_num = Object.keys(result);
				total_record = object_num.length;
				for(i in object_num){
					var row10 = result[object_num[i]];
					logNow(row10);
					var btype2;
					var burok = 0;
					var t_panh_b1 = 0;
					var t_panh_b2 = 0;
					var t_panh_b3 = 0;
					var t_panh_b4 = 0;
					var t_janh_b1 = 0;
					var t_janh_b2 = 0;
					var t_janh_b3 = 0;
					var t_janh_b4 = 0;
					var t_page_b1 = 0;
					var t_page_b2 = 0;
					var t_page_b3 = 0;
					var t_page_b4 = 0;
					if (row10["sbsbph1"])
					{
						burok += 1;
						t_panh_b1 = row10["sbsbph1"];
						t_janh_b1 = CheckJANH(row10["sbsbjh1"]);
						t_page_b1 = row10["sbsbpg1"];
						}
					if (row10["sbsbph2"])
					{
						burok += 1;
						t_panh_b2 = row10["sbsbph2"];
						t_janh_b2 = CheckJANH(row10["sbsbjh2"]);
						t_page_b2 = row10["sbsbpg2"];
						}
					if (row10["sbsbph3"])
					{
						burok += 1;
						t_panh_b3 = row10["sbsbph3"];
						t_janh_b3 = CheckJANH(row10["sbsbjh3"]);
						t_page_b3 = row10["sbsbpg3"];
						}
					if (row10["sbsbph4"])
					{
						burok += 1;
						t_panh_b4 = row10["sbsbph4"];
						t_janh_b4 = CheckJANH(row10["sbsbjh4"]);
						t_page_b4 = row10["sbsbpg4"];
						}
					switch (row10["btype"])
					{
					case 1:
						btype2 = "신간";
						break;
					case 2:
						btype2 = "재판";
						break;
					case 3:
						btype2 = "개정";
						break;
						}
					rec_num++;
					uid = row10["uid"];
				htmlString +=
					'<table border="0" cellpadding="20" cellspacing="1" width="620" bgcolor="white">'+
						'<tr>'+
							'<td bgcolor="white" width="100%" height="10"></td>'+
						'</tr>'+
					'</table>'+
					'<table border="0" cellpadding="20" cellspacing="1" width="620" bgcolor="#333333">'+
						'<tr>'+
						'<td width="620" bgcolor="white" align="center" valign="top">'+
							'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
								'<tr>'+
									'<td width="580" align="center" valign="top" colspan="2">'+
										'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
											'<tr>'+
												'<td width="260" align="left" valign="middle">'+
													'<p align="right"><b><span style="font-size:18pt;">원 가 계 산 서</span></b></p>'+
													'</td>'+                                
												'<td width="44"></td>'+
												'<td width="276" align="right" valign="middle">'+
													'<table border="0" cellpadding="2" cellspacing="1" width="270" bgcolor="black" height="50">'+
														'<tr>'+
															'<td width="50" bgcolor="white" height="50" align="center" valign="middle">&nbsp;</td>'+
															'<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
															'<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
															'<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
															'<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
															'<td width="30" height="50" align="center" valign="middle" bgcolor="white">'+
																'<p style="line-height:18px;"><span style="font-size:9pt;">결<br>제</span></p>'+
															'</td>'+
														'</tr>'+
													'</table>'+
												'</td>'+
											'</tr>'+
										'</table>'+
									'</td>';
				var sbuprc = row10["sbuprc"];
				
				var t_panh = row10["sbpanh"];
				var t_janh2 = row10["sbjanh"];
				var bookcode = row10["bcode"];
				var mknum = row10["bnum"];

				var m1_name = row10["wcname"];
				var m2 = row10["m2"];
				var m3 = row10["m3"];
				var m4 = row10["m4"];
				var m5 = row10["m5"];
				var m6 = row10["m6"];
				var m7 = row10["m7"];
				var m8 = row10["m8"];
				var m9 = row10["m9"];
				switch (row10["sbpanh"])
				{
					case "A3" :
						ppp = 8;
						break;
					case "A4" :
						ppp = 16;
						break;
					case "A5" :
						ppp = 32;
						break;
					case "A6" :
						ppp = 64;
						break;
					case "B4" :
						//ppp = 16;
						ppp = 8;
						break;
					case "B5" :
						//ppp = 32;
						ppp = 16;
						break;
					case "B6" :
						//ppp = 64;
						ppp = 32;
						break;		
					default :
						ppp = 16;
						break;
				}
				
				var t_janh = CheckJANH(row10["sbjanh"]);
				htmlString +=
					'</tr>'+
                    '<tr>'+
                    	'<td width="290" align="left" valign="middle" height="30"><span style="font-size:9pt;"><font color="black"> 제작번호 : '+ row10["crnum"] +' / ' + row10["bcode"] + '</font></span></td>'+
                    	'<td width="290" height="30" align="right" valign="middle"><span style="font-size:9pt;"><font color="black">'+ $("select[name=ty]").val() + ' 년 ' + $("select[name=tm]").val() + ' 월' + $("select[name=td]").val() +' 일' +'</font></span></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td width="580" align="center" valign="top" colspan="2">'+
                            '<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
                                '<tr>'+
                                    '<td width="220" align="center" valign="middle" bgcolor="#F4F4F4" height="25">'+
                                        '<p><span style="font-size:9pt; letter-spacing:33pt;">도서명</span></p>'+
                                    '</td>'+
                                    '<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="22"><span style="font-size:9pt; letter-spacing:7pt;">구분</span></td>'+
                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="22"><span style="font-size:9pt; letter-spacing:12pt;">판형</span></td>'+
                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="22"><span style="font-size:9pt; letter-spacing:12pt;">장형</span></td>'+
                                    '<td width="60" align="center" valign="middle" bgcolor="#F4F4F4" height="22"><span style="font-size:9pt; letter-spacing:10pt;">면수</span></td>'+
                                    '<td width="90" align="center" valign="middle" bgcolor="#F4F4F4" height="22"><span style="font-size:9pt; letter-spacing:6pt;">제작부수</span></td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td width="220" align="center" valign="middle" bgcolor="white" height="22"><span style="font-size:9pt;">' + row10["bname"] +' - '+ row10["bcode"] +'</span></td>'+
                                    '<td width="50" align="center" valign="middle" bgcolor="white" height="22"><span style="font-size:9pt;">'+ btype2 +'</span></td>' +
                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="22"><span style="font-size:9pt;">'+
                                    row10["sbpanh"];
									if (t_panh_b1)
										htmlString += ' / ' + t_panh_b1;
									if (t_panh_b2)
										htmlString += ' / ' + t_panh_b2;
									if (t_panh_b3)
										htmlString += ' / ' + t_panh_b3;
									if (t_panh_b4)
										htmlString += ' / ' + t_panh_b4;
                                    htmlString += '<td width="80" align="center" valign="middle" bgcolor="white" height="22"><span style="font-size:9pt;">'+ t_janh;
                                    if (t_janh_b1)
        		                        htmlString += ' / ' + t_janh_b1;
        		                    if (t_janh_b2)
        		                        htmlString += ' / ' + t_janh_b2;
        		                    if (t_janh_b3)
        		                        htmlString += ' / ' + t_janh_b3;
        		                    if (t_janh_b4)
        		                        htmlString += ' / ' + t_janh_b4;
        		                    htmlString += '</span></td>'+
                                    '<td width="60" align="center" valign="middle" bgcolor="white" height="22"><span style="font-size:9pt;">' + row10["bmyun"];
                                    if (t_page_b1)
        		                        htmlString += ' / ' + t_page_b1;
        		                    if (t_page_b2)
        		                        htmlString += ' / ' + t_page_b2;
        		                    if (t_page_b3)
        		                        htmlString += ' / ' + t_page_b3;
        		                    if (t_page_b4)
        		                        htmlString += ' / ' + t_page_b4;
        		                    htmlString += '</span></td>'+
                                    '<td width="90" align="center" valign="middle" bgcolor="white" height="22"><span style="font-size:9pt;">'+ numberWithCommas(row10["bnum"]) +'</span></td>'+
                                '</tr>'+
                                '</table>'+
                                '</td>'+
                                '</tr>'+
                                '<tr>'+
                                	'<td width="580" colspan="2" height="10"></td>'+
                            	'</tr>'+
                        		'<tr>'+
                        			'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>1. 필름 대지 소부비</b></span></td>'+
                    			'</tr>'+
                    			'<tr>'+
                    				'<td width="580" align="center" valign="top" colspan="2">'+
                    					'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
                    						'<tr>'+
										        '<td width="54" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">구분</span></td>'+
										        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">판종</span></td>'+
										        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">판수</span></td>'+
										        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름량</span></td>'+
										        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필 름<br>단 가</span></td>'+
										        '<td width="65" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필 름<br>금 액</span></td>'+
										        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:1pt;">대지비</span></td>'+
										        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">소 부<br>단 가</span></td>'+
										        '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:3pt;">소부비</span></td>'+
										        '<td width="75" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1)  계</span></td>'+
										    '</tr>';
        		var t_myun = row10["bmyun"];
        		
        		var sum_1 = 0; // 필름
        		var sum_2 = 0; // 용지
        		var sum_3 = 0; // 인쇄
        		var sum_4 = 0; // 제본
        		var sum_5 = 0; // 코팅
        		var sum_6 = 0; // 비닐
        		var sum_7 = 0; // 원고
        		var sum_8 = 0; // 저작
        		var sum_9 = 0; // 출력
        		var sum_10 = 0; // 사보
        		var sum_11 = 0; // 증지
        		var sum_12 = 0; // 케이스
        		var sum_13 = 0; // 기타
        		from = {
        				uid : uid
        		}
        		$.ajax({
        			type : "POST",
        			contentType : "application/json; charset=utf-8;",
        			dataType : "json",
        			url : SETTING_URL + "/monthclosing/select_bookcost_statement26",
        			async : false,
        			data : JSON.stringify(from),
        			success : function(result) {
        				logNow(result);
        				var object_num = Object.keys(result);
        				for( i in object_num){
        					row = result[object_num[i]];
        					if (!row["sum5"])
        						continue;
        					sum_1 += row["sum5"];
        					htmlString +=
        						'<tr>'+
							        '<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'+ row["gubn5"] +'</span></td>'+
							        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'+ row["panst5"] +'</span></td>'+
							        '<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ row["pannum5"] +'</span></td>'+
							        '<td width="50" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if (row["filmnum5"]) htmlString += row["filmnum5"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
							        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (row["filmnum5"]) htmlString += numberWithCommas(row["filmdan5"]); else htmlString += '&nbsp;'; htmlString += '</span></td>'+
							        '<td width="65" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; 
						        if (row["filmnum5"])
						        	htmlString += numberWithCommas(row["filmdan5"]);
                                else
                                    htmlString += '&nbsp;'; htmlString += '</span></td>'+
							        '<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if (row["filmnum5"]) htmlString += numberWithCommas(row["filmcost5"]); else htmlString += '&nbsp'; htmlString += '</span></td>'+
							        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ row["sobudan5"] +'</span></td>'+
							        '<td width="60" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(row["sobu5"]) +'</span></td>'+
							        '<td width="75" height="22" align="right" valign="middle" width="66" style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;"><span style="font-size:9pt;">'+ numberWithCommas(row["sum5"]) +'</span></td>'+
						        '</tr>';
						        }
        				if (burok)
        				{	
        					for (var i = 1 ; i <= burok ; i++)
        					{
        						bur_uid = uid + i;
        						from = {
        								bur_uid
        						};
        						$.ajax({
        							type : "POST",
        							contentType : "application/json; charset=utf-8;",
        							dataType : "json",
        							url : SETTING_URL + "/monthclosing/select_bookcost_statement27",
        							async : false,
        							data : JSON.stringify(from),
        							success : function(result) {
        								logNow(result);
        								var object_num = Object.keys(result);
        								row = result[object_num];
        									if (!result[0]["sum5"])
            								{}
            								else {
            									sum_1 += result[0]["sum5"];
            									htmlString += 
            										'<tr>'+
	            										'<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'+ result[0]["gubn5"] +'</span></td>'+
	            										'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;"><?=$row[panst5]?></span></td>'+
	            										'<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ result[0]["pannum5"] +'</span></td>'+
	            										'<td width="50" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if(result[0]["filmnum5"]) htmlString += result[0]["filmnum5"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
	            										'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (result[0]["filmnum5"]) htmlString += numberWithCommas(result[0]["filmdan5"]); else htmlString += '&nbsp;'; htmlString += '</span></td>'+
	            										'<td width="65" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (result[0]["filmnum5"]) htmlString += numberWithCommas(result[0]["filmcost5"]); else htmlString += '&nbsp'; htmlString += '</span></td>'+
	            										'<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if (result[0]["daeji5"]) htmlString += numberWithCommas(result[0]["daeji5"]); else htmlString += '&nbsp'; htmlString += '</span></td>'+
	            										'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ result[0]["sobudan5"] + '</span></td>'+
	            										'<td width="60" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(result[0]["sobu5"]) +'</span></td>'+
	            										'<td width="75" height="22" align="right" valign="middle"style="padding-right:10;" width="66" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;"><span style="font-size:9pt;">'+ numberWithCommas(result[0]["sum5"]) +'</span></td>'+
            										'</tr>';
            								}
        							}
        						});
        				}}
        				htmlString +=
        					'<tr>'+
        						'<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
        						'<td width="325" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="6" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
        						'<td width="115" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="2" align="center" valign="middle"><span style="font-size:9pt;">('+ m1_name+')</span></td>'+
        						'<td width="75" style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_1) +'</span></td>'+
        					'</tr>'+
        					'</table>'+
        					'</td>'+
        					'</tr>'+
        					'<tr>'+
        						'<td width="580" colspan="2" height="10"></td>'+
        					'</tr>'+
        					'<tr>'+
        						'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>2. 용지대, 인쇄비</b></span></td>'+
        					'</tr>'+
        					'<tr>'+
        						'<td width="580" align="center" valign="top" colspan="2">'+
        							'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
        								'<tr>'+
        									'<td width="40" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">구분</span></td>'+
        									'<td width="145" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">지질</span></td>'+
        									'<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">정미</span></td>'+
        									'<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">여분</span></td>'+
        									'<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:12pt;">금액</span></td>'+
        									'<td width="34" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">색도</span></td>'+
        									'<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인 쇄<br>단 가</span></td>'+
        									'<td width="46" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">R수</span></td>'+
        									'<td width="70" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1)<br>인쇄비 계</span></td>'+
        								'</tr>';
        				from = {
        						uid : uid
        				}
        				$.ajax({
        					type : "POST",
        					contentType : "application/json; charset=utf-8;",
        					dataType : "json",
        					url : SETTING_URL + "/monthclosing/select_bookcost_statement8",
        					async : false,
        					data : JSON.stringify(from),
        					success : function(result) {
        						logNow(result);

        						var object_num = Object.keys(result);
        						for(i in object_num)
                				{
        							var row = result[object_num[i]];
                					var t_jm1 = Math.floor(row["jm"] / 500);
                					var t_jm2 = row["jm"] % 500;
                					var t_yb1 = Math.floor(row["yb"] / 500);
                					var t_yb2 = row["yb"] % 500;
                					var t_colo = row["colo"];
                					if ((row["gubn"] == '표지') && (bookcode.substring(0, 3) == '393')) // 전집류는 1도 더 추가 (총 2도 추가)
                						t_colo++;
                					if ((row["gubn"] == '표지') || (row["gubn"] == '속표지') || (row["gubn"] == '화보') || (row["gubn"] == '별지') || (row["gubn"] == '케이스') || (row["gubn"] == '면지'))
                						t_colo += 1;
                					if ((row["gubn"] == '면지') || row["gubn"] == '도비라')
                					{
                						//selBookCostStatement28
                						from = {
                								uid : uid
                						}
                						$.ajax({
                							type : "POST",
                							contentType : "application/json; charset=utf-8;",
                							dataType : "json",
                							url : SETTING_URL + "/monthclosing/select_bookcost_statement28",
                							async : false,
                							data : JSON.stringify(from),
                							success : function(result) {
                								logNow(result);
                								var object_num = Object.keys(result);
                								
                							}
                						});
                					}	
                					sum_3 += row["pcost"];
                					sum_2 += row["ycost"];
                					
                					htmlString += 
                                        '<tr>'+
        						        	'<td style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += row["gubn"]; else htmlString += '&nbsp;'; htmlString +='</span></td>'+
        						        	'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += row["jname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
        						        	'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt; width:60;">'; if ((row["jm"]) || (row["yb"])) htmlString +=  t_jm1 +' R ' + t_jm2 ; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
        						        	'<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10; width:60;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += t_yb1 + ' R ' + t_yb2; else htmlString += '&nbsp;'; htmlString +='</span></td>'+
        						        	'<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (row["ycost"]) htmlString += numberWithCommas(row["ycost"]); else htmlString += numberWithCommas(ytotcost); htmlString += '</span></td>'+
        						        	'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; 
        						        	if (t_colo) htmlString += t_colo +' ˚'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
        						        	'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; 
        						        	if (t_colo) htmlString += numberWithCommas(row["pdanga"]); else htmlString += '&nbsp;'; htmlString += '</span></td>'+
        						        	'<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += row["rnum"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
        						        	'<td style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += numberWithCommas(row["pcost"]); else htmlString += '&nbsp;'; htmlString += '</span></td>'+
        						        '</tr>';
                				}
        						if (burok)
        						{	
        							for (var i = 1 ; i <= burok ; i++)
        							{
        								bur_uid = uid + i;
        								//selBookCostStatement29
        								from = {
        										bur_uid : bur_uid
        								};
        								$.ajax({
        									type : "POST",
        									contentType : "application/json; charset=utf-8;",
        									dataType : "json",
        									url : SETTING_URL + "/monthclosing/select_bookcost_statement29",
        									async : false,
        									data : JSON.stringify(from),
        									success : function(result) {
        										logNow(result);
        										var object_num = Object.keys(result);
        										for(j in object_num)
                								{
        											row = result[object_num[j]];
                									t_jm1 = Math.floor(row["jm"] / 500);
                									t_jm2 = row["jm"] % 500;
                									t_yb1 = Math.floor(row["yb"] / 500);
                									t_yb2 = row["yb"] % 500;
                									t_colo = row["colo"];
                									if ((row["gubn"] == '표지') && (bookcode.substring(0,3) == '393')) // 전집류는 1도 더 추가 (총 2도 추가)
                										t_colo++;
                									if ((row["gubn"] == '표지') || (row["gubn"] == '화보') || (row["gubn"] == '별지') || (row["gubn"] == '케이스'))
                										t_colo += 1;
                									sum_3 += row["pcost"];
                									sum_2 += row["ycost"];
                									logNow("----------------------------");
                									logNow(sum_2);
                									htmlString += 
                										'<tr>'+
            								        		'<td style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += row["gubn"] + '&nbsp;(부록' + row["bucode"]+')'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        		'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += row["jname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        		'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += '(' + t_jm1 + ' R ' + t_jm2 + ')'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        		'<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += '(' + t_yb1 + ' R ' + t_yb2 + ')'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        		'<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (row["ycost"]) numberWithCommas(row["ycost"]); else htmlString += numberWithCommas(ytotcost); htmlString += '</span></td>'+
            								        		'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += t_colo+' ˚'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        		'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += numberWithCommas(row["pdanga"]); else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        		'<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += row["rnum"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        		'<td style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += numberWithCommas(row["pcost"]); else htmlString += '&nbsp;'; htmlString += '</span></td>'+
            								        	'</tr>';
                								}
        									}
        								});
        							}
        						}
        						htmlString +=
        							'<tr>'+
							        	'<td style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
							        	'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
							        	'<td style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_2) +'</span></td>'+
							        	'<td style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="right" valign="middle"><span style="font-size:9pt;">(' + m1_name + ')</span></td>'+
							        	'<td style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_3) +'</span></td>'+
							        	'</tr>'+
							        '</table>'+
							        '</td>'+
							        '</tr>'+
							        '<tr>'+
							        	'<td width="580" colspan="2" height="10"></td>'+
							        '</tr>'+
							        '<tr>'+
							        	'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>3. 제본비</b></span></td>'+
							        '</tr>'+
							        '<tr>'+
							        	'<td width="580" align="center" valign="top" colspan="2">'+
							        		'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
							        			'<tr>'+
							        				'<td width="77" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:10pt;">장형</span></td>'+
							        				'<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:10pt;">면수</span></td>'+
							        				'<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:3pt;">면당단가</span></td>'+
							        				'<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:3pt;">권당단가</span></td>'+
							        				'<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">부수</span></td>'+
							        				'<td width="70" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">기타</span></td>'+
							        				'<td width="106" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 제본금액</span></td>'+
							        			'</tr>';
        						from = {
        								m3 : m3
        						}
        						$.ajax({
        							type : "POST",
        							contentType : "application/json; charset=utf-8;",
        							dataType : "json",
        							url : SETTING_URL + "/monthclosing/select_bookcost_statement10",
        							async : false,
        							data : JSON.stringify(from),
        							success : function(result) {
        								logNow(result);
        								var object_num = Object.keys(result);
        								var row2 = result[object_num]
        								var m3_name = row2["wcname"];
        								
        								from = {
        										uid : uid
        								}
        								$.ajax({
        									type : "POST",
        									contentType : "application/json; charset=utf-8;",
        									dataType : "json",
        									url : SETTING_URL + "/monthclosing/select_bookcost_statement11",
        									async : false,
        									data : JSON.stringify(from),
        									success : function(result) {
        										logNow(result);

        										var object_num = Object.keys(result);
        										var row = result[object_num];
                								var jebuid = result[0]["uid"];
                								sum_4 = result[0]["totcost7"];
                								htmlString += 
                									'<tr>'+
                    						        	'<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-right-width:1px; border-bottom-color:black; border-left-color:black; border-right-color:black; border-bottom-style:solid; border-left-style:solid; border-right-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'+ t_janh +'</span></td>'+
                    						        	'<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="22" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'; if (result[0]["cgubn7"] <= 4) htmlString += result[0]["cpage7"]; htmlString += '</span></td>'+
                    						        	'<td width="77" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'; if (result[0]["cgubn7"] <= 4) htmlString += result[0]["cprice17"]; htmlString += '</span></td>'+
                    						        	'<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="22" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'+ result[0]["pdanga7"] +'</span></td>'+
                    						        	'<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="22" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' + numberWithCommas(result[0]["cnum7"]) +'</span></td>'+
                    						        	'<td width="70" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'; if (result[0]["cprice27"]) htmlString += result[0]["cprice27"]; htmlString += '</span></td>'+
                    						        	'<td width="106" style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' + numberWithCommas(sum_4) + '</span></td>'+
                    						        '</tr>';
                    						        	if (burok)
                            						    {
                            						    	sum_41 = 0;
                            						    	bur_uid = uid + 1;
                            						    	//selBookCostStatement12
                            								from = {
                            										bur_uid : bur_uid
                            								};
                            								$.ajax({
                            									type : "POST",
                            									contentType : "application/json; charset=utf-8;",
                            									dataType : "json",
                            									url : SETTING_URL + "/monthclosing/select_bookcost_statement12",
                            									async : false,
                            									data : JSON.stringify(from),
                            									success : function(result) {
                            										logNow(result);
                            										var object_num = Object.keys(result);
                            										var row2 = result[object_num];
                            										from = {
                            												jebon: row2["m3"]	
                            										}
                            										$.ajax({
                            											type : "POST",
                            											contentType : "application/json; charset=utf-8;",
                            											dataType : "json",
                            											url : SETTING_URL + "/monthclosing/select_bookcost_statement13",
                            											async : false,
                            											data : JSON.stringify(from),
                            											success : function(result) {
                            												logNow(result);
                            												var object_num = Object.keys(result);
                            												var row2 = result[object_num];
                            												m3b_name = row2["wcname"];
                            												
                            											}
                            										});
                            									}
                            								});
                            						    	for (var i = 1 ; i <= burok ; i++)
                            						    	{
                            						    		bur_uid = jebuid + i;
                            						    		//selBookCostStatement14
                            						    		from = {
                            						    				bur_uid : bur_uid
                            						    		};
                            						    		$.ajax({
                            						    			type : "POST",
                            						    			contentType : "application/json; charset=utf-8;",
                            						    			dataType : "json",
                            						    			url : SETTING_URL + "/monthclosing/select_bookcost_statement14",
                            						    			async : false,
                            						    			data : JSON.stringify(from),
                            						    			success : function(result) {
                            						    				logNow(result);
                            						    				var object_num = Object.keys(result);
                            						    				row = result[object_num];
                            						    				bu_janh = CheckJANH(row["cgubn7"]);
                                    						    		sum_4b = row["totcost7"];
                                    						    		//sum_4 += sum_4b;
                                    						    		sum_41 += sum_4b;
                                    						    		htmlString +=
                                    						    			'<tr>'+
                                    						    				'<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-right-width:1px; border-bottom-color:black; border-left-color:black; border-right-color:black; border-bottom-style:solid; border-left-style:solid; border-right-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'+ bu_janh+'</span></td>'+
                	                    						    			'<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if (row["cgubn7"] > 4) htmlString += '&nbsp;'; else htmlString += row["cpage7"]; htmlString += '</span></td>'+
                	                    						    			'<td width="77" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if (row["cgubn7"] > 4) htmlString += '&nbsp;'; else htmlString += row["cprice17"]; htmlString += '</span></td>'+
                	                    						    			'<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; row["pdanga7"] + '</span></td>'+
                	                    						    			'<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(row["cnum7"]) + '</span></td>'+
                	                    						    			'<td width="70" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">'; if (row["cprice27"]) htmlString += row["cprice27"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
                	                    						    			'<td width="106" style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_4b) +'</span></td>'+
                                    						    			'</tr>';
                            						    			}
                            						    		});                  						    		
                            						    	}}
                            						    htmlString +=
                            							    '<tr>'+
                        							        	'<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
                        							        	'<td width="291" colspan="4" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
                        							        	'<td width="70" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">(' + m3_name +')</span></td>'+
                        							        	'<td width="106" style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_4) +'</span></td>'+
                        							        '</tr>';
                            						    if (burok) {
                            						    	htmlString +=
                            						    		'<tr>'+
                            						    			'<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
                            						    			'<td width="291" colspan="4" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
                            						    			'<td width="70" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">('+m3b_name+')</span></td>'+
                            						    			'<td width="106" style="padding-right:10; border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_41)+'</span></td>'+
                            						    		'</tr>'+
                            		                            '</table>'+
                            			                        '</td>'+
                            			                        '</tr>'+
                            			                        '<tr>'+
                            			                        	'<td width="580" colspan="2" height="10"></td>'+
                            			                        '</tr>'+
                            			                        '<tr>'+
                            			                        	'<td width="580" align="center" valign="top" colspan="2">'+
                            			                        		'<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;"></table>';
                            						    }
                            							from = {
                            									uid : uid
                            							}
                            							$.ajax({
                            								type : "POST",
                            								contentType : "application/json; charset=utf-8;",
                            								dataType : "json",
                            								url : SETTING_URL + "/monthclosing/select_bookcost_statement15",
                            								async : false,
                            								data : JSON.stringify(from),
                            								success : function(result) {
                            									logNow(result);
                            									var object_num = Object.keys(result);
                            									for (j in object_num)
                            									{
                            										row = result[object_num[j]];
                            										var t_sum5 = Math.floor(row["totcost8"] * 1.1);
                            										sum_5 += t_sum5;
                            										htmlString +=
                            											'<table style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">'+
                            											'<tr>'+
                            		                                    	'<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;">'; if (j == 0) htmlString += '<b> 4. 코팅비 (비닐코팅)</b>'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
                            		                                    	'<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>'+
                            		                                    	'<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;">' + row["cnum8"] + ' R  ×  ' + numberWithCommas(row["cprice8"]) + ' 원  ×  1.1   ( ' + row["wcname"] + ' )</span></td>'+
                            		                                    	'<td width="81" height="30" align="right" style="padding-right:10;" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(t_sum5) + '</span></td>'+
                            		                                    '</tr>';
                            									}
                            									htmlString +='</table></td></tr>';
                            									var cust6 = "";
                            									logNow("uid : " + uid);
                            									from = {
                            											uid : uid
                            									}
                            									$.ajax({
                            										type : "POST",
                            										contentType : "application/json; charset=utf-8;",
                            										dataType : "json",
                            										url : SETTING_URL + "/monthclosing/select_bookcost_statement16",
                            										async : false,
                            										data : JSON.stringify(from),
                            										success : function(result) {
                            											logNow("안에")
                            											logNow(result);
                            											var object_num = Object.keys(result);
                            											logNow(object_num);
                            											if (Object.keys(result).length>0)
                            											{
                            												
                            												row = result[object_num];
                            												sum_6 += row["cprice9"];
                            												from = {
                            														ccode9 : row["ccode9"]
                            												};
                            												$.ajax({
                            													type : "POST",
                            													contentType : "application/json; charset=utf-8;",
                            													dataType : "json",
                            													url : SETTING_URL + "/monthclosing/select_bookcost_statement17",
                            													async : false,
                            													data : JSON.stringify(from),
                            													success : function(result) {
                            														logNow(result);
                            														var object_num = Object.keys(result);
                            														var row = result[object_num];
                            														cust6 = row["wcname"];
                            														logNow("cust6 :  " + cust6);
                            													}
                            												});
                            											}
                            											htmlString +=
                            												'<tr>'+
                            						                        	'<td width="580" align="center" valign="top" colspan="2">'+
                            						                            	'<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">'+
                            						                                	'<tr>'+
                            						                                    	'<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 5. 비닐카바비</b></span></td>'+
                            						                                    	'<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>'+
                            						                                    	'<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;">'; if (cust6) htmlString += '(' + cust6 +')'; htmlString += '</span></td>'+
                            						                                    	'<td width="81" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:10;">'; if (sum_6) htmlString += numberWithCommas(sum_6); htmlString += '</span></td>'+
                            						                                    '</tr>'+
                            						                                '</table>'+
                            						                            '</td>'+
                            						                        '</tr>';
                            						            		from = {
                            						            				uid : uid
                            						            		};
                            						            		$.ajax({
                            						            			type : "POST",
                            						            			contentType : "application/json; charset=utf-8;",
                            						            			dataType : "json",
                            						            			url : SETTING_URL + "/monthclosing/select_bookcost_statement31",
                            						            			async : false,
                            						            			data : JSON.stringify(from),
                            						            			success : function(result) {
                            						            				logNow(result);
                            						            				var object_num = Object.keys(result);
                            						            				var row = result[object_num];
                            						            				var stic = result[0]["w7"] + result[0]["w11"];
                            						            				htmlString +=
                            						            	                '<tr>'+
                            						    	                        	'<td width="580" align="center" valign="top" colspan="2">'+
                            						    	                            	'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
                            						    	                            		'<tr>'+
                            						    	                                    	'<td width="70" height="30"><span style="font-size:9pt;"><b> 6. 원고료</b></span></td>'+
                            						    	                                    	'<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
                            						    	                                    	'<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
                            						    	                                        	'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w1"]) htmlString += numberWithCommas(result[0]["w1"]); htmlString += '</span></p>'+
                            						    	                                        '</td>'+
                            						    	                                        '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
                            						    	                                        '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 7. 저작권료</b></span></td>'+
                            						    	                                        '<td width="10" height="30" align="center" valign="middle">:</td>'+
                            						    	                                        '<td width="90" height="30" align="right" style="padding-right:10pt">'+
                            						    	                                        	'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w2"]) htmlString += numberWithCommas(result[0]["w2"]);
                            						    	                    if ((bookcode == "329210") || (bookcode == "329220"))
                            						    	                    {
                            						    	                    	htmlString += '<br>';
                            						    	                    	htmlString += numberWithCommas(row["w21"]);
                            						    	                    }
                            						    	                    htmlString += 
                            						    	                    	'</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                '</tr>'+
                            					                                '<tr>'+
                            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b> 8. 출력비</b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w3"]) htmlString += numberWithCommas(result[0]["w3"]); htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 9. 사보료</b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w4"]) htmlString += numberWithCommas(result[0]["w4"]); htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                '</tr>'+
                            					                                '<tr>'+
                            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>10. 증지대 </b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w5"]) htmlString += numberWithCommas(result[0]["w5"]); htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>11. 케이스</b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w6"]) htmlString += numberWithCommas(result[0]["w6"]); htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                '</tr>'+
                            					                                '<tr>'+
                            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>12. 스티커</b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (stic) htmlString += numberWithCommas(stic); htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>13. CD</b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w8"]) htmlString += numberWithCommas(result[0]["w8"]); htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                '</tr>'+
                            					                                '<tr>'+
                            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>14. 기타</b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w9"]) htmlString += numberWithCommas(result[0]["w9"]); htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>15. 목형</b></span></td>'+
                            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
                            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
                            															'<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (result[0]["w11"]) htmlString += result[0]["w11"]; htmlString += '</span></p>'+
                            					                                    '</td>'+
                            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
                            					                                '</tr>'+
                            					                                '</table>'+
                            					                                '</td>'+
                            					                                '</tr>'+
                            					                                '<tr>'+
                            					                                '<td width="580" colspan="2" height="10"></td>'+
                            					                                '</tr>'+
                            					                                '<tr>'+
                            					                                '<td width="580" align="center" valign="top" colspan="2">'+
                            					                                '<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
                            					                                '<tr>'+
                            					                                    '<td width="190" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt; letter-spacing:30pt;">총계</span></p></td>'+
                            					                                    '<td width="130" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:20pt;">단가</span></td>'+
                            					                                    '<td width="130" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:10pt;">판매가</span></td>'+
                            					                                    '<td width="130" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:20pt;">정가</span></td>'+
                            					                                '</tr>';
                            													
                            													var total_cost = sum_1 + sum_2 + sum_3 + sum_4 + sum_41 + sum_5 + sum_6 + result[0]["w1"] + result[0]["w2"] + result[0]["w3"] + result[0]["w4"] + result[0]["w5"] + result[0]["w6"] + result[0]["w7"] + result[0]["w8"] + result[0]["w9"] + result[0]["w11"] + result[0]["w21"];;
                            													
                            													var total_danga = Math.round(total_cost/mknum);
                            													
                            													from = {
                            															bookcode : bookcode
                            													}
                            													$.ajax({
                            														type : "POST",
                            														contentType : "application/json; charset=utf-8;",
                            														dataType : "json",
                            														url : SETTING_URL + "/monthclosing/select_bookcost_statement30",
                            														async : false,
                            														data : JSON.stringify(from),
                            														success : function(result) {
                            															logNow(result);
                            															var object_num = Object.keys(result);
                            															var row = result[object_num];
                            															var total_panga = 0;
                            															if ((bookcode >= '123110') && (bookcode <= '123389'))
                            															{
                            																total_panga = sbuprc * 93 / 100;
                            															}
                            															else
                            															{
                            																//selBookCostStatement22
                            																from = {
                            																		sthaly : row["sbdung"]
                            																}
                            																$.ajax({
                            																	type : "POST",
                            																	contentType : "application/json; charset=utf-8;",
                            																	dataType : "json",
                            																	url : SETTING_URL + "/monthclosing/select_bookcost_statement22",
                            																	async : false,
                            																	data : JSON.stringify(from),
                            																	success : function(result) {
                            																		logNow(result);
                            																		var object_num = Object.keys(result);
                            																		row = result[object_num];
                            																		total_panga = sbuprc * row["sthaly"] / 100;
                            																	}
                            																});
                            															}
                            															htmlString +=
                            																'<tr>'+
                            							                                    '<td width="190" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;"> '+ numberWithCommas(total_cost) + '</span></td>'+
                            							                                    '<td width="130" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;"> '+ numberWithCommas(total_danga) + '</span></td>'+
                            							                                    '<td width="130" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;"> '+ numberWithCommas(total_panga) +' </span></td>'+
                            							                                    '<td width="130" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;"> '+ numberWithCommas(sbuprc) +' </span></td>'+
                            							                                '</tr>'+
                            							                            '</table>'+
                            							                        '</td>'+
                            							                '</tr>'+
                            							                '<tr>'+
                            							                        '<td width="580" align="right" valign="middle" colspan="2" height="1">'+
                            							'<p><span style="font-size:9pt;"></span></p>'+
                            							                        '</td>'+
                            							                '</tr>'+
                            							                '</table></td>'+
                            							    '</tr>'+
                            							    
                            							    /*'<tr>'+
                            							    	'<td width="620" bgcolor="white" align="center" valign="top">aaa<div align="left"><span style="font-size:9pt; padding-left:45pt; padding-top:0pt"><b>' + com_name + '</b></span></div></td>'+ 
                            							    '</tr>'+*/
                            															
                            							'</table>';
                            															htmlString += '<div align="left">'+
                            															'<span style="font-size:9pt; padding-left:65pt;"><b>' + com_name + '</b></span>'+
                            															'</div>';
                            															if (rec_num < total_record)
                            															{
                            																htmlString += '<p style="page-break-before:always">';
                            																}
                            															
                            							}
                            													});
                            													}
                            						            		});
                            						            		}
                            									});
                            									}
                            							});
                            							}        								
        								});
        								}
        						});
        						}
        				});        				
        				}
        		});
        		
        		}
				}// 첫 쿼리		
		});		
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
		}
	
}

//도서별 원가계산서 용지대 계산
function CalcYJ(uid, yea, mon, dat)
{
	logNow("용지대2");
	from = {
			uid : uid
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_bookcost_statement33",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				row = result[object_num[i]];
				from = {
						jcode : row["jcode"]
				};
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_bookcost_statement34",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						row2 = result[object_num];
						
						var tnum = (row["jm"] + row["yb"]) / 500;
						var new_cost = Math.floor(tnum * row2["danga"]);
						
						from = {
								new_cost : new_cost,
								row : row["uid"]
						};
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/select_bookcost_statement35",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow(result);
								var object_num = Object.keys(result);
								if (!result)
								{
									error("용지가격 등록 오류 (1)");
									exit;
								}
							}
						});
					}
				});
			}
			
		}
	});
	
	var burok = 0;
	from = {
			uid : uid
	};
	logNow(uid);
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_bookcost_statement36",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			row = result[object_num];
			if (row["sbsbph1"])
				burok += 1;
			if (row["sbsbph2"])
				burok += 1;
			if (row["sbsbph3"])
				burok += 1;
			if (row["sbsbph4"])
				burok += 1;

			if (burok > 0)
			{
				for (var i = 1 ; i <= burok ; i++)
				{
					bur_uid = uid + i;
					from = {
							bur_uid : bur_uid,
							i : i
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_bookcost_statement37",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
							var object_num = Object.keys(result);
							for(var j=0; j < object_num.length; j++){
								from = {
										jcode : row["jcode"]
								};
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_bookcost_statement34",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										row2 = result[object_num];
										
										tnum = (row["jm"] + row["yb"]) / 500;
										new_cost = Math.floor(tnum * row2["danga"]);
										
										from = {
												new_cost : new_cost,
												row : row["uid"]
										}
										$.ajax({
											type : "POST",
											contentType : "application/json; charset=utf-8;",
											dataType : "json",
											url : SETTING_URL + "/monthclosing/select_bookcost_statement35",
											async : false,
											data : JSON.stringify(from),
											success : function(result) {
												logNow(result);
												var object_num = Object.keys(result);
												
											}
										});
									}
								});
							}
						}
					});
				}
			}
		}
	});
}

//도서별 원가계산서 전체 용지대 계산
function CalcYJ2(yea, mon, dat)
{
	logNow("용지대1");
	var yea = $("select[name=ty]").val();
	var mon = $("select[name=tm]").val();
	var dat = $("select[name=td]").val();
	var date = yea + mon + dat;
	from = {
			date : date
	};
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_bookcost_statement32",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < Object.keys(result).length; i++)
			{
				mrow = result[object_num[i]];
				from = {
						mrow : mrow["uid"]
				};
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_bookcost_statement33",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						for(var j=0; j < Object.keys(result).length; j++)
						{
							row = result[object_num[j]];
							from = {
									jcode : row["jcode"]
							};
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/select_bookcost_statement34",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									var object_num = Object.keys(result);
									if (!result)
									{
										popup_msg("지질정보 open 오류");
										exit;
									}
									row2 = result[object_num];
									var tnum = (row["jm"] + row["yb"]) / 500;
									var new_cost = Math.floor(tnum * row2["danga"]);
									logNow("-----");
									logNow(mrow["uid"]);
									logNow(row2["danga"]);
									logNow(tnum);
									logNow(new_cost);
									logNow("-----");
									from = {
											new_cost : new_cost,
											row : row["uid"]
									};
									$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										url : SETTING_URL + "/monthclosing/select_bookcost_statement35",
										async : false,
										data : JSON.stringify(from),
										success : function(result) {
											logNow(result);
											if (!result)
											{
												error("용지가격 등록 오류 (1)");
												exit;
											}
											logNow("성공");
											
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

//도서별 상세 원가계산서  //lwhee
function SelBookCostStatementDetail(uid, ty, tm, td, page) {
	$('#jejak_detail_view').html(jmenu7("0_상세계산"));
	var sum_1 = 0; // 필름
    var sum_2 = 0; // 용지
    var sum_3 = 0; // 인쇄
    var sum_4 = 0; // 제본
    var sum_5 = 0; // 코팅
    var sum_6 = 0; // 비닐
    var sum_7 = 0; // 원고
    var sum_8 = 0; // 저작
    var sum_9 = 0; // 출력
    var sum_10 = 0; // 사보
    var sum_11 = 0; // 증지
    var sum_12 = 0; // 케이스
    var sum_13 = 0; // 기타
	var t_jan;
	var chk_jg;
	var totalData;
	var total_panga;
	var ytotcost = 0;
	var jebuid;
	var m3b_name;
	var sum_41=0;
	var json;
	
	function CheckJANH(jhcode) {
		switch (jhcode) {
		case "1":
			t_jan = "무선";
			break;
		case "2":
			t_jan = "반양장";
			break;
		case "3":
			t_jan = "절공";
			break;
		case "4":
			t_jan = "양장";
			break;
		case "5":
			t_jan = "중철";
			break;
		case "6":
			t_jan = "중미싱";
			break;
		case "7":
			t_jan = "스프링";
			break;
		case "8":
			t_jan = "PUR무선";
			break;
		}
		return t_jan;
	}

	htmlString = "";
	htmlString += 
			  '<tr>'
				+ '<td width="620" bgcolor="white" align="center" valign="top">'
					+ '<table border="0" cellpadding="0" cellspacing="0" width="580">'
					+ '<tr>'
						+ '<td width="580" align="center" valign="top" colspan="2">'
							+ '<table border="0" cellpadding="0" cellspacing="0" width="580">'
							+ '<br>'
								+ '<tr>'
									+ '<td width="260" align="left" valign="middle">'
										+ '<p align="right"><b><span style="font-size:18pt;">원 가 계 산 서</span></b></p>'
									+ '</td>'		+ '<td width="44"></td>'
									+ '<td width="276" align="right" valign="middle">'
										+ '<table border="0" cellpadding="2" cellspacing="1" width="270" bgcolor="black" height="50">'
											+ '<tr>'
												+ '<td width="60" bgcolor="white" height="50" align="center" valign="middle">&nbsp;</td>'
												+ '<td width="60" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'
												+ '<td width="60" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'
												+ '<td width="60" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'
												+ '<td width="30" height="50" align="center" valign="middle" bgcolor="white">'
													+ '<p style="line-height:18px;"><span style="font-size:9pt;">결<br>제</span></p>'
												+ '</td>' 
											+ '</tr>' 
										+ '</table>' 
									+ '</td>' 
								+ '</tr>' 
							+ '</table>'
						+ '</td>';

	var burok = 0;
	var from = {
		uid : uid
	}
	var from = {
		    uid : uid
		}
		$
		.ajax({
		    type: "POST",
		    contentType: "application/json; charset=utf-8;",
		    dataType: "json",
		    url: SETTING_URL + "/monthclosing/select_bookcost_statement4",
		    async: false,
		    data: JSON.stringify(from),
		    success: function (result) {
		    	
		        logNow(result);

		        var object_num = Object.keys(result);
		        var data = result[object_num];

		        if (data["sbsbph1"]) {
		            burok += 1;
		            var t_panh_b1 = data["sbsbph1"];
		            var t_janh_b1 = CheckJANH(data["sbsbjh1"]);
		            var t_page_b1 = data["sbsbpg1"];
		        }
		        if (data["sbsbph2"]) {
		            burok += 1;
		            var t_panh_b2 = data["sbsbph2"];
		            var t_janh_b2 = CheckJANH(data["sbsbjh2"]);
		            var t_page_b2 = data["sbsbpg2"];
		        }
		        if (data["sbsbph3"]) {
		            burok += 1;
		            var t_panh_b3 = data["sbsbph3"];
		            var t_janh_b3 = CheckJANH(data["sbsbjh3"]);
		            var t_page_b3 = data["sbsbpg3"];
		        }
		        if (data["sbsbph4"]) {
		            burok += 1;
		            var t_panh_b4 = data["sbsbph4"];
		            var t_janh_b4 = CheckJANH(data["sbsbjh4"]);
		            var t_page_b4 = data["sbsbpg4"];
		        }

		        var btype2;

		        switch (data["btype"]) {
		            case 1:
		                btype2 = "신간";
		                break;
		            case 2:
		                btype2 = "재판";
		                break;
		            case 3:
		                btype2 = "개정";
		                break;
		        }
		        var bookcode;
		        var mknum;
		        var SBUPRC;
		        var total_danga;
		        var from = {
		            uid: uid
		        }
		        $.ajax({
		                type: "POST",
		                contentType: "application/json; charset=utf-8;",
		                dataType: "json",
		                url: SETTING_URL + "/monthclosing/select_bookcost_statement5",
		                async: false,
		                data: JSON.stringify(from),
		                success: function (result) {

		                    logNow(result);

		                    var object_num = Object.keys(result);
		                    var data = result[object_num];

		                    SBUPRC = data["sbuprc"];
		                    t_com = data["bcode"].substring(0, 2);
		                    if (t_com == '03')
		                        t_com = 1;
		                    else
		                        t_com = 0;
		                    var t_panh = data["sbpanh"];
		                    var t_janh2 = data["sbjanh"];
		                    bookcode = data["bcode"];
		                    mknum = data["bnum"];

		                    var m1_name = data["wcname"];
		                    var m2 = data["m2"];
		                    var m21 = data["m21"];
		                    var m3 = data["m3"];
		                    var m4 = data["m4"];
		                    var m5 = data["m5"];
		                    var m6 = data["m6"];
		                    var m7 = data["m7"];
		                    var m8 = data["m8"];
		                    var m9 = data["m9"];
		                    switch (data["sbpanh"]) {
		                        case "A3":
		                            ppp = 8;
		                            break;
		                        case "A4":
		                            ppp = 16;
		                            break;
		                        case "A5":
		                            ppp = 32;
		                            break;
		                        case "A6":
		                            ppp = 64;
		                            break;
		                        case "B4":
		                            // $ppp = 16;
		                            ppp = 8;
		                            break;
		                        case "B5":
		                            // $ppp = 32;
		                            ppp = 16;
		                            break;
		                        case "B6":
		                            // $ppp = 64;
		                            ppp = 32;
		                            break;
		                        default:
		                            ppp = 16;
		                            break;
		                    }
		                    
		                    logNow("tm : " +tm);
		                    logNow("td : " +td);
		                    
		                    t_janh = CheckJANH(data["sbjanh"])
		                    htmlString += 
		                    	'</tr>'+
		                    	'<tr>'+
		                    		'<td width="290" align="left" valign="middle" height="30"><span style="font-size:9pt;"><font color="black"> 제작번호 : ' + data["crnum"] + ' / ' + data["bcode"] + '</font></span></td>'+
		                    		'<td width="290" height="30" align="right" valign="middle"><span style="font-size:9pt;"><font color="black">' + ty + ' 년 ' + ("0" + tm).slice(-2) + ' 월 ' + ("0" + td).slice(-2) + ' 일' + '</font></span></td>'+
		                    	'</tr>'+
		                    	'<tr>'+
		                    	  	'<td width="580" align="center" valign="top" colspan="2">'+
		                    	  		'<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
                    	  		'<tr>'+
		                    	  	'<td width="220" align="center" valign="middle" bgcolor="#F4F4F4" height="30">'+
		                    	  		'<p><span style="font-size:9pt;">도서명</span></p>'+
	                    	  		'</td>'+
	                    	  		'<td width="60" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">구분</span></td>'+
	                    	  		'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">판형</span></td>'+
	                    	  		'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">장형</span></td>'+
	                    	  		'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">면수</span></td>'+
	                    	  		'<td width="90" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제작부수</span></td>'+
                    	  		'</tr>'+
	                    	  	'<tr>'+
		                    	  	'<td width="220" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">' + data["bname"] + ' - ' + data["bcode"] + '</span></td>'+
		                    	  	'<td width="60" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">' + btype2 + '</span></td>'+
	                    	  		'<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">' + data["sbpanh"];
		                    if (t_panh_b1)
		                        htmlString += ' / ' + t_panh_b1;
		                    if (t_panh_b2)
		                        htmlString += ' / ' + t_panh_b2;
		                    if (t_panh_b3)
		                        htmlString += ' / ' + t_panh_b3;
		                    if (t_panh_b4)
		                        htmlString += ' / ' + t_panh_b4;
		                    htmlString += '</span></td>' +
		                        '<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'
		                        + t_janh;
		                    if (t_janh_b1)
		                        htmlString += ' / ' + t_janh_b1;
		                    if (t_janh_b2)
		                        htmlString += ' / ' + t_janh_b2;
		                    if (t_janh_b3)
		                        htmlString += ' / ' + t_janh_b3;
		                    if (t_janh_b4)
		                        htmlString += ' / ' + t_janh_b4;
		                    htmlString += '</span></td>' +
		                        '<td width="60" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'
		                        + data["bmyun"];
		                    if (t_page_b1)
		                        htmlString += ' / ' + t_page_b1;
		                    if (t_page_b2)
		                        htmlString += ' / ' + t_page_b2;
		                    if (t_page_b3)
		                        htmlString += ' / ' + t_page_b3;
		                    if (t_page_b4)
		                        htmlString += ' / ' + t_page_b4;
		                    htmlString +=
	                            	'</span></td>' +
	                            	'<td width="90" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">' + numberWithCommas(data["bnum"]) + ' 부</span></td>'+
		                        '</tr>'+
		                        '</table>'+
		                        '</td>'+
		                        '</tr>'+
		                        '<tr>'+
		                        	'<td width="580" colspan="2" height="20"></td>'+
		                        '</tr>'+
		                        '<tr>'+
		                        	'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>1. 필름 대지 소부비</b></span></td>'+
		                        '</tr>'+
		                        '<tr>'+
		                        	'<td width="580" align="center" valign="top" colspan="2">'+
		                        		'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
		                        			'<tr>'+
						                        '<td width="54" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
						                        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판종</span></td>'+
						                        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판수</span></td>'+
						                        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름량</span></td>'+
						                        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름<br>단가</span></td>'+
						                        '<td width="65" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름<br>금액</span></td>'+
						                        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">대지비</span></td>'+
						                        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">소부<br>단가</span></td>'+
						                        '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">소부비</span></td>'+
						                        '<td width="75" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 계</span></td>'+
					                        '</tr>';

		                    t_myun = data["bmyun"];
		                    
		                    var from = {
		                        uid: uid
		                    }
		                    $.ajax({
		                            type: "POST",
		                            contentType: "application/json; charset=utf-8;",
		                            dataType: "json",
		                            url: SETTING_URL + "/monthclosing/select_bookcost_statement6",
		                            async: false,
		                            data: JSON.stringify(from),
		                            success: function (result) {
		                                logNow(result);
		                                var object_num = Object.keys(result);
		                                
		                                for (var i in object_num) {
		                                    var data = result[object_num[i]];
		                                    if (!data["sum5"])
		                                        continue;
		                                    
		                                    sum_1 += data["sum5"];
		                                    //javascript:SelBookCostStatementSobuModify()
		                                    htmlString +=
		                                    	'<input type="hidden" name="uid1" value="'+ uid +'">'+
		                                        '<input type="hidden" name="ty1" value="'+ ty +'">'+
		                                        '<input type="hidden" name="tm1" value="'+ tm +'">'+
		                                        '<input type="hidden" name="td1" value="'+ td +'">'+
		                                        '<input type="hidden" name="page1" value="'+ page +'">'+
		                                        '<tr>'+
		                                        '<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ data["gubn5"] +'</span></td>'+
		                                        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ data["panst5"] +'</span></td>'+
		                                        '<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
		                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:white; width:45px;" name="pannum51" value="';
		                                    if (data["pannum5"])
		                                        htmlString += data["pannum5"];
		                                    htmlString += '"></span></td>' +
		                                        '<td width="50" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
		                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:white; width:45px;" name="filmnum5" value="';
		                                    if (data["filmnum5"])
		                                        htmlString += data["filmnum5"];
		                                    htmlString += '">' + '</span></td>' +
		                                        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">';
		                                    if (data["filmnum5"])
		                                        htmlString += numberWithCommas(data["filmdan5"]);
		                                    else
		                                        htmlString += '&nbsp;';
		                                    htmlString += '</span></td>' +
		                                        '<td width="65" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">';
		                                    if (data["filmnum5"])
		                                        htmlString += numberWithCommas(data["filmcost5"]);
		                                    else
		                                        htmlString += '&nbsp';
		                                    htmlString += '</span></td>' +
		                                        '<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
		                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:40px;" name="daeji5[]" value="'; if (data["daeji5"]) { htmlString += data["daeji5"]; } htmlString += '">'+'</span></td>'+
		                                        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">' + data["sobudan5"] + '</span></td>'+
		                                        '<td width="60" name="sobu" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(data["sobu5"]) + '</span></td>'+
		                                        '<td width="75" height="25" align="right" valign="middle"style="padding-right:10;" width="66" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;"><span style="font-size:9pt;">'+ numberWithCommas(data["sum5"])+ '</span></td>'+
	                                        '</tr>' + '<input type="hidden" name="daeid1" value="'+ data["uid"] + '">'+
	                                        '<input type="hidden" name="sobusum1" value="'+ data["sobu5"] +'">';
		                                        var input = $("input[name=pannum51]").val()
        		                                json = {
        		                                		data : input
        		                                }
                                                logNow("json : " + json); 
		                                }
		                                
		                                if (burok) {
		                                    for (var i = 1; i <= burok; i++) {
		                                        var bur_uid = uid + i;
		                                        logNow(uid + "유아디");
		                                        logNow(bur_uid + "비유알");
		                                        var from = {
		                                            bur_uid: bur_uid
		                                        }
		                                        $.ajax({
		                                                type: "POST",
		                                                contentType: "application/json; charset=utf-8;",
		                                                dataType: "json",
		                                                url: SETTING_URL + "/monthclosing/select_bookcost_statement7",
		                                                async: false,
		                                                data: JSON.stringify(from),
		                                                success: function (result) {
		                                                    logNow(result);
		                                                    var object_num = Object.keys(result);
		                                                    var burdata = result[object_num];
		                                                    logNow("burdata : "+ burdata["sum5"]);
		                                                    if (data["sum5"])
		                                                        sum_1 += burdata["sum5"];

		                                                    htmlString += '<tr>'
		                                                        '<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ burdata["gubn5"] +'</span></td>'+
		                                                        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ burdata["panst5"] +'</span></td>'+
		                                                        '<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
		                                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:white; width:45px;" name="pannum51" value="';
		                                                    if (burdata["pannum5"])
		                                                        htmlString += 
		                                                        	burdata["pannum5"] +'">' + '</span></td>'+
		                                                            '<td width="50" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
		                                                            '<INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:white; width:45px;" name="filmnum5[]" value="';
		                                                    if (burdata["filmnum5"])
		                                                        htmlString += burdata["filmnum5"];
		                                                    htmlString +=
		                                                        '">'+
		                                                        '</span></td>'+
		                                                        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">';
		                                                    if (data["filmnum5"])
		                                                        htmlString += numberWithCommas(burdata["filmdan5"]);
		                                                    else
		                                                        htmlString += '&nbsp;';
		                                                    htmlString +=
		                                                        '</span></td>'+
		                                                        '<td width="65" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">';
		                                                    if (burdata["filmnum5"])
		                                                        htmlString += numberWithCommas(burdata["filmcost5"]);
		                                                    else
		                                                        htmlString += '&nbsp</span></td>';
		                                                    htmlString +=
		                                                        '<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ 
		                                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:40px;" name="daeji5[]" value="';
		                                                    if (data["daeji5"])
		                                                        htmlString += burdata["daeji5"];
		                                                    htmlString +=
		                                                        '">'+
	                                                            '</span></td>'  +
		                                                        '<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ data["sobudan5"] +'</span></td>'+
		                                                        '<td width="60" name="sobu" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(burdata["sobu5"]) +'</span></td>'+
		                                                        '<td width="75" height="25" align="right" valign="middle"style="padding-right:10;" width="66" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;"><span style="font-size:9pt;">'+ numberWithCommas(burdata["sum5"]) +'</span></td>'+
		                                                        '<input type="hidden" name="daeid1" value="'+ burdata["uid"] +'">'+
		                                                        '<input type="hidden" name="daesum1" value="'+ burdata["sum5"] +'">'+
		                                                        '</tr>';
		                                                    logNow("니 좀 보자");
		                                                    logNow(burdata);
		                                                    logNow("니 좀 보자");
		                                                }
		                                            });
		                                    }
		                                }
		                                var input = $("input[name=pannum51]").val()
                                        logNow("input : " + input);
		                                json = {
		                                		data : input
		                                }
                                        logNow("json : " + json);
		                                htmlString += 
		                                	'<tr>'+
		                                	'<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
		                                	'<td width="325" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="6" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
		                                	'<td width="115" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="2" align="center" valign="middle"><span style="font-size:9pt;">('+ m1_name +')</span></td>'+
		                                	'<td style="padding-right:10;" width="75" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_1) +'</span></td>'+
		                                	'</tr>'+
		                                	'</table>'+
		                                	'</td>'+
		                                	'</tr>'+
		                                	'<tr>'+
		                                	'<td width="580" colspan="2" height="20" align="right">'+
		                                	'<input type="submit" onclick="javascript:SelBookCostStatementSobuModify('+ object_num.length +');" value="소부.대지 수정"></td>'+
		                                	'</tr>'+
		                                	'</form>'+
		                                	'<tr>'+
		                                	'<td width="580" colspan="2" height="20"></td>'+
		                                	'</tr>'+
		                                	'<tr>'+
		                                	'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>2. 용지대, 인쇄비</b></span></td>'+
		                                	'</tr>'+
		                                	'<tr>'+
		                                	'<td width="580" align="center" valign="top" colspan="2">'+
		                                	'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
		                                	'<tr>'+
		                                	'<td width="53" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
		                                	'<td width="63" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">지질</span></td>'+
		                                	'<td width="63" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정미</span></td>'+
		                                	'<td width="63" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">여분</span></td>'+
		                                	'<td width="84" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
		                                	'<td width="34" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">색도</span></td>'+
		                                	'<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄<br>단가</span></td>'+
		                                	'<td width="53" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">R수</span></td>'+
		                                	'<td width="97" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 인쇄비 계</span></td>'+
		                                	'</tr>'+
		                                	'<form name="dform" method="post" action="ex_view_m2.php">'+
		                                	'<input type="hidden" name="uid" value="'+ uid + '">'+
		                                	'<input type="hidden" name="ty" value="'+ ty + '">'+
		                                	'<input type="hidden" name="tm" value="'+ tm + '">'+
		                                	'<input type="hidden" name="td" value="'+ td + '">'+
		                                	'<input type="hidden" name="page" value="'+ page + '">';
		                            }
		                        });
		                    var from = {
		                        uid: uid
		                    }
		                    $.ajax({
		                            type: "POST",
		                            contentType: "application/json; charset=utf-8;",
		                            dataType: "json",
		                            url: SETTING_URL + "/monthclosing/select_bookcost_statement8",
		                            async: false,
		                            data: JSON.stringify(from),
		                            success: function (result) {
		                                logNow(result);
		                                var object_num = Object.keys(result);

		                                for (var i in object_num) {
		                                    var data = result[object_num[i]];

		                                    var t_jm1 = Math.floor(data["jm"] / 500);
		                                    var t_jm2 = data["jm"] % 500;
		                                    var t_yb1 = Math.floor(data["yb"] / 500);
		                                    var t_yb2 = data["yb"] % 500;
		                                    var t_colo = data["colo"];
		                                    if ((data["gubn"] == '표지') && (bookcode.substring(0, 3) == '393')) // 전집류 표지는 1도 더 추가 (총 2도 추가)
		                                        t_colo++;
		                                    //															if (($row[gubn] == '표지') || ($row[gubn] == '속표지') || ($row[gubn] == '화보') || ($row[gubn] == '별지') || ($row[gubn] == '케이스'))
		                                    if ((data["gubn"] == '표지') || (data["gubn"] == '속표지') || (data["gubn"] == '화보') || (data["gubn"] == '별지') || (data["gubn"] == '케이스') || (data["gubn"] == '면지') || (data["gubn"] == '면지1') || (data["gubn"] == '면지2')) // 면지도 +1 표시 - 2016.11.14
		                                        t_colo += 1;
		                                    if ((data["gubn"] == '면지') || data["gubn"] == '도비라') {
		                                        //$query9 = "select * from TMPLIST3 where listid=$uid and gubn like '%본문%'";
		                                        //$result9 = mysql_query($query9, $dbconn);
		                                        //$row9 = mysql_fetch_array($result9);

		                                        // 면지, 도비라 1도추가 - 삭제 : 20090513
		                                        //if ($row9[jcode] != $row[jcode])
		                                        //$t_colo += 1;
		                                        // 면지, 도비라 1도추가 - 20150413
		                                        //																if ($row9[jcode] != $row[jcode])
		                                        //																	$t_colo += 1;
		                                    }
		                                    sum_3 += data["pcost"];

		                                    sum_2 += data["ycost"];

		                                    htmlString +=
		                                        '<tr>' +
			                                        '<td width="53" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">' + data["gubn"] + '</span></td>' +
			                                        '<td width="63" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">' + data["jname"] + '</span></td>' +
			                                        '<td width="63" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((data["jm"]) || (data["yb"])) htmlString += t_jm1 + ' R ' + t_jm2; else htmlString += '&nbsp;'; htmlString += '</span></td>' +
			                                        '<td width="63" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((data["jm"]) || (data["yb"])) htmlString += t_yb1 + ' R ' + t_yb2; else htmlString += '&nbsp;'; htmlString += '</span></td>' +
	                                                '<td width="84" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (data["ycost"]) htmlString += numberWithCommas(data["ycost"]); else htmlString += numberWithCommas(ytotcost); htmlString += '</span></td>' +
	                                                '<td width="34" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += t_colo + ' ˚'; else htmlString += '&nbsp;'; htmlString += '</span></td>' +
	                                                '<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">' +
	                                                	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="pdanga[]" value="'; if (t_colo) htmlString += data["pdanga"]; else htmlString += '&nbsp;'; htmlString += '"></span></td>' +
	                                                '<td width="53" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">' +
	                                                	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="rnum[]" value="'; if (t_colo) htmlString += data["rnum"]; else htmlString += '&nbsp;'; htmlString += '">' +
	                                                	'<input type="hidden" name="uids[]" value="' + data["uid"] + '"></span></td>' +
	                                                '<td style="padding-right:10;" width="97" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += numberWithCommas(data["pcost"]); else htmlString += '&nbsp'; htmlString += '</span></td>' +
                                                '</tr>';
		                                }
		                                if (burok) {
		                                    for (var i = 1; i <= burok; i++) {
		                                        bur_uid = uid + i;

		                                        var from = {
		                                            bur_uid: bur_uid
		                                        }
		                                        $.ajax({
		                                                type: "POST",
		                                                contentType: "application/json; charset=utf-8;",
		                                                dataType: "json",
		                                                url: SETTING_URL + "/monthclosing/select_bookcost_statement9",
		                                                async: false,
		                                                data: JSON.stringify(from),
		                                                success: function (result) {
		                                                    logNow(result);
		                                                    var object_num = Object.keys(result);

		                                                    for (var i in object_num) {
		                                                        var data = result[object_num[i]];
		                                                        t_jm1 = Math.floor(data["jm"] / 500);
		                                                        t_jm2 = data["jm"] % 500;
		                                                        t_yb1 = Math.floor(data["yb"] / 500);
		                                                        t_yb2 = data["yb"] % 500;
		                                                        t_colo = data["colo"];
		                                                        if ((data["gubn"] == '표지') && (bookcode.substring(0, 3) == '393')) // 전집류는 1도 더 추가 (총 2도 추가)
		                                                            t_colo++;
		                                                        if ((data["gubn"] == '표지') || (data["gubn"] == '화보') || (data["gubn"] == '별지') || (data["gubn"] == '케이스'))
		                                                            t_colo += 1;
		                                                        sum_3 += data["pcost"];
		                                                        sum_2 += data["ycost"];

		                                                        htmlString +=
		                                                            '<tr>' +
			                                                            '<td width="53" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if ((data["jm"]) || (data["yb"])) htmlString += data["gubn"] + ' &nbsp;(부록' + data["bucode"] + ')'; else htmlString += '&nbsp'; htmlString += '</span></td>' +
		                                                                '<td width="63" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if ((data["jm"]) || (data["yb"])) htmlString += data["jname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>' +
	                                                                    '<td width="63" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((data["jm"]) || (data["yb"])) htmlString += t_jm1 + ' R ' + t_jm2; else htmlString += '&nbsp;'; htmlString += '</span></td>' +
	                                                                    '<td width="63" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((data["jm"]) || (data["yb"])) htmlString += t_yb1 + ' R ' + t_yb2; else htmlString += '&nbsp;'; htmlString += '</span></td>' +
	                                                                    '<td width="84" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (data["ycost"]) htmlString += numberWithCommas(data["ycost"]); else htmlString += "ytotcost"; htmlString += '</span></td>' +
	                                                                    '<td width="34" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += t_colo + ' ˚'; else htmlString += '&nbsp;'; htmlString += '</span></td>' +
	                                                                    '<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">' +
	                                                                    	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="pdanga[]" value="'; if (t_colo) htmlString += data["pdanga"]; else htmlString += '&nbsp;'; htmlString += '"></span></td>' +
	                                                                    '<td width="53" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">' +
	                                                                    	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="rnum[]" value="'; if (t_colo) htmlString += data["rnum"]; else htmlString += '&nbsp;'; htmlString += '">' +
	                                                                    	'<input type="hidden" name="uids[]" value="' + data["uid"] + '"></span></td>' +
	                                                                    '<td style="padding-right:10;" width="97" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += numberWithCommas(data["pcost"]); else htmlString += '&nbsp;'; htmlString += '</span></td>' +
                                                                    '</tr>';
		                                                    }
		                                                }
		                                            });
		                                    }
		                                }
		                                htmlString +=
		                                    '<tr>' +
			                                    '<td width="63" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>' +
			                                    '<td width="189" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>' +
			                                    '<td width="84" style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(sum_2) + '</span></td>' +
			                                    '<td width="147" style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="right" valign="middle"><span style="font-size:9pt;">(' + m1_name + ')' + '</span></td>' +
			                                    '<td style="padding-right:10;" width="97" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(sum_3) + '</span></td>' +
		                                    '</tr>' +
		                                    '</table>' +
		                                    '</td>' +
		                                    '</tr>' +
		                                    '<tr>' +
		                                    	'<td width="580" colspan="2" height="20" align="right">' +
		                                    		'<span style="font-size:8pt;">* 정미,여분은 본문작업지시서 에서 수정</span>&nbsp;&nbsp;&nbsp;<input type="submit" value="인쇄비 수정"></td>' +
		                                    '</tr>' +
		                                    '</form>' +
		                                    '<tr>' +
		                                    	'<td width="580" colspan="2" height="20"></td>' +
		                                    '</tr>' +
		                                    '<tr>' +
		                                    	'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>3. 제본비</b></span></td>' +
		                                    '</tr>' +
		                                    '<tr>' +
		                                    	'<td width="580" align="center" valign="top" colspan="2">' +
				                                    '<table border="0" cellpadding="0" cellspacing="0" width="580">' +
				                                    '<tr>' +
					                                    '<td width="77" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>' +
					                                    '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>' +
					                                    '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면당단가</span></td>' +
					                                    '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">권당단가</span></td>' +
					                                    '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>' +
					                                    '<td width="70" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">기타</span></td>' +
					                                    '<td width="106" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 제본금액</span></td>' +
				                                    '</tr>' +
		                                    '<form name="eform" method="post" action="ex_view_m3.php">' +
			                                    '<input type="hidden" name="uid" value="<?=$uid?>">' +
			                                    '<input type="hidden" name="ty" value="<?=$ty?>">' +
			                                    '<input type="hidden" name="tm" value="<?=$tm?>">' +
			                                    '<input type="hidden" name="td" value="<?=$td?>">' +
			                                    '<input type="hidden" name="page" value="<?=$page?>">';
		                            }
		                        });
		                    var from = {
		                        m3: m3
		                    }
		                    $.ajax({
		                            type: "POST",
		                            contentType: "application/json; charset=utf-8;",
		                            dataType: "json",
		                            url: SETTING_URL + "/monthclosing/select_bookcost_statement10",
		                            async: false,
		                            data: JSON.stringify(from),
		                            success: function (result) {
		                                logNow(result);
		                                var object_num = Object.keys(result);
		                                var data2 = result[object_num];
		                                m3_name = data2["wcname"];
		                            }
		                        });
		                }
		            });

		        var from = {
		            uid: uid
		        }
		        $.ajax({
		                type: "POST",
		                contentType: "application/json; charset=utf-8;",
		                dataType: "json",
		                url: SETTING_URL + "/monthclosing/select_bookcost_statement11",
		                async: false,
		                data: JSON.stringify(from),
		                success: function (result) {
		                    var object_num = Object.keys(result);
		                    var data = result[object_num];
		                    logNow(result);
		                    jebuid = result[0]["uid"];
		                    sum_4 = result[0]["totcost7"];
		                    var object_num = Object.keys(result);
		                    var bitable7Data = result[object_num];

		                    htmlString +=
		                        '<tr>' +
			                        '<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-right-width:1px; border-bottom-color:black; border-left-color:black; border-right-color:black; border-bottom-style:solid; border-left-style:solid; border-right-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ t_janh + '</span></td>' +
			                        '<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' +
			                        	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cpage[]" value="' + result[0]["cpage7"] + '"></span></td>' +
			                        '<td width="77" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' +
			                        	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cprice1[]" value="' + result[0]["cprice17"] + '"></span></td>' +
			                        '<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' +
			                        	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="pdanga[]" value="' + result[0]["pdanga7"] + '"></span></td>' +
			                        '<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' + numberWithCommas(result[0]["cnum7"]) + '</span></td>' +
			                        '<td width="70" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' +
			                        	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cprice2[]" value="' + result[0] ["cprice27"] + '"></span></td>' +
			                        '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt; padding-left:0pt;">' + numberWithCommas(sum_4) + '<input type="hidden" name="uids[]" value="' + result[0]["uid"] + '"></span></td>' +
		                        '</tr>';
		                }
		            });
		        if (burok) {
		            sum_41 = 0;
		            bur_uid = uid + 1;
		            logNow(bur_uid);
		            from = {
		                bur_uid: bur_uid
		            }
		            $.ajax({
		                    type: "POST",
		                    contentType: "application/json; charset=utf-8;",
		                    dataType: "json",
		                    url: SETTING_URL + "/monthclosing/select_bookcost_statement12",
		                    async: false,
		                    data: JSON.stringify(from),
		                    success: function (result) {
		                        var object_num = Object.keys(result);
		                        var m3Data = result[object_num];
		                        logNow("m3 : " + m3Data["m3"]);
		                        from = {
		                            jebon: m3Data["m3"]
		                        }
		                        $.ajax({
		                                type: "POST",
		                                contentType: "application/json; charset=utf-8;",
		                                dataType: "json",
		                                url: SETTING_URL + "/monthclosing/select_bookcost_statement13",
		                                async: false,
		                                data: JSON.stringify(from),
		                                success: function (result) {
		                                    var object_num = Object.keys(result);
		                                    var kswcust0Data = result[object_num];
		                                    m3b_name = kswcust0Data["wcname"];
		                                }
		                            });
		                    }
		                });
		            for (var j = 1; j <= burok; j++) {
		                bur_uid = jebuid + j;

		                from = {
		                    bur_uid: bur_uid
		                }
		                $.ajax({
		                        type: "POST",
		                        contentType: "application/json; charset=utf-8;",
		                        dataType: "json",
		                        url: SETTING_URL + "/monthclosing/select_bookcost_statement14",
		                        async: false,
		                        data: JSON.stringify(from),
		                        success: function (result) {
		                            var object_num = Object.keys(result);
		                            var biData = result[object_num];
		                            bu_janh = CheckJANH(biData["cgubn7"]);
		                            sum_4b = biData["totcost7"];
		                            // $sum_4 += $sum_4b;
		                            sum_41 += sum_4b;
		                            htmlString +=
		                                '<tr>' +
			                                '<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-right-width:1px; border-bottom-color:black; border-left-color:black; border-right-color:black; border-bottom-style:solid; border-left-style:solid; border-right-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+bu_janh+'</span></td>' +
			                                '<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt;">' +
			                                	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cpage[]" value="' + biData["cpage7"] + '"></span></td>' +
			                                '<td width="77" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">' +
			                                	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cprice1[]" value="' + biData["cprice17"] + '"></span></td>' +
			                                '<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt;">' +
			                                	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="pdanga[]" value="' + biData["pdanga7"] + '"></span></td>' +
			                                '<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(biData["cnum7"]) + '</span></td>' +
			                                '<td width="70" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">' +
			                                	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cprice2[]" value="' + biData["cprice27"] + '"></span></td>' +
			                                '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_4b) +
			                                	'<input type="hidden" name="uids[]" value="' + biData["uid"] + '"></span></td>' +
		                                '</tr>';
		                        }
		                    });
		            }
		        }
		        htmlString +=
		            '<tr>' +
			            '<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>' +
			            '<td width="291" colspan="4" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="2" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>' +
			            '<td width="70" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">(' + m3_name + ')</span></td>' +
			            '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(sum_4) + '</span></td>' +
		            '</tr>';

		        if (burok) {
		            htmlString +=
		                '<tr>' +
			                '<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>' +
			                '<td width="291" colspan="4" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>' +
			                '<td width="70" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="22" align="center" valign="middle"><span style="font-size:9pt;">(' + m3b_name + ')</span></td>' +
			                '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="22" align="right" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(sum_41) + '</span></td>' +
		                '</tr>';
		        }
		        htmlString +=
		            '</table>' +
		            '</td>' +
		            '</tr>' +
		            '<tr>' +
		            	'<td width="580" colspan="2" height="20" align="right">' +
		            		'<span style="font-size:8pt;"><input type="submit" value="제본비 수정"></td>' +
		            '</tr>' +
		            '</form>' +
		            '<tr>' +
		            	'<td width="580" colspan="2" height="20"></td>' +
		            '</tr>' +
		            '<tr>' +
		            	'<td width="580" align="center" valign="top" colspan="2">' +
		            		'<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">' +
		            			'<form name="fform" method="post" action="ex_view_m4.php">' +
						            '<input type="hidden" name="uid" value="<?=$uid?>">' +
						            '<input type="hidden" name="ty" value="<?=$ty?>">' +
						            '<input type="hidden" name="tm" value="<?=$tm?>">' +
						            '<input type="hidden" name="td" value="<?=$td?>">' +
						            '<input type="hidden" name="page" value="<?=$page?>">';

		        from = {
		            uid: uid
		        }
		        $.ajax({
		                type: "POST",
		                contentType: "application/json; charset=utf-8;",
		                dataType: "json",
		                url: SETTING_URL + "/monthclosing/select_bookcost_statement15",
		                async: false,
		                data: JSON.stringify(from),
		                success: function (result) {
		                	
		                	var object_num = Object.keys(result);
		        			for(var q in object_num){
		        				var biksData = result[object_num[q]];
		                        logNow(result);
		                        var t_sum5 = Math.floor(biksData["totcost8"] * 1.1);
		                        sum_5 += t_sum5;
		                        htmlString +=
		                            '<tr>' +
		                            	'<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;">';
		                            	if (q == 0) htmlString += '<b> 4. 코팅비 (비닐코팅)</b>'; htmlString +='</span></td>' +
			                            '<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>' +
			                            '<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;">' +
			                            	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cnum[]" value="' + biksData["cnum8"] + '">' + 'R  ×  ' +
			                            	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name="cprice[]" value="' + biksData["cprice8"] + '">' + '원  ×  1.1   <a href="javascript:DelCoat(\'' + biksData["uid"] + '\');">( ' + biksData["wcname"] + ' )</a></span></td>' +
		                            	'<td width="81" height="30" align="right" style="padding-right:10;" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(t_sum5) + '<input type="hidden" name="uids[]" value="' + biksData["uid"] + '"></span></td>' + '</tr>';
		                    }
		                    
		                    htmlString +=
		                        '</table>' +
		                        '</td>' +
		                        '</tr>' +
		                        '<tr>' +
			                        '<td width="580" colspan="2" height="20" align="right">' +
			                        	'<span style="font-size:9pt;"><a href="javascript:ShowLay(\'coatin\');">| 코팅비 추가 |</a></span>&nbsp;&nbsp;' +
			                        	'<span style="font-size:8pt;"><input type="submit" value="코팅비 수정"></td>' +
		                        '</tr>' +
		                        '</form>' +
		                        '<tr style="display:none;" id="coatin">' +
		                        	'<form name="coatform" method="post" action="ex_view_m4a.php" target="tFrm">' +
		                        		'<input type="hidden" name="uid" value="<?=$uid?>">' +
		                        		'<td width="580" colspan="2" height="20" align="center"><span style="font-size:9pt;">' +
		                        		'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name=\'cnum\'> R &nbsp;&nbsp;&nbsp;' +
		                        		'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name=\'cprice\'> 원 &nbsp;&nbsp;&nbsp;' +
		                        		'<input type="submit" value="추가"></span></td>' +
	                        		'</form>' +
		                        '</tr>' +

		                        '<form name="gform" method="post" action="ex_view_m5.php">' +
		                        	'<input type="hidden" name="uid" value="<?=$uid?>">' +
		                        	'<input type="hidden" name="ty" value="<?=$ty?>">' +
		                        	'<input type="hidden" name="tm" value="<?=$tm?>">' +
		                        	'<input type="hidden" name="td" value="<?=$td?>">' +
		                        	'<input type="hidden" name="page" value="<?=$page?>">';
		                }
		            });
		        var cust6 = "";
		        var from = {
		            uid: uid
		        }
		        $.ajax({		        
		                type: "POST",
		                contentType: "application/json; charset=utf-8;",
		                dataType: "json",
		                url: SETTING_URL+ "/monthclosing/select_bookcost_statement16",
		                async: false,
		                data: JSON
		                    .stringify(from),
		                success: function (result) {
		                    var object_num = Object.keys(result);
		                    var data = result[object_num];    
		                    if (Object.keys(result).length>0) {
		                    	logNow(result);
		                        var bi9Data = result[object_num];
		                        sum_6 += bi9Data["cprice9"];
		                        var uid9 = bi9Data["uid"];
		                        from = {
		                            ccode9: bi9Data["ccode9"]
		                        }
		                        $.ajax({
		                                type: "POST",
		                                contentType: "application/json; charset=utf-8;",
		                                dataType: "json",
		                                url: SETTING_URL
		                                    + "/monthclosing/select_bookcost_statement17",
		                                async: false,
		                                data: JSON
		                                    .stringify(from),
		                                success: function (result) {
		                                    var object_num = Object.keys(result);
		                                    var wcname = result[object_num];
		                                    cust6 = wcname["wcname"];
		                                }
		                            });
		                    }
		                    htmlString +=
		                        '<tr>' +
		                        	'<td width="580" align="center" valign="top" colspan="2">' +
				                        '<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">' +
					                        '<tr>' +
						                        '<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 5. 비닐카바비</b></span></td>' +
						                        '<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>' +
						                        '<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;">';
		                    if (cust6) htmlString += '<a href="javascript:DelVyn(\''+uid9+'\');">( '+cust6+' )</a>' + '</span></td>' +
		                        '<td width="81" height="30" align="right" style="padding-right:10;" valign="middle"><span style="font-size:9pt;">';
		                    if (sum_6) {
		                        htmlString += '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name=\'cprice\' value="' + sum_6 + '"><input type="hidden" name="uids" value="' + uid9 + '">';
		                    }
		                    
		                    htmlString +=
		                    	'</span></td>'+
		                    	'</tr>'+
		                    	'</table>'+
		                    	'</td>'+
		                    	'</tr>'+
		                    	'<tr>'+
		                    		'<td width="580" colspan="2" height="20" align="right">'+
		                    			'<span style="font-size:9pt;"><a href="javascript:ShowLay(\'vyn\');">| 비닐 추가 |</a></span>&nbsp;&nbsp;'+
	                    				'<span style="font-size:8pt;"><input type="submit" value="비닐비 수정"></td>'+
		                    	'</tr>'+
		                    	'</form>'+
	                    		'<tr style="display:none;" id="vyn">'+
		                    		'<form name="vynform" method="post" action="ex_view_m5a.php" target="tFrm">'+
	                    			'<input type="hidden" name="uid" value="'+ uid +'">'+
		                    		'<td width="580" colspan="2" height="20" align="center"><span style="font-size:9pt;">                        	'+
		                    		'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:50px;" name=\'cprice\'> 원 &nbsp;&nbsp;&nbsp;'+
		                    		'<input type="submit" value="추가"></span></td>'+
		                    		'</form>'+
		                    	'</tr>'+
	                    		'<tr>'+
	                    			'<td width="580" colspan="2" height="20" align="right"></td>'+
		                    	'</tr>';
		                }
		            });
		        from = {
			            uid: uid
			        }
			        $.ajax({
			                type: "POST",
			                contentType: "application/json; charset=utf-8;",
			                dataType: "json",
			                url: SETTING_URL+ "/monthclosing/select_bookcost_statement18",
			                async: false,
			                data: JSON.stringify(from),
			                success: function (result) {
			                	var data = result[Object.keys(result)];
			                	logNow(data);
			                	totalData = data;
			                	if (!Object.keys(result))
			                	{
			                		from ={
			                				uid : uid
			                		}
			                		$.ajax({
						                type: "POST",
						                contentType: "application/json; charset=utf-8;",
						                dataType: "json",
						                url: SETTING_URL+ "/monthclosing/select_bookcost_statement19",
						                async: false,
						                data: JSON.stringify(from),
						                success: function (result) {
						                	logNow("실행 결과 꼭 확인 (코팅비 추가)");						                	
						                }
			                		});			                		
			                	}
			                	htmlString += 
			                		'<form name="hform" method="post" action="ex_view_m6.php">'+
				                		'<input type="hidden" name="uid" value="'+ uid +'">'+
				                		'<input type="hidden" name="ty" value="'+ ty +'">'+
				                		'<input type="hidden" name="tm" value="'+ tm +'">'+
				                		'<input type="hidden" name="td" value="'+ td +'">'+
				                		'<input type="hidden" name="page" value="'+ page +'">'+
			                		'<tr>'+
			                			'<td width="580" align="center" valign="top" colspan="2">'+
			                				'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
			                					'<tr>'+
							                		'<td width="70" height="30"><span style="font-size:9pt;"><b> 6. 원고료</b></span></td>'+
							                		'<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
							                		'<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
							                			'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
							                			'<INPUT style=" padding-right:5pt; font-family:굴림; font-size:9pt; text-align:right; border-width:1px; border-color:white; width:80px;" name=\'w1\' onkeyup=\'auto_comma(this);\' value="';
			                							if (data["w1"]) htmlString += numberWithCommas(data["w1"]); htmlString += '">'+
			                							'</span></p>'+
							                		'</td>'+
							                		'<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
							                		'<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 7. 저작권료</b></span></td>'+
							                		'<td width="10" height="30" align="center" valign="middle">:</td>'+
							                		'<td width="90" height="40" align="right" style="padding-right:10pt">'+
							                			'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
							                			'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w2\' onkeyup=\'auto_comma(this);\' value="'; if (data["w2"]) htmlString += numberWithCommas(data["w2"]); htmlString += '">';
		                		if ((bookcode == "329210") || (bookcode == "329220"))
		                		{
		                			if (data["w21"])
		                			{
		                				htmlString += '<br>' + numberWithCommas(data["w21"]);
		                			}
		                			else
		                			{
		                				var new_21 = data["w2"] * 3;
		                				from = {
		                						new_21 : new_21,
		                						uid : uid
		                				}
		                				$.ajax({
		        			                type: "POST",
		        			                contentType: "application/json; charset=utf-8;",
		        			                dataType: "json",
		        			                url: SETTING_URL+ "/monthclosing/select_bookcost_statement20",
		        			                async: false,
		        			                data: JSON.stringify(from),
		        			                success: function (result) {
		        			                	htmlString += '<br>' + numberWithCommas(new_21);
		        			                }
		                				});
		                			}
		                		}
		                		htmlString += 
		                			'</span></p>'+
		                			'</td>'+
		                			'<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
		                			'</tr>'+
		                			'<tr>'+
		                				'<td width="70" height="30"><span style="font-size:9pt;"><b> 8. 출력비</b></span></td>'+
		                				'<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
		                				'<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
		                					'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
		                					'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w3\' onkeyup=\'auto_comma(this);\' value="'; if (data["w3"]) htmlString +=numberWithCommas(data["w3"]); htmlString +='">'+
		                					'</span></p>'+
		                				'</td>'+
			                			'<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
			                			'<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 9. 사보료</b></span></td>'+
			                			'<td width="10" height="30" align="center" valign="middle">:</td>'+
			                			'<td width="90" height="30" align="right" style="padding-right:10pt">'+
			                				'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
			                				'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w4\' onkeyup=\'auto_comma(this);\' value="'; if (data["w4"]) htmlString += numberWithCommas(data["w4"]); htmlString +='">'+
			                				'</span></p>'+
		                				'</td>'+
		                				'<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
		                			'</tr>'+
		                			'<tr>'+
			                			'<td width="70" height="30"><span style="font-size:9pt;"><b>10. 증지대 </b></span></td>'+
			                			'<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
			                			'<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
			                				'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
			                				'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w5\' onkeyup=\'auto_comma(this);\' value="'; if (data["w5"]) htmlString += numberWithCommas(data["w5"]); htmlString +='">'+
			                				'</span></p>'+
			                			'</td>'+
			                			'<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
			                			'<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>11. 케이스</b></span></td>'+
			                			'<td width="10" height="30" align="center" valign="middle">:</td>'+
			                			'<td width="90" height="30" align="right" style="padding-right:10pt">'+
				                			'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
				                			'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w6\' onkeyup=\'auto_comma(this);\' value="'; if (data["w6"]) numberWithCommas(data["w6"]); htmlString+='">'+
				                			'</span></p>'+
			                			'</td>'+
			                			'<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
		                			'</tr>'+
		                			'<tr>'+
		                				'<td width="70" height="30"><span style="font-size:9pt;"><b>12. 스티커</b></span></td>'+
			                			'<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
			                			'<td width="90" height="30" align="right" style="padding-right:10pt">'+
			                				'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
			                				'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w7\' onkeyup=\'auto_comma(this);\' value="'; if (data["w7"]) htmlString +=numberWithCommas(data["w7"]); htmlString +='">'+
			                				'</span></p>'+
		                				'</td>'+
			                			'<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
			                			'<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>13. CD</b></span></td>'+
			                			'<td width="10" height="30" align="center" valign="middle">:</td>'+
			                			'<td width="90" height="30" align="right" style="padding-right:10pt">'+
				                			'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
				                			'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w8\' onkeyup=\'auto_comma(this);\' value="';if (data["w8"]) htmlString += numberWithCommas(data["w8"]); htmlString +='">'+
				                			'</span></p>'+
			                			'</td>'+
			                			'<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
		                			'</tr>'+
		                			'<tr>'+
			                			'<td width="70" height="30"><span style="font-size:9pt;"><b>14. 기타</b></span></td>'+
			                			'<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
			                			'<td width="90" height="30" align="right" style="padding-right:10pt">'+
				                			'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
				                			'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w9\' onkeyup=\'auto_comma(this);\' value="'; if (data["w9"]) htmlString += numberWithCommas(data["w9"]); htmlString +='">'+
				                			'</span></p></td>'+
			                			'<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
			                			'<td width="100" height="30"><span style="font-size:9pt;"><b>15. 목형</b></span></td>'+
			                			'<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
			                			'<td width="90" height="30" align="right" style="padding-right:10pt">'+
				                			'<p style="margin-left:5px;"><span style="font-size:9pt;">'+
				                			'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; width:80px;" name=\'w11\' onkeyup=\'auto_comma(this);\' value="'; if (data["w11"]) htmlString += numberWithCommas(data["w11"]); htmlString +='">'+
				                			'</span></p></td>'+
			                			'<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
		                			'</tr>'+
		                			'<tr>'+
		                				'<td width="580" colspan="8" height="30" align="right"><span style="font-size:9pt;">'+
		                				'<input type="submit" value="기타 수정"></span></td>'+
		                			'</tr>'+
		                			'</form>'+
		                			'</table>'+
		                			'</td>'+
		                			'</tr>'+
		                			'<tr>'+
		                				'<td width="580" colspan="2" height="20"></td>'+
		                			'</tr>'+
		                			'<tr>'+
		                				'<td width="580" align="center" valign="top" colspan="2">'+
				                			'<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
				                			'<tr>'+
					                			'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt;">총계</span></p></td>'+
					                			'<td width="260" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;"></span></td>'+
					                			'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">단가</span></td>'+
					                			'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">판매가</span></td>'+
					                			'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">정가</span></td>'+
				                			'</tr>';
				                			
		                			var total_cost = sum_1 + sum_2 + sum_3 + sum_4  + sum_5 + sum_6 + sum_41 + totalData["w1"] + totalData["w2"] + totalData["w3"] + totalData["w4"] + totalData["w5"] + totalData["w6"] + totalData["w7"] + totalData["w8"] + totalData["w9"] + totalData["w11"] + totalData["w21"];
		                			var total_danga = (total_cost/mknum).toFixed(2);
		                			
		                			from = {
		                					bookcode : bookcode
		                			}
		                			$.ajax({
	        			                type: "POST",
	        			                contentType: "application/json; charset=utf-8;",
	        			                dataType: "json",
	        			                url: SETTING_URL+ "/monthclosing/select_bookcost_statement21",
	        			                async: false,
	        			                data: JSON.stringify(from),
	        			                success: function (result) {
	        			                	logNow(result);
	        			                	var object_num = Object.keys(result);
	        			                	var data2 = result[object_num];
	        			                	if (data2["sbinse"] && (data2["sbjjgb"] == 0))
	        			                		chk_jg = 1;
	        			                	else
	        			                		chk_jg = 0;

	        			                	if ((bookcode >= '123110') && (bookcode <= '123389'))
	        			                	{
	        			                		total_panga = SBUPRC * 93 / 100;
	        			                	}
	        			                	else
	        			                	{	
	        			                		
	        			                		from = {
	        			                				sthaly : data2["sbdung"]
	        			                		}
	        			                		$.ajax({
	        	        			                type: "POST",
	        	        			                contentType: "application/json; charset=utf-8;",
	        	        			                dataType: "json",
	        	        			                url: SETTING_URL+ "/monthclosing/select_bookcost_statement22",
	        	        			                async: false,
	        	        			                data: JSON.stringify(from),
	        	        			                success: function (result) {
	        	        			                	logNow(result);
	        	        			                	data = result[Object.keys(result)];
	        	        			                	 total_panga = SBUPRC * data["sthaly"] / 100;
	        	        			                }
	        			                		});
	        			                }
	        			                }
		                			});
		                			from ={
		                					total_cost : total_cost,
		                					total_danga : total_danga,
		                					uid : uid
		                			}
		                			$.ajax({
	        			                type: "POST",
	        			                contentType: "application/json; charset=utf-8;",
	        			                dataType: "json",
	        			                url: SETTING_URL+ "/monthclosing/select_bookcost_statement23",
	        			                async: false,
	        			                data: JSON.stringify(from),
	        			                success: function (result) {
	        			                	logNow(result);
	        			                	if (!result)
	    		                			{
	    		                				popup_msg("원가 업데이트 오류");
	    		                				exit;
	        			                	}
	        			                }
		                			});
		                			htmlString += 
		                				'<tr>'+
			                				'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_cost) +'</span></td>' + '<td width="260" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+
			                				'</span></td>'+
			                				'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_danga) +'</span></td>'+
			                				'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_panga) +'</span></td>'+
			                				'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(SBUPRC) +'</span></td>'+
		                				'</tr>'+
		                				'</table>'+
		                				'</td>'+
		                				'</tr>'+
		                				'<tr>'+
		                					'<td width="580" align="right" valign="middle" colspan="2" height="30">'+
		                						'<p><span style="font-size:9pt;"></span></p>'+
	                						'</td>'+
		                				'</tr>'+
		                				'</table></td>'+
		                				'</tr>';
			                }
			        });
		        	$("#mcBookCostStatementDetailData").html(htmlString);
		        	htmlString = "";
		        	
		        	page_code = "도서별원가계산서";
		        	
			    	htmlString +=
			    		'<br>'+
			    		'<tr>'+
			    			'<td >'+
			    				'<table border="0" cellpadding="20" cellspacing="1" width="580" bgcolor="#FFFFFF">'+
			    					'<tr>'+
			    						'<td align="center" width="620" height="20">'+
			    							'<input type="button" value="목록으로" onClick="javascript:goToPage(2);">&nbsp;&nbsp;'+ 
			    							'<input type="button" id="btnBookCostStatementPrint" value="인 쇄">&nbsp;&nbsp;'+
			    							'<input type="button" value="거래처변경" onClick="javascript:ChComm('+ uid + ');">&nbsp;&nbsp;'+
			    							'<input type="button" value="신코드 변경" onClick="javascript:ChPrice('+ uid + ');">'+
					    				'</td></tr>'+
			    				'<form name="frmChk" method="post" action="inse_pr5.php">'+
			    					'<input type="hidden" name="uid" value="<'+ uid + '>">';
			    				if (chk_jg)  htmlString +=
			    					'<tr><td align="center" width="620" height="20"><span style="font-size:9pt;">'+
			    						'지불예정일 : <input type="text" size="5" name="pdate" maxlength="4">&nbsp;&nbsp;<input type="button" value="지출결의서 인쇄" onClick="javascript:Pr_1();">'+
			    						'</span></td></tr>';
			    				
			    				htmlString += '</form>'+
			    				'</td>'+
			    				'</tr>'+
			    				'</table>'+
			    				'</td>'+
					    		'</tr>';
			    	$("#mcBookCostStatementDetailData2").html(htmlString);
		    }
		});
	
		//$("#mcBookCostStatementDetailData").html(htmlString);
}

function SelBookCostStatementSobuModify(cnt) {
	
	var uid = $("input[name=uid1]").val()
	var ty = $("input[name=ty1]").val()
	var tm = $("input[name=tm1]").val()
	var td = $("input[name=td1]").val()
	var page = $("input[name=page1]").val()
	var daeid = $("input[name=daeid1]").val()
	var sobusum = $("input[name=sobusum1]").val()
	var daeid = $("input[name=daeid1]").val()
	var daesum = $("input[name=daesum1]").val()
	var a = new Array();
	logNow("넘어왔나?");
	logNow(cnt);
	logNow("000");
	for(var i=0; i < cnt; i++){
		a[i] = document.getElementsByName("sobu")[i].textContent;
		logNow(document.getElementsByName("sobu")[i].textContent);
	}
	logNow("a : " + a);
	logNow("000");
	logNow(uid);
	logNow(ty);
	logNow(tm);
	logNow(td);
	logNow(page);
	logNow(daeid);
	logNow(sobusum);
	logNow(daesum);
	logNow("넘어왔나?");
	
	$('#jejak_detail_view').html(jmenu7("0_소부대지수정"));

	
	
	$("#BookCostStatementSobuModify").html(htmlString);
	/*for (var i = 0 ; i < sizeof(daeji5) ; i++)
	{
		if (daeji5[i])
		{
			new_sum = daeji5[$i];
			//$new_sum += $sobusum[$i];
			new_sum += (pannum5[i] * 7000);
			new_sobu = (pannum5[i] * 7000);
			new_sum *= 1.1;
			new_id = daeid[i];
			
			$query = "update TMPLIST5 set pannum5=$pannum5[$i], filmnum5=0, filmcost5=0, daeji5=$daeji5[$i], sobu5=$new_sobu, sum5=$new_sum where uid=$new_id";
			$result = mysql_query($query, $dbconn);
			if (!$result)
			{
				popup_msg("대지비 계산 오류");
				exit;
			}
		}
		else
		{
			$query = "select * from TMPLIST5 where uid=$daeid[$i]";
			$f_res = mysql_query($query, $dbconn);
			if (!$f_res)
			{
				popup_msg("film 단가 오류");
				exit;
			}
			$f_row = mysql_fetch_array($f_res);
			$fdanga = $f_row[filmdan5];
			if (!$filmnum5[$i])
				$filmnum5[$i] = 0;
			$new_sobu = ($pannum5[$i] * 7000);
			$new_film = ($filmnum5[$i] * $fdanga);
			$new_sum = ($new_sobu + $new_film) * 1.1;
			
			$query = "update TMPLIST5 set pannum5=$pannum5[$i], filmnum5=$filmnum5[$i], filmcost5=$new_film, sobu5=$new_sobu, sum5=$new_sum, daeji5=0 where uid=$daeid[$i]";
			$result = mysql_query($query, $dbconn);
			if (!$result)
			{
				popup_msg("필름, 소부비 계산 오류");
				exit;
			}
		}
	}

	echo("<meta http-equiv='Refresh' content='0; URL=ex_view.php?uid=$uid&ty=$ty&tm=$tm&td=$td&page=$page'>");*/
}

// 잡물 원가계산서
function SelJMCostStatement(lm_s, lm_t) {
	var date1 = new Date($("select[name=ty]").val() + "/"
			+ $("select[name=tm]").val() + "/" + $("select[name=td]").val())
			.getTime() / 1000;
	day = parseInt($("select[name=td]").val()) + 1;
	day = day >= 10 ? day : '0' + day;
	var date2 = new Date($("select[name=ty]").val() + "/"
			+ $("select[name=tm]").val() + "/" + day).getTime() / 1000;

	var from = {
		date1 : date1,
		date2 : date2,
		lm_s : lm_s,
		lm_t : lm_t
	}
	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_jmcost_statement2",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);

					var object_num = Object.keys(result);
					htmlString = "";
					for ( var i in object_num) {
						var data = result[object_num[i]];

						var yjtag;
						if (!yjtag) {
							var from = {
								uid : data["uid"]
							}
							$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										url : SETTING_URL + "/monthclosing/select_jmcost_statement3",
										async : false,
										data : JSON.stringify(from),
										success : function(result) {
											if (result[0]["yjtag"])
												yjtag = 1;
											else
												yjtag = 0;
										}
									});
						}

						var full_date = MsToFulldate(data["jbdate"]);
						full_date = full_date.substring(0, 4) + "-"
								+ full_date.substring(4, 6) + "-"
								+ full_date.substring(6, 8);

						htmlString += 
								'<tr>'+
								'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["uid"]+ '</span></td>'+
								'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date+ '</span></td>'+
								'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
								'<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;"><a href="javascript:SelJMCostStatementDetail('+ data["uid"] + ',' + full_date.substring(0, 4) + ',' + full_date.substring(5, 7) + ',' + full_date.substring(8, 10)+');" class="n">'+ data["jbname"] +'</a></span></td>'+
								'<td width="80" height="30" align="right" style="padding-right:15pt" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["jbamnt"]) +'</span></td>'+
								'<td width="137" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
						if (yjtag)
							htmlString += '<input type="button" value="용지대 계산" onClick="javascript:CalcYJ();"></span>';
						htmlString += '</td>' + '</tr>';

						htmlString += '</table>';
					}
					$("#mcJMCostStatementData").html(htmlString);
				}
			});
	
	document.getElementById("btnJMCostStatementPrint").onclick = function() {// 잡물 원가계산서 모두 인쇄
		// //lwhee
		var t_URL = "/popup?print";
		if (popUp && !popUp.closed) {
			popUp.close();
		}
		popUp = window.open(t_URL,"PopUpPrintjejakplan",'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');// DATEW

			var t_jan;
			
			function CheckJANH(jhcode)
			{
				switch (jhcode)
				{
					case 1:
						t_jan = "무선";
						break;
					case 2:
						t_jan = "반양장";
						break;
					case 3:
						t_jan = "절공";
						break;
					case 4:
						t_jan = "양장";
						break;
					case 5:
						t_jan = "중철";
						break;
					case 6:
						t_jan = "중미싱";
						break;
					case 7:
						t_jan = "스프링";
						break;
				    case 8:
						t_jan = "PUR무선";
						break;
				}
				return t_jan;
			}
			

			popUp.document.write(jmenu7("1_인쇄팝업"));
			//도서별 원가계산서 인쇄 
			
			htmlString = "";
			
			from = {
					date1 : date1,
					date2 : date2
			}
			//전역 변수
			var SBUPRC = 0;
			var t_sum8 = 0;
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_jmcost_statement4",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					var object_num = Object.keys(result);
					total_record = object_num.length;
					for(i in object_num){

						var row10 = result[object_num[i]];
						logNow("책이름");
						logNow(row10);
						logNow("책이름");
						var rec_num = 0;
						uid = row10["uid"];
						htmlString +=
							'<table border="0" cellpadding="20" cellspacing="1" width="620" bgcolor="white">'+
								'<tr>'+
									'<td bgcolor="white" width="100%" height="50"></td>'+
								'</tr>'+
							'</table>'+
							'<table border="0" cellpadding="20" cellspacing="1" width="620" bgcolor="#333333">'+
						    	'<tr>'+
						        	'<td width="620" bgcolor="white" align="center" valign="top">'+
					                	'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
					                		'<tr>'+
					                			'<td width="580" align="center" valign="top" colspan="2">'+

					                				'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
					                                	'<tr>'+
					                                    	'<td width="260" align="left" valign="middle">'+

					                                    		'<p align="right"><b><span style="font-size:18pt;">원 가 계 산 서</span></b></p>'+
					                                    	'</td>                                <td width="44"></td>'+
					                                    	'<td width="276" align="right" valign="middle">'+

					                                        	'<table border="0" cellpadding="2" cellspacing="1" width="270" bgcolor="black" height="50">'+
					                                            	'<tr>'+
					                                                	'<td width="50" bgcolor="white" height="50" align="center" valign="middle">&nbsp;</td>'+
					                                                	'<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
						                                                '<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
						                                                '<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
						                                                '<td width="50" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
						                                                '<td width="30" height="50" align="center" valign="middle" bgcolor="white">'+
						                                                    '<p style="line-height:18px;"><span style="font-size:9pt;">결<br>제</span></p>'+
						                                                '</td>'+
						                                            '</tr>'+
						                                        '</table>'+
						                                     '</td>'+
						                                '</tr>'+
						                           '</table>'+
						                         '</td>';
					t_panh = row10["jbpanh"];
					t_janh2 = row10["jbjanh"];
					bookcode = row10["jbcode"];
					mknum = row10["jbamnt"];

					m1 = row10["m1"];
					m2 = row10["m2"];
					m3 = row10["m3"];
					m5 = row10["m5"]; // 스티커
					m8 = row10["m8"]; // 비닐
					m9 = row10["m9"]; // 기타
					switch (row10["jbpanh"])
					{
						case "A3" :
							ppp = 8;
							break;
						case "A4" :
							ppp = 16;
							break;
						case "A5" :
							ppp = 32;
							break;
						case "A6" :
							ppp = 64;
							break;
						case "B4" :
							//ppp = 16;
							ppp = 8;
							break;
						case "B5" :
							//ppp = 32;
							ppp = 16;
							break;
						case "B6" :
							//ppp = 64;
							ppp = 32;
							break;		
						default :
							ppp = 16;
							break;
					}
					
					var t_janh = CheckJANH(row10["jbjanh"]);
					htmlString +=
						'</tr>'+
	                    '<tr>'+
	                    '<td width="290" align="left" valign="middle" height="30"><span style="font-size:9pt;"><font color="black"> 제작번호 : '+ row10["uid"] +'</font></span></td>'+
	                    '<td width="290" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:5pt;"><font color="black">'+ $("select[name=ty]").val() + ' 년 ' + $("select[name=tm]").val() + ' 월' + $("select[name=td]").val() +' 일' +'</font></span></td>'+
	                    '</tr>'+
	                    '<tr>'+
	                        '<td width="580" align="center" valign="top" colspan="2">'+
	                            '<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
	                                '<tr>'+
	                                    '<td width="220" align="center" valign="middle" bgcolor="#F4F4F4" height="30">'+
	                                        '<p><span style="font-size:9pt; letter-spacing:33pt;">도서명</span></p>'+
	                                    '</td>'+
	                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:20pt;">판형</span></td>'+
	                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:20pt;">장형</span></td>'+
	                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:20pt;">면수</span></td>'+
	                                    '<td width="120" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:7pt;">제작부수</span></td>'+
	                                '</tr>'+
	                                '<tr>'+
	                                    '<td width="220" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ row10["jbname"] +'</span></td>'+
	                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ row10["jbpanh"] +'</span></td>'+
	                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ t_janh +'</span></td>'+
	                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ row10["jbpage"] +'</span></td>'+
	                                    '<td width="120" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ numberWithCommas(row10["jbamnt"]) +'</span></td>'+
	                                '</tr>'+
	                            '</table>'+

	                        '</td>'+
	                    '</tr>'+
	                    '<tr>'+
	                        '<td width="580" colspan="2" height="10"></td>'+
	                    '</tr>'+
	                    '<tr>'+
	                        '<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>1. 필름 대지 소부비</b></span></td>'+
	                    '</tr>'+
	                    '<tr>'+
	                        '<td width="580" align="center" valign="top" colspan="2">'+
	                        	'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
								    '<tr>'+
								        '<td width="54" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">구분</span></td>'+
								        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">판종</span></td>'+
								        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">판수</span></td>'+
								        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름량</span></td>'+
								        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필 름<br>단 가</span></td>'+
								        '<td width="65" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필 름<br>금 액</span></td>'+
								        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:1pt;">대지비</span></td>'+
								        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">소 부<br>단 가</span></td>'+
								        '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:3pt;">소부비</span></td>'+
								        '<td width="75" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1)  계</span></td>'+
								    '</tr>';
                    t_myun = row10["jbpage"];
                	
                	sum_1 = 0; // 필름
                	sum_2 = 0; // 용지
                	sum_3 = 0; // 인쇄
                	sum_4 = 0; // 제본
                	sum_5 = 0; // 코팅
                	sum_6 = 0; // 비닐
                	sum_7 = 0; // 원고
                	sum_8 = 0; // 저작
                	sum_9 = 0; // 출력
                	sum_10 = 0; // 사보
                	sum_11 = 0; // 증지
                	sum_12 = 0; // 케이스
                	sum_13 = 0; // 기타
                	
            		from = {
            				uid : uid
            		}
            		$.ajax({
            			type : "POST",
            			contentType : "application/json; charset=utf-8;",
            			dataType : "json",
            			url : SETTING_URL + "/monthclosing/select_jmcost_statement5",
            			async : false,
            			data : JSON.stringify(from),
            			success : function(result) {
            				logNow(result);
            				var object_num = Object.keys(result);
            				for(j in object_num)
            				{
            					row = result[object_num[j]];
            					if (!row["sums"])
            						{}
            					else
            					{
            						sum_1 += row["sums"];
            						htmlString +=
            							'<tr>'+
								        	'<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ row["gubn5"] +'</span></td>'+
								        	'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ row["panst5"] +'</span></td>'+
								        	'<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
								        		'<INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:45px;" name=\'pannum5[]\' value="'; if (row["pans"]) htmlString += row["pans"]; htmlString += '">'+
								        		'</span></td>'+
								        	'<td width="50" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
								        		'<INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:45px;" name=\'filmnum5[]\' value="'; if (row["filmnum5"]) htmlString += row["filmnum5"]; htmlString += '">'+
								        		'</span></td>'+
								        		'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (row["filmnum5"]) htmlString += numberWithCommas(row["filmdan5"]); else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								        		'<td width="65" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (row["filmnum5"]) htmlString += numberWithCommas(row["filmcost5"]); else htmlString += '&nbsp'; htmlString += '</span></td>'+
								        		'<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
								        			'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:40px;" name=\'daeji5[]\' value="'; if (row["daeji5"]) htmlString += row["daeji5"]; htmlString += '">'+
								        			'</span></td>'+
								        		'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(row["sobudan5"]) +'</span></td>'+
								        		'<td width="60" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">' + numberWithCommas(row["sobus"]) +'</span></td>'+
								        		'<td width="75" height="25" align="right" valign="middle"style="padding-right:10;" width="66" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;"><span style="font-size:9pt;">'+ numberWithCommas(row["sums"]) +'</span></td>'+
								        '</tr>';
            					}
            				}
            				logNow("m1");
            				logNow(m1);
            				from = {
            						m1 : m1 
            				}
            				$.ajax({
            					type : "POST",
            					contentType : "application/json; charset=utf-8;",
            					dataType : "json",
            					url : SETTING_URL + "/monthclosing/select_jmcost_statement6",
            					async : false,
            					data : JSON.stringify(from),
            					success : function(result) {
            						logNow(result);
            						var object_num = Object.keys(result);
            						row9 = result[object_num];
            						var m1_name = row9["wcname"];
            						htmlString += 
            							'<tr>'+
    							        	'<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
    							        	'<td width="325" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="6" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
    							        	'<td width="115" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="2" align="center" valign="middle"><span style="font-size:9pt;">('+ m1_name +')</span></td>'+
    							        	'<td style="padding-right:10;" width="75" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_1) +'</span></td>'+
    							        '</tr>'+
    							    '</table>'+
    							    '</td>'+
    							    '</tr>'+
    							    '<tr>'+
    							    	'<td width="580" colspan="2" height="10"></td>'+
    						    	'</tr>'+
    						    	'<tr>'+
    						    		'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>2. 용지대, 인쇄비</b></span></td>'+
    						    	'</tr>'+
    						    	'<tr>'+
    						    	'<td width="580" align="center" valign="top" colspan="2">'+
    						    		'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
    						    			'<tr>'+
    						    				'<td width="43" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">구분</span></td>'+
    						    				'<td width="110" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">지질</span></td>'+
    						    				'<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">정미</span></td>'+
    						    				'<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">여분</span></td>'+
    						    				'<td width="70" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:12pt;">금액</span></td>'+
    						    				'<td width="34" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">색도</span></td>'+
    						    				'<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인 쇄<br>단 가</span></td>'+
    						    				'<td width="48" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">R수</span></td>'+
    						    				'<td width="90" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 인쇄비 계</span></td>'+
    						    			'</tr>';
            						
            						from = {
            								uid : uid
            						};
            						$.ajax({
            							type : "POST",
            							contentType : "application/json; charset=utf-8;",
            							dataType : "json",
            							url : SETTING_URL + "/monthclosing/select_jmcost_statement7",
            							async : false,
            							data : JSON.stringify(from),
            							success : function(result) {
            								logNow(result);
            								var object_num = Object.keys(result);
            								for(j in object_num)
            								{
            									row = result[object_num[j]];
            									var t_jm1 = Math.floor(row["jms"] / 500);
            									var t_jm2 = row["jms"] % 500;
            									var t_yb1 = Math.floor(row["ybs"] / 500);
            									var t_yb2 = row["ybs"] % 500;
            									var t_colo = row["colo"];
            									
            									if (((row["gubn"] == '표지') || (row["gubn"] == '화보') || (row["gubn"] == '별지') || (row["gubn"] == '케이스')))
            										t_colo += 1;

            									sum_3 += row["pcosts"];
            									sum_2 += row["ycosts"];
            									logNow(uid);
            									logNow("ycosts : " + row["ycosts"]);
            									logNow("sum2 : " + sum_2);
            									
            									htmlString += 
            										'<tr>'+
            								        	'<td style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jms"]) || (row["ybs"])) htmlString += row["gubn"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
	            								        '<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jms"]) || (row["ybs"])) htmlString += row["yjname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
	            								        '<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((row["jms"]) || (row["ybs"])) htmlString += t_jm1 + ' R ' + t_jm2; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
	            								        '<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((row["jms"]) || (row["ybs"])) htmlString += t_yb1 + ' R ' + t_yb2; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
	            								        '<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+
	            								        	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'yongji[]\' value="'; if (row["ycosts"]) htmlString += numberWithCommas(row["ycosts"]); else htmlString += '0'; htmlString += '">'+
	            								        '</span></td>'+
	            										
	            										'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ t_colo + '˚' +'</span></td>'+
	            								        '<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(row["pdanga"]) +'</span></td>'+
	            								        '<td style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ row["rnums"] +'</span></td>'+
	            								        '<td style="padding-right:10;" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+
	            								        	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'print[]\' value="'; if (t_colo) htmlString += numberWithCommas(row["pcosts"]); else htmlString += '&nbsp;'; htmlString += '">'+
	            								        '</span></td>'+
            								        '</tr>';
            								}
            								
            								htmlString += 
            									'<tr>'+
            							        	'<td style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
            							        	'<td style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
            							        	'<td style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_2) +'</span></td>'+
            							        	'<td style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="right" valign="middle"><span style="font-size:9pt;">('+ m1_name +')</span></td>'+
            							        	'<td style="padding-right:10;" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_3) +'</span></td>'+
            							        '</tr>'+
            							        '</table>'+
            							        '</td>'+
            							        '</tr>'+
            							        '<tr>'+
            							        	'<td width="580" colspan="2" height="10"></td>'+
            							        	'</tr>'+
        							        	'<tr>'+
            							        	'<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>3. 제본비</b></span></td>'+
        							        	'</tr>'+
        							        	'<tr>'+
        							        		'<td width="580" align="center" valign="top" colspan="2">'+

        							        			'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
        							        				'<tr>'+
        							        					'<td width="77" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:10pt;">장형</span></td>'+
				            							        '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:10pt;">면수</span></td>'+
				            							        '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:3pt;">면당단가</span></td>'+
				            							        '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:3pt;">권당단가</span></td>'+
				            							        '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">부수</span></td>'+
				            							        '<td width="70" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:5pt;">기타</span></td>'+
				            							        '<td width="106" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 제본금액</span></td>'+
				            							    '</tr>';
            								if (m3 != 'N')
            								{
            									//selJMCostStatement8
            									from = {
            											m3 : m3 
            									};
            									$.ajax({
            										type : "POST",
            										contentType : "application/json; charset=utf-8;",
            										dataType : "json",
            										url : SETTING_URL + "/monthclosing/select_jmcost_statement8",
            										async : false,
            										data : JSON.stringify(from),
            										success : function(result) {
            											logNow(result);
            											var object_num = Object.keys(result);
            											row2 = result[object_num];
            											m3_name = row2["wcname"];
                    									//selJMCostStatement9
            											from = {
            												uid : uid	
            											};
            											$.ajax({
            												type : "POST",
            												contentType : "application/json; charset=utf-8;",
            												dataType : "json",
            												url : SETTING_URL + "/monthclosing/select_jmcost_statement9",
            												async : false,
            												data : JSON.stringify(from),
            												success : function(result) {
            													logNow(result);
            													var object_num = Object.keys(result);
            													for(j in object_num){
            														row = result[object_num[j]];
            														jebuid = row["uid"];
            														sum_4 += row["totcost7"];
            														htmlString+=
            															'<tr>'+
            													        	'<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-right-width:1px; border-bottom-color:black; border-left-color:black; border-right-color:black; border-bottom-style:solid; border-left-style:solid; border-right-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ t_janh +'</span></td>'+
            													        	'<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'; if (row["cgubn7"] > 4) htmlString += '&nbsp;'; else htmlString += row["cpage7"]; htmlString += '</span></td>'+
	            													        '<td width="77" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'; if (row["cgubn7"] > 4) htmlString += '&nbsp;'; else htmlString += row["cprice17"]; htmlString += '</span></td>'+
	            													        '<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'+ row["pdanga7"] +'</span></td>'+
	            													        '<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'+numberWithCommas(row["cnum7"]) +
	            													        '</span></td>'+
	            													        '<td width="70" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'; if (row["cprice27"]) htmlString += row["cprice27"]; else htmlString += '&nbsp;';htmlString +='</span></td>'+
	            													        '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt; padding-left:0pt;">'+numberWithCommas(row["totcost7"])+'</span></td>'+
            													        '</tr>';
            													}
            													htmlString +=
            													    '<tr>'+
            												        	'<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
	            												        '<td width="291" colspan="4" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
	            												        '<td width="70" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">('+ m3_name +')</span></td>'+
	            												        '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_4) +'</span></td>'+
            												        '</tr>';
            												}
            											});
            										}
            									});
            								}
            								else
            								{
            									
            								}
            								htmlString += 
            		                            '</table>'+
            			                        '</td>'+
            			                        '</tr>'+
            			                        '<tr>'+
            			                        	'<td width="580" colspan="2" height="10"></td>'+
        			                        	'</tr>'+
        			                        	'<tr>'+
            			                        	'<td width="580" align="center" valign="top" colspan="2">'+
            			                            	'<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">';
            								if (m2 != 'N')
            								{
            									//selJMCostStatement10
            									from = {
            											uid : uid
            									};
            									$.ajax({
            										type : "POST",
            										contentType : "application/json; charset=utf-8;",
            										dataType : "json",
            										url : SETTING_URL + "/monthclosing/select_jmcost_statement10",
            										async : false,
            										data : JSON.stringify(from),
            										success : function(result) {
            											logNow(result);
            											
            											var object_num = Object.keys(result);
            											tt_record = Object.keys(result).length;
            											
            											for (j in object_num)
                    									{
            												row = result[object_num];
            												logNow("totcost8");
            												logNow(row);
                    										var t_sum5 = Math.floor(row["totcost8"] * 1.1);
                    										sum_5 += t_sum5;
                    										htmlString +=
                    											'<tr>'+
	                    		                                    '<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;">'; if (j == 0) htmlString += '<b> 4. 코팅비 (비닐코팅)</b>'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
	                    											'<td width="359" colspan="2" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+
		                    		                                    '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:40px;" name=\'coatin1\' value="'+ row["cnum8"] +'">R&nbsp;X&nbsp;'+
		                    		                                    '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:45px;" name=\'coatin2\' value="'+ numberWithCommas(row["cprice8"]) +'">원&nbsp;X&nbsp;1.1'+
		                    		                                    '&nbsp;&nbsp;(&nbsp;'+ row["wcname"] +'&nbsp;)</span></td>'+
	                    		                                    '<td width="81" height="30" align="right" style="padding-right:10;" valign="middle"><span style="font-size:9pt;">'+
		                    		                                    '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'coatin3\' value="'+ numberWithCommas(t_sum5) +'">'+
		                    		                                    '</span></td>'+
		                    		                                    '<input type="hidden" name="cotuid" value="'+ row["uid"] +'">'+
                    		                                    '</tr>';
                    									}
            											
            										}
            									});
            								}
            								else
            								{
            									htmlString +=
            										'<tr>'+
	            	                                    '<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>4. 코팅비 (비닐코팅)</b></span></td>'+
	            	                                    '<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>'+
	            	                                    '<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
	            	                                    '<td width="81" height="30" align="right" style="padding-right:10;" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
            	                                    '</tr>';
            								}
            								htmlString +=
            									'</table>'+
            			                        '</td>'+
            			                        '</tr>'+
            			                        '<tr>'+
            			                        	'<td width="580" align="center" valign="top" colspan="2">'+
	            			                            '<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">'+
	            			                                '<tr>'+
	            			                                    '<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 5. 비닐카바비</b></span></td>'+
	            			                                    '<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>';
            								if (m8 != 'N')
            								{
            									from = {
            											m8 : m8
            									};
            									$.ajax({
            										type : "POST",
            										contentType : "application/json; charset=utf-8;",
            										dataType : "json",
            										url : SETTING_URL + "/monthclosing/select_jmcost_statement11",
            										async : false,
            										data : JSON.stringify(from),
            										success : function(result) {
            											logNow(result);
            											var object_num = Object.keys(result);
            											if (!result)
            											{
            												popup_msg("비닐 거래처 읽기 오류");
            												exit;
            											}
            											row = result[object_num];
            											var m8_name = row["wcname"];
            										}
            									});
            									from = {
            											m8 : m8,
            											uid : uid            											
            									}
            									$.ajax({
            										type : "POST",
            										contentType : "application/json; charset=utf-8;",
            										dataType : "json",
            										url : SETTING_URL + "/monthclosing/select_jmcost_statement12",
            										async : false,
            										data : JSON.stringify(from),
            										success : function(result) {
            											logNow(result);
            											var object_num = Object.keys(result);
            											if (!result)
            											{
            												popup_msg("비닐원가 읽기 오류");
            												exit;
            											}
            											row = result[object_num];
            											t_sum8 = row["cprice9"];
            										}
            									});
            									htmlString +=
            										'<td width="279" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-rright:20pt;">(&nbsp;'+ m8_name +'&nbsp;)</span></td>'+
            					                                    '<td width="81" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+
            					                                    numberWithCommas(t_sum8) +
            					                                    '</span></td>';
            								}
            								else
            								{
            									htmlString +=
            										'<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>'+
            										'<td width="81" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>';
            								}
            								htmlString +=
            									'</tr>'+
	            	                            '</table>'+
		            	                        '</td>'+
		            	                        '</tr>';
            								from = {
            										uid : uid
            								}
            								logNow("유아쏘에브리띵 : " + uid);
            								
            								$.ajax({
            									type : "POST",
            									contentType : "application/json; charset=utf-8;",
            									dataType : "json",
            									url : SETTING_URL + "/monthclosing/select_jmcost_statement13",
            									async : false,
            									data : JSON.stringify(from),
            									success : function(result) {
            										logNow(result);
            										var object_num = Object.keys(result);
            										var row = result[object_num];
            										var t_jnji = row["w5"];
            										var t_stic = row["w7"];
            										var t_cd = row["w8"];
            										var t_etc = row["w9"];
            										
            										htmlString +=
            											'<tr>'+
            					                        '<td width="580" align="center" valign="top" colspan="2">'+
            					                            '<table border="0" cellpadding="0" cellspacing="0" width="580">'+
            					                                '<tr>'+
            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b> 6. 원고료</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w1"]) htmlString += numberWithCommas(row["w1"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 7. 저작료</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w2"]) htmlString += numberWithCommas(row["w2"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                '</tr>'+
            					                                '<tr>'+
            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b> 8. 출력비</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w3"]) htmlString += numberWithCommas(row["w3"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 9. 사보료</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w4"]) htmlString += numberWithCommas(row["w4"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                '</tr>'+
            					                                '<tr>'+
            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>10. 증지대 </b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w5"]) htmlString += numberWithCommas(row["w5"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>11. 케이스</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w6"]) htmlString += numberWithCommas(row["w6"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                '</tr>'+
            					                                '<tr>'+
            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>12. 스티커</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w7"]) htmlString += numberWithCommas(row["w7"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>13. CD</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w8"]) htmlString += numberWithCommas(row["w8"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                '</tr>'+
            					                                '<tr>'+
            					                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>14. 기타</b></span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
            					                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'; if (row["w9"]) htmlString += numberWithCommas(row["w9"]); htmlString += '</span></p>'+
            					                                    '</td>'+
            					                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
            					                                    '<td width="10" height="30" align="center" valign="middle"></td>'+
            					                                    '<td width="90" height="30" align="right" style="padding-right:10pt">&nbsp;'+
            					                                    '</td>'+
            					                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
            					                                '</tr>'+
            					                            '</table>'+
            					                        '</td>'+
            					                '</tr>'+
            					                    '<tr>'+
            					                        '<td width="580" colspan="2" height="10"></td>'+
            					                    '</tr>'+
            					                '<tr>'+
            					                        '<td width="580" align="center" valign="top" colspan="2">'+
            					                            '<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
            					                                '<tr>'+
            					                                    '<td width="190" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt; letter-spacing:30pt;">총계</span></p></td>'+
            					                                    '<td width="130" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:20pt;">단가</span></td>'+
            					                                    '<td width="130" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:10pt;">판매가</span></td>'+
            					                                    '<td width="130" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt; letter-spacing:20pt;">정가</span></td>	                                    '+
            					                                '</tr>';
            											var total_cost = sum_1 + sum_2 + sum_3 + sum_4 + sum_5 + sum_6 + t_sum8 + t_jnji + t_stic + t_cd + row["w3"] + t_etc;
            											if (mknum)
            												var total_danga = Math.round((total_cost/mknum), 2);
            											else
            												var total_danga = 0;
            											var total_panga = SBUPRC * 0.45;
            											
            											htmlString +=
            												'<tr>'+
	            			                                    '<td width="190" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_cost) +'</span></td>'+
	            			                                    '<td width="130" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_danga) +'</span></td>'+
	            			                                    '<td width="130" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_panga) +'</span></td>'+
	            			                                    '<td width="130" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(SBUPRC) +'</span></td>'+
            			                                    '</tr>'+
            			                                    '</table>'+
            			                                    '</td>'+
            			                                    '</tr>'+
            			                                    '<tr>'+
            			                                    	'<td width="580" align="right" valign="middle" colspan="2" height="1">'+
            			                                    		'<p><span style="font-size:9pt;"></span></p>'+
            			                                    	'</td>'+
        			                                    	'</tr>'+
        			                                    	'</table></td>'+
        			                                    	'</tr>'+
        			                                    	'</table>'+
        			                                    	'<div align="left">'+
        			                                    	'<span style="font-size:9pt; padding-left:45pt;"><b>'+ com_name +'</b></span>'+
        			                                    	'</div>';
            											if (rec_num < total_record)
            											{
            												htmlString += '<p style="page-break-before:always">';
            											}
            									}
            								});
            							}
            						});
            					}
            				});
            			}
            		});
                	
					}// 첫 쿼리	
					}
			});
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}

// 잡물 상세 원가계산서 //lwhee
function SelJMCostStatementDetail(uid, ty, tm, td, page) {
	$('#jejak_detail_view').html(jmenu7("1_상세계산"));
	htmlString = "";
	var t_sum8 = 0;
	function CheckJANH(jhcode)
	{
		switch (jhcode)
		{
			case 1:
				t_jan = "무선";
				break;
			case 2:
				t_jan = "반양장";
				break;
			case 3:
				t_jan = "절공";
				break;
			case 4:
				t_jan = "양장";
				break;
			case 5:
				t_jan = "중철";
				break;
			case 6:
				t_jan = "중미싱";
				break;
			case 7:
				t_jan = "스프링";
				break;
		    case 8:
				t_jan = "PUR무선";
				break;
		}
		return t_jan;
	}
	
	htmlString += 
		'<tr>'+
        	'<td width="620" bgcolor="white" align="center" valign="top">'+
        		'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
        			'<tr>'+
        				'<td width="580" align="center" valign="top" colspan="2">'+
        					'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
        						'<tr>'+
        							'<td width="260" align="left" valign="middle">'+
        								'<p align="right"><b><span style="font-size:18pt;">원 가 계 산&nbsp;서</span></b></p>'+
    								'</td>'+
        							'<td width="44"></td>'+
        							'<td width="276" align="right" valign="middle">'+
        								'<table border="0" cellpadding="2" cellspacing="1" width="270" bgcolor="black" height="50">'+
        									'<tr>'+
        										'<td width="60" bgcolor="white" height="50" align="center" valign="middle">&nbsp;</td>'+
										        '<td width="60" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
										        '<td width="60" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
										        '<td width="60" height="50" align="center" valign="middle" bgcolor="white">&nbsp;</td>'+
										        '<td width="30" height="50" align="center" valign="middle" bgcolor="white">'+
										        	'<p style="line-height:18px;"><span style="font-size:9pt;">결<br>제</span></p>'+
									        	'</td>'+
								        	'</tr>'+
							        	'</table>'+
						        	'</td>'+
					        	'</tr>'+
				        	'</table>'+
			        	'</td>';

	// selJMCostStatement14
	from = {
			uid : uid
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_jmcost_statement14",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			row = result[object_num];
			t_panh = row["jbpanh"];
			t_janh2 = row["jbjanh"];
			bookcode = row["jbdate"];
			mknum = row["jbamnt"];

			m1 = row["m1"];
			m2 = row["m2"];
			m3 = row["m3"];
			m5 = row["m5"]; // 스티커
			m6 = row["m6"]; // cd
			m8 = row["m8"]; // 비닐
			m9 = row["m9"]; // 기타

			switch (row["jbpanh"])
			{
				case "A3" :
					ppp = 8;
					break;
				case "A4" :
					ppp = 16;
					break;
				case "A5" :
					ppp = 32;
					break;
				case "A6" :
					ppp = 64;
					break;
				case "B4" :
					//ppp = 16;
					ppp = 8;
					break;
				case "B5" :
					//ppp = 32;
					ppp = 16;
					break;
				case "B6" :
					//ppp = 64;
					ppp = 32;
					break;		
				default :
					ppp = 16;
					break;
			}
			t_janh = CheckJANH(row["jbjanh"]);
			
			htmlString +=
				'<form name="cform" method="post" action="exj_view_m.php">'+
					'</tr>'+
					'<tr>'+
						'<td width="290" align="left" valign="middle" height="30"><span style="font-size:9pt;"><font color="black"> 제작번호 : '+ row["uid"] +'</font></span></td>'+
						'<td width="290" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:5pt;"><font color="black">' + ty + '.' + ("0" + tm).slice(-2) + '.' + ("0" + td).slice(-2) + '</font></span></td>'+
					'</tr>'+
					'<tr>'+
						'<td width="580" align="center" valign="top" colspan="2">'+
							'<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
								'<tr>'+
									'<td width="220" align="center" valign="middle" bgcolor="#F4F4F4" height="30">'+
										'<p><span style="font-size:9pt;">도서명</span></p>'+
									'</td>'+
									'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">판형</span></td>'+
									'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">장형</span></td>'+
									'<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">면수</span></td>'+
									'<td width="120" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">제작부수</span></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="220" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ row["jbname"] +'</span></td>'+
									'<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ row["jbpanh"] +'</span></td>'+
									'<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ t_janh +'</span></td>'+
									'<td width="80" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ row["jbpage"] +'</span></td>'+
									'<td width="120" align="center" valign="middle" bgcolor="white" height="25"><span style="font-size:9pt;">'+ numberWithCommas(row["jbamnt"])+' 부</span></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
                        '<td width="580" colspan="2" height="20"></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>1. 필름 대지 소부비</b></span></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td width="580" align="center" valign="top" colspan="2">'+
                        	'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
							    '<tr>'+
							        '<td width="54" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
							        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판종</span></td>'+
							        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판수</span></td>'+
							        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름량</span></td>'+
							        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름<br>단가</span></td>'+
							        '<td width="65" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">필름<br>금액</span></td>'+
							        '<td width="50" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">대지비</span></td>'+
							        '<td width="55" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">소부<br>단가</span></td>'+
							        '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">소부비</span></td>'+
							        '<td width="75" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 계</span></td>'+
							    '</tr>';
			
			t_myun = row["jbpage"];

			sum_1 = 0; // 필름
			sum_2 = 0; // 용지
			sum_3 = 0; // 인쇄
			sum_4 = 0; // 제본
			sum_5 = 0; // 코팅
			sum_6 = 0; // 비닐
			sum_7 = 0; // 원고
			sum_8 = 0; // 저작
			sum_9 = 0; // 출력
			sum_10 = 0; // 사보
			sum_11 = 0; // 증지
			sum_12 = 0; // 케이스
			sum_13 = 0; // 기타
			
			from = {
					uid : uid
			}
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_jmcost_statement15",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					var object_num = Object.keys(result);
					for(var j=0; j < Object.keys(result).length; j++)
					{
						row = result[object_num[j]];
						if (!row["sum5"])
							continue;
						sum_1 += row["sum5"];
						htmlString += 
							'<tr>'+
					        	'<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ row["gubn5"] +'</span></td>'+
					        	'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ row["panst5"] +'</span></td>'+
					        	'<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
					        		'<INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:45px;" name=\'pannum5[]\' value="'; if (row["pannum5"]) htmlString += row["pannum5"]; htmlString += '" onKeypress=" if(event.keyCode == 13){javascript:chPan(this.value, '+uid+', ' +ty+', '+tm+', '+td+', '+row["gubn5"]+');}">'+
					        		'</span></td>'+
				        		'<td width="50" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; text-align:center; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:45px;" name=\'filmnum5[]\' value="'; if (row["filmnum5"]) htmlString += row["filmnum5"]; htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chFil(this.value, '+uid+', ' +ty+', '+tm+', '+td+', '+row["gubn5"]+');}"></span></td>'+
		        				'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (row["filmnum5"]) htmlString += numberWithCommas(row["filmdan5"]); else htmlString += '&nbsp;';
		        		htmlString +=
		        					'</span></td>'+
		        				'<td width="65" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (row["filmnum5"]) htmlString += numberWithCommas(row["filmcost5"]); else htmlString += '&nbsp'; htmlString += '</span></td>'+
		        				'<td width="50" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
		        					'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:40px;" name=\'daeji5[]\' value="'; if (row["daeji5"]) htmlString += row["daeji5"]; htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chDae(this.value, '+uid+', ' +ty+', '+tm+', '+td+', '+row["gubn5"]+');}"></span></td>'+
        						'<td width="55" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(row["sobudan5"]) +'</span></td>'+
        						'<td width="60" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(row["sobu5"]) +'</span></td>'+
        						'<td width="75" height="25" align="right" valign="middle"style="padding-right:10;" width="66" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;"><span style="font-size:9pt;">'+ numberWithCommas(row["sum5"]) +'</span></td>'+
					        '</tr>'+
					        '<input type="hidden" name="daeid[]" value="'+ row["uid"] +'">'+
					        '<input type="hidden" name="sobusum[]" value="'+ row["sobu5"] +'">';
					}
				}
			});
			from = {
					m1 : m1
			}
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_jmcost_statement6",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					var object_num = Object.keys(result);
					row = result[object_num];
					m1_name = row["wcname"];
					htmlString +=
						'<tr>'+
							'<td width="54" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
							'<td width="325" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="6" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
							'<td width="115" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="2" align="center" valign="middle"><span style="font-size:9pt;">('+ m1_name +')</span></td>'+
							'<td style="padding-right:10;" width="75" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_1) +'</span></td>'+
						'</tr>'+
				        '</table>'+
				        '</td>'+
					    '</tr>'+
					    '<tr>'+
				            '<td width="580" colspan="2" height="20"></td>'+
					    '</tr>'+
			        	'<tr>'+
				            '<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>2. 용지대, 인쇄비</b></span></td>'+
					    '</tr>'+
					    '<tr>'+
				            '<td width="580" align="center" valign="top" colspan="2">'+
				            	'<table border="0" cellpadding="0" cellspacing="0" width="580">'+
								    '<tr>'+
								        '<td width="53" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
								        '<td width="63" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">지질</span></td>'+
								        '<td width="63" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정미</span></td>'+
								        '<td width="63" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">여분</span></td>'+
								        '<td width="84" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">금액</span></td>'+
								        '<td width="34" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">색도</span></td>'+
								        '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄<br>단가</span></td>'+
								        '<td width="53" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">R수</span></td>'+
								        '<td width="97" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 인쇄비 계</span></td>'+
								    '</tr>';
					from = {
							uid : uid
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_jmcost_statement16",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
							var object_num = Object.keys(result);
							if (!result)
							{
								error("QUERY_ERROR");
								exit;
							}
							for(var j=0; j < Object.keys(result).length; j++)
							{
								row = result[object_num[j]];
								logNow(row);
								var t_jm1 = Math.floor(row["jm"] / 500);
								var t_jm2 = row["jm"] % 500;
								var t_yb1 = Math.floor(row["yb"] / 500);
								var t_yb2 = row["yb"] % 500;
								
								var t_colo = row["colo"];
							
								if ((row["gubn"] == '표지') || (row["gubn"] == '화보') || (row["gubn"] == '별지') || (row["gubn"] == '케이스') || (row["gubn"] == '면지') || (row["gubn"] == '면지1') || (row["gubn"] == '면지2'))
								{
										t_colo += 1;
								}

								sum_3 += row["pcost"];
								sum_2 += row["ycost"];
								
								htmlString +=
									'<tr>'+
								        '<td width="53" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += row["gubn"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								        '<td width="63" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += row["yjname"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								        '<td width="63" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += t_jm1 +' R '+ t_jm2; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								        '<td width="63" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if ((row["jm"]) || (row["yb"])) htmlString += t_yb1+' R '+t_yb2; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								        '<td width="84" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+
								        	'<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'yongji[]\' value="'; if (row["ycost"]) htmlString += numberWithCommas(row["ycost"]); else htmlString += '0'; htmlString +='"></span></td>'+
										'<td width="34" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
									        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:30px;" name=\'colo[]\' value="'+ t_colo +'" onKeypress="if(event.keyCode == 13){javascript:chCol(this.value, '+uid+', ' +ty+', '+tm+', '+td+', '+row["gubn5"]+');}">'+
									        '</span></td>'+
										'<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+
									        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:50px;" name=\'pdan[]\' value="'+ numberWithCommas(row["pdanga"])+'" onKeypress="if(event.keyCode == 13){javascript:chPdan(this.value, '+uid+', ' +ty+', '+tm+', '+td+', '+row["gubn5"]+');}">'+
									        '</span></td>'+
								        '<td width="53" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid; padding-right:10;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'; if (t_colo) htmlString += row["rnum"]; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
								        '<td style="padding-right:10;" width="97" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+
									        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'print[]\' value="'; if (t_colo) htmlString += numberWithCommas(row["pcost"]); else htmlString += '&nbsp;'; htmlString += '">'+
									        '</span></td>'+
								        '<input type="hidden" name="uids[]" value="'+ row["uid"] +'">'+
							        '</tr>';
									
							}
							htmlString += 
							    '<tr>'+
							        '<td width="63" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="30" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
							        '<td width="189" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
							        '<td width="84" style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_2) +'</span></td>'+
							        '<td width="147" style="padding-right:10; border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="30" colspan="3" align="right" valign="middle"><span style="font-size:9pt;">('+ m1_name +')</span></td>'+
							        '<td style="padding-right:10;" width="97" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="30" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_3) +'</span></td>'+
							    '</tr>'+
							    '</table>'+
							    '</td>'+
							    '</tr>'+
							    '<tr>'+
							    '<td width="580" colspan="2" height="20"></td>'+
							    '</tr>';
							htmlString +=
								'</form>'+
				                '<tr>'+
				                        '<td width="580" align="left" valign="middle" colspan="2" height="25"><span style="font-size:9pt;"><b>3. 제본비</b></span></td>'+
				                '</tr>'+
				                '<tr>'+
				                        '<td width="580" align="center" valign="top" colspan="2">'+
				                        '<table border="0" cellpadding="0" cellspacing="0" width="580">'+
										    '<tr>'+
										        '<td width="77" style="border-width:1px; border-color:black; border-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
										        '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
										        '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면당단가</span></td>'+
										        '<td width="77" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">권당단가</span></td>'+
										        '<td width="60" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>'+
										        '<td width="70" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">기타</span></td>'+
										        '<td width="106" style="border-top-width:1px; border-right-width:1px; border-bottom-width:1px; border-top-color:black; border-right-color:black; border-bottom-color:black; border-top-style:solid; border-right-style:solid; border-bottom-style:solid;" height="40" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">(*1.1) 제본금액</span></td>'+
										    '</tr>';
							if (m3 != 'N')
							{
								htmlString +=
									'<form name="eform" method="post" action="exj_view_m3.php">'+
									'<input type="hidden" name="uid" value="<?=$uid?>">'+
									'<input type="hidden" name="ty" value="<?=$ty?>">'+
									'<input type="hidden" name="tm" value="<?=$tm?>">'+
									'<input type="hidden" name="td" value="<?=$td?>">'+
									'<input type="hidden" name="page" value="<?=$page?>">';
								from = {
										m3 : m3
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_jmcost_statement8",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										var row2 = result[object_num];
										var m3_name = row2["wcname"];
										
										from = {
												uid : uid
										}
										$.ajax({
											type : "POST",
											contentType : "application/json; charset=utf-8;",
											dataType : "json",
											url : SETTING_URL + "/monthclosing/select_jmcost_statement9",
											async : false,
											data : JSON.stringify(from),
											success : function(result) {
												logNow(result);
												var object_num = Object.keys(result);
												for(var j=0; j < Object.keys(result).length; j++)
												{
													row = result[object_num[j]];
													var jebuid = row["uid"];
													sum_4 += row["totcost7"];
													
													htmlString +=
														'<tr>'+
													        '<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-right-width:1px; border-bottom-color:black; border-left-color:black; border-right-color:black; border-bottom-style:solid; border-left-style:solid; border-right-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+ t_janh +'</span></td>'+
													        '<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
														        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'cpage\' value="'; if (row["cgubn7"] <= 4) htmlString += row["cpage7"]; htmlString += '">'+
														        '</span></td>'+
													        '<td width="77" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
														        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'cprice1\' value="'; if (row["cgubn7"] <= 4) htmlString += row["cprice17"]; htmlString += '">'+
														        '</span></td>'+
													        '<td width="77" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
														        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:60px;" name=\'pdanga\' value="'+ row["pdanga7"] + '" onKeypress="if(event.keyCode == 13){javascript:chJdan(this.value, '+ row["uid"] +', ' + ty+', ' +tm +', ' + td +', '+uid +');}">'+
														        '</span></td>'+
													        '<td width="60" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid; border-right-style:solid; border-right-color:black; border-right-width:1px;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
														        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'jebon4\' value="'+ numberWithCommas(row["cnum7"]) +'" onFocus="blur();">'+
														        '</span></td>'+
													        '<td width="70" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">'+
														        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:60px;" name=\'cprice2\' value="'; if (row["cprice27"]) htmlString += row["cprice27"]; htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chJet(this.value, '+ row["uid"] +', ' + ty+', ' +tm +', ' + td +', '+uid +');}">'+
														        '</span></td>'+
													        '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+
														        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:none; width:70px;" name=\'jebon6\' value="'+ numberWithCommas(row["totcost7"]) +'">'+
														        '</span></td>'+
													        '<input type="hidden" name="jeuid" value="'+ jebuid +'">'+
												        '</tr>';
												}
												htmlString +=
													'<tr>'+
												        '<td width="77" style="border-bottom-width:1px; border-left-width:1px; border-bottom-color:black; border-left-color:black; border-bottom-style:solid; border-left-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">계</span></td>'+
												        '<td width="291" colspan="4" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
												        '<td width="70" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;" height="25" align="center" valign="middle"><span style="font-size:9pt;">('+ m3_name +')</span></td>'+
												        '<td style="padding-right:10;" width="106" style="border-right-width:1px; border-bottom-width:1px; border-right-color:black; border-bottom-color:black; border-right-style:solid; border-bottom-style:solid;" height="25" align="right" valign="middle"><span style="font-size:9pt;">'+ numberWithCommas(sum_4) +'</span></td>'+
											        '</tr>';
											}
										});
									}
								});
							}
							htmlString +=
								'</table>'+
								'</td>'+
								'</tr>'+
								'</form>'+
				                '<tr>'+
			                        '<td width="580" colspan="2" height="20"></td>'+
				                '</tr>'+
				                    '<tr>'+
				                        '<td width="580" align="center" valign="top" colspan="2">'+
				                            '<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">';
							if (m2 != 'N')
							{
								from = {
										uid : uid
								};
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_jmcost_statement10",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										for( var j=0; j < object_num.length; j++ )
										{
											var row = result[object_num[j]];
											var t_sum5 = Math.floor(row["totcost8"] * 1.1);
											sum_5 += t_sum5;
											htmlString +=
												'<tr>'+
				                                    '<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;">'; if (j == 0) htmlString += '<b> 4. 코팅비 (비닐코팅)</b>'; else htmlString += '&nbsp;'; htmlString += '</span></td>'+
				                                    '<td width="50" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>'+
				                                    '<td width="309" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+
					                                    '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:50px;" name=\'coatin1'+ j +'\' value="'+ row["cnum8"] +'" onKeypress="if(event.keyCode == 13){javascript:chCr(this.value, '+ row["uid"] +', ' + ty+', ' +tm +', ' + td +', '+uid +');}">R&nbsp;X&nbsp;'+
					                                    '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:60px;" name=\'coatin2'+ j +'\' value="'+ numberWithCommas(row["cprice8"]) +'" onKeypress="if(event.keyCode == 13){javascript:chCdan(this.value, '+ row["uid"] +', ' + ty+', ' +tm +', ' + td +', '+uid +');}">원&nbsp;X&nbsp;1.1'+
					                                    '&nbsp;&nbsp;(&nbsp;'+ row["wcname"] +'&nbsp;)</span></td>'+
				                                    '<td width="81" height="30" align="right" style="padding-right:10;" valign="middle"><span style="font-size:9pt;">'+
					                                    '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:none; width:70px;" name=\'coatin3'+ j +'\' value="'+ numberWithCommas(t_sum5) +'">'+
					                                    '</span></td>'+
					                                    '<input type="hidden" name="cotuid" value="'+ row["uid"] +'">'+
			                                    '</tr>';
										}
									}
								});
							}
							else
							{
								htmlString +=
									'<tr>'+
	                                    '<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>4. 코팅비 (비닐코팅)</b></span></td>'+
	                                    '<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>'+
	                                    '<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
	                                    '<td width="81" height="30" align="right" style="padding-right:10;" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
                                    '</tr>';
							}
							htmlString +=
								'</table>'+
		                        '</td>'+
		                        '</tr>'+
		                        '<tr>'+
		                        	'<td width="580" align="center" valign="top" colspan="2">'+
		                            	'<table border="0" cellpadding="0" cellspacing="0" width="580" style="border-bottom-width:1px; border-bottom-color:black; border-bottom-style:solid;">'+
		                                	'<tr>'+
		                                    	'<td width="140" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 5. 비닐카바비</b></span></td>'+
		                                    	'<td width="80" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>';
							if (m8 != 'N')
							{
							    //selJMCostStatement11
								from = {
										m8 : m8
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_jmcost_statement11",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										if (!$result)
										{
											popup_msg("비닐 거래처 읽기 오류");
											exit;
										}
										row = result[object_num];
										var m8_name = row["wcname"];
									}
								});
								//selJMCostStatement12
								from = {
										date1 : date1,
										date2 : date2
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_jmcost_statement12",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										if (!result)
										{
											popup_msg("비닐원가 읽기 오류");
											exit;
										}
										row = result[object_num];
										t_sum8 = row["cprice9"];
										htmlString += 
		                                    '<td width="279" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-rright:20pt;">(&nbsp;'+ m8_name +'&nbsp;)</span></td>'+
		                                    '<td width="81" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+
		                                    '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:white; border-style:none; width:70px;" name=\'vyn\' value="'+ numberWithCommas(t_sum8) +'" onKeypress="if(event.keyCode == 13){javascript:chVyn(this.value);}">'+
		                                    '</span></td>'+
		                                    '<input type="hidden" name="vynid" value="'+ row["uid"] +'">';										
									}
								});
							}
							else
							{
								htmlString +=
									'<td width="279" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>'+
									'<td width="81" height="30" align="center" valign="middle"><span style="font-size:9pt;"></span></td>';
							}
							htmlString +=
								'</tr>'+
								'</table>'+
								'</td>'+
								'</tr>';
							from = {
									uid : uid
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/select_jmcost_statement13",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									var object_num = Object.keys(result);
									if(object_num.length)
									{
										from = {
												uid : uid
										};
										$.ajax({
											type : "POST",
											contentType : "application/json; charset=utf-8;",
											dataType : "json",
											url : SETTING_URL + "/monthclosing/select_jmcost_statement17",
											async : false,
											data : JSON.stringify(from),
											success : function(result) {
												logNow(result);
											}
										});
									}
									row = result[object_num[0]];
									
									var t_jnji = row["w5"];
									var t_stic = row["w7"];
									var t_cd = row["w8"];
									var t_etc = row["w9"];
									
									htmlString += 
										'<input type="hidden" name="uid" value="'+ uid +'">'+
										'<input type="hidden" name="ty" value="'+ ty +'">'+
										'<input type="hidden" name="tm" value="'+ tm +'">'+
										'<input type="hidden" name="td" value="'+ td +'">'+
										'<input type="hidden" name="page" value="'+ page +'">'+
										                '<tr>'+
										                        '<td width="580" align="center" valign="top" colspan="2">'+
										                            '<table border="0" cellpadding="0" cellspacing="0" width="580">'+
										                                '<tr>'+
										                                    '<td width="70" height="30"><span style="font-size:9pt;"><b> 6. 원고료</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style=" padding-right:5pt; font-family:굴림; font-size:9pt; text-align:right; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w1\' value="'; if (row["w1"]) htmlString += numberWithCommas(row["w1"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW1(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
										                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 7. 저작료</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w2\' value="'; if (row["w2"]) htmlString += numberWithCommas(row["w2"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW2(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
										                                '</tr>'+
										                                '<tr>'+
										                                    '<td width="70" height="30"><span style="font-size:9pt;"><b> 8. 출력비</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w3\' value="'; if (row["w3"]) htmlString += numberWithCommas(row["w3"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW3(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
										                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b> 9. 사보료</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w4\' value="'; if (row["w4"]) htmlString += numberWithCommas(row["w4"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW4(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
										                                '</tr>'+
										                                '<tr>'+
										                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>10. 증지대 </b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt" valign="middle">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w5\' value="'; if (row["w5"]) htmlString += numberWithCommas(row["w5"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW5(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
										                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>11. 케이스</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w6\' value="'; if (row["w6"]) htmlString += numberWithCommas(row["w6"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW6(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
										                                '</tr>'+
										                                '<tr>'+
										                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>12. 스티커</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w7\' value="'; if (row["w7"]) htmlString += numberWithCommas(row["w7"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW7(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
										                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;"><b>13. CD</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle">:</td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w8\' value="'; if (row["w8"]) htmlString += numberWithCommas(row["w8"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW8(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
										                                '</tr>'+
										                                '<tr>'+
										                                    '<td width="70" height="30"><span style="font-size:9pt;"><b>14. 기타</b></span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle"><span style="font-size:9pt;">:</span></td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt">'+
										                                        '<p style="margin-left:5px;"><span style="font-size:9pt;">'+
										                                        '<INPUT style="font-family:굴림; font-size:9pt; text-align:right; padding-right:5pt; border-width:1px; border-color:black; border-style:solid; width:80px;" name=\'w9\' value="'; if (row["w9"]) htmlString += numberWithCommas(row["w9"]); htmlString += '" onKeypress="if(event.keyCode == 13){javascript:chW9(this.value, '+ ty +', ' + tm + ', ' + td +', ' + uid +');}">'+
										                                        '</span></p>'+
										                                    '</td>'+
										                                    '<td width="120" height="30"><span style="font-size:9pt;"></span></td>'+
										                                    '<td width="100" height="30" align="left" valign="middle"><span style="font-size:9pt;">&nbsp;</span></td>'+
										                                    '<td width="10" height="30" align="center" valign="middle">&nbsp;</td>'+
										                                    '<td width="90" height="30" align="right" style="padding-right:10pt">&nbsp;'+
										                                    '</td>'+
										                                    '<td width="90" height="30"><span style="font-size:9pt;"></span></td>'+
										                                '</tr>'+
										                            '</table>'+
										                        '</td>'+
										                '</tr>'+
										                    '<tr>'+
										                        '<td width="580" colspan="2" height="20"></td>'+
										                    '</tr>'+
										                '<tr>'+
										                        '<td width="580" align="center" valign="top" colspan="2">'+
										                            '<table border="0" cellpadding="2" cellspacing="1" width="580" bgcolor="black">'+
										                                '<tr>'+
										                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt;">총계</span></p></td>'+
										                                    '<td width="260" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;"></span></td>'+
										                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">단가</span></td>'+
										                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">판매가</span></td>'+
										                                    '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">정가</span></td>'+
										                                '</tr>';
									var total_cost =  sum_1 +  sum_2 +  sum_3 +  sum_4 +  sum_5 +  sum_6 +  t_sum8 +  t_jnji +  t_stic +  t_cd +  row["w3"] +  t_etc +  row["w4"] +  row["w1"] +  row["w2"] +  row["w6"] +  row["w10"] +  row["w11"];
									var total_danga = 0;
									if (mknum)
										 total_danga = (total_cost/ mknum).toFixed(2);
									else
										 total_danga = 0;
									htmlString +=
										'<tr>'+
		                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_cost) +'</span></td>'+
		                                    '<td width="260" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;"></span></td>'+
		                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(total_danga) +'</span></td>'+
		                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">&nbsp;</span></td>'+
		                                    '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">&nbsp;</span></td>'+
			                                '</tr>'+
				                            '</table>'+
					                        '</td>'+
							                '</tr>'+
							                '<tr>'+
							                        '<td width="580" align="right" valign="middle" colspan="2" height="30">'+
											'<p><span style="font-size:9pt;"></span></p>'+
											                        '</td>'+
											                '</tr>'+
											                '</table></td>'+
											    '</tr>'+
											'</table>';
									
										
									from = {
											total_cost : total_cost,
											total_danga : total_danga,
											uid : uid
									};
									$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										url : SETTING_URL + "/monthclosing/select_jmcost_statement18",
										async : false,
										data : JSON.stringify(from),
										success : function(result) {
											logNow(result);
											if (!result)
											{
												popup_msg("원가 업데이트 오류");
												exit;
											}
										}
									});
									
								}
							});
						}
					});
				}
			});
		}
	});

	
	
	
	$("#mcJMCostStatementDetailData").html(htmlString);
}

// 품목별 원재료명세서(월별)
function SelPumMon(bdate) {
	var from = {
		msdate : bdate
	}
	logNow(bdate);
	var resultData;
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_pum_mon1",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			if (!result.length) {
				logNow("나 없어");
				$.ajax({
					type : "POST",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_pum_mon2",
					async : false,
					success : function(result) {
						var object_num = Object.keys(result);
						for ( var i in object_num) {
							var data = result[object_num[i]]; // json
							// data
							var from = {
									yjcode : data["wjcode"],
									msdate : bdate
									}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/insert_pum_mon1",
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									},
									error : function() {
										
									}
									});
							}
						}
				});
				}
			}
	});

	var from = {
		msdate : bdate
	}
	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_pum_mon3",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					resultData = result;
					var object_num = Object.keys(result);
					htmlString = "";
					var snum1 = 0;
					var snum2 = 0;
					var snum3 = 0;
					var snum4 = 0;
					var samnt1 = 0;
					var samnt2 = 0;
					var samnt3 = 0;
					var samnt4 = 0;
					var num1 = 0;
					var num2 = 0;
					var num3 = 0;
					var num4 = 0;
					var num5 = 0;
					var num6 = 0;
					var num7 = 0;
					var num8 = 0;
					for ( var i in object_num) {
						var data = result[object_num[i]]; // json data

						if ((data["qnty1"] == 0) && (data["qnty2"] == 0)
								&& (data["qnty3"] == 0) && (data["qnty4"] == 0))
							continue;

						if (data["qnty1"] > 0) {
							num1 = Math.floor(data["qnty1"] / 500);
							num2 = data["qnty1"] % 500;
						} else {
							num1 = Math.floor(Math.abs(data["qnty1"]) / 500)
									* -1;
							num2 = Math.abs(data["qnty1"]) % 500;
						}

						if (data["qnty2"] > 0) {
							num3 = Math.floor(data["qnty2"] / 500);
							num4 = data["qnty2"] % 500;
						} else {
							num3 = Math.floor(Math.abs(data["qnty2"]) / 500)
									* -1;
							num4 = Math.abs(data["qnty2"]) % 500;
						}

						if (data["qnty3"] > 0) {
							num5 = Math.floor(data["qnty3"] / 500);
							num6 = data["qnty3"] % 500;
						} else {
							num5 = Math.floor(Math.abs(data["qnty3"]) / 500)
									* -1;
							num6 = Math.abs(data["qnty3"]) % 500;
						}

						if (data["qnty4"] > 0) {
							num7 = Math.floor(data["qnty4"] / 500);
							num8 = data["qnty4"] % 500;
						} else {
							num7 = Math.floor(Math.abs(data["qnty4"]) / 500)
									* -1;
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
									'<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["wjname"]+ '</span></td>'+
									'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num1)
							htmlString += numberWithCommas(num1) + " R ";
						htmlString += num2;
						htmlString += 
									'</span></td>'+
								'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt1"]) +'</span></td>'+
								'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num3)
							htmlString += numberWithCommas(num3) + " R ";
						htmlString += num4;
						htmlString += 
								'</span></td>'+
								'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt2"]) +'</span></td>'
								'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num5)
							htmlString += numberWithCommas(num5) + " R ";
						htmlString += num6;
						htmlString += 
								'</span></td>'+
								'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt3"]) +'</span></td>'+
								'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num7)
							htmlString += numberWithCommas(num7) + " R ";
						htmlString += num8;
						htmlString += 
								'</span></td>'+
								'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt4"]) +
								'</span></td>' + '</tr>';
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
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num1)
						htmlString += numberWithCommas(num1) + " R ";
					htmlString += num2;
					htmlString += 
							'</span></td>'
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">' + numberWithCommas(samnt1) +'</span></td>'
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num3)
						htmlString += numberWithCommas(num3) + " R ";
					htmlString += num4;
					htmlString += 
							'</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt2) +'</span></td>'+
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num5)
						htmlString += numberWithCommas(num5) + " R ";
					htmlString += num6;
					htmlString += 
							'</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt3) +'</span></td>'
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num7)
						htmlString += numberWithCommas(num7) + " R ";
					htmlString += num8;
					htmlString += 
							'</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt4) +'</span></td>'+
							'</tr>';

					$("#mcPumMonData2").html(htmlString);
				}
			});

	document.getElementById("btnPumPerPrint1").onclick = function() {// 인쇄
		// //lwhee
		var t_URL = "/popup?print";
		if (popUp && !popUp.closed) {
			popUp.close();
		}
		popUp = window
				.open(
						t_URL,
						"PopUpPrintjejakplan",
						'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');// DATEW

		popUp.document.write(jmenu7("2_인쇄팝업"));

		var page = 1;
		var object_num = Object.keys(resultData);

		logNow(bdate);

		var htmlString = "";
		htmlString += 
				'<tr>'+
					'<td width="740" height="50">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
					'<td width="740" height="50" align="center" valign="middle"><span style="font-size:18pt;"><b>'+ bdate.substring(0, 4) + '년 ' + bdate.substring(4, 6) + '월 원재료 명세서</b></span></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="740" height="30" align="right" valign="middle"><span style="font-size:9pt;">PAGE : '+ page +'</span></td>'+
				'</tr>'+
				'<tr>'+
					'<td width="740">'+
						'<table border="0" cellspacing="0" cellspacing="0" width="740" bordercolor="black" cellpadding="0">'+
							'<tr>'+
								'<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-bottom: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="60" rowspan="2"><span style="font-size:9pt; letter-spacing:10pt;"><b>원재료</b></span></td>'+
								'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기초재고</b></span></td>'+
								'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>입고</b></span></td>'+
								'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>출고</b></span></td>'+
								'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 2px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기말재고</b></span></td>'+
							'</tr>'+
								'<tr>'+
								'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
								'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
								'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
								'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
								'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
								'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
								'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
								'<td style="border-bottom: 2px solid #000000; border-right: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
							'</tr>';

		var snum1 = 0;
		var snum2 = 0;
		var snum3 = 0;
		var snum4 = 0;
		var samnt1 = 0;
		var samnt2 = 0;
		var samnt3 = 0;
		var samnt4 = 0;
		var psnum1 = 0;
		var psnum2 = 0;
		var psnum3 = 0;
		var psnum4 = 0;
		var psamnt1 = 0;
		var psamnt2 = 0;
		var psamnt3 = 0;
		var psamnt4 = 0;
		var rec_no = 0;

		for ( var i in object_num) {

			var data = resultData[object_num[i]];

			if (rec_no >= 20) {
				rec_no = 0;
				page++;

				num1 = Math.floor(snum1 / 500);
				num2 = snum1 % 500;
				num3 = Math.floor(snum2 / 500);
				num4 = snum2 % 500;
				num5 = Math.floor(snum3 / 500);
				num6 = snum3 % 500;
				num7 = Math.floor(snum4 / 500);
				num8 = snum4 % 500;

				htmlString += 
						'<tr>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt; letter-spacing:0pt;"><b>계</b></span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
				if (num1)
					htmlString += numberWithCommas(num1) + " R ";
				htmlString += num2
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt1) +'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
				if (num3)
					htmlString += numberWithCommas(num3) + " 1R ";
				htmlString += num4
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">' + numberWithCommas(samnt2) +'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
				if (num5)
					htmlString += numberWithCommas(num5) + " R ";
				htmlString += num6
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt3) +'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
				if (num7)
					htmlString += numberWithCommas(num7) + " R ";
				htmlString += num8
			            '</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt4) +'</span></td>'+
						'</tr>'+
						'</table>'+
						'</td>'+
						'</tr>'+
						'<tr>'+
							'<td width="740" height="40" align="left" valign="middle"><span style="font-size:9pt;">'+ com_name +'</span></td>'+
						'</tr>'+
						'</table>'+

							'<p style="page-break-before:always">'+

						'<table border="0" cellpadding="0" cellspacing="0" width="740">'+
						'<tr>'+
							'<td width="740" height="50">&nbsp;</td>'+
						'</tr>'+
						'<tr>'+
							'<td width="740" height="50" align="center" valign="middle"><span style="font-size:18pt;"><b>'+ bdate.substring(0, 4)+ '년 '+ bdate.substring(4, 6) +'월 원재료 명세서</b></span></td>'+
						'</tr>'+
						'<tr>'+
							'<td width="740" height="30" align="right" valign="middle"><span style="font-size:9pt;">PAGE : '+ page+ '</span></td>'+
						'</tr>'+
						'<tr>'+
							'<td width="740">'+
								'<table border="0" cellspacing="0" cellspacing="0" width="740" bordercolor="black" cellpadding="0">'+
									'<tr>'+
										'<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-bottom: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="60" rowspan="2"><span style="font-size:9pt; letter-spacing:10pt;"><b>원재료</b></span></td>'+
										'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기초재고</b></span></td>'+
										'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>입고</b></span></td>'+
										'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>출고</b></span></td>'+
										'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 2px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기말재고</b></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
										'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
										'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
										'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
										'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
										'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
										'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
										'<td style="border-bottom: 2px solid #000000; border-right: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
									'</tr>';
				var snum1 = 0;
				var snum2 = 0;
				var snum3 = 0;
				var snum4 = 0;
				var samnt1 = 0;
				var samnt2 = 0;
				var samnt3 = 0;
				var samnt4 = 0;
			}
			if ((data["qnty1"] == 0) && (data["qnty2"] == 0)
					&& (data["qnty3"] == 0) && (data["qnty4"] == 0))
				continue;

			if (data["qnty1"] > 0) {
				num1 = Math.floor(data["qnty1"] / 500);
				num2 = data["qnty1"] % 500;
			} else {
				num1 = Math.floor(Math.abs(data["qnty1"]) / 500) * -1;
				num2 = Math.abs(data["qnty1"]) % 500;
			}

			if (data["qnty2"] > 0) {
				num3 = Math.floor(data["qnty2"] / 500);
				num4 = data["qnty2"] % 500;
			} else {
				num3 = Math.floor(Math.abs(data["qnty2"]) / 500) * -1;
				num4 = Math.abs(data["qnty2"]) % 500;
			}

			if (data["qnty3"] > 0) {
				num5 = Math.floor(data["qnty3"] / 500);
				num6 = data["qnty3"] % 500;
			} else {
				num5 = Math.floor(Math.abs(data["qnty3"]) / 500) * -1;
				num6 = Math.abs(data["qnty3"]) % 500;
			}

			if (data["qnty4"] > 0) {
				num7 = Math.floor(data["qnty4"] / 500);
				num8 = data["qnty4"] % 500;
			} else {
				num7 = Math.floor(Math.abs(data["qnty4"]) / 500) * -1;
				num8 = Math.abs(data["qnty4"]) % 500;
			}
			/*
			 * $num1 = floor($row[QNTY1] / 500); $num2 = $row[QNTY1] % 500;
			 * $num3 = floor($row[QNTY2] / 500); $num4 = $row[QNTY2] % 500;
			 * $num5 = floor($row[QNTY3] / 500); $num6 = $row[QNTY3] % 500;
			 * $num7 = floor($row[QNTY4] / 500); $num8 = $row[QNTY4] % 500;
			 */
			snum1 += data["qnty1"];
			samnt1 += data["amnt1"];
			snum2 += data["qnty2"];
			samnt2 += data["amnt2"];
			snum3 += data["qnty3"];
			samnt3 += data["amnt3"];
			snum4 += data["qnty4"];
			samnt4 += data["amnt4"];
			psnum1 += data["qnty1"];
			psamnt1 += data["amnt1"];
			psnum2 += data["qnty2"];
			psamnt2 += data["amnt2"];
			psnum3 += data["qnty3"];
			psamnt3 += data["amnt3"];
			psnum4 += data["qnty4"];
			psamnt4 += data["amnt4"];

			htmlString += '<tr>'
					'<td style="border-bottom: 1px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["wjname"] + '</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
			if (num1)
				htmlString += numberWithCommas(num1) + " R ";
			htmlString += num2
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt1"]) +'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
			if (num3)
				htmlString += numberWithCommas(num3) + " R ";
			htmlString += num4
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt2"]) +'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
			if (num5)
				htmlString += numberWithCommas(num5) + " R ";
			htmlString += num6
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt3"]) +'</span></td>'
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
			if (num7)
				htmlString += numberWithCommas(num7) + " R ";
			htmlString += num8
					'</span></td>'
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["amnt4"]) + '</span></td>'
					'</tr>';
			rec_no++;
		}

		num1 = Math.floor(snum1 / 500);
		num2 = snum1 % 500;
		num3 = Math.floor(snum2 / 500);
		num4 = snum2 % 500;
		num5 = Math.floor(snum3 / 500);
		num6 = snum3 % 500;
		num7 = Math.floor(snum4 / 500);
		num8 = snum4 % 500;

		htmlString += 
				'<tr>'+
					'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt; letter-spacing:0pt;"><b>계</b></span></td>'+
					'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num1)
			htmlString += numberWithCommas(num1) + " R ";
		htmlString += 
				num2+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt1) +'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num3)
			htmlString += numberWithCommas(num3) + " R ";
		htmlString += 
			num4 +
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(samnt2) +'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num5)
			htmlString += numberWithCommas(num5) + " R ";
		htmlString += num6
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+
				numberWithCommas(samnt3)+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num7)
			htmlString += numberWithCommas(num7) + " R ";
		htmlString += num8+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+
				numberWithCommas(samnt4) + '</span></td>' + '</tr>';

		num1 = Math.floor(psnum1 / 500);
		num2 = psnum1 % 500;
		num3 = Math.floor(psnum2 / 500);
		num4 = psnum2 % 500;
		num5 = Math.floor(psnum3 / 500);
		num6 = psnum3 % 500;
		num7 = Math.floor(psnum4 / 500);
		num8 = psnum4 % 500;

		htmlString += 
				'<tr>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt; letter-spacing:10pt;"><b>총계</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num1)
			htmlString += numberWithCommas(num1) + " R ";
		htmlString += num2+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(psamnt1)+'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num3)
			htmlString += numberWithCommas(num3) + " R ";
		htmlString += num4+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(psamnt2)+'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num5)
			htmlString += numberWithCommas(num5) + " R ";
		htmlString += num6+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(psamnt3)+'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
		if (num7)
			htmlString += numberWithCommas(num7) + " R ";
		htmlString += num8+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(psamnt4)+'</span></td>'+
				'</tr>'+
				'</table>'+
				'</td>'+
				'</tr>'+
				'<tr>'+
				'<td width="740" height="40" align="left" valign="middle"><span style="font-size:9pt;"><?=$com_name?></span></td>'+
				'</tr>';

		htmlString += '</table>';
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}

//품목별 원재료명세서(월별) 새로작성
function btnPumMonInsert(bdate) {
	$('#jejak_detail_view').html(jmenu7("2_품목원재료월별새로작성"));
	logNow("품목");
	logNow(bdate);
	sy = bdate.substring(0,4);
	sm = bdate.substring(4,6);
	logNow(sy);
	logNow(sm);
	if (bdate != '200901')
	{
		from = {};	
		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8;",
			dataType : "json",
			url : SETTING_URL + "/monthclosing/select_pum_mon4",
			async : false,
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				var object_num = Object.keys(result);
				for(var i=0; i < object_num.length; i++)
				{
					row = result[object_num[i]];
					from = {
							bdate : bdate,
							wjcode : row["wjcode"]
					};
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_pum_mon5",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
							var object_num = Object.keys(result);
							if(!object_num.length)
							{
								from = {
										wjcode : row["wjcode"],
										bdate : bdate
								};
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/insert_pum_mon2",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);										
									}
								});
							}
						}
					});
				}
				from = {
						bdate : bdate
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/update_pum_mon1",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
					}
				});
			}
		});
		logNow("1월");
		logNow(("0"+(sy - 1)).slice(-2));
		logNow(sm);
		if (sm == '01')
		{
			var ny = sy - 1;
			var nm = "12";
			logNow("엔와이");
			logNow(ny+nm);
		}
		else
		{
			var ny = sy;
			var nm = sm;
		}
		var newdate = ny + nm;
		logNow("뉴 : " + newdate);
		from = {
				bdate
		}
		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8;",
			dataType : "json",
			url : SETTING_URL + "/monthclosing/select_pum_mon6",
			async : false,
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				logNow("여기?");
				var object_num = Object.keys(result);
				for(var i=0; i < object_num.length; i++)
				{
					row = result[object_num[i]];
					logNow(result);
					logNow("업데이트data");
					logNow(row);
					logNow(row["qnty4"]);
					logNow(row["amnt4"]);
					logNow(row["yjcode"]);
					logNow(newdate);
					logNow("--------");
					from = {
							qnty1 : Number(row["qnty4"]),
							amnt1 : Number(row["amnt4"]),
							yjcode : row["yjcode"],
							bdate : newdate
					};
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/update_pum_mon2",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							
							
						}
					});
				}
			}
		});
	}
	
	
	//입고
	from = {
			bdate : bdate
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_pum_mon7",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				row = result[object_num[i]];
				from = {
						nsum : row["nsum"],
						psum : row["psum"],
						jicode : row["jicode"],
						bdate : bdate
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/update_pum_mon3",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
					}
				});
			}
		}
	});
	
	
	//출고
	from = {
			bdate : bdate
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_pum_mon8",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				row = result[object_num[i]];
				from = {
						uid : row["uid"]
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_pum_mon9",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						for(var j=0; j < object_num.length; j++)
						{
							row2 = result[object_num[j]];
							from = {
									bdate : bdate,
									yjcode : row2["yjcode"]
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/select_pum_mon10",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									var object_num = Object.keys(result);
									row3 = result[object_num];
									var new_q = row3["qnty3"] + row2["jm"] + row2["yb"];
									logNow("new_q");
									logNow(row3["qnty3"]);
									logNow(row2["jm"]);
									logNow(row2["yb"]);
									
									logNow("new_q");
									var new_a = row3["amnt3"] + row2["ycost"];
									
									from = {
											new_q : new_q,
											new_a : new_a,
											uid : row3["uid"]
									}
									$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										url : SETTING_URL + "/monthclosing/update_pum_mon4",
										async : false,
										data : JSON.stringify(from),
										success : function(result) {
											logNow(result);
											var object_num = Object.keys(result);
											
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
	
	from = {
			bdate : bdate
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_pum_mon11",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				row = result[object_num[i]];
				from = {
						uid : row["uid"]
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_pum_mon12",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						for(var j=0; j < object_num.length; j++)
						{
							row2 = result[object_num[j]];
							from = {
									bdate : bdate,
									jcode : row2["jcode"]
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/select_pum_mon13",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									var object_num = Object.keys(result);
									row3 = result[object_num];
									
									var new_q = row3["qnty3"] + row2["jm"] + row2["yb"];
									var new_a = row3["amnt3"] + row2["ycost"];
									
									from = {
											new_q : new_q,
											new_a : new_a,
											uid : row["uid"]
									}
									$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										url : SETTING_URL + "/monthclosing/update_pum_mon5",
										async : false,
										data : JSON.stringify(from),
										success : function(result) {
											logNow(result);
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
		
	//기말재고
	from = {
			bdate
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_pum_mon14",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				row = result[object_num[i]];
				var new_q = row["qnty1"] + row["qnty2"] - row["qnty3"];
				var new_a = row["amnt1"] + row["amnt2"] - row["amnt3"];
				
				if ((new_q == 0) && (new_a > 0))
				{
					new_val = new_a;
					from = {
							new_q : new_q,
							uid : uid
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/update_pum_mon6",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
						}
					});
					
					from = {
							bdate : bdate,
							yjcode : row["yjcode"]
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_pum_mon15",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
							var object_num = Object.keys(result);
							if(object_num.length > 0)
							{
								row2 = result[object_num];
								new_a += row2["ycost"];
								
								from = {
										new_a : new_a,
										uid : uid
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/update_pum_mon7",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
									}
								});
							}
							else
							{
								from = {
										bdate : bdate,
										yjcode : yjcode
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_pum_mon16",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										if(object_num.length > 0)
										{
											row2 = result[object_num];
											new_a += row2["ycost"];
											
											from = {
													new_a : new_a,
													uid : uid
											}
											$.ajax({
												type : "POST",
												contentType : "application/json; charset=utf-8;",
												dataType : "json",
												url : SETTING_URL + "/monthclosing/update_pum_mon8",
												async : false,
												data : JSON.stringify(from),
												success : function(result) {
													logNow(result);
													var object_num = Object.keys(result);
													
												}
											});
										}
									}
								});
							}
							
							new_val += row["amnt3"];
							//upPumMon9
							from = {
									new_val : new_val,
									uid : uid
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/update_pum_mon9",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									var object_num = Object.keys(result);
									
								}
							});
							
						}
					});
				}
				else
				{
					//upPumMon10
					from = {
							new_q : new_q,
							new_a : new_a,
							uid : row["uid"]
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_pum_mon10",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
						}
					});
				}
			}
		}
	});
	location.reload();
}

// 품목별 원재료명세서(기간)
function SelPumPer(bdate) {
	var from = {
		msdate : bdate
	}

	var resultData;

	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_pum_per1",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					resultData = result;

					var object_num = Object.keys(result);
					htmlString = "";
					var snum1 = 0;
					var snum2 = 0;
					var snum3 = 0;
					var snum4 = 0;
					var samnt1 = 0;
					var samnt2 = 0;
					var samnt3 = 0;
					var samnt4 = 0;
					var num1 = 0;
					var num2 = 0;
					var num3 = 0;
					var num4 = 0;
					var num5 = 0;
					var num6 = 0;
					var num7 = 0;
					var num8 = 0;

					for ( var i in object_num) {
						var data = result[object_num[i]]; // json data

						if ((data["qnty1"] == 0) && (data["qnty2"] == 0)
								&& (data["qnty3"] == 0) && (data["qnty4"] == 0))
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
								'<td style="cursor:hand" onClick="javascript:View_All();" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+data["wjname"]+'</span></td>'+
								'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num1)
							htmlString += numberWithCommas(num1) + " R ";
						htmlString += num2;
						htmlString += 
								'</span></td>'+
								'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["amnt1"])+'</span></td>'+
								'<td style="cursor:hand" onClick="javascript:View_Com();" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num3)
							htmlString += numberWithCommas(num3) + " R ";
						htmlString += num4;
						htmlString += 
								'</span></td>'+
								'<td style="cursor:hand" onClick="javascript:View_Com();" width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["amnt2"])+'</span></td>'+
								'<td style="cursor:hand" onClick="javascript:View_Com();" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num5)
							htmlString += numberWithCommas(num5) + " R ";
						htmlString += num6;
						htmlString += 
								'</span></td>'+
								'<td style="cursor:hand" onClick="javascript:View_Com();" width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["amnt3"])+'</span></td>'+
								'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
						if (num7)
							htmlString += numberWithCommas(num7) + " R ";
						htmlString += num8;
						htmlString += 
								'</span></td>'+
								'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["amnt4"])+'</span></td>' + '</tr>';
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
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num1)
						htmlString += numberWithCommas(num1) + " R ";
					htmlString += num2;
					htmlString += 
							'</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(samnt1)+'</span></td>'+
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num3)
						htmlString += numberWithCommas(num3) + " R ";
					htmlString += num4;
					htmlString += 
							'</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(samnt2)+'</span></td>'+
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num5)
						htmlString += numberWithCommas(num5) + " R ";
					htmlString += num6;
					htmlString += 
						'</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(samnt3)+'</span></td>'+
							'<td width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
					if (num7)
						htmlString += numberWithCommas(num7) + " R ";
					htmlString += num8;
					htmlString += 
							'</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(samnt4) + '</span></td>'+
							'</tr>';

					$("#popdata").html(htmlString);
				}
			});

	document.getElementById("btnPumPerPrint").onclick = function() {// 인쇄
		// //lwhee
		var t_URL = "/popup?print";
		if (popUp && !popUp.closed) {
			popUp.close();
		}
		popUp = window.open(t_URL,"PopUpPrintjejakplan",'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');// DATEW

		popUp.document.write(jmenu7("3_인쇄팝업"));
		var object_num = Object.keys(resultData);
		var date1 = new Date(bdate.substring(0, 4), bdate.substring(4, 6), 1);
		logNow(date1);
		var date2 = new Date(bdate.substring(0, 4), bdate.substring(6, 8), 0);
		htmlString = "";
		htmlString += 
				'<tr>'+
				'<td width="740" height="50">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
				'<td width="740" height="50" align="center" valign="middle"><span style="font-size:19pt; letter-spacing:20pt;"><b>원재료명세서</b></span></td>'+
				'</tr>'+
				'<tr>'+
				'<td width="740" height="30" align="center" valign="middle">'+
				'<table border="0" width="740" cellpadding="0" cellspacing="0">'+
				'<tr>'+
				'<td width="500" align="right"><span style="font-size:10pt; padding-right:35pt;">( '+ date1.getFullYear()+ "."+ ("0" + (date1.getMonth())).slice(-2)+ "."+ ("0" + date1.getDate()).slice(-2)+ " ~ "+ date2.getFullYear()+ "."+ ("0" + (date2.getMonth() + 1)).slice(-2)+ "."+ ("0" + date2.getDate()).slice(-2) +' )</span></td>'+
				'<td width="240" align="right"><span style="font-size:9pt;">(단위 : 원)</span></td>'+
				'</tr>'+
				'</table>'+
				'</td>'+
				'</tr>'+
				'<tr>'+
				'<td width="740">'+
				'<table border="0" cellspacing="0" cellspacing="0" width="740" bordercolor="black" cellpadding="0">'+
				'<tr>'+
				'<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-bottom: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="60" rowspan="2"><span style="font-size:9pt; letter-spacing:10pt;"><b>원재료</b></span></td>'+
				'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기초재고</b></span></td>'+
				'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>입고</b></span></td>'+
				'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>출고</b></span></td>'+
				'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 2px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기말재고</b></span></td>'+
				'</tr>'+
				'<tr>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-right: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
				'</tr>';
		var page = 0;

		var snum1 = 0;
		var snum2 = 0;
		var snum3 = 0;
		var snum4 = 0;
		var samnt1 = 0;
		var samnt2 = 0;
		var samnt3 = 0;
		var samnt4 = 0;
		var psnum1 = 0;
		var psnum2 = 0;
		var psnum3 = 0;
		var psnum4 = 0;
		var psamnt1 = 0;
		var psamnt2 = 0;
		var psamnt3 = 0;
		var psamnt4 = 0;
		var num1 = 0;
		var num2 = 0;
		var num3 = 0;
		var num4 = 0;
		var num5 = 0;
		var num6 = 0;
		var num7 = 0;
		var num8 = 0;

		var rec_no = 0;

		for ( var i in object_num) {
			var data = resultData[object_num[i]];

			if (rec_no >= 20) {
				rec_no = 0;
				page++;

				num1 = Math.floor(snum1 / 500);
				num2 = snum1 % 500;
				num3 = Math.floor(snum2 / 500);
				num4 = snum2 % 500;
				num5 = Math.floor(snum3 / 500);
				num6 = snum3 % 500;
				num7 = Math.floor(snum4 / 500);
				num8 = snum4 % 500;

				htmlString += 
						'<tr>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt; letter-spacing:20pt;"><b>계</b></span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				if (num1)
					htmlString += numberWithCommas(num1) + " R ";
				htmlString += 
						num2+
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				htmlString += 
						numberWithCommas(samnt1)+
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				if (num3)
					htmlString += numberWithCommas(num3) + " R ";
				htmlString += 
						num4+
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				htmlString += 
						numberWithCommas(samnt2)+
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				if (num5)
					htmlString += numberWithCommas(num5) + " R ";
				htmlString += 
						num6+
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				htmlString += 
						numberWithCommas(samnt3)+
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				if (num7)
					htmlString += numberWithCommas(num7) + " R ";
				htmlString += 
						num8+
						'</span></td>'+
						'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
				htmlString += numberWithCommas(samnt4)
						'</span></td>'+
						'</tr>'+
						'</table>'+
						'</td>'+
						'</tr>'+
						'<tr>'+
						'<td width="740" height="40" align="left" valign="middle">'+
						'<table border="0" width="740" cellpadding="0" cellspacing="0">'+
						'<tr>'+
						'<td width="400" align="left"><span style="font-size:10pt;">'+ com_name+ '</span></td>'+
						'<td width="340" align="right"><span style="font-size:9pt;">PAGE : '+ page + '</span></td>'+
						'</tr>'+
						'</table>'+
						'</td>'+
						'</tr>'+
						'</table>'+
											'<p style="page-break-before:always">'+
											'<table border="0" cellpadding="0" cellspacing="0" width="740">'+
						'<tr>'+
						'<td width="740" height="50">&nbsp;</td>'+
						'</tr>'+
						'<tr>'+
						'<td width="740" height="50" align="center" valign="middle"><span style="font-size:19pt; letter-spacing:20pt;"><b>원재료명세서</b></span></td>'+
						'</tr>'+
						'<tr>'+
						'<td width="740" height="30" align="center" valign="middle">'+
						'<table border="0" width="740" cellpadding="0" cellspacing="0">'+
						'<tr>'+
						'<td width="500" align="right"><span style="font-size:9pt; padding-right:35pt;">( '+ date1.getFullYear()+"."+("0" + (date1.getMonth())).slice(-2)+"."+("0" + date1.getDate()).slice(-2)+" ~ "+date2.getFullYear()+"."+("0" + (date2.getMonth() + 1)).slice(-2)+"."+("0" + date2.getDate()).slice(-2)+' )</span></td>'+
						'<td width="240" align="right"><span style="font-size:9pt;">(단위 : 원)</span></td>'+
						'</tr>'+
						'</table></td>'+
						'</tr>'+
						'<tr>'+
						'<td width="740">'+
						'<table border="0" cellspacing="0" cellspacing="0" width="740" bordercolor="black" cellpadding="0">'+
						'<tr>'+
						'<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-bottom: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="60" rowspan="2"><span style="font-size:9pt; letter-spacing:10pt;"><b>원재료</b></span></td>'+
						'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기초재고</b></span></td>'+
						'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>입고</b></span></td>'+
						'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:50pt;"><b>출고</b></span></td>'+
						'<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 2px solid #000000;" width="165" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt; letter-spacing:12pt;"><b>기말재고</b></span></td>'+
						'</tr>'+
						'<tr>'+
						'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
						'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
						'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
						'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
						'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
						'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
						'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>수량</b></span></td>'+
						'<td style="border-bottom: 2px solid #000000; border-right: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:20pt;"><b>금액</b></span></td>'+
						'</tr>';
				snum1 = snum2 = snum3 = snum4 = 0;
				samnt1 = samnt2 = samnt3 = samnt4 = 0;
			}
			if ((data["qnty1"] == 0) && (data["qnty2"] == 0)
					&& (data["qnty3"] == 0) && (data["qnty4"] == 0))
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
			psnum1 += data["qnty1"];
			psamnt1 += data["amnt1"];
			psnum2 += data["qnty2"];
			psamnt2 += data["amnt2"];
			psnum3 += data["qnty3"];
			psamnt3 += data["amnt3"];
			psnum4 += data["qnty4"];
			psamnt4 += data["amnt4"];

			htmlString += 
					'<tr>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+data["wjname"]+'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			if (num1)
				htmlString += numberWithCommas(num1) + " R ";
			htmlString += 
					num2+
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			htmlString += 
					numberWithCommas(data["amnt1"])+
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			if (num3)
				htmlString += numberWithCommas(num3) + " R ";
			htmlString += 	
					num4+
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			htmlString += 
					numberWithCommas(data["amnt2"])+
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			if (num5)
				htmlString += numberWithCommas(num5) + " R ";
			htmlString += 
					num6+
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			htmlString += 
					numberWithCommas(data["amnt3"])+
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			if (num7)
				htmlString += numberWithCommas(num7) + " R ";
			htmlString += 
					num8+
					'</span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
			htmlString += numberWithCommas(data["amnt4"]) + '</span></td>'+'</tr>';

			rec_no++;

		}

		num1 = Math.floor(snum1 / 500);
		num2 = snum1 % 500;
		num3 = Math.floor(snum2 / 500);
		num4 = snum2 % 500;
		num5 = Math.floor(snum3 / 500);
		num6 = snum3 % 500;
		num7 = Math.floor(snum4 / 500);
		num8 = snum4 % 500;
		htmlString += 
				'<tr>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt; letter-spacing:20pt;"><b>계</b></span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num1)
			htmlString += numberWithCommas(num1) + " R ";
		htmlString += 
				num2+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += 
				numberWithCommas(samnt1)+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num3)
			htmlString += numberWithCommas(num3) + " R ";
		htmlString += 
				num4+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += 
				numberWithCommas(samnt2)+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num5)
			htmlString += numberWithCommas(num5) + " R ";
		htmlString += 
				num6+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += 
				numberWithCommas(samnt3)+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num7)
			htmlString += numberWithCommas(num7) + " R1 ";
		htmlString += num8+
				'</span></td>'+
				'<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += numberWithCommas(samnt4) + '</span></td>' + '</tr>';

		num1 = Math.floor(psnum1 / 500);
		num2 = psnum1 % 500;
		num3 = Math.floor(psnum2 / 500);
		num4 = psnum2 % 500;
		num5 = Math.floor(psnum3 / 500);
		num6 = psnum3 % 500;
		num7 = Math.floor(psnum4 / 500);
		num8 = psnum4 % 500;

		htmlString += 
				'<tr>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 2px solid #000000;" width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt; letter-spacing:20pt;"><b>총계</b></span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num1)
			htmlString += numberWithCommas(num1) + " R ";
		htmlString += 
				num2+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += 
				numberWithCommas(psamnt1)+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num3)
			htmlString += numberWithCommas(num3) + " R ";
		htmlString += 
				num4+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += 
				numberWithCommas(psamnt2)+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num5)
			htmlString += numberWithCommas(num5) + " R ";
		htmlString += 
				num6+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += 
				numberWithCommas(psamnt3)+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000;" width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		if (num7)
			htmlString += numberWithCommas(num7) + " R1 ";
		htmlString += 
				num8+
				'</span></td>'+
				'<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000;" width="85" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:8pt; padding-right:5pt;">';
		htmlString += 
				numberWithCommas(psamnt4)+
				'</span></td>'+
				'</tr>'+
				'</table>'+
				'</td>'+
				'</tr>'+
				'<tr>'+
				'<td width="740" height="40" align="left" valign="middle">'+
				'<table border="0" width="740" cellpadding="0" cellspacing="0">'+
				'<tr>'+
				'<td width="400" align="left"><span style="font-size:9pt;">'+com_name+'</span></td>'+
				'<td width="340" align="right"><span style="font-size:9pt;">PAGE : '+ (page + 1) + '</span></td>' + '</tr>' + '</table></td>'+
				'</tr>';
		// $("#mcPumPerData2").html(htmlString);
		htmlString += '</table>';
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}

}

//품목별 원재료명세서(기간) 새로작성
function btnPumPerInsert(bdate) {
	//$('#jejak_detail_view').html(jmenu7("2_품목원재료월별새로작성"));
	var indate = String(bdate);
	var sy1 = bdate.substring(0,4);
	var sm1 = bdate.substring(4,6);
	var sm2 = bdate.substring(6,8);
	
	var q1 = 0;
	var a1 = 0;
	var q2 = 0;
	var a2 = 0
	var q3 = 0;
	var a3 = 0;
	var q4 = 0;
	var a4 = 0;
	
	from = {
			bdate : bdate
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/delete_pum_per1",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);			
		}
	});
	
	from = {
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_pum_per2",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				mrow = result[object_num[i]];
				
				//기초
				var tmon = sy1 + sm1;
				
				from = {
						yjcode : mrow["wjcode"],
						msdate : tmon
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_pum_per3",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						var row = result[object_num];
						q1 = result["qnty1"];
						a1 = result["amnt1"];
					}
				});
				
				//기말
				tmon = sy1 + sm2;
				from = {
						yjcode : mrow["wjcode"],
						msdate : tmon
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_pum_per4",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						row = result[object_num];
						q4 = result["qnty1"];
						a4 = result["amnt1"];
					}
				});
				
				//중간
				tmon1 = sy1 + sm1;
				tmon2 = sy1 + sm2;
				logNow("tmon : " + tmon1);
				logNow(mrow["wjcode"]);
				logNow("tmon2 : " + tmon2);
				
				bdate = String(bdate);
				logNow(typeof(bdate));
					
				from = {
						yjcode : mrow["wjcode"],
						tmon1 : tmon1,
						tmon2 : tmon2
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_pum_per5",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						row = result[object_num];
						q2 = row["qnty2"];
						a2 = row["amnt2"];
						q3 = row["qnty3"];
						a3 = row["amnt3"];
						logNow("이게 왜 널이야? : " +bdate);
						logNow("얘는 왜 널이야? : " + mrow["wjcode"])
						from = {
								yjcode : mrow["wjcode"],
								indate : indate,
								qnty1 : q1,
								amnt1 : a1,
								qnty2 : q2,
								amnt2 : a2,
								qnty3 : q3,
								amnt3 : a3,
								qnty4 : q4,
								amnt4 : a4
						}
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/insert_pum_per1",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow(result);								
							}
						});
					}
				});
			}
			location.href="javascript:SelPumPer(" + bdate+ ");";
		}
	});
	
}

// 제조비명세표

// 거래처별 지불명세서
function SelPaymentAccount(bdate){
	
}

// 저자료 지급 내역(상/하)
function SelRoyaltyUD(bdate, gubn, gubn2) {

	var resultDate;

	switch (parseInt(gubn)) {
	case 1:
		var dbattr = "SBINSE ";
		break;
	case 2:
		var dbattr = "SBHJ04 ";
		break;
	}

	var from = {
		dbattr : dbattr
	}
	var sum_t = 0;
	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				async : false,
				url : SETTING_URL + "/monthclosing/select_royalty_ud1",
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);

					resultData = result;

					var object_num = Object.keys(result);
					htmlString = "";
					var num = 1;
					for ( var i in object_num) {
						var data = result[object_num[i]];
						var sum_a = 0;
						if (parseInt(gubn) == 1)
							var b_inse = data["sbinse"];
						else
							var b_inse = data["sbhj04"];
						var sum_p = 0;
						if (data["sbhjgb"] == 2) {
							if (parseInt(gubn2) == 1)
								continue;
							var s_mon = 1;
							var e_mon = 12;
						} else {
							if (parseInt(gubn2) == 1) {
								var s_mon = 1;
								var e_mon = 6;
							} else {
								var s_mon = 7;
								var e_mon = 12;
							}
						}

						for (var ii = s_mon; ii <= e_mon; ii++) {
							var month = (ii) >= 10 ? (ii) : '0' + (ii);
							var dbname = bdate.substring(2, 4) + month;

							var from = {
								dbname : dbname,
								sbbook : data["sbbook"]
							}
							$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										async : false,
										url : SETTING_URL
												+ "/monthclosing/select_royalty_ud2",
										data : JSON.stringify(from),
										success : function(result) {
											if (result[0] != null) {
												if (result[0]["sum1"] != null)
													sum_p += result[0]["sum1"];
												if (result[0]["sum2"] != null)
													sum_p -= result[0]["sum2"];
											}
										}
									});
						}

						if (sum_p == 0)
							continue;
						sum_a = Math
								.round((sum_p * b_inse * data["sbuprc"]) / 100);
						sum_t += sum_a;

						htmlString += 
								'<tr>'+
								'<td width="40" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+num+'</span></td>'+
								'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+data["sbbook"]+'</span></td>'+
								'<td width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+data["sbname"]+'</span></td>'+
								'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["sbuprc"])+'</span></td>'+
								'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+b_inse;
						if (data["sbhjgb"] == 1)
							htmlString += "반";
						else
							htmlString += "일";
						htmlString += 
								'</span></td>'+
								'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(sum_p)+'</span></td>'+
								'<td width="120" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(sum_a)+'</span></td>'+
								'<td width="125" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(sum_a) + '</span></td>'+
								'</tr>';
						num = num + 1;
					}
					$("#mcRoyaltyUDData").html(htmlString);
					(document.getElementById("sum_t")).innerHTML = numberWithCommas(sum_t);
				}
			});

	document.getElementById("btnPumPerPrint").onclick = function() {// 인쇄
		// //lwhee
		var t_URL = "/popup?print";
		if (popUp && !popUp.closed) {
			popUp.close();
		}
		popUp = window
				.open(t_URL,"PopUpPrintjejakplan",'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');// DATEW

		popUp.document.write(jmenu7("6_인쇄팝업"));

		var page = 1;
		var current = new Date();
		var currentYear = current.getFullYear();
		var currentMonth = current.getMonth();
		var currentDate = current.getDate();
		var htmlString = "";
		currentYear = String(currentYear).substring(2, 4);
		htmlString += '<tr>'
				+ '<td width="100%" align="center" height="30"><span style="font-size:18pt; padding-right:5pt;"><u><b>'
				+ bdate.substring(0, 4) + ' 년도 저자료 지급 내역 ';
		if (gubn == 1)
			htmlString += "( 국내 )";
		else
			htmlString += "( 해외 )";
		htmlString +=         
		'</b></u></span></td>'+
		'</tr>'+
		'<tr>'+
		'<td width="100%" align="right" height="30"><span style="font-size:9pt;">'+
		'<table width="100%">'+
		'<tr>'+
		'<td width="50%" align="left"><span style="font-size:9pt;">발행일 : '+ currentYear+ '.'+ ("0" + (currentMonth + 1)).slice(-2)+ '.'+ ("0" + currentDate).slice(-2)+ '</span></td>'+
		'<td width="50%" align="right"><span style="font-size:9pt;">페이지 : '+ page+ '</span></td>'+
		'</tr>'+
		'</table></span></td>'+
		'</tr>'+
		'<tr>'+
		'<td width="1320" align="left" valign="top">'+
		'<table border="0" cellspacing="0" width="1320" cellpadding="2" bgcolor="white" bordercolor="black">'+
		'<tr>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>NO</b></span></p></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>도서코드</b></span></p></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="250" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>도서명</b></span></p></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="60" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>정가</b></span></p></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="50" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>인세율</b></span></p></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="480" bgcolor="white" align="center" valign="middle" bgcolor="white" colspan="12" height="32"><span style="font-size:10pt; letter-spacing:1pt;"><b>'+ bdate.substring(0, 4)+ '년도 월별 판매 수량</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>합계수량</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="100" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>저자료<br>지급금액</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="100" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>지급인세</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; padding-right:1pt;">'+
		'<b>비고</b></span></td>'+
		'</tr>'+
		'<tr>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>01월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>02월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>03월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>04월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>05월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>06월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>07월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>08월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>09월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>10월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>11월</b></span></td>'+
		'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
		'<b>12월</b></span></td>' + '</tr>';

		var object_num = Object.keys(resultData);
		var rec_num = 1;
		var sum_t = 0;
		var pan = new Array();

		logNow(pan[0]);
		for ( var i in object_num) {

			var data = resultData[object_num[i]];
			if (gubn == 1)
				var b_inse = data["sbinse"];
			else
				var b_inse = data["sbhj04"];
			var sum_p = 0;
			if (data["sbhjgb"] == 2) {
				if (gubn2 == 1)
					continue;
				var s_mon = 1;
				var e_mon = 12;
			} else {
				if (gubn2 == 1) {
					s_mon = 1;
					e_mon = 6;
				} else {
					s_mon = 7;
					e_mon = 12;
				}
			}
			for (var i = 0; i < 12; i++) {
				pan[i] = 0;
				logNow(pan[i])
			}
			for (var ii = s_mon; ii <= e_mon; ii++) {
				var month = (ii) >= 10 ? (ii) : '0' + (ii);
				var dbname = bdate.substring(2, 4) + month;

				var from = {
					dbname : dbname,
					sbbook : data["sbbook"]
				}

				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					async : false,
					url : SETTING_URL + "/monthclosing/select_royalty_ud2",
					data : JSON.stringify(from),
					success : function(result) {
						var object_num = Object.keys(result);
						var data = object_num[0]
						if (result[0] != null) {
							if (result[0]["sum1"] != null) {
								pan[ii] += result[0]["sum1"];
								sum_p += result[0]["sum1"];
								(sum_p);
							}
							if (result[0]["sum2"] != null) {
								pan[ii] -= result[0]["sum2"];
								sum_p -= result[0]["sum2"];

							}
						}
					}
				});
			}

			if (sum_p == 0)
				continue;
			sum_a = Math.round((sum_p * b_inse * data["sbuprc"]) / 100);
			sum_t += sum_a;
			htmlString += 
				  '<tr>'+
				  '<td width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="18"><p><span style="font-size:9pt;">'+rec_num+'</span></p></td>'+
				  '<td width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" height="18"><p><span style="font-size:9pt;">'+data["sbbook"]+
				  '</span></p></td>'+
				  '<td width="250" bgcolor="white" align="left" valign="middle" bgcolor="white" height="18"><p><span style="font-size:9pt; padding-left:4pt;">'+data["sbname"]+
				  '</span></p></td>'+
				  '<td width="60" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><p><span style="font-size:9pt; padding-right:6pt;">'+numberWithCommas(data["sbuprc"])+'</span></p></td>'+
				  '<td width="50" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><p><span style="font-size:9pt; padding-left:6pt;">'+b_inse;
			if (data["sbhjgb"] == 1)
				htmlString += "반";
			else
				htmlString += "일";
			htmlString += '</span></p></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 1))
				htmlString += pan[1];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 1))
				htmlString += pan[2];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 1))
				htmlString += pan[3];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 1))
				htmlString += pan[4];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 1))
				htmlString += pan[5];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 1))
				htmlString += pan[0];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 7))
				htmlString += pan[6];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 7))
				htmlString += pan[7];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 7))
				htmlString += pan[8];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 7))
				htmlString += pan[9];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 7))
				htmlString += pan[10];
			else
				htmlString += '&nbsp';
			htmlString += '</span></td>'+
					'<td width="40" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:3pt;">';
			if ((data["sbhjgb"] == 2) || (s_mon == 7))
				htmlString += pan[11];
			else
				htmlString += '&nbsp';
			htmlString += 
		          '</span></td>'
				'<td width="80" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:8pt;">'+numberWithCommas(sum_p)+'</span></td>'+
				'<td width="100" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:8pt;">'+numberWithCommas(sum_a)+'</span></td>'+
				'<td width="100" bgcolor="white" align="right" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt; padding-right:8pt;">'+numberWithCommas(sum_a)+'</span></td>'+
				'<td width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" height="18"><span style="font-size:9pt;">'+
				'&nbsp;</span></td>' + '</tr>';

			if ((rec_num % 5) == 0)
				htmlString += '<tr><td width=\"1320\" colspan=\"16\" height=\"10\"></td></tr>';
			if ((rec_num % 40) == 0) {
				page++;
				htmlString += 
		            '</table></td></tr>'
					'<tr>'+
					'<td style="border-top: 1px solid #000000;" width="100%" align="left" height="20"><span style="font-size:10pt;">'+'<b>'+com_name+'</b></span></td>'+
					'</tr>'+
					'</table>'+
					'<p style="page-break-before:always">'+
					'<table border="0" cellpadding="0" cellspacing="0" width="1320">'+
					'<tr>'+
					'<td width="100%" align="center" height="30"><span style="font-size:18pt; padding-right:5pt;"><b><u>'+bdate.substring(0, 4) + ' 년도 저자료 지급 내역';
				if (gubn == 1)
					htmlString += '( 국내 )';
				else
					htmlString += '( 해외 )';

				htmlString +=             
					'</u></b></span></td>'+
					'</tr>'+
					'<tr>'+
					'<td width="100%" align="right" height="30"><span style="font-size:9pt;">'+
					'<table width="100%">'+
					'<tr>'+
					'<td width="50%" align="left"><span style="font-size:9pt;">발행일 : '+currentYear+'.'+("0" + (currentMonth + 1)).slice(-2)+'.'+("0" + currentDate).slice(-2)+'</span></td>'+
					'<td width="50%" align="right"><span style="font-size:9pt;">페이지 : '+page+'</span></td>'+
					'</tr>'+
					'</table></span></td>'+
					'</tr>'+
					'<tr>'+
					'<td width="1320" align="left" valign="top">'+
					'<table border="0" cellspacing="0" width="1320" cellpadding="2" bgcolor="white" bordercolor="black">'+
					'<tr>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>NO</b></span></p></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>도서코드</b></span></p></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="250" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>도서명</b></span></p></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="60" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>정가</b></span></p></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="50" bgcolor="white" align="center" valign="middle" bgcolor="white" rowspan="2" height="64"><p><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>인세율</b></span></p></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="480" bgcolor="white" align="center" valign="middle" bgcolor="white" colspan="12" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+'<b>'+bdate.substring(0, 4)+'년도 월별 판매 수량</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>합계수량</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="100" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>저자료<br>지급금액</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000;" width="100" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>지급인세</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;" width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" height="64" rowspan="2"><span style="font-size:10pt; padding-right:1pt;">'+
					'<b>비고</b></span></td>'+
					'</tr>'+
					'<tr>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>01월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>02월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>03월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>04월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>05월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>06월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>07월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>08월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>09월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>10월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>11월</b></span></td>'+
					'<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" width="40" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:10pt; letter-spacing:1pt;">'+
					'<b>12월</b></span></td>' + '</tr>';
			}
			rec_num++;
		}
		htmlString += '<tr>'+
		 '<td width="1040" bgcolor="white" colspan="18" align="right" valign="middle" bgcolor="white" height="32"><span style="font-size:9pt; padding-right:8pt;">'+
		   '<b>>> 총 금 액 <<</b></span></td>'+
		   '<td width="100" bgcolor="white" align="right" valign="middle" bgcolor="white" height="32"><span style="font-size:9pt; padding-right:8pt;">'+numberWithCommas(sum_t)+'</span></td>'+
		   '<td width="100" bgcolor="white" align="right" valign="middle" bgcolor="white" height="32"><span style="font-size:9pt; padding-right:8pt;">'+numberWithCommas(sum_t)+'</span></td>'+
		   '<td width="80" bgcolor="white" align="center" valign="middle" bgcolor="white" height="32"><span style="font-size:9pt;">&nbsp;</span></td>'+
		   '</tr>'+
		  
		   '</table></td></tr>'+
		   '<tr>'+
		   '<td style="border-top: 1px solid #000000;" width="100%" align="left" height="20"><span style="font-size:10pt;">'+
		   '<b>' + com_name + '</b></span></td>' + '</tr>';

		htmlString += '</table>';
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;

	}

}

// 저자료 지급 내영(상/하) 지출결의서
function btnRoyaltyUDER(){
	
	function read_korean(num) 
	 { 
	  var return_val = ""; 
	  if($.isNumeric(num)) 
	  { 
		  window.alert('유효한 숫자가 아닙니다'); 
	  return 0; 
	  } 
	  if (num < 0)
	  {
	  	return_val = "영";
	  	return return_val;
	  }
	  logNow(arr_number);
	  var arr_number = num.split("").reverse().join("");
	  logNow(arr_number);
	  for(var i =arr_number.length-1; i>=0; i--) 
	  { 
	  ///////////////////////////////////////////////// 
	  // 현재 자리를 구함 
	  var digit = arr_number.substring(i, i+1); 

	  

	  /////////////////////////////////////////////////////////// 
	  // 각 자리 명칭 
	  switch(digit) 
	  { 
	    case '-' : return_val += "(-) "; 
	        break; 
	    case '0' : return_val += ""; 
	        break; 
	    case '1' : return_val += "일"; 
	        break;    
	    case '2' : return_val += "이"; 
	        break;    
	    case '3' : return_val += "삼"; 
	        break;    
	    case '4' : return_val += "사"; 
	        break;    
	    case '5' : return_val += "오"; 
	        break;    
	    case '6' : return_val += "육"; 
	        break;    
	    case '7' : return_val += "칠"; 
	        break;    
	    case '8' : return_val += "팔"; 
	        break;    
	    case '9' : return_val += "구"; 
	        break;    
	  } 


	    if(digit=="-")continue; 

	  

	    /////////////////////////////////////////////////////////// 
	    // 4자리 표기법 공통부분 
	    if(digit != 0) 
	    { 
	    if(i % 4 == 1) return_val += "십"; 
	    else if(i % 4 == 2) return_val += "백"; 
	    else if(i % 4 == 3) return_val += "천"; 
	    } 
	    
	    /////////////////////////////////////////////////////////// 
	    // 4자리 한자 표기법 단위 
	    if(i % 4 == 0) 
	    { 
	    if( Math.floor(i/ 4) ==0) return_val += ""; 
	    else if(Math.floor(i / 4)==1) return_val += "만"; 
	    else if(Math.floor(i / 4)==2) return_val += "억"; }
	  } 

	  return return_val;
	 } 
	
	htmlString = "";
	var tdate = prompt("지급예정일을 입력해 주세요 (예: 4월 4일 -> 0404)");
	var date = new Date();
	logNow(date);
	date = date.getFullYear() + "년" + ("0" + (date.getMonth()+1)).slice(-2) + "월" + ("0" + date.getDate()).slice(-2) + "일";
	logNow(date);
	gubn1 = $("select[name=gubn]").val();
	gubn2 = $("select[name=gubn2]").val();
	sy = $("select[name=ty]").val();

	$('#jejak_detail_view').html(jmenu7("6_지출결의서"));
	logNow(gubn1);
	logNow(gubn2);
	logNow(sy);
	if (tdate)
	{
		var b_tag = 0;
		if (gubn2 == 1)
			gub1 = "상반기";
		else
			gub1 = "하반기";
		tmon = tdate.substring(0,2);
		tdat = tdate.substring(2,5);
		
		/* 홍혜숙 . 나도피 1~3 . 12534~12536 */
		/* 조홍기 . 코다이음악교육 . 17558 */
		/* 김정민 . 어린이 팬플루트교본 . 83205 */
		/* 이혜성 . 아이재즈 워크북 . 12511~12513 . 아이하농 . 31405 */
		/* 이혜성 . 아이재즈 레슨북 . 32513~32515 . 재즈바이엘 . 32511~32512 */
		/* 조상익 . 재즈피아노만들어치기 . 36131~36132 */
		/* 사헌순 . 플루아 . 43194~43196 . 플루아병용곡집 43197*/
		//$sun_array = array("12534", "12535", "12536", "17558", "83205", "12511", "12512", "12513", "31405", "32513", "32514", "32515", "32511", "32512", "36131", "36132", "43194", "43195", "43196", "43197"); - 조홍기 선급금 끝
		
		sun_array = new Array("12534", "12535", "12536", "83205", "12511", "12512", "12513", "31405", "32513", "32514", "32515", "32511", "32512", "36131", "36132", "43194", "43195", "43196", "43197");

		from = {
		}
		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8;",
			dataType : "json",
			url : SETTING_URL + "/monthclosing/select_royalty_ud3",
			async : false,
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				var object_num = Object.keys(result);
				for(var i=0; i < object_num.length; i++)
				{
					var jrow = result[object_num[i]];
					var jjarray = jrow["sbjuja"].split(",");
					
					if (!jjarray[0].localeCompare("유영선")) // hula 우쿨렐레 3권, 유영선 단독 인세
					{
						logNow("유영선들어옴?");
						var jname = "유영선";
						
						from = {
								jname : jname
						}
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/select_royalty_ud4",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow("zeze");
								logNow(result);
								logNow("zeze");
								var object_num = Object.keys(result);
								rec_no = object_num;
								
								// inse_pr35.php 시작
								from = {
										jname : jname
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_royalty_ud5",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										var trow = result[object_num];
										var nickname = "";
										if(trow["name2"])
											nickname = trow["name2"];
										else
											nickname = "";
										
										htmlString += 	
											'<tr>'+
												'<td height="40" colspan="3">　</td>'+
											'</tr>'+
											'<tr>'+
												'<td colspan="3">'+
												'<p align="center">'+
												'<img border="0" src="logo.jpg" width="181" height="112"></td>'+
											'</tr>'+
											'<tr>'+
												'<td height="40" colspan="3">　</td>'+
											'</tr>'+
											'<tr>'+
												'<td width="240"></td>'+
												'<td style="border-bottom-style: double; border-bottom-width: 5px" bordercolor="#000000">'+
													'<p align="center"><span style="letter-spacing: 0px"><b>'+
													'<font face="굴림" size="5">'; if (nickname) htmlString += nickname+' ('+ jname +')'; else htmlString += jname; htmlString += '귀하</font></b></span></td>'+
												'<td width="240"></td>'+
											'</tr>'+
											'<tr>'+
												'<td colspan="3" height="40">　</td>'+
											'</tr>'+
											'<tr>'+
												'<td colspan="3" style="text-align: justify; text-indent: 0; line-height: 150%; margin-left: 20">'+
													'<b><font size="4">안녕하세요!<br>선생님의 도서들이 '+ sy +'년도 '+ gub1 +'에 다음과 같이 판매되었습니다.<br>'+
													'인세는 '+ tmon +'월 '+ tdat +'일을 전후하여 지급할 예정입니다. 감사합니다.</font></b></td>'+
											'</tr>'+
											'<tr>'+
												'<td colspan="3" height="50">　</td>'+
											'</tr>'+
											'<tr>'+
												'<td colspan="3" style="letter-spacing: 10">'+
													'<p align="center"><b><font size="4">-다음-</font></b></td>'+
											'</tr>'+
											'<tr>'+
												'<td colspan="3" height="30">　</td>'+
											'</tr>'+
											'<tr>'+
												'<td colspan="3">'+
													'<table border="1" width="100%" id="table2" cellspacing="0" cellpadding="2" bordercolor="#000000">'+
														'<tr>'+
															'<td height="30" align="center" width="320"><b>도서명</b></td>'+
															'<td height="30" align="center" width="70"><b>정가</b></td>'+
															'<td height="30" align="center" width="80"><b>판매부수</b></td>'+
															'<td height="30" align="center" width="60"><b>인세율</b></td>'+
															'<td height="30" align="center" width="120"><b>인세</b></td>'+
															'<td height="30" align="center" width="70"><b>비고</b></td>'+
														'</tr>';
									}
								});
								
								var sum_a = 0;
								var sum_t = 0;
								var no1 = 0;
								
								for(var j=0; j < object_num.length; j++)
								{
									mrow = result[object_num[j]];
									
									b_inse = mrow["sbinse"];
									sum_p = 0;
									if (mrow["sbhjgb"] == 2)
									{
										if (gubn2 == 1)
											continue;
										s_mon = 1;
										e_mon = 12;
									}
									else
									{
										if (gubn2 == 1)
										{
											s_mon = 1;
											e_mon = 6;
										}
										else
										{
											s_mon = 7;
											e_mon = 12;
										}
									}
									
									for (var ii = s_mon ; ii <= e_mon ; ii++)
									{
										var dbname = "KS1" + sy.substring(2, 4) + ("0" + ii).slice(-2) + "A";
										
										from = {
												dbname : dbname,
												sbbook : mrow["sbbook"]
										}
										logNow(dbname);
										logNow(mrow["sbbook"]);
										$.ajax({
											type : "POST",
											contentType : "application/json; charset=utf-8;",
											dataType : "json",
											url : SETTING_URL + "/monthclosing/select_royalty_ud6",
											async : false,
											data : JSON.stringify(from),
											success : function(result) {
												logNow(result);
												var object_num = Object.keys(result);
												row2 = result[object_num];
												if(row2)
													sum_p += row2["s1qnty"];
												
												from = {
														dbname : dbname,
														sbbook : mrow["sbbook"]
												}
												$.ajax({
													type : "POST",
													contentType : "application/json; charset=utf-8;",
													dataType : "json",
													url : SETTING_URL + "/monthclosing/select_royalty_ud7",
													async : false,
													data : JSON.stringify(from),
													success : function(result) {
														logNow(result);
														var object_num = Object.keys(result);
														row2 = result[object_num];
														if(row2)
															sum_p -= row2["s1qnty"];
													}
												});
											}
										});
									}
									if (sum_p == 0)
										continue;
									sum_a = Math.round((sum_p * b_inse * mrow["sbuprc"]) / 100);
									logNow("sum_a " + sum_a);
									sum_t += sum_a;	
									
									htmlString +=
										'<tr>'+
											'<td height="30" width="320" style="text-align: left; text-indent: 5; margin-left: 0; letter-spacing:-1pt;">'+ mrow["sbname"] +'</td>'+
											'<td height="30" width="70" style="text-align: right; margin-right: 5">'+ numberWithCommas(mrow["sbuprc"]) +'원</td>'+
											'<td height="30" width="80" style="text-align: right; margin-right: 5">'+ numberWithCommas(sum_p) +'부</td>'+
											'<td height="30" width="60" style="text-align: right; margin-right: 5">'+ b_inse +'%</td>'+
											'<td height="30" width="120" style="text-align: right; margin-right: 5">'+ numberWithCommas(sum_a) +'원</td>';
										if (!no1) {
											htmlString +=
											'<td width="70" align="center" rowspan="'+ rec_no+1 +'">인세는 세전</td>'; 
											no1 = 1;
											}
										htmlString +=
										'</tr>';
								}
								htmlString +=
									'<tr>'+
										'<td height="30" width="520" style="text-align: left; text-indent: 5; margin-left: 0; letter-spacing:3" colspan="4">'+
											'<p style="text-align: center"><b>인세 총지급액</b></td>'+
										'<td height="30" width="120" style="text-align: right; margin-right: 5">'+'<b>'+ numberWithCommas(sum_t) +'원</b></td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'</tr>'+
									'<tr>'+
										'<td colspan="3" height="40">　</td>'+
									'</tr>'+
									'<tr>'+
										'<td colspan="3" style="letter-spacing: 2">'+'<p align="right"><b><font size="4">이가영 (714-0048)</font></b></td>'+
									'</tr>'+
									'</table>'

									'<p style="page-break-before:always">';
								htmlString +=
									'<table border="0" width="700" cellspacing="0" cellpadding="0" bordercolor="#000000">'+
										'<tr>'+
											'<td align="center" height="60"></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="center">'+
									
												'<table border="1" width="600" cellspacing="0" cellpadding="0" bordercolor="#000000">'+
													'<tr>'+
														'<td>'+
															'<table border="0" width="600" id="table1" cellspacing="0" cellpadding="0" bordercolor="#000000">'+
																'<tr>'+
																	'<td align="center" width="520" valign="top">'+
																		'<table border="0" width="100%" id="table4" cellspacing="0" cellpadding="0">'+
																			'<tr>'+
																				'<td width="20" height="30">　</td>'+
																				'<td width="480" height="30">　</td>'+
																				'<td width="20" height="30">　</td>'+
																			'</tr>'+
																			'<tr>'+
																				'<td height="50">　</td>'+
																				'<td height="50">'+
																					'<table border="0" width="100%" id="table5" cellspacing="0" cellpadding="0">'+
																						'<tr>'+
																							'<td width="140">　</td>'+
																							'<td width="200" style="border-bottom: 3px double #000000">'+
																								'<p align="center"><span style="letter-spacing: 10px">'+
																								'<font style="font-size: 20pt"><b>지출결의서</b></font></span></td>'+
																							'<td width="140">　</td>'+
																						'</tr>'+
																					'</table>'+
																				'</td>'+
																				'<td height="50">　</td>'+
																			'</tr>'+
																			'<tr>'+
																				'<td height="30">　</td>'+
																					'<td height="30">'+
																						'<table border="0" width="100%" id="table6" cellspacing="0" cellpadding="0">'+
																							'<tr>'+
																								'<td width="50%">'+
																									'<p align="left"><span style="padding-left:10pt;">과 목</span></td>'+
																								'<td width="50%">'+
																									'<p align="right"><span style="padding-right:5pt;"><b>'+ date +'</b></span></td>'+
																							'</tr>'+
																						'</table>'+
																					'</td>'+
																				'<td height="30">　</td>'+
																			'</tr>';
								if (jname == "사헌순") {
									htmlString +=
										'<tr>'+
											'<td height="40">　</td>'+
											'<td height="40"><b><font style="font-size: 15pt"><span style="letter-spacing:-1;">일금영원정(\0)</span></font></b></td>'+
											'<td height="40">　</td>'+				
										'</tr>';
								} else if (jname == "이혜성") {
									htmlString +=
										'<tr>'+
											'<td height="40">　</td>'+
											'<td height="40"><b><font style="font-size: 15pt"><span style="letter-spacing:-1;">일금영원정(\0)</span></font></b></td>'+
											'<td height="40">　</td>'+
										'</tr>';
								} else if (jname == "조홍기") {
									htmlString +=									
										'<tr>'+
											'<td height="40">　</td>'+
											'<td height="40"><b><font style="font-size: 15pt"><span style="letter-spacing:-1;">일금영원정(\0)</span></font></b></td>'+
											'<td height="40">　</td>'+
										'</tr>';
								} else if (jname == "김정민") {
									htmlString +=
										'<tr>'+
											'<td height="40">　</td>'+
											'<td height="40"><b><font style="font-size: 15pt"><span style="letter-spacing:-1;">일금영원정(\0)</span></font></b></td>'+
											'<td height="40">　</td>'+				
										'</tr>';
								} else {
									htmlString +=
										'<tr>'+
										'<td height="40">　</td>'+
										'<td height="40"><b><font style="font-size: 15pt"><span style="letter-spacing:-1;">일금='+ read_korean(Number(sum_t)) +'원정(\\'; if (sum_t <= 0) htmlString += '0'; else htmlString += numberWithCommas(sum_t); htmlString += ')</span></font></b></td>'+
										'<td height="40">　</td>'+				
										'</tr>';
								}
								htmlString +=
									'<tr>'+
										'<td height="10"></td>'+
										'<td height="10"></td>'+
										'<td height="10"></td>'+
									'</tr>'+
									'<tr>'+
										'<td height="10"></td>'+
										'<td height="10">'+
										'<table border="1" width="100%" id="table8" cellspacing="0" cellpadding="2" bordercolor="#000000">'+
											'<tr>'+
												'<td width="30" align="center">'+
												'<p align="center">내</p>'+
												'<p align="center">역</td>'+
												'<td width="450" style="text-align: left; text-indent: 10">'+
												'<table border="0" width="100%" id="table9" cellspacing="0" cellpadding="0">'+
													'<tr>'+
														'<td height="24" align="left"><span style="padding-left: 3pt;">'+
														'<b><span style="font-size: 14pt">'+ jname +' 도서 '+ rec_no +'종 '+sy +'년 '+ gub1 +' 인세</span></b></span></td>'+
													'</tr>'+
													'<tr>'+
														'<td height="20">　</td>'+
													'</tr>';
								var sum_a = 0;
								var sum_t = 0;
								var no1 = 0;
								
								from = {
										jname : jname
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_royalty_ud8",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										for(var q=0; q < object_num.length; q++)
										{
											mrow = result[object_num[q]];
											b_inse = mrow["sbinse"];
											sum_p = 0;
											if (mrow["sbhjgb"] == 2)
											{
												if (gubn2 == 1)
													continue;
												s_mon = 1;
												e_mon = 12;
											}
											else
											{
												if (gubn2 == 1)
												{
													s_mon = 1;
													e_mon = 6;
												}
												else
												{
													s_mon = 7;
													e_mon = 12;
												}
											}
											for (var ii = s_mon ; ii <= e_mon ; ii++)
											{
												dbname = "KS1" + sy.substring(2,5) + ("0" + ii).slice(-2) + "A";
												
												from = {
														dbname : dbname,
														sbbook : mrow["sbbook"]
												}
												$.ajax({
													type : "POST",
													contentType : "application/json; charset=utf-8;",
													dataType : "json",
													url : SETTING_URL + "/monthclosing/select_royalty_ud9",
													async : false,
													data : JSON.stringify(from),
													success : function(result) {
														logNow(result);
														var object_num = Object.keys(result);
														row2 = result[object_num];
														if(row2)
														sum_p += row2["s1qnty"];
													}
												});
												from = {
														dbname : dbname,
														sbbook : mrow["sbbook"]
												}
												$.ajax({
													type : "POST",
													contentType : "application/json; charset=utf-8;",
													dataType : "json",
													url : SETTING_URL + "/monthclosing/select_royalty_ud10",
													async : false,
													data : JSON.stringify(from),
													success : function(result) {
														logNow(result);
														var object_num = Object.keys(result);
														row2 = result[object_num];
														if(row2)
														sum_p -= row2["s1qnty"];
													}
												});
											}
											if (sum_p == 0)
												continue;
											sum_a = round((sum_p * b_inse * mrow["sbuprc"]) / 100);
											sum_t += sum_a;
											
											htmlString +=
												'<tr>'+
													'<td height="20" align="left"><span style="font-size: 10pt; padding-left:7pt; letter-spacing:-1.5pt;">'+ mrow["sbname"] +'&nbsp;&nbsp;&nbsp;'+ numberWithCommas(mrow["sbuprc"]) +'원x'+ numberWithCommas(sum_p) +'부x'+ numberWithCommas((b_inse/100)) +'='+ numberWithCommas(sum_a)+'원</span></td>'+
												'</tr>';	
										}
										
										if (jname == "사헌순") {
											htmlString +=
												'<tr>'+
													'<td height="20" align="left"><span style="font-size: 10pt; padding-left:7pt; letter-spacing:-1.5pt;"><b>선급금 965,840원 공제 후 잔액 964,720원</b></span></td>'+
												'</tr>';
											}
										if (jname == "이혜성") {
											htmlString +=
												'<tr><td height="20"></td></tr>'+
												'<tr>'+
													'<td height="20" align="left"><span style="font-size: 10pt; padding-left:7pt; letter-spacing:-1.5pt;"><b>선급금 5,053,935원 공제 후 잔액 5,053,935원</b></span></td>'+
												'</tr>';
											}
										if (jname == "김정민") {
											htmlString +=
												'<tr><td height="20"></td></tr>'+
												'<tr>'+
													'<td height="20" align="left"><span style="font-size: 10pt; padding-left:7pt; letter-spacing:-1.5pt;"><b>선급금 198,800원 공제 후 잔액 184,320원</b></span></td>'+
												'</tr>';
											}
										if (jname == "조홍기") {
											htmlString +=
												'<tr><td height="20"></td></tr>'+
												'<tr>'+
													'<td height="20" align="left"><span style="font-size: 10pt; padding-left:7pt; letter-spacing:-1.5pt;"><b>선급금 768,000원 공제 후 잔액 664,800원</b></span></td>'+
												'</tr>';
											}
										htmlString +=
											'<tr>'+
												'<td height="20">　</td>'+
											'</tr>';
									}
								});
							}
						});
						
						from = {
								jname : jname
						}
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/select_royalty_ud11",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow(result);
								var object_num = Object.keys(result);
								row = result[object_num];
								
								htmlString +=
									'<tr>'+
									'<td height="20" align="left"><span style="font-size: 11pt; padding-left:3pt; letter-spacing:-1;"><b>'+ row["name1"] +'('+ row["num1"]+')</b></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td height="20" align="left"><span style="font-size: 11pt; padding-left:3pt; letter-spacing:-1;"><b>'+ row["addr1"] +'</b></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td height="20" align="left"><span style="font-size: 11pt; padding-left:3pt; letter-spacing:-1;"><b>'+ row["num2"] +'</b></span></td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'<td height="10"></td>'+
									'</tr>'+
									'<tr>'+
										'<td height="20">　</td>'+
										'<td height="20">　</td>'+
										'<td height="20">　</td>'+
									'</tr>'+
									'<tr>'+
										'<td height="40">　</td>'+
										'<td height="40">'+
										'<table border="0" width="100%" id="table7" cellspacing="0" cellpadding="0">'+
											'<tr>'+
												'<td width="50%">'+
												'<p align="left">지불 예정일 '+ date.getFullYear() +'년 '+ tmon +'월 '+ tdat +'일</td>'+
												'<td width="50%">'+
												'<p align="right">총무부 이가영</td>'+
											'</tr>'+
										'</table>'+
										'</td>'+
										'<td height="40">　</td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'<td align="center" width="80" valign="top">'+
									'<table border="0" width="50" id="table2" cellspacing="0" cellpadding="0">'+
										'<tr>'+
											'<td height="50">　</td>'+
										'</tr>'+
										'<tr>'+
											'<td>'+
											'<table border="1" width="100%" id="table3" cellspacing="0" cellpadding="0" bordercolor="#000000">'+
												'<tr>'+
													'<td height="30">'+
													'<p align="center">'+
													'<span style="font-size: 11pt; font-weight: 700">결재</span></td>'+
												'</tr>'+
												'<tr>'+
													'<td height="55">　</td>'+
												'</tr>'+
												'<tr>'+
													'<td height="55">　</td>'+
												'</tr>'+
												'<tr>'+
													'<td height="55">　</td>'+
												'</tr>'+
												'<tr>'+
													'<td height="55">　</td>'+
												'</tr>'+
											'</table>'+
											'</td>'+
										'</tr>'+
										'<tr>'+
											'<td height="80%">　</td>'+
										'</tr>'+
									'</table>'+
									'</td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'</tr>'+
									'</table>'+
									'</td>'+
									'</tr>'+
									'<tr><td height="50" align="right"><span style="padding-right:40pt;">'+ com_name +'</span></td></tr>'+
									'<tr><td height="40">'+ row[addr2] +'</td></tr>'+
									'<tr><td height="40"><span style="padding-left:160pt;" a;ign="left">'+ row[addr3] +'님</td></tr>'+
									'</table>'+
									'<p style="page-break-before:always">';
							}
						});
						
					}// inse_pr35.php 끝
				}
			}
		});
		
	}
	$("#btnRoyaltyUD").html(htmlString);
}

// 월별 저자료 지출결의서
function SelMonthlyRoyalty(bdate) {
	var from = {
		bdate : bdate
	}
	var sum_t = 0;
	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				async : false,
				url : SETTING_URL + "/monthclosing/select_monthly_royalty",
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					var object_num = Object.keys(result);
					var sum_t = 0;
					htmlString = "";
					for ( var i in object_num) {
						var data = result[object_num[i]];
						var sum_a = 0;
						var inse = 0;

						inse = data["sbinse"];
						juja = data["sbjuja"];
						sum_a = (inse * data["sbuprc"] * data["bnum"]) / 100;
						sum_t += sum_a;

						htmlString += '<tr>'+
						'<td align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">&nbsp;&nbsp;'+(++i)+'&nbsp;&nbsp;</span></td>'+
						  '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+data["sbbook"]+'</span></td>'+
						  '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+data["sbname"]+'</span></td>'+
						  '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+juja+'</span></td>'+
						  '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["sbuprc"])+'</span></td>'+
						  '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["bnum"])+'</span></td>'+
						  '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(inse)+
						  '</span></td>'+
						  '<td width="125" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(sum_a)+'</span></td>'+
						  '<td width="125" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"><input type="checkbox" name="chk[]" value="<?=$row[uid]?>"></span></td>'+
						  '</tr>';
					}
					$("#mcMonthlyRoyaltyData").html(htmlString);
					(document.getElementById("sum_t")).innerHTML = numberWithCommas(sum_t);
				}
			});

	document.getElementById("btnMonthlyRoyaltyPrint").onclick = function() {// 인쇄
		// //lwhee
		var t_URL = "/popup?print";
		if (popUp && !popUp.closed) {
			popUp.close();
		}
		popUp = window
				.open(t_URL,"PopUpPrintjejakplan",'left=0,top=0,width=820,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');// DATEW

		popUp.document.write(jmenu7("3_인쇄팝업"));

		var object_num = Object.keys(resultData);

		for ( var i in object_num) {
			var data = resultData[object_num[i]];
		}
		htmlString += '</table>';
		(popUp.document.getElementById("popdata")).innerHTML = htmlString;

	}
}

// 저자료 지급 내역 ??
function SelRoyalty(bdate) {
	var from = {
		dbname : bdate.substring(2, 6)
	}
	var sum_t = 0;
	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				async : false,
				url : SETTING_URL + "/monthclosing/select_royalty",
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					var object_num = Object.keys(result);
					var sum_a = 0;
					var num = 1;
					htmlString = "";
					for ( var i in object_num) {
						var data = result[object_num[i]];

						var b_inse = data["sbinse"];
						var sum_p = 0;
						sum_p += data["sum1"];
						sum_p -= data["sum2"];

						if (sum_p == 0)
							continue;

						sum_a = Math
								.round((sum_p * b_inse * data["sbuprc"]) / 100);
						sum_t += sum_a;

						htmlString += 
							  '<tr>'+
							  '<td width="40" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+(num++)+'</span></td>'+
							  '<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+data["sbbook"]+'</span></td>'+
							  '<td width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+data["sbname"]+'</span></td>'+
							  '<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(data["sbuprc"])+'</span></td>'+
							  '<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+b_inse;
						if (data["sbhjgb"] == 1)
							htmlString += "반";
						else
							htmlString += "일";
						htmlString += 
			                '</span></td>'+
							'<td width="90" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(sum_p)+'</span></td>'+
							'<td width="120" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(sum_a)+'</span></td>'+
							'<td width="125" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(sum_a) + '</span></td>'+
							'</tr>';
					}
					$("#mcRoyaltyData").html(htmlString);
					(document.getElementById("sum_t_1")).innerHTML = numberWithCommas(sum_t);
					(document.getElementById("sum_t_2")).innerHTML = numberWithCommas(sum_t);
				}
			});
}

// 구매단가입력
function PurchasePrice(){
	
	function mktime(h, i, s, m, d, y){

		  var mkt = new Date(y, m-1, d, h, i, s);

		  if( mktime.arguments.length == 0 ) mkt = new Date();

		  return Math.floor(mkt.getTime()/1000);
	}
	
	function getFormatDate(date){
	    var year = date.getFullYear();              //yyyy
	    var month = (1 + date.getMonth());          //M
	    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
	    var day = date.getDate();                   //d
	    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
	    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
	}
	
	var year = $("input[name=date1]").val();
	
	var jejotbl = "JEJOMSTEST";

	var tblname = "KS1" + year + "A";
	var ty1 = 2000 + parseInt(year.substring(0, 2));
	var tm1 = parseInt(year.substring(2, 4));
	var tdate = mktime(0,0,1,tm1+1, 0, ty1);
	logNow(tdate);
	tdate = Number(tdate + "000");
	tdate = new Date(tdate);
	logNow(typeof(tdate));


	tdate = getFormatDate(tdate);
	logNow(tdate);

	from = {
			bdate : tdate
	}
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_PurchasePrice1",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num; i++)
			{
				mrow = result[object_num[i]];
				
				from = {
						uid : mrow["uid"]
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/delete_PurchasePrice1",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						
					}
				});
			}
			
			from = {
					bdate : tdate
			}
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/delete_PurchasePrice2",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					var object_num = Object.keys(result);
					
				}
			});
			
			from = {
					bdate : year
			}
			$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				url : SETTING_URL + "/monthclosing/select_PurchasePrice2",
				async : false,
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
					var object_num = Object.keys(result);
					rec_no = object_num.length;
					
					for(var ii=1; ii <= rec_no; ii++)
					{
						mrow = result[object_num[ii]];
						
						from = {
								uid : mrow["t1id"]
						}
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/select_PurchasePrice3",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow(result);
								var object_num = Object.keys(result);
								crow = result[object_num];
								
								from = {
										dbname : jejotbl,
										juid : crow["juid"]
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_PurchasePrice4",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										row = result[object_num];
										var busu = row["jejoamnt"];
										var jejobi = row["sum1"];
										var jejobi2 = 0;
										
										from = {
												juid : crow["juid"],
												bdate : tdate
										}
										$.ajax({
											type : "POST",
											contentType : "application/json; charset=utf-8;",
											dataType : "json",
											url : SETTING_URL + "/monthclosing/select_PurchasePrice5",
											async : false,
											data : JSON.stringify(from),
											success : function(result) {
												logNow(result);
												var object_num = Object.keys(result);
												// 기존 입고
												if(object_num.length){
												for(var j=0; j < object_num.length; j++)
												{
													row = result[object_num];
													if(row["ymd"].localeCompare(tdate))
													{
														htmlString += row["descript"] + ' : ';
														jejobi2 += row["debit"];
														htmlString += row["debit"] + ' <br>';
													}
													else
													{
														from = {
																uid : row["uid"]
														}
														$.ajax({
															type : "POST",
															contentType : "application/json; charset=utf-8;",
															dataType : "json",
															url : SETTING_URL + "/monthclosing/select_PurchasePrice6",
															async : false,
															data : JSON.stringify(from),
															success : function(result) {
																logNow(result);
																var object_num = Object.keys(result);
																trow = result[object_num];
																jejobi2 += trow["B1"] + trow["B2"] + trow["B3"] + trow["B4"] + trow["B5"] + trow["B6"] + trow["B7"] + trow["B8"] + trow["B9"] + trow["B10"] + trow["B11"] + trow["B12"] + trow["B13"] + trow["B14"] + trow["B15"];
															}
														});
													}
													var jejorem = jejobi - jejobi2;
													
												}
												}
												// 첫입고
												else var jejorem = jejobi;
											}
										});
									}
								});
								
							}
						});
						
						if (mrow["fchk2"]) // 마감
						{
							var new_danga = (jejorem / mrow["inum"]).toFixed(2);
							var hgchk = 1;
						}
						else
						{
							var new_danga = (jejobi / busu).toFixed(2);
							var hgchk = 0;
						}
						
						//기록
						from = {
								new_danga : new_danga,
								uid : mrow["uid2"]
						}
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/update_PurchasePrice1",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow(result);								
							}
						});
						
						from = {
								dbname : tblname,
								bookcode : crow["bookcode"],
								inum : mrow["inum"],
								idate : mrow["idate"]
						}
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/select_PurchasePrice7",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow(result);
								var object_num = Object.keys(result);
								row = result[object_num];
								
								var new_amnt = Math.round(new_danga * row["s1qnty"]);
								
								from = {
										dbname : tblname,
										new_danga : new_danga,
										s1amnt : new_amnt,
										uid : row["uid"]
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/update_PurchasePrice2",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
									}
								});
							}
						});
						
						// 전표기록
						from = {
								bdate : tdate,
								juid : crow["juid"]
						}
						$.ajax({
							type : "POST",
							contentType : "application/json; charset=utf-8;",
							dataType : "json",
							url : SETTING_URL + "/monthclosing/select_PurchasePrice8",
							async : false,
							data : JSON.stringify(from),
							success : function(result) {
								logNow(result);
								var object_num = Object.keys(result);
								row = result[object_num];
								
								if (row[0])
									var new_seqno = row[0] + 1;
								else
									var new_seqno = 1;
								
								from = {
										bdate : tdate,
										seqno : new_seqno,
										acctcode : "1201",
										type : "D",
										debit : new_amnt,
										credit : "0",
										descript : crow["bookname"],
										inum : mrow["inum"],
										idanga : new_danga,
										juid : crow["juid"],
										fchk : hgchk
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/insert_PurchasePrice1",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
									}
								});
							}
						});
						
					}
					
					//평균단가 계산
					var fdname = "SGDN" + year.substring(2,4);
					var tyear = year.substring(0, 2);
					var tblname2 = "KTBKS" + tyear + "0";
					var tblname3 = "KTBKP" + tyear + "0";
					var tmonth = Number(year.substring(2,4));
					
					from = {
							dbname : tblname
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_PurchasePrice9",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
							var object_num = Object.keys(result);
							for(var i=0; i < object_num.length; i++)
							{
								mrow = result[object_num[i]];
								var bookcode = mrow["s1book"];
								var tot_num = mrow["s1qnty"];
								var tot_amnt = mrow["s1amnt"];
								
								from = {
										dbname : tblname2,
										bookcode : bookcode,
										tbmgubn : tmonth
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_PurchasePrice10",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										for(var j=0; j < object_num.length; j++)
										{	
											row = result[object_num[j]];
											tot_num += row["asr"] - row["bsr"] - row["csr"] + row["dsr"] - row["esr"] - row["fsr"];
										}
									}
								});
								
								from = {
										dbname : tblname3,
										bookcode : bookcode,
										tbmgubn : tmonth
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_PurchasePrice11",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										for(var j=0; j < object_num.length; j++)
										{	
											row = result[object_num[j]];
											tot_num += row["asr"] - row["bsr"] - row["csr"] + row["dsr"] - row["esr"] - row["fsr"];
										}
									}
								});
								
								new_danga = (tot_amnt / tot_num).toFixed(2);
								
								from = {
										bookcode : bookcode,
										date1 : tyear
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/select_PurchasePrice12",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);
										var object_num = Object.keys(result);
										if(object_num.length)
										{
											from = {
													dbname : fdname,
													new_danga : new_danga,
													bookcode : bookcode,
													date1 : tyear
											}
											$.ajax({
												type : "POST",
												contentType : "application/json; charset=utf-8;",
												dataType : "json",
												url : SETTING_URL + "/monthclosing/update_PurchasePrice3",
												async : false,
												data : JSON.stringify(from),
												success : function(result) {
													logNow(result);
												}
											});
										}
										else
										{
											from = {
													dbname : fdname,
													bookcode : bookcode,
													date1 : tyear,
													new_danga : new_danga
											}
											$.ajax({
												type : "POST",
												contentType : "application/json; charset=utf-8;",
												dataType : "json",
												url : SETTING_URL + "/monthclosing/insert_PurchasePrice2",
												async : false,
												data : JSON.stringify(from),
												success : function(result) {
													logNow(result);
												}
											});
										}
										
									}
								});
							}
							
							// 증정, 폐기 단가 기록
							from = {
									dbname : tblname
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/select_PurchasePrice13",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									var object_num = Object.keys(result);
									for(var q=0; q < object_num.length; q++)
									{
										mrow = result[object_num[q]];
										var ipdan = 1;
										
										from = {
												s1book : mrow["s1book"],
												date1 : tyear
										}
										$.ajax({
											type : "POST",
											contentType : "application/json; charset=utf-8;",
											dataType : "json",
											url : SETTING_URL + "/monthclosing/select_PurchasePrice14",
											async : false,
											data : JSON.stringify(from),
											success : function(result) {
												logNow(result);
												var object_num = Object.keys(result);
												row = result[object_num];
												
												for(var ii=tmonth; ii>=0; ii--)
												{
													fdname = "SGDN" + ("0" + ii).slice(-2);
													if(row[fdname] > 0)
													{
														ipdan = row[fdname];
														break;
													}
												}
												new_amnt = Math.round(mrow["s1qnty"] * ipdan);
												from = {
														dbname : tblname,
														s1dang : ipdan,
														s1amnt : new_amnt,
														uid : mrow["uid"]
												}
												$.ajax({
													type : "POST",
													contentType : "application/json; charset=utf-8;",
													dataType : "json",
													url : SETTING_URL + "/monthclosing/update_PurchasePrice3",
													async : false,
													data : JSON.stringify(from),
													success : function(result) {
														logNow(result);
													}
												});
												
												htmlString += 'UPDATE '+ tblname +' SET S1DANG='+ ipdan +', S1AMNT=' + new_amnt +' WHERE UID=' + mrow["uid"] + '<p>';
												
												
											}
										});
									}
									htmlString += "111 <p>";
								}
							});
						}
					});
				}
			});
		}
	});
}

// 도서 수량.금액 집계
function BookQuantityAmountTotal(){
	var htmlString = "";
	var year = $("input[name=date1]").val();

	var dbname1 = "KS1" + year + "A";
	var dbname2 = "KTBKS" + year.substring(0, 2) + "0";
	var dbname3 = "KTBKP" + year.substring(0, 2) + "0";
	var ty = year.substring(0,2);
	var tm = Number(year.substring(2,4));

	from = {
			dbname2 : dbname2,
			tm : tm
	};
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/update_BookQuantityAmount_Total1",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
		}
	});
	
	from = {
			dbname3 : dbname3,
			tm : tm
	};
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/update_BookQuantityAmount_Total2",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
		}
	});
	
	from = {
			dbname : dbname1
	};
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_BookQuantityAmount_Total1",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				brow = result[object_num[i]];
				htmlString += brow["s1book"] + '<br>';
				from = {
						dbname2 : dbname2,
						s1book : brow["s1book"]
				};
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_BookQuantityAmount_Total2",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						if(!object_num.length)
						{
							for (var kk = 0 ; kk <= 12 ; kk++)
							{
								from = {
										dbname2 : dbname2,
										s1book : brow["s1book"],
										tbmgubn : kk
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/insert_BookQuantityAmount_Total1",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);										
									}
								});
							}
						}
					}
				});
				
				from = {
						dbname3 : dbname3,
						s1book : brow["s1book"]
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_BookQuantityAmount_Total3",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						if(!object_num.length)
						{
							for (var kk = 0 ; kk <= 12 ; kk++)
							{
								from = {
										dbname3 : dbname3,
										s1book : brow["s1book"],
										tbmgubn : kk
								}
								$.ajax({
									type : "POST",
									contentType : "application/json; charset=utf-8;",
									dataType : "json",
									url : SETTING_URL + "/monthclosing/insert_BookQuantityAmount_Total3",
									async : false,
									data : JSON.stringify(from),
									success : function(result) {
										logNow(result);										
									}
								});
							}
						}
					}
				});
				
				from = {
						dbname3 : dbname3,
						s1book : brow["s1book"],
						tm : tm
				};
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_BookQuantityAmount_Total4",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						if(!object_num.length){
							from = {
									dbname2 : dbname3,
									s1book : brow["s1book"],
									tbmgubn : tm
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/insert_BookQuantityAmount_Total3",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);									
								}
							});
						}
					}
				});
				
				//수량
				from = {
						dbname2 : dbname2,
						s1book : brow["s1book"],
						tm : tm
				}
				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8;",
					dataType : "json",
					url : SETTING_URL + "/monthclosing/select_BookQuantityAmount_Total6",
					async : false,
					data : JSON.stringify(from),
					success : function(result) {
						logNow(result);
						var object_num = Object.keys(result);
						if(object_num.length)
						{
							row = result[object_num];
							var fieldname = "TB" + brow["s1gubn"] + "SR";
							
							logNow(dbname2);
							logNow(fieldname);
							logNow(brow["sum1"]);
							logNow(row["uid"]);
							from = {
									dbname2 : dbname2,
									fieldname : fieldname,
									sum1 : brow["sum1"],
									uid : row["uid"]
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/update_BookQuantityAmount_Total3",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
								}
							});
						}
						else
						{
							var fieldname = "TB" + brow["s1gubn"] + "SR";
							from = {
									dbname2 : dbname2,
									fieldname : fieldname,
									s1book : brow["s1book"],
									tm : tm,
									sum1 : brow["sum1"]
							};
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/insert_BookQuantityAmount_Total2",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);									
								}
							});
						}
					}
				});
				
				//금액
				if ((brow["s1gubn"] == 'A') || (brow["s1gubn"] == 'F') || (brow["s1gubn"] == 'E'))
				{
					var fieldname = "TB" + brow["s1gubn"] + "KM";
					
					from = {
							dbname3 : dbname3,
							fieldname : fieldname,
							sum2 : brow["sum2"],
							s1book : brow["s1book"],
							tm : tm
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/update_BookQuantityAmount_Total4",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
						}
					});
				}
				else
				{
					var ipdan = 0;
					
					from = {
							s1book : brow["s1book"],
							ty : ty
					}
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_BookQuantityAmount_Total5",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
							var object_num = Object.keys(result);
							row = result[object_num];
							for(var ii = tm; ii>=0; ii--)
							{
								var var_name = "SGDN" + ("0" + ii).slice(-2);
								if (row[var_name]> 0)
								{
									ipdan = row[var_name];
									break;
								}
							}
							
							var new_val = Math.round(brow["sum1"] * ipdan);
							var fieldname = "TB" + brow["s1gubn"] + "KM";
							
							from = {
									dbname3 : dbname3,
									fieldname : fieldname,
									new_val : new_val,
									s1book : brow["s1book"],
									tm : tm
							}
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/update_BookQuantityAmount_Total5",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
								}
							});
						}
					});
				}
				
			}
		}
	});
}

// 도서금액집계
function BookAmountTotal(){
	//$('#jejak_detail_view').html(jmenu7("2_품목원재료월별새로작성"));

	var year = $("input[name=date1]").val();
	
	var dbname1 = "KS1" + year + "A";
	var dbname2 = "KTBKP" + year.substring(0, 2) + "0";
	ty = year.substring(0,2);
	tm = Number(year.substring(2,4));
	logNow(tm);
	
	from = {
			dbname : dbname1
	};
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		url : SETTING_URL + "/monthclosing/select_BookAmount_Total1",
		async : false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			for(var i=0; i < object_num.length; i++)
			{
				brow = result[object_num[i]];
				if (brow["s1gubn"] == 'A') // 구매는 구매단가 입력
				{
					from = {
							dbname2 : dbname2,
							sum2 : brow["sum2"],
							s1book : brow["s1book"],
							tm : tm 
					};
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/update_BookAmount_Total1",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
						}
					});
				}
				else
				{
					var ipdan = 0;
					from = {
							s1book : brow["s1book"],
							ty : ty
					};
					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8;",
						dataType : "json",
						url : SETTING_URL + "/monthclosing/select_BookAmount_Total2",
						async : false,
						data : JSON.stringify(from),
						success : function(result) {
							logNow(result);
							var object_num = Object.keys(result);
							row = result[object_num];
							
							for(var ii=tm; ii >= 0; ii--)
							{
								var var_name = "SGDN" + ("0" + ii).slice(-2);

								if (row[var_name]> 0)
								{
									ipdan = row[var_name];
									break;
								}
							}
							
							from = {
									dbname2 : dbname2,
									s1book : brow["s1book"],
									tm : tm
							};
							$.ajax({
								type : "POST",
								contentType : "application/json; charset=utf-8;",
								dataType : "json",
								url : SETTING_URL + "/monthclosing/select_BookAmount_Total3",
								async : false,
								data : JSON.stringify(from),
								success : function(result) {
									logNow(result);
									var object_num = Object.keys(result);
									if(!object_num)
									{
										from = {
												dbname2 : dbname2,
												s1book : s1book,
												tm : tm
										};
										$.ajax({
											type : "POST",
											contentType : "application/json; charset=utf-8;",
											dataType : "json",
											url : SETTING_URL + "/monthclosing/insert_BookAmount_Total1",
											async : false,
											data : JSON.stringify(from),
											success : function(result) {
												logNow(result);
											}
										});
									}
									
									var new_val = Math.round(brow["sum1"] * ipdan);
									var fieldname = "TB" + brow["s1gubn"] + "KM";
									
									from = {
											dbname2 : dbname2,
											fieldname : fieldname,
											new_val : new_val,
											s1book : brow["s1book"],
											tm : tm
									}
									$.ajax({
										type : "POST",
										contentType : "application/json; charset=utf-8;",
										dataType : "json",
										url : SETTING_URL + "/monthclosing/select_BookAmount_Total2",
										async : false,
										data : JSON.stringify(from),
										success : function(result) {
											logNow(result);
										}
									});
								}
							});
						}
					});
				}
			}
		}
	});
	parent.Lay1.style.visibility = 'hidden';
}
// 주은교육 제작현황
function SearchMkJueun(date1, date2) {
	var from = {
		date1 : date1,
		date2 : date2
	}

	var resultData;
	$.ajax({
				type : "POST",
				contentType : "application/json; charset=utf-8;",
				dataType : "json",
				async : false,
				url : SETTING_URL + "/monthclosing/select_monthclosing_jueun",
				data : JSON.stringify(from),
				success : function(result) {
					resultData = result;
					var object_num = Object.keys(result);
					var tsum = 0;
					htmlString = "";
					for ( var i in object_num) {
						var data = result[object_num[i]];

						var full_date = MsToFulldate(data["bdate"]);
						full_date = full_date.substring(0, 4) + "-"
								+ full_date.substring(4, 6) + "-"
								+ full_date.substring(6, 8);

						var tprice = data["sbuprc"] * data["sbinse"]
								* data["bnum"] / 100;
						tsum += tprice;

						htmlString += 
								'<tr>'+
								  '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+(++i)+'</span></td>'+
								  '<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+data["bname"]+'</span></td>'+
								  '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+full_date+'</span></td>'+
								  '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+data["bnum"]+'</span></td>'+
								  '<td width="80" height="30" align="right" style="padding-right:15pt" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+data["sbinse"]+'</span></td>'+
								  '<td width="137" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+numberWithCommas(tprice) + '</span></td>'+
								'</tr>';
					}
					$("#mcJueunData").html(htmlString);
					(document.getElementById("sum")).innerHTML = numberWithCommas(tsum);
				}
			});

	document.getElementById("PopUpPrint").onclick = function() { // on click
		var t_URL = "/popup?uid=";
		if (popUp && !popUp.closed) {
			popUp.close();
		}
		popUp = window
				.open(t_URL,"MkJueun",'left=0,top=0,width=780,height=500,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');// DATEW

		popUp.document.write(jmenu7("14_프린터팝업"));

		var object_num = Object.keys(resultData);
		htmlString = "";

		var d = new Date(parseInt($("select[name=ty]").val()), parseInt($(
				"select[name=tm]").val()), 0);

		htmlString += 
				'<tr>'+
				'<td width="720" height="150" align="center" valign="bottom">&nbsp;</td>'+
				'</tr>'+
				'<tr>'+
				'<td width="720" height="50" align="center" valign="middle"><span style="font-size:18pt;"><b>'+$("select[name=ty]").val()+'년 '+$("select[name=tm]").val()+'월 주은교육 도서제작현황</b></span></td>'+
				'</tr>'+
				'<tr>'+
				'<td width="720" height="50" align="center" valign="bottom">'+
				'<table border="0">'+
				'<tr>'+
				'<td width="140" height="50" align="left" valign="middle"><span style="font-size:10pt;">세광음악출판사</span></td>'+
				'<td width="440" height="50" align="center" valign="middle"><span style="font-size:10pt;">발행일 : '+d.getFullYear()+' . '+(d.getMonth() + 1)+' . '+d.getDate()+'</span></td>'+
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
		for ( var i in object_num) {
			var data = resultData[object_num[i]];

			var full_date = MsToFulldate(data["bdate"]);
			full_date = full_date.substring(0, 4) + "-"
					+ full_date.substring(4, 6) + "-"
					+ full_date.substring(6, 8);

			var tprice = data["sbuprc"] * data["sbinse"] * data["bnum"] / 100;
			tsum += tprice;

			htmlString += 
					'<tr>'
					'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:9pt;">'+(++i)+'</span></td>'+
					'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+data["bname"]+'</span></td>'+
					'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+full_date+'</span></td>'+
					'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+data["bnum"]+'</span></td>'+
					'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+data["sbinse"]+'</span></td>'+
					'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(tprice)+'</span></td>'+
					'<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
					'</tr>';

		}
		htmlString += 
			  '<tr>'+
			  '<td colspan="5" style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="center" valign="middle" bgcolor="#FFFFFF"><span style="font-size:9pt; letter-spacing:100pt;">합계</span></td>'+
			  '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+numberWithCommas(tsum)+'</span></td>'+
			  '<td style="border-bottom: 1px solid #777777; border-left: 1px solid #000000; border-right: 1px solid #000000;" height="43" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
			  '</tr>' + '</table>' + '</td>' + '</tr>';

		(popUp.document.getElementById("popdata")).innerHTML = htmlString;
	}
}