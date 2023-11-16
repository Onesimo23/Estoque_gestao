<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h6 class="q-mb-md">Lista de Usuários</h6>

          <!-- Tabela de registros -->
          <q-table :rows="tableRows" :columns="tableColumns">
            <template v-slot:body-cell-acao="props">
              <q-btn
                @click="editarRegistro(props.row)"
                flat
                round
                dense
                color="primary"
                icon="edit"
                class="q-mr-sm"
              />
              <q-btn
                @click="confirmarExclusao(props.row)"
                flat
                round
                dense
                color="negative"
                icon="delete"
              />
            </template>
          </q-table>

          <!-- Modal de confirmação de exclusão -->
          <q-dialog v-model="modalExclusao">
            <q-card>
              <q-card-section>
                <q-card-title class="text-h6">Confirmar exclusão</q-card-title>
              </q-card-section>

              <q-card-section>
                Tem certeza de que deseja excluir este usuário?
              </q-card-section>

              <q-card-actions align="right">
                <q-btn label="Cancelar" color="primary" @click="cancelarExclusao" />
                <q-btn label="Excluir" color="negative" @click="excluirUsuario" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Modal de edição de usuário -->
          <q-dialog v-model="modalEdicao">
            <q-card>
              <q-card-section>
                <q-card-title class="text-h6">Editar usuário</q-card-title>
              </q-card-section>

              <q-card-section>
                <!-- Adicione aqui os campos de edição -->
                <q-input v-model="usuarioEditado.name" label="Nome" />
                <q-input v-model="usuarioEditado.email" label="Email" />
                <q-input v-model="usuarioEditado.password" label="Senha" />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn label="Cancelar" color="primary" @click="cancelarEdicao" />
                <q-btn label="Salvar" color="positive" @click="salvarEdicao" />
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'TabelaComAcoes',

  setup() {
    const tableColumns = [
      {
        name: 'id',
        label: 'ID',
        align: 'left',
        field: 'id',
      },
      {
        name: 'name',
        required: true,
        label: 'Nome',
        align: 'left',
        field: 'name',
      },
      {
        name: 'email',
        label: 'Email',
        align: 'left',
        field: 'email',
      },
      {
        name: 'password',
        label: 'Senha',
        align: 'left',
        field: 'password',
      },

      {
        name: 'acao',
        label: 'Ação',
        align: 'center',
      },
    ];

    const tableRows = ref([]);
    const modalExclusao = ref(false);
    const modalEdicao = ref(false);
    let usuarioExcluir = null;
    let usuarioEditado = null;

    const carregarDados = () => {
      axios.get('http://localhost:3000/user') // Substitua pela sua API de usuários
        .then(response => {
          tableRows.value = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar dados de usuários:', error);
        });
    };

    const editarRegistro = (usuario) => {
      usuarioEditado = { ...usuario };
      modalEdicao.value = true;
    };

    const confirmarExclusao = (usuario) => {
      usuarioExcluir = usuario;
      modalExclusao.value = true;
    };

    const excluirUsuario = () => {
      if (usuarioExcluir) {
        const { id } = usuarioExcluir;
        axios.delete(`http://localhost:3000/user/${id}`)
          .then(() => {
            tableRows.value = tableRows.value.filter(u => u.id !== id);
          })
          .catch(error => {
            console.error('Erro ao excluir usuário:', error);
          })
          .finally(() => {
            modalExclusao.value = false;
            usuarioExcluir = null;
          });
      }
    };

    const cancelarExclusao = () => {
      modalExclusao.value = false;
      usuarioExcluir = null;
    };

    const cancelarEdicao = () => {
      modalEdicao.value = false;
      usuarioEditado = null;
    };

    const salvarEdicao = () => {
      if (usuarioEditado) {
        const { id } = usuarioEditado;
        axios.put(`http://localhost:3000/user/${id}`, usuarioEditado)
          .then(() => {
            modalEdicao.value = false;
            usuarioEditado = null;
            carregarDados(); // Atualizar a tabela ou fazer outras ações necessárias após a edição
          })
          .catch(error => {
            console.error('Erro ao editar usuário:', error);
          });
      }
    };

    // Carregar dados ao inicializar o componente
    carregarDados();

    return {
      tableColumns,
      tableRows,
      modalExclusao,
      modalEdicao,
      carregarDados,
      editarRegistro,
      confirmarExclusao,
      excluirUsuario,
      cancelarExclusao,
      cancelarEdicao,
      salvarEdicao,
    };
  },
});
</script>
