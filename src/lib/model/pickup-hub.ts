type PickupHub = {
	id: string;
	code: string;
	district: string;
	membersCount: number;
	portions: number;
};

export default PickupHub;

// For now we have hard coded pickup hubs
const initialHubs: PickupHub[] = [
	{
		id: '1',
		code: 'GS',
		district: 'Gransee',
		membersCount: 8,
		portions: 6
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
		code: 'CBH',
		district: 'Charlottenburg',
		membersCount: 3,
		portions: 2.5
	},
	{
		id: '4',
		code: 'PD',
		district: 'Potsdam',
		membersCount: 15,
		portions: 13
	},
	{
		id: '5',
		code: 'DL',
		district: 'Dahlem',
		membersCount: 17,
		portions: 14.5
	},
	{
		id: '6',
		code: 'TH',
		district: 'Tempelhof',
		membersCount: 1,
		portions: 1
	},
	{
		id: '7',
		code: 'NK',
		district: 'Neukölln',
		membersCount: 9,
		portions: 5
	},
	{
		id: '8',
		code: 'NK2',
		district: 'Neukölln',
		membersCount: 3,
		portions: 3
	},
	{
		id: '9',
		code: 'NK3',
		district: 'Neukölln',
		membersCount: 2,
		portions: 1.5
	},
	{
		id: '10',
		code: 'PL',
		district: 'Pänterwald',
		membersCount: 5,
		portions: 4.5
	},
	{
		id: '11',
		code: 'OSW2',
		district: 'Oberschöneweide',
		membersCount: 1,
		portions: 1
	},
	{
		id: '12',
		code: 'OSW',
		district: 'Oberschöneweide',
		membersCount: 1,
		portions: 0.5
	},
	{
		id: '13',
		code: 'KÖ',
		district: 'Köpernick',
		membersCount: 2,
		portions: 1
	},
	{
		id: '14',
		code: 'FG',
		district: 'Friedrichshagen',
		membersCount: 6,
		portions: 6
	},
	{
		id: '15',
		code: 'KH',
		district: 'Karlshost',
		membersCount: 2,
		portions: 1.5
	},
	{
		id: '16',
		code: 'RU2',
		district: 'Rummelsburg',
		membersCount: 2,
		portions: 1.5
	},
	{
		id: '17',
		code: 'FH2',
		district: 'Friedrichshain',
		membersCount: 5,
		portions: 3
	},
	{
		id: '18',
		code: 'FH',
		district: 'Friedrichshain',
		membersCount: 4,
		portions: 2
	},
	{
		id: '19',
		code: 'KB',
		district: 'Kreuzberg',
		membersCount: 7,
		portions: 6
	},
	{
		id: '20',
		code: 'MI',
		district: 'Mitte',
		membersCount: 1,
		portions: 1
	},
	{
		id: '21',
		code: 'WS',
		district: 'Weißensee',
		membersCount: 2,
		portions: 2
	},
	{
		id: '22',
		code: 'WE',
		district: 'Wedding',
		membersCount: 16,
		portions: 10
	},
	{
		id: '23',
		code: 'WE2',
		district: 'Wedding',
		membersCount: 6,
		portions: 4.5
	},
	{
		id: '24',
		code: 'MO',
		district: 'Moabit',
		membersCount: 8,
		portions: 4
	},
	{
		id: '25',
		code: 'HE',
		district: 'Hermsdorf',
		membersCount: 7,
		portions: 7
	}
];

export const pickupHubs = initialHubs;
