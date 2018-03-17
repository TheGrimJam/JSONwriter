'use strict';

export default class writerUI {
	constructor() {
		this.save = this.createSaveElem();
		this.dropdown = this.createLanguageDropdown();
		this.reload = this.createReloadElem();
		this.clickPrevention();
	}

	add_options(select_element, options) { // More of a utility method, doesn't need to be here to be clear
		/* Add an array of options to a select element */
		for ( var option_name in options ){
			var op = new Option();
			op.value = options[option_name];
			op.text = options[option_name];
			select_element.options.add(op);
		}
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
		this.add_options(language_dropdown, options);
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