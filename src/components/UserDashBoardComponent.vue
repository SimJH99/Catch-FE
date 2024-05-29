<template>
  <div class="m-3 flex">
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border w-1/4">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">오늘 방문자 수</div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        </div>
      </div>
        <div class="mt-[52px] mb-5 text-4xl font-bold text-center h-auto"> {{ visitUser}}명</div>
    </div>
    
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border w-3/4">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">신규 회원 가입</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>        
      </div>
      <div class="grid grid-cols-3 divide-x-2 divide-gray-300">
        <div>
          <div class="font-semibold text-[17px] mt-2 ml-2 text-gray-500">일간</div>
          <div class="flex items-end place-content-center">
            <div class="ml-5 mr-2 my-5 text-4xl font-bold"> {{ this.signUpUser.dayUser }}명 </div>
            <div :class="getCountBackground( this.signUpUser.lastDayUser)"> {{ this.lastDayUser }} </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-red-500" v-if="dayColorCheck">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-blue-500" v-if="!dayColorCheck">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
            </svg>  
          </div>
        </div>
        <div>
          <div class="font-semibold text-[17px] mt-2 ml-2 text-gray-500">주간</div>
          <div class="flex items-end place-content-center">
            <div class="ml-5 mr-2 my-5 text-4xl font-bold"> {{ this.signUpUser.weekUser }}명 </div>
            <div :class="getCountBackground( this.signUpUser.lastWeekUser)"> {{ this.lastWeekUser }} </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-red-500" v-if="weekColorCheck">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-blue-500" v-if="!weekColorCheck">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
            </svg>
          </div>
        </div>
        <div>
          <div class="font-semibold text-[17px] mt-2 ml-2 text-gray-500">월간</div>
          <div class="flex items-end place-content-center">
            <div class="ml-5 mr-2 my-5 text-4xl font-bold"> {{ this.signUpUser.monthUser }}명 </div>
            <div :class="getCountBackground( this.signUpUser.lastMonthUser)"> {{ this.lastMonthUser }} </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-red-500" v-if="monthColorCheck">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-blue-500" v-if="!monthColorCheck">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  <div class="m-3 grid grid-cols-3">
    <div class="bg-white m-2 p-2 rounded-md shadow-md border">
      <div class="m-2 text-2xl font-bold">등급 별 고객 수</div>
      <div class="m-2 p-4">
        <canvas id="gradeChart"></canvas>
      </div>
    </div>
    <div class="bg-white m-2 p-2 rounded-md shadow-md border">
      <div class="m-2 text-2xl font-bold">고객 남녀 비율</div>
      <div class="m-2 p-4">
        <canvas id="genderChart"></canvas>
      </div>
    </div>
    <div class="bg-white m-2 p-2 rounded-md shadow-md border">
      <div class="m-2 text-2xl font-bold">연령 대 별 고객 수</div>
      <div class="m-2 p-4">
        <canvas id="ageChart"></canvas>
      </div>
    </div>
  </div>

  <div class="m-3 grid grid-cols-2">
    <div class="bg-white m-2 p-2 rounded-md shadow-md border">
      <div class="flex">
        <div class="m-2 text-2xl font-bold">일별 회원가입 수</div>
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
        <div class="m-2 text-2xl font-bold">월별 회원가입 수</div>
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
  
</template>
  
