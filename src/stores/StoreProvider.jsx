import React, { createContext, useContext, useEffect, useReducer } from "react";
import { isArray, isObject, isNull, isUndefined, isFunction } from "lodash";
import produce from "immer";
import ManagedStore from "../stores/ManagedStore";
import { STORES } from "../shared/configs/constants";

export const storeContext = createContext();

const injectedStoreContext = createContext();

export const StoreProvider = ({ children, store }) => {
  const [state, dispatch] = useReducer(
    (state, action) =>
      produce(state, (drafState) => {
        switch (action.type) {
          case "INJECT_STORE": {
            const { key, store } = action.payload;
            drafState[key] = store;
            break;
          }

          default:
            break;
        }
      }),
    {}
  );
  return (
    <storeContext.Provider value={store}>
      <injectedStoreContext.Provider value={{ store: state, dispatch }}>
        {children}
      </injectedStoreContext.Provider>
    </storeContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useStore = () => useContext(storeContext);

/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};

export const useManagedStore = () => {
  const {
    settings: { username },
  } = useStore();
  const managedStore = useInjectStore({
    key: STORES.MANAGER,
    store: ManagedStore,
  });

  useEffect(() => {
    if (!managedStore.userName) {
      managedStore.sets({
        userName: username,
      });
    }
  }, [username, managedStore.userName, managedStore]);

  return managedStore;
};

export const useInjectStore = ({ key, store: Store, params }) => {
  const { store, dispatch } = useContext(injectedStoreContext);
  let defaultStore = store[key];

  if (isUndefined(defaultStore) || isNull(defaultStore)) {
    if (isObject(params)) {
      defaultStore = new Store(params);
    } else if (isArray(params)) {
      defaultStore = new Store(...params);
    } else {
      defaultStore = new Store();
    }
  }

  useEffect(() => {
    if (isUndefined(store[key]) || isNull(store[key])) {
      dispatch({
        type: "INJECT_STORE",
        payload: {
          key,
          store: defaultStore,
        },
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, store]);

  useEffect(() => {
    if (isUndefined(defaultStore) || isNull(defaultStore)) return;
    if (isFunction(defaultStore.storeDidMount)) {
      defaultStore.storeDidMount(params);
    }
    return () => {
      if (isFunction(defaultStore.storeUnmount)) {
        defaultStore.storeUnmount();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return defaultStore;
};
