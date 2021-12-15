<template>
  <div class="choose-address">
    <div class="row">
      <div class="col-xs-12 col-md-5 col-sm-5 col-lg-5 col-xl-2">
        <label v-if="addLabels">Город</label>
        <multiselect
            class="address-form form-city"
            label="name"
            :selectLabel="''"
            v-model="cities.selected"
            :options="cities.data"
            @input="citiesUpdated"
            :loading="cities.loading"
            :limit="limitDisplayChoosed"
            track-by="id"
            :hideSelected="true"
            :placeholder="'Укажите город'"
            :close-on-select="!multiSelect.city"
            :multiple="multiSelect.city"
        >
          <span slot="noOptions">Нет вариантов</span>
          <span slot="noResult">Нет результатов</span>
        </multiselect>
      </div>
      <div class="col-xs-12 col-md-5 col-sm-5 col-lg-5 col-xl-2">
        <label  v-if="addLabels">Улица</label>

        <multiselect
            class="address-form form-street"
            label="name"
            track-by="id"
            :limit="limitDisplayChoosed"
            :selectLabel="''"
            v-model="streets.selected"
            :options="streets.data"
            @input="streetsUpdated"
            :hideSelected="true"
            :loading="streets.loading"
            :placeholder="'Укажите улицу'"
            :close-on-select="!multiSelect.street"
            :multiple="multiSelect.street"

        >
          <span slot="noOptions">Нет вариантов</span>
          <span slot="noResult">Нет результатов</span>
        </multiselect>
      </div>

      <div class="col-xs-12 col-md-2 col-sm-2 col-lg-2 col-xl-2">
        <label  v-if="addLabels">Дом</label>
        <multiselect
            class="address-form form-house"
            label="name"
            track-by="id"
            :limit="limitDisplayChoosed"
            :selectLabel="''"
            v-model="houses.selected"
            :options="houses.data"
            @input="housesUpdated"
            :hideSelected="true"
            :loading="houses.loading"
            :placeholder="'Укажите дом'"
            :close-on-select="!multiSelect.house"
            :multiple="multiSelect.house"
        >
          <span slot="noOptions">Нет вариантов</span>
          <span slot="noResult">Нет результатов</span>
        </multiselect>
      </div>
      <select :name="housesInputName" multiple hidden="hidden" :id="housesInputId">
        <option v-for="(v, k) in selectedHouses" :key="k" selected :value="v.id"></option>
      </select>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import ServerApi from "../../common/all-ok-billing-api";

const NO_MULTI = -3
const SELECT_ALL = -1
const UNSELECT_ALL = -2

