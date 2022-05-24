import {useState, useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import {Circle, Group, Line} from 'react-konva';
import {Html} from 'react-konva-utils/es';
import moment from 'moment';
import {FaArrowCircleUp, FaRegCheckCircle, FaTimes} from 'react-icons/fa';
import {CanvasStatusContext} from '../../contexts/CanvasStatusProvider';
import './Comment.css';

const COMMEMT_STAGE = {
    STARTER: 'starter',
    COLLAPSED: 'collapsed',
    THREAD: 'thread',
}

const MAX_LENGTH_MESSAGE = 100;

const Comment = ({
                     currentUser,
                     comment,
                     mode,
                 }) => {
    const {id, x, y, starter, thread} = comment;
    const [commentStage, setCommentStage] = useState(COMMEMT_STAGE.STARTER);
    const getCommentBody = () => {
        switch (commentStage) {
            case COMMEMT_STAGE.STARTER:
                return <CommentStarter
                    commentId={id}
                    starter={starter}
                    setCommentStage={setCommentStage}
                />;
            case COMMEMT_STAGE.THREAD:
                return <CommentThread
                    commentId={id}
                    starter={starter}
                    currentUser={currentUser}
                    thread={thread}
                    setCommentStage={setCommentStage}
                />;
            default:
                return <CommentCollapsed
                    mode={mode}
                    starter={starter}
                    setCommentStage={setCommentStage}
                />
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

Comment.propTypes = {
    currentUser: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired
}

export default Comment;

const CommentCollapsed = ({starter, setCommentStage}) => {
    const openThread = () => {
        setCommentStage(COMMEMT_STAGE.THREAD);
    }
    return (
        <Html divProps={{
            style: {
                position: 'absolute'
            }
        }}>
            <div className="comment-collapsed">
                <div className="comment__avatar comment__avatar--collapsed" data-testid="open-collapsed-comment"
                     onClick={openThread}>
                    {starter.charAt(0).toUpperCase()}
                </div>
            </div>
        </Html>
    );
};

CommentCollapsed.propTypes = {
    starter: PropTypes.string.isRequired,
    setCommentStage: PropTypes.func.isRequired
}

const CommentThread = ({commentId, starter, currentUser, thread, setCommentStage}) => {
    const {removeComment, updateCommentThread} = useContext(CanvasStatusContext);
    const resolve = () => {
        removeComment(commentId);
    };

    const close = () => {
        setCommentStage(COMMEMT_STAGE.COLLAPSED);
    };

    return (
        <Html divProps={{
            style: {
                position: 'absolute'
            }
        }}>
            <div data-testid="comment-thread" className="comment-thread">
                <div className="comment__avatar">
                    {starter.charAt(0).toUpperCase()}
                </div>
                <div className="comment-thread__panel">
                    <div className="comment-thread__panel__header">
                        <div className="comment-thread__panel__header__button resolve-button">
                            <FaRegCheckCircle data-testid="resolve-button" onClick={resolve}/>
                        </div>
                        <div className="comment-thread__panel__header__button close-button">
                            <FaTimes data-testid="close-button" onClick={close}/>
                        </div>
                    </div>
                    {thread.map((message) =>
                        <Message
                            key={`${message.user}-${message.timestamp}`}
                            user={message.user}
                            timestamp={message.timestamp}
                            content={message.content}
                        />
                    )}
                    <NewMessage commentId={commentId} currentUser={currentUser}
                                updateCommentThread={updateCommentThread}/>
                </div>
            </div>
        </Html>
    );
};

CommentThread.propTypes = {
    commentId: PropTypes.string.isRequired,
    starter: PropTypes.string.isRequired,
    currentUser: PropTypes.string.isRequired,
    thread: PropTypes.array.isRequired,
    setCommentStage: PropTypes.func.isRequired
}

const Message = ({user, timestamp, content}) => {
    return (
        <div className="message">
            <div className="comment__avatar comment__avatar--message">
                {user.charAt(0).toUpperCase()}
            </div>
            <div className="message__main">
                <div className="message__header">
                    <div className="message__header__name">{user}</div>
                    <div className="message__header__time">{moment(timestamp).fromNow()}</div>
                </div>
                <div className="message__content">{content}</div>
            </div>
        </div>
    )
};

Message.propTypes = {
    user: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

const NewMessage = ({commentId, currentUser, updateCommentThread}) => {
    const inputRef = useRef(null);
    const pressEnterHandler = (event) => {
        if (event.key !== 'Enter') return;
        submit();
    };
    const submit = () => {
        const content = inputRef.current.value.trim();
        const timestamp = new Date().getTime();
        if (content === '') {
            return;
        }
        updateCommentThread(commentId, currentUser, timestamp, content);
        inputRef.current.value = ''; // clear
    };
    return (
        <div className="message">
            <div className="comment__avatar comment__avatar--message">
                {currentUser.charAt(0).toUpperCase()}
            </div>
            <div className="new-message__input">
                <input ref={inputRef} type="text" onKeyDown={pressEnterHandler} maxLength={MAX_LENGTH_MESSAGE}
                       placeholder={'Reply'}/>
                <FaArrowCircleUp data-testid="new-message-submit" onClick={submit}/>
            </div>
        </div>
    );
};

NewMessage.propTypes = {
    commentId: PropTypes.string.isRequired,
    currentUser: PropTypes.string.isRequired,
    updateCommentThread: PropTypes.func.isRequired
}

const CommentStarter = ({commentId, starter, setCommentStage}) => {
    const {removeComment, updateCommentThread} = useContext(CanvasStatusContext);
    const inputRef = useRef(null);
    const pressEnterHandler = (event) => {
        if (event.key !== 'Enter') return;
        submit();
    };
    const submit = async () => {
        const content = inputRef.current.value.trim();
        const timestamp = new Date().getTime();
        if (content === '') {
            await removeComment(commentId);
            return;
        }
        await updateCommentThread(commentId, starter, timestamp, content);
        setCommentStage(COMMEMT_STAGE.COLLAPSED);
    };
    const onBlurHandler = async () => {
        await removeComment(commentId);
        return;
    }
    return (
        <Html divProps={{
            style: {
                position: 'absolute'
            }
        }}>
            <div className="comment-starter">
                <div className="comment__avatar">
                    {starter.charAt(0).toUpperCase()}
                </div>
                <div className="comment-starter__input">
                    <input ref={inputRef} type="text" onKeyDown={pressEnterHandler} maxLength={MAX_LENGTH_MESSAGE}
                           placeholder={'Add a comment'} autoFocus onBlur={onBlurHandler}/>
                    <FaArrowCircleUp data-testid="submit-the-first-comment" onClick={submit}/>
                </div>
            </div>
        </Html>
    );
};

CommentStarter.propTypes = {
    commentId: PropTypes.string.isRequired,
    starter: PropTypes.string.isRequired,
    setCommentStage: PropTypes.func.isRequired
}