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
    }
}

function controller($scope) {
    this.toggle = function() {

    }
}

function link(scope, element, attrs) {
	var duration = moment.duration(attrs.seconds, 'seconds');
	
	scope.clockRunning = false;
	moment.duration.fn.format = function(){
	    str = ""
	    if(this.days() > 1) str = str + Math.floor(this.days()) + "d "
	    if(this.hours() > 1) str = str + Math.floor(this.hours()) + "h "
	    if(this.minutes() > 1) str = str + Math.floor(this.minutes()) + "m "
	    if(this.seconds() > 1) str = str + Math.floor(this.seconds()) + "s "
	    return str
    }

    element.children('li').children('div.datas-text').children('span.time').html(duration.format());
	element.children('li').children('div.datas-text').children('span.bucket').html(attrs.bucket);

	var  onInterval = function(){
		duration = moment.duration(attrs.seconds, 'seconds');
	    element.children('li').children('div.datas-text').children('span.time').html(duration.format());
	    attrs.seconds = parseInt(attrs.seconds) + 60;
	    console.log(attrs.seconds)
	    scope.$apply();
	}

	
    if (attrs.state === 'on') {
        element.children('li').addClass(attrs.onclass);
        
        var timeout = setInterval(onInterval, 1000);
    } else {
        element.children('li').addClass(attrs.offclass);
    }

    element.bind("click", function() {

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
    	//attrs.state='off';
    });
}


