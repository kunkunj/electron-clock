const Datas = (function () {
  let state = {
    list: [],
    time: [],
  };
  function init() {
    state = JSON.parse(
      localStorage.getItem("stateList") ||
        JSON.stringify({
          list: [],
        })
    );
    state.list = state.list.filter((item) => item.isAdd !== true);
    update();
  }
  function add(item) {
    state.list.push(item);
    update();
  }
  function close(item) {
    item.disabled = true;
    update();
  }
  function open(item) {
    item.disabled = false;
    update();
  }
  function update() {
    localStorage.setItem("stateList", JSON.stringify(state));
    render(state.list, update);
  }
  function remove(index) {
    state.list.splice(index, 1);
  }
  function addTime(time) {
    state.time.push(time);
    localStorage.setItem("stateList", JSON.stringify(state));
  }
  function getState() {
    return state
  }
  return {
    getState,
    add,
    update,
    remove,
    init,
    close,
    open,
    addTime,
  };
})();
