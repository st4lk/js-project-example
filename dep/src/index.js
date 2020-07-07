import {helper} from './utils';

if (window.location.href.includes('exception-4')) {
  /*** exception 4 - dep crash ***/
  const myObject = undefined;
  myObject.depIndex;
}

export const getSearch = (url) => {
  helper();
  return url + 'abc';
};
