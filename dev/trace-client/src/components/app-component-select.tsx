import { FC } from '@src/features'
import { AppLogin } from "."
import { DummyComponent } from "./dummy-component";

const appComponentSelect: AppComponentSelectType = {
    dummyComponent: DummyComponent,
    appLogin: AppLogin
}

export { appComponentSelect }

type AppComponentSelectType = {
    [name: string]: FC
}