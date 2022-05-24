import {useContext, useState, useRef, useEffect} from 'react';
import Konva from 'konva';
import {Stage} from 'react-konva';
import moment from 'moment';
import {ModeContext} from './contexts/ModeProvider';
import CanvasStatusProvider from './contexts/CanvasStatusProvider';
import Toolbar from './components/toolbar/Toolbar';
import Canvas from './components/canvas/Canvas';
import {MODE, ID_PREFIX} from './constants';
import './App.css';

const CURSOR_FOLDER = `cursor`;

const GET_CURSOR_PATH = {
    [MODE.PICTURE]: () => `url('${CURSOR_FOLDER}/picture.png'),auto`,
    [MODE.COMMENT]: () => `url('${CURSOR_FOLDER}/comment.png') 0 14,auto`,
    [MODE.POINTER]: () => `url('${CURSOR_FOLDER}/pointer.png'),auto`,
    [MODE.HAND]: (isClicking) => isClicking ? `url('${CURSOR_FOLDER}/hand-rock.png'),auto` : `url('${CURSOR_FOLDER}/hand-paper.png'),auto`,
    [MODE.MAGNIFIER]: () => `url('${CURSOR_FOLDER}/magnifier.png'),auto`,
};

const SCALE_BY = 1.01;

const App = () => {
    const stageRef = useRef(null);
    const {mode, user} = useContext(ModeContext);
    const [isClicking, setIsClicking] = useState(false);
    const [selectID, setSelectID] = useState(ID_PREFIX.CANVAS);
    const [newComment, setNewComment] = useState(null);
    const [newPicture, setNewPicture] = useState(null);

    const handleClick = (event) => {
        setIsClicking(true);
        switch (mode) {
            case MODE.POINTER:
                setSelectID(event.target.id());
                return;
            case MODE.COMMENT: {
                if (event.target.id().includes(ID_PREFIX.COMMENT)) return;
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
                return;
            }
            case MODE.PICTURE: {
                let {x, y} = event.target.getStage().getRelativePointerPosition();
                const id = `${ID_PREFIX.PICTURE}_${x}_${y}_${moment().format('x')}`;
                if (event.target.id().includes(id)) return;
                setNewPicture({id, x, y});
                return;
            }
            default:
                return;
        }
    }

    const handleUnclick = () => {
        setIsClicking(false);
    }

    const handleScroll = (event) => {
        event.evt.preventDefault();
        if (!stageRef.current) return;
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const {x: pointerX, y: pointerY} = stage.getPointerPosition();
        const mousePointTo = {
            x: (pointerX - stage.x()) / oldScale,
            y: (pointerY - stage.y()) / oldScale,
        };
        const newScale = event.evt.deltaY > 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;
        stage.scale({x: newScale, y: newScale});
        const newPos = {
            x: pointerX - mousePointTo.x * newScale,
            y: pointerY - mousePointTo.y * newScale,
        }
        stage.position(newPos);
    }

    return (
        <div data-testid="app" style={{cursor: `${GET_CURSOR_PATH[mode](isClicking)}`}}>
            <Toolbar/>
            <Stage
                ref={stageRef}
                id={ID_PREFIX.CANVAS}
                width={window.innerWidth}
                height={window.innerHeight}
                draggable={mode === 'hand'}
                onWheel={handleScroll}
                onMouseDown={handleClick}
                onMouseUp={handleUnclick}
            >
                <CanvasStatusProvider>
                    <Canvas selectID={selectID} mode={mode} currentUser={user} newComment={newComment}
                            newPicture={newPicture}/>
                </CanvasStatusProvider>
            </Stage>
        </div>
    );
};

export default App;
