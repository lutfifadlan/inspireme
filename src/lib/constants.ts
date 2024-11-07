import { GradientSettings, WallpaperPreset } from "./interface";

export const BACKGROUNDS = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", 
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee",
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  "https://images.unsplash.com/photo-1540206395-68808572332f",
  "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9",
  "https://images.unsplash.com/photo-1476673160081-cf065607f449",
  "https://images.unsplash.com/photo-1509114397022-ed747cca3f65",
  "https://images.unsplash.com/photo-1566024287286-457247b70310",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
  "https://images.unsplash.com/photo-1505322022379-7c3353ee6291",
  "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5",
  "https://images.unsplash.com/photo-1536152470836-b943b246224c",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1682686581580-d99b0230064e",
  "https://images.unsplash.com/photo-1462332420958-a05d1e002413",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
  "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
  "https://images.unsplash.com/photo-1471922694854-ff1b63b20054",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1448375240586-882707db888b",
  "https://images.unsplash.com/photo-1511497584788-876760111969",
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
  "https://images.unsplash.com/photo-1444723121867-7a241cacace9",
  "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1",
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
  "https://images.unsplash.com/photo-1513553404607-988bf2703777",
];

export const FONTS = [
  { value: "font-inter", label: "Inter" },
  { value: "font-playfair", label: "Playfair Display" },
  { value: "font-montserrat", label: "Montserrat" },
  { value: "font-roboto", label: "Roboto" },
  { value: "font-lora", label: "Lora" },
  { value: "font-oswald", label: "Oswald" },
  { value: "font-raleway", label: "Raleway" },
  { value: "font-poppins", label: "Poppins" },
  { value: "font-fira-code", label: "Fira Code" },
  { value: "font-merriweather", label: "Merriweather" },
];

export const MOTIVATIONAL_QUOTES = [
  "Dream big, work hard, stay focused",
  "Your only limit is your mind",
  "Make today amazing",
  "Success is built one day at a time", 
  "Push yourself, because no one else is going to do it for you",
  "The future belongs to those who believe in the beauty of their dreams",
  "Your potential is endless",
  "Great things never come from comfort zones",
  "Believe you can and you're halfway there",
  "Make it happen, shock everyone",
  "Success doesn't come to you, you go to it",
  "The harder you work, the luckier you get",
  "Your time is limited, don't waste it",
  "Dreams don't work unless you do",
  "Stay hungry, stay foolish",
  "The best way to predict the future is to create it",
  "Focus on the step in front of you, not the whole staircase",
  "You are stronger than you think",
  "Every day is a new beginning",
  "Small progress is still progress",
  "Think big, start small, act now",
  "Your attitude determines your direction",
  "Make yourself proud",
  "The only bad workout is the one that didn't happen",
  "Discipline is choosing between what you want now and what you want most",
  "Turn your wounds into wisdom",
  "The journey of a thousand miles begins with one step",
  "What doesn't kill you makes you stronger",
  "Life is 10% what happens to you and 90% how you react to it",
  "Be the change you wish to see in the world",
  "Yesterday you said tomorrow",
  "Nothing is impossible, the word itself says 'I'm possible'",
  "Don't wait for opportunity, create it",
  "Fall seven times, stand up eight",
  "The best revenge is massive success",
  "If not now, when?",
  "Do what you have to do until you can do what you want to do",
  "Everything you've ever wanted is on the other side of fear",
  "Success is not final, failure is not fatal",
  "The past cannot be changed, but the future is yet in your power",
  "You miss 100% of the shots you don't take",
  "It always seems impossible until it's done",
  "The only way to do great work is to love what you do",
  "Don't count the days, make the days count",
  "Champions keep playing until they get it right",
  "The only thing standing between you and your goal is the story you keep telling yourself",
  "You are one decision away from a completely different life",
  "The more you seek the uncomfortable, the more you will become comfortable",
  "You have to be willing to do what others won't, to achieve what others don't",
  "The pain you feel today will be the strength you feel tomorrow",
  "Don't let your mind bully your body",
  "The only way to truly grow is to push yourself beyond your limits",
  "Success is not about how much money you make, it's about the difference you make in people's lives",
  "You can't cheat the grind, it knows how much you've invested",
  "The more you sweat in training, the less you bleed in battle",
  "The only way to achieve the impossible is to believe it is possible",
  "You are the master of your fate, the captain of your soul",
  "The only thing that can stop you is you",
  "The harder you work for something, the greater you'll feel when you achieve it",
  "Success is not for the lazy",
  "The only limit to our realization of tomorrow is our doubts of today",
  "You have to be at your strongest when you're feeling at your weakest",
  "The only way to do great work is to love what you do",
  "Don't be afraid to give up the good to go for the great",
  "The only way to achieve greatness is to push yourself beyond your limits",
  "The only way to succeed is to never give up",
  "The only way to achieve your dreams is to work hard and never give up",
  "The only way to achieve your goals is to stay focused and never give up",
  "Just ship it",
  "Sometimes you need to be up really high to understand how small you are",
  "If you really believe in what you're doing, work hard, take nothing personally and if something blocks one route, find another",
  "Too many of us are not living our dreams because we are living our fears",
  "I suppose it is tempting, if the only tool you have is a hammer, to treat everything as if it were a nail",
  "One day you will wake up and there won't be any more time to do the things you always wanted",
  "Most people quit because they look how far they have to go, not how far they have come",
  "People do not leave jobs, they leave their leader",
  "Although the world is full of suffering, it is also full of the overcoming of it",
  "No one has the power to shatter your dreams unless you give it to them",
  "All things are difficult before they are easy",
  "If you fear failure, you will never go anywhere",
  "Failure is just practice for success",
  "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success",
  "Sometimes we have to stop being scared and just go for it",
  "Failure is just practice for success",
  "Failure is simply the opportunity to begin again, this time more intelligently",
  "If things start happening, don't worry, don't stew, just go right along",
  "Don't let small minds convince you that your dreams are too big",
  "Insanity is doing the same thing over and over again and expecting different results",
  "If we get rewarded only for results, not processes, we're going to be pretty miserable",
  "Incredible things can be done simply if we are committed to making them happen",
  "You can't climb the ladder of success with your hands in your pockets",
  "It's not about where your starting point is, but your end goal and the journey",
  "Don't let a bad day make you feel like you have a bad life",
  "Stop managing your time, start managing your focus",
  "You can't change the direction of the wind, but you can adjust your sails",
  "Great things are done by a series of small things brought together",
  "The only way to learn it is to do it",
  "If you can remember why you started, then you will know why you must continue",
  "The journey of a thousand miles begins with a single step"
];

