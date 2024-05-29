<template>
  <div>
    <div class="m-2 grid grid-cols-3">
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">미 답변 문의글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center">{{statusCount[0]}} 개</div>
      </div>
      
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">답변 완료 문의글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> {{statusCount[1]}} 개</div>
      </div>

      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">오늘 작성된 문의글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> {{ todayInfo }} 개</div>
      </div>
    </div>

    <div class="m-2 grid grid-cols-2">
      <div class="bg-white m-2 p-2 rounded-md shadow-md border">
        <div class="m-2 text-2xl font-bold">문의글 답변 상태</div>
        <div class="m-2 p-4">
          <canvas id="statusChart"></canvas>
        </div>
      </div>

      <div class="bg-white m-2 p-2 rounded-md shadow-md border">
        <div class="m-2 text-2xl font-bold">카테고리별 문의글</div>
        <div class="m-2 p-4">
          <canvas id="categoryChart"></canvas>
        </div>
      </div>

      <div class="bg-white m-2 p-2 rounded-md shadow-md border">
        <div class="flex">
          <div class="m-2 text-2xl font-bold">일별 문의글 작성 수</div>
          <input type="month" class="ml-3 outline-none" v-model="defaultMonth" :max="maxMonth">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 self-center cursor-pointer" @click="findMonth()">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>    
        </div>
        <div class="m-2 p-4">
          <canvas id="monthChart"></canvas>
        </div>
      </div>

      <div class="bg-white m-2 p-2 rounded-md shadow-md border">
        <div class="flex">
          <div class="m-2 text-2xl font-bold">월별 문의글 작성 수</div>
          <select id="year" v-model="defaultYear" class="ml-3 outline-none">
            <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 self-center cursor-pointer" @click="findYear()">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>    
        </div>
        <div class="m-2 p-4">
          <canvas id="yearChart"></canvas>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from '@/axios/index';
