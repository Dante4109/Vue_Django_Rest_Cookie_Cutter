<template>
  <v-app-bar app rounded color="primary" class="hidden-xs-and-down">
    <!-- Logo -->
    
      <v-toolbar-title>
      <a @click="$router.replace('/')">
      <v-img
      src="@/assets/logo.png"
      max-height="40"
      max-width="40"
      contain
      class="mr-4">
      </v-img>
      </a>
      </v-toolbar-title>
    
    <!-- Navigation items -->
    <v-toolbar-items>
      <v-menu v-for="item in navItems" :key="item.title" class="md-center" open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
          v-bind="props"
          :class="{ 'highlight-nav': item.highlight }"
          @click="$router.push('/product/' + item.num)"
          @mouseover="highlightItem(item)"
          @mouseleave="unhighlightItem(item)"
          >
          {{ item.title }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        v-for="n in 5"
        :key="n"
        :value="n"
        @click="() => {}"
        >
        <v-list-item-title>Option {{ n }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</v-toolbar-items>

<v-spacer></v-spacer>

<!-- Login or User profile icon -->
<div :key="user" v-if="!user">
      <v-btn right icon @click="openAccountAccess">
            <v-icon
            v-bind="attrs"
            v-on="on"
            >mdi-login</v-icon>
      </v-btn>
    </div>

    <div :key="user" v-else>
      <v-btn icon right @click="toggleDrawer">
        <div v-if="user.profile.ImgUrl==='none' || ''">
              <v-icon
                v-bind="attrs"
                v-on="on"
                >mdi mdi-account-circle
              </v-icon>
        </div>
        <div v-else>
          <v-avatar size="36px" >
            <v-img alt="Avatar" :src="user.profile.ImgUrl" />
          </v-avatar>
        </div>
      </v-btn>
    </div>
  </v-app-bar>

</template>

<script>
import userService from '@/services/userService'
export default {
  name: "Navbar",
  data() {
    return {
      dataKey: true,
      webpackpath: "",
      menuItems: [],
      menuRouteList: [],
      dialog: false,
      navItems: ([
        { num: 1, title: 'Game', highlight: false },
        { num: 2, title: 'Cards', highlight: false },
        { num: 3, title: 'Community', highlight: false },
        { num: 4, title: 'News', highlight: false },
        { num: 5, title: 'Test', highlight: false }
      ])
    };
  },
  created() {
    const user = JSON.parse(this.$store.state.authenticatedUser);
    if (user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  },
  methods: {
    changeData() {
      if(this.dataKey) {
        this.dataKey = false
      } 
      else {
        this.dataKey = true
      }
    },

    async refreshUser() {
        const user = JSON.parse(this.$store.state.authenticatedUser)

        if(user.id) {
          this.$router.replace('logout')
        }

        const response = await userService.fetchUser(user.id, this.$store.state.token)
        if(response.status != 200) {
          this.$router.replace('logout')
        } else {
          const refreshedUser = response.data
          this.$store.commit('updateSessionUser', refreshedUser)
        }
    },

    toggleDrawer() {
      // eslint-disable-next-line
      const drawer = this.$store.state.globalDrawer;
      if (drawer) {
        this.$store.commit("updateDrawer", false);
      } else {
        this.$store.commit("updateDrawer", true);
      }
    },

    logout() {
      this.$store.dispatch("logout");
      this.$router.go();
    },

    highlightItem(item) {
      item.highlight = true
    },
    unhighlightItem(item) {
      item.highlight = false
    },
    openAccountAccess() {
      this.emitter.emit('account_access');
    }
  },
  computed: {
    loggedIn: {
      get() {
        return this.$store.state.isLoggedIn
      },
      set(value) {
        this.$store.commit('updateLoggedInState', value)
      }
    },
    user: {
      get() {
        return JSON.parse(this.$store.state.authenticatedUser)
      }
    },
  },
}
</script>

<style scoped>
.highlight-nav {
  background-color: rgba(248, 5, 5, 0.1);
}
</style>