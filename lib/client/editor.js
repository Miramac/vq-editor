var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/katzenmilch');


function Editor(elmentId) {
	var editor = ace.edit(elmentId);
	editor.session.setOption("useWorker", false);
	editor.getSession().setMode('ace/mode/javascript');
	//editor.setTheme('ace/theme/monokai');
	editor.getSelectedText = function() { 
		return this.session.getTextRange(this.getSelectionRange());
	};
	editor.getAllText = function() { 
		return editor.getSession().getValue();
	};
	return editor;
}
//export editor
module.exports = Editor;   
