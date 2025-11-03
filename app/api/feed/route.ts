import { NextResponse } from 'next/server';

interface FeedItem {
  id: string;
  name: string;
  location: string;
  action: string;
  amount: string;
}

const firstNames = [
  "Michael", "Sarah", "James", "Emily", "David", "Jessica", "Robert", "Jennifer",
  "William", "Amanda", "John", "Ashley", "Daniel", "Brittany", "Christopher", "Melissa",
  "Matthew", "Samantha", "Andrew", "Nicole", "Joshua", "Elizabeth", "Ryan", "Lauren",
  "Brandon", "Amber", "Justin", "Stephanie", "Tyler", "Rachel", "Kevin", "Megan",
  "Jason", "Rebecca", "Brian", "Laura", "Jacob", "Hannah", "Nicholas", "Michelle",
  "Eric", "Kimberly", "Steven", "Amy", "Jonathan", "Angela", "Alexander", "Heather",
  "Kyle", "Christina", "Joseph", "Lisa", "Thomas", "Maria", "Timothy", "Kelly",
  "Nathan", "Tiffany", "Aaron", "Patricia", "Adam", "Linda", "Charles", "Nancy",
  "Zachary", "Donna", "Benjamin", "Carol", "Ethan", "Sandra", "Jordan", "Karen",
  "Dylan", "Deborah", "Connor", "Jessica", "Cameron", "Sharon", "Hunter", "Cynthia"
];

const locations = [
  // Keep location names short (max ~12 characters for mobile)
  "Austin", "Dallas", "Houston",
  "LA", "San Diego", "SF",
  "Miami", "Orlando", "Tampa",
  "NYC", "Buffalo", "Albany",
  "Chicago", "Naperville",
  "Philly", "Pittsburgh",
  "Columbus", "Cleveland",
  "Atlanta", "Savannah", "Augusta",
  "Charlotte", "Raleigh", "Durham",
  "Detroit", "Lansing",
  "Newark", "Trenton",
  "Richmond", "Norfolk",
  "Seattle", "Spokane", "Tacoma",
  "Phoenix", "Tucson", "Mesa",
  "Boston", "Cambridge",
  "Nashville", "Memphis",
  "Indy", "Fort Wayne",
  "KC", "St. Louis",
  "Baltimore", "Rockville",
  "Milwaukee", "Madison",
  "Denver", "Aurora",
  "Charleston"
];

const actions = [
  // Completed/Claimed actions - keep short for mobile
  "just earned",
  "received",
  "just claimed",
  "just received",
  "was paid out",
  "cashed out",
  // In-progress actions - short versions only
  "is earning",
  "just started for",
  "is working on",
  // Other activity types - short
  "just signed up for",
  "qualified to earn",
  "was approved for",
  "got accepted for"
];

const amounts = ["$700", "$700", "$700"];

function generateFeedItem(): FeedItem {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];

  // Simple numeric ID for avatar color consistency
  const id = Math.floor(Math.random() * 10000).toString();

  return {
    id,
    name: firstName,
    location,
    action,
    amount
  };
}

export async function GET() {
  const feedItem = generateFeedItem();

  return NextResponse.json(feedItem, {
    headers: {
      'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
    },
  });
}
