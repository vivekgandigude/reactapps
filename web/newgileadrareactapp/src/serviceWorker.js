import listOperations from "./services/crud.service";
import dexieIndexedDb from "./services/dexie.indexeddb";
var allResults = allResults || [];
let listItemCount;
let maxLimit = 5000;
let pid = 1;

export default function serviceorker() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register(swUrl)
        .then(
          function (registration) {
            console.log(
              "worker registration is successfull",
              registration.scope
            );
            addSPListData();
            getEmployeesData();
          },
          function (err) {
            console.log("Failed");
          }
        )
        .catch(function (err) {
          console.log(err);
        });
    });
  } else {
    console.log("Service worker is not supported");
  }
}

const addSPListData = async () => {
  const data = await listOperations.getListItemCount();
  listItemCount = data.ItemCount;
  getNextSet();
};
const getNextSet = async () => {
  let results = await listOperations.getNextSalesData(pid - 1, maxLimit);
  allResults = allResults.concat(results.results);
  console.log(results.results.length);
  pid = pid + 5000;
  if (results.__next && pid <= listItemCount) {
    console.log(pid);
    getNextSet();
  } else {
    await dexieIndexedDb.addListDataToIndexedDB(allResults);
  }
};

const getEmployeesData = async () => {
  let results = await listOperations.getEmp();
  if (results.length > 0) {
    await dexieIndexedDb.addBulkDataToIndexedDB(results);
  }
};
