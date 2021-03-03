import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducers } from './StoreSlices';
import loggerMiddleware from './middlewate/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';

export default function configureStore(): any {
    const middlewares: any = [thunkMiddleware];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(loggerMiddleware);
    }

    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers: any = [middlewareEnhancer];

    if (process.env.NODE_ENV === 'development') {
        enhancers.push(monitorReducerEnhancer);
    }

    const composedEnhancers = composeWithDevTools(...enhancers);
    // eslint-disable-next-line no-undefined
    const store = createStore(reducers, undefined, composedEnhancers);

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./StoreSlices', () => store.replaceReducer(reducers));
    }

    return store;
}
