var jwhelper = {
    state : {
        idle: 'idle',       	//Either playback has not started or playback was stopped due to a stop() call or an error. In this state, either the play or the error icon is visible in the display.	String
        buffering: 'buffering',	//The user pressed play, but sufficient data to start playback has not yet loaded. The buffering icon is visible in the display.	String
        playing: 'playing',	    //The video is currently playing.No icon is visible in the display.String
        paused: 'paused'	    //The video is currently paused.The play icon is visible in the display.String
    }
}