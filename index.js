const Command = require('command');
const config = require('./config.js');

module.exports = function NoMotes(dispatch) {
    const command = Command(dispatch);
	
    let enabled = config.enable,
    gameId;
        
    dispatch.hook('S_LOGIN', 10, (event) => {
        gameId = event.gameId;
    })
	
    dispatch.hook('S_SPAWN_DROPITEM', 6, (event) => {
        if (!enabled) return;
        
        if (config.motelist.includes(event.item)) {
            if (event.source.equals(gameId)) {
                return; // don't hide motes that you spawn
            } else {		
                return false;
            }	
        }		
    })

    command.add('nomotes', (p1)=> {
        if (p1 == undefined) {
            enabled = !enabled;		
        } else if (p1.toLowerCase() === 'on') {
            enabled = true;
        } else if (p1.toLowerCase() === 'off') {
            enabled = false;
        }
        sendMessage();
    });
	
    command.add('hidemotes', ()=> {
        enabled = true;
        sendMessage();
    });     
	
    command.add('showmotes', ()=> {
        enabled = false;
        sendMessage();
    }); 
	
    function sendMessage() {
        command.message(enabled ? 'Enabled (New motes will be hidden)' : 'Disabled (New motes will be visible)');
    }	
	
}
