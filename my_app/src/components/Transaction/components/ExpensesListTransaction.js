import { FixedSizeList } from 'react-window'
import { useState } from "react";
import { Link } from "react-router-dom"
import "./style/expensesList.css"
import deleteImgPath from "./style/data/img/deleteImg.png"
import editImgPath from "./style/data/img/editImg.png"

const ExpensesListTransaction = (props) => {

    let filteredList = [...props.expList]
    if (props.filterValue !== "nothing") {
        filteredList = props.expList.filter((item) => {
            return item.category === props.filterValue;
        })
    }
    else {
        filteredList = [...props.expList];
    }


    const convertStr = (str) => {
        if (typeof str !== "undefined")
            return str.length > 9 ? str.slice(0, 8) + "..." : str;
    }

    const delItemHandler = (event) => {
        const itemIndex = event.target.className.split(" ")[1];
        const item = filteredList[itemIndex];
        props.deleteElemByIndex(item.id);
    }


    const editItemHandler = (event) => {
        const itemIndex = event.target.className.split(" ")[1];
        const item = filteredList[itemIndex];
        props.editItem(item);
    }


    const renderRow = ({ index, style }) => {
        const item = filteredList[index];
        return <>
            {index % 2 ? <></> : <div className='expensesListWall' style={style} />}
            <div className="expensesListItem" style={style}>
                <div className='itemRightContent' style={{ left: 360, width: "max-content" }}>
                    <p className="itemDescription">{convertStr(item.description)}</p>
                    <p className="itemMoney">Money: {convertStr(String(item.amount))}</p>
                </div>
                <p className="itemCategory" style={{ left: 730 }}>Category:<br /><b>{Object.keys(props.filterConverter)[Object.values(props.filterConverter).indexOf(item.category)]}</b></p>
                <div className='itemDateContainer'>
                    <p className="itemYear">{item.date.year}</p>
                    <p className="itemMonth">{item.date.month}</p>
                    <p className="itemDay">{item.date.day}</p>
                </div>
                {props.editFlag ?
                    <>
                        <img className={'editElement ' + index} onClick={editItemHandler} src={editImgPath} style={{ position: "relative", left: 1000, top: -185, width: 90, height: 90 }} />
                        <img className={'deleteElement ' + index} onClick={delItemHandler} src={deleteImgPath} style={{ position: "relative", left: 1100, top: -180, width: 100, height: 100 }} />
                    </>
                    :
                    <></>
                }
            </div>
        </>
    }

    return <>
        <div className="expensesList" style={{ ...props.style, width: 1415 }}>
            <FixedSizeList
                className="fixedExpensesList"
                height={572}
                width={1415}
                itemCount={filteredList.length}
                itemSize={230}
                style={{
                    width: "100%",
                }}
            >
                {renderRow}
            </FixedSizeList >
        </div>
    </>
}

export default ExpensesListTransaction;