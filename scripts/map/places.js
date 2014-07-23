define([], function () {
	var places = [
		{
			name : 'Accounting',
			type : 'accounting'
		},
		{
			name : 'Airport',
			type : 'airport'
		},
		{
			name : 'Amusement park',
			type : 'amusement_park'
		},
		{
			name : 'Aquarium',
			type : 'aquarium'
		},
		{
			name :'Art galery' ,
			type :'art_gallery'
		},
		{
			name :'Atm' ,
			type :'atm'
		},
		{
			name :'Bakery' ,
			type :'bakery'
		},
		{
			name :'Bank' ,
			type :'bank'
		},
		{
			name :'Bar' ,
			type :'bar'
		},
		{
			name :'Beauty salon' ,
			type :'beauty_salon'
		},
		{
			name :'Bicyle store' ,
			type :'bicycle_store'
		},
		{
			name :'Book store' ,
			type :'book_store'
		},
		{
			name :'Bowling alley' ,
			type :'bowling_alley'
		},
		{
			name :'Bus station' ,
			type :'bus_station'
		},
		{
			name :'Cafe' ,
			type :'cafe'
		},
		{
			name :'Campground' ,
			type :'campground'
		},
		{
			name :'Car dealer' ,
			type :'car_dealer'
		},
		{
			name :'Car rental' ,
			type :'car_rental'
		},
		{
			name :'Car repair' ,
			type :'car_repair'
		},
		{
			name :'Car wash' ,
			type :'car_wash'
		},
		{
			name :'Casino' ,
			type :'casino'
		},
		{
			name :'Cemetary' ,
			type :'cemetery'
		},
		{
			name :'Church' ,
			type :'church'
		},
		{
			name :'City hall' ,
			type :'city_hall'
		},
		{
			name :'Clothing store' ,
			type :'clothing_store'
		},
		{
			name :'Convenience store',
			type :'convenience_store'
		},
		{
			name :'Courthouse',
			type :'courthouse'
		},
		{
			name :'Dentist',
			type :'dentist'
		},
		{
			name :'Department store' ,
			type :'department_store'
		},
		{
			name :'Doctor' ,
			type :'doctor'
		},
		{
			name :'Electrician' ,
			type :'electrician'
		},
		{
			name :'Electronics store' ,
			type :'electronics_store'
		},
		{
			name :'Embassy' ,
			type :'embassy'
		},
		{
			name :'Establishment' ,
			type :'establishment'
		},
		{
			name :'Finance' ,
			type :'finance'
		},
		{
			name :'Fire station',
			type :'fire_station'
		},
		{
			name :'Florist' ,
			type :'florist'
		},
		{
			name :'Food' ,
			type :'food'
		},
		{
			name :'Funeral home' ,
			type :'funeral_home'
		},
		{
			name :'Furniture store' ,
			type :'furniture_store'
		},
		{
			name :'Gas station' ,
			type :'gas_station'
		},
		{
			name :'General contractor' ,
			type :'general_contractor'
		},
		{
			name :'Grocery/Supermarket' ,
			type :'grocery_or_supermarket'
		},
		{
			name :'Gym' ,
			type :'gym'
		},
		{
			name :'Hair care' ,
			type :'hair_care'
		},
		{
			name :'Hardware store' ,
			type :'hardware_store'
		},
		{
			name :'Health' ,
			type :'health'
		},
		{
			name :'Hindu temple' ,
			type :'hindu_temple'
		},
		{
			name :'Home goods store' ,
			type :'home_goods_store'
		},
		{
			name :'Hospital' ,
			type :'hospital'
		},
		{
			name :'Insurance agency' ,
			type :'insurance_agency'
		},
		{
			name :'Jewelry store' ,
			type :'jewelry_store'
		},
		{
			name :'Laundry' ,
			type :'laundry'
		},
		{
			name :'Lawyer' ,
			type :'lawyer'
		},
		{
			name :'Library' ,
			type :'library'
		},
		{
			name :'Liquor store' ,
			type :'liquor_store'
		},
		{
			name :'Local government office' ,
			type :'local_government_office'
		},
		{
			name :'Locksmith' ,
			type :'locksmith'
		},
		{
			name :'Lodging' ,
			type :'lodging'
		},
		{
			name :'Meal delivery' ,
			type :'meal_delivery'
		},
		{
			name :'Meal takeaway' ,
			type :'meal_takeaway'
		},
		{
			name :'Mosque' ,
			type :'mosque'
		},
		{
			name :'Movie rental' ,
			type :'movie_rental'
		},
		{
			name :'Movie theater' ,
			type :'movie_theater'
		},
		{
			name :'Moving company' ,
			type :'moving_company'
		},
		{
			name :'Museum' ,
			type :'museum'
		},
		{
			name :'Night club' ,
			type :'night_club'
		},
		{
			name :'Painter' ,
			type :'painter'
		},
		{
			name :'Park' ,
			type :'park'
		},
		{
			name :'Parking' ,
			type :'parking'
		},
		{
			name :'Pet store' ,
			type :'pet_store'
		},
		{
			name :'Pharmacy' ,
			type :'pharmacy'
		},
		{
			name :'Physiotherapist' ,
			type :'physiotherapist'
		},
		{
			name :'Place of worship' ,
			type :'place_of_worship'
		},
		{
			name :'Plumber' ,
			type :'plumber'
		},
		{
			name :'Police' ,
			type :'police'
		},
		{
			name :'Post office' ,
			type :'post_office'
		},
		{
			name :'Real estate agency' ,
			type :'real_estate_agency'
		},
		{
			name :'Restaurant' ,
			type :'restaurant'
		},
		{
			name :'Roofing contractor' ,
			type :'roofing_contractor'
		},
		{
			name :'Rv park' ,
			type :'rv_park'
		},
		{
			name :'School' ,
			type :'school'
		},
		{
			name :'Shoe store' ,
			type :'shoe_store'
		},
		{
			name :'Shopping mall' ,
			type :'shopping_mall'
		},
		{
			name :'Spa' ,
			type :'spa'
		},
		{
			name :'Stadium' ,
			type :'stadium'
		},
		{
			name :'Storage' ,
			type :'storage'
		},
		{
			name :'Store' ,
			type :'store'
		},
		{
			name :'Subway station' ,
			type :'subway_station'
		},
		{
			name :'Synagogue' ,
			type :'synagogue'
		},
		{
			name :'Taxi stand' ,
			type :'taxi_stand'
		},
		{
			name :'Train station' ,
			type :'train_station'
		},
		{
			name :'Travel agency' ,
			type :'travel_agency'
		},
		{
			name :'University' ,
			type :'university'
		},
		{
			name :'Veterinary care' ,
			type :'veterinary_care'
		},
		{
			name :'Zoo' ,
			type :'zoo'
		},
	];

	return places;
});