<template>
    <div class="bg-white m-3">
        <div class="text-4xl font-bold p-3 border-b-2 border-gray-300">대시보드</div>
        <div class="m-3 grid grid-cols-2">
            <div>
                <div class="m-2 text-2xl font-bold">등급 별 고객 수</div>
                <div class="m-2 p-4 border-2">
                    <canvas id="gradeChart"></canvas>
                </div>
            </div>
            <div>
                <div class="m-2 text-2xl font-bold">고객 남녀 비율</div>
                <div class="m-2 p-4 border-2">
                    <canvas id="genderChart"></canvas>
                </div>
            </div>
            <div>
                <div class="m-2 text-2xl font-bold">일별 로그인 접속 수</div>
                <div class="m-2 p-4 border-2">
                    <canvas id="loginChart"></canvas>
                </div>
            </div>
            <div>
                <div class="m-2 text-2xl font-bold">연령 대 별 고객 수</div>
                <div class="m-2 p-4 border-2">
                    <canvas id="ageChart"></canvas>
                </div>
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
      };
    },
    created() {
        
    },
    mounted() {
      this.fetchGradeInfo();
    },
    methods: {
      async fetchGradeInfo() {
            try {
                const token = localStorage.getItem('access_token');
                const headers = { Authorization: `Bearer ${token}`} ;
                const gradeResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/grade`, { headers });
                this.gradeInfo = gradeResponse.data.result.data;

                const genderResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/gender`, { headers });
                this.genderInfo = genderResponse.data.result.data;

                const ageResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/age`, { headers });
                this.ageInfo = ageResponse.data.result.data;

                console.log(this.ageResponse);
                
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
          type: 'pie',
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
              label: ' 연령 대 ',
              data: [50,36,27,15,13,14,7,3,1],
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
                    beginAtZero: true
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