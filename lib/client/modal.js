var $ = require('jquery');

function initiateModal (options) {
    options.backdrop = (typeof options.backdrop !== 'undefined') ? options.backdrop : true;
    $( '.modal-title' ).text(options.header);
    $( '.modal-body' ).text(options.content);
    $( '.modal-button' ).hide();
    $( options.buttons ).show();
    options.mode();
    $( '#mightyModal' ).modal( {backdrop: options.backdrop}, 'show' ); 
}

function createSaveModal () {
    initiateModal({ header: 'Save file?',
                    content: 'Safe file before closing?',
                    buttons: '.modal-button-dismiss ,.modal-button-yes, .modal-button-no',
                    mode:   function() { $( '.modal-button-yes' ).click(function() { console.log('saveFile() -> exit()'); });
                                         $( '.modal-button-no' ).click(function() { console.log('exit()'); });
                            },
                    backdrop: 'static'
    });
}

function createFileChangedModal () {
    initiateModal({ header: 'File changed',
                    content: 'The file was changed by another programm. Would you like to load it?',
                    buttons: '.modal-button-yes, .modal-button-no',
                    mode:   function() { $( '.modal-button-load' ).click(function() { console.log('loadFile()'); $( '#mightyModal' ).modal('hide'); });
                                         $( '.modal-button-no' ).click(function() { $( '#mightyModal' ).modal('hide'); });
                            }
    });
}

function createCancelProcessModal () {
    initiateModal({ header: 'Cancel process',
                    content: 'Cancel the running process?',
                    buttons: '.modal-button-yes, .modal-button-no, .modal-button-dismiss',
                    mode:   function() { $( '.modal-button-yes' ).click(function() { console.log('cancelProcess()'); $( '#mightyModal' ).modal('hide'); });
                                         $( '.modal-button-no' ).click(function() { $( '#mightyModal' ).modal('hide'); });
                            }
    });
}

function createOpenFileModal () {
    initiateModal({ header: 'Open file',
                    content: 'Open selected file?',
                    buttons: '.modal-button-open, .modal-button-no',
                    mode:   function() { $( '.modal-button-yes' ).click(function() { console.log('loadFile()'); $( '#mightyModal' ).modal('hide'); });
                                         $( '.modal-button-no' ).click(function() { $( '#mightyModal' ).modal('hide'); });
                            }
    });
}

module.exports = {
    initiateModal: initiateModal,
    createSaveModal: createSaveModal,
    createFileChangedModal: createFileChangedModal,
    createCancelProcessModal: createCancelProcessModal,
    createOpenFileModal: createOpenFileModal
};