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
}