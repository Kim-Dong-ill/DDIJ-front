import React from "react";
import {Link, useLocation} from "react-router-dom";

function Header(props) {
    const tempProps = props.props;
    let num ;
    const url = useLocation().pathname;
    switch(url){
        case "/ccview" : num= tempProps[0].title; break;
        case "/ccview" : num= tempProps[0].title; break;
        case "/ccview" : num= tempProps[0].title; break;
        case "/ccview" : num= tempProps[0].title; break;
        case "/ccview" : num= tempProps[0].title; break;
        case "/mypetlist" : num= tempProps[3].title; break;
        case "/usermodify" : num= tempProps[3].title; break;
        case "/userinfo" : num= tempProps[3].title; break;
        default : num = ""
    }
  return (
    <>
      <div className="flex items-end justify-between h-[90px] px-[10px]">
        <h1 className="text-white navbar">{num}</h1>
        <Link to="/">
          <img src="/images/DDIJlogo.svg" alt="" />
        </Link>
      </div>
    </>
  );
}

export default Header;
