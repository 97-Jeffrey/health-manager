export interface mindInterface  {
    meditation: meditationInterface,
    cognition: cognitionInterface,
    mood: moodInterface
}



interface meditationInterface {
    "calm": number,
    "relaxed": number,
    "energized":number
}

interface cognitionInterface {
    'focus':number,
    'productivity':number,
    'memory':number,
    'problem solving':number,
    'creativity':number,
    'alertness':number,
    'brain fog':number
}

interface moodInterface {
    'stress':number,
    'positivity':number,
    'sensivity':number,
    "socialability":number,
    "calmness":number,
    "anxiety":number,
    "irritability":number
}