// Managt den UndoManager (funktioniert noch nicht so richtig)
function updateUndoManager (undoManager) {
    if (undoManager.hasRedo()) {
        $( '.redo-button-li' ).removeClass( 'li-disabled' );
        $( '.redo-button' ).removeClass( 'disabled' ).click(function() {
            undoManager.redo();
        });
    } else {
        $( '.redo-button-li' ).addClass( 'li-disabled' );
        $( '.redo-button' ).addClass( 'disabled' ).unbind( 'click' );
    }
    if (undoManager.hasUndo()) {
        $( '.undo-button-li' ).removeClass( 'li-disabled' );
        $( '.undo-button' ).removeClass( 'disabled' ).click(function() {
            undoManager.undo();
        });
    } else {
        $( '.undo-button-li' ).addClass( 'li-disabled' );
        $( '.undo-button' ).addClass( 'disabled' ).unbind( 'click' );
    }
}

// Initiiert die GUI für den Runprozess
function initiateRun (event) {
    var target = $( event.currentTarget );
    target
        .unbind( 'click' )
        .tooltip( 'hide' )
        .removeClass( 'run-button' )
        .addClass( 'm-progress' )
        .attr( 'data-original-title', 'Cancel' )
        .tooltip({delay: {'show': 800, 'hide': 200}, animation: true, title: 'Cancel'});
}

// Initiiert die Funktionen des Popovers
function initiatePopover (event) {
    var target = $( event.currentTarget );
    target.click(function () {
        $( '.cancel-popover' ).slideToggle();
    });
    $( '.popover-dismiss-button' ).click(function () {
        $( '.cancel-popover' ).slideUp();
    });
    $( '.process-cancel-button' ).click(function () {
        $( '.cancel-popover' ).slideUp();
    });
}

// Initiiert die GUI für Prozessabbruch
function cancelRun (event) {
    var target = $( event.currentTarget );
    target
        .unbind( 'click' )
        .tooltip( 'hide' )
        .removeClass( 'm-progress' )
        .addClass( 'run-button' )
        .attr( 'data-original-title', 'Run' )
        .tooltip({delay: {'show': 800, 'hide': 200}, animation: true, title: 'Run'});
}

// Runevent für den Run-Button
function runEvent (event, exec) {
    initiateRun(event);
    initiatePopover(event);
    exec();
    cancelRun (event)
    resultFirstLine = 1;
    runEvent(event, exec);
}
    
module.exports = {
    updateUndoManager: updateUndoManager,
    initiateRun: initiateRun,
    initiatePopover: initiatePopover,
    cancelRun: cancelRun,
    runEvent: runEvent
}

