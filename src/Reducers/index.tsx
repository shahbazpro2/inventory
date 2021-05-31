import * as actionType from '../Actions/types'
import { combineReducers } from 'redux'
import user from './../redux/reducers/index';

// Abdullah -- reducer

export interface editorState {
    editor: {
        editor: {
            orignalImage: string,
            removedImage: string,
            imgName:string,
            dealerId:string,
            link: string
        }
       
    }
    initialUser:{}
}
const initialEditor = {
    editor: {
        orignalImage: '',
        removedImage: '',
        imgName:'',
        dealerId:'',
        link: ''
    }
}

const editorReducer = (state = initialEditor, action:  actionType.sendToEditorAction) => {
    switch (action.type) {
        case actionType.SEND_TO_EDITOR:
            return {
                ...state,
                editor: action.payload
            }
        
        default:
            return state
    }
}

// Main reducer function
const rootReducer = combineReducers({
    editor: editorReducer,
    user: user,
})
export default rootReducer;