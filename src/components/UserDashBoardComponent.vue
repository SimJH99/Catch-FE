<template>
  <div class="m-3 grid grid-cols-5">
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">총 방문 수</div>
        <div>
          <svg @click="toggleHelp" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          <div v-if="showHelp" class="help-bubble">
            <p>이곳에 도움말 내용을 입력하세요.</p>
          </div>
        </div>
      </div>
      <a href="/userList">
        <div class="m-5 text-4xl font-bold text-center"> {{ visitTotal }}번</div>
      </a>
    </div>
    
    
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">미 답변 게시글</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
      </div>
      <a href="/complaintList">
        <div class="m-5 text-4xl font-bold text-center"> {{ statusCount }}개</div>
      </a>
    </div>
    
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">발행 중인 쿠폰</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
      </div>
      <a href="/couponList">
        <div class="m-5 text-4xl font-bold text-center"> {{ publishCoupon }}개</div>
      </a>
    </div>
    
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">총 발송 건수</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      </div>
      <a href="">
        <div class="m-5 text-4xl font-bold text-center"> {{ emailTotal }}건 </div>
      </a>
    </div>
    
    <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border">
      <div class="flex">
        <div class="text-xl font-bold text-gray-500 mr-2">총 알림 건수</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
        </svg>
      </div>
      <a href="">
        <div class="m-5 text-4xl font-bold text-center"> 30건 </div>
      </a>
    </div>
  </div>
  
  
  <div class="m-3 grid grid-cols-2">
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
      <div class="m-2 text-2xl font-bold">요일별 로그인 수</div>
      <div class="m-2 p-4">
        <canvas id="loginChart"></canvas>
      </div>
    </div>
    <div class="bg-white m-2 p-2 rounded-md shadow-md border">
      <div class="m-2 text-2xl font-bold">연령 대 별 고객 수</div>
      <div class="m-2 p-4">
        <canvas id="ageChart"></canvas>
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
        dayInfo: {},
        days:[],
        dayCount: [],
        showHelp: false,
        statusCount: [],
        publishCoupon: '',
        visitTotal: '',
        emailTotal: '',
      };
    },
    created() {
      this.fetchData();
    },
    mounted() {
      this.fetchGradeInfo();
    },
    methods: {
      async fetchData(){
      try {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const statusCountRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countStatus`, { headers });
        const publishCouponRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/publish/count`, { headers });
        const visitTotalRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/visit/total`, { headers });
        const emailTotalRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/email/total`, { headers });
        this.statusCount = statusCountRes.data.result.data[0][1];
        this.publishCoupon = publishCouponRes.data.result.data;
        this.visitTotal = visitTotalRes.data.result.data;
        this.emailTotal = emailTotalRes.data.result.data;
      } catch (error) {
        console.log(error);
      }
    },
      toggleHelp() {
            this.showHelp = !this.showHelp; // showHelp 값을 토글
      },
      async fetchGradeInfo() {
            try {
                const token = localStorage.getItem('access_token');
                const headers = { Authorization: `Bearer ${token}`} ;
                const gradeResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/grade`, { headers });
                const genderResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/gender`, { headers });
                const ageResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/age`, { headers });
                const dayResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/visit/week/user`, { headers });
                this.gradeInfo = gradeResponse.data.result.data;
                this.genderInfo = genderResponse.data.result.data;
                this.ageInfo = ageResponse.data.result.data;
                this.dayInfo = dayResponse.data.result.data;

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

            for(var x = 0; x < this.dayInfo.length; x++){
                this.days.push(this.dayInfo[x].day);
                this.dayCount.push(this.dayInfo[x].count);
            }

            this.gradeChart();
            this.genderChart();
            this.ageChart();
            this.loginChart();
        } catch (error) {
            console.log(error);
        }
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
  loginChart() {
    const ctx = document.getElementById('loginChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
        datasets: [{
          label: ' 접속 수 ',
          // data: [this.dayCount[1], this.dayCount[2], this.dayCount[3], this.dayCount[4], this.dayCount[5], this.dayCount[6], this.dayCount[0]],
          data: [1324, 1534, 1223, 3231, 2435, 4323, 1132],
          backgroundColor: [
            'rgba(245, 124, 0, 0.2)',
          ],
          borderColor: [
            'rgba(245, 124, 0, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            y: { // y축에 대한 설정
                beginAtZero: true,
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
      },
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