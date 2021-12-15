<template>
  <div style="align-content: center">
    <table class="tbl  table-striped table table-bordered table-sm table-responsive" style="width: 100%" v-if="data !== null && data.length !== 0">
      <thead>
      <tr>
        <th>FDB</th>
        <th>VlanID</th>
        <th>UNI порт</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="f in data" :key="f.mac" >
        <td><b>{{f.mac}}</b></td>
        <td>{{f.vlan_id}}</td>
        <td>{{f.interface !== null && f.interface.onu_num !== null ? f.interface.onu_num : 'Неизвестно'}}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <h3 style="text-align: center">FDB-таблица пустая</h3>
    </div>
  </div>
</template>


<script>
  export default {
      props: {
        data: {
          type: Array,
          default: () => {return []}
        }
      }
  }
</script>
