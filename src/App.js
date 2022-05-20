import {useContext, useState} from 'react';
import Konva from 'konva';
import {Stage} from 'react-konva';
import {ModeContext} from './contexts/ModeProvider';
import CanvasStatusProvider from './contexts/CanvasStatusProvider';
import Toolbar from './components/toolbar/Toolbar';
import Canvas from './components/canvas/Canvas';
import {MODE, ID_PREFIX} from './constants';
import './App.css';

const GET_CURSOR_PATH = {
    [MODE.COMMENT]: () => `url('cursor/comment.png') 0 14,auto`,
    [MODE.POINTER]: () => `url('cursor/pointer.png'),auto`,
    [MODE.HAND]: (isClicking) => isClicking ? `url('cursor/hand-rock.png'),auto` : `url('cursor/hand-paper.png'),auto`,
    [MODE.MAGNIFIER]: () => `url('cursor/magnifier.png'),auto`,
};

const App = () => {
    const {mode, user} = useContext(ModeContext);
    const [isClicking, setIsClicking] = useState(false);
    const [selectID, setSelectID] = useState(ID_PREFIX.CANVAS);
    const [newComment, setNewComment] = useState(null);

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
            y: y,
            starter: user,
            thread: [],
        }
        setNewComment(newAnchor);
    }

    const handleUnclick = () => {
        setIsClicking(false);
    }

    return (
        <div style={{cursor: `${GET_CURSOR_PATH[mode](isClicking)}`}}>
            <Toolbar/>
            <Stage
                id={ID_PREFIX.CANVAS}
                width={window.innerWidth}
                height={window.innerHeight}
                draggable={mode === 'hand'}
                onMouseDown={handleClick}
                onMouseUp={handleUnclick}
            >
                <CanvasStatusProvider>
                    <Canvas selectID={selectID} mode={mode} currentUser={user} newComment={newComment}/>
                </CanvasStatusProvider>
            </Stage>
        </div>
    );
};

export default App;
