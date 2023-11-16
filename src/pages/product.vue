<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-flex justify-between items-center">
          <h6 class="q-mb-md">Produtos</h6>
          <q-btn @click="abrirModalAdicao" color="primary" label="Adicionar Produto" />
        </div>

        <!-- Tabela de registros -->
        <q-table :rows="tableRows" :columns="tableColumns">
          <template v-slot:body-cell-acao="{ row }">
            <q-btn
              @click="editarRegistro(row)"
              flat
              round
              dense
              color="primary"
              icon="edit"
              class="q-mr-sm"
            />
            <q-btn
              @click="confirmarExclusao(row)"
              flat
              round
              dense
              color="negative"
              icon="delete"
            />
          </template>
        </q-table>

        <!-- Modal de adição de produto -->
        <q-dialog v-model="modalAdicao" class="modal-edicao">
          <q-card>
            <q-card-section>
              <q-card-title class="text-h6">Adicionar Estoque</q-card-title>
              <!-- Campos de adição -->
              <q-input v-model="novaReserva.product" label="Produto" dense />
              <q-input v-model="novaReserva.quantidade" label="Quantidade" dense />
              <q-input v-model="novaReserva.price" label="Preço" dense  />
              <q-input v-model="novaReserva.description" label="Descrição" dense quantidade="text" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Adicionar produto" @click="adicionarProduto" color="primary" />
              <q-btn label="Cancelar" @click="cancelarAdicao" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Modal de confirmação de exclusão -->
        <q-dialog v-model="modalExclusao" class="modal-exclusao">
          <q-card>
            <q-card-section>
              <q-card-title class="text-h6">Confirmar Exclusão</q-card-title>
              <p>Tem certeza de que deseja excluir esta reserva?</p>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Confirmar Exclusão" @click="excluirUsuario" color="negative" />
              <q-btn label="Cancelar" @click="cancelarExclusao" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Modal de edição de reserva -->
        <q-dialog v-model="modalEdicao" class="modal-edicao">
          <q-card>
            <q-card-section>
              <q-card-title class="text-h6">Editar Reserva</q-card-title>
              <!-- Campos de edição -->
              <q-input v-model="edicao.product" label="Produto" dense />
              <q-input v-model="edicao.quantidade" label="Quantidade" dense />
              <q-input v-model="edicao.price" label="preço" dense  />
              <q-input v-model="edicao.description" label="Descrição" dense  />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Salvar Edição" @click="salvarEdicao" color="primary" />
              <q-btn label="Cancelar" @click="cancelarEdicao" />
            </q-card-actions>
          </q-card>
        </q-dialog>
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
        name: 'product',
        label: 'Produto',
        align: 'left',
        field: 'product',
      },
      {
        name: 'quantidade',
        label: 'Quantidade',
        align: 'left',
        field: 'quantidade',
      },
      {
        name: 'price',
        label: 'preço',
        align: 'left',
        field: 'price',
      },

      {
        name: 'description',
        label: 'Descrição',
        align: 'left',
        field: 'description',
      },
      {
        name: 'acao',
        label: 'Ações',
        align: 'center',
      },
    ];

    const tableRows = ref([]);
    const modalExclusao = ref(false);
    const modalEdicao = ref(false);
    const modalAdicao = ref(false);
    const edicao = ref({});
    const novaReserva = ref({});
    let usuarioExcluir = null;

    const carregarDados = () => {
      axios.get('http://localhost:3000/api/todos')
        .then(response => {
          tableRows.value = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar dados:', error);
        });
    };

    const editarRegistro = (reserva) => {
      usuarioExcluir = reserva;
      edicao.value = { ...reserva };
      modalEdicao.value = true;
    };

    const confirmarExclusao = (reserva) => {
      usuarioExcluir = reserva;
      modalExclusao.value = true;
    };

    const excluirUsuario = () => {
      if (usuarioExcluir) {
        const { id } = usuarioExcluir;
        axios.delete(`http://localhost:3000/api/todos/${id}`)
          .then(() => {
            tableRows.value = tableRows.value.filter(r => r.id !== id);
          })
          .catch(error => {
            console.error('Erro ao excluir reserva:', error);
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
      edicao.value = {};
    };

    const salvarEdicao = () => {
      if (edicao.value) {
        const { id } = edicao.value;
        axios.put(`http://localhost:3000/api/todos/${id}`, edicao.value)
          .then(() => {
            carregarDados();
            modalEdicao.value = false;
            edicao.value = {};
          })
          .catch(error => {
            console.error('Erro ao editar reserva:', error);
          });
      }
    };

    const abrirModalAdicao = () => {
      modalAdicao.value = true;
    };

    const adicionarProduto = () => {
      axios.post('http://localhost:3000/api/todos', novaReserva.value)
        .then(response => {
          console.log('Reserva adicionada com sucesso:', response.data);
          tableRows.value.push(response.data);
        })
        .catch(error => {
          console.error('Erro ao adicionar reserva:', error);
        })
        .finally(() => {
          novaReserva.value = {};
          modalAdicao.value = false;
        });
    };

    const cancelarAdicao = () => {
      novaReserva.value = {};
      modalAdicao.value = false;
    };

    // Carregar dados ao inicializar o componente
    carregarDados();

    return {
      tableColumns,
      tableRows,
      modalExclusao,
      modalEdicao,
      edicao,
      editarRegistro,
      confirmarExclusao,
      excluirUsuario,
      cancelarExclusao,
      cancelarEdicao,
      salvarEdicao,
      modalAdicao,
      novaReserva,
      abrirModalAdicao,
      adicionarProduto,
      cancelarAdicao,
    };
  },
});
</script>

<style scoped>
/* Estilo para o modal de edição e adição destacado */
.modal-edicao .q-dialog__content,
.modal-exclusao .q-dialog__content {
  background-color: rgba(0, 0, 0, 0.8) !important; /* Fundo escuro */
  color: white; /* Cor do texto, ajuste conforme necessário */
}

/* Adicione este estilo para garantir que o modal tenha um fundo escuro por trás do conteúdo */
.modal-edicao .q-dialog__backdrop,
.modal-exclusao .q-dialog__backdrop {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>
