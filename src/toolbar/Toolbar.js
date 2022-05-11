import {useContext} from 'react';
import classNames from 'classnames';
import {MODE, ModeContext} from '../store/ModeProvider';
import {FaMousePointer, FaComment, FaHandPaper, FaSearch} from 'react-icons/fa';
import "./Toolbar.css";

const SUPPORT_MODES = [
    MODE.POINTER,
    MODE.COMMENT,
    MODE.HAND,
    MODE.MAGNIFIER
];

const Toolbar = () => {
    const {mode, setMode} = useContext(ModeContext);

    const switchMode = (targetMode) => {
        setMode(targetMode);
    };

    return (
        <div className="toolbar">
            <div className="toolbar__panel">
                {
                    SUPPORT_MODES.map((supportMode) =>
                        <ModeButton
                            key={supportMode}
                            switchMode={() => switchMode(supportMode)}
                            title={supportMode}
                            isSelected={supportMode === mode}
                        />
                    )
                }
            </div>
        </div>
    );
}

const ModeButton = ({title, switchMode, isSelected}) => {

    const modeIcons = {
        [MODE.POINTER]: <FaMousePointer/>,
        [MODE.COMMENT]: <FaComment/>,
        [MODE.HAND]: <FaHandPaper/>,
        [MODE.MAGNIFIER]: <FaSearch/>,
    };

    return (
        <div
            className={
                classNames(
                    'toolbar__btn',
                    {'toolbar__btn--selected': isSelected}
                )
            }
            onClick={switchMode}>
            {modeIcons[title]}
        </div>
    );
}

export default Toolbar;
