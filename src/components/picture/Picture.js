import {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import useImage from 'use-image';
import {Group, Image} from 'react-konva';
import {Html} from 'react-konva-utils/es';
import {FaTimesCircle} from 'react-icons/fa';
import {CanvasStatusContext} from '../../contexts/CanvasStatusProvider';
import Comment from '../comment/Comment';
import {MODE, PICTURE_HEIGHT, PICTURE_WIDTH} from '../../constants';
import './Picture.css';

const Picture = ({
                     id,
                     x,
                     y,
                     mode,
                     currentUser,
                     isSelecting,
                     comments,
                 }) => {
    const {updatePicturePosition, removePicture, selectPictureReorder} = useContext(CanvasStatusContext);
    const [isDragging, setIsDragging] = useState(false);
    const [image] = useImage(`https://placekitten.com/${PICTURE_WIDTH}/${PICTURE_HEIGHT}`);
    const onMouseDownHandler = () => {
        selectPictureReorder(id);
    }
    const onDragStartHandler = () => {
        setIsDragging(true);
    };
    const onDragEndHandler = (event) => {
        const newX = event.target.x();
        const newY = event.target.y();
        updatePicturePosition(id, newX, newY);
        setIsDragging(false);
    };
    const onClickRemove = (id) => {
        if (mode !== MODE.POINTER) return;
        if (isDragging) return;
        removePicture(id);
    };
    return (
        <Group
            x={x}
            y={y}
            draggable={mode === MODE.POINTER}
            onMouseDown={onMouseDownHandler}
            onDragStart={onDragStartHandler}
            onDragEnd={onDragEndHandler}
        >
            <Image
                id={id}
                image={image}
                strokeWidth={isSelecting ? 5 : 0}
                stroke="#0D99FF"
            />
            {comments.map((comment) =>
                <Comment
                    key={comment.id}
                    comment={comment}
                    mode={mode}
                    currentUser={currentUser}
                />
            )}
            {isSelecting &&
                <Html
                    divProps={{
                        style: {
                            position: 'absolute',
                            width: `${PICTURE_WIDTH}px`
                        }
                    }}>
                    <div data-testid="remove-button"
                         className="picture__remove-button"
                         onClick={() => onClickRemove(id)}>
                        <FaTimesCircle/>
                    </div>
                </Html>
            }
        </Group>
    );
};

Picture.propTypes = {
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    currentUser: PropTypes.string.isRequired,
    isSelecting: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
}

export default Picture;