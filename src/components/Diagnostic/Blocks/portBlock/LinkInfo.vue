<template>
    <div>
        <div v-if="reloadInProccess"  align="center">
          <img src="/assets/images/loader.svg" style="height: 20px">
        </div>
        <div v-if="!reloadInProccess">
            <div v-for="(d, num) in info" :key="num">
                 <span v-html="mediumType(d.medium_type)"></span> <span v-html="adminState(d.admin_state)"></span>/<span v-html="operStatus(d.nway_status)"></span>
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
            mediumType: function (d) {
                if(d === 'Cooper') return '  (C)';
                if(d === 'Fiber') return ' (F)';
            },
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
