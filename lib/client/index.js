var $ = jQuery = require('jquery');
require('bootstrap');
//export jQuery
global.jQuery = jQuery;

var Editor = require('./editor.js');
//export to nw.js
global.Editor = Editor;
global.jQuery = jQuery;

function Test(t) {
   console.log(t, process.version);
   window.Test(t);
}

global.XTest = Test;


$.fn.extend({
    treed: function (o) {
      
      var openedClass = 'glyphicon-minus-sign';
      var closedClass = 'glyphicon-plus-sign';
      
      if (typeof o != 'undefined'){
        if (typeof o.openedClass != 'undefined'){
        openedClass = o.openedClass;
        }
        if (typeof o.closedClass != 'undefined'){
        closedClass = o.closedClass;
        }
      }
      
        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
            branch.addClass('branch');
            branch.on('click', function (e) {
                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().toggle();
                }
            });
            branch.children().children().toggle();
        });
        //fire event from the dynamically added icon
      tree.find('.branch .indicator').each(function(){
        $(this).on('click', function () {
            $(this).closest('li').click();
        });
      });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find('.branch>a').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    }
});

$( '#tree' ).treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});



var consoleCount = 2;
$( '.check-button' ).click(function() {
    var code = '';
    $( '.ace_text-layer > .ace_line' ).each(function(index) {
        if(index == ($( '.ace_text-layer > .ace_line' ).toArray().length - 1)) {
            code = code + $( this ).text();
        } else {
            code = code + $( this ).text() + '\n';
            
        }
    });
 
    if($( '.result-tab pre:last-child' ).text()) {
        if($( '.result-tab pre:last-child' ).contents()[0].textContent == code) {
            $( '.result-tab pre:last-child > span' ).text(consoleCount);
            consoleCount++;
        } else {
            $( '.result-tab' ).append( '<pre class="result-pre">' + code + '<span class="badge"></span><a href="#"><span class="glyphicon glyphicon glyphicon-remove-circle" aria-hidden="true"></span></a></pre>' );
            $( '.result-tab' ).scrollTop($( '.result-tab' )[0].scrollHeight);
            consoleCount = 2;
        }
    } else  {
        $( '.result-tab' ).append( '<pre class="result-pre">' + code + '<span class="badge"></span><a href="#"><span class="glyphicon glyphicon glyphicon-remove-circle" aria-hidden="true"></span></a></pre>' );
        $( '.result-tab' ).scrollTop($( '.result-tab' )[0].scrollHeight);
        consoleCount = 2;
    }
});

$( '.expand-button' ).click(function() {
    if ($( this ).hasClass( 'glyphicon-triangle-right' )) {
        $( this ).removeClass( 'glyphicon-triangle-right' ).addClass( 'glyphicon-triangle-bottom' );
    } else {
        $( this ).removeClass( 'glyphicon-triangle-bottom' ).addClass( 'glyphicon-triangle-right' );
    }
    $( this ).closest( '.result-line' ).children( '.result-line-content' ).slideToggle('fast');
    $( '.result-tab' ).scrollTop($( '.result-tab' )[0].scrollHeight);
});

$( '.console-close-button' ).click(function() {
    $( this ).closest('.result-line').remove();
    $( '.console-tab-head.active > a > span' ).text($( '.console-tab.active > div' ).children().toArray().length);
});

$( '.result-tab' ).bind("DOMNodeInserted",function(){
    $( '.result-tab-button > span' ).text( $( '.result-tab' ).children().toArray().length );
});

$( '.error-tab' ).bind("DOMNodeInserted",function(){
    $( '.error-tab-button > span' ).text( $( '.error-tab' ).children().toArray().length );
});

$( '.log-tab' ).bind("DOMNodeInserted",function(){
    $( '.log-tab-button > span' ).text( $( '.log-tab' ).children().toArray().length );
});

$( '.clear-button' ).click(function() {
    $( '.console-tab.active > div' ).children().remove();
    $( '.console-tab-head.active > a > span' ).text('');
});

