import {useState, createContext} from 'react';
import {MODE, USER} from '../constants';

export const ModeContext = createContext({
    mode: '',
    user: '',
    switchMode: () => {
    },
    switchUser: () => {
    },
});

const ModeProvider = ({children}) => {
    const [mode, setMode] = useState(MODE.POINTER);
    const [user, setUser] = useState(USER.LYNDA);
    const defaultValue = {
        mode,
        user,
        switchMode: (targetMode) => setMode(targetMode),
        switchUser: (targetUser) => setUser(targetUser),
    };
    return (
        <ModeContext.Provider value={defaultValue}>
            {children}
        </ModeContext.Provider>
    );
};

export default ModeProvider;
