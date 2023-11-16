<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="col-md-4 col-sm-6 col-xs-12 q-gutter-md q-mt-md">
        <q-card-section>
          <div class="text-center">
            <q-img
              src="src/img/stoque.jpg"
              alt="Imagem de Login"
              class="q-mb-md"
              style="width: 100px; height: auto;"
            />
          </div>
          <q-form @submit="handleLogin">
            <q-input
              label="Email"
              v-model="form.email"
              :rules="[(val) => !!val || 'Por favor, preencha o campo de Email']"
            />
            <q-input
              label="Password"
              v-model="form.password"
              type="password"
              :rules="[(val) => !!val || 'Por favor, preencha o campo de Senha']"
            />
            <div class="text-center">
              <q-btn outline class="full-width"
            rounded label="Login" color="primary" type="submit"></q-btn>
            </div>
            <div class="q-pt-md">
              <q-btn label="Registrar" color="warning" flat to="/register"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <!-- Modal de erro -->
    <q-dialog v-model="modalError">
      <q-card>
        <q-card-section>
          <q-card-title class="text-h6">Erro de Autenticação</q-card-title>
        </q-card-section>
        <q-card-section>
          <p>Email ou senha incorretos. Por favor, tente novamente.</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="OK" color="primary" @click="modalError = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'PageLogin',

  setup() {
    const form = ref({
      email: '',
      password: ''
    })

    const router = useRouter()
    const modalError = ref(false)

    const handleLogin = () => {
      const { email, password } = form.value;

      axios.post('http://localhost:3000/login', { email, password })
        .then(response => {
          router.push('/index');
        })
        .catch(error => {
          console.error('Error during login:', error);
          // Exiba o modal de erro se o login falhar
          modalError.value = true;
        });
    }

    return {
      form,
      handleLogin,
      modalError
    }
  },
})
</script>
