<template>
    <div>
        <div v-if="reloadInProccess"  align="center">
          <img src="/assets/images/loader.svg" style="height: 20px">
        </div>
        <div v-if="!reloadInProccess">
            <div v-for="(d, num) in info" :key="num">
                <span v-html="getVlans(d)"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VlanByPorts',
        props: {
            info: Array,
            reloadInProccess: Boolean,
        },
        methods: {
            getVlans: function (e) {
                return  "<div style='color: black'>"+(e.type === 'untagged' ? 'U' : 'T' ) +": <b>" + e.name + "</b> (" + e.id + ")</div>"
            },
        }
    }
</script>
