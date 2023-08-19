const Questions = [
  {
    question: 'Which gender do you prefer your roommate identify as?',
    fieldName: 'genderPreference',
    options: ['Female', 'Male', 'Transgender', 'Nonbinary', 'No Preference'],
    image: 'playing-game.png',
  },
  {
    question: 'Which age group do you prefer your roommate belong to?',
    fieldName: 'preferredAge',
    options: [
      '18-22 years old',
      '23-27 years old',
      '28-32 years old',
      '33-37 years old',
      '38-42 years old',
      '43-47 years old',
      '48-52 years old',
      '53-55 years old',
      '55+ years old',
    ],
    image: 'playing-game.png',
  },
  {
    question: 'Which type of living space are you looking for?',
    fieldName: 'accommodationType',
    options: [
      'House',
      'Apartment',
      'A bed in a Shared Bedroom',
      'No preference',
    ],
    image: 'building.jpg',
  },
  {
    question:
      'Which criteria is MOST important to you when deciding on a potential roommate?',
    fieldName: 'topPreference',
    options: [
      'Cleanliness',
      'Social and lifestyle habits',
      'Financial Stability',
    ],
    image: 'twofriends-moving.jpg',
  },
];

export default Questions;
