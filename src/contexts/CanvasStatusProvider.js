import {useReducer, createContext} from 'react';
import CanvasStatusReducer, {ACTIONS, initialState} from '../reducers/CanvasStatusReducer';

export const CanvasStatusContext = createContext({});

const CanvasStatusProvider = ({children}) => {
    const [state, dispatch] = useReducer(CanvasStatusReducer, initialState);
    const defaultValue = {
        canvas: state.canvas,
        pictures: state.pictures,
        comments: state.comments,
        updatePicturePosition: (id, x, y) => {
            dispatch({
                type: ACTIONS.UPDATE_PICTURE_POSITION,
                payload: {id, x, y}
            });
        },
        removePicture: (id) => {
            dispatch({
                type: ACTIONS.REMOVE_PICTURE,
                payload: id
            });
        },
        addComment: (newComment) => {
            dispatch({
                type: ACTIONS.ADD_COMMENT,
                payload: newComment
            });
        },
        removeComment: (id) => {
            dispatch({
                type: ACTIONS.REMOVE_COMMENT,
                payload: id
            });
        }
    };
    return (
        <CanvasStatusContext.Provider value={defaultValue}>
            {children}
        </CanvasStatusContext.Provider>
    );
};

export default CanvasStatusProvider;