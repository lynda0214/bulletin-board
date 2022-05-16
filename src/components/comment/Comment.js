import {useState} from 'react';
import {Circle, Group, Line} from 'react-konva';
import {Html} from 'react-konva-utils';
import {MODE} from '../../constants';
import './Comment.css';


const COMMEMT_STAGE = {
    STARTER: 'starter',
    COLLAPSED: 'collapsed',
    THREAD: 'thread',
}

const Comment = ({comment, mode}) => {
    const {id, x, y, starter} = comment;
    const [commentStage, setCommentStage] = useState();
    const getCommentBody = () => {
        switch (commentStage) {
            case COMMEMT_STAGE.STARTER: // todo
                return <CommentStarter starter={starter}/>;
            case COMMEMT_STAGE.THREAD: // todo
                return <CommentThread/>;
            default:
                return <CommentCollapsed mode={mode} starter={starter} setCommentStage={setCommentStage}/>
        }
    };
    return (
        <Group
            x={x}
            y={y}
        >
            <Circle id={id} width={10} height={10} fill="#0D99FF"/>
            <Line points={[0, 0, 50, 0]} strockWidth={1} stroke="#0D99FF"/>
            {getCommentBody()}
        </Group>
    );
};

export default Comment;

const CommentCollapsed = ({mode, starter, setCommentStage}) => {
    const openThread = () => {
        if (mode !== MODE.POINTER) return;
        setCommentStage(COMMEMT_STAGE.THREAD);
    }
    return (
        <Html divProps={{
            style: {
                position: 'absolute',
                top: '-18px',
                left: '50px'
            }
        }}>
            <div className="comment-collapsed__avatar" onClick={openThread}>
                {starter.charAt(0).toUpperCase()}
            </div>
        </Html>
    );
};

const CommentThread = () => { // todo
    return null;
};

const CommentStarter = () => { // todo
    return null;
};