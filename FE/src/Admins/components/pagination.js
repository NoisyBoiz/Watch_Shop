import { useState } from 'react';
import "../styles/pagination.css";

function setButton(indexPage,totalPages){
    let arr = [];
    let limitButton = 6;
    if(totalPages>limitButton){
        if(indexPage<=totalPages-(limitButton-3)){
            let x=0;
            if(indexPage>=2) x=-1;
            for(let i=1;i<=limitButton;i++){
                if(i===1&&indexPage>2){arr.push({sign:"...",index:indexPage+x-1});}
                else if(i===limitButton) {arr.push({sign:"...",index:indexPage+x});}
                else{arr.push({sign:indexPage+x,index:indexPage+x});x++;}
            }
        }
        else{
            let x=2;
            for(let i=1;i<=limitButton;i++){
                if(i===1) {arr.push({sign:"...",index:x+totalPages-limitButton-1});}
                else{arr.push({sign:x+totalPages-limitButton,index:x+totalPages-limitButton});x++;}
            }
        }
    }
    else{
        for(let i=1;i<=totalPages;i++){
            arr.push({sign:i,index:i});
        }
    }
    return arr;
}

function Pagination({totalPages, indexPage, setIndexPage}){
    let [inputPage, setInputPage] = useState(indexPage);
    let arrButPage = setButton(indexPage,totalPages);

    const changePage = (index, totalPages) => {
        setIndexPage(index);
        setInputPage(index);
        arrButPage = setButton(index,totalPages);
    }

    return(
        <>
        {totalPages>1?
            <div className="pagination">
                <button className="btn-pre" disabled={indexPage<=1} onClick={()=>{changePage(indexPage-1,totalPages)}}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path></svg></button>
                    <div className="btn-index"> 
                        {arrButPage.length&&arrButPage.map((item,index)=>{
                            return <button key={index} className={item.index===indexPage?"active":"inactive"} onClick={()=>{changePage(item.index,totalPages)}}> {item.sign} </button>
                        })}
                    </div>
                <button className="btn-next" disabled={indexPage>=totalPages} onClick={()=>{changePage(indexPage+1,totalPages) }}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path></svg></button>
                <div className="input"> 
                    <input type="number" value={inputPage} onChange={(e)=>{setInputPage(e.target.value);}} onKeyDown={(e)=>{if(e.key==="Enter"){if(Number(inputPage)>0&&Number(inputPage)<=totalPages){changePage(Number(inputPage),totalPages)}}}}/> <span> / {totalPages} </span> 
                </div>
            </div>
        :""}
        </>
    )
}
export default Pagination