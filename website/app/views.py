from app import app, azure
from flask import render_template




@app.route("/")
def index():
    device_ids = azure.get_iothub_device_ids()  # use device ids as device names
    return render_template("index.html", device_names=device_ids)
