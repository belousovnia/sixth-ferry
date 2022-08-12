import classNames from "classnames";
import { useEffect, useState } from "react";
import { IItems } from "../data";
import TileData from "./TileData";

function Item(props: any) {
  const data: IItems = props.data;
  const border: boolean|undefined = props.border;
  const origin: boolean|undefined = props.origin;
  const name: string = data.title;
  
  const [content, setContent] = useState<Array<JSX.Element>>([]);

  const classContainer: string = classNames({
    'container': true,
    'container_line': border,
  });
  const classItemBlock: string = classNames({
    'item-block': true,
    'item-block_origin': origin,
  });
  const classLine: string = classNames({
    'line': true,
    'line_origin': origin,
  });

  function buildItemList(): void {
    if (data.items) {
      if (data.items[0].data) {
        const columns: Array<JSX.Element[]> = [[], [], [], [],]; 
        let count: number = 0;

        for (const item in data.items) {
          columns[count].push(
            <TileData 
              data={data.items[item]} 
              key={data.items[item].title}
            />
          );
          if (count === 3) {
            count = 0;
          } else {
            count++
          };
        };

        setContent([
          <div 
            className="content_tile"
            key={`content${name}`}
          >
            <div className="content__column">
              {columns[0]}
            </div>
            <div className="content__column">
              {columns[1]}
            </div>
            <div className="content__column">
              {columns[2]}
            </div>
            <div className="content__column">
              {columns[3]}
            </div>
          </div>
        ]);
      } else {
        const newContent: Array<JSX.Element> = [];
        for (const item in data.items) {
          if (Number(item) === data.items.length - 1) {
            newContent.push(
              <Item 
                data={data.items[item]} 
                key={data.items[item].title}
              />
            );
          } else {
            newContent.push(
              <Item 
                data={data.items[item]} 
                border={true} 
                key={data.items[item].title}
              />
            );
          };

          setContent([
            <div 
              className="content" 
              key={`content${name}`}
            >
              {newContent}
            </div>
          ]);
        };
      };
    };
  };

  useEffect(() => {
    buildItemList()
  }, [data]);

  return (
    <div className={classContainer}>
      <div className={classItemBlock}>
        <div className={classLine}/>
        <div className="name-block">
          {name}
        </div>
      </div>
      {content}
    </div>
  );
};

export default Item;