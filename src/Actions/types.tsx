export const SEND_TO_EDITOR = 'SEND_TO_EDITOR'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export interface toAction {
    orignalImage: string,
    removedImage: string,
    imgName:string,
    dealerId:string,
    link:string
}


export type sendToEditorAction = { type: typeof SEND_TO_EDITOR, payload: toAction }