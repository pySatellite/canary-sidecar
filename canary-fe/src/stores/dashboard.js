import { defineStore } from 'pinia'
import { API_URL } from '../common/global.js'
import axios from 'axios';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({ data: null, loading: false,  error: null}),
    getters: {
        getData: (state) => state.data,
    },
    actions: {
        async fetchData() {
            this.loading = true;
            try {
                const response = await axios.get(`${API_URL}/dashboard/1`);
                this.data = response.data;
            } catch (error) {
                this.error = error.message;
                console.log("this.error", error.message)
            } finally {
                this.loading = false;
                // console.log("this.loading", this.loading)
            }
        },
    },
})
