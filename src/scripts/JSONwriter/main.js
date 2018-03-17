/* Just an example of importing from another module */

'use strict';

import writerUI from './UI';
import writer from './writer';
import writerTests from './tests';

var debug = true;
var attributeName = "data-text-translate";


function writerInit () {
  // Main function for the writer.
    console.group('JSONwriter');
    
    //Initiate the UI
    var UI = new writerUI(); // Have left the UI separate as it's not optimal
    var _writer = new writer(UI);

    /*-------------------------------------*/
    // Test

    var _writerTests = new writerTests(_writer);
    debug && console.log("Active areas:");
    debug && console.table(_writer.activeAreas)


    debug && console.log("JSON download..." , _writer.download());


    console.group('Test');
    console.group('Rechecking of active content areas');
    console.log("Adding " + attributeName + " areas");
    _writerTests.testReload();

    console.groupEnd('Rechecking of active content areas');
    console.groupEnd('Test');

    /*-------------------------------------*/

    console.groupEnd('JSONwriter');
};


writerInit();