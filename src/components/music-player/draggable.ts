import { getModels } from "@/utils/tools";

// 是否为手机
let isMobile = getModels();
// 窗口宽高
let clientW = 0;
let clientH = 0;
let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
clientW = isMobile ? w : document.body.clientWidth;
clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// 是否移动
let Moving = false;

document.addEventListener("DOMContentLoaded", function () {
  // 传入监听类型（触摸开始：鼠标按下）
  let eventType = isMobile ? "touchstart" : "mousedown";
  // 是否拖拽
  let dragging = false;
  let offset = {
    x: 0,
    y: 0,
  };
  let offsetDown = { x: 0, y: 0 };
  const MUSIC_BTN_POSITION = "__MUSIC_BTN_POSITION__";
  // 获取拖拽元素
  let box = document.getElementById("draggable");
  // 元素宽高
  let btnW = 0;
  let btnH = 0;
  btnW = box.offsetWidth;
  btnH = box.offsetHeight;
  let dropTimer = null;

  initClientData();

  function initClientData() {
    // 按钮位置保存在本地，可以记住位置，避免每次去拖拽
    let local = localStorage.getItem(MUSIC_BTN_POSITION);
    if (local) {
      offset = JSON.parse(local);
      btnMove();
    }
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientW = isMobile ? w : document.body.clientWidth;
    clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    btnW = box.offsetWidth;
    btnH = box.offsetHeight;
    // 给按钮绑定 mousedown 或 touchstart 事件
    box.addEventListener(eventType, btnMousedown);
  }

  function eventHandle(type: String) {
    if (isMobile) {
      document[`${type}EventListener`]("touchmove", mousemove);
      document[`${type}EventListener`]("touchend", mouseup);
    } else {
      document[`${type}EventListener`]("mousemove", mousemove);
      document[`${type}EventListener`]("mouseup", mouseup);
    }
  }

  function btnMousedown(e: any) {
    e = e || window.event;
    dragging = true;
    // 鼠标按下时，记录当前鼠标位置和元素的初始位置
    offsetDown = {
      ...getOffset(e),
    };
    eventHandle("add");
    if (!isMobile) e.preventDefault();
  }

  function mousemove(e: any) {
    // btnW = box.getBoundingClientRect().width;
    // btnH = box.getBoundingClientRect().height;
    e = e || window.event;
    if (dragging) {
      Moving = !(offsetDown.x === getOffset(e).x && offsetDown.y === getOffset(e).y);
      // 在拖拽过程中更新元素的位置
      let x = getOffset(e).x - btnW / 2;
      let y = getOffset(e).y - btnH / 2;
      if (x > 5 && x < clientW - btnW - 5) {
        offset.x = x;
      }
      if (y > 5 && y < clientH - btnH - 5) {
        offset.y = y;
      }
      if (Moving) {
        btnMove();
      }
      clearTimeout(dropTimer);
      dropTimer = setTimeout(() => {
        Moving = false;
        clearTimeout(dropTimer);
        dropTimer = null;
      }, 300);
    }
  }

  function mouseup() {
    // 鼠标释放时，停止拖拽
    if (dragging) {
      window.localStorage.setItem(MUSIC_BTN_POSITION, JSON.stringify(offset));
      eventHandle("remove");
    }
    dragging = false;
  }

  function getOffset(e: any) {
    return isMobile
      ? {
          x: e.targetTouches[0].clientX,
          y: e.targetTouches[0].clientY,
        }
      : {
          x: e.clientX,
          y: e.clientY,
        };
  }

  function btnMove() {
    box.style.cssText = `
      left: ${offset.x}px;
      top: ${offset.y}px;
      right: auto;
      bottom: auto;
    `;
  }
});

export { Moving, clientW };
