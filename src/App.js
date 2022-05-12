import {useContext, useState} from 'react';
import Konva from 'konva';
import {Stage, Layer, Rect} from 'react-konva';
import {MODE, ModeContext} from './contexts/ModeProvider';
import {CanvasStatusContext} from './contexts/CanvasStatusProvider';
import Toolbar from './toolbar/Toolbar';
import MyImage from './components/MyImage';
import {ID_PREFIX} from './constants';
import './App.css';

const App = () => {
    const {mode} = useContext(ModeContext);
    const {canvas, images, comments, addComment} = useContext(CanvasStatusContext);

    const handleClick = (event) => {
        if (mode !== MODE.COMMENT || event.target.id().includes(ID_PREFIX.COMMENT)) {
            return;
        }
        const {x, y} = event.target.getStage().getPointerPosition();
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
        console.log(
            event.target.id(),
            event.target.getStage().getPointerPosition().x,
            event.target.getStage().getPointerPosition().y
        );
    }

    return (
        <>
            <Toolbar/>
            <Stage id={ID_PREFIX.CANVAS} width={window.innerWidth} height={window.innerHeight} onMouseDown={handleClick}>
                <Layer>
                    {images.map((image) =>
                        <MyImage key={image.id} mode={mode} {...image}/>
                    )}
                    {comments.map((comment) =>
                        <Rect key={comment.id} {...comment}/>
                    )}
                </Layer>
            </Stage>
        </>
    );
};

export default App;
