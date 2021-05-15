const initialState = {
    sidebarShow: true
}

const sidebar = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'TOGGLE_SIDEBAR':
            return {
                sidebarShow: !state.sidebarShow
            }
        default:
            return state
    }
}

export default sidebar;