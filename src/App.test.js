import {render, screen, fireEvent} from '@testing-library/react';
import ModeProvider from './contexts/ModeProvider';
import App from './App.js';
import {MODE} from "./constants";

test('initial cursor image is pointer', () => {
    render(<App/>, {wrapper: ModeProvider});
    const app = screen.getByTestId('app');
    expect(app).toHaveStyle({cursor: `url('./cursor/pointer.png'),auto`});
});

test('switch cursor images', () => {
    render(<App/>, {wrapper: ModeProvider});
    const app = screen.getByTestId('app');

    // mode picture
    const modePictureButton = screen.getByTestId(MODE.PICTURE);
    fireEvent.click(modePictureButton);
    expect(app).toHaveStyle({cursor: `url('./cursor/picture.png'),auto`});

    // mode comment
    const modeCommentButton = screen.getByTestId(MODE.COMMENT);
    fireEvent.click(modeCommentButton);
    expect(app).toHaveStyle({cursor: `url('./cursor/comment.png') 0 14,auto`});

    // mode hand
    const modeHandButton = screen.getByTestId(MODE.HAND);
    fireEvent.click(modeHandButton);
    expect(app).toHaveStyle({cursor: `url('./cursor/hand-paper.png'),auto`});
});