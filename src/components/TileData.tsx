import moment from "moment";
import { IItems } from "../data";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setItem } from "../store/mainSlice";
import Table from "./Table";

function TileData(props: any) {
  const data: IItems = props.data;
  const dateStart: string = moment(new Date(Number(data.dateStart))).format("DD.MM.YYYY");
  const dateEnd: string = moment(new Date(Number(data.dateEnd))).format("DD.MM.YYYY");

  const dispatch = useAppDispatch();
  const item = useAppSelector(state => state.main.item);
  
  function callBackBlock(): void {
    if (item === data.title) {
      dispatch(setItem(null));
    } else {
      dispatch(setItem(data.title));
    };
  };

  return (
    <div className='tile-data'>
      <div 
        className="tile-data__title-container"
        onClick={callBackBlock}
      >
        <div className="tile-data__title-block">
          <p className="tile-data__title">{data.title}</p>
          <p className="tile-data__subTitle">{data.subTitle}</p>
        </div>
        <div className="tile-data__data-block">
          {`${dateStart} - ${dateEnd}`}
        </div>
      </div>
      <Table data={data}/>
    </div>
  );
};

export default TileData;