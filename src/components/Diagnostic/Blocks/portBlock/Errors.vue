<template>
    <div>
        <div v-if="reloadInProccess "  align="center">
          <img src="/assets/images/loader.svg" style="height: 20px">
        </div>
        <div v-if="!reloadInProccess">
            <div v-html="getErrors()"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            errors: Object,
            rmon: Object,
            reloadInProccess: Boolean,
        },
        methods: {
            getErrors: function () {

                if(this.rmon !== null) {
                    let errors = this.rmon.crc_align_errors + "/" +
                            this.rmon.collisions + "/" +
                            this.rmon.undersize_pkts + "/" +
                            this.rmon.oversize_pkts + "/" +
                            this.rmon.fragments + "/" +
                            this.rmon.jabber + "/" +
                            this.rmon.drop_events ;
                    let maxVal = this.getMaxValueFromArr([
                        this.rmon.crc_align_errors ,
                        this.rmon.collisions,
                        this.rmon.undersize_pkts ,
                        this.rmon.oversize_pkts,
                        this.rmon.fragments ,
                        this.rmon.jabber,
                        this.rmon.drop_events,
                    ]);
                    let color = this.colorByVal(maxVal);
                    let weight = this.boldBySizes(maxVal);
                    return "<span style='color: "+color+"; font-weight: "+ weight +"'>"+errors+"</span>";
                }  else if (this.errors !== null) {
                    let maxVal = this.getMaxValueFromArr([
                        this.errors.in_errors,
                        this.errors.out_errors,
                    ]);
                    let color = this.colorByVal(maxVal);
                    let weight = this.boldBySizes(maxVal);
                    return "<span style='color: "+color+"; font-weight: "+ weight +"'>"+this.errors.in_errors + "/" + this.errors.out_errors+"</span>";
                } else {
                    return  "";
                }
            },
            colorByVal: function (val) {

                let color = '';
                if((val === 0)) {
                    color = "gray";
                } else if (val < 50) {
                    color = "blue";
                } else {
                    color = 'red';
                }
                return color
            },
            boldBySizes: function (val) {
                let weight = '400';
                if((val === 0)) {
                    weight = "400";
                } else if (val < 50) {
                    weight = "500";
                } else {
                    weight = '700';
                }
                return weight
            },
            getMaxValueFromArr(arr) {
                var maxVal = 0;
                arr.forEach(e=>{
                    if (e > maxVal) {
                        maxVal = e;
                    }
                });
                return maxVal;
            }
        },
    }
</script>
