function jmenu9(val) {
	switch (val) {//"회계전표", "원천징수", " ", "도서별 월별집계", "년도별 월별집계", "도서별 제작현황", " ", "전기 이월 작업", " ", "미입고 도서", " ", "전도서재고조회"
		case "0": //회계전표 -> jejak/su/107.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:60px; margin-left:15px;">',
					'<div style="width:780px; height:40px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
							'<tr>',
								'<td width="780" height="40">',
									'<form name="dform" method="post" action="107.php">',
										'<table border="0" cellpadding="0" cellspacing="0" width="780">',
											'<tr>',
												'<td width="10"></td>',
												'<td width="65">',
													'<select name="ty" size="1" style="font-family:굴림; font-size:9pt; width:60;">',
													'</select>',
												'</td>',
												'<td width="20" align="left"><span style="font-size:9pt;">년</span></td>',
												'<td width="65">',
													'<select name="tm" size="1" style="font-family:굴림; font-size:9pt;  width:60;">',
														'<option value="01">01</option>',
														'<option value="02">02</option>',
														'<option value="03">03</option>',
														'<option value="04">04</option>',
														'<option value="05">05</option>',
														'<option value="06">06</option>',
														'<option value="07">07</option>',
														'<option value="08">08</option>',
														'<option value="09">09</option>',
														'<option value="10">10</option>',
														'<option value="11">11</option>',
														'<option value="12">12</option>',
													'</select>',
												'</td>',
												'<td width="30"><span style="font-size:9pt;">월</span></td>',
												'<td width="65" align="right"><span style="font-size:9pt;">회 계 전 표</span></td>',
												'<td width="30"></td>',
												'<td width="340" align="left">',
													'<input type="button" value=" 보기 " onClick="javascript:SelAccountingSlip();">&nbsp;&nbsp;&nbsp;&nbsp;',
													'<input type="button" value=" 전표작성 " onClick="javascript:MakeAccountingSlip();">&nbsp;&nbsp;',
													'<input type="button" value=" EXCEL " onClick="javascript:MakeEx();">',
												'</td>',
												'<td width="155" align="right"><input type="button" id="btnPrint" value=" 인 쇄 "></td>',
											'</tr>',
										'</table>',
									'</form>',
								'</td>',
							'</tr>',
							'<tr>',
								'<td width="780">',
									'<table id="accountingSlipData" border="0" cellspacing="2" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
								'</td>',
							'</tr>',
						'</table>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "0_프린터팝업": 
			return [
			'<div style="width:810px; height:815px;">',
				'<table id="popdata" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="508"></table>'+
			'</div>',
		].join('');
			
		case "1": //원천징수 -> jejak/su/401.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:395px; margin-left:15px;">',
					'<div style="width:780px; height:375px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
							'<tr>',
								'<td width="780" height="40">',
									'<form name="dform" method="get" action="401.php">',
										'<table border="0" cellpadding="0" cellspacing="0" width="780">',
											'<tr>',
												'<td width="10"></td>',
												'<td width="65">',
													'<select name="ty" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(91);">',
													'</select>',
												'</td>',
												'<td width="20" align="left"><span style="font-size:9pt;">년</span></td>',
												'<td width="65">',
													'<select name="tm" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(91);">',
														'<option value="01">01</option>',
														'<option value="02">02</option>',
														'<option value="03">03</option>',
														'<option value="04">04</option>',
														'<option value="05">05</option>',
														'<option value="06">06</option>',
														'<option value="07">07</option>',
														'<option value="08">08</option>',
														'<option value="09">09</option>',
														'<option value="10">10</option>',
														'<option value="11">11</option>',
														'<option value="12">12</option>',
													'</select>',
												'</td>',
												'<td width="30"><span style="font-size:9pt;">월</span></td>',
												'<td width="65" align="right"><span style="font-size:9pt; letter-spacing:2pt;">원천징수</span></td>',
												'<td width="30"></td>',
												'<td width="340" align="left"></td>',
												'<td width="155" align="right"><input type="button" id="PopUpWithholdingTax" value=" 인 쇄 "></td>',
											'</tr>',
										'</table>',
									'</form>',
								'</td>',
							'</tr>',
							'<tr>',
								'<td width="780">',
									'<table id="asWithholdingTaxDataTemp" border="0" cellspacing="1" width="780" bordercolordark="#F4F4F4" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">',
										'<tr>',
											'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">성명</span></td>',
											'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">날짜</span></td>',
											'<td width="100" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">주민등록번호</span></td>',
											'<td width="280" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">주소</span></td>',
											'<td width="50" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>',
											'<td width="70" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">지급액</span></td>',
											'<td width="60" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">소득세</span></td>',
											'<td width="60" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">주민세</span></td>',
											'<td width="60" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;">합계</span></td>',
										'</tr>',
									'</table>',
									'<table id="asWithholdingTaxData" border="0" cellspacing="1" width="780" bordercolordark="#F4F4F4" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
								'</td>',
							'</tr>',
						'</table>',
						'<p><br>',
						'<form name="aform" method="post">',
							'<input type="hidden" name="KYDATE1" value="<?=$tdate?>">',
							'<table border="0" cellspacing="1" width="780" bordercolordark="#F4F4F4" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">',
								'<tr>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:35pt;"><b>날짜</b></span></td>',
									'<td width="300" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><INPUT name="KYDATE2" placeholder="01" style="width:290px; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid;"></span></td>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-left:0pt;"></span></td>',
									'<td width="300" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-left:0pt;"></span></td>',
								'</tr>',
								'<tr>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt;"><b>주민등록번호</b></span></td>',
									'<td width="300" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><INPUT name="KYNUM" placeholder="20200101-0000000" onKeypress="if(event.keyCode == 13){javascript:FindNm();}" style="width:290px; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid;"></span></td>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:35pt;"><b>성명</b></span></td>',
									'<td width="300" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><INPUT name="KYNAME" style="width:290px; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid;"></span></td>',	        
								'</tr>',
								'<tr>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:35pt;"><b>주소</b></span></td>',
									'<td width="690" colspan="3" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><INPUT name="KYADDR" style="width:680px; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid;"></span></td>',        
								'</tr>',
								'<tr>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:13pt;"><b>지급액</b></span></td>',
									'<td width="300" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><INPUT name="KYAMNT" onkeyup="" style="width:290px; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid;"></span></td>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; padding-left:0pt;"></span></td>',
									'<td width="300" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt; padding-left:0pt;"></span></td>',
								'</tr>',
								'<tr>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:35pt;"><b>적요</b></span></td>',
									'<td width="690" colspan="3" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><INPUT name="KYCOMM" style="width:680px; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid;"></span></td>',
								'</tr>',
								'<tr>',
									'<td width="90" height="25" align="center" bgcolor="#F4F4F4"><span style="font-size:9pt; letter-spacing:35pt;"><b>비고</b></span></td>',
									'<td width="690" colspan="3" height="25" align="center" bgcolor="#FFFFFF"><span style="font-size:9pt;"><INPUT name="KYGUBN" style="width:680px; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid;"></span></td>',
								'</tr>',
							'</table>',
							'<p>',
							'<center>',
								'<input type="button" value=" 등 록 " onClick="javascript:InsertWithholdingTax();">',
							'</center>',
						'</form>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "1_프린터팝업": //원친징수 인쇄팝업
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:120px; margin-left:15px;">',
					'<div style="width:780px; height:100px; padding:10px 0px 10px 0px;">',
						'<table id="popdata" border="0" cellpadding="0" cellspacing="0" width="700"></table>'+
					'</div>',
				'</div>',
			'</div>',
		].join('');

		case "3": //도서별 월별집계 -> jejak/su/501.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:150px; margin-left:15px;">',
					'<div style="width:780px; height:130px; padding:10px 0px 10px 0px;">',
						'<form name="frmMain" method="post" action="501.php">',
							'<table border="0" cellpadding="0" cellspacing="0" width="720">',
								'<tr>',
									'<td width="720">',
										'<table border="0" cellpadding="0" cellspacing="0" width="720" height="30">',
											'<tr>',
												'<td width="720" height="30" align="center" valign="middle"><b><span style="font-size:13pt;"><a id="title">도서별 월별 집계</a></span></b></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720">',
										'<table border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC">',
											'<tr>',
												'<td width="90" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">작업년도</font></span></td>',
												'<td width="100" height="30" align="center"><p style="margin-left:0px;"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:96px;" name="date1" maxlength="2" onKeypress="if(event.keyCode == 13){javascript:SelMonthlySumByBook();}"></p></td>',
												'<td width="90" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">도서코드</font></span></td>',
												'<td width="100" height="30" align="center"><p style="margin-left:0px;"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:96px;" name="book1" maxlength="6" onKeypress="if(event.keyCode == 13){javascript:SelMonthlySumByBook();}"></p></td>',
												'<td width="340" height="30"><p style="margin-left:10px;"><INPUT style="font-family:굴림; font-size:9pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:320px;" name="book2" onFocus="blur();"></p></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720">',
										'<table id="MonthlySumByBookData" style="display:none;" border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC"></table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"> </td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720"></td>',
								'</tr>',
							'</table>',
							'<table>',
								'<tr>',
									'<td width="780" height="10"><!-- 여백 --></td>',
								'</tr>',
								'<tr>',
									'<td align="center" height="30"><input type="button" value=" 인쇄 " onClick="javascript:Pr1();"></td>',
								'</tr>',
							'</table>',
						'</form>',
					'</div>',
				'</div>',
			'</div>',
			].join('');

		case "4": //년도별 월별집계 -> jejak/su/504.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:120px; margin-left:15px;">',
					'<div style="width:780px; height:100px; padding:10px 0px 10px 0px;">',
						//'<form name="frmMain" method="post" action="504.php">',
							'<table border="0" cellpadding="0" cellspacing="0" width="720">',
								'<tr>',
									'<td width="720">',
										'<table border="0" cellpadding="0" cellspacing="0" width="720" height="30">',
											'<tr>',
												'<td width="720" height="30" align="center" valign="middle"><b><span style="font-size:13pt;"><a id="title">월별 수량 및 금액 집계</a></span></b></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720">',
										'<table border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC">',
											'<tr>',
												'<td width="90" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">작업년도</font></span></td>',
												'<td width="100" height="30" align="center"><p style="margin-left:0px;"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:96px;" name="date1" maxlength="2" onKeypress="if(event.keyCode == 13){javascript:SelMonthlyAggregateByYear();}"></p></td>',
												'<td width="530" align="center" valign="middle" height="30"><span style="font-size:9pt; padding-left:0pt;"></span></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720">',
										'<table id="asMonthlyAggregateByYearData" style="display:none" border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC"></table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"> </td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720"></td>',
								'</tr>',
							'</table>',
						//'</form>',
					'</div>',
				'</div>',
			'</div>',
			].join('');

		case "5": //도서별 제작현황 -> jejak/su/503.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:120px; margin-left:15px;">',
					'<div style="width:780px; height:100px; padding:10px 0px 10px 0px;">',
						'<form name="frmAdd" method="post" action="503.php">',
							'<table border="0" cellpadding="0" cellspacing="0" width="720">',
								'<tr>',
									'<td width="720">',
										'<table border="0" cellpadding="0" cellspacing="0" width="720" height="30">',
											'<tr>',
												'<td width="720" height="30" align="center" valign="middle"><b><span style="font-size:13pt;">도서별 제작 현황</span></b></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720">',
										'<table border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC">',
											'<tr>',
												'<td width="90" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">도서코드</font></span></td>',
												'<td width="100" height="30" align="center"><p style="margin-left:0px;"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:96px;" name="man1" maxlength="6" onKeypress="if(event.keyCode == 13){javascript:SelProductionByBook();}"></p></td>',
												'<td width="530" height="30"><p style="margin-left:10px;"><INPUT style="font-family:굴림; font-size:9pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:320px;" name="book2" onFocus="blur();" onClick="javascript:SearchBookcode_m9();"></p></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720">',
										'<table id="asByBookData" style="display:none;" border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC"></table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"> </td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720"></td>',
								'</tr>',
							'</table>',
						'</form>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "5_popup": 
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:146px; margin-left:15px;">',
					'<div style="width:780px; height:126px; padding:10px 0px 10px 0px;">',
						'<table width="300" border="0">',
							'<tr>',
								'<td width=250" align="center"><input id="txtBookcode" type="text" name="bname" size="30"></td>',
								'<td width=50" align="center"><input id="btnSearchbookcode" type="button" value=" 검색 "></td>',
							'</tr>',
						'</table>',
						'<table id="pioMoncuDailytotalData2" width="300" border="1"></table>',
					'</div>',
				'</div>',
			'</div>',
			].join('');

		case "7": //전기 이월 작업 -> jejak/su/304.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:540px; margin-left:15px;">',
					'<div style="width:780px; height:520px; padding:10px 0px 10px 0px;">',
						//'<form name="frmMain">',
							'<table border="0" cellpadding="0" cellspacing="0" width="720" height="500">',
								'<tr>',
									'<td width="720" valign="middle">',
										'<table border="0" cellpadding="0" cellspacing="0" width="720" height="30">',
											'<tr>',
												'<td width="720" height="30" align="center" valign="middle"><b><span style="font-size:13pt;">전기 이월 작업</span></b></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" valign="middle" align="center">',
										'<table border="0" cellspacing="0" width="290" bordercolordark="white" bordercolorlight="#CCCCCC">',
											'<tr>',
												'<td width="90" bgcolor="white" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">기준년도</font></span></td>',
												'<td width="100" height="30" align="center"><p style="margin-left:0px;"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:96px;" name="date1" maxlength="2"></p></td>',
												'<td width="100" height="30" align="center"><input type="button" value=" 실 행 " onClick="javascript:SelElecCarryoverWork();"></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
							'</table>',
						//'</form>',
						'<div id="Lay1" name="Layer1" style="visibility:hidden; position:absolute; width:300pt height:300pt; top:210pt; left:400pt;">',
							'<img src="/resources/style/images/jejak/time_02.gif" width="300" height="300" border="0">',
						'</div>',
						'<div>',
							//'<iframe name="tFrm" width="0" height="0"></iframe>',
						'</div>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "7_디테일": 
			return [
			'<div style="width:810px; height:815px;">',
				'<SCRIPT language=Javascript> '+
				'</SCRIPT>'+
				'<center>'+
				'<table width="400" height="500">'+
				    '<tr>'+
				        '<td width="400" height="200"></td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="400" height="30"><img src="/resources/style/images/jejak/loading.gif" border="0"></td>'+
				    '</tr>'+
				    //'<form name="frm1">'+
				        '<tr>'+
				            '<td width="400" height="50" valign="bottom"><INPUT style="text-align:center; font-family:굴림; font-size:14pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:380px;" name="tmp_msg2"></td></td>'+
				        '</tr>'+
				        '<tr>'+
				            '<td width="400" height="50" valign="bottom"><INPUT style="text-align:center; font-family:굴림; font-size:11pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:380px;" name="tmp_msg"></td></td>'+
				        '</tr>'+
				    //'</form>'+
				'</table>'+
				'</center>'+
			'</div>',
		].join('');

		case "9": //미입고 도서 -> jejak/su/502.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:960px; margin-left:15px;">',
					'<div style="width:780px; height:960px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
                            '<tr>',
								'<td width="780" height="10"></td>',
							'</tr>',
							'<tr>',
								'<td width="780">',
									'<form name="frmMain" method="post" action="502.php">',
										'<table border="0" cellpadding="0" cellspacing="0" width="720">',
											'<tr>',
												'<td width="720">',
													'<table border="0" cellpadding="0" cellspacing="0" width="720" height="30">',
														'<tr>',
															'<td width="720" colspan="2" height="30" align="center" valign="middle"><b><span style="font-size:13pt;">미입고 도서현황</span></b></td>',
														'</tr>',
														'<tr>',
															'<td width="300" height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:10pt;"><a id="full_date"/> 기준</span></td>',
															'<td width="420" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:10pt;">',
																'<input type="button" value="새로 계산" onClick="javascript:MakeBooksNotin();">&nbsp;&nbsp;&nbsp;&nbsp;',
																'<input type="button" id="PopUpBooknotin" value=" 인쇄 "></span>',
															'</td>',
														'</tr>',
													'</table>',
												'</td>',
											'</tr>',
											'<tr>',
												'<td width="720" height="10"></td>',
											'</tr>',    
										'</table>',
									'</form>',
								'</td>',
							'</tr>',
							'<tr>',
								'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
							'</tr>',
							'<tr>',
								'<td width="720" height="10"></td>',
							'</tr>',
							'<tr>',
								'<td width="720">',
									'<table id="asBooksNotinData" border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC"></table>',
								'</td>',
							'</tr>',
							'<tr>',
								'<td width="720" height="10"> </td>',
							'</tr>',
							'<tr>',
								'<td width="720"></td>',
							'</tr>',
						'</table>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "9_프린터팝업": //전도서재고조회 -> jejak/su/505.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:120px; margin-left:15px;">',
					'<div style="width:780px; height:100px; padding:10px 0px 10px 0px;">',
						'<table id="popdata" border="0" cellpadding="0" cellspacing="0" width="700"></table>',
					'</div>',
				'</div>',
			'</div>',
		].join('');

		case "11": //전도서재고조회 -> jejak/su/505.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:120px; margin-left:15px;">',
					'<div style="width:780px; height:100px; padding:10px 0px 10px 0px;">',
						'<div id="Lay1" name="Layer1" style="display:none; position:absolute; width:300pt height:300pt; top:210pt; left:400pt;">',
							'<img src="/resources/style/images/jejak/time_02.gif" width="300" height="300" border="0">',
						'</div>',
						//'<form name="frmAdd" method="post" action="505.php">',
							'<table border="0" cellpadding="0" cellspacing="0" width="720">',
								'<tr>',
									'<td width="720">',
										'<table border="0" cellpadding="0" cellspacing="0" width="720" height="30">',
											'<tr>',
												'<td width="720" height="30" align="center" valign="middle"><b><span style="font-size:13pt;">도서 재고 현황</span></b></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720">',
										'<table border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC">',
											'<tr>',
												'<td width="90" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">수량</font></span></td>',
												'<td width="100" height="30" align="center"><p style="margin-left:0px;"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:96px;" name="wnum" onKeypress="if(event.keyCode == 13){javascript:SelAllBookStock();}"></p></td>',
												'<td width="530" height="30">&nbsp;</td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
							'</table>',
							'<table id="dataAllBookStock" border="0" cellpadding="0" cellspacing="0" width="720"></table>',
								/* '<tr>',
									'<td width="720">',
										'<table border="1" cellspacing="0" width="720" bordercolordark="white" bordercolorlight="#CCCCCC">',
											
											
											
											
											
										'</table>',
									'</td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"> </td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="2" bgcolor="#E0E0E0"></td>',
								'</tr>',
								'<tr>',
									'<td width="720" height="10"></td>',
								'</tr>',
								'<tr>',
									'<td width="720"></td>',
								'</tr>', */
							'</table>',
						'</form>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
		default:
			break;
	}
}