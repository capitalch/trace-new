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
- **useMemo**
  - Its a hook which caches function return value between re-renders. Usage `const cachedValue = useMemo(calculateValue, dependencies)`
  - When computationally heavy function result is to be used, then wrap this heavy function inside _useMemo_ with providing dependency array as empty. Now this heavy function will be computed only once and this value will be reused at every consequent render. If the function uses parameters then provide those parameters in dependency array; so whenever the parameters change the heavy function will re compute.
    - Suppose _myHeavyFunc_ is a heavy function which returns a value _myHeavyValue_. With no function parameters the implementation will be as follows. You can make use of _myHeavyValue_ elsewhere in code
  ```react
  const myHeavyValue = useMemo(myHeavyFunc,[])
  ```
  Since dependency array is empty, this function will be called only once at page load and thereafter the memoised / cached value for _myHeavyValue_ will be used
    - In case of parameters say _count_ the implementation will be as follows:
    ```react
    const myHeavyValue = useMemo(()=>myHeavyFunc(count), [count])
    ```
    Now if _count_ is a state, then for every change in _count_ the _myHeavyFunc_ will be recomputed.
    - ***Remember*** useMemo returns a ***value*** and not ***function***. So you should use _myHeavyValue_ as variable usage `<span>{myHeavyValue}</span>` and not as function call `<span>{myHeavyValue()}</span>`
- **useCallback**
  - Its a hook which caches a function definition between re-renders. usage: `const cachedFn = useCallback(fn, dependencies)`

