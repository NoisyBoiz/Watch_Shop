import "../styles/notification.css";

const root = getComputedStyle(document.querySelector(':root'));
const timeAnimationIn = root.getPropertyValue('--timeAnimationIn').substring(0,root.getPropertyValue('--timeAnimationIn').length-1)*1000;

const handleMessage = (message) => {
  try{
    let str = message.split(/(\(.*\))|('.*')|(`.*`)/);
    let rs = ""
    str.forEach((item)=>{
        if(item!==undefined){
            if(!item.includes("`")&&!item.includes("'")&&!item.includes("(")&&!item.includes(")")){
                rs += item.split(".").join("\n");
            }
            else{  
                rs.replace(/(\\n)$/," ");
                rs = rs + item+ "\n";
            }   
        }
    })
    return rs;
  }
  catch(e){
    return message;
  }
}
const handleTitle = (title) => {
  try{
    return JSON.parse(title);
  }
  catch(e){
    return title;
  }
}

const checkTitleValue = (title) => {
  if(title===null||title===undefined) return false;
  if(typeof title==="string"&&title.trim()==="") return false;
  return true;
}

const newAlert = ({title,message}) => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'notification-alert-box';
  document.getElementById('notification-alert-box').appendChild(document.createElement('div')).id = 'notification-alert-boxhead';
  if(checkTitleValue(title)){
    document.getElementById('notification-alert-box').appendChild(document.createElement('div')).id = 'notification-alert-boxtitle';
    document.getElementById('notification-alert-boxtitle').innerHTML = (typeof title==="object"?Object.values(title):title);
    document.getElementById('notification-alert-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithTitle');
  }
  else document.getElementById('notification-alert-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithoutTitle');
  document.getElementById('notification-alert-box').appendChild(document.createElement('div')).id = 'notification-alert-boxmessage';
  document.getElementById('notification-alert-box').appendChild(document.createElement('div')).id = 'notification-alert-boxfoot';
  document.getElementById('notification-alert-boxhead').innerHTML = '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224,71.1a8,8,0,0,1-10.78-3.42,94.13,94.13,0,0,0-33.46-36.91,8,8,0,1,1,8.54-13.54,111.46,111.46,0,0,1,39.12,43.09A8,8,0,0,1,224,71.1ZM35.71,72a8,8,0,0,0,7.1-4.32A94.13,94.13,0,0,1,76.27,30.77a8,8,0,1,0-8.54-13.54A111.46,111.46,0,0,0,28.61,60.32,8,8,0,0,0,35.71,72Zm186.1,103.94A16,16,0,0,1,208,200H167.2a40,40,0,0,1-78.4,0H48a16,16,0,0,1-13.79-24.06C43.22,160.39,48,138.28,48,112a80,80,0,0,1,160,0C208,138.27,212.78,160.38,221.81,175.94ZM150.62,200H105.38a24,24,0,0,0,45.24,0ZM208,184c-10.64-18.27-16-42.49-16-72a64,64,0,0,0-128,0c0,29.52-5.38,53.74-16,72Z"></path></svg>';
  document.getElementById('notification-alert-boxmessage').innerHTML = handleMessage(message);
  document.getElementById('notification-alert-boxfoot').innerHTML = '<button id="buttonClose"} > Close </button>';
  document.getElementById('buttonClose').addEventListener('click', closeNotification);
  setTimeout(()=>{document.getElementById('notification-container').style.opacity = 1;},[0]);
};

