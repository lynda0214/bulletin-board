import {useContext} from 'react';
import {Stage, Layer, Image, Text} from 'react-konva';
import useImage from "use-image";
import {ModeContext} from './store/ModeProvider';
import Toolbar from './toolbar/Toolbar';
import './App.css';

const KittenImage = () => {
    const IMG_WIDTH = 400;
    const IMG_HEIGHT = 300;
    const [image] = useImage(`https://placekitten.com/${IMG_WIDTH}/${IMG_HEIGHT}`);
    return <Image
        x={Math.floor(Math.random() * (window.innerWidth - IMG_WIDTH))}
        y={Math.floor(Math.random() * (window.innerHeight - IMG_HEIGHT))}
        draggable
        image={image}
    />;
};

const App = () => {
    return (
        <>
            <Toolbar/>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <KittenImage/>
                    <KittenImage/>
                </Layer>
            </Stage>
        </>
    );
};

export default App;
