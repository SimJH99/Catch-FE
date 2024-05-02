<template>
  <div></div>
</template>

<script>
import axios from "@/axios/index";

export default {
  props: ['selectedEventId'],
  data() {
    return {
      accountDetails: {},
      loading: false,
      isEditing: false,
      editName: "",
      startDate: "",
      endDate: "",
      eventContent: "",
    };
  },
  watch: {
    selectedEventId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadAccountDetails(newVal);
        }
      }
    }
  },
  created() {
    this.loadAccountDetails();
  },
  methods: {
    async loadAccountDetails() {
      try {
        let queryString = window.location.search;
        console.log(queryString);
        let urlParams = new URLSearchParams(queryString);
        console.log(urlParams);
        let eventId;
        if (urlParams.has('eventId')) {
          eventId = urlParams.get('eventId');
        }
        let email;
        console.log(email);
        if (urlParams.has('email')) {
          email = urlParams.get('email');
        }

        this.loading = true;
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/event/${eventId}`);
        this.accountDetails = response.data.result;
        this.editName = this.accountDetails.name;
        this.startDate = this.accountDetails.startDate;
        this.endDate = this.accountDetails.endDate;
        this.eventContent = this.accountDetails.contents;

        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/tracking_pixel/${email}/${eventId}`)

        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const [, payloadBase64] = accessToken.split('.');
          const payload = JSON.parse(atob(payloadBase64));
          const userRole = payload.sub.split(':')[1];
          if (userRole === 'USER') {
            window.location.href = "/myEvent";
          }
        } else {
          window.location.href = "/?url=myEvent/";
        }

      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<style scoped></style>
