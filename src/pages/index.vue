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
      icon="add"
      label="ISI DATA KARYAWAN"
      @click="confirm = true"
      />
    </template>

    <template v-slot:body-cell-button="props">

      <q-td :props="props">
        <q-btn color="red" icon="delete" dense @click="onDelete(props)"></q-btn>
      </q-td>
    </template>

    </q-table>
      <q-separator/>
    </div>
  <q-dialog v-model="confirm" persistent>
      <q-card style="width:350px">

        <q-form @submit="onSave">
          <q-card-section class="row items-center">
            <q-avatar icon="add" color="primary" text-color="white" >
            </q-avatar>
            <span class="q-ml-sm" >
                Tambah Data
              </span>
          </q-card-section>
          <q-card-section class="q-gutter-md">       
            <q-input v-model="form.nama" type="text" label="Nama" dense
            
            lazy-rules
            :rules="[ val => val.length > 0 || 'Nama Tidak Boleh Kosong']"
            ></q-input>

            <q-input 
              v-model="form.password" 
              type="password" 
              label="Password" 
              dense
            
            lazy-rules
            :rules="[ val => val.length > 0 || 'Password Tidak Boleh Kosong']"
            ></q-input>

            <q-input 
              v-model="form.password2" 
              type="password" 
              label="Konfirmasi Password" 
              dense
            
            lazy-rules
            :rules="[ val => form.password === val || 'Password Tidak Sesuai']"
            ></q-input>

            <q-input v-model="form.email" type="email" label="Email" dense
            
            lazy-rules
            :rules="[ val => val.length > 0 || 'Email Tidak Boleh Kosong']"
            ></q-input>
            <q-input
              v-model="form.no_hp"
              type="number"
              label="No Telepon"
              dense

              lazy-rules
              :rules="[ val => val.length > 0 || 'Nomor Telepon Tidak Boleh Kosong']"
            >
            </q-input>
            <q-input
              v-model="form.umur"
              type="umur"
              label="Umur"
              dense

              lazy-rules
              :rules="[ val => val.length > 0 || 'Umur Tidak Boleh Kosong']"
            >
            </q-input>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
            <q-btn flat label="Save" type="submit" color="primary"></q-btn>
          </q-card-actions>
        </q-form>

      </q-card>
  </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      confirm : false,
      form: {
        nama: "",
        umur: "",
        email: "",
        no_hp: "",
        password: "",
        password2: "", 
      },
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
          name: 'password', 
          field: 'password', 
          label: 'Password', 
          align:  'left'
        },
        { 
          name: 'email', 
          field: 'email', 
          label: 'ALAMAT EMAIL', 
          align:  'left'
        },
        { 
          name: 'no_hp', 
          field: 'no_hp', 
          label: 'No Telepon', 
          align:  'left'
        },
        { 
          name: 'umur', 
          field: 'umur', 
          label: 'UMUR', 
          align:  'left'
        },
        { 
          name: 'button', 
          field: 'button', 
          label: 'Action', 
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
      this.loading = true;
      const { data } = await this.$api.get();
      this.data = data;
      this.loading = false;
    },
    async onSave() {
      this.loading = true;
      try {
        await this.$api.post('/create', this.form)
        this.lihatData();
        this.confirm = false;
      } catch (err) {
        console.error(err);
      }
      this.loading = false;
    },
    async onDelete({ row }) {
      this.$q.dialog({
        title:'Apa anda yakin ?',
        message: ` Hapus ${row.nama} `,
        cancel: true,
        persistent: true
      })
      .onOk(async () => {
        this.loading = true;
        try {
          await this.$api.get(`/remove/${row.id}`)
          this.lihatData();
          this.confirm = false;
        } catch (err) {
          console.error(err);
        }
        this.loading = false;
      });
    }
  }
};
</script>
