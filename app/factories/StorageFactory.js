"use strict";

angular.module("Throfolio")

	.factory("StorageFactory",function(){
		let storeImage = (e) => {

			let image = e.target.files[0];
			let storageRef = firebase.storage().ref(image.name);
			let task = storageRef.put(image);
		};
		return {storeImage};

	});