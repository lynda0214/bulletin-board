/***
 * reference: https://github.com/konvajs/react-konva/blob/master/test/react-konva-test.tsx
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import Konva from 'konva';
import './mocking.js';

const konvaRender = async (component) => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const root = createRoot(node);
    const App = ({ onUpdate, children }) => {
        React.useEffect(() => {
            onUpdate(null);
        });
        return children;
    };

    await new Promise((resolve) => {
        root.render(<App onUpdate={resolve}>{component}</App>);
    });

    console.log('????', Konva.stages[Konva.stages.length - 1]);

    return {
        stage: Konva.stages[Konva.stages.length - 1],
        rerender: async (component) => {
            await new Promise((resolve) => {
                root.render(<App onUpdate={resolve}>{component}</App>);
            });
        },
    };
};

export default konvaRender;