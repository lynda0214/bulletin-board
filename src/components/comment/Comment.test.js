import {render, screen, fireEvent} from '@testing-library/react';
import {Stage, Layer} from 'react-konva';
import Comment from './Comment';
import {CanvasStatusContext} from '../../contexts/CanvasStatusProvider';
import {USER, MODE} from '../../constants.js';

const testProps = {
    currentUser: USER.LYNDA,
    mode: MODE.POINTER,
    comment: {
        id: 'test-comment',
        x: 0,
        y: 0,
        starter: USER.LYNDA,
        thread: []
    }
}

test('initially with a comment starter', () => {
    render(
        <Stage>
            <Layer>
                <Comment {...testProps}/>
            </Layer>
        </Stage>
    );
    const testInput = screen.getByRole('textbox');
    expect(testInput).toBeInTheDocument();
});

test('display comment collapses after submit', async () => {
    const updateCommentThread = jest.fn();
    render(
        <Stage>
            <CanvasStatusContext.Provider value={{updateCommentThread}}>
                <Layer>
                    <Comment {...testProps}/>
                </Layer>
            </CanvasStatusContext.Provider>
        </Stage>
    );
    const textInput = screen.getByRole('textbox');
    const submit = screen.getByTestId('submit-the-first-comment');
    fireEvent.change(textInput, {target: {value: 'Hello World'}});
    expect(textInput.value).toBe('Hello World');
    fireEvent.click(submit);
    const openCollapsedComment = await screen.findByTestId('open-collapsed-comment');
    expect(openCollapsedComment).toBeInTheDocument();
});

test('remove comment after submitting nothing', () => {
    const removeComment = jest.fn();
    render(
        <Stage>
            <CanvasStatusContext.Provider value={{removeComment}}>
                <Layer>
                    <Comment {...testProps}/>
                </Layer>
            </CanvasStatusContext.Provider>
        </Stage>
    );
    const submit = screen.getByTestId('submit-the-first-comment');
    fireEvent.click(submit);
    expect(removeComment).toBeCalled();
})

test('display comment thread after reopen it', async () => {
    const updateCommentThread = jest.fn();
    render(
        <Stage>
            <CanvasStatusContext.Provider value={{updateCommentThread}}>
                <Layer>
                    <Comment {...testProps}/>
                </Layer>
            </CanvasStatusContext.Provider>
        </Stage>
    );
    const textInput = screen.getByRole('textbox');
    const submit = screen.getByTestId('submit-the-first-comment');
    fireEvent.change(textInput, {target: {value: 'Hello World'}});
    expect(textInput.value).toBe('Hello World');
    fireEvent.click(submit);
    const openCollapsedComment = await screen.findByTestId('open-collapsed-comment');
    fireEvent.click(openCollapsedComment);
    const commentThread = await screen.findByTestId('comment-thread');
    expect(commentThread).toBeInTheDocument();
});

test('click to remove/resolve comment thread', async () => {
    const updateCommentThread = jest.fn();
    const removeComment = jest.fn();
    render(
        <Stage>
            <CanvasStatusContext.Provider value={{updateCommentThread, removeComment}}>
                <Layer>
                    <Comment {...testProps}/>
                </Layer>
            </CanvasStatusContext.Provider>
        </Stage>
    );
    const textInput = screen.getByRole('textbox');
    const submit = screen.getByTestId('submit-the-first-comment');
    fireEvent.change(textInput, {target: {value: 'Hello World'}});
    expect(textInput.value).toBe('Hello World');
    fireEvent.click(submit);
    const openCollapsedComment = await screen.findByTestId('open-collapsed-comment');
    fireEvent.click(openCollapsedComment);
    const resolveButton = await screen.findByTestId('resolve-button');
    fireEvent.click(resolveButton);
    expect(removeComment).toBeCalled();
});

test('click to close comment thread', async () => {
    const updateCommentThread = jest.fn();
    const removeComment = jest.fn();
    render(
        <Stage>
            <CanvasStatusContext.Provider value={{updateCommentThread, removeComment}}>
                <Layer>
                    <Comment {...testProps}/>
                </Layer>
            </CanvasStatusContext.Provider>
        </Stage>
    );
    const textInput = screen.getByRole('textbox');
    const submit = screen.getByTestId('submit-the-first-comment');
    fireEvent.change(textInput, {target: {value: 'Hello World'}});
    expect(textInput.value).toBe('Hello World');
    fireEvent.click(submit);
    let openCollapsedComment = await screen.findByTestId('open-collapsed-comment');
    fireEvent.click(openCollapsedComment);
    const closeButton = await screen.findByTestId('close-button');
    fireEvent.click(closeButton);
    openCollapsedComment = await screen.findByTestId('open-collapsed-comment');
    expect(openCollapsedComment).toBeInTheDocument();
});

test('update comment thread', async () => {
    const updateCommentThread = jest.fn();
    const removeComment = jest.fn();
    render(
        <Stage>
            <CanvasStatusContext.Provider value={{updateCommentThread, removeComment}}>
                <Layer>
                    <Comment {...testProps}/>
                </Layer>
            </CanvasStatusContext.Provider>
        </Stage>
    );
    const textInput = screen.getByRole('textbox');
    const submit = screen.getByTestId('submit-the-first-comment');
    fireEvent.change(textInput, {target: {value: 'Hello World'}});
    expect(textInput.value).toBe('Hello World');
    fireEvent.click(submit);
    let openCollapsedComment = await screen.findByTestId('open-collapsed-comment');
    fireEvent.click(openCollapsedComment);
    const newMessageInput = await screen.findByRole('textbox');
    fireEvent.change(newMessageInput, {target: {value: 'Hello World Again'}});
    const newMessageSubmit = screen.getByTestId('new-message-submit');
    fireEvent.click(newMessageSubmit);
    expect(updateCommentThread).toBeCalled();
});