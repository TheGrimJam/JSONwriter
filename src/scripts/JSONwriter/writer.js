'use strict';


export default class writer {
    constructor(UI) {
        this.activeAreas = this.assignContentAreas();
        this.UI = UI;
        this.JSON = {};
        this.attributeName = "data-text-translate";
        this.contentSelector = '*' + '[' + this.attributeName + ']';
        this.downloadFileName = "config_test.json";
    }

    assignContentAreas() {
        // Apply "contenteditable" to areas and return
        var activeAreas = document.querySelectorAll(this.contentSelector);
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
        var textAreas = document.querySelectorAll(this.contentSelector);
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
        this.UI.save.download = this.downloadFileName;

        return this.JSON;
    }
}