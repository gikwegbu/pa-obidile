<template>
    <div class="q-pa-md">
      <q-table
        flat bordered
        :title="tableTitle"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <!-- <q-tr :props="props" @click="onRowClick(props.row)"> -->
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="comment" :props="props" style="word-wrap:break-word; width: 200px;">
              <div style="word-wrap: break-word; width: 100%;">
                  {{ props.row.comment }}
                </div>
            </q-td>
            <q-td key="date" :props="props">
                <!-- {{ props.row.date }} -->
                {{ props.row.date ? new Date(props.row.date.seconds * 1000).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) : ''  }}
            </q-td>
            <q-td key="action" :props="props"  @click="deleteArticle(props.row.id, props.row.name)">
              <q-btn round color="red" flat icon="delete" ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  import { doc, deleteDoc } from "firebase/firestore";
  import { Notify, useQuasar } from 'quasar'
import db from 'src/boot/firebase'
import { tributeSection } from 'src/pages/admin/constants';
import { useDbStore } from 'stores/db'


  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'comment', align: 'center', label: 'Content', field: 'calories', sortable: true },
    { name: 'date', label: 'Date', field: 'fat', sortable: true },
    { name: 'action', label: 'Action', field: 'carbs' },
    // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  ]
  
  const _rows = [
    {
      name: 'Frozen Yogurt',
      comment: 159,
      date: 6.0,
      id: ''
    },
  ]
  
  export default defineComponent({
    name: "TableComponent",
    props: {
      rows: {
        default: _rows
      },
      tableTitle: {
        defailt: ''
      },
      section: {
        defailt: ''
      }
    },
    methods: {
      notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
      }
    },
    setup () {
      const $q = useQuasar()
      const dbStore = useDbStore();

      return {
        dbStore,
        columns,
        onRowClick: (row) => alert(`${row.id} clicked`),
        deleteArticle(id, name) {
          const _ = this
          $q.dialog({
            title: 'Confirm',
            message: `Are you sure you want to delete this ${_.tableTitle}, by ${name}?`,
            cancel: true,
            persistent: true
          }).onOk(async () => {
            await deleteDoc(doc(db, _.section, id));
            _.dbStore.deleteContentFromDb(_.section == tributeSection ? 'tribute' : 'stories' , id)
            _.notify(`${_.tableTitle} Deleted successfully`, 'green')
          })
        },
        // rows
      }
    }
  })
  </script>
  