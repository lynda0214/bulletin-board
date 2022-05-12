import {useState} from 'react';
import useImage from 'use-image';
import {Image} from 'react-konva';
import {MODE} from '../contexts/ModeProvider';
import {IMAGE_HEIGHT, IMAGE_WIDTH} from '../constants';

const MyImage = ({mode, id, x, y}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [image] = useImage(`https://placekitten.com/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`);
    const onDragStartHandler = () => {
        // todo: enlarge, border, remove button
        setIsDragging(true);
    };
    const onDragEndHandler = () => {
        // todo: update image position
        setIsDragging(false);
    };
    const onClickRemove = () => {
        // todo: remove image
    };
    return <Image
        id={id}
        x={x}
        y={y}
        draggable={mode === MODE.POINTER}
        image={image}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
    />;
};

export default MyImage;