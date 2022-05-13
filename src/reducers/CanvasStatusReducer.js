import {ID_PREFIX, PICTURE_HEIGHT, PICTURE_WIDTH} from "../constants";

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
    UPDATE_PICTURE_POSITION: 'UPDATE_PICTURE_POSITION',
    REMOVE_PICTURE: 'REMOVE_PICTURE',
    ADD_COMMENT: 'ADD_COMMENT',
    REMOVE_COMMENT: 'REMOVE_COMMENT',
    PAN_CANVAS: 'PAN_STAGE',
    ZOOM_CANVAS: 'ZOOM_CANVAS'
};

const CanvasStatusReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case ACTIONS.UPDATE_PICTURE_POSITION:
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
        case ACTIONS.REMOVE_PICTURE:
            return {
                ...state,
                pictures: state.pictures.filter((picture) => (picture.id !== payload))
            };
        case ACTIONS.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, payload]
            };
        case ACTIONS.REMOVE_COMMENT:
            return {
                // todo
            };
        default:
            return state;
    }
}

export default CanvasStatusReducer;