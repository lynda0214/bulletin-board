import {ID_PREFIX, PICTURE_HEIGHT, PICTURE_WIDTH} from '../constants';

export const initialState = {
    canvas: [
        {
            id: ID_PREFIX.CANVAS,
            x: 0,
            y: 0
        }
    ],
    pictures: [
        {
            id: `${ID_PREFIX.PICTURE}-1`,
            parentId: ID_PREFIX.CANVAS,
            x: Math.floor(Math.random() * (window.innerWidth - PICTURE_WIDTH)),
            y: Math.floor(Math.random() * (window.innerHeight - PICTURE_HEIGHT))
        },
        {
            id: `${ID_PREFIX.PICTURE}-2`,
            parentId: ID_PREFIX.CANVAS,
            x: Math.floor(Math.random() * (window.innerWidth - PICTURE_WIDTH)),
            y: Math.floor(Math.random() * (window.innerHeight - PICTURE_HEIGHT))
        }
    ],
    comments: []
}

export const ACTIONS = {
    ADD_PICTURE: 'ADD_PICTURE',
    REMOVE_PICTURE: 'REMOVE_PICTURE',
    UPDATE_PICTURE_POSITION: 'UPDATE_PICTURE_POSITION',
    SELECT_PICTURE_REORDER: 'SELECT_PICTURE_REORDER',
    ADD_COMMENT: 'ADD_COMMENT',
    REMOVE_COMMENT: 'REMOVE_COMMENT',
    UPDATE_COMMENT_THREAD: 'UPDATE_COMMENT_THREAD'
};

const CanvasStatusReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case ACTIONS.ADD_PICTURE: {
            return {
                ...state,
                pictures: [...state.pictures, payload]
            }
        }
        case ACTIONS.REMOVE_PICTURE:
            return {
                ...state,
                pictures: state.pictures.filter((picture) => (picture.id !== payload)),
                comments: state.comments.filter((comment) => (comment.parentId !== payload)),
            };
        case ACTIONS.UPDATE_PICTURE_POSITION: {
            const {id, x, y} = payload;
            const targetPicture = state.pictures.find((picture) => (picture.id === id));
            const restPictures = state.pictures.filter((picture) => (picture.id !== id));
            return {
                ...state,
                pictures: [
                    ...restPictures,
                    {...targetPicture, x, y}
                ]
            };
        }
        case ACTIONS.SELECT_PICTURE_REORDER: {
            const targetPicture = state.pictures.find((picture) => (picture.id === payload));
            const restPictures = state.pictures.filter((picture) => (picture.id !== payload));
            return {
                ...state,
                pictures: [
                    ...restPictures,
                    targetPicture
                ]
            };
        }
        case ACTIONS.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, payload]
            };
        case ACTIONS.REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter((comment) => (comment.id !== payload)),
            };
        case ACTIONS.UPDATE_COMMENT_THREAD: {
            const {id, user, timestamp, content} = payload;
            const targetComment = state.comments.find((comment) => (comment.id === id));
            const restComments = state.comments.filter((comment) => (comment.id !== id));
            return {
                ...state,
                comments: [
                    ...restComments,
                    {
                        ...targetComment,
                        thread: [...targetComment.thread, {user, timestamp, content}],
                    },
                ]
            };
        }

        default:
            return state;
    }
}

export default CanvasStatusReducer;