const newWarning = ({title,message,handleAccept,handleCancel,titleAccept,titleCancel}) => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'notification-warning-box';
  document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxhead';
  if(checkTitleValue(title)){
    document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxtitle';
    document.getElementById('notification-warning-boxtitle').innerHTML = (typeof title==="object"?Object.values(title):title);
    document.getElementById('notification-warning-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithTitle');
  }
  else document.getElementById('notification-warning-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithoutTitle');
  document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxmessage';
  document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxfoot';
  document.getElementById('notification-warning-boxhead').innerHTML = '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z"></path></svg>';
  document.getElementById('notification-warning-boxmessage').innerHTML = handleMessage(message);
  if(handleAccept!==null&&handleAccept!==undefined) document.getElementById('notification-warning-boxfoot').innerHTML = `<button id="buttonRefuse"> ${titleCancel!==null?titleCancel:"No"} </button> <button id="buttonAccept"> ${titleAccept!==null?titleAccept:"Yes"} </button>`;
  else document.getElementById('notification-warning-boxfoot').innerHTML = '<button id="buttonClose"} > Close </button>';
  if(handleAccept!==null&&handleAccept!==undefined) {
    document.getElementById('buttonAccept').addEventListener('click', () => {handleAccept();closeNotification()});
    document.getElementById('buttonRefuse').addEventListener('click', () => {if(handleCancel!==null&&handleCancel!==undefined)handleCancel();closeNotification()});
  }
  else document.getElementById('buttonClose').addEventListener('click', closeNotification);
  setTimeout(()=>{document.getElementById('notification-container').style.opacity = 1;},[0]);
};

const newWarning2 = ({title,message,handleAccept,titleAccept}) => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'notification-warning-box';
  document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxhead';
  if(checkTitleValue(title)){
    document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxtitle';
    document.getElementById('notification-warning-boxtitle').innerHTML = (typeof title==="object"?Object.values(title):title);
    document.getElementById('notification-warning-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithTitle');
  }
  else document.getElementById('notification-warning-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithoutTitle');
  document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxmessage';
  document.getElementById('notification-warning-box').appendChild(document.createElement('div')).id = 'notification-warning-boxfoot';
  document.getElementById('notification-warning-boxhead').innerHTML = '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z"></path></svg>';
  document.getElementById('notification-warning-boxmessage').innerHTML = handleMessage(message);
  if(handleAccept!==null&&handleAccept!==undefined) document.getElementById('notification-warning-boxfoot').innerHTML = `<button id="buttonAccept"> ${titleAccept!==null?titleAccept:"Yes"} </button>`;
  else document.getElementById('notification-warning-boxfoot').innerHTML = '<button id="buttonClose"} > Close </button>';
  if(handleAccept!==null&&handleAccept!==undefined) {
    document.getElementById('buttonAccept').addEventListener('click', () => {handleAccept();closeNotification()});
  }
  else document.getElementById('buttonClose').addEventListener('click', closeNotification);
  setTimeout(()=>{document.getElementById('notification-container').style.opacity = 1;},[0]);
};

const newConfirm = ({title,message,handleAccept,handleCancel,titleAccept,titleCancel}) => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'notification-confirm-box';
  document.getElementById('notification-confirm-box').appendChild(document.createElement('div')).id = 'notification-confirm-boxhead';
  if(checkTitleValue(title)){
    document.getElementById('notification-confirm-box').appendChild(document.createElement('div')).id = 'notification-confirm-boxtitle';
    document.getElementById('notification-confirm-boxtitle').innerHTML = (typeof title==="object"?Object.values(title):title);
    document.getElementById('notification-confirm-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithTitle');
  }
  else document.getElementById('notification-confirm-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithoutTitle');
  document.getElementById('notification-confirm-box').appendChild(document.createElement('div')).id = 'notification-confirm-boxmessage';
  document.getElementById('notification-confirm-box').appendChild(document.createElement('div')).id = 'notification-confirm-boxfoot';
  document.getElementById('notification-confirm-boxhead').innerHTML = '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"></path></svg>';
  document.getElementById('notification-confirm-boxmessage').innerHTML = handleMessage(message);
  document.getElementById('notification-confirm-boxfoot').innerHTML = `<button id="buttonRefuse"> ${titleCancel!==null?titleCancel:"No"} </button> <button id="buttonAccept"> ${titleAccept!==null?titleAccept:"Yes"} </button>`;
  document.getElementById('buttonAccept').addEventListener('click', () => {handleAccept();closeNotification()});
  document.getElementById('buttonRefuse').addEventListener('click', () => {if(handleCancel!==null&&handleCancel!==undefined)handleCancel();closeNotification()});
  setTimeout(()=>{document.getElementById('notification-container').style.opacity = 1;},[0]);
};

