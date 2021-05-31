import * as actionTypes from './types'
export const sendToEditor = (data: actionTypes.toAction): actionTypes.sendToEditorAction => {
    return {
        type: actionTypes.SEND_TO_EDITOR,
        payload: data
    }
}

