<template>
  <footer id="footer" class="footer" style="outline: none;">
      <div class="ft_top">
          <div>
              <dl class="fnb">
                  <dd><a href="#" target="_blank" title="새창">Catch 쇼핑몰</a></dd>
                  <dd><a href="#" target="_blank" title="새창">회사소개</a></dd>
                  <dd><a href="#" target="_blank" title="새창">인재채용</a></dd>
  
                  <dd><a href="#" data-layer="lyr_cert_emp">임직원인증</a></dd>
  
                  <dd><a href="#" target="_blank" title="새창">공정거래자율준수</a></dd>
                  <dd><a href="#" target="_blank" title="새창">이용약관</a></dd>
                  <dd><a href="#" target="_blank" title="새창"><b>개인정보처리방침</b></a></dd>
                  <dd><a href="#" target="_blank" title="새창">청소년보호방침</a></dd>
                  <dd><a href="#" target="_blank" title="새창">협력사</a></dd>
              </dl>
              <dl class="fnb_sns">
                  <dd class="in"><a href="#" target="_blank" title="새창"><em class="ir"></em></a></dd>
                  <dd class="fb"><a href="#" target="_blank" title="새창"><em class="ir"></em></a></dd>
                  <dd class="ka"><a href="#" target="_blank" title="새창"><em class="ir" target="_blank" title="새창"></em></a></dd>
              </dl>
          </div>
      </div>
      <div class="ft_btm">
          <div>
              <div class="logo"><img src="@/assets/logo1.png" alt="the catch" style="height:110px; width:82px;"></div>
              <div class="info">
                  <dl>
                      <dt><strong>CATCH㈜</strong></dt>
                      <dd>대표이사 : 김선국<em class="line">서울특별시 동작구 보라매로 87, 신이빌딩 5층</em></dd>
                      <dd>사업자등록번호 : 000-00-00000<a href="#" target="_blank" title="새창" class="btn"><em>사업자정보확인</em></a>통신판매업신고 : 0000-서울동작-0000</dd>
                      <dd>호스팅서비스 사업자 : CATCH</dd>
                  </dl>
                  <dl>
                      <dt>소비자피해보상 <a href="#" target="_blank" title="새창" class="btn"><em>SGI서울보증 서비스 가입사실 확인</em></a></dt>
                      <dd>고객님은 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한 구매 안전서비스로<br>소비자 피해보상 보험 서비스를 이용하실 수 있습니다.</dd>
                  </dl>

              </div>
              <div class="etc">
                  <dl class="cst">
                      <dt><strong class="num">1234-1234</strong><a href="#" class="btn"><em>1:1 고객상담</em></a></dt>
                      
                                          <dd>평일 09:00 ~ 18:00 (주말/공휴일 휴무)</dd>
                      
                      <dd>E-mail : test@catch.com</dd>
                      
                  </dl>
              </div>
          </div>
          <address class="copy">ⓒ 2023. CATCH Corporation All rights reserved.</address>
      </div>
  </footer>
</template>

<script>
export default {
};
</script>

<style>
/* FOOTER */
.footer {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 1280px;
  background: #fff;
}

.footer .ft_top {
  height: 56px;
  border-top: #d4d4d8 1px solid;
  border-bottom: #d4d4d8 1px solid;
}

.footer .ft_top > div {
  position: relative;
  width: 1280px;
  margin: 0 auto;
  text-align: center;
}


.footer .ft_top .fnb {
  display: inline-block;
  overflow: hidden;

  position: relative;
  margin-top: 18px;
  vertical-align: top;
}

.footer .ft_top .fnb dd {
  float: left;
  position: relative;
  height: 20px;
}

.footer .ft_top .fnb dd + dd {
  margin-left: 24px;
}

.footer .ft_top .fnb dd a {
  color: #191919;
  font-size: 14px;
  line-height: 20px;
}

.footer .ft_top .fnb dd a b {
  color: #5232D9;
  font-weight: 500;
}

.footer .ft_top .fnb dd a:hover {
  text-decoration: underline;
}

.footer .ft_top .fnb dd:nth-child(2) a {
  font-weight: 500;
}

.footer .ft_top .fnb + .fnb {
  padding-left: 24px;
  margin-left: 24px;
}

.footer .ft_top .fnb + .fnb:before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  width: 1px;
  height: 10px;
  margin-top: -5px;
  background: #D4D4D8;
}

.footer .ft_top .fnb_sns {
  display: inline-block;
  overflow: hidden;
  position: relative;
  vertical-align: top;
  margin: 18px 0 0 26px;
}

