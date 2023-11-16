<template>
  <q-layout view="lHh Lpr lff" container style="min-height: 100vh" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-space />
        <q-toolbar-title>
          <!-- Título da barra de ferramentas -->
        </q-toolbar-title>
        <div class="q-px-lg q-pt-xl q-mb-md" >
          <div class="text-h7">Bem vindo José Nuvunga</div>
          <div class="text-subtitle1">{{ dataFormatada }}</div>
          <div>
            <div >
      <img
        src="src\img\power-off.png"
        alt="Ícone de desligar"
        @click="confirmLogout"
        style="cursor: pointer; background-color: #FFFFFF; width: 24px; height: 24px; border-radius: 50%;"
      />
    </div>
          </div>
   <q-img src="src/img/6106991.jpg"  class="header-image absolute-top"></q-img>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="300"
      :breakpoint="600"
      @hide="drawer = false"
    >
      <q-scroll-area style="height: calc(100% - 250px); margin-top: 130px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item
            to="/index"
            exact
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              Home
            </q-item-section>
          </q-item>
          <q-item to="/user"
            exactclickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
             Usuarios
            </q-item-section>
          </q-item>

          <q-item to="/product"
            exactclickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shop" />
            </q-item-section>
            <q-item-section>
             Produtos
            </q-item-section>
          </q-item>

         </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="src/img/6106991.jpg" style="height: 135px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm" >
            <img src="src/img/capa.jpg">
          </q-avatar>
          <div class="text-weight-bold"> José Nuvunga</div>
          <div>onesimonuvunga@gmail.com</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </q-page-container>

    <q-dialog v-model="showLogoutConfirmation">
      <q-card>
        <q-card-section>
          <q-card-title class="text-h6">Confirmação de Logout</q-card-title>
        </q-card-section>
        <q-card-section>
          Tem certeza de que deseja sair?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="primary" @click="cancelLogout" />
          <q-btn label="Sair" color="negative" to="/login" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      dataFormatada: '',
      drawer: false,
      showLogoutConfirmation: false,
    };
  },
  mounted() {
    this.atualizarData();
  },
  methods: {
    atualizarData() {
      const hoje = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      this.dataFormatada = hoje.toLocaleDateString('pt-BR', options);
      setTimeout(this.atualizarData, 1000); // Atualiza a cada segundo
    },

    confirmLogout() {
      this.showLogoutConfirmation = true;
    },

    cancelLogout() {
      this.showLogoutConfirmation = false;
    },

// No seu componente Vue
methods: {
  performLogout() {
    // Simular a lógica de logout
    // Lembre-se de ajustar isso com a lógica real da sua aplicação

    // Limpar tokens de autenticação (exemplo: se estiver usando JWT)
    localStorage.removeItem('token');

    // Redirecionar para a página de login
    this.$router.push({ name: 'login' });
  },
},



  },
};
</script>

<style lang="scss">
.header-image{
  height: 100%;
  z-index: -1;
  opacity: 0.8;
}
</style>
