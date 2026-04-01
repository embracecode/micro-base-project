export const baseState = {
    user: {
        name: '张三',
        role: 'admin'
    },
    theme: 'light'
}
export function setBaseState(newState: any) {
    Object.assign(baseState, newState)
}