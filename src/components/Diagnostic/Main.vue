<template>
  <div class="container-fluid">
    <div class="row" v-if="loading">
      <div class="col-sm-12">
        <Preloader/>
      </div>
    </div>
    <div class="row" v-if="!loading && error === ''">
      <div class="col-sm-12 col-lg-12 col-md-12">
        <div style="font-size: 16px">
          Устройство: <b>{{ data.device.ip }}</b>, {{ data.device.model.type === 'OLT' ? 'ОНУ' : 'порт' }}:
          <b>{{ data.interface.name }}</b>
        </div>
      </div>
      <div class="clearfix"></div>
      <OLT :data="data.detailed.olt" v-if="data.detailed.olt !== null"></OLT>
      <SwitchDevice :data="data.detailed.switch" v-if="data.detailed.switch !== null"></SwitchDevice>
    </div>
    <h3 align="center" style="text-align: center; margin: 30px" v-else>{{ error }}</h3>
  </div>
</template>

<script>
import ServerApi from "../../common/wildcore-api-client";
import Preloader from "../Blocks/Preloader";
import OLT from "./Blocks/OLT";
import SwitchDevice from "./Blocks/SwitchDevice";

export default {
  components: {SwitchDevice, Preloader, OLT},
  name: 'wildcore-diag',
  props: {
    baseUrl: {
      type: String,
      default: '/api/v1'
    },
    authKey: {
      type: String,
      default: '',
    },
    deviceIp: {
      type: String,
      default: '10.15.1.2',
    },
    interface: {
      type: String,
      default: '16779015',
    },
  },
  data() {
    return {
      data: null,
      error: '',
      api: null,
      mustReload: false,
      loading: true,
    }
  },
  watch: {
    deviceIp: {
      handler() {
        this.mustReload = true
      }
    },
    interface: {
      handler() {
        this.mustReload = true
      }
    },
    mustReload: {
      handler() {
        setTimeout(() => {
          this.startDiagnostic()
        }, 10)
      }
    }
  },
  methods: {
    async startDiagnostic() {
      if (!this.deviceIp || !this.interface) return
      this.loading = true
      await this.api.post('/component/diagnostic/interface-diag', {
        device: this.deviceIp,
        interface: this.interface,
      }).then(r => {
        console.log(r.data)
        this.data = r.data
      }).catch((e) => {
        this.error = e.message
      }).finally(() => {
        this.loading = false
      })

    }
  },
  mounted() {
    this.api = new ServerApi(this.baseUrl)
    this.api.setToken(this.authKey)
    this.startDiagnostic()
  }
}
</script>

<style scoped>
</style>
