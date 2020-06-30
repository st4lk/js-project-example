import {helper} from './utils';

/*** exception 4 - dep crash ***/
// const myObject = undefined;
// console.log(myObject.dep);

export const getSearch = (url) => {
  helper();
  return url + 'abc';
};
