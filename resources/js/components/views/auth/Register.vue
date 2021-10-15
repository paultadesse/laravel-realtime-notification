<template>
  <div class="flex flex-wrap w-full justify-center items-center pt-56">
    <div class="flex flex-wrap max-w-xl">
      <div class="p-2 text-2xl text-gray-800 font-semibold">
        <h1>Register an account</h1>
      </div>
      <div class="p-2 w-full">
        <label class="w-full" for="name">Name</label>
        <input
          class="
            w-full
            bg-gray-100
            rounded
            border border-gray-400
            focus:outline-none
            focus:border-indigo-500
            text-base
            px-4
            py-2
          "
          placeholder="Name"
          type="text"
          v-model="form.name"
        />
        <span class="w-full text-sm text-red-500" v-if="errors.name">{{
          errors.name[0]
        }}</span>
      </div>
      <div class="p-2 w-full">
        <label class="w-full" for="username">username</label>
        <input
          class="
            w-full
            bg-gray-100
            rounded
            border border-gray-400
            focus:outline-none
            focus:border-indigo-500
            text-base
            px-4
            py-2
          "
          placeholder="Username"
          type="text"
          v-model="form.username"
        />
        <span class="w-full text-sm text-red-500" v-if="errors.username">{{
          errors.username[0]
        }}</span>
      </div>
      <div class="p-2 w-full">
        <label for="email">Your e-mail</label>
        <input
          class="
            w-full
            bg-gray-100
            rounded
            border border-gray-400
            focus:outline-none
            focus:border-indigo-500
            text-base
            px-4
            py-2
          "
          placeholder="Email"
          type="email"
          v-model="form.email"
        />
        <span class="w-full text-sm text-red-500" v-if="errors.email">{{
          errors.email[0]
        }}</span>
      </div>
      <div class="p-2 w-full">
        <label for="password">Password</label>
        <input
          class="
            w-full
            bg-gray-100
            rounded
            border border-gray-400
            focus:outline-none
            focus:border-indigo-500
            text-base
            px-4
            py-2
          "
          placeholder="Password"
          type="password"
          v-model="form.password"
          name="password"
        />
        <span class="w-full text-sm text-red-500" v-if="errors.password">{{
          errors.password[0]
        }}</span>
      </div>
      <div class="p-2 w-full">
        <label for="confirm_password">Confirm Password</label>
        <input
          class="
            w-full
            bg-gray-100
            rounded
            border border-gray-400
            focus:outline-none
            focus:border-indigo-500
            text-base
            px-4
            py-2
          "
          placeholder="Confirm Password"
          type="password"
          v-model="form.password_confirmation"
          name="password_confirmation"
        />
      </div>
      <div class="p-2 w-full mt-4">
        <button
          @click.prevent="saveForm"
          type="submit"
          class="
            flex
            text-white
            bg-indigo-500
            border-0
            py-2
            px-8
            focus:outline-none
            hover:bg-indigo-600
            rounded
            text-lg
          "
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },
  methods: {
    // ...mapActions({
    //   registerTheUser: "Auth/registerTheUser",
    // }),

    saveForm() {
      axios
        .post("/api/register", this.form)
        .then((res) => {
        //   this.registerTheUser(res.data);
          this.$router.push({name: "Home"})
        })
        .catch((error) => {
          //if the status is 401 the user is unauthenticated...
          //   if (error.response.status === 401) {
          //     console.log(error.response.status);
          //     this.$router.push({ name: "Login" });
          //     return;
          //   }
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>