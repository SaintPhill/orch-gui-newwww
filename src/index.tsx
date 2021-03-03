import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './client/components/App';
import configureStore from './store';
import { loadConfig } from './store/RestApi/filtersOptionsAPI';
import { getFiltersOptions } from './store/StoreSlices/filtersOptions';
import './index.scss';

const store = configureStore();

(async () => {
    await loadConfig();
    store.dispatch(getFiltersOptions());
})();

function renderApp(): void {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./client/components/App', renderApp);
}

renderApp();
