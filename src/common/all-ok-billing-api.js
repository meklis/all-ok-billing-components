import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import {AxiosInstance} from 'axios'


Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


export default class ServerApi {
    /**
     * @type AxiosInstance
     */
    _http = null

    _promises = []

    _inProcess = []

    _action401 = null

    _promisesEnabled = false

    set401callback(callback) {
        this._action401 = callback
        return this
    }

    enableSupportWaiting() {
        this._promisesEnabled = true
    }

    disableSupportWaiting() {
        this._promisesEnabled = false
    }

    _addPromise(promise) {
        if (this._promisesEnabled) {
            this._promises.push(promise)
        }
        return promise
    }

    constructor(baseURL) {
        const defaultOptions = {
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let cache = JSON.parse(localStorage.getItem('api-cache'))
        if (typeof cache !== 'undefined' && cache !== null) {
            this._cache = cache
        }
        this._http = axios.create(defaultOptions);
    }

    setToken(token) {
        this._http.interceptors.request.use(function (config) {
            config.headers['X-Auth-Key'] = token;
            return config;
        });
        return this
    }

    _processError(e, hideErrors = false) {
        if (e.response.status === 401 && this._action401 !== null) {
            this._action401(e)
            return
        }
        if(!hideErrors) {
            if (e.response) {
                throw new Error("Error loading info from API: " + e.response.data.error.description)
            } else {
                throw e
            }
        }
    }

    get(url, params = {}, hideErrors = false) {
        return this._addPromise(this._http.get(url, {
            params: params,

        }).then(r => {
            return r.data
        }).catch(e => {
            this._processError(e, hideErrors)
            throw e
        }))
    }

    post(url, data = {}, hideErrors = false) {
        return this._addPromise(this._http.post(url, data).then(r => {
            return r.data
        }).catch(e => {
            this._processError(e, hideErrors)
            throw e
        })).finally(() => {

        })
    }

    put(url, data = {}, hideErrors = false) {
        return this._addPromise(this._http.put(url, data).catch(e => {
            this._processError(e, hideErrors)
            throw e
        })).then(r => {
            return r.data
        }).finally(() => {

        })
    }

    delete(url, data = {}, hideErrors = false) {
        return this._addPromise(this._http.delete(url, data).then(r => {
            return r.data
        }).catch(e => {
            this._processError(e, hideErrors)
            throw e
        })).finally(() => {

        })
    }

    /**
     *
     * @returns {Promise<unknown[]>}
     */
    async waitResponses() {
        let resp = await axios.all(this._promises);
        this._promises = [];
        return resp;
    }
}
