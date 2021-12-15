<template>
    <div>
        <div v-if="reloadInProccess"  align="center">
          <img src="/assets/images/loader.svg" style="height: 20px">
        </div>
        <div v-if="!reloadInProccess">
            <span v-html="getCounters(info)" v-bind:style="{ color: colorBySizes(info.in_octets, info.out_octets), 'font-weight': boldBySizes(info.in_octets, info.out_octets) }" ></span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            info: Object,
            reloadInProccess: Boolean,
        },
        methods: {
            getCounters: function (el) {
                return this.convertSize(el.in_octets) + "/" + this.convertSize(el.out_octets);
            },
            convertSize: function (el) {
                let out = '';
                if (el < 1024) out  = el + "B";
                if (el === 0) out = el;
                if (el > 1024) out = (el/1024).toFixed(2) + "K";
                if (el > 1048576) out = (el/1048576).toFixed(2) + "M";
                if (el > 1073741824) out = (el/1073741824).toFixed(2) + "G";
                if (el > 1099511627776) out = (el/1099511627776).toFixed(2) + "T";
                return out;
            },
            colorBySizes: function (in_o, out_o) {
                let color = 'gray';
                if ((in_o === 0 || out_o ===0 ) && ((in_o > out_o + 1000) || (out_o > in_o + 1000))) {
                    color = 'magenta';
                } else if (in_o === '0' && out_o === '0') {
                    color = 'gray';
                }  else if (in_o !== '0' && out_o !== '0') {
                    color = 'darkgreen';
                }
                return color
            },
            boldBySizes: function (in_o, out_o) {
                let weight = '400';
                if ((in_o === 0 || out_o ===0 ) && ((in_o > out_o + 1000) || (out_o > in_o + 1000))) {
                    weight = '800';
                } else if (in_o === '0' && out_o === '0') {
                    weight = '400';
                }  else if (in_o !== '0' && out_o !== '0') {
                    weight = '700';
                }
                return weight
        }
        }
    }
</script>