const newSuccess = ({title,message}) => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'notification-success-box';
  document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxhead';
  if(checkTitleValue(title)){
    document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxtitle';
    document.getElementById('notification-success-boxtitle').innerHTML = (typeof title==="object"?Object.values(title):title);
    document.getElementById('notification-success-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithTitle');
  }
  else document.getElementById('notification-success-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithoutTitle');
  document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxmessage';
  document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxfoot';
  document.getElementById('notification-success-boxhead').innerHTML = '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>';
  document.getElementById('notification-success-boxmessage').innerHTML = handleMessage(message);
  document.getElementById('notification-success-boxfoot').innerHTML = '<button id="buttonClose"}> Close </button> <div id="notification-success-boxfoot-timeBar"> </div>';
  document.getElementById('buttonClose').addEventListener('click', ()=>{clearInterval(inter);closeNotification();});

  let width = document.getElementById('notification-success-boxfoot-timeBar').offsetWidth;
  let time = 2000;
  let timeDown = time;
  let count = 10;
  
  let inter = setInterval(() => {
    if(document.getElementById('notification-success-boxfoot-timeBar')===null) {clearInterval(inter);closeNotification();}
    else{
      document.getElementById('notification-success-boxfoot-timeBar').style.width = width/time*timeDown+ 'px';
      timeDown -= count;
      if(timeDown<=0) {
        clearInterval(inter);
        closeNotification();
      }
    }
  }, count);
  setTimeout(()=>{document.getElementById('notification-container').style.opacity = 1;},[0]);
};

const newSuccess2 = ({title,message,handleAccept,titleAccept=null}) => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'notification-success-box';
  document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxhead';
  if(checkTitleValue(title)){
    document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxtitle';
    document.getElementById('notification-success-boxtitle').innerHTML = (typeof title==="object"?Object.values(title):title);
    document.getElementById('notification-success-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithTitle');
  }
  else document.getElementById('notification-success-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithoutTitle');
  document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxmessage';
  document.getElementById('notification-success-box').appendChild(document.createElement('div')).id = 'notification-success-boxfoot';
  document.getElementById('notification-success-boxhead').innerHTML = '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>';
  document.getElementById('notification-success-boxmessage').innerHTML = handleMessage(message);
  document.getElementById('notification-success-boxfoot').innerHTML = `<button id="buttonClose"}> ${titleAccept===null?"Close":titleAccept} </button> </div>`;
  document.getElementById('buttonClose').addEventListener('click', ()=>{handleAccept();closeNotification();});
  setTimeout(()=>{document.getElementById('notification-container').style.opacity = 1;},[0]);
};

const newError = ({title,message}) => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'notification-error-box';
  document.getElementById('notification-error-box').appendChild(document.createElement('div')).id = 'notification-error-boxhead';
  if(checkTitleValue(title)){
    document.getElementById('notification-error-box').appendChild(document.createElement('div')).id = 'notification-error-boxtitle';
    document.getElementById('notification-error-boxtitle').innerHTML = (typeof title==="object"?Object.values(title):title);
    document.getElementById('notification-error-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithTitle');
  }
  else document.getElementById('notification-error-box').style.gridTemplateRows = root.getPropertyValue('--notificationWithoutTitle');
  document.getElementById('notification-error-box').appendChild(document.createElement('div')).id = 'notification-error-boxmessage';
  document.getElementById('notification-error-box').appendChild(document.createElement('div')).id = 'notification-error-boxfoot';
  document.getElementById('notification-error-boxhead').innerHTML = '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clip-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"></path></svg>';
  document.getElementById('notification-error-boxmessage').innerHTML = handleMessage(message);
    handleMessage(message);
  document.getElementById('notification-error-boxfoot').innerHTML = '<button id="buttonClose"} > Close </button>';
  document.getElementById('buttonClose').addEventListener('click', closeNotification);
  setTimeout(()=>{document.getElementById('notification-container').style.opacity = 1;},[0]);
};

