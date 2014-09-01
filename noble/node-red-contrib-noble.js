/*
 * Copyright (c) 2014. Knowledge Media Institute - The Open University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * NodeRed node with support for interaction with BLEs
 *
 * @author <a href="mailto:carlos.pedrinaci@open.ac.uk">Carlos Pedrinaci</a> (KMi - The Open University)
 */

module.exports = function(RED) {

    var noble = require('noble');
    var os = require('os');
    
    // The main node definition - most things happen in here
    function NobleScan(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);
    
        // Store local copies of the node configuration (as defined in the .html)
        this.duplicates = n.api;

        var node = this;
        var machineId = os.hostname();

        noble.on('discover', function(peripheral) {

            var bleacon = { payload:{uuid:peripheral.uuid, localName: peripheral.advertisement.localName} };
            bleacon.uuid = peripheral.uuid;
            bleacon.localName = peripheral.advertisement.localName;
            bleacon.detectedAt = new Date().getTime();
            bleacon.detectedBy = machineId;
            bleacon.advertisement = peripheral.advertisement;

            // Check the BLE follows iBeacon spec
            if (peripheral.manufacturerData) {
                // http://www.theregister.co.uk/2013/11/29/feature_diy_apple_ibeacons/
                if (peripheral.manufacturerData.length >= 25) {
                    var uuid = peripheral.manufacturerData.slice(4, 20).toString('hex');
                    var major = peripheral.manufacturerData.readUInt16BE(20);
                    var minor = peripheral.manufacturerData.readUInt16BE(22);
                    var measuredPower = peripheral.manufacturerData.readInt8(24);

                    var accuracy = Math.pow(12.0, 1.5 * ((rssi / measuredPower) - 1));
                    var proximity = null;

                    if (accuracy < 0) {
                        proximity = 'unknown';
                    } else if (accuracy < 0.5) {
                        proximity = 'immediate';
                    } else if (accuracy < 4.0) {
                        proximity = 'near';
                    } else {
                        proximity = 'far';
                    }

                    bleacon.manufacturerUuid = uuid;
                    bleacon.major = major;
                    bleacon.minor = minor;
                    bleacon.measuredPower = measuredPower;
                    bleacon.accuracy = accuracy;
                    bleacon.proximity = proximity;
                }
            }

            // Generate output event
            node.send(bleacon);
        });

        if (noble.state === 'poweredOn') {
            noble.startScanning([], n.duplicates);
        } else {
            noble.on('stateChange', function() {
                noble.startScanning([],  n.duplicates);
            });
        }
    
        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: this.client.disconnect();
            noble.stopScanning();
        });
    }
    
    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("scan ble",NobleScan);

}
