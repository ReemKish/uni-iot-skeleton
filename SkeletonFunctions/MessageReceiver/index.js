module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);
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
    let value = "1"
    let promises = []
    for(let message in eventHubMessages) {
        context.log(`Processed message ${message}`);
        entity = await tableClient.getEntity('counter_pk','counter_rk', '001');
        entity.Value += 1;
        value = entity.Value.toString()
        await tableClient.updateEntity(entity);
    }
    context.bindings.signalRMessage2 = [{
            "target": "CounterUpdateSignal",
            "arguments": [ "aaaa", value ]
        }];
};