<template>
  <div class="table-responsive">
    <table class="table tbl  table-striped table-sm table-bordered " style="width: 100%;">
      <thead>
      <tr>
        <th style="font-weight: bold; text-align: center">
          Порт #<br><br>
        </th>
        <th style="font-weight: bold; text-align: center">
          Статус<br><small>(Dis/Up/Down)</small>
        </th>
        <th style="font-weight: bold; text-align: center">
          Vlan<br><small>(U-untagged/T-tagged)</small>
        </th>
        <th style="font-weight: bold; text-align: center">
          Counters<br><small>(IN/OUT)</small>
        </th>
        <th style="font-weight: bold; text-align: center">
          Errors<br><small>(CRC/US/OS/JB/FR/DR)</small>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(port, k) in data" :key="k">
        <td style="text-align: center; ">
          <span style="font-weight: bold; ">{{ port.interface.uni }}</span>
        </td>
        <td style="text-align: center; ">
                      <span
                          :style="'font-weight: bold; color: ' + (port.status === 'Up' ? ' rgb(14, 77, 0)' : '#7E0101')">
                        {{ port.admin_status === 'Enabled' ? port.status : port.admin_status }}
                     </span>
        </td>
        <td>
          {{ port.vlan_id }}({{ port.vlan_mode === 'Untagged' ? 'U' : 'T' }})
        </td>
        <td>
          {{ humanizeOctets(port.stat_in_octets) }}/{{ humanizeOctets(port.stat_out_octets) }}
        </td>
        <td>
          <div>in:
            <span :style="statPktsStyle(port.stat_in_crc_pkts)">{{ replaceNaN(port.stat_in_crc_pkts) }}</span>/<span
                :style="statPktsStyle(port.stat_in_undersize_pkts)">{{ replaceNaN(port.stat_in_undersize_pkts) }}</span>/<span
                :style="statPktsStyle(replaceNaN(port.stat_in_oversize_pkts))">{{ replaceNaN(port.stat_in_oversize_pkts) }}</span>/<span
                :style="statPktsStyle(port.stat_in_jabber_pkts)">{{ replaceNaN(port.stat_in_jabber_pkts) }}</span>/<span
                :style="statPktsStyle(port.stat_in_fragments_pkts)">{{ replaceNaN(port.stat_in_fragments_pkts) }}</span>/<span
                :style="statPktsStyle(port.stat_in_drop_pkts)">{{ replaceNaN(port.stat_in_drop_pkts) }}</span>
          </div>
          <div>out:
            <span :style="statPktsStyle(port.stat_out_crc_pkts)">{{ replaceNaN(port.stat_out_crc_pkts) }}</span>/<span
                :style="statPktsStyle(port.stat_out_undersize_pkts)">{{ replaceNaN(port.stat_out_undersize_pkts) }}</span>/<span
                :style="statPktsStyle(replaceNaN(port.stat_out_oversize_pkts))">{{ replaceNaN(port.stat_out_oversize_pkts) }}</span>/<span
                :style="statPktsStyle(port.stat_out_fragments_pkts)">{{ replaceNaN(port.stat_out_fragments_pkts) }}</span>/<span
                :style="statPktsStyle(port.stat_out_jabber)">{{ replaceNaN(port.stat_out_jabber) }}</span>/<span
                :style="statPktsStyle(port.stat_out_drop_pkts)">{{ replaceNaN(port.stat_out_drop_pkts) }}</span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
const prettyBytes = require('pretty-bytes');

export default {
  props: {
    data: {
      type: Array,
      default: null,
    }
  },
  methods: {
    humanizeOctets(octets) {
      let bytes = octets * 0.125
      return prettyBytes(bytes, {maximumFractionDigits: 2})
    },
    replaceNaN(number){
      if(typeof number === 'undefined' ||
          number === null ||
          number === ''
      ) return "U"
      return number
    },
    statPktsStyle(countPkts) {
      countPkts = this.replaceNaN(countPkts)

      let style = 'color: #6C6C6C;'
      if(countPkts === 'U') style = 'color: #909090; '
      if(countPkts > 20) style = 'color: #00248B;'
      if(countPkts > 50) style = 'color: #A90083; font-weight:bold'
      if(countPkts > 100) style = 'color: #A90048; font-weight:bold'
      if(countPkts > 1000) style = 'color: #A00000; font-weight:bold'
      return style
    },
  }
}
</script>
