class Toolkit{

	constructor(){
		this.id = random(1000);
	}

	mean(arr){
		var x=0;
		for(var i=0; i < arr.length; i++){
			x+=arr[i];
		}
		x/=arr.length;
		return x;
	}

	abs(x){
		if(x >= 0){return x;}
		else{return -1*x;}
	}

	lineq(p1,p2, x){
		var m = this.abs( (p1[1]-p2[1])/(p1[0]-p2[0]) );
		var b = p1[1] - m*p1[0];
		return this.line(m,b,x);
	}

	line(m,b,x){
		return m*x + b;
	}
}