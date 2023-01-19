---
layout: default
title: React project
parent: Client setup
nav_order: 1
---

## React project named as trace-client in repository
<br />

{: .note}
> In current verion of Trace i.e version 2.x **Chakra-UI** is used as main UI library. The **ant design** and **Primereact** libraries are also being used for specific purposes. In Trace version 1.x the material-ui (now **MUI**) was used. MUI data grid proff version is still proposed for the current version.

> To create a new typescript project in Chakra we used following command
```javascript
npx create-react-app trace-client --template @chakra-ui/typescript
```

> In Trace 1.0 no global state management library was used. In Trace 2.0 **_Preact signals_** which also work in React is proposed as global state management library. This library works on **JavaScript Proxy**. We found it easy to use and quite stable in production.

> The create-react-app (cra) internally uses webpack, but webpack configuration is hidden from user. To override webpack configuration you need to eject the *cra* project. Eject is an irreversible process and the project also becomes difficult to manage after eject. Here `craco` comes to rescue. To enable webpack override with craco do the following. (_Here we intend to enable `paths` in `tsconfig.json` file by creating an alias in craco.config.js file. It is good to have feature for managing and simplifying imports in overall project. It reduces imports in the form of '../../../../' to something like '@features/*' which is more managable_).
- `npm install @craco/craco`
- Create `craco.config.js` in project's root folder, not in `/src`
```javascript
const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
};
```
- In package.json file `scrips` section change all occurrences of `react-scripts` with `craco`
- In `tsconfig.json` in `compilerOptions` add:
```json
"paths": {
      "@src/*":["./src/*"],
    },
```
- Now you are in a position to name all your imports from topdown w.r.o `src` folder. So instead of writing import statement like `../../../ ...` you can write them like `@src/...`. The import statements are same in all files for same library imports.
- It is a good practice to add an `index.tsx` file in each folder of components. This file will export all the components in the folder. So in the import statements in other places of project you can name the parent folder of the index file.

`craco` is enabled in Trace version 2.x

