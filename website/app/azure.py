from azure.iot.hub import IoTHubRegistryManager
from azure.iot.hub.models import QuerySpecification


IOTHUB_CONNECTION_STRING = "HostName=SkeletonH.azure-devices.net;SharedAccessKeyName=registryRead;SharedAccessKey=4hKe9fegXsjwRTUbToZFgPYTF2q0aHEsa8Yfh+gu610="


def get_iothub_device_ids():
    try:
        iothub_registry_manager = IoTHubRegistryManager(IOTHUB_CONNECTION_STRING)

        query_spec = QuerySpecification(query="SELECT * FROM devices")
        query_result = iothub_registry_manager.query_iot_hub(query_spec, None, 256)  # max 256 devices
        print(f"Devices: {(', '.join([twin.device_id for twin in query_result.items]))}")
        device_ids = [twin.device_id for twin in query_result.items]
        return device_ids
    except Exception as ex:
        print(f"Unexpected error {ex}")
        return ["ERR"]
