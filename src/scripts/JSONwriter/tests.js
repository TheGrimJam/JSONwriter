'use strict';

export default class writerTests {
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