const newLoad = () => {
  document.body.appendChild(document.createElement('div')).id = 'notification-container';
  document.getElementById('notification-container').appendChild(document.createElement('div')).id = 'load';
  document.getElementById('load').appendChild(document.createElement('h1')).innerHTML = 'Watting to load';
  document.getElementById('load').appendChild(document.createElement('div')).id = 'spinner';
  for(let i = 0; i < 4; i++) document.getElementById('spinner').appendChild(document.createElement('div'));
  setTimeout(()=>{
    if(document.getElementById('notification-container')!==null) document.getElementById('notification-container').style.opacity = 1;
  },[0]);
};

const closeNotification = () => {
  if(document.getElementById('notification-container')!==null) document.getElementById('notification-container').style.opacity = 0;
  setTimeout(()=>{
    if(document.getElementById('notification-container')!==null) document.body.removeChild(document.getElementById('notification-container'));
  },[timeAnimationIn-10]);
};

const Notification = {
    close: () => {
      if(document.getElementById('notification-container')!==null) {
        closeNotification();
      }
    },
    // alert
    alert: ({title,message}) => {
        if(document.getElementById('notification-container')!==null) {
          title = handleTitle(title);
          closeNotification();
          setTimeout(()=>{newAlert({title,message})},[timeAnimationIn]);
        }
        else newAlert({title,message});
      },
    
    // warning
    warning: ({title,message,handleAccept,handleCancel,titleAccept,titleCancel}) => {
      title = handleTitle(title);
      if(document.getElementById('notification-container')!==null) {
        closeNotification();
        setTimeout(()=>{newWarning({title,message,handleAccept,handleCancel,titleAccept,titleCancel})},[timeAnimationIn]);
      }
      else newWarning({title,message,handleAccept,handleCancel,titleAccept,titleCancel});
    },

    // warning
    warning2: ({title,message,handleAccept,titleAccept}) => {
      title = handleTitle(title);
      if(document.getElementById('notification-container')!==null) {
        closeNotification();
        setTimeout(()=>{newWarning2({title,message,handleAccept,titleAccept})},[timeAnimationIn]);
      }
      else newWarning2({title,message,handleAccept,titleAccept});
    },


    // confirm
    confirm: ({title,message,handleAccept,handleCancel,titleAccept,titleCancel}) => {
        title = handleTitle(title);
        if(document.getElementById('notification-container')!==null) {
          closeNotification();
          setTimeout(()=>{newConfirm({title,message,handleAccept,handleCancel,titleAccept,titleCancel})},[timeAnimationIn]);
        }
        else newConfirm({title,message,handleAccept,handleCancel,titleAccept,titleCancel});
      },

    // success
    success: ({title,message}) => {
        title = handleTitle(title);
        if(document.getElementById('notification-container')!==null) {
          closeNotification();
          setTimeout(()=>{newSuccess({title,message})},[timeAnimationIn]);
        }
        else newSuccess({title,message});
      },

    // success
    success2: ({title,message,handleAccept,titleAccept}) => {
      title = handleTitle(title);
      if(document.getElementById('notification-container')!==null) {
        closeNotification();
        setTimeout(()=>{newSuccess2({title, message, handleAccept, titleAccept})},[timeAnimationIn]);
      }
      else newSuccess2({title,message,handleAccept,titleAccept});
    },

    // error
    error: ({title,message}) => {
        title = handleTitle(title);
        if(document.getElementById('notification-container')!==null) {
          closeNotification();
          setTimeout(()=>{newError({title,message})},[timeAnimationIn]);
        }
        else newError({title,message});
    },

    load: () => {
      if(document.getElementById('notification-container')!==null) {
        closeNotification();
        setTimeout(()=>{newLoad();},[timeAnimationIn]);
      }
      newLoad();
    }
}

export default Notification;