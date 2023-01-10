import React from 'react';
import ReactDOM from 'react-dom';
import Extension from '../app/components/extension';

window.entryFunction = function (data='', type){
	let popup = (type === 'popup');
	let ribbon = (type === 'ribbon');
	let carousel = (type === 'carousel');
	ReactDOM.render(<Extension data={data} popup={popup} ribbon={ribbon} carousel={carousel} />, document.getElementById('app'));
}

