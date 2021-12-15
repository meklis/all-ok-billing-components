<template>
  <div class="row">
    <div class="col-sm-12 col-xs-12">
      <div class="port-detailed-info"   style="padding: 5px">
        <hr style="margin: 3px; padding: 0">
        <div class="row">
          <div class="col-6 col-xs-6 col-sm-6">
           Описание
          </div>
          <div class="col-6 col-xs-6 col-sm-6">
            {{data.description}}
          </div>
        </div>
        <hr style="margin: 3px; padding: 0">
        <div class="row">
          <div class="col-6 col-xs-6 col-sm-6">
            Линк
          </div>
          <div class="col-6 col-xs-6 col-sm-6">
            <span v-html="adminState(data.admin_state)"></span>/<span v-html="operStatus(data.operate_status)"></span>
          </div>
        </div>
        <hr style="margin: 3px; padding: 0"  >
        <div class="row"  >
          <div class="col-6 col-xs-6 col-sm-6">
            Влан
          </div>
          <div class="col-6 col-xs-6 col-sm-6">
            <VlanByPorts v-bind:info="data.vlans"/>
          </div>
        </div>
        <hr style="margin: 3px; padding: 0"  >
        <div class="row"  >
          <div class="col-6 col-xs-6 col-sm-6">
            Счетчики <small>(in/out)</small>
          </div>
          <div class="col-6 col-xs-6 col-sm-6">
            <Counters v-bind:info="data.counters"  />
          </div>
        </div>
        <hr style="margin: 3px; padding: 0"
            >
        <div class="row"  >
          <div class="col-6 col-xs-6 col-sm-6">
            Ошибки <small>(CRC/Coll/U/O/F/J/D)</small>
          </div>
          <div class="col-6 col-xs-6 col-sm-6">
            <Errors v-bind:errors="data.errors" v-bind:rmon="data.rmon"/>
          </div>
        </div>
        <hr style="margin: 3px; padding: 0" >
        <div class="row">
          <div class="col-6 col-xs-6 col-sm-6">
            FDB
          </div>
          <div class="col-6 col-xs-6 col-sm-6">
            <FDB style="display: inline" v-bind:info="data.fdb"/>
          </div>
        </div>
        <hr style="margin: 3px; padding: 0" >
        <div class="row" >
          <div class="col-6 col-xs-6 col-sm-6">
           Диагностика кабеля
          </div>
          <div class="col-6 col-xs-6 col-sm-6">
            <CableDiag  v-bind:info="data.cable_diagnostic" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VlanByPorts from "./portBlock/VlanByPorts";
import Counters from "./portBlock/Counters";
import Errors from "./portBlock/Errors";
import CableDiag from "./portBlock/CableDiag";
import FDB from "./portBlock/FDB";
export default {
  components: {CableDiag, Errors, Counters, VlanByPorts , FDB},
  props: {
    data: {
      type: Object,
      default: null,
    }
  },
  methods: {
    adminState: function (d) {
      if(d === 'Auto') return '<span style="color: darkgreen">Auto</span>';
      if(d === 'Disabled') return  '<span style="color: darkred; font-weight:  bold">Disabled</span>';
      return  d ;
    },
    operStatus: function (d) {
      if(d === '100-Full') return '<span style="color: darkgreen; font-weight: bold">100-Full</span>';
      if(d === '1G-Full') return  '<span style="color: darkgreen; font-weight: bold">1G-Full</span>';
      if(d === 'Down') return  '<span style="color: gray; font-weight: bold">Down</span>';
      return  d ;
    },
  }
}
</script>

<style :scoped>

</style>
