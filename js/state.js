var render = function (domList, update) {
  function createVnode(title, time, detail, index) {
    let date = new Date(time);
    return {
      tag: "div",
      attrs: {
        class: "card",
      },
      children: [
        {
          tag: "div",
          attrs: {
            class: "title",
          },
          content: title,
        },
        {
          tag: "div",
          attrs: {
            class: "time",
          },
          content: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
        },
        {
          tag: "div",
          attrs: {
            class: "content",
            style: "min-height:70px",
          },
          content: detail,
        },
        {
          tag: "div",
          attrs: {
            class: "btn",
            style: "margin: 0 auto",
          },
          on: [
            {
              type: "click",
              fn: () => {
                confirm("确定删除？", (e) => {
                  if (e) {
                    Datas.remove(index);
                  }
                  Datas.update();
                });
              },
            },
          ],
          content: "删除",
        },
      ],
    };
  }
  function createNewVnode(item, fn) {
    return {
      tag: "div",
      attrs: {
        class: "card",
      },
      children: [
        {
          tag: "input",
          attrs: {
            class: "input",
            placeholder: "请输入题目",
          },
          on: [
            {
              type: "input",
              fn: (e) => {
                item.title = e.target.value;
              },
            },
          ],
        },
        {
          tag: "input",
          attrs: {
            class: "input",
            type: "datetime-local",
          },
          on: [
            {
              type: "change",
              fn: (e) => {
                item.time = e.target.value;
              },
            },
          ],
        },
        {
          tag: "input",
          attrs: {
            class: "input",
            placeholder: "请输入详情",
          },
          on: [
            {
              type: "input",
              fn: (e) => {
                item.detail = e.target.value;
              },
            },
          ],
        },
        {
          tag: "div",
          attrs: {
            class: "btn",
            style: "margin: 0 auto;",
          },
          on: [
            {
              type: "click",
              fn: () => {
                if (!item.title || !item.time || !item.detail) {
                  alert("请补全信息");
                  return;
                }
                delete item["isAdd"];
                item.isContent = true;
                fn?.call(null);
                render(domList);
              },
            },
          ],
          content: "确定",
        },
      ],
    };
  }
  let dom = document.getElementById("app");
  dom.innerHTML = "";
  domList.map((item, index) => {
    if (item.isContent) {
      dom.appendChild(
        compiler(createVnode(item.title, item.time, item.detail, index))
      );
    } else if (item.isAdd) {
      dom.appendChild(compiler(createNewVnode(item, update)));
    }
  });
  // cardDom);
};
