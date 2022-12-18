---
layout: default
title: React project
parent: Client setup
nav_order: 1
---

## React project named as trace-client in repository

{: .note}
> In current verion of Trace i.e version 2.x **Chakra-UI** is used as main UI library. The **ant design** and **Primereact** libraries are also used. In Trace version 1.x the material-ui (now **MUI**) was used. MUI data grid proff version is still proposed for the current version.

> To create a new typescript project in Chakra we used following command
```javascript
npx create-react-app trace-client --template @chakra-ui/typescript
```

> In Trace 1.0 no global state management library was used. In Trace 2.0 **_Preact signals_** which also work in React is proposed as global state management library. This library works on **JavaScript Proxy**. We found it easy to use and quite stable in production.

## Project conventions and guidelines
- In _tsconfig.json_ file **paths** property is defined. This is used to simplify the imports in other project files
- _index.tsx_ file in every folder exports all the components in that folder