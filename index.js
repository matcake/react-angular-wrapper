import React from 'react';
import { createRoot } from 'react-dom/client';
import fromPairs from 'lodash/fromPairs';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

export const reactAngularWrapper = (Class, bindingNames = [], injectNames = []) => ({
    bindings: fromPairs((bindingNames || []).map(_ => [_, '<'])),
    controller: [
        '$element',
        ...injectNames,
        class {
            isMounted = false; // Define if React component is mounted
            injectedProps = {}; // Init empty injected props
            props = {}; // Init empty props

            constructor(element, ...injectedProps) {
                this.root = createRoot(element[0]); // Component's DOM element
                this.injectedProps = injectNames.reduce((prev, curr, index) => {
                    prev[curr] = injectedProps[index];
                    return prev;
                }, {});
            }

            /* [React] Mount component */
            mount = () => {
                if (this.isMounted) return;

                this.render();
                this.isMounted = true;
            }

            /* [React] Unmount component */
            unmount = () => {
                if (!this.isMounted) return;

                this.root.unmount();
                this.isMounted = false;
            }

            /* [React] Render component */
            render = () => this.root.render(React.createElement(Class, { ...this.props, ...this.injectedProps }));

            /* [Angular] Initialization */
            $onInit = () => {
                this.mount();
            }

            /* [Angular] Subscribe to properties changes */
            $onChanges = changes => {
                const newProps = mapValues(changes, 'currentValue');

                if (!isEqual(this.props, newProps)) {
                    this.props = newProps;
                    this.render();
                }
            }

            /* [Angular] Subscribe to destroying */
            $onDestroy = () => {
                this.unmount();
            }
        },
    ],
});
