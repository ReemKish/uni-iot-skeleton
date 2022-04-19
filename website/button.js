function increment() {
  var cnt = parseInt(document.getElementById("counter").innerHTML);
  document.getElementById("counter").innerHTML =  cnt + 1;
}

function addDevice(device_name) {
  device_list = document.getElementById("deviceList")
  device_list.insertAdjacentHTML('beforeend', `
      <div class="device">
        <p class="deviceName">${device_name}</p>
        <button onclick="increment()" class="incButton">+</button>
        <button onclick="increment()" class="incButton">+</button>
      </div>
`)
}
