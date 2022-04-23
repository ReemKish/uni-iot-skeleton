module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

    const account = "skeletonstorageaccount2";
    const accountKey = "dBSu+aBQih6UHeyD0OGQ11+FA3d+sXaBkm/qh8SqltLjlKOUHWbziQu1OaPex0whvLoKP2ngePZv+AStOh7N6w==";
    const tableName = "Counter";

    const credential = new AzureNamedKeyCredential(account, accountKey);
    const tableClient = new TableClient(
    `https://${account}.table.core.windows.net`,
    tableName,
    credential
    );

    // Get table value and return it
    let entity = await tableClient.getEntity('counter_pk','counter_rk', '001');
    context.res = {
        // status: 200, /* Defaults to 200 */
        body:  entity.Value
    };
}