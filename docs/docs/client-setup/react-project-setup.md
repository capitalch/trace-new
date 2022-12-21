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

## Project conventions and guidelines
- In _tsconfig.json_ file **paths** property is defined. This is used to simplify the imports in other project files
- _index.tsx_ file in every folder exports all the components in that folder