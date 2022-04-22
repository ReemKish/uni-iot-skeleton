# uni-iot-skeleton
Skeleton project for IoT Workshop in Tel Aviv University.

TODO:
* [01 Mobile App](https://github.com/moabarar/Skeleton-Project_2022/tree/master/01%20Mobile%20App)
* [02 IoT Device](https://github.com/moabarar/Skeleton-Project_2022/tree/master/02%20IoT%20Device)
* [03 Serverless and DB](https://github.com/moabarar/Skeleton-Project_2022/tree/master/03%20Serverless%20and%20DB)
* [04 Web App](https://github.com/moabarar/Skeleton-Project_2022/tree/master/04%20Web%20App)
* Glue it all together

## 04 Web App
The website is built on flask. To run it:

    cd website
    pip install -r requirements.txt   # install dependencies
    python3 run.py

The website will then be available at `localhost:8000`
> **_NOTE:_**  The website sometimes takes a long time to load, this is because on each refresh, the Azure IoT Hub is queried to determine the list of devices. This query may take some time to return.
