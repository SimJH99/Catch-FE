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
  import Chart from 'chart.js/auto';
  
  export default {
    mounted() {
      this.gradeChart();
      this.genderChart();
      this.ageChart();
      this.loginChart();
    },
    methods: {
        gradeChart() {
        const ctx = document.getElementById('gradeChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['SLIVER', 'GOLD', 'VIP', 'VVIP'],
            datasets: [{
              label: '고객 수 ',
              data: [5470, 3287, 543, 125],
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
            labels: ['남성', '여성'],
            datasets: [{
              data: [19, 12],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 99, 132, 0.5)',
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            maintainAspectRatio: false,
            aspectRatio: 1,
            scales: {
                xAxes: [{ 
                    display: false // x축의 선을 숨김
                }],
                yAxes: [{ 
                    beginAtZero: true,
                    display: false // y축의 선을 숨김
                }],
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
            labels: ['10', '20', '30', '40', '50', '60', '70', '80'],
            datasets: [{
              label: ' 연령 대 ',
              data: [60,36,27,15,13,14,7,3,1],
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
                xAxes: [{ // x축에 대한 설정
                    display: false // x축의 선을 숨김
                }],
                yAxes: [{ // y축에 대한 설정
                    beginAtZero: true,
                    display: false // y축의 선을 숨김
                }],
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