'use strict';

import hbs from 'hbs';
import path from 'path';
import fs from 'fs';	

/* Registramos los partials */
addPartial('layout', 'head');
addPartial('layout', 'navbar');
addPartial('layout', 'scripts');
addPartial('layout', 'footer');

hbs.registerPartials(path.join(__dirname, '../views/layout'));
hbs.registerPartials(path.join(__dirname, '../views/postulacion'));

/* Registramos los helpers */
hbs.registerHelper('random', () => Math.floor(Math.random() * 99999 + 1));
hbs.registerHelper('incremented', index => ++index);

hbs.registerHelper('multiply', (index, number) => ++index * number);

hbs.registerHelper('for', (n, block) => {
	let finalblock = '';
	for (let i = 0; i < n; ++i)
		finalblock += block.fn(i);
	return finalblock;
});

hbs.registerHelper('upperCase', text => text.toUpperCase());

export default hbs;

function addPartial(dir, name) {
	try {
		hbs.registerPartial(name, fs.readFileSync(path.join(__dirname, `../views/${dir}/${name}.hbs`), 'utf-8'));
		return true;
	} catch(e) {
		console.log(e);
		return false;
	}
}