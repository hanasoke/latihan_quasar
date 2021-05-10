<template>
  <q-page padding>
    <div>
      
      <q-table
      title="Data Manusia"
      :data="data"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      row-key="email"
    >

    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:top-left>
      <q-btn 
      color="primary"
      icon="check"
      label="ISI DATA MANUSIA"
      @click="isiDataManusia"
      />
    </template>

    </q-table>

      <q-separator/>

    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      filter : "",
      data: [],
      columns : [
        { 
          name: 'nama', 
          field: 'nama', 
          label: 'NAMA', 
          align:  'left'
        },
        { 
          name: 'email', 
          field: 'email', 
          label: 'ALAMAT EMAIL', 
          align:  'left'
        },
        { 
          name: 'umur', 
          field: 'umur', 
          label: 'UMUR', 
          align:  'left'
        }
      ]
    };
  },
  computed: {
    getManusia() {
      return this.$store.getters["data/dataManusia"];
    }
  },
  mounted() {
    this.lihatData();
  },
  methods: {
    async lihatData() {
      this.loading = true

      const { data } = await this.$api.get();
      this.data = data;

      this.loading = false

    },
    isiDataManusia() {
      this.$store.dispatch('data/doDataManusia', this.data);
    }
  }
};
</script>
