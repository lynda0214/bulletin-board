import {useContext} from 'react';
import classNames from 'classnames';
import {ModeContext} from '../../contexts/ModeProvider';
import {FaMousePointer, FaComment, FaHandPaper, FaSearch} from 'react-icons/fa';
import {MODE, USER} from '../../constants';
import './Toolbar.css';

const SUPPORT_MODES = [
    MODE.POINTER,
    MODE.COMMENT,
    MODE.HAND,
    // MODE.MAGNIFIER,
];

const Toolbar = () => {
    const {mode, user, switchMode, switchUser} = useContext(ModeContext);
    return (
        <div className="toolbar">
            <div className="toolbar__panel">
                <UserButton user={user} switchUser={switchUser}/>
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

export default Toolbar;

const ModeButton = ({title, switchMode, isSelected}) => {
    const modeIcons = {
        [MODE.POINTER]: <FaMousePointer/>,
        [MODE.COMMENT]: <FaComment/>,
        [MODE.HAND]: <FaHandPaper/>,
        // [MODE.MAGNIFIER]: <FaSearch/>,
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

const UserButton = ({user, switchUser}) => {
    const onChangeHandler = (event) => {
        switchUser(event.target.value);
    };

    return (
        <div className="toolbar__user">
            <div className="toolbar__user__avatar">
                {user.charAt(0).toUpperCase()}
            </div>
            <select className="toolbar__user__select" onChange={onChangeHandler}>
                {Object.keys(USER).map((userKey) =>
                    <option key={userKey} className="toolbar__user__option">{USER[userKey]}</option>
                )}
            </select>
        </div>
    )
};