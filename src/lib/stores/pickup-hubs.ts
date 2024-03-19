import { type PickupHub } from '$lib/model/pickup-hub';
import { readable } from 'svelte/store';

// For now we have hard coded pickup hubs
export const initialHubs: PickupHub[] = [
	{
		id: '1',
		code: 'GS',
		district: 'Gransee',
		membersCount: 7,
		portions: 5
	},
	{
		id: '2',
		code: 'SP',
		district: 'Spandau',
		membersCount: 5,
		portions: 3
	},
	{
		id: '3',
		code: 'CHB',
		district: 'Charlottenburg',
		membersCount: 4,
		portions: 3.5
	},
	{
		id: '4',
		code: 'TE',
		district: 'Tegel',
		membersCount: 3,
		portions: 1.5
	},
	{
		id: '5',
		code: 'PD',
		district: 'Potsdam',
		membersCount: 15,
		portions: 13
	},
	{
		id: '6',
		code: 'DL',
		district: 'Dahlem',
		membersCount: 17,
		portions: 14.5
	},
	{
		id: '7',
		code: 'FN',
		district: 'Friedenau',
		membersCount: 4,
		portions: 2.5
	},
	{
		id: '8',
		code: 'TH',
		district: 'Tempelhof',
		membersCount: 1,
		portions: 1
	},
	{
		id: '9',
		code: 'NK',
		district: 'Neukölln',
		membersCount: 10,
		portions: 5.5
	},
	{
		id: '10',
		code: 'NK2',
		district: 'Neukölln',
		membersCount: 4,
		portions: 3
	},
	{
		id: '11',
		code: 'NK3',
		district: 'Neukölln',
		membersCount: 2,
		portions: 1.5
	},
	{
		id: '12',
		code: 'PL',
		district: 'Pänterwald',
		membersCount: 5,
		portions: 4.5
	},
	{
		id: '13',
		code: 'OSW2',
		district: 'Oberschöneweide',
		membersCount: 1,
		portions: 1
	},
	{
		id: '14',
		code: 'OSW',
		district: 'Oberschöneweide',
		membersCount: 2,
		portions: 1
	},
	{
		id: '15',
		code: 'KÖ',
		district: 'Köpernick',
		membersCount: 2,
		portions: 1
	},
	{
		id: '16',
		code: 'FG',
		district: 'Friedrichshagen',
		membersCount: 7,
		portions: 5.5
	},
	{
		id: '17',
		code: 'KH',
		district: 'Karlshost',
		membersCount: 2,
		portions: 1.5
	},
	{
		id: '18',
		code: 'RU2',
		district: 'Rummelsburg',
		membersCount: 2,
		portions: 1.5
	},
	{
		id: '19',
		code: 'FH2',
		district: 'Friedrichshain',
		membersCount: 5,
		portions: 3
	},
	{
		id: '20',
		code: 'FH',
		district: 'Friedrichshain',
		membersCount: 4,
		portions: 2
	},
	{
		id: '21',
		code: 'KB',
		district: 'Kreuzberg',
		membersCount: 7,
		portions: 6
	},
	{
		id: '22',
		code: 'MI',
		district: 'Mitte',
		membersCount: 1,
		portions: 1
	},
	{
		id: '23',
		code: 'WS',
		district: 'Weißensee',
		membersCount: 3,
		portions: 3
	},
	{
		id: '24',
		code: 'WE',
		district: 'Wedding',
		membersCount: 15,
		portions: 9.5
	},
	{
		id: '25',
		code: 'WE2',
		district: 'Wedding',
		membersCount: 7,
		portions: 5
	},
	{
		id: '26',
		code: 'MO',
		district: 'Moabit',
		membersCount: 8,
		portions: 4
	},
	{
		id: '27',
		code: 'HE',
		district: 'Hermsdorf',
		membersCount: 4,
		portions: 5
	},
	{
		id: '28',
		code: 'RO',
		district: 'Rosenthal',
		membersCount: 2,
		portions: 2
	}
];

export const pickupHubs = readable(initialHubs);
