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

    // Update Tabl
    const value = (req.query.value || (req.body && req.body.value));
    let entity = await tableClient.getEntity('counter_pk', 'counter_rk');
    entity.Value = parseInt(value);
    await tableClient.updateEntity(entity);
    context.bindings.signalRMessage1 = [{
        "target": "CounterUpdateSignal",
        "arguments": [ "whatever",value ]
    }];
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: `Counter was successfully updated to ${entity.Value}`
    };
}