## 1. Project conventions and guidelines
- In _tsconfig.json_ file **paths** property is defined. This is used to simplify the imports in other project files
- _index.tsx_ file in every folder exports all the components in that folder
- We explored `Formik`, `Yup` and 'React hook form' for react form validations and finally decided to use the library [React hook form](https://react-hook-form.com/) for the purpose. This library is flexible and also the global state management `preact signals` or more specifically `deepSignal` can be used with it

## 2. Useful React tips learned
- Remember that re-render of a child component does not occur when its property changes. Child component re-renders when parent renders
- Its an anti pattern to create nested component inside a host component. Don't do that. It takes longer time for render. Reason is every time the host component renders, the nested component is created from scratch and then rendered. It is much more work when creating a component from scratch than just re-render. You will also lose focus from child component
- Keep a watch on component re-renders
  - Say you are using input box in a heavy component. For every key press, due to state change in input box, the entire heavy component re-renders. You can move the state down to child component. Create a new child component using the input box. Now only child component re-renders on keypress and not the whole heavy component
  - Sometimes you can pass a component A as prop to another component B. Change or re=render of component A will not cause re-render of B. Because prop changes do not cause re-renders
  - Always use unique string keys in lists. Never use randomely generated keys in lists

## 3. useMemo hook
  - **purpose** At time of component re-render whether to execute a function or not
  - **signatue** `const cachedValue = useMemo(fn, dependencies)`
    - This hook executes _fn_ and returns its value
    - Note that it returns the value obtained after execution of function _fn_ and not the function _fn_ itself
    - If any value in dependencies array changes then _fn_ is re-executed to get new return value, otherwise return value from earlier execution's result is used. Thatswhy _useMemo_ can be used for caching the return values of heavy functions
    - If dependencies array is empty([]) then _fn_ is executed only once at first render of the component and return value of _fn_ is returned and cached. Thereafter on every consecutive re-render of the component, the cached value is returned by _useMemo_ and _fn_ is not executed
  - When computationally heavy function result is to be used, then wrap this heavy function inside _useMemo_ with providing dependency array as empty. Now this heavy function will be computed only once and this value will be reused at every consequent render. If the function uses parameters then provide those parameters in dependency array; so whenever the parameters change the heavy function will re compute.
    - Suppose _myHeavyFunc_ is a heavy function which returns a value _myHeavyValue_. With no function parameters the implementation will be as follows. You can make use of _myHeavyValue_ elsewhere in code
  ```react
  const myHeavyValue = useMemo(myHeavyFunc,[])
  ```
  Since dependency array is empty, this function will be called only once at page load and thereafter the memoised / cached value for _myHeavyValue_ will be used at evey re-render of component
    - In case of parameters say _count_ the implementation will be as follows:
    ```react
    const myHeavyValue = useMemo(()=>myHeavyFunc(count), [count])
    ```
    Now if _count_ is a state, then for every change in _count_ the _myHeavyFunc_ will be recomputed.
    - ***Remember*** useMemo returns a ***value*** and not ***function***. So you should use _myHeavyValue_ as variable usage `<span>{myHeavyValue}</span>` and not as function call `<span>{myHeavyValue()}</span>`

## 4. useCallback hook
  - **signature** `const cachedFn = useCallback(fn, dependencies)`
  - **Backdrop:** In JavaScript, functions are first class citizens and they are used as objects. Note that two instances of same object are not same, even if the values of both instances are same. An object is only equal to itself.
  ```javascript
    a={}
    b={}
    a===b // false
    a===a // true
  ```
  - Its a hook which caches a _fn_ definition itself, between re-renders and not the return value of _fn_. This hook never executes the function _fn_, it only returns the definition of  _fn_, you need to execute the _fn_. So _useCallback_ is used to cache a function and not its value.
  - **use case**: If you happen to use a function _func_ inside a useEffect hook, then linter warns to use this _func_ in the dependency array of useEffect hook. But doing so will always run the code inside useEffect hook because every time a new instance of _func_ is created at re-render, which is not same object as already explained.
  There is problem in following code. Code inside useEffect hook will always execute on re-render.
  
  ```react
  useEffect(()=>{
    func()
  }, [func])

  function func(){
    //...do something
  }
  ```

  - If you make use of useCallback hook to wrap the _func_ along with a dependency array then based on the change in value of dependency array same instance or different instance of the _func_ will be returned. So doing this will solve the purpose of not executing _func_ at re-renders and at the same time escape the linter warning for including the _func_ in the dependency array
  
  
  ```react
  const cfunc = useCallback(func,[])
  useEffect(()=>{
    cfunc()
  },[cfunc])

  function func(){
    ... do something
  }
  ```

## 5. react.memo()
**Purpose**: Prevent a child component from re-rendering
- A parent component has a child component. As per default React behavior, whenever the parent component renders, the child component will also render
- Suppose you want to prevent child component from re-rendering whenever the parent component renders
- Solution is you wrap the child component in `react.memo`. But the child component will still re-render when its properties passed from parent component changes. You cannot prevent that. Following code explains the use of _react.memo_ 
At first the parent component

```react
function CompMemo() {
  const [, setRefresh] = useState({});
  return (
    <Box>
      <Text>This is Parent component</Text>
      <Button onClick={setRefresh}>Refresh</Button>
      <MemoisedChild />
    </Box>
  );
}
export { CompMemo };
```

Now the child component

```react
function CompMemoChild() {
  console.log("memo child rendered");
  return (
    <Box>
      <Text>This is memo child component</Text>
    </Box>
  );
}
const MemoisedChild = memo(CompMemoChild);
export { MemoisedChild };
```
In the above code, clicking the button makes the parent component to re-render. But due to child component having been wrapped in memo function, the child component does not re-render.

- The _memo_ function uses the shallow object comparison for comparison of properties of child component. For that if you pass an object as property then the child component will always re-render because every instance of object is different object and at every render of parent a new instance of the object is created and passed on as new property to the child component. To prevent that you can use the next parameter of _memo_ function which is the comparison function to be used for comparing the properties. If that comparison function returns true then the _memo_ will assume that properties have not changed and vice-versa.

- There may be situation when parent passes a function as property to child component. Since every instance of function is a new object, the child will always re-render when the parent renders. To avoid this you can make use of _useCallback_ hook at the parent which wraps the function property. Now pass this wrapped function as property to child component. Since _useCallback_ hook memoises the function, it will pass only one instance (and not a new instance) to child component whenever the parent refreshes. So _useCallback_ will resolve the issue when function is passed as property to child component. Following code explains that.

```react
function CompMemo() {
  const [, setRefresh] = useState({});
  const myFunc =  () => console.log("Func passed from parent");
  const wrapMyFunc = useCallback(myFunc, [])
  return (
    <Box>
      <Text>This is Parent component</Text>
      <Spacer />
      <Button onClick={setRefresh}>Refresh</Button>
      <MemoisedChild fn={wrapMyFunc} />
    </Box>
  );
}
export { CompMemo };

function CompMemoChild({ fn }: any) {
  console.log("memo child rendered");
  fn()
  return (
    <Box>
      <Text>This is memo child component</Text>
    </Box>
  );
}

const MemoisedChild = memo(CompMemoChild);
export { MemoisedChild };
```

Here click of Refresh button re-renders the parent, but child is rendered only once. See how the function property is wrapped in _useCallback_ hook to transfer one single instance of function to the child component, hence preventing the re-render of child component.