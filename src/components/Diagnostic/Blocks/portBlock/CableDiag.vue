<template>
    <div style="max-height: 180px; overflow-y: auto; ">
        <div v-if="showPreload || reloadInProccess"  align="center">
          <img src="/assets/images/loader.svg" style="height: 32px">
        </div>
        <div v-if="!showPreload && !reloadInProccess" >
                <div v-for="(pair, pairNum) in portInfo" :key="pairNum" v-html="getLine(pair)">
                </div>
                <span v-if="portInfo === null">{{$t('diag_check')}}</span>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            info: Array,
            portNum: String,
            reloadInProccess: Boolean,
            device: Object,
        },
        data: function () {
            return {
                showPreload: false,
                portInfo: Array
            }
        },
        methods: {
            getLine: function (d) {
                let style = "";
                switch (d.status) {
                    case "OK":
                        style = "color: darkgreen; font-weight: bold";
                        break;
                    case "Short":
                        style = "color: red; font-weight: bold";
                        break;
                    case "Open":
                        style = "color: gray; font-weight: bold";
                        break;
                    case "NoCable":
                        style = "color: blue; font-weight: bold";
                        break;

                }
                if(d.status === "NoCable" || d['length'] == 0) {
                    return "<span style='"+style+"'>"+d.number+": " +d.status+" </span>";
                }
                return "<span style='"+style+"'>"+d.number+": " +d.status+" - "+d['length']+"M</span>";
            },
            async diagPort(interfaceId) {
                this.showPreload = true;
                this.portInfo = null;
                await this.$api.get('/component/dlink_switches/interfaces/' + this.device.id + '/cable_diag', {interface: interfaceId, from: 'device'}).then(r => {
                   this.portInfo = r.data.pairs
                }).catch( e => {
                  console.log(e)
                })
               this.showPreload = false
            },
        },
        created() {
            this.showPreload = false;
            this.portInfo = this.info;
        },
        watch: {
            info: function (n) {
                this.portInfo = n;
            }
        }
    }
</script>