.footer .ft_top .fnb_sns dd {
  float: left;
  width: 24px;
  height: 24px;
  background: url("@/assets/images/common/ft_sns.png") 0 0 no-repeat;
  margin-left: 16px;
}

.footer .ft_top .fnb_sns dd a {
  display: block;
  width: 24px;
  height: 24px;
}

.footer .ft_top .fnb_sns .fb {
  background-position: 0 -24px;
}

.footer .ft_top .fnb_sns .ka {
  background-position: 0 -48px;
}

.footer .ft_btm > div {
  position: relative;
  display: table;
  width: 1100px;
  margin: 39px auto 48px;
  padding-left: 212px;
}


.footer .ft_btm .logo {
  position: absolute;
  left: 26px;
  top: -10px;
}

.footer .ft_btm .info {
  float: left;
  width: 770px;
}

.footer .ft_btm .info dl {
  overflow: hidden;
}

.footer .ft_btm .info dt {
  margin-bottom: 11px;
  color: #191919;
  font-weight: 500;
  line-height: 1.8;
}

.footer .ft_btm .info dt strong {
  display: block;
  line-height: 0.9;
  font-size: 20px;
  font-weight: 500;
}

.footer .ft_btm .info dd {
  color: #767676;
  line-height: 1.85;
}

.footer .ft_btm .info dd .line {
  position: relative;
  padding-left: 8px;
  margin-left: 8px;
}

.footer .ft_btm .info dd .line:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #d4d4d8;
  height: 12px;
  width: 1px;
}

.footer .ft_btm .info dd:nth-child(4) {
  margin-top: 12px;
}

.footer .ft_btm .info dl + dl {
  margin-top: 11px;
}

.footer .ft_btm .info dl + dl dt {
  margin-bottom: 3px;
}

.footer .ft_btm .info dl + dl dd {
  line-height: 1.23;
  color: #767676;
}


.footer .ft_btm .mrk {
  overflow: hidden;
  margin-top: 24px;
}

.footer .ft_btm .mrk span, .footer .ft_btm .mrk a {
  display: block;
  float: left;
}

.footer .ft_btm .mrk span + span, .footer .ft_btm .mrk a + a {
  margin-left: 30px;
}

.footer .ft_btm .etc {
  float: left;
  width: 290px;
  margin-top: 6px;
}

.footer .ft_btm .etc dt {
  margin-bottom: 4px;
}

.footer .ft_btm .etc dt strong.num {
  font-family: 'Roboto Condensed';
  font-size: 24px;
  line-height: 1;
  vertical-align: middle;
}

.footer .ft_btm .etc dt .btn {
  margin-left: 20px;
}

.footer .ft_btm .etc dd {
  color: #767676;
  line-height: 1.85;
}

.footer .ft_btm .lnk {
  overflow: hidden;
  margin-top: 40px;
  clear: both;
}

.footer .ft_btm .lnk a {
  display: inline-block;
  max-width: 109px;
  text-align: center;
  vertical-align: top;
}

.footer .ft_btm .lnk a + a {
  margin-left: 40px;
}

.footer .ft_btm .lnk a span {
  display: block;
  position: relative;
  width: 100%;
  height: 104px;
}

.footer .ft_btm .lnk a span img {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%, -50%);
}

.footer .ft_btm .lnk a em {
  display: block;
  margin-top: 12px;
  line-height: 16px;
  letter-spacing: -0.60px;
}

.footer .ft_btm .lnk li {
  float: left;
  text-align: center;
  vertical-align: top;
}

.footer .ft_btm .lnk li + li {
  margin-left: 40px;
}

.footer .ft_btm .lnk li a {
  display: block;
}

.footer .ft_btm .lnk li span {
  display: block;
  position: relative;
  width: 100%;
}

.footer .ft_btm .lnk li em {
  display: block;
  line-height: 1.29;
  text-align: center;
  font-size: 14px;
  margin-top: 4px;
  letter-spacing: -0.5px;
}

.footer .bt {
  display: inline-block;
  height: 24px;
  margin: -4px 0 -4px 10px;
  padding: 0 12px;
  border: #D4D4D8 1px solid;
}

.footer .copy {
  display: block;
  height: 40px;
  line-height: 40px;
  background: #f8f8fa;
  color: #767676;
  text-align: center;
  font-size: 13px;
  font-family: NotoSansCJKkr, sans-serif;
}
</style>
