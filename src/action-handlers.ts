export type LoginAction = { type: 'login'; value: any }
export function userHandler(currentState, action) {
    return action.type === 'login'
        ? { ...currentState, keywords: action.value }
        : currentState
}
