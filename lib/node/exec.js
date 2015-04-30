var exec = require('child_process').spawn,
fs = require('fs'),
path = require('path'),
tempFilePreFix = path.join(process.env.TEMP, 'TMP_vq-editor_exec_')
;

function Exec(editor, consoleOut, consoleErr, callback) {
    var code = (typeof editor === 'string') ? editor : editor.getSelectedText();
    var tempFile = tempFilePreFix + parseInt(Math.random() * 100000000, 10).toString() + '.tmp';
    code = (code && code !== "") ? code : editor.getAllText();
    var child;
    fs.writeFile(tempFile, code, function(err) {
        if(err) throw err;
        //Exec child process 
        child = exec(path.resolve('../lib/node/bin/node.exe' ),  [tempFile]);
        callback(null, child);
        //get stdout stream data
        child.stdout.on('data', function(data) {
            consoleOut(data.toString());
            console.log(data.toString());
        });
        
        //get stderr stream data
        child.stderr.on('data', function(data) {
            consoleErr(data);
            console.error(data);
        });
        
        child.on('close', function() {
            fs.unlink(tempFile, callback);
        });
    });
    var result = {
            returns: null,
            logs: [],
            error: null
        };
    return  result;
}


/*
function Exec__(editor, $) {
    var selection = editor.getSelectedText();
    selection = (selection && selection !== "") ? selection : editor.getAllText();
    var result = {
            returns: null,
            logs: [],
            error: null
        };
    var unhook = hookConsoleLog(function(v) {
      //  result.logs.push(v); //only the first argument from console.log?
        $('#console-log ul').prepend('<li class="list-group-item"><pre>'+v+'</pre></li>');
        $('#editor-result-tab a[href="#console-log"]').tab('show') 
    });
    try {
        
        result.returns = vm.runInThisContext(selection);
    }catch(e){ 
        console.error(e.message);
        result.error = e.message
    }
    
    unhook();
    return result;
}

//http://stackoverflow.com/questions/12805125/access-logs-from-console-log-in-node-js-vm-module
function hookConsoleLog(callback) {
    var old_log = console.log;
    
    console.log = (function(write) {
        return function() {
            write.apply(console, arguments)
            callback.apply(null, arguments);
        }
    })(console.log)
    
    return function() {
        console.log = old_log;
    }
}
    
*/ 
module.exports = Exec;
