# convertlab datahub

## 安装

``` bash
npm i datahub-react-icon -S 
```

## 使用

``` tsx
import React, { Suspense } from 'react'
import ArrowLeft from "datahub-react-icon/ArrowLeft"
import { ArrowRight } from "datahub-react-icon"

const LazyIcon = React.lazy(() => import("datahub-react-icon/ArrowUp"))
function App() {
  return (
    <div className="App">
      <ArrowLeft/>
      <ArrowRight />
      <Suspense fallback={"fallback"}>
        <LazyIcon />
      </Suspense>
    </div>
  )
}
```
