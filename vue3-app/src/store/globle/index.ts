import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalStore = defineStore('global', () => {
    const globalState = reactive({
        user: {
            name: '张三',
            role: 'admin'
        },
        theme: 'light'
    })

    function setUser(user: any) {
        globalState.user = user
    }

    function setTheme(theme: string) {
        globalState.theme = theme
    }

    return {
        globalState,
        setUser,
        setTheme
    }
})