export const WALLPAPER_PRESETS: WallpaperPreset[] = [
  {
    id: "desktop-4k",
    label: "Desktop 4K",
    width: 3840,
    height: 2160,
  },
  {
    id: "desktop-2k",
    label: "Desktop 2K",
    width: 2560,
    height: 1440,
  },
  {
    id: "desktop-fhd",
    label: "Desktop Full HD",
    width: 1920,
    height: 1080,
  },
  {
    id: "iphone-14",
    label: "iPhone 14 Pro",
    width: 1179,
    height: 2556,
  },
  {
    id: "iphone-13",
    label: "iPhone 13/12",
    width: 1170,
    height: 2532,
  },
  {
    id: "ipad-pro",
    label: "iPad Pro",
    width: 2048,
    height: 2732,
  },
  {
    id: "macbook",
    label: "MacBook Pro 16\"",
    width: 3456,
    height: 2234,
  },
  {
    id: "custom",
    label: "Custom Size",
    width: 1920,
    height: 1080,
  },
];

export const MAX_FONT_SIZE = 400;
export const MIN_FONT_SIZE = 0;

export const GRADIENT_PRESETS: { label: string; value: GradientSettings }[] = [
  {
    label: "Abyss",
    value: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#000000", position: 0 },
        { color: "#0a0a0a", position: 50 },
        { color: "#1a1a1a", position: 100 }
      ]
    }
  },
  {
    label: "Obsidian",
    value: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#000000", position: 0 },
        { color: "#434343", position: 100 }
      ]
    }
  },
  {
    label: "Carbon",
    value: {
      type: "radial",
      angle: 0,
      stops: [
        { color: "#111111", position: 0 },
        { color: "#232323", position: 50 },
        { color: "#1a1a1a", position: 100 }
      ]
    }
  },
  {
    label: "Charcoal Mist",
    value: {
      type: "linear",
      angle: 225,
      stops: [
        { color: "#1f2937", position: 0 },
        { color: "#111827", position: 50 },
        { color: "#030712", position: 100 }
      ]
    }
  },
  {
    label: "Dark Matter",
    value: {
      type: "linear",
      angle: 45,
      position: { x: 50, y: 50 },
      stops: [
        { color: "#300030", position: 0 },
        { color: "#4B0082", position: 50 },
        { color: "#000000", position: 100 }
      ]
    }
  },
  {
    label: "Slate Night",
    value: {
      type: "linear",
      angle: 90,
      stops: [
        { color: "#0f172a", position: 0 },
        { color: "#1e293b", position: 100 }
      ]
    }
  },
  {
    label: "Graphite",
    value: {
      type: "linear",
      angle: 160,
      stops: [
        { color: "#18181b", position: 0 },
        { color: "#27272a", position: 50 },
        { color: "#3f3f46", position: 100 }
      ]
    }
  },
  {
    label: "Deep Space",
    value: {
      type: "radial",
      angle: 0,
      stops: [
        { color: "#000033", position: 0 },
        { color: "#191970", position: 50 },
        { color: "#301934", position: 100 }
      ]
    }
  },
  {
    label: "Radial Blue",
    value: {
      type: "linear",
      angle: 45,
      position: { x: 50, y: 50 },
      stops: [
        { color: "#00134c", position: 0 },
        { color: "#0066ff", position: 100 }
      ]
    }
  },
  {
    label: "Northern Lights",
    value: {
      type: "linear",
      angle: 60,
      stops: [
        { color: "#4CAF50", position: 0 },
        { color: "#2196F3", position: 50 },
        { color: "#9C27B0", position: 100 }
      ]
    }
  },
  {
    label: "Emerald Dream",
    value: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#004D40", position: 0 },
        { color: "#00C853", position: 50 },
        { color: "#64DD17", position: 100 }
      ]
    }
  },
  {
    label: "Ocean",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#2193b0", position: 0 },
        { color: "#6dd5ed", position: 100 }
      ]
    }
  },
  {
    label: "Forest",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#134E5E", position: 0 },
        { color: "#71B280", position: 100 }
      ]
    }
  },
  {
    label: "Tropical Paradise",
    value: {
      type: "linear",
      angle: 160,
      stops: [
        { color: "#00FA9A", position: 0 },
        { color: "#40E0D0", position: 50 },
        { color: "#1E90FF", position: 100 }
      ]
    }
  },
  {
    label: "Minty Fresh",
    value: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#00B09B", position: 0 },
        { color: "#96C93D", position: 100 }
      ]
    }
  },
  {
    label: "Fire and Ice",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#FF5F6D", position: 0 },
        { color: "#00C6FF", position: 100 }
      ]
    }
  },
  {
    label: "Rainbow",
    value: {
      type: "linear",
      angle: 90,
      stops: [
        { color: "#FF0000", position: 0 },
        { color: "#FF7F00", position: 20 },
        { color: "#FFFF00", position: 40 },
        { color: "#00FF00", position: 60 },
        { color: "#0000FF", position: 80 },
        { color: "#4B0082", position: 100 }
      ]
    }
  },
  {
    label: "Spring Bloom",
    value: {
      type: "linear",
      angle: 70,
      stops: [
        { color: "#98FB98", position: 0 },
        { color: "#DDA0DD", position: 100 }
      ]
    }
  },
  {
    label: "Cotton Candy",
    value: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#FFB6C1", position: 0 },
        { color: "#87CEEB", position: 100 }
      ]
    }
  },
  {
    label: "Coral Reef",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#FF6A88", position: 0 },
        { color: "#FFB199", position: 100 }
      ]
    }
  },
  {
    label: "Desert Sand",
    value: {
      type: "linear",
      angle: 20,
      stops: [
        { color: "#F4A460", position: 0 },
        { color: "#DEB887", position: 100 }
      ]
    }
  },
  {
    label: "Golden Hour",
    value: {
      type: "linear",
      angle: 30,
      stops: [
        { color: "#FFD700", position: 0 },
        { color: "#FFA500", position: 50 },
        { color: "#FF4500", position: 100 }
      ]
    }
  },
  {
    label: "Executive Gray",
    value: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#2C3E50", position: 0 },
        { color: "#3F5973", position: 50 },
        { color: "#BDC3C7", position: 100 }
      ]
    }
  },
  {
    label: "Mountain Sage",
    value: {
      type: "linear",
      angle: 160,
      stops: [
        { color: "#2F4F4F", position: 0 },
        { color: "#3C4F3C", position: 50 },
        { color: "#4A5D4A", position: 100 }
      ]
    }
  }
];