function jmenu5(val) { //잡물제작진행
	switch (val) {
		case "0": //제작계획표 -> jejak/jj/mlist_jab.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:880px; height:171px; margin-left:15px;">',
					'<div style="width:880px; height:151px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
							'<form name="jeform" method="post" action="mlist_jab.php">',
								'<tr>',
									'<td width="780" height="20"><span style="font-size:9pt;"><b>- ', 
										'<select name="ty" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
										'</select>&nbsp;년 &nbsp;&nbsp;',
										'<select name="tm" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
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
										'</select>&nbsp;월&nbsp;&nbsp;',
										'<select name="td" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(13);">',
										'</select>&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;잡물&nbsp;제작&nbsp;계획표</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
										'<input type="button" value=" 인 쇄 " onClick="javascript:PrintAll(<?=$sy?>,<?=$sm?>,<?=$sd?>);">',
									'</td>',
								'</tr>',
							'</form>',
								'<tr>',
									'<td width="780" height="10" align="right" valign="top"><span style="font-size:9pt;">총&nbsp;&nbsp;<?=$total_record?> 건&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;page : <?=$page?>&nbsp;/&nbsp;<?=$total_page?></span></td>',
								'</tr>',
								'<tr>',
									'<td width="780" align="left" valign="top">',
										'<table border="0" cellspacing="0" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0">',
											'<tr>',
												'<td width="780"><img src="/resources/style/images/jejak/titleimg_m_plan.gif" width="880" height="58" border="0"></td>',
											'</tr>',
											'<tr>',
												'<td width="780" height="5"></td>',
											'</tr>',
											'<tr>',
												'<td width="780" align="center" valign="middle">',
													'<!-- 표시작 -->',
													'<table border="0" cellspacing="0" width="880" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" style="border-top-width:2px; border-bottom-width:1px; border-top-color:black; border-bottom-color:black; border-top-style:solid; border-bottom-style:solid;">',
														'<tr>',
															'<td width="880" colspan="3" height="5"></td>',
														'</tr>',			
													'</table>',
													'<table id="jmJejakplanData" border="0" cellspacing="0" width="880" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" style="border-top-width:2px; border-bottom-width:1px; border-top-color:black; border-bottom-color:black; border-top-style:solid; border-bottom-style:solid;"></table>',
													'<!-- 표 끝 -->',
												'</td>',
											'</tr>',
											'<tr>',
												'<td height="40" align="center" valign="bottom"><span style="font-size:9pt;"></span></td>',
											'</tr>',
										'</table>',
									'</td>',
								'</tr>',
						'</table>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "1": //표지작업지시서 -> jejak/jj/ji_pyo_jab.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:138px; margin-left:15px;">',
					'<div style="width:780px; height:118px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
							'<form name="jeform" method="post" action="ji_pyo_jab.php">',
								'<tr>',
									'<td width="780" height="40" colspan="2"><span style="font-size:9pt;"><b>- ', 
									'<select name="ty" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
									'</select>&nbsp;년&nbsp;&nbsp;',
									'<select name="tm" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
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
									'</select>&nbsp;월&nbsp;&nbsp;',
									'<select name="td" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(14);">',
									'</select>&nbsp;일&nbsp;&nbsp;잡물 표지 작업 지시서</b></span></td>',
								'</tr>',
							'</form>',
								'<tr>',
									'<td width="390" height="25">',
										'<p style="margin-left:10px;"><span style="font-size:9pt;"><b><font color="#666666">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;삼광사&nbsp;&nbsp;&nbsp;귀하 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="time_result"></a></font></b></span></p>',
										'<script type="text/javascript">',
											'var d = new Date();',
											'var currentTime = d.getFullYear() + " 년 " + ( d.getMonth() + 1 ) + " 월 " + d.getDate() + " 일 ";',
											'var result = document.getElementById("time_result");',
											'result.innerHTML = currentTime;',
										'</script>',
									'</td>',
									'<td width="390" height="25" align="right" style="padding-right:20;"><input type="button" value=" 인쇄용 " onClick="javascript:Print_All(<?=$ty?>, <?=$tm?>, <?=$td?>);"></td>',
								'</tr>',
								'<tr>',
									'<td width="780" align="left" valign="top" colspan="2">',
										'<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">',
											'<tr>',
												'<td width="200" align="center" valign="middle" bgcolor="#F4F4F4" height="50" rowspan="2"><p><span style="font-size:9pt;">건명</span></p></td>',
												'<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">부수</span></td>',
												'<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">구분</span></td>',
												'<td width="180" height="25" align="center" valign="middle" bgcolor="#F4F4F4" colspan="3"><span style="font-size:9pt;">용지사용</span></td>',
												'<td width="30" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">절수</span></p></td>',
												'<td width="30" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">색도</span></p></td>',
												'<td width="80" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">작업인계처</span></p></td>',
												'<td width="180" height="50" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><p><span style="font-size:9pt;">비고</span></p></td>',
											'</tr>',
											'<tr>',
												'<td width="59" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">지질</span></td>',
												'<td width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정미</span></td>',
												'<td width="60" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">여분</span></td>',
											'</tr>',
										'</table>',
										'<table id="jmPyoData" border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
									'</td>',
								'</tr>',
						'</table>',
					'</div>',
				'</div>',
			'</div>',
			].join('');

		case "2": //본문작업지시서 -> jejak/jj/ji_bon_jab.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:129px; margin-left:15px;">',
					'<div style="width:780px; height:109px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
							'<form name="jeform" method="post" action="ji_bon_jab.php">',
								'<tr>',
									'<td width="580" height="40"><span style="font-size:9pt;"><b>- ', 
										'<select name="ty" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
										'</select>&nbsp;년&nbsp;&nbsp;',
										'<select name="tm" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
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
										'</select>&nbsp;월&nbsp;&nbsp;',
										'<select name="td" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(15);">',
										'</select>&nbsp;일&nbsp;&nbsp;잡물 본문 작업 지시서</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
										'<input type="button" value="모두 인쇄" onClick="javascript:PrintAll(<?=$ty?>,<?=$tm?>,<?=$td?>)">',
									'</td>',								
								'</tr>',
							'</form>',
								'<tr>',
									'<td width="780" align="left" valign="top">',
										'<table border="0" cellspacing="1" width="784" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">',
											'<tr>',
												'<td width="60" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><p><span style="font-size:9pt;">번호</span></p></td>',
												'<td width="100" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작일</span></td>',
												'<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서코드</span></td>',
												'<td width="360" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>',
												'<td width="84" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄</span></td>',
												'<td width="84" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제본</span></td>',
											'</tr>',
										'</table>',
										'<table id="jmBonData" border="0" cellspacing="1" width="784" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
									'</td>',
								'</tr>',
						'</table>',											
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "본문작업지시서_디테일": //본문작업지시서_디테일
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:129px; margin-left:15px;">',
					'<div style="width:780px; height:109px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
						    '<tr>',
						        '<td width="780" height="40" colspan="2"><span style="font-size:9pt;"><b>- 본문작업지시서</b></span></td>',
						    '</tr>',
						    '<tr>',
						        '<td width="390" height="25"><p style="margin-left:10px;"><span style="font-size:9pt;"><b><font color="#666666">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="wcname2"></a>&nbsp;&nbsp;귀하 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="jbdate"></a></font></b></span></p></td>',
						        '<td width="390" height="25" align="right">&nbsp;</td>',
						    '</tr>',
						    '<tr>',
						        '<td width="780" align="left" valign="top" colspan="2">',
						        	'<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">',
						                '<tr>',
						                    '<td width="90" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><p><span style="font-size:9pt;">도서명</span></p></td>',
						                    '<td width="270" height="30" align="center" valign="middle" bgcolor="white" colspan="3"><span style="font-size:9pt;"><a id="jbname"></a></span></td>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">메뉴</span></td>',
						                    '<td width="330" height="30" align="left" valign="middle" bgcolor="white">',
						                        '<p style="margin-left:10px;"><span style="font-size:9pt;"><input type="button" value=" 인 쇄 " onClick="javascript:PrintAll(<?=$uid?>);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
						                        '<input type="submit" value=" 수 정 "></span></p>',
						                    '</td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">지질</span></td>',
						                    '<td width="270" height="30" align="center" valign="middle" bgcolor="white" colspan="3"><span style="font-size:9pt;"><a id="yjname_yjcode"></a></span></td>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판수</span></td>',
						                    '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a id="pannum5"></a></span></td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작구분</span></td>',
						                    '<td width="270" height="30" align="center" valign="middle" bgcolor="white" colspan="3"><span style="font-size:9pt;"><a id="typegubn"></a></span></td>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>',
						                    '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a id="jbamnt"></a> 부</span></td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="90" height="40" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">구분</span></td>',
						                    '<td width="90" height="40" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">대수</span></td>',
						                    '<td width="180" height="20" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">용지사용</span></td>',
						                    '<td width="90" height="40" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">색도</span></td>',
						                    '<td width="330" height="40" align="center" valign="middle" bgcolor="#F4F4F4" rowspan="2"><span style="font-size:9pt;">비고</span></td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="90" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">정미</span></td>',
						                    '<td width="90" height="20" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">여분</span></td>',
						                '</tr>',
						            '</table>',
						            '<table id="jpBonDetailData" border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
						            '<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">',
						                '<input type="hidden" name="uids[]" value="<?=$row3[uid]?>">',
						                '<tr>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">합계</span></td>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">',
						                        '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SU1" value=""> R', 
						                        '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SU2" value=""></span></td>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">',
						                        '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SU3" value=""> R', 
						                        '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SU4" value=""></span></td>',
						                    '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">',
						                        '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SU5" value=""> R', 
						                        '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="SU6" value=""></span></td>',
						                    '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">사진작업완료일시</span></td>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="white" colspan="2"><span style="font-size:9pt;"></span></td>',
						                    '<td width="420" height="120" align="center" valign="middle" bgcolor="white" rowspan="4" colspan="2"><textarea id="comment" cols="60" rows="10" name="comm"></textarea></td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">인쇄완료일시</span></td>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="white" colspan="2"><span style="font-size:9pt;"><a id="pwan"></a></span></td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">작업인계처</span></td>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="white" colspan="2"><span style="font-size:9pt;"><a id="wcname"></a></span></td>',
						                '</tr>',
						                '<tr>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="#F4F4F4" colspan="2"><span style="font-size:9pt;">인계수량</span></td>',
						                    '<td width="180" height="30" align="center" valign="middle" bgcolor="white" colspan="2">&nbsp;</td>',
						                '</tr>',
						            '</table>',
						        '</td>',
						    '</tr>',
						'</table>',								
					'</div>',
				'</div>',
			'</div>',
			].join('');

		case "3": //발주서 -> jejak/jj/bal_list_jab.php
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:91px; margin-left:15px;">',
					'<div style="width:780px; height:72px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
							'<form name="jeform" method="post" action="bal_list_jab.php">',
								'<tr>',
									'<td width="782" height="40"><span style="font-size:9pt;"><b>- ', 
										'<select name="ty" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
										'</select>&nbsp;년&nbsp;',
										'<select name="tm" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(12);">',
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
										'</select>&nbsp;월&nbsp;',
										'<select name="td" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:ChangeDate(16);">',
										'</select>&nbsp;일&nbsp;&nbsp;잡물 발주서 리스트</b></span>',
									'</td>',
								'</tr>',
							'</form>',
								'<tr>',
									'<td width="780">',
										'<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">',
											'<tr>',
												'<td width="100" align="center" valign="middle" bgcolor="#F4F4F4" height="30"><span style="font-size:9pt;">년월일</span></td>',
												'<td width="440" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>',
												'<td width="115" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>',
												'<td width="120" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">건수</span></td>',
											'</tr>',
										'</table>',
										'<table id="jmBalData" border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
									'</td>',
								'</tr>',
						'</table>',				
					'</div>',
				'</div>',
			'</div>',
			].join('');
			
		case "발주서_디테일": 
			return [
			'<div style="width:810px; height:815px;">',
				'<div style="width:780px; height:91px; margin-left:15px;">',
					'<div style="width:780px; height:72px; padding:10px 0px 10px 0px;">',
						'<table border="0" cellpadding="0" cellspacing="0" width="780">',
						    '<tr>',
						        '<td width="780" height="40" colspan="2" align="center"><span style="font-size:13pt;"><b>발주서</b></span></td>',
						    '</tr>',
						    '<tr>',
						        '<td width="390" height="25"><p style="margin-left:10px;"><span style="font-size:9pt;"><b><!--<font color="#666666">date&nbsp;:&nbsp;&nbsp;</font>&nbsp;&nbsp;&nbsp;-->&nbsp;&nbsp;<font color="#666666"><a id="full_date"></a></font></b></span></p></td>',
						        '<td width="390" height="25" align="right"><p style="margin-right:10px;"><span style="font-size:9pt;"><a id="wcname"></a><font color="#666666"></font><b><font color="#666666">&nbsp;&nbsp;귀하</font></b></span></p></td>',
						    '</tr>',
						    '<tr>',
						        '<td width="780" align="left" valign="top" colspan="2">',
						        	'<table id="jmBalDetailData1" border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
									'<table id="jmBalDetailData2" border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC"></table>',
						        '</td>',
						    '</tr>',
						'</table>',
						'<p>',
						'<center>',
							'<input type="button" value=" 인 쇄 용 보 기 " onClick="javascript:PrintIt();">',
						'</center>',
					'</div>',
				'</div>',
			'</div>',
			].join('');
		default:
			break;
	}
}