export default {
  components: {
    Multiselect
  },
  name: 'ChooseAddress',
  props: {
    addLabels: {
      type: Boolean,
      default: true,
    },
    limitDisplayChoosed: {
      type: Number,
      default: 2,
    },
    housesInputName: {
      type: String,
      default: 'houses'
    },
    housesInputId: {
      type: String,
      default: 'houses'
    },
    multiSelectFor: {
      type: String,
      default: 'city,street,house'
    },
    baseUrl: {
      type: String,
      default: process.env.VUE_APP_ALL_OK_BILLING_API_URL
    },
    authKey: {
      type: String,
      default: process.env.VUE_APP_ALL_OK_BILLING_AUTH_KEY
    }
  },
  computed: {
    selectedHouses() {
      if(this.houses.selected === null) {
        return  []
      }
     if (this.houses.selected instanceof Array) {
       return this.houses.selected
     } else {
       return  [this.houses.selected]
     }
    }
  },
  data() {
    return {
      api: null,
      multiSelect: {
        city: false,
        street: false,
        house: false,
      },
      cities: {
        loading: false,
        data: [],
        selected: null,
      },
      streets: {
        loading: false,
        data: [],
        selected: null,
      },
      houses: {
        loading: false,
        data: [],
        selected: null,
      },
    }
  },
  watch: {
    cities: {
      handler(n) {
        console.log("Cities changed called")
        if (n.selected === null || (n.selected.isArray && n.selected.length === 0)) {
          this.streets.data = []
          this.streets.selected = null
        } else {
          if (!this.multiSelect.city) {
            this.loadStreets([n.selected])
          } else {
            this.loadStreets(n.selected)
          }
        }
      },
      deep: true,
    },
    streets: {
      handler(n) {
        console.log("Street changed called")
        if (n.selected === null || (n.selected.isArray && n.selected.length === 0)) {
          this.houses.data = []
          this.houses.selected = null
        } else {
          if (!this.multiSelect.street) {
            this.loadHouses([n.selected])
          } else {
            this.loadHouses(n.selected)
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    checkMultiSelect(choosed) {
      let multiSelect = NO_MULTI
      if (choosed === null) return multiSelect
      console.log(choosed)
      if (!(choosed instanceof Array)) return multiSelect

      if (choosed.filter((e) => {
        return e.id === SELECT_ALL
      }).length !== 0) multiSelect = SELECT_ALL
      if (choosed.filter((e) => {
        return e.id === UNSELECT_ALL
      }).length !== 0) multiSelect = UNSELECT_ALL
      return multiSelect
    },
    citiesUpdated(choosed) {
      if (choosed !== null) {
        let multiSelect = this.checkMultiSelect(choosed)
        console.log(multiSelect)
        if (multiSelect !== NO_MULTI) {
          this.cities.selected = []
          this.cities.data.forEach((e, k) => {
            if (e.id === SELECT_ALL || e.id === UNSELECT_ALL) {
              if (e.id === SELECT_ALL) this.cities.data[k] = {id: UNSELECT_ALL, name: 'Убрать все'}
              if (e.id === UNSELECT_ALL) this.cities.data[k] = {id: SELECT_ALL, name: 'Выбрать все'}
              return
            }
            if (multiSelect === SELECT_ALL) this.cities.selected.push(e)
          })
        }
        console.log(this.cities.selected)
      }
    },
    streetsUpdated(choosed) {
      if (choosed !== null) {
        let multiSelect = this.checkMultiSelect(choosed)
        if (multiSelect !== NO_MULTI) {
          this.streets.selected = []
          this.streets.data.forEach((e, k) => {
            if (e.id === SELECT_ALL || e.id === UNSELECT_ALL) {
              if (e.id === SELECT_ALL) this.streets.data[k] = {id: UNSELECT_ALL, name: 'Убрать все'}
              if (e.id === UNSELECT_ALL) this.streets.data[k] = {id: SELECT_ALL, name: 'Выбрать все'}
              return
            }
            if (multiSelect === SELECT_ALL) this.streets.selected.push(e)
          })
        }
        console.log(this.streets.selected)
      }
    },
    housesUpdated(choosed) {
      if (choosed !== null) {
        let multiSelect = this.checkMultiSelect(choosed)
        if (multiSelect !== NO_MULTI) {
          this.houses.selected = []
          this.houses.data.forEach((e, k) => {
            if (e.id === SELECT_ALL || e.id === UNSELECT_ALL) {
              if (e.id === SELECT_ALL) this.houses.data[k] = {id: UNSELECT_ALL, name: 'Убрать все'}
              if (e.id === UNSELECT_ALL) this.houses.data[k] = {id: SELECT_ALL, name: 'Выбрать все'}
              return
            }
            if (multiSelect === SELECT_ALL) this.houses.selected.push(e)
          })
        }
        console.log(this.houses.selected)
      }
    },
    loadCities() {
      this.cities.loading = true
      this.api.get('/private/addresses/cities').then(r => {
        this.cities.data = r.data
        if (this.multiSelect.city) {
          this.cities.data = [{id: SELECT_ALL, name: "Выбрать все"}].concat(r.data)
        }
        console.log("Cities success loaded, count=" + r.data.length)
      }).finally(() => {
        this.cities.loading = false
      }).catch(e => {
        console.log(e)
        alert(e)
      })
    },
    async loadStreets(cities = []) {
      this.streets.selected = null
      this.streets.data = []
      if (cities.length === 0) {
        return
      }
      this.streets.loading = true
      if (this.multiSelect.street) {
        this.streets.data.push({id: SELECT_ALL, name: "Выбрать все"})
      }
      for (const city of cities) {
        await this.api.get('/private/addresses/streets', {
          'city_id': city.id
        }).then(r => {
          console.log(`Streets success loaded for city=${city.id}, count=` + r.data.length)
          this.streets.data = this.streets.data.concat(r.data)
        }).catch(e => {
          console.log(e)
          alert(e)
        })
      }
      this.streets.loading = false
    },
    async loadHouses(streets = []) {
      this.houses.selected = null
      this.houses.data = []
      if (streets.length === 0) {
        return
      }
      this.houses.loading = true
      if (this.multiSelect.house) {
        this.houses.data.push({id: SELECT_ALL, name: "Выбрать все"})
      }
      for (const street of streets) {
        await this.api.get('/private/addresses/houses', {
          'street_id': street.id
        }).then(r => {
          console.log(`Streets success loaded for street=${street.id}, count=` + r.data.length)
          this.houses.data = this.houses.data.concat(r.data)
        }).catch(e => {
          console.log(e)
          alert(e)
        })
      }
      this.houses.loading = false
    }
  },
  mounted() {
    this.api = new ServerApi(this.baseUrl).setToken(this.authKey)
    this.loadCities()
    this.multiSelectFor.split(',').forEach(e => {
      switch (e.trim()) {
        case 'city':
          this.multiSelect.city = true;
          break;
        case 'street':
          this.multiSelect.street = true;
          break;
        case 'house':
          this.multiSelect.house = true;
          break;
      }
    })
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.address-form {
  margin-bottom: 5px;
  font-size: 14px;
}
.address-form .multiselect__tags {
  height: 22px;
  font-size: 14px;
}
.address-form .multiselect__content-wrapper .multiselect__content .multiselect__element .multiselect__option--highlight {
    background-color: #2A3F54;
}
.address-form .multiselect__tags .multiselect__tags-wrap .multiselect__tag  {
    padding: 4px 26px 4px 10px;
  margin-bottom: 3px;
  margin-right: 3px;
    background-color: #2A3F54;
}
.address-form .multiselect__tags .multiselect__tags-wrap .multiselect__tag .multiselect__tag-icon  {
    color: #FFFFFF;
  background-color: #2A3F54;
}
.address-form .multiselect__tags .multiselect__tags-wrap .multiselect__tag .multiselect__tag-icon:hover  {
    color: #FFFFFF;background-color: #527ba6;
}

.address-form .multiselect__tags .multiselect__tags-wrap .multiselect__tag .multiselect__tag-icon:after  {
    color: #F0F0F0;
}

</style>
