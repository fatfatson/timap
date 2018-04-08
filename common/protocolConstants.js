const codes = [
  { k: "r", v: "REQUEST" },
  { k: "s", v: "SUCCESS" },
  { k: "f", v: "FAILURE" }
];
const serverCode = "0"; //服务器通信关键字为固定值

var createConst = list => {
  var constMap = {};
  list.map((v, k) => {
    var loc = v.indexOf("@");
    if (loc > 0) {
      var str1 = v.substr(loc + 1);
      var arr = str1.match(/./g);
      v = v.substr(0, loc);
      for (var i = 0; i < arr.length; i++) {
        var value;
        var key;
        if (arr[i] == serverCode) {
          key = v + "_REQUEST_TO_SERVER";
          value = serverConstantPrefix + v + "_REQUEST";
        } else {
          for (var a = 0; a < codes.length; a++) {
            if (arr[i] == codes[a].k) {
              value = v + "_" + codes[a].v;
              key = value;
              break;
            }
          }
        }
        if (key.length > 0 && value.length > 0) {
          constMap[key] = value;
        }
      }
    } else {
      constMap[v] = v;
    }
  });
  return constMap;
};

export const serverConstantPrefix = "server/";

export const userConstants = {
  //用户登陆
  LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
  LOGIN_REQUEST_TO_SERVER: serverConstantPrefix + "USERS_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
  LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

  LOGOUT: "USERS_LOGOUT"
};

export const netConstants = createConst([
  "CONNECTED",
  "DISCONNECTED",
  "CONNECT_ERROR"
]);

export const dishConstants = createConst(["GET_DISH_DATA"]);

export const serverConnect = createConst(["GET_SERVER_CONNECT@rsf0"]);
