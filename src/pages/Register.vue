<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="col-md-4 col-sm-6 col-xs-12 q-gutter-md q-mt-md">
        <q-card-section>
          <div class="text-center">
            <q-img
              src="src/img/stoque.jpg"
              alt="Imagem de Registro"
              class="q-mb-md"
              style="width: 100px; height: auto;"
            />
            <p class="text-h6">Registrar-se</p>
          </div>
          <q-form @submit.prevent="handleRegister">
            <q-input
              label="Nome"
              v-model="form.name" :rules="[(val) => !!val || 'Por favor, preencha o campo de Nome']"

            />
            <q-input
              label="Email"
              v-model="form.email" :rules="[(val) => !!val || 'Por favor, preencha o campo de Email']"
              type="email"
            />
            <q-input
              label="Senha"
              v-model="form.password" :rules="[(val) => !!val || 'Por favor, preencha o campo de Senha']"
              type="password"

            />
            <div class="text-center">
              <q-btn outline rounded class="full-width" label="Registrar" color="primary"  type="submit"></q-btn>
            </div>
            <div class="q-pt-md">
              <q-btn label="Voltar para o Login" color="secondary" flat to="/login"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'PageRegister',

  setup() {
    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const router = useRouter()

    const handleRegister = async () => {
      try {
        // Faz a requisição HTTP para o backend com os dados do formulário
        await axios.post('http://localhost:3000/user', {
          name: form.value.name,
          email: form.value.email,
          password: form.value.password
        });

        // Após o registro bem-sucedido, redirecione o usuário para a página de login
        router.push('/login');
      } catch (error) {
        console.error('Erro ao registrar:', error);
        // Trate o erro conforme necessário, exibindo uma mensagem de erro para o usuário, por exemplo.
      }
    };

    const goToLogin = () => {
      router.push('/login')
    }

    return {
      form,
      handleRegister,
      goToLogin
    }
  },
})
</script>
