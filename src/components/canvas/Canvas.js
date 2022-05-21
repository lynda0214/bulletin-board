import {useContext, useEffect} from 'react';
import {Layer} from 'react-konva';
import {CanvasStatusContext} from '../../contexts/CanvasStatusProvider';
import Picture from '../picture/Picture';
import Comment from '../comment/Comment';
import {ID_PREFIX} from '../../constants';

const Canvas = ({mode, currentUser, selectID, newComment, newPicture}) => {
    const {
        pictures,
        comments,
        addComment,
        addPicture
    } = useContext(CanvasStatusContext);

    useEffect(() => {
        if (!newComment) return;
        addComment(newComment);
    }, [newComment]);

    useEffect(() => {
        if (!newPicture) return;
        addPicture(newPicture);
    }, [newPicture]);

    return (
        <Layer>
            {pictures.map((picture) =>
                <Picture key={picture.id}
                         mode={mode}
                         currentUser={currentUser}
                         isSelecting={picture.id === selectID}
                         comments={comments.filter((comment) => comment.parentId === picture.id)}
                         {...picture}
                />
            )}
            {comments
                .filter((comment) => comment.parentId === ID_PREFIX.CANVAS)
                .map((comment) =>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        mode={mode}
                        currentUser={currentUser}
                    />
                )}
        </Layer>
    );
}

export default Canvas;
