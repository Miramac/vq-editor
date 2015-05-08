var $ = jQuery = require('jquery')
,   Editor = require('./editor.js')
,   consoleWidget = require('./console.js')
,   editorPanel = require('./editorpanel.js')
,   modal = require('./modal.js')
;

require('bootstrap');

//export to nw.js
global.jQuery = jQuery;
global.Editor = Editor;

// $( '#tree' ).treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});

$( '[data-toggle="tooltip"]' ).tooltip({delay: {'show': 800, 'hide': 200}, animation: true});

// $( '.run-button').click(function(event) {
    // editorPanel.runEvent(event);
// });

$( '.check-button').click(function() {
    modal.createCancelProcessModal();
});

$( '.save-button' ).click(function() {
    modal.createSaveModal();
});

