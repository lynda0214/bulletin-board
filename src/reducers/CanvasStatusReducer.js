import {ID_PREFIX, IMAGE_HEIGHT, IMAGE_WIDTH} from "../constants";

export const initialState = {
    canvas: [
        {
            id: ID_PREFIX.CANVAS,
            x: 0,
            y: 0
        }
    ],
    images: [
        {
            id: `${ID_PREFIX.IMAGE}-1`,
            parentId: ID_PREFIX.CANVAS,
            x: Math.floor(Math.random() * (window.innerWidth - IMAGE_WIDTH)),
            y: Math.floor(Math.random() * (window.innerHeight - IMAGE_HEIGHT))
        },
        {
            id: `${ID_PREFIX.IMAGE}-2`,
            parentId: ID_PREFIX.CANVAS,
            x: Math.floor(Math.random() * (window.innerWidth - IMAGE_WIDTH)),
            y: Math.floor(Math.random() * (window.innerHeight - IMAGE_HEIGHT))
        }
    ],
    comments: []
}

export const ACTIONS = {
    UPDATE_IMAGE_POSITION: 'UPDATE_IMAGE_POSITION',
    REMOVE_IMAGE: 'REMOVE_IMAGE',
    ADD_COMMENT: 'ADD_COMMENT',
    REMOVE_COMMENT: 'REMOVE_COMMENT',
    PAN_CANVAS: 'PAN_STAGE',
    ZOOM_CANVAS: 'ZOOM_CANVAS'
};

const CanvasStatusReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case ACTIONS.UPDATE_IMAGE_POSITION:
            return {
                // todo
            };
        case ACTIONS.REMOVE_IMAGE:
            return {
                // todo
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