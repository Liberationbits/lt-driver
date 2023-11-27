type PickupHub = {
	code: String;
	district: String;
	membersCount: Number;
	portionsCount: Number;
};

// For now we have hard coded pickup hubs
const initialHubs: PickupHub[] = [
	{
		code: 'GS',
		district: 'Gransee',
		membersCount: 8,
		portionsCount: 6
	},
	{
		code: 'SP',
		district: 'Spandau',
		membersCount: 5,
		portionsCount: 3
	},
	{
		code: 'CBH',
		district: 'Charlottenburg',
		membersCount: 3,
		portionsCount: 2.5
	},
	{
		code: 'PD',
		district: 'Potsdam',
		membersCount: 15,
		portionsCount: 13
	},
	{
		code: 'DL',
		district: 'Dahlem',
		membersCount: 17,
		portionsCount: 14.5
	},
	{
		code: 'TH',
		district: 'Tempelhof',
		membersCount: 1,
		portionsCount: 1
	},
	{
		code: 'NK',
		district: 'Neukölln',
		membersCount: 9,
		portionsCount: 5
	},
	{
		code: 'NK2',
		district: 'Neukölln',
		membersCount: 3,
		portionsCount: 3
	},
	{
		code: 'NK3',
		district: 'Neukölln',
		membersCount: 2,
		portionsCount: 1.5
	},
	{
		code: 'PL',
		district: 'Pänterwald',
		membersCount: 5,
		portionsCount: 4.5
	},
	{
		code: 'OSW2',
		district: 'Oberschöneweide',
		membersCount: 1,
		portionsCount: 1
	},
	{
		code: 'OSW',
		district: 'Oberschöneweide',
		membersCount: 1,
		portionsCount: 0.5
	},
	{
		code: 'KÖ',
		district: 'Köpernick',
		membersCount: 2,
		portionsCount: 1
	},
	{
		code: 'FG',
		district: 'Friedrichshagen',
		membersCount: 6,
		portionsCount: 6
	},
	{
		code: 'KH',
		district: 'Karlshost',
		membersCount: 2,
		portionsCount: 1.5
	},
	{
		code: 'RU2',
		district: 'Rummelsburg',
		membersCount: 2,
		portionsCount: 1.5
	},
	{
		code: 'FH2',
		district: 'Friedrichshain',
		membersCount: 5,
		portionsCount: 3
	},
	{
		code: 'FH',
		district: 'Friedrichshain',
		membersCount: 4,
		portionsCount: 2
	},
	{
		code: 'KB',
		district: 'Kreuzberg',
		membersCount: 7,
		portionsCount: 6
	},
	{
		code: 'MI',
		district: 'Mitte',
		membersCount: 1,
		portionsCount: 1
	},
	{
		code: 'WS',
		district: 'Weißensee',
		membersCount: 2,
		portionsCount: 2
	},
	{
		code: 'WE',
		district: 'Wedding',
		membersCount: 16,
		portionsCount: 10
	},
	{
		code: 'WE2',
		district: 'Wedding',
		membersCount: 6,
		portionsCount: 4.5
	},
	{
		code: 'MO',
		district: 'Moabit',
		membersCount: 8,
		portionsCount: 4
	},
	{
		code: 'HE',
		district: 'Hermsdorf',
		membersCount: 7,
		portionsCount: 7
	}
];

export const pickupHubs = initialHubs;