import Chart from 'chart.js/auto';
export default {
  data () {
    return {
      statusInfo: [],
      complaintStatus: [],
      statusCount: [],
      todayInfo:'',
      categoryInfo: {},
      categories: [],
      categoryCount: [],
      monthInfo: {},
      monthCategory: {},
      defaultMonth: '',
      maxMonth: '',
      years: [],
      defaultYear: '',
      yearInfo: {},
      yearCategory: {},
    }
  },
  created(){
    this.fetchComplaint();
    this.createYearOptions();
  },
  methods: {
    async fetchComplaint(){
      try {
        this.defaultMonth = this.getCurrentYearMonth();
        this.maxMonth = this.defaultMonth;
        this.defaultYear = this.getCurrentYear();
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const statusRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countStatus`, { headers });
        const todayRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countToday`, { headers });
        const categoriesRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countCategory`, { headers });
        const monthData = {month: this.defaultMonth};
        const monthRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/countMonth`, monthData, { headers });
        const yearData = {year: this.defaultYear};
        const yearRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/countYear`, yearData, { headers });
        this.statusInfo = statusRes.data.result.data;
        this.todayInfo = todayRes.data.result.data;
        this.categoryInfo = categoriesRes.data.result.data;
        this.monthInfo = monthRes.data.result.data;
        this.yearInfo = yearRes.data.result.data;

        if(this.statusInfo.length == 1){
          this.complaintStatus.push(this.formatRole(this.statusInfo[0][0]));
          this.complaintStatus.push('답변 완료');
          this.statusCount.push(this.statusInfo[0][1]);
          this.statusCount.push(0);
        }else{
            for(var i = 0; i < this.statusInfo.length; i++){
            this.complaintStatus.push(this.formatRole(this.statusInfo[i][0]));
            this.statusCount.push(this.statusInfo[i][1]);
          }
        }

        for(var j = 0; j < this.categoryInfo.length; j++){
          this.categories.push(this.formatCategory(this.categoryInfo[j].category));
          this.categoryCount.push(this.categoryInfo[j].count);
        }

        if(this.todayInfo == null){
          this.todayInfo.push(0);
        }

        const currentDate = new Date();

        // 현재 날짜의 지난 달
        let lastMonth = new Date(currentDate);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        
        // 지난 달의 마지막 날 계산
        let lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
        let lastDayOfMonth = lastDayOfLastMonth.getDate();

        this.monthCategory = this.groupDataByCategory(this.monthInfo);

        Object.values(this.monthCategory).forEach(categoryData => {
            for (let day = 1; day <= lastDayOfMonth; day++) {
                if (!(day in categoryData)) {
                    categoryData[day] = 0;
                }
            }
        });

        this.yearCategory = this.groupYearByCategory(this.yearInfo);

        Object.values(this.yearCategory).forEach(categoryData => {
            for (let month = 1; month <= 12; month++) {
                if (!(month in categoryData)) {
                    categoryData[month] = 0;
                }
            }
        });

        this.statusChart();
        this.categoryChart();
        this.monthChart();
        this.yearChart();
        }
      catch (error) {
        console.log(error);
      }
    },
    async findMonth(){
      this.monthInfo = {},
      this.monthCategory = {};
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const registerData = {month: this.defaultMonth};
      const monthRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/countMonth`, registerData, { headers });
      this.monthInfo = monthRes.data.result.data;
      this.monthCategory = this.groupDataByCategory(this.monthInfo);
      const currentDate = new Date();

      let lastMonth = new Date(currentDate);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      let lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
      let lastDayOfMonth = lastDayOfLastMonth.getDate();

      Object.values(this.monthCategory).forEach(categoryData => {
          for (let day = 1; day <= lastDayOfMonth; day++) {
              if (!(day in categoryData)) {
                  categoryData[day] = 0;
              }
          }
      })
      this.monthChart();
    },
    async findYear(){
      this.yearInfo = {},
      this.yearCategory = {};
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const registerData = {year: this.defaultYear};
      const yearRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/countYear`, registerData, { headers });
      this.yearInfo = yearRes.data.result.data;
      this.yearCategory = this.groupYearByCategory(this.yearInfo);

      Object.values(this.yearCategory).forEach(categoryData => {
          for (let month = 1; month <= 12; month++) {
              if (!(month in categoryData)) {
                  categoryData[month] = 0;
              }
          }
      });

      this.yearChart();
    },
    getCurrentYear() {
      return new Date().getFullYear();
    },
    createYearOptions() {
      var currentYear = this.getCurrentYear();

      for (var year = 1970; year <= currentYear; year++) {
          this.years.push(year);
      }
    },
    getCurrentYearMonth() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 만듭니다.
      return `${year}-${month}`;
    },
    groupDataByCategory(data) {
      const groupedData = {};
      data.forEach(item => {
          const categoryName = item.category;
          if (!groupedData[categoryName]) {
              groupedData[categoryName] = {};
          }
          const day = item.day;
          groupedData[categoryName][day] = item.count;
      });
      return groupedData;
    },
    groupYearByCategory(data) {
      const groupedData = {};
      data.forEach(item => {
          const categoryName = item.category;
          if (!groupedData[categoryName]) {
              groupedData[categoryName] = {};
          }
          const day = item.day;
          groupedData[categoryName][day] = item.count;
      });
      return groupedData;
    },
    formatRole(status) {
      switch (status) {
        case "BEFORE":
          return "답변 없음";
        case "REPLY":
          return "답변 완료";
        default:
          return status;
      }
    },
    formatCategory(category) {
      switch (category) {
        case "CANCEL/EXCHANGE/REFUND":
          return "취소/교환/환불";
        case "CONFIRMATION":
          return "상품확인";
        case "DELIVERY":
          return "배송";
        case "MYINFO":
          return "회원정보";
        case "ORDER":
          return "주문/결제";
        case "SERVICE":
          return "서비스";
        default:
          return category;
      }
    },
    statusChart() {
      const ctx = document.getElementById('statusChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.complaintStatus,
          datasets: [{
            label: '문의글 수 ',
            data: this.statusCount,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(75, 192, 192, 0.7)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 0
          }]
        },
        options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            x: { 
                display: false // x축의 선을 숨김
            },
            y: { 
                beginAtZero: true,
                display: false // y축의 선을 숨김
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        }
    },});
    },
    categoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.categories,
        datasets: [{
          label: '문의 수 ',
          data: this.categoryCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            x: {
              grid: {
                  display: false
             } 
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                  stepSize: 1
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        }
      }
    });
  },
  monthChart() {
    const ctx = document.getElementById('monthChart').getContext('2d');
        if (Chart.getChart(ctx)) {
        Chart.getChart(ctx)?.destroy();
      }
      if (!ctx) {
        return;
      }
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.lastMonthDates,
        datasets: [
          {
          label: '취소/교환/환불',
          data: this.monthCategory['CANCEL/EXCHANGE/REFUND'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '상품확인',
          data: this.monthCategory['CONFIRMATION'],
          backgroundColor: [
            'rgba(245, 124, 0, 0.4)',
          ],
          borderColor: [
            'rgba(245, 124, 0, 1)',
          ],
          borderWidth: 1
        } 
        ,{
          label: '배송',
          data: this.monthCategory['DELIVERY'],
          backgroundColor: [
            'rgba(255, 206, 86, 0.4)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '회원정보',
          data: this.monthCategory['MYINFO'],
          backgroundColor: [
            'rgba(75, 192, 192, 0.4)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '주문/결제',
          data: this.monthCategory['ORDER'],
          backgroundColor: [
            'rgba(54, 162, 235, 0.4)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '서비스',
          data: this.monthCategory['SERVICE'],
          backgroundColor: [
            'rgba(153, 102, 255, 0.4)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }
        ]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            x: {
              stacked: true,
              grid: {
                  display: false
              }
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                  stepSize: 1
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        }
      }
    });
  },
  yearChart() {
    const ctx = document.getElementById('yearChart').getContext('2d');
        if (Chart.getChart(ctx)) {
        Chart.getChart(ctx)?.destroy();
      }
      if (!ctx) {
        return;
      }
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: '',
        datasets: [
          {
          label: '취소/교환/환불',
          data: this.yearCategory['CANCEL/EXCHANGE/REFUND'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '상품확인',
          data: this.yearCategory['CONFIRMATION'],
          backgroundColor: [
            'rgba(245, 124, 0, 0.4)',
          ],
          borderColor: [
            'rgba(245, 124, 0, 1)',
          ],
          borderWidth: 1
        } 
        ,{
          label: '배송',
          data: this.yearCategory['DELIVERY'],
          backgroundColor: [
            'rgba(255, 206, 86, 0.4)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '회원정보',
          data: this.yearCategory['MYINFO'],
          backgroundColor: [
            'rgba(75, 192, 192, 0.4)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '주문/결제',
          data: this.yearCategory['ORDER'],
          backgroundColor: [
            'rgba(54, 162, 235, 0.4)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '서비스',
          data: this.yearCategory['SERVICE'],
          backgroundColor: [
            'rgba(153, 102, 255, 0.4)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }
        ]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            x: {
              stacked: true,
              grid: {
                  display: false
              }
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                  stepSize: 1
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        }
      }
    });
  },
  }
}
</script>

<style>

</style>