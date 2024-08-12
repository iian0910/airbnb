# React Hook 介紹

### [useEffect()](https://react.dev/reference/react/useEffect)
```bash
useEffect(() => {
  
  // 觀測值變動時執行此處程式碼
  code...

}, [觀測值])
```
#### 觸發時機：
- 在元件渲染後或是觀測值變動時執行，而當觀測值為空值則表示執行僅在元件重新渲染的時候
- 主要用於處理與元件「**生命週期相關**」的任務，以及那些需要在渲染後執行的操作

#### 使用時機：
- 呼叫API
- 設定/清理 subscript 動作
- 手動操作 DOM 元素
- 定時器(setTimeOut)
---

### [useMemo()](https://react.dev/reference/react/useMemo)
```bash
const Result = useMemo(() => {
  
  return expensive(props.a, prop.b)

}, [props.a, prop.b])
```
#### 觸發時機：
- 記住一個計算值，只有當它的觀測值改變時才會重新計算
- 主要用於「**優化計算密集型**」的操作，以及將計算結果傳遞給子元件

#### 使用時機：
- 避免重複計算昂貴的運算
- 將計算結果傳遞給子元件，確保子元件只在必要時重新渲染
---

### [useCallback()](https://react.dev/reference/react/useCallback)
```bash
const Result = useCallback(() => {
  
  // callback function...

}, [觀測值])
```
#### 觸發時機：
- 記住一個回呼函式，只有當它的觀測值改變時才會重新建立
- 主要用於優化包含回呼函式作為依賴項的 useEffect，以及將回呼函式傳遞給子元件

#### 使用時機：
- 將回呼函式傳遞給子元件，避免子元件不必要的重新渲染
- 優化包含回呼函式作為依賴項的 useEffect
---


