var $ = require('jquery');

// Klappt ein Konsolenergebnis aus
function lineExpand (event) {
    var target = $( event.currentTarget );
    if (target.hasClass( 'glyphicon-triangle-right' )) {
        target.removeClass( 'glyphicon-triangle-right' ).addClass( 'glyphicon-triangle-bottom' );
    } else {
        target.removeClass( 'glyphicon-triangle-bottom' ).addClass( 'glyphicon-triangle-right' );
    }
    target.closest( '.console-line' ).children( '.line-content' ).slideToggle('fast');
    scrollToBottom( target.closest('.console-tab-content'));
}

// Entfernt ein Konsolenergebnis
function lineClose (event) {
    var target = $( event.currentTarget );
    target.parents( '.console-line' ).remove();
    updateConsoleCounters();
}

// Scrollt das jeweilige Tab ganz nach unten    
function scrollToBottom (jqueryTab) {
    jqueryTab.scrollTop(jqueryTab[0].scrollHeight);
}

// Entfernt alle Ergebnisse des aktiven Konsolentabs
function clearConsoleTab (jqueryConsoleTab) {
    $( jqueryConsoleTab.attr('id') + ' > div' ).children().remove();
    updateConsoleCounters();
}

// Updatet den Ergebniszähler aller Konsolentabs
function updateConsoleCounters () {
    $( '.console-tab-head > a' ).each(function () {
       $( $( this ).attr( 'href' ) ).children( 'div' ).each(function () {
            var counter = $( this ).children().toArray().length;
            var badge = $( '.' + $( this ).attr('class').split(' ')[0] + '-button > span' );
            if(counter !== 0) {
                badge.text(counter);
            } else {
                badge.text('');
            }
       });
    });
}

// Initiiert den die Überwachung der Ergebniszähler
function initiateConsoleCounters () {
    $( '.console' ).bind("DOMNodeInserted",function(){
        updateConsoleCounters();
    });
}

// Erstellt ein Result-Ergebis/Zeile
function createResult (output, activeResult, resultFirstLine) {
    if (resultFirstLine == 1) {
        activeResult = $( '.templates .result-line' ).clone().appendTo( '.result-tab' );
        $( '.result-line-header-text pre', activeResult ).text(output);
        $( '.expand-button', activeResult ).click(lineExpand);
        $( '.console-close-button', activeResult ).click(function() { lineClose(); });
        resultFirstLine = 0;
    } else {
        $( '.result-line-content-text pre', activeResult ).text($( '.result-line-content-text pre', activeResult ).text() + output);
    }
    scrollToBottom($( '.result-tab' ));
}

// Erstellt ein Error-Ergebnis/Zeile
function createError(output, activeError) {
    activeError = $( '.templates .error-line' ).clone().appendTo( '.error-tab' );
    $( '.error-line-header-text pre', activeError ).text(output.toString().split('\n')[3]);
    $( '.expand-button', activeError ).click(function() { lineExpand(); });    
    $( '.console-close-button', activeError ).click(function() { lineClose(); });
    $( '.error-line-content-text pre', activeError ).text($( '.error-line-content-text pre', activeError ).text() + output);
    scrollToBottom($( '.error-tab' ));
}

module.exports = {
    lineExpand: lineExpand,
    lineClose: lineClose,
    scrollToBottom: scrollToBottom,
    clearConsoleTab: clearConsoleTab,
    updateConsoleCounters: updateConsoleCounters,
    initiateConsoleCounters: initiateConsoleCounters,
    createResult: createResult,
    createError: createError
};
