# BLE Node for NodeRed

This is a node for [NodeRed](http://nodered.org) a tool for easily wiring together hardware devices, APIs and online services. This node provides a support for interacting with Bluetooth Low Energy (BLE) devices.
To this end this node relies on the [noble](https://github.com/sandeepmistry/noble) Node.js library.

This node is a based on the [initial scan BLE node](http://blog.buildinginternetofthings.com/2013/10/12/using-node-red-to-scan-for-ble-devices/) by Charalampos Doukas.
It has, however, been reimplemented for providing more fine grained access to the underyling BLE scanning process. Users can now limit the scans by providing a list of Service UUIDs to be detected and indicating whether duplicate detections should be allowed. 
The node also provides richer information about the detected devices including the peripheral UUID, all services exposed, etc. In doing this new version of the node we have also repackaged the node as an installable NPM package. 
          
Note: Noble currently only support Mac OS X and Linux. Other platforms will be developed later on.

# Prerequisites

Linux (Ubuntu)

```
sudo apt-get install libbluetooth-dev
```

Run as sudo or root 

## How to Install

For installing globally the node (NodeRed 0.10.4+) run the following

```
npm install -g node-red-contrib-noble
```

or locally within your user data directory (by default, $HOME/.node-red):

```
cd $HOME/.node-red
npm install node-red-contrib-noble
```

## Status

The node is at an early stage but is already usable. Currently the node provides only support for scanning for BLE devices. We shall be adding more functionality soon.

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