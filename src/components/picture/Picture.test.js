import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Stage, Layer} from 'react-konva';
import Picture from './Picture';
import {CanvasStatusContext} from '../../contexts/CanvasStatusProvider';
import {MODE, USER, ID_PREFIX} from '../../constants';

const testProps = {
    id: `${ID_PREFIX}-0`,
    x: 0,
    y: 0,
    mode: MODE.POINTER,
    currentUser: USER.LYNDA,
    isSelecting: 'true',
    comments: [],
}

test('render a picture', () => {
    render(<Stage>
        <Layer>
            <Picture {...testProps}/>
        </Layer>
    </Stage>);
    const RemoveButton = screen.getByTestId('remove-button');
    expect(RemoveButton).toBeInTheDocument();
});

test('remove a picture', () => {
    const removePicture = jest.fn();
    render(
        <Stage>
            <CanvasStatusContext.Provider value={{removePicture}}>
                <Layer>
                    <Picture {...testProps}/>
                </Layer>
            </CanvasStatusContext.Provider>
        </Stage>
    );
    const RemoveButton = screen.getByTestId('remove-button');
    fireEvent.click(RemoveButton);
    expect(removePicture).toBeCalled();
});
