import './assets/style.css';
import pic from './assets/pic.png';
import './error';

function component() {
	var element = document.createElement('div');
	element.innerHTML = 'Is this project with webpack4 working ?';
	return element;
}

function image() {
	var img = document.createElement('image');
	img.src = pic;
	return img;
}

document.body.appendChild(component());
document.body.appendChild(image());
