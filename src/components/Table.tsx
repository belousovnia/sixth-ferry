import classNames from "classnames";
import { useEffect, useState } from "react";
import { IItems } from "../data";
import { useAppSelector } from "../store/hooks";

function Table(props: any) {
  const data: IItems = props.data;
  const item = useAppSelector(state => state.main.item);

  type ItemTable = {
    queue: number,
    title: string,
    number: number,
  };

  const listItem: Array<ItemTable> | undefined = data.data?.map(
    function(item, queue): ItemTable {
      return {
        ...item,
        queue
      };
    }
  );

  const [content, setContent] = useState<Array<JSX.Element>>([]);
  const [typeFilter, setTypeFilter] = useState<string>('queueMin');
    
  const arrow: JSX.Element = (
    <div className="table__arrow-contain">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="table__arrow"
      >
        <path d="M0 0L3.33333 3.33333L6.66667 0H0Z" fill="#2E465C" />
      </svg>
    </div>
  );

  function buildTable(dataList: ItemTable[]): Array<JSX.Element> {
    return dataList.map((i) => {return (
      <tr className="table__row" key={`tableRow${i.title}`}>
        <td className='table__column table__column_queue'>{i.queue + 1}</td>
        <td className='table__column table__column_title'>{i.title}</td>
        <td className='table__column table__column_number'>{i.number}</td>
      </tr>
    )});
  };

  const tableClass = classNames({
    'table': true,
    'table_off': data.title !== item,
  });

  function callBackQueue(): void {
    const defaultType: string = 'queueMin'; 
    setTypeFilter(typeFilter === defaultType ? 'queueMax' : defaultType)
  }

  function callBackTitle(): void {
    const defaultType: string = 'titleMin'; 
    setTypeFilter(typeFilter === defaultType ? 'titleMax' : defaultType)
  }

  function callBackNumber(): void {
    const defaultType: string = 'numberMin'; 
    setTypeFilter(typeFilter === defaultType ? 'numberMax' : defaultType)
  }

  const columnQueueClass: string = classNames({
    'table__column-head': true,
    'table__column_queue': true,
    'table__column-head_arrow-on': typeFilter === 'queueMin' || typeFilter === 'queueMax',
    'table__column-head_arrow-min': typeFilter === 'queueMin',
  });

  const columnTitleClass: string = classNames({
    'table__column-head': true,
    'table__column_title': true,
    'table__column-head_arrow-on': typeFilter === 'titleMin' || typeFilter === 'titleMax',
    'table__column-head_arrow-min': typeFilter === 'titleMin',
  });

  const columnHumberClass: string = classNames({
    'table__column-head': true,
    'table__column_number': true,
    'table__column-head_arrow-on': typeFilter === 'numberMin' || typeFilter === 'numberMax',
    'table__column-head_arrow-min': typeFilter === 'numberMin',
  });

  useEffect(() => {
    if (listItem) {
      let filteredList: Array<ItemTable> = [];

      switch(typeFilter) {
        case 'queueMin':
          filteredList = listItem;
          break;
        case 'queueMax':
          filteredList = listItem.reverse();
          break;
        case 'titleMin':
          filteredList = listItem.sort((a,b) => {
            return a.title > b.title ? 1 : -1;
          });
          break;
        case 'titleMax':
          filteredList = listItem.sort((a,b) => {
            return a.title < b.title ? 1 : -1;
          });
          break;
        case 'numberMin':
          filteredList = listItem.sort((a,b) => {
            return a.number > b.number ? 1 : -1;
          });
          break;
        case 'numberMax':
          filteredList = listItem.sort((a,b) => {
            return a.number < b.number ? 1 : -1;
          });
          break;
      };

      setContent(buildTable(filteredList));
    }
  }, [typeFilter]);

  return(
    <table className={tableClass}>
      <thead> 
        <tr className="table__row">
          <td 
            className={columnQueueClass}
            onClick={callBackQueue}
          >
            # {arrow}
          </td>
          <td 
            className={columnTitleClass}
            onClick={callBackTitle}
          >
            Title {arrow}
          </td>
          <td 
            className={columnHumberClass}
            onClick={callBackNumber}
          >
            Number {arrow}
          </td>
        </tr>
      </thead>
      <tbody>
        {content}
      </tbody>
    </table>
  );
};

export default Table;