<template>
  <div class="inb">
    <div class="container">
      <!-- 쇼핑 내역 -->
      <div class="section">
        <div class="title">쇼핑내역</div>
        <a class="item">주문/배송조회</a>
        <a class="item">취소/교환/반품</a>
        <a class="item">영수증 확인/출력</a>
      </div>
  
      <!-- 쿠폰 -->
      <div class="section">
        <div class="title">쿠폰</div>
        <a class="item" @click="openMyCouponListModal()">
          내쿠폰 보기
          <MyCouponListModal :isModalMyCouponListOpen="isModalMyCouponListOpen" @close-modal="isModalMyCouponListOpen = false" />
        </a>
        <a class="item" @click="openCouponReceiveModal">
            쿠폰 등록
          <CouponReceiveModal :isModalCouponReceiveOpen="isModalCouponReceiveOpen" :selectedAdminId="selectedAdminId" @close-modal="isModalCouponReceiveOpen = false" />
        </a>
      </div>
  
      <!-- 관심 목록 -->
      <div class="section">
        <div class="title">관심 목록</div>
        <a class="item">위시리스트</a>
        <a class="item">재입고 알림</a>
      </div>
  
      <!-- 쇼핑 활동 -->
      <div class="section">
        <div class="title">쇼핑활동</div>
        <a class="item">상품 리뷰</a>
        <a class="item">상품 문의</a>
        <a class="item">1:1문의 내역</a>
        <a class="item">캠페인 참여내역</a>
      </div>
  
      <!-- 회원 정보 -->
      <div class="section">
        <div class="title">회원정보</div>
        <a class="item">개인정보관리</a>
        <a class="item">비밀번호 변경</a>
        <a class="item">배송지관리</a>
        <a class="item">회원탈퇴</a>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import CouponReceiveModal from "@/components/modal/CouponReceiveModal.vue";
  import MyCouponListModal from "@/components/modal/MyCouponListModal.vue";
  export default {
    components: {
      CouponReceiveModal,
      MyCouponListModal
    },
    data() {
      return {
        isModalCouponReceiveOpen: false,
        isModalMyCouponListOpen: false,
      };
    },
    methods: {
      openCouponReceiveModal() {
        this.isModalCouponReceiveOpen = true;
        console.log("List에서 클릭하면 열리는지 여부: ",this.isModalCouponReceiveOpen);
      },
      closeCouponReceiveModal() {
        this.isModalCouponReceiveOpen = false;
        console.log(this.isModalCouponReceiveOpen);
      },
      openMyCouponListModal() {
        this.isModalMyCouponListOpen = true;
        console.log("List에서 클릭하면 열리는지 여부: ",this.isModalMyCouponListOpen);
      },
      closeMyCouponListModal() {
        this.isModalMyCouponListOpen = false;
        console.log(this.isModalMyCouponListOpen);
      },
    }


  };

  </script>
  
  <style scoped>

  .inb{
    overflow: hidden;
    width: 170px;
    padding: 0 19px 20px 19px;
    padding-top: 0px;
    padding-right: 19px;
    padding-bottom: 20px;
    padding-left: 19px;
    border: 1px solid #D4D4D8;
    border-top: 2px solid #191919;

}
  .container {
    width: 210px;
    height: 828px;
    padding-bottom: 1197.50px;
    display: inline-flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
  
  .section {
    width: 170px;
    height: 120px;
    position: relative;
    border-top: 1px solid #CBD5E0;
    padding: 0 5px;
    margin-bottom: 80%; /* 각 섹션 사이의 간격 추가 */
  }
  
  .title {
    margin-top: 10%;
    font-size: 17px;
    line-height: 25px;
    color: #191919;
    font-weight: 500;
  }
  
  .item {
    height: 19px;
    position: absolute;
    font-size: 14px;
    color: #718096;
    cursor: pointer; /* 포인터 커서 추가 */
  }
  .item:hover {
    font-size: 15px;
    color: #2D3748;
  }
  .item:hover::after {
    content: " >";
  }
  
  
  .item:nth-child(2) {
    top: 50px;
  }
  
  .item:nth-child(3) {
    top: 79px;
  }
  
  .item:nth-child(4) {
    top: 108px;
  }
  
  .item:nth-child(5) {
    top: 137px;
  }
  </style>
  