<template>
  <div v-if="isEventChartModalOpen" class="modal">
    <div class="modal-content-large" @click.stop>
      <div class="modal-header">
        <h2 style="font-size: 24px; font-weight: bold; color:#EFEFEF">캠페인 통계</h2>
        <span class="close" @click="closeDetailModal">&times;</span>
      </div>
      <div class="modal-body">
        <div v-if="loading">
          로딩 중...
        </div>
        <div v-else>
          <div v-if="!isEditing">
            <div class="user-info">
              <div>
                <div></div>
              </div>
              <div class="bg-white m-2 p-2 rounded-md shadow-md border h-[400px]">
                <div class="m-2 text-2xl font-bold">등급 별 고객 수</div>
                <div class="m-2 p-4" style="height: 350px; overflow-y: auto;">
                  <canvas id="gradeChart" ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";
import Chart from 'chart.js/auto';
export default {
  props: ['selectedEventId', 'isEventChartModalOpen'],
  data() {
    return {
      accountDetails: {},
      loading: false,
      isEditing: false,
      gradeInfo: {},
      grades: [],
      gradeCount: [],
    };
  },
  watch: {
    selectedEventId: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.isEventChartModalOpen) {
          this.loadAccountDetails(newVal);
        }
      }
    },
    isEventChartModalOpen: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          setTimeout(() => {
            this.gradeChart(this.grades, this.gradeCount);
        }, 500);
        }
      }
    },
  },
  methods: {
    async loadAccountDetails(open) {
      try {
        this.gradeInfo = {};
        this.grades = [];
        this.gradeCount = [];
        const openPage = open;
        console.log(openPage);
        this.loading = true;
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const gradeResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/grade`, { headers });
        this.gradeInfo = gradeResponse.data.result.data;

        for(var i = 0; i < this.gradeInfo.length; i++){
              this.grades.push(this.gradeInfo[i].grade);
              this.gradeCount.push(this.gradeInfo[i].count);
          }
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        this.loading = false;
      }
    },
    closeDetailModal() {
      this.isEditing = false;
      this.$emit('close-modal');
      // window.location.reload();
      // this.resetData();
      // console.log(this.gradeInfo);
    },
    async resetData() {
    // 데이터 초기화
    this.accountDetails = {};
    this.loading = false;
    this.isEditing = false;
    this.gradeInfo = {};
    this.grades = [];
    this.gradeCount = [];
    // 차트 파괴
    const canvas = document.getElementById('gradeChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx && Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
      }
    }
  },
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    gradeChart(grades, gradeCount) {
      if (grades !== null && gradeCount!== null) {
        const canvas = document.getElementById('gradeChart');
        if (canvas && canvas.getContext) {
          const ctx = canvas.getContext('2d');
          // 이전 차트 파괴
          if (Chart.getChart(ctx)) {
            Chart.getChart(ctx)?.destroy();
          }
          // 새로운 차트 생성
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: [grades[1], grades[0], grades[2], grades[3]],
              datasets: [{
                label: '고객 수 ',
                data: [gradeCount[1], gradeCount[0], gradeCount[2], gradeCount[3]],
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
        }
      }
    },
  }
};
</script>

<style scoped>
.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-large {
  width: 800px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 100vh;
  overflow-y: auto;
}

.close {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 24px;
  color: #000000;
}

.modal-header {
  background-color: #f5a742;
  color: white;
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
}

.modal-body-large {
  padding: 40px;
}

.rounded-table {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eae8e8;
  background-color: #f5f5f5;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #d9d8d8;
  background-color: #ffffff;
  height: 40px;
}

.table-iframe {
  display: flex;
  border-bottom: 1px solid #d9d8d8;
  background-color: #ffffff;
  max-width: max-content;
  height: 350px;
}

.preview {
  margin-top: 10px;
  width: 100%;
  height: 300px;
}

.fix_preview{
  width: 100%;
  height: 300px; /* 수정: 내용 입력창의 높이에 따라 조정하세요 */
}

.table-label,
.table-value {
  padding: 12px;
}

.table-label {
  background-color: #efefef;
  color: black;
  font-weight: bold;
  flex: 1;
}

.table-value {
  flex: 3;
}

.btn-container {
  text-align: right;
}

.btn {
  cursor: pointer;
  background-color: #f5a742;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 10px;
  margin-left: 10px;
}

.btn:hover {
  background-color: #e69500;
}
</style>
