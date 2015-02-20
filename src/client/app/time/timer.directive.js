angular
    .module('app.time')
    .directive('timer', timer);


function timer() {

    return {
        restrict: 'E',
        templateUrl: '/app/time/timer.html',
        scope : {},
        controller: controller,

        link: link
    };
}

function controller($scope) {
    this.toggle = function() {

    };
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function link(scope, element, attrs) {
	var duration = moment.duration();
	duration.add(attrs.seconds,'seconds');
	
	scope.clockRunning = false;
	moment.duration.fn.format = function(){
		var days = Math.floor(this.days()),
			hours = Math.floor(this.hours()),
			minutes = Math.floor(this.minutes()),
			seconds = Math.floor(this.seconds());
		if (seconds < 10){
			seconds = '0' + seconds;
		}
		
	    var str = '';
	    if(days > 0){ str = str + days + 'd ';}
	    if(hours > 0) {str = str + hours + ':';}
	    if(minutes > 0) {str = str + minutes + ':';}
	    
	    if(seconds >= 0 ) {str = str + seconds;}
	    
	    
	    return str;
    };

    element.children('li').children('div.datas-text').children('span.time').html(duration.format());
	element.children('li').children('div.datas-text').children('span.bucket').html(attrs.bucket);

	var  onInterval = function(){
		duration.add(1, 'seconds');
	    element.children('li').children('div.datas-text').children('span.time').html(duration.format());
	    attrs.seconds = parseInt(attrs.seconds) + 1;
	    console.log(attrs.seconds);
	    scope.$apply();
	}

	
    if (attrs.state === 'on') {
        element.children('li').addClass(attrs.onclass);
        
        var timeout = setInterval(onInterval, 1000);
    } else {
        element.children('li').addClass(attrs.offclass);
    }

    element.bind('click', function() {

        //console.log(attrs);
        if (attrs.state === 'on') {
            element.children('li').removeClass(attrs.onclass).addClass(attrs.offclass);
            attrs.state = 'off';
            scope.clockRunning = false;
            clearTimeout(timeout);
        } else {
            element.children('li').removeClass(attrs.offclass).addClass(attrs.onclass);
            attrs.state = 'on';
            scope.clockRunning = true;
            timeout = setInterval(onInterval, 1000);
        }

    });


    scope.$on('timerOn',function(event, args){
    	if(attrs.id !== args.id){
    		//console.log('got timerOn', args.id, attrs.id);
	    	attrs.state = 'off';
	        element.children('li').removeClass(attrs.onclass).addClass(attrs.offclass);
        	clearTimeout(timeout);
        	scope.clockRunning = false;
        }

    });

    scope.$on('timerOff',function(){
        console.log('got timerOff');
    });

}
