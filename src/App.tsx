import { useEffect, useState } from "react";
import Item from "./components/Item";
import SearchButtons from "./components/SearchButtons";
import { useAppSelector } from "./store/hooks";

function App() {
  const data = useAppSelector(state => state.main.data);
  
  const [content, setContent] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const newContent: Array<JSX.Element> = data.map((i) => {
      return (<Item data={i} origin={true} key={i.title}/>);
    });
    setContent(newContent);
  }, [data])

  return (
    <div className="app">
      {content}
      <SearchButtons/>
    </div>
  );
}

export default App;
