const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const body = JSON.stringify({
  limit: 10,
  offset: 0,
});

export const API_REQUESTOPTIONS = {
  method: "POST",
  headers: myHeaders,
  body,
};
