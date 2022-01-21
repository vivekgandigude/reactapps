import axiospkg from "axios";
import pkg from "qs";
const { stringify } = pkg;
import axios from "axios";
const { defaults, post, get } = axiospkg;

const postData = {
  grant_type: "client_credentials",
  client_id:
    "5a20b510-505f-4c42-ae94-09bfb9bd521b@bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820",
  client_secret: "qDb09OoFas6fAUPYiitgth5kyvfJAnJkscJzOQl+gaM=",
  resource:
    "00000003-0000-0ff1-ce00-000000000000/winwireinc.sharepoint.com@bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820",
};
const LISTTITLE = "SalesRecords";
const graphAPITokenUrl = "https://graph.microsoft.com/v1.0/sites/";
const spSiteDomain = "winwireinc.sharepoint.com";
const siteID = "f45c888b-1ab4-4744-8086-af780aba5564";
const webID = "ceace5cb-0af2-4363-98c2-cb74d451cebf";
const listID = "9d0f96f1-262f-44ed-9bb1-be301cfde7eb";
const tenantID = "bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820";
const spApiURl =
  "https://login.microsoftonline.com/" + tenantID + "/oauth2/v2.0/token";
const getItemUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')/items?";
const createItemUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')/items";
const baseListUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')/ItemCount";

const updateUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')";
class SPListController {
  getListAccesToken = (request, response, next) => {
    try {
      return post(
        "https://accounts.accesscontrol.windows.net/bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820/tokens/OAuth/2",
        stringify(postData),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
        .then((res) => {
          return res.data.access_token;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (ex) {
      console.log("error in response token catch", ex);
    }
  };
  getAllTestListItems = (req, res, next) => {
    this.getListAccesToken().then((response) => {
      get(getItemUrl + "$select=ID,Title,field_1,field_2,field_3&$top=1000", {
        headers: {
          Authorization: "Bearer " + response,
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
        },
      })
        .then((response1) => {
          return res.status(200).json(response1.data.d);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  getNextListItems = (req, res, next) => {
    let url =
      getItemUrl +
      "$filter=ID gt '" +
      req.query.pid +
      "'&$top=" +
      req.query.top;

    this.getListAccesToken().then((response) => {
      get(url, {
        headers: {
          Authorization: "Bearer " + response,
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
        },
      })
        .then((response1) => {
          return res.status(200).json(response1.data.d);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  getListItemCount = (req, res, next) => {
    this.getListAccesToken().then((response) => {
      get(baseListUrl, {
        headers: {
          Authorization: "Bearer " + response,
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
        },
      })
        .then((response1) => {
          return res.status(200).json(response1.data.d);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  getTestListItems = (req, res, next) => {
    let limit = req.query.limit;

    this.getListAccesToken().then((response) => {
      get(
        "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('SalesRecords')/items?limit=" +
          limit,
        {
          headers: {
            Authorization: "Bearer " + response,
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
          },
        }
      )
        .then((response1) => {
          return res.status(200).json(response1.data.d);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  getAllTestListItem = (req, res, next) => {
    let r = req;
    this.getListAccesToken().then((response) => {
      get(createItemUrl + "(" + req.query.id + ")", {
        headers: {
          Authorization: "Bearer " + response,
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
        },
      })
        .then((response1) => {
          let data = response1.data;
          //console.log(response1.data);
          return res.status(200).json(response1.data.d);
          //return response1.data.d;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  createListItem = async (req, res, next) => {
    console.log(req.body);

    this.getListAccesToken().then((response) => {
      post(
        createItemUrl,
        {
          __metadata: {
            type: "SP.Data.SalesRecordsListItem",
          },
          Title: req.body.title,
          field_1: req.body.country,
          field_2: req.body.itemtype,
          field_3: req.body.saleschannel,
        },
        {
          headers: {
            Authorization: "Bearer " + response,
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
          },
        }
      )
        .then((response1) => {
          console.log(response1);
          return res.status(200).json(response1.data.d);
        })
        .catch((error) => {
          console.log("error");
        });
    });
  };
  updateListItem = async (request, res, next) => {
    console.log(request.query);
    console.log(request.body);
    this.getListAccesToken().then((response) => {
      post(
        updateUrl + "/getItemById(" + request.query.id + ")",
        {
          __metadata: {
            type: "SP.Data.SalesRecordsListItem",
          },
          Title: request.body.title,
          field_1: request.body.country,
          field_2: request.body.itemtype,
          field_3: request.body.saleschannel,
        },
        {
          headers: {
            Authorization: "Bearer " + response,
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "If-Match": "*",
            "X-HTTP-Method": "MERGE",
          },
        }
      )
        .then((response1) => {
          return res.status(200).json(response1.data);
        })
        .catch((error) => {
          console.log("error");
        });
    });
  };
  deleteListItem = async (request, res, next) => {
    console.log(request.query.id);
    this.getListAccesToken().then((response) => {
      axios
        .delete(createItemUrl + "(" + request.query.id + ")", {
          headers: {
            Authorization: "Bearer " + response,
            Accept: "application/json;odata=verbose",
            "If-Match": "*",
          },
        })
        .then((response1) => {
          return res.status(200).json(response1.statusText);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
}
const splistController = new SPListController();

export default splistController;
