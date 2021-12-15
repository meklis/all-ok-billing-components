<template>
  <div class="row">
    <div class="col-sm-6 col-lg-6 col-md-6">
      <h4 :style="'color: ' + (data.operate_status === 'Online' ? 'darkgreen' : 'darkred')">Статус:
        {{ data.operate_status !== null ? data.operate_status : 'Неизвестно' }}</h4>
      <table>
        <tr v-if="data.ont_information.ident_type === 'mac'">
          <th style="font-size: 14px; padding-right: 5px">MAC-адрес ОНУ</th>
          <td style="font-size: 14px; font-weight: bold;">{{ data.ont_information.ident }}</td>
        </tr>
        <tr v-if="data.ont_information.ident_type === 'serial'">
          <th style="font-size: 14px; padding-right: 5px">Серийный номер</th>
          <td style="font-size: 14px; font-weight: bold;">{{ data.ont_information.ident }}</td>
        </tr>
        <tr>
          <th style="font-size: 16px; padding-right: 5px"><br>Состояние</th>
        </tr>
        <tr>
          <th style="font-size: 14px; padding-right: 5px">Последняя причина падения</th>
          <td style="font-size: 14px;">{{ data.ont_information.last_down_reason }}</td>
        </tr>
        <tr>
          <th style="font-size: 14px; padding-right: 5px">{{ data.operate_status === 'Online' ? "Онлайн" : "Офлайн" }}</th>
          <td style="font-size: 14px;">{{ data.ont_information.last_reg_since }}</td>
        </tr>
      </table>
      <table v-if="data.operate_status === 'Online'">
        <tr>
          <th style="font-size: 16px; padding-right: 5px"><br>Устройство</th>
        </tr>
        <tr>
          <th style="font-size: 14px; padding-right: 5px">Производитель</th>
          <td style="font-size: 14px;">{{ data.ont_information.device.vendor }}</td>
        </tr>
        <tr>
          <th style="font-size: 14px; padding-right: 5px">Модель</th>
          <td style="font-size: 14px;">{{ data.ont_information.device.model }}</td>
        </tr>
        <tr>
          <th style="font-size: 14px; padding-right: 5px">Hardware ver.</th>
          <td style="font-size: 14px;">{{ data.ont_information.device.ver_hardware }}</td>
        </tr>
        <tr>
          <th style="font-size: 14px; padding-right: 5px">Software ver.</th>
          <td style="font-size: 14px;">{{ data.ont_information.device.ver_software }}</td>
        </tr>
      </table>
    </div>
    <div class="col-sm-6  col-lg-6  col-md-6" v-if="data.olt !== null">
      <div class="row">
        <div class="col-sm-12 col-lg-12" >
          <h4>FDB</h4>
          <FDB :data="data.fdb"></FDB>
          <h4>Порты ОНУ</h4>
          <UniPorts :data="data.uni_ports"></UniPorts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import FDB from "./FDB";
import UniPorts from "./UniPorts";


export default {
  components: {FDB, UniPorts},
  props: {
    data: {
      type: Object,
      default: null,
    }
  }
}
</script>
