import {render, screen, fireEvent} from '@testing-library/react';
import ModeProvider, {ModeContext} from '../../contexts/ModeProvider';
import Toolbar from './Toolbar.js';
import {MODE, USER} from '../../constants.js';

test('initial status of toolbar', () => {
    render(<Toolbar/>, {wrapper: ModeProvider});
    // initially select pointer
    const ModePointerButton = screen.getByTestId(MODE.POINTER);
    expect(ModePointerButton).toHaveClass('toolbar__btn--selected');

    // initially select Lynda Lin
    const UserAvatar = screen.getByTestId('user-avatar');
    expect(UserAvatar).toHaveTextContent('L');
});

test('call mode switch', () => {
    const switchMode = jest.fn();
    render(
        <ModeContext.Provider value={{ mode: MODE.POINTER, user: USER.LYNDA, switchMode }}>
            <Toolbar />
        </ModeContext.Provider>
    );
    const ModeCommentButton = screen.getByTestId(MODE.COMMENT);
    fireEvent.click(ModeCommentButton);
    expect(switchMode).toBeCalled();
});

test('call user switch', () => {
    const switchUser = jest.fn();
    render(
        <ModeContext.Provider value={{ mode: MODE.POINTER, user: USER.LYNDA, switchUser }}>
            <Toolbar />
        </ModeContext.Provider>
    );
    const UserSelect = screen.getByRole('combobox');
    fireEvent.change(UserSelect, {target: {value: USER.DAVID}});
    expect(switchUser).toBeCalled();
});

test('user avatar changes', () => {
    render(<Toolbar/>, {wrapper: ModeProvider});
    const UserSelect = screen.getByRole('combobox');
    fireEvent.change(UserSelect, {target: {value: USER.DAVID}});
    const UserAvatar = screen.getByTestId('user-avatar');
    expect(UserAvatar).toHaveTextContent('D');
});
