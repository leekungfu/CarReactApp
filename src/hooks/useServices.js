import { isObject, isString, isEmpty, isFunction } from "lodash";
import { useCallback } from "react";
import request from "src/utils/request";

const serialize = (obj) => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const useServices = ({ areaName, storeName, defaultRoute }) => {
  const getEndpoint = useCallback(
    (param) => {
      switch (true) {
        case isString(param) && !isEmpty(param):
          return `${areaName}/${storeName}/${param}`;
        case isObject(param):
          return `${areaName}/${storeName}?${serialize(param)}`;
        default:
          return `${areaName}/${storeName}`;
      }
    },
    [areaName, storeName]
  );

  const get = async (route) => {
    if (isObject(route)) {
      route = `?${serialize(route)}`;
    }
    const endPoint = getEndpoint(route);
    const { data: response } = await request.get(endPoint);

    return response;
  };

  const getSchema = async (route) => {
    if (isObject(route)) {
      route = `?${serialize(route)}`;
    }
    const endPoint = getEndpoint(`Schema${route}`);
    const { data: response } = await request.get(endPoint);

    return response;
  };
  const getItems = async (reduce) => {
    const endPoint = getEndpoint(defaultRoute);
    let { data: response } = await request.get(endPoint);

    if (isString(response)) {
      response = {};
    }

    if (isFunction(reduce)) {
      return reduce(response);
    }

    return response;
  };

  const put = async (entity) => {
    const endPoint = getEndpoint();
    const { data: response } = await request.put(endPoint, entity);

    return response;
  };

  const post = async (entity) => {
    const endPoint = getEndpoint();
    const { data: response } = await request.post(endPoint, entity);

    return response;
  };

  const deleteItem = async (params) => {
    const endPoint = getEndpoint(params);
    const { data: response } = await request.delete(endPoint);

    return response;
  };

  return {
    get,
    getSchema,
    getItems,
    put,
    post,
    delete: deleteItem,
    getEndpoint,
  };
};

export default useServices;
