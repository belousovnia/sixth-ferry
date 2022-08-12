import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import { IItems } from "../data";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setData, setFilter } from "../store/mainSlice";

function SearchButtons() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.main.filter);
  const preData = useAppSelector(state => state.main.preData);

  const [activeItem, setActiveItem] = useState<number>(0);
  const [activeOption, setActiveOption] = useState<boolean>(false);
  const [listSelect, setListSelect] = useState<JSX.Element[]>([]);
  const [selectActive, setSelectActive] = useState<string>('All');

  function search(item: IItems[]) {
    const output: IItems[] = [];
    for (const i of item) {
      if (i.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        output.push(i)
      } else {
        if (i.items !== undefined) {
          let inItems: IItems[] = search(i.items);
          if (inItems.length !== 0) output.push({
            title: i.title,
            items: inItems,
          });
        };
      };
    };

    return output;
  };

  function callbackSelect(): void {
    if (activeItem === 1) {
      setActiveOption(false);
      setActiveItem(0);
      dispatch(setFilter(''));
      setSelectActive('All');
    } else {
      setActiveItem(1);
      dispatch(setFilter('')); 
    };
  };

  function callbackSearch(): void {
    if (activeItem === 2) {
      setActiveItem(0);
      dispatch(setFilter(''));
    } else {
      setSelectActive('All');
      dispatch(setFilter('')); 
      setActiveOption(false);
      setActiveItem(2);
    };
  };

  function buildListSelect(): JSX.Element[] {
    return preData.map((item) => {return (
      <button 
        key={`select${item.title}`}
        className="search-block__select-option"
        onClick={() => {
          setSelectActive(item.title);
          dispatch(setFilter(item.title));
          setActiveOption(false);
        }}
      >
        {item.title}
      </button>
    )});
  };

  useEffect(() => {
    dispatch(setData(search(preData)))
  }, [filter]);

  useEffect(() => {
    setListSelect(buildListSelect()); 
  }, []);
  
  const classSelect = classNames({
    'search-block__item': true, 
    'search-block__select': true,
    'search-block__item_on': activeItem === 1,
  }); 
  const classSearch = classNames({
    'search-block__item': true, 
    'search-block__search': true,
    'search-block__item_on': activeItem === 2,
  }); 
  const optionContainerClass = classNames({
    'search-block__option-container': true,
    'search-block__option-container_on': activeOption,
  });

  return (
    <div className="search-block">
      <div 
        className={classSelect} 
        onClick={callbackSelect}
      >
        <svg
          className="search-block__cross"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
            fill="white"
          />
        </svg>
        <div className="search-block__select-input-container">
          <div className="search-block__select-input" onClick={i => i.stopPropagation()}>
            <div className={optionContainerClass}>
              <button 
                className="search-block__select-option"
                onClick={() => {
                  setSelectActive('All');
                  dispatch(setFilter('')); 
                  setActiveOption(false);
                }}
              >
                All
              </button>
              {listSelect}
            </div>
            <button 
              className="search-block__select-title"
              onClick={() => {setActiveOption(!activeOption)}}
            >
              {selectActive}
            </button>
          </div>
        </div>
        
      </div>
      <div 
        className={classSearch}
        onClick={callbackSearch}
      >
        <input 
          type="text" 
          className="search-block__search-input"
          value={filter}
          onClick={i => i.stopPropagation()}
          onChange={(i) => dispatch(setFilter(i.target.value))}
        />
        <svg
          className="search-block__magnifier"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchButtons;