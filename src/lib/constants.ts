import { GradientSettings } from "./interface";

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
  "https://images.unsplash.com/photo-1557683311-eac922347aa1",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
  "https://images.unsplash.com/photo-1505322022379-7c3353ee6291",
  "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5",
  "https://images.unsplash.com/photo-1536152470836-b943b246224c",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1682686581580-d99b0230064e",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
  "https://images.unsplash.com/photo-1462332420958-a05d1e002413",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
  "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
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
];

export const WALLPAPER_PRESETS = [
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
export const MIN_FONT_SIZE = 1;

export const GRADIENT_PRESETS: { label: string; value: GradientSettings }[] = [
  {
    label: "Sunset",
    value: {
      type: "linear", 
      angle: 45,
      stops: [
        { color: "#FF512F", position: 0 },
        { color: "#F09819", position: 100 }
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
    label: "Purple Rain", 
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#8E2DE2", position: 0 },
        { color: "#4A00E0", position: 100 }
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
    label: "Midnight",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#191970", position: 0 },
        { color: "#000080", position: 50 },
        { color: "#483D8B", position: 100 }
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
    label: "Peachy Sunset",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#FF7E5F", position: 0 },
        { color: "#FEB47B", position: 100 }
      ]
    }
  },
  {
    label: "Blueberry",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#4A00E0", position: 0 },
        { color: "#8E2DE2", position: 100 }
      ]
    }
  },
  {
    label: "Sunrise",
    value: {
      type: "linear",
      angle: 90,
      stops: [
        { color: "#FF5F6D", position: 0 },
        { color: "#FFC371", position: 100 }
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
    label: "Frosted Ocean",
    value: {
      type: "linear",
      angle: 180,
      stops: [
        { color: "#00C6FF", position: 0 },
        { color: "#0072FF", position: 100 }
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
    label: "Purple Haze",
    value: {
      type: "linear",
      angle: 270,
      stops: [
        { color: "#DA22FF", position: 0 },
        { color: "#9733EE", position: 100 }
      ]
    }
  },
  {
    label: "Golden Sunset",
    value: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#F9D423", position: 0 },
        { color: "#FF4E50", position: 100 }
      ]
    }
  },
  {
    label: "Twilight",
    value: {
      type: "linear",
      angle: 90,
      stops: [
        { color: "#4A00E0", position: 0 },
        { color: "#8E2DE2", position: 100 }
      ]
    }
  },
  {
    label: "Ocean Breeze",
    value: {
      type: "linear",
      angle: 180,
      stops: [
        { color: "#00C6FF", position: 0 },
        { color: "#0072FF", position: 100 }
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
    label: 'Radial Blue',
    value: {
      type: 'radial',
      position: { x: 50, y: 50 },
      stops: [
        { color: '#00134c', position: 0 },
        { color: '#0066ff', position: 100 }
      ]
    }
  },
  {
    label: 'Radial Sunset',
    value: {
      type: 'radial',
      position: { x: 50, y: 100 },
      stops: [
        { color: '#ff8a00', position: 0 },
        { color: '#e52e71', position: 100 }
      ]
    }
  },
];