# BLE Node for NodeRed

This is a node for [NodeRed](http://nodered.org) a tool for easily wiring together hardware devices, APIs and online services. This node provides a support for interacting with Bluetooth Low Energy (BLE) devices.
To this end this node relies on the [noble](https://github.com/sandeepmistry/noble) Node.js library.
 
Note: Noble currently only support Mac OS X and Linux. Other platforms will be developed later on.

# Prerequisites

Linux (Ubuntu)

```
sudo apt-get install libbluetooth-dev
```

Run as sudo or root 

## How to Install

Run the following command in the root directory of your Node-RED install

```
npm install node-red-contrib-noble
```

## Status

The node is at a rather early stage but is already usable. Currently the node provides only support for scanning for BLE devices. We shall be adding this functionality soon.

License
-------

Copyright 2014 Knowledge Media Institute - The Open University.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.