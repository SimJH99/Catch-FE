<template>
  <div class="m-3 grid grid-cols-4">
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">오늘 방문자 수</div>
        <div>
          <svg @click="toggleHelp" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          <div v-if="showHelp" class="help-bubble">
            <p>이곳에 도움말 내용을 입력하세요.</p>
          </div>
        </div>
      </div>
        <div class="m-5 text-4xl font-bold text-center"> {{ visitUser}}명</div>
    </div>
    
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">신규 회원 가입</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>        
      </div>
        <div class="m-5 text-4xl font-bold text-center"> 30명 </div>
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
        visitTotal: '',
        visitUser: '',
        defaultMonth: '',
        maxMonth: '',
        monthInfo: {},
        monthSignUp: [],
      };
    },
    created() {
      this.fetchData();
      this.fetchGradeInfo();
    },
    methods: {
      async fetchData(){
      try {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const visitUserRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/visit/today/user`, { headers });
        const visitTotalRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/visit/today`, { headers });
        this.visitUser = visitUserRes.data.result.data;
        this.visitTotal = visitTotalRes.data.result.data;
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

          this.gradeInfo = gradeResponse.data.result.data;
          this.genderInfo = genderResponse.data.result.data;
          this.ageInfo = ageResponse.data.result.data;
          this.monthInfo = monthRes.data.result.data;

          for(var i = 0; i < this.gradeInfo.length; i++){
              this.grades.push(this.gradeInfo[i].grade);
              this.gradeCount.push(this.gradeInfo[i].count);
          }

          for(var j = 0; j < this.genderInfo.length; j++){
              this.genders.push(this.genderInfo[j].gender);
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
              // 배열에 해당 날짜가 존재하는지 확인하고, 존재하지 않는 경우 값을 0으로 설정
              if (!(day in this.monthSignUp)) {
                this.monthSignUp[day] = 0;
              }
          }

          this.monthChart();
          this.gradeChart();
          this.genderChart();
          this.ageChart();
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
              // 배열에 해당 날짜가 존재하는지 확인하고, 존재하지 않는 경우 값을 0으로 설정
              if (!(day in this.monthSignUp)) {
                this.monthSignUp[day] = 0;
              }
      }
      this.monthChart();
    },
    gradeChart() {
    const ctx = document.getElementById('gradeChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [this.grades[1], this.grades[0], this.grades[2], this.grades[3]],
        datasets: [{
          label: '고객 수 ',
          data: [this.gradeCount[1], this.gradeCount[0], this.gradeCount[2], this.gradeCount[3]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 159, 64, 0.2)'
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
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.genders,
        datasets: [{
          data: this.genderCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
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
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.ages,
        datasets: [{
          label: ' 연령 대 ',
          data: this.ageCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(245, 124, 0, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(0, 0, 128, 0.2)',
            'rgba(153, 102, 255, 0.2)',
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