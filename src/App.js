import {useContext, useState} from 'react';
import Konva from 'konva';
import {Stage, Layer, Rect} from 'react-konva';
import {ModeContext} from './contexts/ModeProvider';
import {CanvasStatusContext} from './contexts/CanvasStatusProvider';
import Toolbar from './components/toolbar/Toolbar';
import Picture from './components/picture/Picture';
import {MODE, ID_PREFIX} from './constants';
import './App.css';

const GET_CURSOR_PATH = {
    [MODE.COMMENT]: () => `url('cursor/comment.png')`,
    [MODE.POINTER]: () => `url('cursor/pointer.png')`,
    [MODE.HAND]: (isClicking) => isClicking ? `url('cursor/hand-rock.png')`: `url('cursor/hand-paper.png')`,
    [MODE.MAGNIFIER]: () => `url('cursor/magnifier.png')`,
};

const App = () => {
    const {mode} = useContext(ModeContext);
    const {pictures, comments, updatePicturePosition, removePicture, addComment} = useContext(CanvasStatusContext);
    const [selectID, setSelectID] = useState(ID_PREFIX.CANVAS);
    const [isClicking, setIsClicking] = useState(false);

    const handleClick = (event) => {
        setIsClicking(true);
        if (mode === MODE.POINTER) {
            setSelectID(event.target.id());
        }
        if (mode !== MODE.COMMENT || event.target.id().includes(ID_PREFIX.COMMENT)) {
            return;
        }

        let {x, y} = event.target.getStage().getRelativePointerPosition();
        if (event.target.id() !== ID_PREFIX.CANVAS) { // position calibration
            x -= event.target.parent.x();
            y -= event.target.parent.y();
        }

        const newAnchor = {
            id: `${ID_PREFIX.COMMENT}_${x}_${y}`,
            parentId: event.target.id(),
            width: 10,
            height: 10,
            fill: Konva.Util.getRandomColor(),
            x: x,
            y: y
        }
        addComment(newAnchor);
    }

    const handleUnclick = () => {
        setIsClicking(false);
    }

    return (
        <div style={{cursor: `${GET_CURSOR_PATH[mode](isClicking)},auto`}}>
            <Toolbar/>
            <Stage id={ID_PREFIX.CANVAS}
                   width={window.innerWidth}
                   height={window.innerHeight}
                   draggable={mode === 'hand'}
                   onMouseDown={handleClick}
                   onMouseUp={handleUnclick}
            >
                <Layer>
                    {pictures.map((picture) =>
                        <Picture key={picture.id}
                                 mode={mode}
                                 isSelecting={picture.id === selectID}
                                 comments={comments.filter((comment) => comment.parentId === picture.id)}
                                 updatePicturePosition={updatePicturePosition}
                                 removePicture={removePicture}
                                 {...picture}
                        />
                    )}
                    {comments
                        .filter((comment) => comment.parentId === ID_PREFIX.CANVAS)
                        .map((comment) =>
                        <Rect key={comment.id}
                              {...comment}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default App;
