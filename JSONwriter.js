'use strict';

var debug = true;
var attributeName = "data-text-translate";
var contentSelector = '*' + '[' + attributeName + ']';
var downloadFileName = "config_test.json";


function add_options(select_element, options) { // More of a utility method, doesn't need to be here to be clear
  /* Add an array of options to a select element */
    for ( var option_name in options ){
        var op = new Option();
        op.value = options[option_name];
        op.text = options[option_name];
        select_element.options.add(op);
    }
}

// Visible elements
class writerUI {
  constructor() {
    this.save = this.createSaveElem();
    this.dropdown = this.createLanguageDropdown();
    this.reload = this.createReloadElem();
    this.clickPrevention();
  }

  clickPrevention() {
    // Prevent all default click actions if the CTRL key is held in the process
    document.addEventListener('click', (e) => {
        if (e.ctrlKey === true) {
            e.preventDefault();
            e.stopPropagation();
            // For whatever reason, content editable is not blocked by these
        }
    }, true);
  }

  createSaveElem() {
    // Creates the save button
    var save_element = document.createElement('a');
    var save_text = document.createTextNode("Save");

    // Attach somewhere
    var body = document.querySelector('body');
    body.appendChild(save_element);

    // Save button style attributes. An additional stylesheet is the way to go here, as it is a dev tool.
    save_element.href = "#Nada";
    save_element.appendChild(save_text);
    save_element.style.position = "fixed";
    save_element.style.top = "20px";
    save_element.style.right = "3%";
    save_element.style.width = "20px";
    save_element.style.height = "20px";
    save_element.style.zindex = "20";
    save_element.style.display = "block";
    return save_element;
  } 

  createReloadElem() {
    var reloadElem = document.createElement('a');
    var reloadText = document.createTextNode("Reload");

    var body = document.querySelector('body');
    body.appendChild(reloadElem);
    reloadElem.appendChild(reloadText);


    reloadElem.style.position = "fixed";
    reloadElem.style.top = "90px";
    reloadElem.style.right = "5%";
    reloadElem.style.width = "20px";
    reloadElem.style.height = "20px";
    reloadElem.style.zindex = "20";
    reloadElem.style.display = "block";

    return reloadElem;
  }

  createLanguageDropdown() {
    var language_dropdown = document.createElement('select');
    var body = document.querySelector('body');
    body.appendChild(language_dropdown);

    var options = ['english', 'italian', 'budgie']; // Resolve these from JSON
    add_options(language_dropdown, options);
    language_dropdown.style.position = "fixed";
    language_dropdown.style.top = "60px";
    language_dropdown.style.right = "3%";
    language_dropdown.style.width = "auto";
    language_dropdown.style.height = "20px";
    language_dropdown.style.zindex = "20";
    language_dropdown.style.display = "block";
    return language_dropdown;
  }
}

class writer {
    constructor(UI) {
        this.activeAreas = this.assignContentAreas();
        this.UI = UI;
        this.JSON = {};
    }

    assignContentAreas() {
        // Apply "contenteditable" to areas and return
        var activeAreas = document.querySelectorAll(contentSelector);
        for (let editable of activeAreas) {
            editable.style.border = "red";
            editable.setAttribute('contenteditable', true);
        }
        return activeAreas;
    }

    reload() {
        // Dynamically loaded content may require special conditions
        this.activeAreas = this.assignContentAreas();
    }

    update() {
        // Internal method to populate the JSON
        var textAreas = document.querySelectorAll(contentSelector);
        for ( let text of textAreas ) {
            var innerText = text.innerHTML;
            var id = text.getAttribute(attributeName);
            this.JSON[id] = innerText; 
        }
    }

    download() {
        // Download and assign updated JSON to the save button
        this.update();
        var text = JSON.stringify(this.JSON);
        var file = new Blob([text], {type: 'text/json'});

        this.UI.save.href = URL.createObjectURL(file);  // Code quality: This involves too much coupling with the UI.
        this.UI.save.download = downloadFileName;

        return this.JSON;
    }
}


class writerTests {
    constructor(writer) {
        this.writer = writer;
    }

    makeAllPTagsEditable() {
        // Lazy way to prime page for reload test
        // Better to add elements to the page and check they are assigned.
        var ptags = document.querySelectorAll('p');
        for (let ptag of ptags) {
            ptag.setAttribute('contenteditable', true);
        }
        console.log("All p tags on page have contenteditable attribute")
    }

    testReload() {
        console.log("Testing reload functionality");
        this.makeAllPTagsEditable();
        this.writer.reload();
    }
}

export function writerInit () {
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