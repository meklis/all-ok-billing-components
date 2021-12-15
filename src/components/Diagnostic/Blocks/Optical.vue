<template>
  <div>
    <table class="table table-sm" v-if="data !== null" style="width: 100%;">
      <tr>
        <th style="font-weight: bold" v-if="data.distance !== 5 && data.distance !== null">
          {{ $t('distance') }}
        </th>
        <td v-if="data.distance !== 5 && data.distance !== null">{{data.distance}} m</td>
      </tr>
      <tr>
        <th style="font-weight: bold">RX</th>
        <td>{{data.rx}} dBm</td>
      </tr>
      <tr>
        <th style="font-weight: bold">TX</th>
        <td>{{data.tx}} dBm</td>
      </tr>
      <tr>
        <th style="font-weight: bold">Temp</th>
        <td>{{data.temp}} C°</td>
      </tr>
      <tr>
        <th style="font-weight: bold">Voltage</th>
        <td>{{data.voltage}} v</td>
      </tr>
    </table>
  </div>
</template>


<script>
  export default {
      props: {
        data: {
          type: Object,
          default: null,
        }
      }
  }
</script>
