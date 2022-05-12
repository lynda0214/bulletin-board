import {useState, createContext} from 'react';

export const MODE = {
    POINTER: 'pointer',
    COMMENT: 'comment',
    HAND: 'hand',
    MAGNIFIER: 'magnifier',
};

export const ModeContext = createContext({
    mode: '',
    switchMode: () => {
    }
});

const ModeProvider = ({children}) => {
    const [mode, setMode] = useState(MODE.POINTER);
    const defaultValue = {
        mode,
        switchMode: (targetMode) => setMode(targetMode),
    };
    return (
        <ModeContext.Provider value={defaultValue}>
            {children}
        </ModeContext.Provider>
    );
};

export default ModeProvider;