<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
  export default {
    data() {
      return{
        gradeInfo: {},
        grades: [],
        gradeCount: [],
        genderInfo: {},
        genders: [],
        genderCount: [],
        ageInfo: {},
        ages: [],
        ageCount: [],
        showHelp: false,
        statusCount: [],
        visitUser: '',
        defaultMonth: '',
        maxMonth: '',
        monthInfo: {},
        monthSignUp: [],
        years: [],
        defaultYear: '',
        yearInfo: {},
        yearSignUp: [],
        signUpUser: {},
        lastDayUser:'',
        lastWeekUser:'',
        lastMonthUser:'',
        dayColorCheck: false,
        weekColorCheck: false,
        monthColorCheck: false,
      };
    },
    created() {
      this.fetchData();
      this.fetchGradeInfo();
      this.createYearOptions();
    },
    methods: {
      async fetchData(){
      try {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const visitUserRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/visit/today/user`, { headers });
        const signUpUserRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/signUp/user`, { headers });
        this.visitUser = visitUserRes.data.result.data;
        this.signUpUser = signUpUserRes.data.result.data;
        console.log(this.signUpUser);

        if(this.signUpUser.lastDayUser >= 0){
          this.dayColorCheck = true;
        }

        if(this.signUpUser.lastWeekUser >= 0){
          this.weekColorCheck = true;
        }

        if(this.signUpUser.lastMonthUser >= 0){
          this.monthColorCheck = true;
        }

        this.lastDayUser = this.signUpUser.lastDayUser >= 0 ? '+' + this.signUpUser.lastDayUser : this.signUpUser.lastDayUser.toString();
        this.lastWeekUser = this.signUpUser.lastWeekUser >= 0 ? '+' + this.signUpUser.lastWeekUser : this.signUpUser.lastWeekUser.toString();
        this.lastMonthUser = this.signUpUser.lastMonthUser >= 0 ? '+' + this.signUpUser.lastMonthUser : this.signUpUser.lastMonthUser.toString();

      } catch (error) {
        console.log(error);
      }
    },
      toggleHelp() {
            this.showHelp = !this.showHelp; // showHelp 값을 토글
      },
      async fetchGradeInfo() {
        try {
          this.defaultMonth = this.getCurrentYearMonth();
          this.maxMonth = this.defaultMonth;
          this.defaultYear = this.getCurrentYear();

          const token = localStorage.getItem('access_token');
          const headers = { Authorization: `Bearer ${token}`} ;
          const gradeResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/grade`, { headers });
          const genderResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/gender`, { headers });
          const ageResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/age`, { headers });
          const monthData = {month: this.defaultMonth};
          const monthRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/signUp/month`, monthData, { headers });
          const yearData = {year: this.defaultYear};
          const yearRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/signUp/year`, yearData, { headers });
          this.gradeInfo = gradeResponse.data.result.data;
          this.genderInfo = genderResponse.data.result.data;
          this.ageInfo = ageResponse.data.result.data;
          this.monthInfo = monthRes.data.result.data;
          this.yearInfo = yearRes.data.result.data;

          for(var i = 0; i < this.gradeInfo.length; i++){
              this.grades.push(this.gradeInfo[i].grade);
              this.gradeCount.push(this.gradeInfo[i].count);
          }

          for(var j = 0; j < this.genderInfo.length; j++){
              this.genders.push(this.formatGender(this.genderInfo[j].gender));
              this.genderCount.push(this.genderInfo[j].count);
          }

          for(var k = 0; k < this.ageInfo.length; k++){
              this.ages.push(this.ageInfo[k].ageGroup);
              this.ageCount.push(this.ageInfo[k].count);
          }

          this.monthSignUp = this.groupDataByMonth(this.monthInfo);

          const currentDate = new Date();

          let lastMonth = new Date(currentDate);
          lastMonth.setMonth(lastMonth.getMonth() - 1);

          let lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
          let lastDayOfMonth = lastDayOfLastMonth.getDate();

          for (let day = 1; day <= lastDayOfMonth; day++) {
              if (!(day in this.monthSignUp)) {
                this.monthSignUp[day] = 0;
              }
          }

          this.yearSignUp = this.groupYearByCategory(this.yearInfo);

          for (let month = 1; month <= 12; month++) {
              if (!(month in this.yearSignUp)) {
                this.yearSignUp[month] = 0;
              }
          }

          this.monthChart();
          this.gradeChart();
          this.genderChart();
          this.ageChart();
          this.yearChart();
        } catch (error) {
          console.log(error);
        }
    },
    getCurrentYearMonth() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 만듭니다.
      return `${year}-${month}`;
    },
    getCurrentYear() {
      return new Date().getFullYear();
    },
    groupDataByMonth(data) {
      const groupedData = {};
      data.forEach(item => {
          const day = item.day;
          groupedData[day] = item.count;
      });
      return groupedData;
    },
    async findMonth(){
      this.monthInfo = {},
      this.monthSignUp = {};
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const registerData = {month: this.defaultMonth};
      const monthRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/signUp/month`, registerData, { headers });
      this.monthInfo = monthRes.data.result.data;
      this.monthSignUp = this.groupDataByMonth(this.monthInfo);
      
      const currentDate = new Date();

      let lastMonth = new Date(currentDate);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      let lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
      let lastDayOfMonth = lastDayOfLastMonth.getDate();

      for (let day = 1; day <= lastDayOfMonth; day++) {
        if (!(day in this.monthSignUp)) {
          this.monthSignUp[day] = 0;
        }
      }
      this.monthChart();
    },
    createYearOptions() {
      var currentYear = this.getCurrentYear();

      for (var year = 1970; year <= currentYear; year++) {
          this.years.push(year);
      }
    },
    groupYearByCategory(data) {
      const groupedData = {};
      data.forEach(item => {
          const month = item.month;
          groupedData[month] = item.count;
      });
      return groupedData;
    },
    async findYear(){
      this.yearInfo = {},
      this.yearSignUp = {};
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const registerData = {year: this.defaultYear};
      const yearRes = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/signUp/year`, registerData, { headers });
      this.yearInfo = yearRes.data.result.data;
      this.yearSignUp = this.groupYearByCategory(this.yearInfo);

      for (let month = 1; month <= 12; month++) {
        if (!(month in this.yearSignUp)) {
          this.yearSignUp[month] = 0;
        }
      }

      this.yearChart();
    },
    getCountBackground(count){
      return {
        'my-5 text-xl text-red-500': count >= 0, 
        'my-5 text-xl text-blue-500': count < 0 // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    formatGender(status) {
      switch (status) {
        case "FEMALE":
          return "여성";
        case "MALE":
          return "남성";
        default:
          return status;
      }
    },
    gradeChart() {
    const ctx = document.getElementById('gradeChart').getContext('2d');
    if (Chart.getChart(ctx)) {
        Chart.getChart(ctx)?.destroy();
    }
    if (!ctx) {
      return;
    }
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [this.grades[1], this.grades[0], this.grades[2], this.grades[3]],
        datasets: [{
          label: '고객 수 ',
          data: [this.gradeCount[1], this.gradeCount[0], this.gradeCount[2], this.gradeCount[3]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
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
  genderChart() {
    const ctx = document.getElementById('genderChart').getContext('2d');
    if (Chart.getChart(ctx)) {
        Chart.getChart(ctx)?.destroy();
    }
    if (!ctx) {
      return;
    }
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.genders,
        datasets: [{
          label: '고객 수 ',
          data: this.genderCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
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
  ageChart() {
    const ctx = document.getElementById('ageChart').getContext('2d');
    if (Chart.getChart(ctx)) {
        Chart.getChart(ctx)?.destroy();
    }
    if (!ctx) {
      return;
    }
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.ages,
        datasets: [{
          label: ' 연령 대 ',
          data: this.ageCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(245, 124, 0, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(0, 0, 128, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(245, 124, 0, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(0, 0, 128, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
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
      type: 'line',
      data: {
        labels: '',
        datasets: [
          {
          label: '가입 수',
          data: this.monthSignUp,
          lineTension: 0.5,
          backgroundColor: [
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        },
        ]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            y: {
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
      type: 'line',
      data: {
        labels: '',
        datasets: [
          {
          label: '가입 수',
          data: this.yearSignUp,
          lineTension: 0.5,
          backgroundColor: [
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        },
        ]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            y: {
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

<style scoped>
.help-bubble {
position: absolute;
transform: translateX(-50%);
background-color: #ffffff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
padding: 10px;
border-radius: 4px;
}
</style>