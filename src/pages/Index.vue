<!-- src/pages/Home.vue -->

<template>
  <q-page class="flex flex-center">
    <div>
      <h1 class="text-h5">Bem-vindo ao Seu Aplicativo de Cadastro de Produtos</h1>
      <p>
        Esperamos que você tenha uma ótima experiência utilizando nosso aplicativo.
      </p>
      <q-card class="q-mb-md" style="max-width: 400px">
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label header>Produto do Dia</q-item-label>
                <q-item-label>
                  <strong>Nome:</strong> Produto Exemplo<br />
                  <strong>Preço:</strong> 200 Mzn
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md" style="max-width: 400px">
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label header>Produto Mais Vendido</q-item-label>
                <q-item-label>
                  <strong>Nome:</strong> Produto Mais Vendido<br />
                  <strong>Preço:</strong> 100mzn
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Adicione mais elementos ou componentes interessantes aqui -->
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
/* Adicione estilos personalizados conforme necessário */
</style>
