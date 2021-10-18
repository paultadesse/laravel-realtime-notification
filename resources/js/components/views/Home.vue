<template>
  <div class="flex justify-center">
    <div class="px-1 py-1" v-if="isAuth">
      <button
        href="#"
        class="
          no-underline
          inline-block
          text-sm
          px-4
          py-2
          leading-none
          rounded-md
          text-white
          bg-black
          hover:border-transparent
          hover:text-black
          hover:bg-gray-200
          mt-4
          sm:mt-0
        "
        @click.prevent="logout"
      >
        Logout
      </button>
    </div>
    <div class="flex flex-col">
      <div>Name : {{ user.name }}</div>
      <div>Email: {{ user.email }}</div>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <div>
        <div class="flex justify-between">
          <p>Notifications</p>
          <p class="text-7xl">{{ unreadNotifications.length }}</p>
        </div>
        <hr />
        <div v-for="notification in allNotifcations" :key="notification.id">
          <p>{{ notification.data.createdUser }} HAS JUST REGISTERED</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      allNotifcations: [],
      user: [],
    };
  },

  computed: {
    ...mapGetters({
      isAuth: "Auth/isAuth",
      token: "Auth/currentUserToken",
      id: "Auth/currentUserId",
      username: "Auth/currentUserName",
    }),

    unreadNotifications() {
      return this.allNotifcations.filter((notification) => {
        return notification.read_at == null;
      });
    },
  },

  mounted() {
    this.thisUser();
  },

  created() {
    console.log(this.id);
    //Private Channel
    Echo.private("App.Models.User." + this.id).notification((notification) => {
      console.log(notification.notification);
      this.allNotifcations.push(notification.notification);
    });

    // Echo.join(`chat`)
    //   .here((users) => {
    //     console.log(users);
    //   })
    //   .joining((user) => {
    //     console.log(user.name);
    //   })
    //   .leaving((user) => {
    //     console.log(user.name);
    //   })
    //   .error((error) => {
    //     console.error(error);
    //   });
  },

  methods: {
    ...mapActions({
      logoutTheUser: "Auth/logoutTheUser",
    }),

    thisUser() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      axios
        .get("/api/user")
        .then((res) => {
          console.log(this.token);
          this.user = res.data;
          this.allNotifcations = this.user.notifications;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },

    logout() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      axios
        .post("/api/logout")
        .then((res) => {
          this.logoutTheUser();
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<style>
</style>