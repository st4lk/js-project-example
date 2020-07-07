
export const helper = () => {
  if (window.location.href.includes('exception-5')) {
    /*** exception 5 - dep function in module crash ***/
    const myObject = undefined;
    myObject.depFunction;
  }
  console.log("I'm helper");
};
