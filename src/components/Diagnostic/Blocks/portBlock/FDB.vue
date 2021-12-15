<template>

    <div style="max-height: 180px; overflow-y: auto; ">
        <div v-if="reloadInProccess"  align="center">
          <img src="/assets/images/loader.svg" style="height: 20px">
        </div>
        <div v-if="!reloadInProccess" style="max-height: 200px; overflow-x: auto; ">
            <div v-for="(d, num) in info" :key="num" v-html="getLine(d)" >
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            info: Array,
            reloadInProccess: Boolean,
        },
        data: function () {
            return {

            }
        },
        methods: {
            getLine: function (d) {
                 return "<span style='font-weight: bold'>"+d.mac+"</span> ("+d.vlan_id+")"
            }
        }
    }
</script>
