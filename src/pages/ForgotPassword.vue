<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="col-md-4 col-sm-6 col-xs-12 q-gutter-md q-mt-md">
        <q-card-section>
          <div class="text-center">
            <q-img
              src="src/img/barber.png"
              alt="Imagem de Recuperação de Senha"
              class="q-mb-md"
              style="width: 100px; height: auto;"
            />
            <p class="text-h6">Recuperação da Senha</p>
          </div>
          <q-form @submit.prevent="forgotPassword">
            <q-input
              label="Email"
              v-model="form.email"
              required
            />
            <div class="q-pt-md">
              <q-btn label="Recuperar Senha" color="primary" flat type="submit" @click="showVerificationDialog"></q-btn>
            </div>
            <div class="text-center">
              <q-btn label="Voltar para o Login" color="secondary" flat to="/login"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <!-- Modal para código de verificação -->
    <q-dialog v-model="verificationDialog" persistent>
      <q-card>
        <q-card-section>
          <p class="text-h6">Insira o código de verificação</p>
          <q-input
            v-model="verificationCode"
            label="Código de Verificação"
            required
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="secondary" @click="closeVerificationDialog" flat />
          <q-btn label="Verificar" color="primary" @click="verifyCode" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageForgotPassword',

  setup() {
    const form = ref({
      email: '',
      password: ''
    })

    const verificationDialog = ref(false)
    const verificationCode = ref('')

    const showVerificationDialog = () => {
      verificationDialog.value = true
    }

    const closeVerificationDialog = () => {
      verificationDialog.value = false
      verificationCode.value = '' // Limpar o campo de código de verificação
    }

    const verifyCode = () => {
      // Lógica para verificar o código de verificação
      // Implemente a lógica de acordo com as necessidades do seu aplicativo
      // Após a verificação bem-sucedida, você pode redirecionar o usuário para redefinir a senha ou realizar a ação apropriada.
      closeVerificationDialog()
    }

    const forgotPassword = () => {
      // Lógica para solicitar recuperação de senha
      // Implemente a lógica de acordo com as necessidades do seu aplicativo
    }

    return {
      form,
      verificationDialog,
      verificationCode,
      showVerificationDialog,
      closeVerificationDialog,
      verifyCode,
      forgotPassword
    }
  },
})
</script>
